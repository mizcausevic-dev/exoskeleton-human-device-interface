import React, { useState } from 'react';

interface SubsystemNode {
  id: string;
  number: string;
  title: string;
  category: 'Attachment' | 'Load Transfer' | 'Alignment' | 'Sensing & Control' | 'Actuation & Power';
  badgeColor: string;
  summary: string;
  documentedSpec: string;
  causalRole: string;
  sourceRef: string;
}

const SUBSYSTEMS: SubsystemNode[] = [
  {
    id: 'waist-battery',
    number: '01',
    title: 'Waist-Mounted Battery Pack',
    category: 'Actuation & Power',
    badgeColor: '#FFD166',
    summary: 'Rechargeable lithium-polymer battery worn at the waist to keep power-supply mass proximal to the body center of mass.',
    documentedSpec: '24 V nominal (25.2 V max to 21.6 V cutoff), 1,300 mAh capacity, 0.3 kg mass; 36.3 minutes runtime at 54 Nm peak assistance (1.5 m/s).',
    causalRole: 'Supplies electrical energy via a step-down voltage converter to the microcontroller and brushless gearmotor without adding distal foot inertia.',
    sourceRef: 'Slade et al. (2022), Fig. 4b & Methods "Untethered exoskeleton design"'
  },
  {
    id: 'calf-cuff',
    number: '02',
    title: 'Proximal Calf Strap & Mediolateral Spacers',
    category: 'Attachment',
    badgeColor: '#E2E8F0',
    summary: 'Velcro strap assembly passing through slots at the top of the carbon-fiber calf strut, paired with interchangeable mediolateral spacers.',
    documentedSpec: 'Worn just below the knee; interchangeable spacers accommodate mediolateral leg width differences across wearers.',
    causalRole: 'Anchors the upper frame to the shank and transmits normal reaction force (F_N) into the anterior/posterior shank without relying on skin shear.',
    sourceRef: 'Slade et al. (2022), Extended Data Fig. 3 & Methods'
  },
  {
    id: 'controller-electronics',
    number: '03',
    title: 'Onboard Control & Optimization Electronics',
    category: 'Sensing & Control',
    badgeColor: '#9D4EDD',
    summary: 'Shank-mounted computing and signal-conditioning module that closes the 200 Hz feedback loop and runs opportunistic optimization.',
    documentedSpec: 'Raspberry Pi 4b microcontroller + breakout board + Futek IAA100 strain-gauge amplifier; 0.15 kg total electronics mass; 200 Hz sampling and control rate.',
    causalRole: 'Segments gait cycles from insole heel strikes, tracks desired torque via feedback + iterative learning, and ranks control laws every 44 steps.',
    sourceRef: 'Slade et al. (2022), Fig. 1, Extended Data Fig. 4 & Methods'
  },
  {
    id: 'motor-drum',
    number: '04',
    title: 'Brushless Gearmotor & 7075-Al Cable Drum',
    category: 'Actuation & Power',
    badgeColor: '#FFD166',
    summary: 'High-efficiency brushless motor with integrated driver coupled to a custom machined aluminum drum.',
    documentedSpec: 'CubeMars AK80-9 (9:1 planetary gear, 18 Nm rated motor torque, 25 rad/s no-load speed, 0.5 kg) + 0.020 m radius 7075-Al drum; steady-state temp 35.4 °C.',
    causalRole: 'Converts electrical power into cable tension during mid-to-late stance and actively drives slack into the Vectran cable during swing phase.',
    sourceRef: 'Slade et al. (2022), Fig. 4c-d & Methods "Untethered exoskeleton design"'
  },
  {
    id: 'carbon-frame-joint',
    number: '05',
    title: 'Rigid Carbon-Fiber Frame, Pin Joint & Rotary Encoder',
    category: 'Alignment',
    badgeColor: '#00E5FF',
    summary: 'High-area-moment-of-inertia carbon-fiber and aluminum struts joined at a mechanical ankle pin joint housing an absolute rotary encoder.',
    documentedSpec: 'Total ankle assembly mass 1.2 kg per leg; encoder samples exoskeleton ankle angle (θ) and angular velocity (θ̇) at 200 Hz.',
    causalRole: 'Reacts the axial downward component of cable tension at the mechanical pin joint rather than as downward shear on the wearer’s skin.',
    sourceRef: 'Slade et al. (2022), Extended Data Fig. 3 & Methods (citing Witte & Collins, 2020)'
  },
  {
    id: 'heel-spur-bridge',
    number: '06',
    title: 'Posterior Heel Spur & Wheatstone Strain-Gauge Bridge',
    category: 'Load Transfer',
    badgeColor: '#00E5FF',
    summary: 'Posterior lever extending behind the shoe heel with superior and inferior strain gauges wired in a full Wheatstone bridge.',
    documentedSpec: 'Maximum lever arm 0.115 m (~5:1 drum-to-spur ratio, up to 54 Nm peak ankle torque); geometric singularity at 55° plantarflexion.',
    causalRole: 'Measures bending moment directly at the joint so transmission friction or soft-tissue compliance does not corrupt torque tracking; prevents hyperextension past 55°.',
    sourceRef: 'Slade et al. (2022), Extended Data Fig. 3 & Methods'
  },
  {
    id: 'shoe-insole-plate',
    number: '07',
    title: 'Shoe Sole Carbon Plate, Heel Tube & 4-Zone Pressure Insole',
    category: 'Attachment',
    badgeColor: '#E2E8F0',
    summary: 'Modified running shoe housing a carbon-fiber sole plate, a plastic heel rope conduit, and a four-point pressure-sensing insole.',
    documentedSpec: '0.3 kg Nike running shoe; toe strut pins lock into sole plate; rope ties heel spur through sole tube; insole senses heel, 5th/1st metatarsals, and great toe.',
    causalRole: 'Completes the distal three-point bending couple across the foot and detects heel strike (0% stride) and stride period for speed-adaptive control.',
    sourceRef: 'Slade et al. (2022), Extended Data Fig. 3 & Methods'
  }
];

