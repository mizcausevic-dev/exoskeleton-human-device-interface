import React, { useState } from 'react';

interface MindMapBranch {
  id: string;
  branchNumber: number;
  title: string;
  accentColor: string;
  coreQuestion: string;
  subNodes: {
    label: string;
    detail: string;
    epistemicTag: 'Documented' | 'Schematic / Conceptual' | 'Boundary / Limitation';
  }[];
}

const MIND_MAP_BRANCHES: MindMapBranch[] = [
  {
    id: 'branch-attachment',
    branchNumber: 1,
    title: 'Physical attachment',
    accentColor: '#E2E8F0',
    coreQuestion: 'Where and how does the exoskeleton contact and anchor to the human body?',
    subNodes: [
      {
        label: 'Proximal Calf Strap & Spacers',
        detail: 'Velcro strap below the knee + interchangeable mediolateral calf spacers on the carbon-fiber strut.',
        epistemicTag: 'Documented'
      },
      {
        label: 'Distal Shoe Sole Plate & Heel Tube',
        detail: 'Toe strut pins lock into an embedded carbon-fiber sole plate; heel spur ties via rope through a sole plastic tube.',
        epistemicTag: 'Documented'
      },
      {
        label: 'Proximal Waist Battery Placement',
        detail: '0.3 kg 24 V battery worn at the waist to minimize the metabolic penalty of distal leg mass (1.2 kg per ankle).',
        epistemicTag: 'Documented'
      }
    ]
  },
  {
    id: 'branch-load-transfer',
    branchNumber: 2,
    title: 'Load transfer',
    accentColor: '#FFD166',
    coreQuestion: 'How do assistive forces and torques cross from the actuator into the skeleton?',
    subNodes: [
      {
        label: 'Drum-to-Heel-Spur Cable Couple',
        detail: '0.020 m aluminum drum winds Vectran cable attached to the heel spur (up to 0.115 m lever arm, 54 Nm peak torque).',
        epistemicTag: 'Documented'
      },
      {
        label: 'Shear-Free Axial Joint Reaction',
        detail: 'Rigid frame reacts axial downward cable force at the exoskeleton pin joint so only normal force acts on the shank.',
        epistemicTag: 'Documented'
      },
      {
        label: 'Soft-Tissue & Cuff Compliance',
        detail: 'Flesh and textile deformation absorb/delay mechanical work; bypassed in control by direct heel-spur strain sensing.',
        epistemicTag: 'Schematic / Conceptual'
      }
    ]
  },
  {
    id: 'branch-alignment',
    branchNumber: 3,
    title: 'Alignment and movement',
    accentColor: '#00E5FF',
    coreQuestion: 'How does device geometry relate to biological ankle motion across the gait cycle?',
    subNodes: [
      {
        label: 'Pin Joint vs. Talocrural Axis',
        detail: 'Device rotates about a single mechanical hinge while the biological ankle moves around a shifting multi-DOF axis.',
        epistemicTag: 'Schematic / Conceptual'
      },
      {
        label: '55° Plantarflexion Singularity',
        detail: 'Effective heel-spur lever arm decreases with plantarflexion and reaches zero at 55° to prevent hyperextension.',
        epistemicTag: 'Documented'
      },
      {
        label: 'Swing-Phase Cable Slack',
        detail: 'Motor actively drives slack into the cable during swing (62–100% stride) to allow unrestricted biological dorsiflexion.',
        epistemicTag: 'Documented'
      }
    ]
  },
  {
    id: 'branch-sensing',
    branchNumber: 4,
    title: 'Sensing, control, and actuation',
    accentColor: '#00E5FF',
    coreQuestion: 'What does the onboard architecture measure, and how is personalized assistance generated?',
    subNodes: [
      {
        label: '200 Hz Tri-Modal Sensor Fusion',
        detail: '4-zone pressure insole (heel strike) + joint rotary encoder (θ, θ̇) + full Wheatstone strain bridge on heel spur.',
        epistemicTag: 'Documented'
      },
      {
        label: 'Speed-Adaptive Late-Stance Torque',
        detail: 'Stride duration estimates walking speed; torque peaks near 54.6% gait cycle and ends by ~62% toe-off.',
        epistemicTag: 'Documented'
      },
      {
        label: 'Opportunistic 44-Step Classifier',
        detail: 'Logistic model ranks control-law pairs over 44 steps (discarding first 6 steps) across 3 speed bins.',
        epistemicTag: 'Documented'
      }
    ]
  },
  {
    id: 'branch-variability',
    branchNumber: 5,
    title: 'User variability and limitations',
    accentColor: '#9D4EDD',
    coreQuestion: 'Why do fit, optimal settings, suitability, and clinical outcomes differ across individuals?',
    subNodes: [
      {
        label: 'Individualized Parameter Spread',
        detail: 'Outdoor personalization yielded +9 ± 4% speed & −17 ± 5% energy cost (n = 10), ~2x generic speed-adaptive assist.',
        epistemicTag: 'Documented'
      },
      {
        label: 'Prototype Hardware Constraints',
        detail: '36.3-min battery at max torque, long heel spur requiring care on stairs, neutral all-day comfort (SUS 72.5).',
        epistemicTag: 'Boundary / Limitation'
      },
      {
        label: 'Clinical Population Heterogeneity',
        detail: 'Stroke, SCI, MS, CP & TBI trials show responder variation, skin redness from fit, and supervision requirements.',
        epistemicTag: 'Boundary / Limitation'
      }
    ]
  }
];

