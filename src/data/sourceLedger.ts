export interface SourceLedgerEntry {
  id: string;
  aspect: 'Attachment' | 'Load Transfer' | 'Alignment' | 'Sensing & Actuation' | 'Variability' | 'Context & Taxonomy';
  claimOrRelationship: string;
  sourceTitle: string;
  authorsAndYear: string;
  sourceUrl: string;
  sectionFigureOrPassage: string;
  supportType: 'Direct' | 'Interpretive';
  simplificationsAndLimitations: string;
}

export const ARCHITECTURE_DECLARATION = {
  approach: 'A. Documented device with schematic anatomy and explicitly labeled conceptual/illustrative overlays',
  deviceName: 'Stanford Biomechatronics Laboratory Untethered Ankle Exoskeleton Prototype (Slade et al., 2022)',
  systemClassification: 'Joint-targeting, autonomous (untethered) bilateral ankle exoskeleton',
  generalContextSource: 'Siviy et al. (2023), Opportunities and challenges in the development of exoskeletons for locomotor assistance, Nature Biomedical Engineering (PMC11536595)',
  primaryDeviceSource: 'Slade et al. (2022), Personalizing exoskeleton assistance while walking in the real world, Nature 610, 277-282 (PMC9556303)',
  nihSummarySource: 'Doctrow (2022), Robotic exoskeleton helps people walk, NIH Research Matters',
  scientificAndSafetyLimits: [
    'This educational experience explains mechanical and control relationships. It is not an operating manual, fitting guide, clinical assessment, or therapeutic recommendation.',
    'No actuation settings, fitting instructions, therapeutic protocols, individual suitability judgments, or clinical benefit guarantees are provided.',
    'All biological joint geometry, sectional cutaways, and axis illustrations are schematic representations rather than anatomically exact musculoskeletal models or validated finite-element simulations.',
    'All time-series curves of joint angles and torque profiles in the explainer are qualitative illustrations of documented parameter timing and are not raw measured participant traces.'
  ]
};

