import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const PORT = 43123;
const BASE_URL = `http://127.0.0.1:${PORT}`;
const TOTAL_FRAMES = 1020;
const FPS = 30;
const VIDEO_OUT = path.resolve('/workspace/public/video/exoskeleton-interface-explainer-1080p.mp4');
const ASSETS_DIR = path.resolve('/workspace/public/assets');

async function sleep(ms) {
  return new Promise((r) => setTimeout(r, ms));
}

async function waitForServer(url, timeoutMs = 15000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {
      // retry
    }
    await sleep(250);
  }
  throw new Error(`Timed out waiting for dev server at ${url}`);
}

async function main() {
  fs.mkdirSync(path.dirname(VIDEO_OUT), { recursive: true });
  fs.mkdirSync(ASSETS_DIR, { recursive: true });

  console.log('[1/4] Starting Vite dev server if not already running...');
  let serverProc = null;
  try {
    await waitForServer(BASE_URL, 1500);
    console.log('Reusing running server at', BASE_URL);
  } catch {
    serverProc = spawn('npx', ['vite', '--host', '127.0.0.1', '--port', String(PORT)], {
      cwd: '/workspace',
      stdio: 'ignore'
    });
    await waitForServer(BASE_URL, 15000);
    console.log('Started temporary Vite server at', BASE_URL);
  }

  console.log('[2/4] Launching headless Chromium (/usr/local/bin/google-chrome)...');
  const browser = await chromium.launch({
    executablePath: '/usr/local/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu', '--hide-scrollbars']
  });

  try {
    // Part A: Render PNG derivatives of static SVG assets (including social preview card)
    const assetSpecs = [
      { svg: 'social-preview-card.svg', png: 'social-preview-card.png', w: 1200, h: 630 },
      { svg: 'hero-exoskeleton-interface.svg', png: 'hero-exoskeleton-interface.png', w: 1200, h: 675 },
      { svg: 'annotated-interface-diagram.svg', png: 'annotated-interface-diagram.png', w: 1100, h: 820 },
      { svg: 'interface-mind-map.svg', png: 'interface-mind-map.png', w: 1400, h: 720 }
    ];

    for (const spec of assetSpecs) {
      const page = await browser.newPage({ viewport: { width: spec.w, height: spec.h, deviceScaleFactor: 1 } });
      await page.goto(`${BASE_URL}/assets/${spec.svg}`, { waitUntil: 'networkidle' });
      await page.evaluate(() => document.fonts ? document.fonts.ready : Promise.resolve());
      const outPath = path.join(ASSETS_DIR, spec.png);
      await page.screenshot({ path: outPath, type: 'png' });
      await page.close();
      console.log(`Rendered PNG asset: ${outPath} (${spec.w}x${spec.h})`);
    }

    // Part B: Render 1,020 authoritative frames (0..1019) at 1920x1080 into H.264 MP4 at constant 30 fps
    console.log('[3/4] Opening 1920x1080 export stage and starting ffmpeg pipe...');
    const exportPage = await browser.newPage({
      viewport: { width: 1920, height: 1080, deviceScaleFactor: 1 }
    });

    await exportPage.goto(`${BASE_URL}/?export=1&frame=0`, { waitUntil: 'networkidle' });
    await exportPage.waitForFunction(() => window.__exportReady === true);
    await exportPage.evaluate(() => (document.fonts ? document.fonts.ready : Promise.resolve()));

    const ffmpegArgs = [
      '-y',
      '-f', 'image2pipe',
      '-vcodec', 'mjpeg',
      '-framerate', String(FPS),
      '-i', '-',
      '-frames:v', String(TOTAL_FRAMES),
      '-c:v', 'libx264',
      '-preset', 'fast',
      '-crf', '18',
      '-pix_fmt', 'yuv420p',
      '-r', String(FPS),
      '-vsync', 'cfr',
      '-movflags', '+faststart',
      VIDEO_OUT
    ];

    const ffmpeg = spawn('ffmpeg', ffmpegArgs, { stdio: ['pipe', 'inherit', 'inherit'] });

    const ffmpegExitPromise = new Promise((resolve, reject) => {
      ffmpeg.on('close', (code) => {
        if (code === 0) resolve();
        else reject(new Error(`ffmpeg exited with code ${code}`));
      });
      ffmpeg.on('error', reject);
    });

    const startRenderTime = Date.now();
    for (let frameIdx = 0; frameIdx < TOTAL_FRAMES; frameIdx++) {
      await exportPage.evaluate((f) => {
        window.__setExportFrame(f);
      }, frameIdx);

      const buf = await exportPage.screenshot({
        type: 'jpeg',
        quality: 94,
        clip: { x: 0, y: 0, width: 1920, height: 1080 }
      });

      const canContinue = ffmpeg.stdin.write(buf);
      if (!canContinue) {
        await new Promise((r) => ffmpeg.stdin.once('drain', r));
      }

      if ((frameIdx + 1) % 150 === 0 || frameIdx === TOTAL_FRAMES - 1) {
        const elapsed = ((Date.now() - startRenderTime) / 1000).toFixed(1);
        console.log(`Captured frame ${frameIdx + 1} / ${TOTAL_FRAMES} (${elapsed}s elapsed)`);
      }
    }

    ffmpeg.stdin.end();
    await ffmpegExitPromise;
    await exportPage.close();
    console.log(`[4/4] Successfully encoded ${TOTAL_FRAMES}-frame video to ${VIDEO_OUT}`);
  } finally {
    await browser.close();
    if (serverProc) {
      serverProc.kill('SIGTERM');
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
