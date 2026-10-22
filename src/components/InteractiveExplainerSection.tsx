import React, { useState, useEffect, useRef, useCallback } from 'react';
import { CHAPTERS, TIMELINE_CONSTANTS } from '../data/timelineSpec';
import { clampFrame, computeSceneState, formatFrameTime } from '../engine/sceneState';
import { ExplainerStageSvg } from './ExplainerStageSvg';

export const InteractiveExplainerSection: React.FC = () => {
  const [frame, setFrame] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [reducedMotionMode, setReducedMotionMode] = useState<boolean>(false);
  const [showFullTranscript, setShowFullTranscript] = useState<boolean>(false);
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>(
    'Player ready at Frame 0, Chapter 1: Where the device meets the body.'
  );

  // Playback timing refs: elapsed time is used ONLY to compute the authoritative frame index
  const playStartWallTimeRef = useRef<number | null>(null);
  const playStartFrameRef = useRef<number>(0);
  const rafIdRef = useRef<number | null>(null);

  // Detect OS prefers-reduced-motion on mount
  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia) {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq.matches) {
        setReducedMotionMode(true);
      }
      const listener = (e: MediaQueryListEvent) => {
        setReducedMotionMode(e.matches);
        if (e.matches) {
          setIsPlaying(false);
        }
      };
      mq.addEventListener('change', listener);
      return () => mq.removeEventListener('change', listener);
    }
  }, []);

  // Deterministic RAF loop: elapsed time selects the playback frame (0..1019) at 30 fps
  useEffect(() => {
    if (!isPlaying || reducedMotionMode) {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
      playStartWallTimeRef.current = null;
      return;
    }

    const tick = (nowMs: number) => {
      if (playStartWallTimeRef.current === null) {
        playStartWallTimeRef.current = nowMs;
      }
      const elapsedSeconds = (nowMs - playStartWallTimeRef.current) / 1000;
      const nextRawFrame = playStartFrameRef.current + Math.floor(elapsedSeconds * TIMELINE_CONSTANTS.FPS);

      if (nextRawFrame >= TIMELINE_CONSTANTS.MAX_FRAME) {
        // Hold frame 1019 at completion; do not append an extra frame at t = 34s
        setFrame(TIMELINE_CONSTANTS.MAX_FRAME);
        setIsPlaying(false);
        setLiveAnnouncement(
          'Playback completed and holding on final frame 1019 (33.96 seconds), Chapter 5 takeaway.'
        );
        return;
      }

      setFrame(clampFrame(nextRawFrame));
      rafIdRef.current = requestAnimationFrame(tick);
    };

    rafIdRef.current = requestAnimationFrame(tick);

    return () => {
      if (rafIdRef.current !== null) {
        cancelAnimationFrame(rafIdRef.current);
        rafIdRef.current = null;
      }
    };
  }, [isPlaying, reducedMotionMode]);

  const seekToFrame = useCallback((targetFrame: number, announceReason?: string) => {
    const clamped = clampFrame(targetFrame);
    setFrame(clamped);
    playStartFrameRef.current = clamped;
    playStartWallTimeRef.current = performance.now();
    if (announceReason) {
      const targetState = computeSceneState(clamped);
      setLiveAnnouncement(
        `${announceReason}: Frame ${clamped} (${targetState.timeFormatted}), ${targetState.chapter.title}.`
      );
    }
  }, []);

  const handleTogglePlay = () => {
    if (reducedMotionMode) {
      setReducedMotionMode(false);
    }
    if (isPlaying) {
      setIsPlaying(false);
      const st = computeSceneState(frame);
      setLiveAnnouncement(`Paused at Frame ${frame} (${st.timeFormatted}), ${st.chapter.title}.`);
    } else {
      // If at end (frame 1019), restart from 0 when play is pressed
      const startFrom = frame >= TIMELINE_CONSTANTS.MAX_FRAME ? 0 : frame;
      setFrame(startFrom);
      playStartFrameRef.current = startFrom;
      playStartWallTimeRef.current = null;
      setIsPlaying(true);
      const st = computeSceneState(startFrom);
      setLiveAnnouncement(`Playing from Frame ${startFrom} (${st.timeFormatted}), ${st.chapter.title}.`);
    }
  };

  const handleRestart = () => {
    setIsPlaying(false);
    seekToFrame(0, 'Restarted explainer at Frame 0');
  };

  const handleKeyDownStage = (e: React.KeyboardEvent) => {
    if (e.key === ' ' || e.key === 'k') {
      e.preventDefault();
      handleTogglePlay();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setIsPlaying(false);
      seekToFrame(frame + (e.shiftKey ? 30 : 1));
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setIsPlaying(false);
      seekToFrame(frame - (e.shiftKey ? 30 : 1));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setIsPlaying(false);
      seekToFrame(0, 'Jumped to start');
    } else if (e.key === 'End') {
      e.preventDefault();
      setIsPlaying(false);
      seekToFrame(TIMELINE_CONSTANTS.MAX_FRAME, 'Jumped to final hold Frame 1019');
    }
  };

  const state = computeSceneState(frame);
  const { chapter } = state;

  // Representative static frames for Reduced-Motion static chapter inspection
  const REDUCED_MOTION_KEYFRAMES = [85, 220, 410, 625, 980];

  return (
    <section
      id="explainer"
      aria-labelledby="explainer-heading"
      className="py-12 border-b border-slate-800/80"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-wider mb-3">
              <span>Deterministic 34s Motion Explainer</span>
              <span>•</span>
              <span>30 FPS</span>
              <span>•</span>
              <span>1,020 Frames (0–1019)</span>
            </div>
            <h2 id="explainer-heading" className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              Interactive Mechanism Explainer
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-3xl">
              Scene state is evaluated deterministically from a single authoritative frame index (<code className="text-cyan-300 font-mono">0–1019</code>). Scrubbing, chapter selection, reduced-motion inspection, and 1080p MP4 export invoke the identical state function.
            </p>
          </div>

          {/* Reduced Motion Toggle & Exported MP4 Download/View Link */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="button"
              onClick={() => {
                const next = !reducedMotionMode;
                setReducedMotionMode(next);
                if (next) setIsPlaying(false);
                setLiveAnnouncement(
                  next
                    ? 'Reduced-motion static chapter presentation enabled.'
                    : 'Interactive timeline playback mode enabled.'
                );
              }}
              aria-pressed={reducedMotionMode}
              className={`px-3.5 py-2 rounded-lg text-xs font-mono border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                reducedMotionMode
                  ? 'bg-purple-950/80 border-purple-400 text-purple-200'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-500'
              }`}
            >
              {reducedMotionMode ? '✓ Reduced-Motion Static View Active' : 'Switch to Reduced-Motion Static View'}
            </button>

            <a
              href="video/exoskeleton-interface-explainer-1080p.mp4"
              download="exoskeleton-interface-explainer-1080p.mp4"
              className="px-3.5 py-2 rounded-lg text-xs font-mono bg-amber-500/15 border border-amber-400/50 text-amber-300 hover:bg-amber-500/25 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
            >
              ↓ Download Encoded 1080p MP4 (1,020 Frames)
            </a>
          </div>
        </div>

        {/* Restrained Screen-Reader Live Region (Does NOT announce every frame) */}
        <div className="sr-only" aria-live="polite" aria-atomic="true">
          {liveAnnouncement}
        </div>

        {/* Chapter Navigation Bar */}
        <nav aria-label="Explainer chapters" className="grid grid-cols-1 sm:grid-cols-5 gap-2 mb-4">
          {CHAPTERS.map((chap, idx) => {
            const isActive = state.chapterIndex === idx;
            return (
              <button
                key={chap.id}
                type="button"
                onClick={() => {
                  setIsPlaying(false);
                  const target = reducedMotionMode ? REDUCED_MOTION_KEYFRAMES[idx] : chap.frameStart;
                  seekToFrame(target, `Selected ${chap.title}`);
                }}
                aria-current={isActive ? 'step' : undefined}
                className={`text-left p-3 rounded-xl border transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isActive
                    ? 'bg-slate-900/95 border-cyan-400 shadow-[0_0_20px_rgba(0,229,255,0.12)]'
                    : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 text-slate-400'
                }`}
              >
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <span className={isActive ? 'text-cyan-300 font-bold' : 'text-slate-400'}>
                    CH {chap.id}
                  </span>
                  <span className="text-slate-400">
                    F{chap.frameStart}–{chap.frameEnd}
                  </span>
                </div>
                <div className={`text-xs sm:text-sm font-semibold line-clamp-2 ${isActive ? 'text-slate-100' : 'text-slate-300'}`}>
                  {chap.onScreenHeadline}
                </div>
              </button>
            );
          })}
        </nav>

        {/* Primary Stage Viewport OR Reduced-Motion Static Chapter Grid */}
        {!reducedMotionMode ? (
          <div
            tabIndex={0}
            onKeyDown={handleKeyDownStage}
            role="region"
            aria-label="Interactive 16:9 Explainer Viewport. Press Space to play or pause, Left and Right arrows to step frames."
            className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0B1019] shadow-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {/* 16:9 Responsive SVG Stage */}
            <div className="relative w-full aspect-video bg-[#0B1019]">
              <ExplainerStageSvg frame={frame} />
            </div>

            {/* Player Control Bar */}
            <div className="bg-slate-950/95 border-t border-slate-800 p-4">
              <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                {/* Transport Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleTogglePlay}
                    aria-label={isPlaying ? 'Pause explainer playback' : 'Play explainer'}
                    className="px-4 py-2 rounded-lg font-mono text-xs sm:text-sm font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
                  >
                    {isPlaying ? '⏸ Pause' : frame >= TIMELINE_CONSTANTS.MAX_FRAME ? '↺ Replay' : '▶ Play'}
                  </button>

                  <button
                    type="button"
                    onClick={handleRestart}
                    aria-label="Restart explainer at Frame 0"
                    className="px-3 py-2 rounded-lg font-mono text-xs bg-slate-900 text-slate-200 border border-slate-700 hover:border-slate-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    ⏮ Restart (F0)
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      seekToFrame(frame - 1, 'Stepped back 1 frame');
                    }}
                    aria-label="Step backward 1 frame"
                    className="px-2.5 py-2 rounded-lg font-mono text-xs bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    −1F
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      seekToFrame(frame + 1, 'Stepped forward 1 frame');
                    }}
                    aria-label="Step forward 1 frame"
                    className="px-2.5 py-2 rounded-lg font-mono text-xs bg-slate-900 text-slate-300 border border-slate-800 hover:border-slate-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
                  >
                    +1F
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsPlaying(false);
                      seekToFrame(960, 'Jumped to final hold interval (Frames 960–1019)');
                    }}
                    aria-label="Jump to final hold interval at Frame 960"
                    className="px-3 py-2 rounded-lg font-mono text-xs bg-purple-950/60 text-purple-200 border border-purple-500/40 hover:border-purple-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
                  >
                    Hold (F960–1019)
                  </button>
                </div>

                {/* Scrubber Slider */}
                <div className="flex-1 flex flex-col gap-1">
                  <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                    <label htmlFor="timeline-scrubber" className="text-slate-300 font-semibold">
                      Timeline Scrubber (Authoritative Frame Index)
                    </label>
                    <span>
                      Frame <strong className="text-cyan-300">{frame}</strong> / 1019 •{' '}
                      <strong className="text-amber-300">{formatFrameTime(frame)}</strong> / 34.00s
                      {state.isFinalHold && (
                        <span className="ml-2 px-1.5 py-0.5 rounded bg-purple-950 text-purple-300 border border-purple-500/40">
                          FINAL HOLD (960–1019)
                        </span>
                      )}
                    </span>
                  </div>
                  <input
                    id="timeline-scrubber"
                    type="range"
                    min={TIMELINE_CONSTANTS.MIN_FRAME}
                    max={TIMELINE_CONSTANTS.MAX_FRAME}
                    step={1}
                    value={frame}
                    aria-label="Timeline frame scrubber from frame 0 to frame 1019"
                    aria-valuemin={0}
                    aria-valuemax={1019}
                    aria-valuenow={frame}
                    aria-valuetext={`Frame ${frame} of 1019, ${ state.timeFormatted }, ${chapter.title}`}
                    onChange={(e) => {
                      setIsPlaying(false);
                      seekToFrame(Number(e.target.value));
                    }}
                    className="w-full accent-cyan-400 cursor-pointer h-2 bg-slate-800 rounded-lg"
                  />
                  {/* Chapter tick markers under scrubber */}
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 pt-0.5">
                    <span>0s (F0)</span>
                    <span>5s (F150)</span>
                    <span>10s (F300)</span>
                    <span>17s (F510)</span>
                    <span>25s (F750)</span>
                    <span>32s Hold (F960)</span>
                    <span>34s End (F1019)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Reduced-Motion Static Chapter Presentation */
          <div className="space-y-6 bg-slate-900/50 border border-purple-500/40 rounded-2xl p-6">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div>
                <span className="text-xs font-mono uppercase text-purple-300 font-bold">
                  Reduced-Motion Presentation Mode
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-0.5">
                  Static Chapter Keyframes (Zero Continuous Motion)
                </h3>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Select any chapter tab above or inspect all 5 static chapter compositions below
              </span>
            </div>

            <div className="grid grid-cols-1 gap-8">
              {CHAPTERS.map((chap, idx) => {
                const keyframe = REDUCED_MOTION_KEYFRAMES[idx];
                return (
                  <div key={chap.id} className="rounded-xl border border-slate-800 bg-[#0B1019] overflow-hidden">
                    <div className="p-4 bg-slate-950 border-b border-slate-800 flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <span className="text-xs font-mono text-cyan-300 font-bold">{chap.title}</span>
                        <p className="text-xs font-mono text-slate-400">{chap.timeRangeLabel} — Static Reference Frame {keyframe}</p>
                      </div>
                      <span className="text-xs font-mono px-2.5 py-1 rounded bg-slate-900 border border-slate-700 text-amber-300">
                        {chap.transformationBadge}
                      </span>
                    </div>
                    <div className="aspect-video w-full">
                      <ExplainerStageSvg frame={keyframe} compactMobile={false} />
                    </div>
                    <div className="p-4 bg-slate-950/90 border-t border-slate-800">
                      <p className="text-sm text-slate-200 leading-relaxed">{chap.explanatoryText}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Dedicated Synchronized Explanatory Text & Mobile-Friendly Epistemic Breakdown */}
        <div className="mt-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Synchronized Explanatory Text Card (Understanding without Audio) */}
          <div className="lg:col-span-7 rounded-xl bg-slate-900/70 border border-slate-800 p-5">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono uppercase tracking-wider text-cyan-300 font-bold">
                Synchronized Explanatory Text (No Audio Required)
              </span>
              <span className="text-xs font-mono text-slate-400">
                {chapter.timeRangeLabel}
              </span>
            </div>
            <h3 className="text-lg font-bold text-slate-100 mb-2">
              {chapter.title}: {chapter.onScreenHeadline}
            </h3>
            <p className="text-slate-200 text-sm sm:text-base leading-relaxed mb-4">
              {chapter.explanatoryText}
            </p>

            {/* Key Callouts List (Mobile-Adapted Readable Companion) */}
            <div className="border-t border-slate-800 pt-3">
              <h4 className="text-xs font-mono uppercase text-amber-300 font-semibold mb-2">
                Active Stage Callouts ({chapter.transformationBadge})
              </h4>
              <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs sm:text-sm text-slate-300">
                {chapter.onScreenCallouts.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 bg-slate-950/60 p-2.5 rounded-lg border border-slate-800/80">
                    <span className="text-cyan-400 font-mono font-bold">0{i + 1}</span>
                    <span>{c}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Epistemic Boundary Card: Documented vs. Simplified vs. Not Established */}
          <div className="lg:col-span-5 rounded-xl bg-slate-900/70 border border-slate-800 p-5 flex flex-col justify-between space-y-4">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-purple-300 font-bold">
                Chapter Epistemic Audit
              </span>
              <h3 className="text-base font-bold text-slate-100 mt-1">
                What is Documented vs. Simplified in Chapter {chapter.id}
              </h3>

              <div className="mt-3 space-y-3 text-xs sm:text-sm">
                <div className="p-2.5 rounded-lg bg-slate-950/70 border-l-2 border-cyan-400">
                  <div className="font-mono text-xs text-cyan-300 font-bold mb-1">DOCUMENTED IN SOURCES</div>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {chapter.documentedFacts.map((f, i) => (
                      <li key={i}>{f}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border-l-2 border-amber-400">
                  <div className="font-mono text-xs text-amber-300 font-bold mb-1">SIMPLIFIED OR CONCEPTUAL</div>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {chapter.simplifiedOrConceptual.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/70 border-l-2 border-purple-400">
                  <div className="font-mono text-xs text-purple-300 font-bold mb-1">NOT ESTABLISHED BY THIS VIEW</div>
                  <ul className="list-disc list-inside text-slate-300 space-y-1">
                    {chapter.notEstablished.map((n, i) => (
                      <li key={i}>{n}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Complete Synchronized Text Transcript Accordion */}
        <div className="mt-6 rounded-xl bg-slate-900/50 border border-slate-800 overflow-hidden">
          <button
            type="button"
            onClick={() => setShowFullTranscript(!showFullTranscript)}
            aria-expanded={showFullTranscript}
            className="w-full px-5 py-4 text-left flex items-center justify-between bg-slate-900 hover:bg-slate-800/80 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            <div>
              <span className="text-xs font-mono uppercase text-cyan-300 font-bold block">
                Complete Text Transcript (All 5 Chapters, Frames 0–1019)
              </span>
              <span className="text-sm text-slate-300">
                Full time-coded visual and explanatory transcript for non-visual and assistive reading
              </span>
            </div>
            <span className="text-xs font-mono px-3 py-1.5 rounded bg-slate-950 border border-slate-700 text-slate-200">
              {showFullTranscript ? 'Hide Transcript ▲' : 'Expand Full Transcript ▼'}
            </span>
          </button>

          {showFullTranscript && (
            <div className="p-5 divide-y divide-slate-800 space-y-4 bg-slate-950/70">
              {CHAPTERS.map((chap) => (
                <div key={chap.id} className="pt-4 first:pt-0">
                  <div className="flex items-center justify-between text-xs font-mono text-cyan-300 mb-1">
                    <strong>{chap.title}</strong>
                    <span>{chap.timeRangeLabel}</span>
                  </div>
                  <p className="text-sm text-slate-300 leading-relaxed">{chap.transcriptSegment}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