export const SOURCE_LEDGER: SourceLedgerEntry[] = [
  {
    id: 'SL-01',
    aspect: 'Context & Taxonomy',
    claimOrRelationship: 'Lower-extremity exoskeletons are broadly classified as weight-bearing devices that transfer load directly to the ground or joint-targeting devices that apply assistive torque in parallel with biological joints.',
    sourceTitle: 'Opportunities and challenges in the development of exoskeletons for locomotor assistance',
    authorsAndYear: 'Siviy, Baker, Quinlivan, Porciuncula, Swaminathan, Awad & Walsh (2023)',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11536595/',
    sectionFigureOrPassage: 'Section "Wearable robots", paragraph 2, and Figure 1.',
    supportType: 'Direct',
    simplificationsAndLimitations: 'General taxonomy across the field; used to situate why an ankle-targeting device does not require a full-leg rigid frame.'
  },
  {
    id: 'SL-02',
    aspect: 'Attachment',
    claimOrRelationship: 'The untethered ankle exoskeleton contacts and connects to the wearer at three primary zones: a waist-worn battery pack (0.3 kg), a shank interface just below the knee using Velcro straps and interchangeable mediolateral calf spacers on the calf strut, and a running shoe connected to a toe strut (via pins into a carbon-fiber sole plate) and a heel spur (via a rope passing through a plastic tube in the sole).',
    sourceTitle: 'Personalizing exoskeleton assistance while walking in the real world',
    authorsAndYear: 'Slade, Kochenderfer, Delp & Collins (2022)',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/',
    sectionFigureOrPassage: 'Main text Figure 4b, Extended Data Figure 3, and Methods section "Untethered exoskeleton design".',
    supportType: 'Direct',
    simplificationsAndLimitations: 'Our visual diagrams depict one unilateral ankle assembly and a schematic waist battery indicator in 2D sagittal/three-quarter view; bilateral symmetry and exact CAD fastener geometry are simplified for visual clarity.'
  },
  {
    id: 'SL-03',
    aspect: 'Load Transfer',
    claimOrRelationship: 'When the brushless motor drives the 0.020 m radius aluminum drum, tension in the Vectran cable pulls upward on the heel spur (up to 0.115 m lever arm). Because the carbon-fiber and aluminum frame has a rigid mechanical joint, the axial component of the cable force is reacted at the exoskeleton joint rather than as downward shear on the wearer\u2019s skin, applying primarily normal force to the shank alongside upward heel tension and downward forefoot reaction.',
    sourceTitle: 'Personalizing exoskeleton assistance while walking in the real world',
    authorsAndYear: 'Slade, Kochenderfer, Delp & Collins (2022)',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/',
    sectionFigureOrPassage: 'Methods section "Untethered exoskeleton design", paragraphs 3, 4, and 7; Main text Figure 4b-c (peak torque up to 54 Nm).',
    supportType: 'Direct',
    simplificationsAndLimitations: 'The sectional cutaway in Chapter 2 is an illustrative schematic of the three-point bending and joint-reaction mechanism. No tissue stress, contact pressure distribution, or finite-element magnitude is measured or implied.'
  },
  {
    id: 'SL-04',
    aspect: 'Load Transfer',
    claimOrRelationship: 'Physical interface compliance and soft-tissue deformation between straps/textiles and the human limb absorb and delay mechanical work, which can alter how assistive devices transmit power to the skeleton.',
    sourceTitle: 'Personalizing exoskeleton assistance while walking in the real world; Opportunities and challenges in the development of exoskeletons for locomotor assistance',
    authorsAndYear: 'Slade et al. (2022) citing Yandell et al. (2017); Siviy et al. (2023)',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/',
    sectionFigureOrPassage: 'Slade et al. Methods "Untethered exoskeleton design" (citing ref. 63); Siviy et al. Section "Joint-targeting devices".',
    supportType: 'Interpretive',
    simplificationsAndLimitations: 'Shown as a schematic soft-tissue compression zone in the cutaway to explain why direct joint torque sensing via heel-spur strain gauges was chosen over motor-current inference.'
  },
  {
    id: 'SL-05',
    aspect: 'Alignment',
    claimOrRelationship: 'The device rotates about a mechanical pin joint with a rotary encoder, whereas the biological talocrural (ankle) complex moves around a shifting, multi-degree-of-freedom anatomical axis. In the untethered prototype, the effective heel-spur lever arm decreases with plantarflexion and reaches a geometric singularity at 55\u00b0 plantarflexion so torque cannot hyperextend the ankle.',
    sourceTitle: 'Personalizing exoskeleton assistance while walking in the real world; Opportunities and challenges in the development of exoskeletons for locomotor assistance',
    authorsAndYear: 'Slade et al. (2022); Siviy et al. (2023)',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/',
    sectionFigureOrPassage: 'Slade et al. Methods "Untethered exoskeleton design", paragraph 4; Siviy et al. Section "Control" and Section "Patient populations" (ref. 273 on multi-DOF ankle joints).',
    supportType: 'Direct',
    simplificationsAndLimitations: 'Both the mechanical pivot and the biological ankle axis are drawn as schematic markers. We do not imply an anatomically fixed biological hinge or an automatic self-aligning mechanical joint.'
  },
  {
    id: 'SL-06',
    aspect: 'Sensing & Actuation',
    claimOrRelationship: 'Portable sensing fuses three onboard modalities at 200 Hz on a Raspberry Pi 4b: (1) a pressure-sensing insole (heel, fifth metatarsal, first metatarsal, great toe) to detect heel strike and segment stride period, (2) a joint rotary encoder measuring ankle angle (\u03b8) and angular velocity (\u03b8\u0307), and (3) a full Wheatstone bridge of strain gauges on the superior and inferior heel spur (with Futek IAA100 amplifier) to measure bending moment directly at the joint.',
    sourceTitle: 'Personalizing exoskeleton assistance while walking in the real world',
    authorsAndYear: 'Slade, Kochenderfer, Delp & Collins (2022)',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/',
    sectionFigureOrPassage: 'Main text Figure 1, Extended Data Figure 4, and Methods "Untethered exoskeleton design", paragraph 5.',
    supportType: 'Direct',
    simplificationsAndLimitations: 'Signal paths are represented visually by cyan directional dashed paths and violet controller overlays. The prototype does not use EMG, EEG, or ultrasound; those modalities are discussed only in the article/review context as alternative industry approaches.'
  },
  {
    id: 'SL-07',
    aspect: 'Sensing & Actuation',
    claimOrRelationship: 'Device torque profile is parameterized by peak torque magnitude, rise time, peak time (fixed near 54.6% gait cycle in untethered outdoor optimization), and fall time (fixed at 10.0% gait cycle, ending by toe-off near 62% stride). During leg swing, the motor drives slack into the cable so zero torque is applied and the biological limb moves freely without damping resistance.',
    sourceTitle: 'Personalizing exoskeleton assistance while walking in the real world',
    authorsAndYear: 'Slade, Kochenderfer, Delp & Collins (2022)',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/',
    sectionFigureOrPassage: 'Methods sections "Data-driven optimization", "Untethered exoskeleton design", "Opportunistic optimization approach", and "Comparison with other untethered exoskeletons".',
    supportType: 'Direct',
    simplificationsAndLimitations: 'The comparative graph in Chapter 4 is explicitly labeled "Qualitative illustration\u2014not measured data" and omits numerical vertical scales while preserving the documented gait-cycle timing events (heel strike 0%, late-stance peak ~54.6%, toe-off ~62%, swing slack 62-100%).'
  },
  {
    id: 'SL-08',
    aspect: 'Variability',
    claimOrRelationship: 'In 10 healthy young adults walking outdoors on a 566-m public sidewalk course, data-driven personalization over 44-step bouts increased self-selected walking speed by 9 \u00b1 4% and reduced metabolic cost of transport by 17 \u00b1 5% compared with normal shoes (and reduced metabolic rate by 23 \u00b1 8% on a treadmill at 1.5 m/s), roughly twice the benefit of generic speed-adaptive parameters.',
    sourceTitle: 'Personalizing exoskeleton assistance while walking in the real world; Robotic exoskeleton helps people walk',
    authorsAndYear: 'Slade et al. (2022); Doctrow / NIH Research Matters (2022)',
    sourceUrl: 'https://www.nih.gov/news-events/nih-research-matters/robotic-exoskeleton-helps-people-walk',
    sectionFigureOrPassage: 'NIH summary paragraphs 7-8; Slade et al. Abstract and Main text Figure 5f-h.',
    supportType: 'Direct',
    simplificationsAndLimitations: 'Study results apply to the tested cohort of 10 healthy adults (age 24.2 \u00b1 1.8 yr) with prior exoskeleton experience using a research prototype (36.3-minute battery life, long heel spur requiring care on stairs). They do not establish universal fit or clinical outcomes.'
  },
  {
    id: 'SL-09',
    aspect: 'Variability',
    claimOrRelationship: 'Across clinical populations (stroke, spinal-cord injury, multiple sclerosis, cerebral palsy, traumatic brain injury), wearer responses vary between responders and non-responders, and clinical trials note skin redness/minor abrasion from fit, fall risk requiring supervision, and inconclusive large-scale RCT comparisons against conventional therapy.',
    sourceTitle: 'Opportunities and challenges in the development of exoskeletons for locomotor assistance',
    authorsAndYear: 'Siviy, Baker, Quinlivan, Porciuncula, Swaminathan, Awad & Walsh (2023)',
    sourceUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC11536595/',
    sectionFigureOrPassage: 'Section "In-clinic validation", Table 1, and Section "Patient populations".',
    supportType: 'Direct',
    simplificationsAndLimitations: 'Used to frame user variability and safety boundaries in Chapter 5 and the article without conflating clinical rehabilitation exoskeletons with the healthy-adult untethered ankle prototype.'
  }
];