export const MindMapSection: React.FC = () => {
  const [activeBranchId, setActiveBranchId] = useState<string>('branch-load-transfer');
  const activeBranch = MIND_MAP_BRANCHES.find((b) => b.id === activeBranchId) || MIND_MAP_BRANCHES[0];

  return (
    <section
      id="mindmap"
      aria-labelledby="mindmap-heading"
      className="py-14 border-b border-slate-800/80 bg-[#0B1019]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-950/60 border border-purple-500/40 text-purple-300 text-xs font-mono uppercase tracking-wider mb-3">
              <span>Conceptual Systems Architecture</span>
              <span>•</span>
              <span>5 Required Mind-Map Branches</span>
            </div>
            <h2 id="mindmap-heading" className="text-2xl sm:text-3xl font-bold text-slate-100 tracking-tight">
              Human–Device Interface Mind Map
            </h2>
            <p className="text-slate-400 text-sm sm:text-base mt-1 max-w-3xl">
              Explore how physical attachment, mechanical load transfer, kinematic alignment, 200 Hz sensing and actuation, and inter-user variability connect into a single closed-loop system.
            </p>
          </div>

          <a
            href="assets/interface-mind-map.svg"
            download="interface-mind-map.svg"
            className="self-start md:self-auto px-4 py-2 rounded-lg text-xs font-mono bg-slate-900 border border-slate-700 text-cyan-300 hover:border-cyan-400 transition"
          >
            ↓ Download Mind Map SVG
          </a>
        </div>

        {/* Editable Vector Mind Map Diagram */}
        <div className="rounded-2xl border border-slate-800 bg-[#0B1019] overflow-hidden shadow-xl mb-8">
          <svg
            viewBox="0 0 1400 720"
            className="w-full h-auto block"
            role="img"
            aria-labelledby="mindmap-svg-title mindmap-svg-desc"
          >
            <title id="mindmap-svg-title">
              Exoskeleton Human–Device Interface Conceptual Mind Map
            </title>
            <desc id="mindmap-svg-desc">
              Five-branch conceptual mind map radiating from the central Exoskeleton Human-Device Interface node: (1) Physical attachment, (2) Load transfer, (3) Alignment and movement, (4) Sensing, control, and actuation, and (5) User variability and limitations.
            </desc>
            <defs>
              <pattern id="mm-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#1E293B" strokeWidth="1" strokeOpacity="0.5" />
              </pattern>
            </defs>

            <rect width="1400" height="720" fill="#0B1019" />
            <rect width="1400" height="720" fill="url(#mm-grid)" />

            {/* Connecting Bezier Branches from Center (700, 360) */}
            {/* Branch 1: Top Left (250, 145) */}
            <path
              d="M 700 360 C 530 360, 440 145, 290 145"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth={activeBranchId === 'branch-attachment' ? '4.5' : '2.5'}
            />
            {/* Branch 2: Bottom Left (250, 555) */}
            <path
              d="M 700 360 C 530 360, 440 555, 290 555"
              fill="none"
              stroke="#FFD166"
              strokeWidth={activeBranchId === 'branch-load-transfer' ? '4.5' : '2.5'}
            />
            {/* Branch 3: Top Right (1110, 130) */}
            <path
              d="M 700 360 C 870 360, 960 130, 1110 130"
              fill="none"
              stroke="#00E5FF"
              strokeWidth={activeBranchId === 'branch-alignment' ? '4.5' : '2.5'}
            />
            {/* Branch 4: Middle Right (1130, 360) */}
            <path
              d="M 700 360 L 1110 360"
              fill="none"
              stroke="#00E5FF"
              strokeWidth={activeBranchId === 'branch-sensing' ? '4.5' : '2.5'}
              strokeDasharray="8 5"
            />
            {/* Branch 5: Bottom Right (1110, 585) */}
            <path
              d="M 700 360 C 870 360, 960 585, 1110 585"
              fill="none"
              stroke="#9D4EDD"
              strokeWidth={activeBranchId === 'branch-variability' ? '4.5' : '2.5'}
            />

            {/* Central Core Node */}
            <g transform="translate(515, 298)">
              <rect
                x="0"
                y="0"
                width="370"
                height="124"
                rx="16"
                fill="#111827"
                stroke="#00E5FF"
                strokeWidth="3"
              />
              <text x="185" y="36" textAnchor="middle" fill="#00E5FF" fontSize="12.5" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                CENTRAL SYSTEM ARCHITECTURE
              </text>
              <text x="185" y="66" textAnchor="middle" fill="#F8FAFC" fontSize="20" fontWeight="800">
                EXOSKELETON HUMAN–DEVICE
              </text>
              <text x="185" y="90" textAnchor="middle" fill="#F8FAFC" fontSize="20" fontWeight="800">
                INTERFACE
              </text>
              <text x="185" y="112" textAnchor="middle" fill="#94A3B8" fontSize="11.5" fontFamily="'JetBrains Mono', monospace">
                Untethered Ankle Architecture (Slade et al., 2022)
              </text>
            </g>

            {/* Branch 1 Node: Physical attachment (Top Left) */}
            <g
              transform="translate(36, 48)"
              onClick={() => setActiveBranchId('branch-attachment')}
              className="cursor-pointer"
            >
              <rect
                x="0"
                y="0"
                width="390"
                height="195"
                rx="12"
                fill="#0F172A"
                stroke={activeBranchId === 'branch-attachment' ? '#F8FAFC' : '#475569'}
                strokeWidth={activeBranchId === 'branch-attachment' ? '3' : '1.8'}
              />
              <text x="18" y="30" fill="#E2E8F0" fontSize="16" fontWeight="700">
                1. Physical attachment
              </text>
              <text x="18" y="56" fill="#CBD5E1" fontSize="13">
                • Proximal: Below-knee Velcro calf strap +
              </text>
              <text x="30" y="74" fill="#94A3B8" fontSize="12.5">
                interchangeable mediolateral leg spacers
              </text>
              <text x="18" y="100" fill="#CBD5E1" fontSize="13">
                • Distal: Running shoe (0.3 kg) with embedded
              </text>
              <text x="30" y="118" fill="#94A3B8" fontSize="12.5">
                carbon-fiber sole plate (pins) + heel rope tube
              </text>
              <text x="18" y="144" fill="#CBD5E1" fontSize="13">
                • Power Mass: 0.3 kg 24 V battery worn at waist
              </text>
              <text x="30" y="162" fill="#94A3B8" fontSize="12.5">
                to keep mass proximal; 1.2 kg worn per ankle
              </text>
              <text x="18" y="184" fill="#00E5FF" fontSize="11" fontFamily="'JetBrains Mono', monospace">
                [Documented Hardware — Slade et al. 2022]
              </text>
            </g>

            {/* Branch 2 Node: Load transfer (Bottom Left) */}
            <g
              transform="translate(36, 455)"
              onClick={() => setActiveBranchId('branch-load-transfer')}
              className="cursor-pointer"
            >
              <rect
                x="0"
                y="0"
                width="390"
                height="205"
                rx="12"
                fill="#0F172A"
                stroke={activeBranchId === 'branch-load-transfer' ? '#FFD166' : '#475569'}
                strokeWidth={activeBranchId === 'branch-load-transfer' ? '3' : '1.8'}
              />
              <text x="18" y="30" fill="#FFD166" fontSize="16" fontWeight="700">
                2. Load transfer
              </text>
              <text x="18" y="56" fill="#E2E8F0" fontSize="13">
                • Cable Tension: 0.020 m drum winds Vectran
              </text>
              <text x="30" y="74" fill="#94A3B8" fontSize="12.5">
                cable to pull heel spur upward (up to 54 Nm)
              </text>
              <text x="18" y="100" fill="#E2E8F0" fontSize="13">
                • Shear Prevention: Rigid frame reacts axial cable
              </text>
              <text x="30" y="118" fill="#94A3B8" fontSize="12.5">
                force at pin joint → normal force on shank skin
              </text>
              <text x="18" y="144" fill="#E2E8F0" fontSize="13">
                • Interface Compliance: Soft tissue & straps deform;
              </text>
              <text x="30" y="162" fill="#94A3B8" fontSize="12.5">
                direct joint strain gauges bypass compliance losses
              </text>
              <text x="18" y="190" fill="#FFD166" fontSize="11" fontFamily="'JetBrains Mono', monospace">
                [Documented Coupling + Schematic Cutaway]
              </text>
            </g>

            {/* Branch 3 Node: Alignment and movement (Top Right) */}
            <g
              transform="translate(974, 32)"
              onClick={() => setActiveBranchId('branch-alignment')}
              className="cursor-pointer"
            >
              <rect
                x="0"
                y="0"
                width="390"
                height="195"
                rx="12"
                fill="#0F172A"
                stroke={activeBranchId === 'branch-alignment' ? '#00E5FF' : '#475569'}
                strokeWidth={activeBranchId === 'branch-alignment' ? '3' : '1.8'}
              />
              <text x="18" y="30" fill="#00E5FF" fontSize="16" fontWeight="700">
                3. Alignment and movement
              </text>
              <text x="18" y="56" fill="#E2E8F0" fontSize="13">
                • Kinematic Discrepancy: Fixed mechanical pin
              </text>
              <text x="30" y="74" fill="#94A3B8" fontSize="12.5">
                pivot vs. shifting biological talocrural axis
              </text>
              <text x="18" y="100" fill="#E2E8F0" fontSize="13">
                • Lever-Arm Singularity: 0.115 m max heel lever
              </text>
              <text x="30" y="118" fill="#94A3B8" fontSize="12.5">
                drops to zero at 55° plantarflexion for safety
              </text>
              <text x="18" y="144" fill="#E2E8F0" fontSize="13">
                • Swing Freedom: Cable driven slack (62–100%
              </text>
              <text x="30" y="162" fill="#94A3B8" fontSize="12.5">
                stride) so foot clears ground without damping
              </text>
              <text x="18" y="184" fill="#00E5FF" fontSize="11" fontFamily="'JetBrains Mono', monospace">
                [Schematic Axes + Documented Geometry]
              </text>
            </g>

            {/* Branch 4 Node: Sensing, control, and actuation (Middle Right) */}
            <g
              transform="translate(974, 258)"
              onClick={() => setActiveBranchId('branch-sensing')}
              className="cursor-pointer"
            >
              <rect
                x="0"
                y="0"
                width="390"
                height="205"
                rx="12"
                fill="#0F172A"
                stroke={activeBranchId === 'branch-sensing' ? '#00E5FF' : '#475569'}
                strokeWidth={activeBranchId === 'branch-sensing' ? '3' : '1.8'}
              />
              <text x="18" y="30" fill="#00E5FF" fontSize="16" fontWeight="700">
                4. Sensing, control, and actuation
              </text>
              <text x="18" y="56" fill="#E2E8F0" fontSize="13">
                • 200 Hz Sensor Fusion (RPi 4b): 4-point insole +
              </text>
              <text x="30" y="74" fill="#94A3B8" fontSize="12.5">
                ankle rotary encoder (θ, θ̇) + heel strain bridge
              </text>
              <text x="18" y="100" fill="#E2E8F0" fontSize="13">
                • Torque Timing: Rises in mid-stance, peaks near
              </text>
              <text x="30" y="118" fill="#94A3B8" fontSize="12.5">
                54.6% gait cycle, falls to zero by ~62% toe-off
              </text>
              <text x="18" y="144" fill="#E2E8F0" fontSize="13">
                • Opportunistic Optimization: Logistic classifier
              </text>
              <text x="30" y="162" fill="#94A3B8" fontSize="12.5">
                ranks control-law pairs over 44-step bouts
              </text>
              <text x="18" y="190" fill="#FFD166" fontSize="11" fontFamily="'JetBrains Mono', monospace">
                [Documented 200 Hz Control Loop]
              </text>
            </g>

            {/* Branch 5 Node: User variability and limitations (Bottom Right) */}
            <g
              transform="translate(974, 492)"
              onClick={() => setActiveBranchId('branch-variability')}
              className="cursor-pointer"
            >
              <rect
                x="0"
                y="0"
                width="390"
                height="200"
                rx="12"
                fill="#0F172A"
                stroke={activeBranchId === 'branch-variability' ? '#9D4EDD' : '#475569'}
                strokeWidth={activeBranchId === 'branch-variability' ? '3' : '1.8'}
              />
              <text x="18" y="30" fill="#E9D5FF" fontSize="16" fontWeight="700">
                5. User variability and limitations
              </text>
              <text x="18" y="56" fill="#E2E8F0" fontSize="13">
                • Individualized Gains: +9 ± 4% speed, −17 ± 5%
              </text>
              <text x="30" y="74" fill="#94A3B8" fontSize="12.5">
                outdoor energy cost (n = 10, ~2x generic assist)
              </text>
              <text x="18" y="100" fill="#E2E8F0" fontSize="13">
                • Prototype Limits: 36.3-min battery, long heel
              </text>
              <text x="30" y="118" fill="#94A3B8" fontSize="12.5">
                spur on stairs, neutral all-day comfort (SUS 72.5)
              </text>
              <text x="18" y="144" fill="#E2E8F0" fontSize="13">
                • Clinical Heterogeneity: Responder differences,
              </text>
              <text x="30" y="162" fill="#94A3B8" fontSize="12.5">
                fit abrasion, fall risk & supervision (Siviy 2023)
              </text>
              <text x="18" y="186" fill="#E9D5FF" fontSize="11" fontFamily="'JetBrains Mono', monospace">
                [System Boundaries & Safety Limits]
              </text>
            </g>
          </svg>
        </div>

        {/* Interactive Branch Cards for Mobile & Keyboard Exploration */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3 mb-6">
          {MIND_MAP_BRANCHES.map((branch) => {
            const isSelected = branch.id === activeBranchId;
            return (
              <button
                key={branch.id}
                type="button"
                onClick={() => setActiveBranchId(branch.id)}
                className={`p-3.5 rounded-xl border text-left transition focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 ${
                  isSelected
                    ? 'bg-slate-900 border-cyan-400 text-slate-100 shadow-lg'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:border-slate-700'
                }`}
              >
                <div className="text-xs font-mono text-cyan-300 font-bold mb-1">
                  BRANCH 0{branch.branchNumber}
                </div>
                <div className="text-sm font-bold text-slate-100">{branch.title}</div>
              </button>
            );
          })}
        </div>

        {/* Expanded Branch Detail View */}
        <div className="rounded-2xl bg-slate-900/70 border border-slate-800 p-6">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-4 border-b border-slate-800 pb-3">
            <div>
              <span className="text-xs font-mono text-cyan-300 font-bold uppercase">
                Active Mind-Map Branch 0{activeBranch.branchNumber}
              </span>
              <h3 className="text-xl font-bold text-slate-100">{activeBranch.title}</h3>
            </div>
            <p className="text-sm text-slate-300 italic">{activeBranch.coreQuestion}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {activeBranch.subNodes.map((sub, i) => (
              <div key={i} className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-xs font-mono text-slate-400">NODE {activeBranch.branchNumber}.{i + 1}</span>
                    <span
                      className={`text-[11px] font-mono px-2 py-0.5 rounded border ${
                        sub.epistemicTag === 'Documented'
                          ? 'bg-cyan-950/60 border-cyan-500/40 text-cyan-300'
                          : sub.epistemicTag === 'Schematic / Conceptual'
                          ? 'bg-amber-950/60 border-amber-500/40 text-amber-300'
                          : 'bg-purple-950/60 border-purple-500/40 text-purple-300'
                      }`}
                    >
                      {sub.epistemicTag}
                    </span>
                  </div>
                  <h4 className="text-base font-bold text-slate-100 mb-1.5">{sub.label}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{sub.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
