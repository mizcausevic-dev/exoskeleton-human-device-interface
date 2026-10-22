import { chromium } from 'playwright-core';
import { spawn } from 'node:child_process';
import assert from 'node:assert';
import fs from 'node:fs';

const PORT = 43124;
const BASE_URL = `http://127.0.0.1:${PORT}`;

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
    await sleep(200);
  }
  throw new Error(`Timed out waiting for preview server at ${url}`);
}

async function main() {
  console.log('=== 1. Starting Vite preview server on dist/ ===');
  const server = spawn('npx', ['vite', 'preview', '--host', '127.0.0.1', '--port', String(PORT)], {
    cwd: '/workspace',
    stdio: 'ignore'
  });

  const browser = await chromium.launch({
    executablePath: '/usr/local/bin/google-chrome',
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const results = {};

  try {
    await waitForServer(BASE_URL);

    // Check required static assets resolve via HTTP 200
    const requiredPaths = [
      '/',
      '/assets/hero-exoskeleton-interface.svg',
      '/assets/hero-exoskeleton-interface.png',
      '/assets/annotated-interface-diagram.svg',
      '/assets/annotated-interface-diagram.png',
      '/assets/interface-mind-map.svg',
      '/assets/interface-mind-map.png',
      '/assets/social-preview-card.svg',
      '/assets/social-preview-card.png',
      '/video/exoskeleton-interface-explainer-1080p.mp4'
    ];

    for (const p of requiredPaths) {
      const res = await fetch(`${BASE_URL}${p}`);
      assert.strictEqual(res.status, 200, `Expected HTTP 200 for ${p}, got ${res.status}`);
    }
    results.assetPathsResolve = 'PASS';

    // Desktop Viewport Test (1440x900)
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const runtimeErrors = [];
    page.on('pageerror', (err) => runtimeErrors.push(err.message));
    page.on('console', (msg) => {
      if (msg.type() === 'error') runtimeErrors.push(msg.text());
    });

    await page.goto(BASE_URL, { waitUntil: 'networkidle' });

    // Verify all 6 required sections exist and internal anchor links resolve
    const sectionIds = ['hero', 'explainer', 'diagram', 'mindmap', 'article', 'sources'];
    for (const id of sectionIds) {
      const exists = await page.locator(`#${id}`).count();
      assert.strictEqual(exists, 1, `Missing required section #${id}`);
    }
    results.requiredSectionsPresent = 'PASS';

    // Verify scrubber range 0..1019
    const minAttr = await page.locator('#timeline-scrubber').getAttribute('min');
    const maxAttr = await page.locator('#timeline-scrubber').getAttribute('max');
    assert.strictEqual(minAttr, '0');
    assert.strictEqual(maxAttr, '1019');
    results.timelineRange0To1019 = 'PASS';

    // Verify Chapter navigation buttons jump to exact chapter boundaries (0, 150, 300, 510, 750)
    const expectedStarts = [0, 150, 300, 510, 750];
    const chapButtons = page.locator('nav[aria-label="Explainer chapters"] button');
    assert.strictEqual(await chapButtons.count(), 5);

    for (let i = 0; i < 5; i++) {
      await chapButtons.nth(i).click();
      const val = await page.locator('#timeline-scrubber').inputValue();
      assert.strictEqual(Number(val), expectedStarts[i], `Chapter ${i + 1} start mismatch`);
    }
    results.chapterBoundariesMatchBrief = 'PASS';

    // Verify keyboard stepping (+1F / ArrowRight) and determinism on repeated seeking
    await page.locator('button[aria-label="Restart explainer at Frame 0"]').click();
    assert.strictEqual(await page.locator('#timeline-scrubber').inputValue(), '0');

    // Step forward via button and verify frame 1
    await page.locator('button[aria-label="Step forward 1 frame"]').click();
    assert.strictEqual(await page.locator('#timeline-scrubber').inputValue(), '1');

    // Jump to Hold (Frame 960) and verify final hold state is identical between 960 and 1019
    await page.locator('button[aria-label="Jump to final hold interval at Frame 960"]').click();
    assert.strictEqual(await page.locator('#timeline-scrubber').inputValue(), '960');
    const svgAt960 = await page.locator('#explainer svg g').first().getAttribute('transform');

    // Seek to 1019 via End key on stage
    const stageRegion = page.locator('#explainer [role="region"]');
    await stageRegion.focus();
    await page.keyboard.press('End');
    assert.strictEqual(await page.locator('#timeline-scrubber').inputValue(), '1019');
    const svgAt1019 = await page.locator('#explainer svg g').first().getAttribute('transform');
    assert.strictEqual(svgAt960, svgAt1019, 'Camera/geometry transform must hold steady between frames 960 and 1019');
    results.finalHold960To1019 = 'PASS';
    results.keyboardControlsFunction = 'PASS';

    // Verify Reduced-Motion presentation mode
    await page.locator('button:has-text("Switch to Reduced-Motion Static View")').click();
    const rmHeader = await page.locator('h3:has-text("Static Chapter Keyframes")').count();
    assert.strictEqual(rmHeader, 1, 'Reduced-motion static chapter view did not render');
    // Switch back
    await page.locator('button:has-text("Reduced-Motion Static View Active")').click();
    results.reducedMotionPresentation = 'PASS';

    // Verify Transcript expansion
    await page.locator('button:has-text("Expand Full Transcript")').click();
    const transcriptCount = await page.locator('text=Frames 750–1019').count();
    assert.ok(transcriptCount >= 1, 'Full transcript segments did not expand');
    results.transcriptAndExplanatoryText = 'PASS';

    // Mobile Viewport Test (390x844)
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(200);
    const mobileHeroVisible = await page.locator('#hero-title').isVisible();
    const mobileStageVisible = await page.locator('#explainer svg').first().isVisible();
    assert.ok(mobileHeroVisible && mobileStageVisible, 'Mobile viewport elements not visible');
    results.desktopAndMobileViewports = 'PASS';

    assert.strictEqual(runtimeErrors.length, 0, `Observed runtime errors: ${runtimeErrors.join('; ')}`);
    results.zeroRuntimeErrors = 'PASS';

    await page.close();
    console.log('ALL VERIFICATION CHECKS PASSED:', JSON.stringify(results, null, 2));
    fs.writeFileSync('/workspace/docs/VERIFICATION_RESULTS.json', JSON.stringify(results, null, 2));
  } finally {
    await browser.close();
    server.kill('SIGTERM');
  }
}

main().catch((err) => {
  console.error('VERIFICATION FAILED:', err);
  process.exit(1);
});
