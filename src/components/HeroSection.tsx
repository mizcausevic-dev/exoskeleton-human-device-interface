import React from 'react';

export const HeroSection: React.FC = () => {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-slate-800/80 bg-[#0B1019] pt-8 pb-14"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Editorial Copy & Architecture Framing */}
          <div className="lg:col-span-6 space-y-5">
            <div className="inline-flex flex-wrap items-center gap-2 px-3 py-1.5 rounded-full bg-slate-900 border border-slate-700 text-xs font-mono text-cyan-300">
              <span>INDUSTRY: WEARABLE ASSISTIVE ROBOTICS</span>
              <span className="text-slate-600">|</span>
              <span className="text-amber-300">DOCUMENTED ANKLE ARCHITECTURE</span>
            </div>

            <h1
              id="hero-title"
              className="text-3xl sm:text-5xl font-extrabold tracking-tight text-slate-50 leading-[1.1]"
            >
              EXOSKELETON HUMAN–DEVICE INTERFACE
            </h1>

            <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
              How attachment, structure, sensing, and actuation connect a wearable robot to a moving person.
            </p>

            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              A wearable robot never bolts directly to a mathematical joint center. Every newton-meter of assistive torque must cross textile straps, footwear soles, and compliant soft tissue while tracking a shifting biological joint axis. Grounded in the untethered ankle exoskeleton documented by{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Slade et al. (2022, Nature)
              </a>{' '}
              and the locomotor assistance review by{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11536595/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Siviy et al. (2023, Nature Biomedical Engineering)
              </a>
              , this interactive technical stage dissects what connects to what, what causes what, and where evidence ends.
            </p>

            {/* Primary Navigation CTAs */}
            <div className="flex flex-wrap items-center gap-3 pt-2">
              <a
                href="#explainer"
                className="px-5 py-3 rounded-xl font-mono text-xs sm:text-sm font-bold bg-cyan-400 text-slate-950 hover:bg-cyan-300 transition shadow-lg shadow-cyan-500/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300"
              >
                ▶ Launch 34s Interactive Explainer
              </a>
              <a
                href="#diagram"
                className="px-4 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-slate-900 text-slate-200 border border-slate-700 hover:border-slate-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Inspect Interface Diagram
              </a>
              <a
                href="#article"
                className="px-4 py-3 rounded-xl font-mono text-xs sm:text-sm font-semibold bg-slate-900 text-slate-200 border border-slate-700 hover:border-slate-500 transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
              >
                Read Technical Article
              </a>
            </div>

            {/* Key Documented Architecture Pill Strip */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-800/90 text-xs font-mono">
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400">DISTAL MASS</div>
                <div className="text-slate-100 font-bold text-sm mt-0.5">1.2 kg / ankle</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400">PEAK TORQUE</div>
                <div className="text-amber-300 font-bold text-sm mt-0.5">54 Nm (1.5 m/s)</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400">CONTROL LOOP</div>
                <div className="text-cyan-300 font-bold text-sm mt-0.5">200 Hz Onboard</div>
              </div>
              <div className="p-2.5 rounded-lg bg-slate-900/60 border border-slate-800">
                <div className="text-slate-400">WAIST BATTERY</div>
                <div className="text-purple-300 font-bold text-sm mt-0.5">0.3 kg (24 V)</div>
              </div>
            </div>
          </div>

          {/* Original Landscape Editorial Hero Artwork (Editable Vector + Downloadable SVG) */}
          <div className="lg:col-span-6">
            <figure className="rounded-2xl overflow-hidden border border-slate-800 bg-[#0B1019] shadow-2xl">
              <svg
                viewBox="0 0 1200 675"
                className="w-full h-auto block"
                role="img"
                aria-labelledby="hero-svg-title hero-svg-desc"
              >
                <title id="hero-svg-title">
                  Editorial Hero Artwork: Untethered Ankle Exoskeleton Human–Device Interface
                </title>
                <desc id="hero-svg-desc">
                  Original technical vector illustration showing the lower limb in late-stance push-off wearing an untethered ankle exoskeleton, highlighting the waist battery supply, below-knee calf cuff, shank-mounted brushless motor and drum, Vectran cable transmission, heel spur with strain-gauge bridge, and carbon-fiber sole plate.
                </desc>
                <defs>
                  <pattern id="hero-grid" width="36" height="36" patternUnits="userSpaceOnUse">
                    <path d="M 36 0 L 0 0 0 36" fill="none" stroke="#1E293B" strokeWidth="1" strokeOpacity="0.6" />
                  </pattern>
                  <linearGradient id="hero-glow-bg" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#0B1019" />
                    <stop offset="55%" stopColor="#111A2E" />
                    <stop offset="100%" stopColor="#0B1019" />
                  </linearGradient>
                  <marker id="hero-arrow-gold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1 L 10 5 L 0 9 z" fill="#FFD166" />
                  </marker>
                  <marker id="hero-arrow-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                    <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#00E5FF" />
                  </marker>
                </defs>

                <rect width="1200" height="675" fill="url(#hero-glow-bg)" />
                <rect width="1200" height="675" fill="url(#hero-grid)" />

                {/* Editorial Framing Arcs (Conceptual Stage Boundary) */}
                <circle
                  cx="650"
                  cy="410"
                  r="220"
                  fill="none"
                  stroke="#9D4EDD"
                  strokeWidth="1.5"
                  strokeDasharray="10 8"
                  strokeOpacity="0.55"
                />
                <circle
                  cx="650"
                  cy="410"
                  r="145"
                  fill="none"
                  stroke="#00E5FF"
                  strokeWidth="1.2"
                  strokeDasharray="4 6"
                  strokeOpacity="0.4"
                />

                {/* Ground Reference Datum */}
                <line x1="80" y1="590" x2="1120" y2="590" stroke="#334155" strokeWidth="2.5" />

                {/* Left Editorial Typography Zone inside SVG */}
                <g transform="translate(56, 58)">
                  <text x="0" y="0" fill="#00E5FF" fontSize="13" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                    ARCHITECTURAL STAGE // SLADE ET AL. (2022) + SIVIY ET AL. (2023)
                  </text>
                  <text x="0" y="34" fill="#F8FAFC" fontSize="26" fontWeight="700">
                    Coupling Mechanical Work
                  </text>
                  <text x="0" y="64" fill="#F8FAFC" fontSize="26" fontWeight="700">
                    to Biological Locomotion
                  </text>

                  {/* Color Legend Key */}
                  <g transform="translate(0, 100)">
                    <rect x="0" y="0" width="320" height="148" rx="10" fill="#0F172A" fillOpacity="0.9" stroke="#1E293B" strokeWidth="1.5" />
                    <text x="16" y="26" fill="#94A3B8" fontSize="11.5" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                      EXPLANATORY COLOR & LINE SYSTEM
                    </text>
                    <line x1="16" y1="48" x2="54" y2="48" stroke="#00E5FF" strokeWidth="2.5" strokeDasharray="6 4" markerEnd="url(#hero-arrow-cyan)" />
                    <text x="66" y="52" fill="#E2E8F0" fontSize="13">
                      200 Hz Sensor & Control Signals
                    </text>
                    <line x1="16" y1="78" x2="54" y2="78" stroke="#FFD166" strokeWidth="3.5" markerEnd="url(#hero-arrow-gold)" />
                    <text x="66" y="82" fill="#E2E8F0" fontSize="13">
                      Actuation, Force & Torque Paths
                    </text>
                    <rect x="16" y="98" width="38" height="14" rx="3" fill="#9D4EDD" fillOpacity="0.25" stroke="#9D4EDD" strokeWidth="1.5" strokeDasharray="4 2" />
                    <text x="66" y="110" fill="#E2E8F0" fontSize="13">
                      Controller & System Boundaries
                    </text>
                    <rect x="16" y="124" width="38" height="12" rx="2" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
                    <text x="66" y="135" fill="#CBD5E1" fontSize="13">
                      Schematic Anatomy & Struts
                    </text>
                  </g>
                </g>

                {/* Central-Right Articulated Lower Limb & Exoskeleton Assembly in Push-Off */}
                <g transform="translate(650, 445)">
                  {/* Tilted Shank + Exoskeleton Upper Frame */}
                  <g transform="rotate(14)">
                    {/* Soft-tissue shank silhouette */}
                    <path
                      d="M -56 -295 C -64 -195, -50 -90, -34 -12 L 38 -12 C 56 -90, 68 -195, 58 -295 Z"
                      fill="#1E293B"
                      fillOpacity="0.7"
                      stroke="#475569"
                      strokeWidth="2"
                    />
                    {/* Schematic Tibia & Fibula */}
                    <path d="M -22 -285 L -14 -18 L 14 -18 L 20 -285 Z" fill="#334155" stroke="#94A3B8" strokeWidth="1.8" />
                    <path d="M -38 -275 L -32 -22 L -24 -22 L -28 -275 Z" fill="#273549" stroke="#64748B" strokeWidth="1.4" />

                    {/* Below-Knee Calf Cuff & Mediolateral Spacer */}
                    <rect x="-64" y="-262" width="136" height="36" rx="6" fill="#0F172A" stroke="#CBD5E1" strokeWidth="2" />
                    <rect x="28" y="-266" width="22" height="44" rx="4" fill="#475569" stroke="#E2E8F0" strokeWidth="1.5" />

                    {/* Rigid Carbon-Fiber & Aluminum Strut */}
                    <path d="M 44 -275 L 58 -275 L 52 -8 L 36 -8 Z" fill="#0F172A" stroke="#F8FAFC" strokeWidth="2.2" />

                    {/* Onboard RPi 4b Controller Box */}
                    <rect x="55" y="-215" width="46" height="62" rx="5" fill="#131B2E" stroke="#9D4EDD" strokeWidth="2" />
                    <text x="62" y="-186" fill="#E9D5FF" fontSize="10" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                      RPi4b
                    </text>
                    <text x="62" y="-170" fill="#00E5FF" fontSize="9.5" fontFamily="'JetBrains Mono', monospace">
                      200Hz
                    </text>

                    {/* CubeMars AK80-9 Motor & 7075-Al Drum */}
                    <circle cx="76" cy="-112" r="28" fill="#1E293B" stroke="#FFD166" strokeWidth="2.5" />
                    <circle cx="76" cy="-112" r="14" fill="#0F172A" stroke="#F8FAFC" strokeWidth="1.8" />

                    {/* Vectran Cable under Late-Stance Tension */}
                    <line x1="86" y1="-100" x2="92" y2="16" stroke="#FFD166" strokeWidth="4" />

                    {/* Normal Shank Reaction Vector */}
                    <line x1="28" y1="-244" x2="-36" y2="-244" stroke="#FFD166" strokeWidth="3.5" markerEnd="url(#hero-arrow-gold)" />
                  </g>

                  {/* Pitched Foot, Shoe, Carbon Plate & Heel Spur in Push-Off */}
                  <g transform="rotate(-18)">
                    {/* Running shoe silhouette */}
                    <path
                      d="M -75 15 C -82 42, -78 80, -56 96 L 175 96 C 196 96, 204 76, 185 60 L 52 18 Z"
                      fill="#1E293B"
                      stroke="#64748B"
                      strokeWidth="2"
                    />
                    {/* Schematic foot bones */}
                    <path d="M -48 22 L 22 22 L 118 72 L -44 76 Z" fill="#334155" stroke="#94A3B8" strokeWidth="1.5" />
                    {/* Embedded carbon sole plate */}
                    <rect x="-56" y="82" width="222" height="8" rx="3" fill="#0F172A" stroke="#E2E8F0" strokeWidth="1.8" />
                    {/* Toe strut */}
                    <path d="M 42 0 L 136 84 L 120 88 L 30 6 Z" fill="#0F172A" stroke="#E2E8F0" strokeWidth="2" />
                    {/* Posterior heel spur + Wheatstone strain bridge */}
                    <path d="M 40 -4 L 94 16 L 88 26 L 34 8 Z" fill="#0F172A" stroke="#E2E8F0" strokeWidth="2.2" />
                    <rect x="58" y="1" width="15" height="5" rx="1.5" fill="#00E5FF" />
                    <rect x="55" y="11" width="15" height="5" rx="1.5" fill="#00E5FF" />
                    {/* Upward heel-spur pull vector */}
                    <line x1="90" y1="16" x2="90" y2="-52" stroke="#FFD166" strokeWidth="4" markerEnd="url(#hero-arrow-gold)" />
                  </g>

                  {/* Mechanical Pin Pivot vs Biological Talocrural Axis */}
                  <circle cx="42" cy="0" r="12" fill="#0F172A" stroke="#00E5FF" strokeWidth="2.5" />
                  <circle cx="42" cy="0" r="4" fill="#FFD166" />
                  <circle cx="-6" cy="-5" r="9" fill="#9D4EDD" fillOpacity="0.35" stroke="#E9D5FF" strokeWidth="1.8" strokeDasharray="3 2" />

                  {/* Cyan Signal Pathways */}
                  <path
                    d="M 68 8 C 115 -35, 122 -120, 102 -165"
                    fill="none"
                    stroke="#00E5FF"
                    strokeWidth="2.2"
                    strokeDasharray="6 4"
                    markerEnd="url(#hero-arrow-cyan)"
                  />
                </g>

                {/* Minimal Editable SVG Callout Badges (Not Baked into Raster) */}
                <g transform="translate(835, 130)">
                  <rect x="0" y="0" width="310" height="62" rx="8" fill="#0F172A" stroke="#FFD166" strokeWidth="1.5" />
                  <text x="14" y="24" fill="#FFD166" fontSize="13" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                    SHEAR-FREE LOAD REACTION
                  </text>
                  <text x="14" y="44" fill="#E2E8F0" fontSize="12.5">
                    Rigid joint reacts axial cable tension
                  </text>
                </g>

                <g transform="translate(835, 480)">
                  <rect x="0" y="0" width="310" height="62" rx="8" fill="#0F172A" stroke="#00E5FF" strokeWidth="1.5" />
                  <text x="14" y="24" fill="#00E5FF" fontSize="13" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                    DIRECT JOINT TORQUE SENSING
                  </text>
                  <text x="14" y="44" fill="#E2E8F0" fontSize="12.5">
                    Heel-spur Wheatstone strain bridge
                  </text>
                </g>
              </svg>

              <figcaption className="px-4 py-3 bg-slate-950 border-t border-slate-800 text-xs text-slate-400 flex flex-wrap items-center justify-between gap-2">
                <span>
                  <strong>Original Hero Figure:</strong> Schematic anatomy and documented untethered ankle exoskeleton architecture (Slade et al., 2022).
                </span>
                <a
                  href="assets/hero-exoskeleton-interface.svg"
                  download="hero-exoskeleton-interface.svg"
                  className="text-cyan-300 hover:underline font-mono"
                >
                  Download Editable SVG
                </a>
              </figcaption>
            </figure>
          </div>
        </div>
      </div>
    </section>
  );
};
