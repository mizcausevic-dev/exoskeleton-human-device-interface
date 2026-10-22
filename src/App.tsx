import { useEffect, useState } from 'react';
import { HeroSection } from './components/HeroSection';
import { InteractiveExplainerSection } from './components/InteractiveExplainerSection';
import { AnnotatedDiagramSection } from './components/AnnotatedDiagramSection';
import { MindMapSection } from './components/MindMapSection';
import { ArticleSection } from './components/ArticleSection';
import { SourcesAndLimitationsSection } from './components/SourcesAndLimitationsSection';
import { ExplainerStageSvg } from './components/ExplainerStageSvg';
import { clampFrame } from './engine/sceneState';

declare global {
  interface Window {
    __setExportFrame?: (f: number) => void;
    __exportReady?: boolean;
  }
}

export function App() {
  const [exportParams] = useState(() => {
    if (typeof window === 'undefined') return { isExport: false, initialFrame: 0 };
    const params = new URLSearchParams(window.location.search);
    const isExport = params.get('export') === '1';
    const rawFrame = Number(params.get('frame') ?? '0');
    return {
      isExport,
      initialFrame: clampFrame(rawFrame)
    };
  });

  const [exportFrame, setExportFrame] = useState<number>(exportParams.initialFrame);

  useEffect(() => {
    if (exportParams.isExport) {
      window.__setExportFrame = (f: number) => {
        setExportFrame(clampFrame(f));
      };
      window.__exportReady = true;
    }
  }, [exportParams.isExport]);

  // Dedicated 1920x1080 control-free stage for deterministic frame-by-frame video export
  if (exportParams.isExport) {
    return (
      <main
        id="export-stage-root"
        style={{
          width: '1920px',
          height: '1080px',
          overflow: 'hidden',
          backgroundColor: '#0B1019',
          margin: 0,
          padding: 0
        }}
      >
        <ExplainerStageSvg frame={exportFrame} exportMode={true} />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1019] text-slate-100 flex flex-col">
      {/* Skip to main content link for keyboard accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:px-4 focus:py-2 focus:rounded-lg focus:bg-cyan-400 focus:text-slate-950 focus:font-mono focus:font-bold"
      >
        Skip to main content
      </a>

      {/* Sticky Editorial Navigation Header */}
      <header className="sticky top-0 z-40 bg-[#0B1019]/90 backdrop-blur-md border-b border-slate-800/90">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 shadow-[0_0_10px_#00E5FF]" />
            <a
              href="#hero"
              className="font-mono text-xs sm:text-sm font-bold tracking-wider text-slate-100 hover:text-cyan-300 transition"
            >
              EXOSKELETON HUMAN–DEVICE INTERFACE
            </a>
          </div>

          <nav aria-label="Primary sections" className="hidden md:flex items-center gap-1 text-xs font-mono">
            {[
              { href: '#hero', label: '01. Hero' },
              { href: '#explainer', label: '02. 34s Explainer' },
              { href: '#diagram', label: '03. Interface Diagram' },
              { href: '#mindmap', label: '04. Mind Map' },
              { href: '#article', label: '05. Article' },
              { href: '#sources', label: '06. Sources & Ledger' }
            ].map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-3 py-1.5 rounded-lg text-slate-300 hover:text-cyan-300 hover:bg-slate-900 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <a
              href="video/exoskeleton-interface-explainer-1080p.mp4"
              download="exoskeleton-interface-explainer-1080p.mp4"
              className="px-3 py-1.5 rounded-lg font-mono text-xs bg-slate-900 border border-slate-700 text-amber-300 hover:border-amber-400 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              1080p MP4
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main id="main-content" className="flex-1">
        <HeroSection />
        <InteractiveExplainerSection />
        <AnnotatedDiagramSection />
        <MindMapSection />
        <ArticleSection />
        <SourcesAndLimitationsSection />
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 text-xs text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="font-mono text-slate-200 font-bold">
              EXOSKELETON HUMAN–DEVICE INTERFACE // WEARABLE ASSISTIVE ROBOTICS
            </div>
            <p>
              Educational mechanism explainer grounded in{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:underline"
              >
                Slade et al. (2022, Nature)
              </a>{' '}
              and{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11536595/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 hover:underline"
              >
                Siviy et al. (2023, Nature Biomedical Engineering)
              </a>
              . Not a clinical or operating manual.
            </p>
          </div>
          <div className="font-mono text-slate-400">
            1,020 Frames @ 30 FPS (0–1019) | 16:9 1920×1080
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
