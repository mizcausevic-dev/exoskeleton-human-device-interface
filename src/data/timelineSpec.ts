export interface ChapterDefinition {
  id: number;
  slug: string;
  title: string;
  timeRangeLabel: string;
  frameStart: number;
  frameEnd: number;
  cameraPreset: {
    viewBoxX: number;
    viewBoxY: number;
    viewBoxW: number;
    viewBoxH: number;
    label: string;
  };
  onScreenHeadline: string;
  onScreenCallouts: string[];
  transformationBadge: string;
  explanatoryText: string;
  transcriptSegment: string;
  documentedFacts: string[];
  simplifiedOrConceptual: string[];
  notEstablished: string[];
}

export const TIMELINE_CONSTANTS = {
  DURATION_SECONDS: 34,
  FPS: 30,
  TOTAL_FRAMES: 1020,
  MIN_FRAME: 0,
  MAX_FRAME: 1019,
  HOLD_START_FRAME: 960,
} as const;

export const CHAPTERS: ChapterDefinition[] = [
  {
    id: 1,
    slug: 'attachment',
    title: 'Chapter 1: Where the device meets the body',
    timeRangeLabel: '0.0s – 5.0s (Frames 0–149)',
    frameStart: 0,
    frameEnd: 149,
    cameraPreset: {
      viewBoxX: 0,
      viewBoxY: 0,
      viewBoxW: 1920,
      viewBoxH: 1080,
      label: 'Full-assembly lateral-oblique orientation push'
    },
    onScreenHeadline: 'Where the device meets the body',
    onScreenCallouts: [
      'Waist battery pack (0.3 kg, 24 V LiPo)',
      'Proximal calf strap + interchangeable mediolateral spacer',
      'Carbon-fiber & 7075-Al frame (1.2 kg per ankle)',
      'Shoe interface: carbon sole plate (toe pins) + heel rope tube'
    ],
    transformationBadge: 'Schematic anatomy | 0.5x slowed gait cadence for orientation',
    explanatoryText:
      'An untethered ankle exoskeleton connects to the moving body across discrete physical interfaces: a waist-mounted battery pack supplies electrical power, a Velcro calf band and spacer secure the proximal carbon-fiber strut below the knee, and a modified running shoe couples the distal frame to the forefoot and heel.',
    transcriptSegment:
      '[00:00.00 – 00:05.00 | Frames 0–149] Chapter 1: Where the device meets the body. The complete lower-limb assembly opens in anatomical orientation showing the tibia, fibula, talus, calcaneus, and forefoot inside a modified running shoe. As the camera makes a slow three-quarter push toward the ankle interface, four physical subsystems resolve: the 0.3-kilogram waist battery pack tether, the proximal calf strap and mediolateral spacer below the knee, the rigid carbon-fiber and aluminum strut carrying the brushless motor and drum transmission, and the distal shoe anchor at the toe plate and heel spur.',
    documentedFacts: [
      'Untethered bilateral prototype weighs 1.2 kg per ankle with a 0.3 kg 24 V battery worn at the waist (Slade et al., 2022).',
      'Calf strut attaches below the knee via Velcro straps and interchangeable mediolateral spacers.',
      'Running shoe couples to the toe strut via pins into an embedded carbon-fiber plate and to the heel spur via a rope through a sole tube.'
    ],
    simplifiedOrConceptual: [
      'Skeletal structures (tibia, fibula, talus, calcaneus, metatarsals) are shown as schematic anatomical silhouettes for spatial orientation.',
      'Unilateral right-leg assembly is isolated in the primary viewport to keep labels legible.'
    ],
    notEstablished: [
      'Exact soft-tissue geometry or individual anatomical fit parameters for a specific person.'
    ]
  },
  {
    id: 2,
    slug: 'load-transfer',
    title: 'Chapter 2: How loads cross the interface',
    timeRangeLabel: '5.0s – 10.0s (Frames 150–299)',
    frameStart: 150,
    frameEnd: 299,
    cameraPreset: {
      viewBoxX: 210,
      viewBoxY: 130,
      viewBoxW: 1380,
      viewBoxH: 776,
      label: 'Sectional cutaway close-up of shank, ankle joint, and shoe sole'
    },
    onScreenHeadline: 'How loads cross the interface',
    onScreenCallouts: [
      'Motor drum winds Vectran cable -> upward tension on heel spur',
      'Three-point reaction: normal shank force + downward toe pin reaction',
      'Rigid exoskeleton joint reacts axial cable force (prevents downward skin shear)',
      'Illustrative cutaway — no measured tissue stress or pressure data'
    ],
    transformationBadge: 'Illustrative sectional cutaway | Enlarged interface view (1.4x)',
    explanatoryText:
      'In this illustrative sectional cutaway, motor torque winds the Vectran cable to pull upward on the heel spur (up to 0.115 m lever arm). Rather than dragging the cuff down the skin in shear, the rigid frame reacts axial cable tension through the mechanical ankle joint, applying normal force against the anterior tibia/calf cuff and downward reaction at the forefoot plate.',
    transcriptSegment:
      '[00:05.00 – 00:10.00 | Frames 150–299] Chapter 2: How loads cross the interface. The view transitions to a labeled sectional close-up of the calf cuff, mechanical hinge, heel spur, and carbon sole plate. Gold mechanical-load arrows distinguish physical struts from force pathways: when the motor drum tensions the Vectran cable, upward force acts on the heel spur while downward reaction acts at the toe pins and normal force presses into the anterior shank pad. Because the rigid frame reacts axial tension at its mechanical pivot, downward shear on the skin is minimized. Soft-tissue compression is shown as an illustrative schematic without implying measured pressure values.',
    documentedFacts: [
      'Custom 7075-aluminum drum (0.020 m radius) pulls a Vectran cable attached to the heel spur (up to 0.115 m lever arm) to produce up to 54 Nm peak assistive torque (Slade et al., 2022).',
      'Rigid carbon-fiber frame reacts the axial component of cable force at the exoskeleton joint so primarily normal force is applied to the shank rather than downward skin shear.'
    ],
    simplifiedOrConceptual: [
      'Sectional hatch surfaces of the calf padding, carbon sole plate, and heel tube are illustrative cutaways.',
      'Force and torque vectors are explanatory arrows showing load direction and coupling, not finite-element stress maps.'
    ],
    notEstablished: [
      'Quantified strap contact pressure (kPa), internal soft-tissue stress distributions, or localized skin abrasion thresholds.'
    ]
  },
  {
    id: 3,
    slug: 'alignment',
    title: 'Chapter 3: Why alignment matters',
    timeRangeLabel: '10.0s – 17.0s (Frames 300–509)',
    frameStart: 300,
    frameEnd: 509,
    cameraPreset: {
      viewBoxX: 160,
      viewBoxY: 110,
      viewBoxW: 1480,
      viewBoxH: 832,
      label: 'Ankle joint axis comparison and lever-arm kinematics'
    },
    onScreenHeadline: 'Why alignment matters',
    onScreenCallouts: [
      'Schematic pin pivot vs. biological talocrural shifting axis',
      'Causal chain: axis offset -> relative cuff travel -> soft-tissue compliance',
      'Heel-spur lever arm shortens with plantarflexion (55° geometric singularity)',
      'Direct heel-spur strain gauges measure torque despite interface compliance'
    ],
    transformationBadge: 'Schematic axes & pivots | Exaggerated offset overlay for clarity',
    explanatoryText:
      'The exoskeleton rotates about a single mechanical pin joint, whereas the biological ankle moves around a complex, shifting anatomical axis. Any offset between these schematic axes causes slight relative cuff migration and soft-tissue deformation during dorsiflexion and plantarflexion. Because bending moment is measured directly on the heel spur via strain gauges, applied joint torque remains accurate despite frame or interface compliance.',
    transcriptSegment:
      '[00:10.00 – 00:17.00 | Frames 300–509] Chapter 3: Why alignment matters. Schematic axis markers compare the fixed mechanical pin joint of the exoskeleton with the shifting biological talocrural axis across stance and push-off. A three-step causal sequence illustrates how axis offset produces relative motion at the cuff and compliance across soft tissue. As plantarflexion increases, the effective lever arm between the drum cable and heel spur shortens toward a 55-degree geometric singularity that prevents hyperextension. Because strain gauges on the heel spur measure bending moment directly at the joint, torque regulation remains accurate without inventing a mechanical self-aligning joint.',
    documentedFacts: [
      'Interchangeable shoes and mediolateral spacers accommodate foot size and leg width differences (Slade et al., 2022).',
      'Effective heel-spur lever arm decreases with plantarflexion and reaches a singularity at 55° plantarflexion to prevent hyperextension.',
      'Full Wheatstone bridge strain gauges on superior and inferior surfaces of the heel lever measure bending moment directly at the ankle, isolating torque tracking from interface compliance.'
    ],
    simplifiedOrConceptual: [
      'Biological talocrural axis migration is depicted as a schematic locus rather than a 3D bone-pin kinematic reconstruction.',
      'Axis offset and cuff displacement are visually amplified to make the kinematic mechanism legible.'
    ],
    notEstablished: [
      'Perfect axis tracking, universal anatomical alignment, or any active mechanical axis-correction mechanism (none exists in this architecture).'
    ]
  },
  {
    id: 4,
    slug: 'sensing-and-actuation',
    title: 'Chapter 4: Device motion and human motion are related—not identical',
    timeRangeLabel: '17.0s – 25.0s (Frames 510–749)',
    frameStart: 510,
    frameEnd: 749,
    cameraPreset: {
      viewBoxX: 40,
      viewBoxY: 40,
      viewBoxW: 1840,
      viewBoxH: 1035,
      label: 'Split stage: synchronized gait cycle + qualitative timing diagram'
    },
    onScreenHeadline: 'Device motion and human motion are related—not identical',
    onScreenCallouts: [
      'Sensors (200 Hz): insole pressure (heel strike) + rotary encoder (θ, θ̇) + heel strain bridge',
      'Controller: speed-adaptive control law + 44-step opportunistic ranking',
      'Late-stance assistive torque peaks near ~54.6% stride; ends at ~62% toe-off',
      'Swing phase (62–100%): motor drives cable slack so biological ankle moves freely'
    ],
    transformationBadge: 'Qualitative illustration—not measured data | Time-normalized gait cycle (0–100%)',
    explanatoryText:
      'Onboard sensors sample insole pressure, joint angle and velocity, and heel-spur bending moment at 200 Hz. The controller applies assistive torque only during late stance—rising to a peak near 55% of the gait cycle and dropping to zero by toe-off (~62%). During swing (62–100%), the motor deliberately drives slack into the cable so the wearer moves freely without fighting motor damping.',
    transcriptSegment:
      '[00:17.00 – 00:25.00 | Frames 510–749] Chapter 4: Device motion and human motion are related—not identical. The stage pairs the moving lower limb with a synchronized qualitative timing plot labeled Qualitative illustration—not measured data. Cyan dashed paths trace 200-hertz signals from the four-point pressure insole, joint encoder, and heel-spur strain bridge into the violet controller boundary. Gold actuation pathways show torque rising in mid-to-late stance, peaking near 54.6 percent of the stride, and terminating at toe-off near 62 percent. During swing phase from 62 to 100 percent, the motor introduces cable slack so device cable tension drops to zero while biological dorsiflexion clears the foot.',
    documentedFacts: [
      'Raspberry Pi 4b reads rotary encoder (θ, θ̇), 4-zone pressure insole, and amplified Wheatstone strain bridge at 200 Hz (Slade et al., 2022).',
      'Data-driven classifier compares pairs of control laws over 44-step bouts (discarding the first 6 steps of rapid adaptation) across three walking speed bins.',
      'In untethered outdoor optimization, peak time was fixed at 54.6% gait cycle and fall time at 10.0%, ending torque by toe-off (~62% stride); cable is driven slack during swing.'
    ],
    simplifiedOrConceptual: [
      'The synchronized curves of biological ankle angle and assistive torque are qualitative illustrations of phase timing without numerical y-axis units.',
      'Controller boundary and pairwise ranking badges are conceptual state overlays.'
    ],
    notEstablished: [
      'Real-time electromyography (EMG), neural decoding (EEG), or muscle ultrasound feedback (not present on this untethered prototype).'
    ]
  },
  {
    id: 5,
    slug: 'variability',
    title: 'Chapter 5: The interface depends on the person',
    timeRangeLabel: '25.0s – 34.0s (Frames 750–1019; hold 960–1019)',
    frameStart: 750,
    frameEnd: 1019,
    cameraPreset: {
      viewBoxX: 0,
      viewBoxY: 0,
      viewBoxW: 1920,
      viewBoxH: 1080,
      label: 'Complete-system pullback, boundary box, and variability hold (960–1019)'
    },
    onScreenHeadline: 'The interface depends on the person',
    onScreenCallouts: [
      'System boundary: waist battery + bilateral ankle frames + onboard controller',
      'Individualized peak torque & rise time vary across users and walking speeds',
      'Prototype limits: 36.3-min battery, long heel spur on stairs, neutral all-day comfort',
      'Fit, suitability, and supervision depend on the specific device, task, and user'
    ],
    transformationBadge: 'System boundary & variability synthesis | Final hold frames 960–1019',
    explanatoryText:
      'Pulling back to the complete system boundary reveals why personalization is essential: even among ten unimpaired young adults walking outdoors, optimal peak torque and rise time differed substantially between individuals, yielding a 9 ± 4% speed increase and 17 ± 5% energy cost reduction over normal shoes. Across broader clinical and occupational populations, limb morphology, neurological status, supervision needs, and hardware constraints govern whether any wearable robot is suitable.',
    transcriptSegment:
      '[00:25.00 – 00:34.00 | Frames 750–1019] Chapter 5: The interface depends on the person. The camera pulls back to a stable full-system view bounded by a violet system-scope frame and completes all camera and geometry transitions by frame 959. Overlay panels summarize inter-user variability in optimized torque profiles alongside documented prototype constraints: a 36.3-minute battery life under maximum assistance, a heel spur requiring caution on stairs, and neutral ratings for all-day wear comfort. From frame 960 through frame 1019, the composition holds steady on the core takeaway: mechanical assistance crosses a physical interface, and fit, suitability, outcomes, and supervision requirements depend on both the device architecture and the individual person.',
    documentedFacts: [
      'Outdoor optimization in 10 healthy adults increased self-selected speed by 9 ± 4% and reduced energetic cost of transport by 17 ± 5% vs. normal shoes, roughly double generic speed-adaptive assistance (Slade et al., 2022).',
      'Participants rated usability at 72.5 on the System Usability Scale (65th percentile) and 6 of 10 preferred the exoskeleton over normal shoes for the course, but participants were neutral on all-day comfort and noted the long heel spur required care on stairs.',
      'In clinical rehabilitation cohorts (stroke, SCI, MS, CP, TBI), responder variability, skin irritation from strap fit, fall safety, and supervision remain active challenges (Siviy et al., 2023).'
    ],
    simplifiedOrConceptual: [
      'System boundary box and variability parameter cards are conceptual synthesis overlays.',
      'Unassisted proximal joints (knee, hip, trunk) are shown outside the actuated ankle boundary to emphasize whole-body coupling.'
    ],
    notEstablished: [
      'Guaranteed clinical rehabilitation efficacy, unsupervised medical deployment, or universal benefit across untested tasks and populations.'
    ]
  }
];