export const AnnotatedDiagramSection: React.FC = () => {
  const [selectedId, setSelectedId] = useState<string>('heel-spur-bridge');
  const activeNode = SUBSYSTEMS.find((s) => s.id === selectedId) || SUBSYSTEMS[0];

  return (
    <section
      id="diagram"
      aria-labelledby="diagram-heading"
      className="py-14 border-b border-slate-800/80 bg-[#0B1019]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900 border border-slate-700 text-amber-300 text-xs font-mono uppercase tracking-wider mb-3">
              <span>Editable Technical Vector Diagram</span>
              <span>•</span>
              <span>7 Documented Subsystems</span>
            </div>
            <h2 id="diagram-heading" className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              Annotated Human–Device Interface Diagram
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-3xl">
              Inspect the physical components, sectional load reactions, schematic joint axes, and 200 Hz sensor pathways of the untethered ankle exoskeleton architecture. Select any numbered callout node or card to inspect its documented specifications and causal role.
            </p>
          </div>

          <a
            href="assets/annotated-interface-diagram.svg"
            download="annotated-interface-diagram.svg"
            className="self-start md:self-auto px-4 py-2 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 text-cyan-300 hover:border-cyan-400 transition"
          >
            ↓ Download Annotated Diagram SVG
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Interactive Annotated SVG Blueprint (7 Cols) */}
          <div className="lg:col-span-7 rounded-2xl border border-slate-800 bg-[#0B1019] overflow-hidden shadow-xl">
            <svg
              viewBox="0 0 1100 820"
              className="w-full h-auto block"
              role="img"
              aria-labelledby="blueprint-title blueprint-desc"
            >
              <title id="blueprint-title">
                Annotated Technical Diagram of the Untethered Ankle Exoskeleton Human–Device Interface
              </title>
              <desc id="blueprint-desc">
                Technical schematic showing numbered subsystems 01 through 07: waist battery pack, proximal calf cuff and spacer, Raspberry Pi 4b controller electronics, CubeMars AK80-9 motor and aluminum drum, rigid carbon-fiber frame and rotary encoder joint, posterior heel spur with Wheatstone strain bridge, and shoe interface with carbon sole plate and 4-point pressure insole.
              </desc>
              <defs>
                <pattern id="bp-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="1" strokeOpacity="0.65" />
                </pattern>
                <marker id="bp-arrow-gold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1 L 10 5 L 0 9 z" fill="#FFD166" />
                </marker>
                <marker id="bp-arrow-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
                  <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#00E5FF" />
                </marker>
              </defs>

              <rect width="1100" height="820" fill="#0B1019" />
              <rect width="1100" height="820" fill="url(#bp-grid)" />

              {/* Diagram Title Banner */}
              <g transform="translate(36, 28)">
                <rect x="0" y="0" width="1028" height="64" rx="8" fill="#0F172A" stroke="#1E293B" strokeWidth="1.5" />
                <text x="20" y="26" fill="#00E5FF" fontSize="12.5" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                  TECHNICAL INTERFACE SCHEMATIC // DOCUMENTED ARCHITECTURE (SLADE ET AL., 2022)
                </text>
                <text x="20" y="48" fill="#CBD5E1" fontSize="14">
                  Click any numbered node (01–07) to inspect mechanical coupling, sensor modality, and source verification.
                </text>
              </g>

              {/* Central Anatomical & Mechanical Assembly */}
              <g transform="translate(530, 565)">
                {/* Ground Line */}
                <line x1="-420" y1="135" x2="460" y2="135" stroke="#334155" strokeWidth="2.5" />

                {/* 01: Waist Battery Pack (Top Left) */}
                <g transform="translate(-390, -420)">
                  <rect
                    x="0"
                    y="0"
                    width="225"
                    height="78"
                    rx="8"
                    fill="#111827"
                    stroke={selectedId === 'waist-battery' ? '#FFD166' : '#475569'}
                    strokeWidth={selectedId === 'waist-battery' ? '3' : '1.8'}
                  />
                  <text x="16" y="28" fill="#FFD166" fontSize="14" fontWeight="700">
                    01. Waist Battery Pack
                  </text>
                  <text x="16" y="48" fill="#E2E8F0" fontSize="12.5" fontFamily="'JetBrains Mono', monospace">
                    24 V LiPo | 1300 mAh | 0.3 kg
                  </text>
                  <text x="16" y="66" fill="#94A3B8" fontSize="11.5" fontFamily="'JetBrains Mono', monospace">
                    Proximal mass placement
                  </text>
                  {/* Power cable to controller */}
                  <path
                    d="M 225 40 C 310 40, 360 110, 445 175"
                    fill="none"
                    stroke="#FFD166"
                    strokeWidth="2.5"
                    strokeDasharray="6 4"
                  />
                </g>

                {/* Shank Soft Tissue & Schematic Tibia/Fibula */}
                <path
                  d="M -68 -360 C -76 -240, -60 -110, -40 -14 L 44 -14 C 66 -110, 80 -240, 68 -360 Z"
                  fill="#1E293B"
                  fillOpacity="0.65"
                  stroke="#475569"
                  strokeWidth="2"
                />
                <path d="M -25 -345 L -16 -20 L 16 -20 L 22 -345 Z" fill="#334155" stroke="#94A3B8" strokeWidth="2" />
                <path d="M -44 -330 L -36 -25 L -26 -25 L -32 -330 Z" fill="#273549" stroke="#64748B" strokeWidth="1.5" />

                {/* 02: Calf Cuff & Mediolateral Spacer */}
                <g transform="translate(0, -300)">
                  <rect
                    x="-74"
                    y="-22"
                    width="158"
                    height="44"
                    rx="6"
                    fill="#0F172A"
                    stroke={selectedId === 'calf-cuff' ? '#00E5FF' : '#CBD5E1'}
                    strokeWidth={selectedId === 'calf-cuff' ? '3' : '2'}
                  />
                  <rect x="30" y="-26" width="24" height="52" rx="4" fill="#475569" stroke="#F8FAFC" strokeWidth="1.5" />
                  {/* Normal Shank Force Vector */}
                  <line x1="30" y1="0" x2="-45" y2="0" stroke="#FFD166" strokeWidth="4" markerEnd="url(#bp-arrow-gold)" />
                </g>

                {/* Rigid Carbon-Fiber & Aluminum Strut */}
                <path
                  d="M 50 -320 L 66 -320 L 60 -8 L 40 -8 Z"
                  fill="#0F172A"
                  stroke={selectedId === 'carbon-frame-joint' ? '#00E5FF' : '#E2E8F0'}
                  strokeWidth="2.5"
                />

                {/* 03: Portable Electronics Module (RPi 4b + IAA100) */}
                <g transform="translate(66, -255)">
                  <rect
                    x="0"
                    y="0"
                    width="62"
                    height="80"
                    rx="6"
                    fill="#131B2E"
                    stroke={selectedId === 'controller-electronics' ? '#00E5FF' : '#9D4EDD'}
                    strokeWidth="2.5"
                  />
                  <text x="10" y="26" fill="#E9D5FF" fontSize="11.5" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                    RPi 4b
                  </text>
                  <text x="10" y="44" fill="#00E5FF" fontSize="11" fontFamily="'JetBrains Mono', monospace">
                    200 Hz
                  </text>
                  <text x="10" y="62" fill="#94A3B8" fontSize="10.5" fontFamily="'JetBrains Mono', monospace">
                    IAA100
                  </text>
                </g>

                {/* 04: Brushless Motor (AK80-9) & 7075-Al Drum */}
                <g transform="translate(56, -130)">
                  <circle
                    cx="26"
                    cy="0"
                    r="34"
                    fill="#1E293B"
                    stroke={selectedId === 'motor-drum' ? '#00E5FF' : '#FFD166'}
                    strokeWidth="2.8"
                  />
                  <circle cx="26" cy="0" r="17" fill="#0F172A" stroke="#F8FAFC" strokeWidth="2" />
                </g>

                {/* Vectran Cable Transmission */}
                <line x1="90" y1="-114" x2="104" y2="20" stroke="#FFD166" strokeWidth="4" />

                {/* Running Shoe, Foot Bones, Carbon Plate & Insole */}
                <path
                  d="M -86 18 C -92 48, -88 92, -65 112 L 198 112 C 220 112, 228 90, 206 72 L 62 22 Z"
                  fill="#1E293B"
                  stroke="#64748B"
                  strokeWidth="2.2"
                />
                <path d="M -56 26 L 26 26 L 138 84 L -50 88 Z" fill="#334155" stroke="#94A3B8" strokeWidth="1.8" />

                {/* 07: Carbon Sole Plate, Heel Tube & 4-Zone Insole */}
                <rect
                  x="-64"
                  y="96"
                  width="256"
                  height="10"
                  rx="4"
                  fill="#0F172A"
                  stroke={selectedId === 'shoe-insole-plate' ? '#00E5FF' : '#E2E8F0'}
                  strokeWidth="2.2"
                />
                <circle cx="146" cy="101" r="4.5" fill="#FFD166" />
                <circle cx="162" cy="101" r="4.5" fill="#FFD166" />
                {/* 4 Insole pressure sensors */}
                <circle cx="-42" cy="86" r="6" fill="#00E5FF" />
                <circle cx="55" cy="86" r="6" fill="#00E5FF" />
                <circle cx="118" cy="86" r="6" fill="#00E5FF" />
                <circle cx="172" cy="86" r="6" fill="#00E5FF" />

                {/* Anterior Toe Strut */}
                <path d="M 48 0 L 155 98 L 138 102 L 36 8 Z" fill="#0F172A" stroke="#E2E8F0" strokeWidth="2.2" />

                {/* 06: Posterior Heel Spur & Wheatstone Strain Gauges */}
                <path
                  d="M 46 -4 L 112 18 L 106 32 L 40 10 Z"
                  fill="#0F172A"
                  stroke={selectedId === 'heel-spur-bridge' ? '#00E5FF' : '#E2E8F0'}
                  strokeWidth="2.5"
                />
                <rect x="66" y="1" width="18" height="6" rx="2" fill="#00E5FF" />
                <rect x="63" y="13" width="18" height="6" rx="2" fill="#00E5FF" />

                {/* Upward Cable Tension & Downward Forefoot Reaction Arrows */}
                <line x1="106" y1="18" x2="106" y2="-62" stroke="#FFD166" strokeWidth="4" markerEnd="url(#bp-arrow-gold)" />
                <line x1="154" y1="94" x2="154" y2="42" stroke="#FFD166" strokeWidth="3.5" markerStart="url(#bp-arrow-gold)" />

                {/* 05: Mechanical Pin Joint + Encoder vs Schematic Biological Talocrural Axis */}
                <circle cx="48" cy="0" r="15" fill="#0F172A" stroke="#00E5FF" strokeWidth="3" />
                <circle cx="48" cy="0" r="5" fill="#FFD166" />
                <circle cx="-6" cy="-6" r="11" fill="#9D4EDD" fillOpacity="0.35" stroke="#E9D5FF" strokeWidth="2" strokeDasharray="4 2" />

                {/* Dashed Cyan Signal Loops */}
                <path
                  d="M 78 8 C 138 -40, 144 -140, 128 -200"
                  fill="none"
                  stroke="#00E5FF"
                  strokeWidth="2.2"
                  strokeDasharray="6 4"
                  markerEnd="url(#bp-arrow-cyan)"
                />
                <path
                  d="M 18 86 C -20 40, 20 -120, 66 -200"
                  fill="none"
                  stroke="#00E5FF"
                  strokeWidth="2.2"
                  strokeDasharray="6 4"
                  markerEnd="url(#bp-arrow-cyan)"
                />

                {/* ===============================================================
                    INTERACTIVE NUMBERED CALLOUT NODES IN SVG
                =============================================================== */}
                {[
                  { id: 'waist-battery', num: '01', x: -165, y: -380, label: '24V Waist Battery (0.3 kg)' },
                  { id: 'calf-cuff', num: '02', x: -290, y: -300, label: 'Calf Strap & Spacer (Normal Force)' },
                  { id: 'controller-electronics', num: '03', x: 185, y: -235, label: 'RPi 4b + IAA100 (200 Hz Loop)' },
                  { id: 'motor-drum', num: '04', x: 185, y: -130, label: 'AK80-9 Motor + 0.020 m Drum' },
                  { id: 'carbon-frame-joint', num: '05', x: -315, y: -10, label: 'Pin Joint + Encoder vs. Bio Axis' },
                  { id: 'heel-spur-bridge', num: '06', x: 185, y: 15, label: 'Heel Spur (0.115 m) + Strain Bridge' },
                  { id: 'shoe-insole-plate', num: '07', x: 185, y: 105, label: 'Carbon Sole Plate + 4-Zone Insole' }
                ].map((node) => {
                  const active = selectedId === node.id;
                  return (
                    <g
                      key={node.id}
                      transform={`translate(${node.x}, ${node.y})`}
                      onClick={() => setSelectedId(node.id)}
                      className="cursor-pointer"
                      role="button"
                      tabIndex={0}
                      aria-label={`Inspect subsystem ${node.num}: ${node.label}`}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          setSelectedId(node.id);
                        }
                      }}
                    >
                      <rect
                        x="0"
                        y="-20"
                        width="285"
                        height="40"
                        rx="8"
                        fill={active ? '#164E63' : '#0F172A'}
                        stroke={active ? '#00E5FF' : '#334155'}
                        strokeWidth={active ? '2.5' : '1.5'}
                      />
                      <circle cx="22" cy="0" r="12" fill={active ? '#00E5FF' : '#1E293B'} />
                      <text
                        x="22"
                        y="4"
                        textAnchor="middle"
                        fill={active ? '#0B1019' : '#00E5FF'}
                        fontSize="11.5"
                        fontWeight="700"
                        fontFamily="'JetBrains Mono', monospace"
                      >
                        {node.num}
                      </text>
                      <text
                        x="42"
                        y="5"
                        fill={active ? '#F8FAFC' : '#CBD5E1'}
                        fontSize="12.5"
                        fontWeight={active ? '700' : '500'}
                      >
                        {node.label}
                      </text>
                    </g>
                  );
                })}
              </g>

              {/* Bottom Blueprint Legend Note */}
              <g transform="translate(36, 748)">
                <rect x="0" y="0" width="1028" height="46" rx="8" fill="#0F172A" stroke="#1E293B" strokeWidth="1.5" />
                <text x="18" y="28" fill="#94A3B8" fontSize="12.5" fontFamily="'JetBrains Mono', monospace">
                  NOTE: Anatomy and joint axes are schematic. Force vectors (gold) and sensor paths (cyan dashed) represent documented relationships, not FEA stress maps.
                </text>
              </g>
            </svg>
          </div>

          {/* Subsystem Inspector Panel & Selector List (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            {/* Active Node Detail Card */}
            <div className="rounded-2xl bg-slate-900/90 border-2 border-cyan-500/60 p-6 shadow-xl">
              <div className="flex items-center justify-between gap-2 mb-2">
                <span className="px-2.5 py-1 rounded bg-cyan-950 text-cyan-300 border border-cyan-500/40 font-mono text-xs font-bold">
                  SUBSYSTEM {activeNode.number} // {activeNode.category.toUpperCase()}
                </span>
                <span className="text-xs font-mono text-slate-400">Active Inspector</span>
              </div>

              <h3 className="text-xl font-bold text-slate-100 mb-2">{activeNode.title}</h3>
              <p className="text-sm text-slate-300 leading-relaxed mb-4">{activeNode.summary}</p>

              <div className="space-y-3 text-xs sm:text-sm">
                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="font-mono text-xs text-amber-300 font-bold mb-1">
                    DOCUMENTED SPECIFICATION
                  </div>
                  <p className="text-slate-200 leading-relaxed">{activeNode.documentedSpec}</p>
                </div>

                <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800">
                  <div className="font-mono text-xs text-cyan-300 font-bold mb-1">
                    CAUSAL ROLE IN THE INTERFACE
                  </div>
                  <p className="text-slate-200 leading-relaxed">{activeNode.causalRole}</p>
                </div>

                <div className="p-2.5 rounded-lg bg-slate-950/50 border border-slate-800/80 text-xs font-mono text-slate-400">
                  <strong className="text-slate-300">Source:</strong> {activeNode.sourceRef}
                </div>
              </div>
            </div>

            {/* Quick-Select List of All 7 Subsystems */}
            <div className="rounded-2xl bg-slate-900/50 border border-slate-800 p-4">
              <div className="text-xs font-mono uppercase text-slate-400 font-bold mb-3 px-1">
                All 7 Interface Subsystems (Click to Inspect)
              </div>
              <div className="grid grid-cols-1 gap-2">
                {SUBSYSTEMS.map((item) => {
                  const isSelected = item.id === selectedId;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedId(item.id)}
                      className={`w-full text-left px-3.5 py-2.5 rounded-xl border transition flex items-center justify-between gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                        isSelected
                          ? 'bg-cyan-950/50 border-cyan-400 text-slate-100'
                          : 'bg-slate-950/60 border-slate-800/90 text-slate-300 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <span
                          className={`font-mono text-xs px-2 py-0.5 rounded font-bold ${
                            isSelected ? 'bg-cyan-400 text-slate-950' : 'bg-slate-800 text-cyan-300'
                          }`}
                        >
                          {item.number}
                        </span>
                        <span className="text-xs sm:text-sm font-medium truncate">{item.title}</span>
                      </div>
                      <span className="text-[11px] font-mono text-slate-400 shrink-0">{item.category}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
