import { CHAPTERS, TIMELINE_CONSTANTS, type ChapterDefinition } from '../data/timelineSpec';

export interface DeterministicSceneState {
  frame: number;
  timeSeconds: number;
  timeFormatted: string;
  chapterIndex: number; // 0 to 4
  chapter: ChapterDefinition;
  chapterProgress: number; // 0 to 1 within current chapter
  isFinalHold: boolean; // true for frames 960..1019

  // Camera viewBox (interpolated smoothly and locked during 960..1019)
  viewBox: {
    x: number;
    y: number;
    w: number;
    h: number;
    String: string;
  };

  // Biomechanical & device kinematic state
  gaitCyclePercent: number; // 0 to 100
  gaitPhaseLabel: 'Early Stance' | 'Mid-Stance Dorsiflexion' | 'Late-Stance Push-Off' | 'Swing Phase (Cable Slack)';
  biologicalAnkleAngleDeg: number; // schematic plantarflexion (-) / dorsiflexion (+)
  deviceJointAngleDeg: number;
  shankTiltDeg: number;
  footPitchDeg: number;

  // Actuation & mechanical load transfer state
  cableTensionNormalized: number; // 0 to 1 (0 during swing slack)
  isCableSlack: boolean;
  assistiveTorqueNormalized: number; // 0 to 1 qualitative curve value
  effectiveLeverArmRatio: number; // decreases with plantarflexion toward 55 deg singularity
  normalShankForceNormalized: number; // 0 to 1
  heelUpwardForceNormalized: number; // 0 to 1
  toeDownwardReactionNormalized: number; // 0 to 1
  softTissueCompressionNormalized: number; // 0 to 1 illustrative

  // Alignment & axis locus state
  bioAxisOffsetPx: { dx: number; dy: number };
  cuffRelativeSlipMmIllustrative: number;

  // Sensing & controller state
  insoleActiveZones: {
    heel: number;
    lateralMidfoot: number;
    medialForefoot: number;
    greatToe: number;
  };
  signalPulsePhase: number; // deterministic 0..1 based on frame index
  activeSpeedBin: 1 | 2 | 3;
  stepCounterInBout: number; // 1..44

  // Layer visibilities (0..1 opacity weights)
  layers: {
    fullAssemblyContext: number;
    attachmentCallouts: number;
    sectionalCutaway: number;
    loadTransferVectors: number;
    alignmentAxesOverlay: number;
    sensingAndControllerOverlay: number;
    qualitativeWaveformGraph: number;
    variabilitySystemBoundary: number;
    finalTakeawayBanner: number;
  };
}

export function clampFrame(rawFrame: number): number {
  if (!Number.isFinite(rawFrame)) return TIMELINE_CONSTANTS.MIN_FRAME;
  const rounded = Math.floor(rawFrame);
  return Math.max(
    TIMELINE_CONSTANTS.MIN_FRAME,
    Math.min(TIMELINE_CONSTANTS.MAX_FRAME, rounded)
  );
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  if (edge0 === edge1) return x >= edge1 ? 1 : 0;
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)));
  return t * t * (3 - 2 * t);
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

export function formatFrameTime(frame: number): string {
  const clamped = clampFrame(frame);
  const totalSeconds = clamped / TIMELINE_CONSTANTS.FPS;
  const mins = Math.floor(totalSeconds / 60);
  const secs = Math.floor(totalSeconds % 60);
  const hundredths = Math.floor((totalSeconds - Math.floor(totalSeconds)) * 100);
  const mm = String(mins).padStart(2, '0');
  const ss = String(secs).padStart(2, '0');
  const cc = String(hundredths).padStart(2, '0');
  return `${mm}:${ss}.${cc}`;
}

/**
 * Qualitative ankle biomechanics and device torque helper parameterized by gait cycle percentage (0..100).
 * Anchored to Slade et al. (2022) timing:
 * - 0%: Heel strike
 * - 0..38%: Early-to-mid-stance dorsiflexion
 * - ~25..54.6%: Exoskeleton torque rises to peak at 54.6% stride
 * - 54.6..62%: Fall time (10% window ending by ~62% toe-off)
 * - 62..100%: Leg swing phase — motor drives cable slack (zero assistive torque)
 */
export function evaluateGaitCycleCurve(gaitPct: number): {
  bioAngleDeg: number;
  deviceAngleDeg: number;
  torqueNorm: number;
  cableSlack: boolean;
  phaseLabel: 'Early Stance' | 'Mid-Stance Dorsiflexion' | 'Late-Stance Push-Off' | 'Swing Phase (Cable Slack)';
  insole: { heel: number; lateralMidfoot: number; medialForefoot: number; greatToe: number };
} {
  const p = ((gaitPct % 100) + 100) % 100;

  // Biological ankle angle (schematic degrees: positive = dorsiflexion, negative = plantarflexion)
  let bioAngleDeg = 0;
  if (p < 10) {
    // Controlled plantarflexion after heel strike
    bioAngleDeg = lerp(0, -5, p / 10);
  } else if (p < 42) {
    // Tibial progression into mid-stance dorsiflexion
    bioAngleDeg = lerp(-5, 13, smoothstep(10, 42, p));
  } else if (p < 62) {
    // Rapid late-stance plantarflexion push-off reaching peak extension near toe-off (62%)
    bioAngleDeg = lerp(13, -18, smoothstep(42, 62, p));
  } else if (p < 82) {
    // Swing phase dorsiflexion for toe clearance
    bioAngleDeg = lerp(-18, 4, smoothstep(62, 82, p));
  } else {
    // Terminal swing preparation for heel strike
    bioAngleDeg = lerp(4, 0, smoothstep(82, 100, p));
  }

  // Device angle tracks closely but slightly lags/differs due to soft-tissue & strap compliance
  const complianceLagDeg = p >= 30 && p <= 62 ? -2.2 * Math.sin(((p - 30) / 32) * Math.PI) : 0;
  const deviceAngleDeg = bioAngleDeg + complianceLagDeg;

  // Exoskeleton assistive torque profile (normalized 0..1 qualitative curve)
  // Rise onset ~26% stride, Peak at 54.6% stride, Zero by 62% toe-off
  let torqueNorm = 0;
  if (p >= 24 && p <= 54.6) {
    torqueNorm = smoothstep(24, 54.6, p);
  } else if (p > 54.6 && p <= 62.5) {
    torqueNorm = 1 - smoothstep(54.6, 62.5, p);
  } else {
    torqueNorm = 0;
  }

  const cableSlack = p > 62.5 || p < 20;

  let phaseLabel: 'Early Stance' | 'Mid-Stance Dorsiflexion' | 'Late-Stance Push-Off' | 'Swing Phase (Cable Slack)' =
    'Early Stance';
  if (p < 16) {
    phaseLabel = 'Early Stance';
  } else if (p < 44) {
    phaseLabel = 'Mid-Stance Dorsiflexion';
  } else if (p <= 62.5) {
    phaseLabel = 'Late-Stance Push-Off';
  } else {
    phaseLabel = 'Swing Phase (Cable Slack)';
  }

  // 4-point pressure insole activation (heel, 5th metatarsal, 1st metatarsal, great toe)
  const heel = p < 28 ? 1 - smoothstep(12, 28, p) : p > 95 ? smoothstep(95, 100, p) : 0;
  const lateralMidfoot = p >= 8 && p <= 48 ? Math.sin(((p - 8) / 40) * Math.PI) : 0;
  const medialForefoot = p >= 24 && p <= 60 ? Math.sin(((p - 24) / 36) * Math.PI) : 0;
  const greatToe = p >= 40 && p <= 63 ? Math.sin(((p - 40) / 23) * Math.PI) : 0;

  return {
    bioAngleDeg,
    deviceAngleDeg,
    torqueNorm,
    cableSlack,
    phaseLabel,
    insole: { heel, lateralMidfoot, medialForefoot, greatToe }
  };
}

/**
 * Authoritative deterministic scene-state evaluator.
 * Every visual parameter for playback, scrubbing, reduced-motion static inspection, and frame export
 * is derived exclusively from `rawFrame` (clamped to 0..1019).
 */
export function computeSceneState(rawFrame: number): DeterministicSceneState {
  const frame = clampFrame(rawFrame);
  const timeSeconds = frame / TIMELINE_CONSTANTS.FPS;
  const timeFormatted = formatFrameTime(frame);
  const isFinalHold = frame >= TIMELINE_CONSTANTS.HOLD_START_FRAME;

  // Effective motion frame freezes camera and geometry transitions at frame 959 for the 960..1019 hold
  const motionFrame = Math.min(frame, TIMELINE_CONSTANTS.HOLD_START_FRAME - 1);

  // Determine active chapter (0..4)
  let chapterIndex = 0;
  for (let i = 0; i < CHAPTERS.length; i++) {
    if (frame >= CHAPTERS[i].frameStart && frame <= CHAPTERS[i].frameEnd) {
      chapterIndex = i;
      break;
    }
  }
  const chapter = CHAPTERS[chapterIndex];
  const chapterSpan = Math.max(1, chapter.frameEnd - chapter.frameStart);
  const chapterProgress = Math.max(0, Math.min(1, (frame - chapter.frameStart) / chapterSpan));

  // Camera interpolation across the 5 chapters, completing all camera transitions by frame 959
  let vx = 0;
  let vy = 0;
  let vw = 1920;
  let vh = 1080;

  if (motionFrame < 150) {
    // Chapter 1 (0..149): Slow three-quarter push toward active ankle interface
    const t = smoothstep(15, 140, motionFrame);
    vx = lerp(0, 120, t);
    vy = lerp(0, 75, t);
    vw = lerp(1920, 1620, t);
    vh = lerp(1080, 911, t);
  } else if (motionFrame < 300) {
    // Chapter 2 (150..299): Transition to sectional close-up of shank, joint, and sole
    const tIn = smoothstep(150, 185, motionFrame);
    vx = lerp(120, 210, tIn);
    vy = lerp(75, 130, tIn);
    vw = lerp(1620, 1380, tIn);
    vh = lerp(911, 776, tIn);
  } else if (motionFrame < 510) {
    // Chapter 3 (300..509): Alignment and axis locus view
    const tIn = smoothstep(300, 340, motionFrame);
    vx = lerp(210, 175, tIn);
    vy = lerp(130, 115, tIn);
    vw = lerp(1380, 1460, tIn);
    vh = lerp(776, 821, tIn);
  } else if (motionFrame < 750) {
    // Chapter 4 (510..749): Pull out to dual stage (limb + synchronized qualitative waveform graph)
    const tIn = smoothstep(510, 550, motionFrame);
    vx = lerp(175, 0, tIn);
    vy = lerp(115, 0, tIn);
    vw = lerp(1460, 1920, tIn);
    vh = lerp(821, 1080, tIn);
  } else {
    // Chapter 5 (750..959 transition, 960..1019 hold): Stable complete-system view
    const tIn = smoothstep(750, 820, motionFrame);
    vx = lerp(0, 0, tIn);
    vy = lerp(0, 0, tIn);
    vw = lerp(1920, 1920, tIn);
    vh = lerp(1080, 1080, tIn);
  }

  // Deterministic gait cycle progression per chapter
  let gaitCyclePercent = 48;
  if (motionFrame < 150) {
    // Chapter 1: Slowed orientation walk from heel strike (0%) to late stance (55%)
    gaitCyclePercent = lerp(5, 52, motionFrame / 149);
  } else if (motionFrame < 300) {
    // Chapter 2: Focus on mid-to-late stance load transfer (32% to 58% stride) where torque peaks
    gaitCyclePercent = lerp(30, 58, (motionFrame - 150) / 149);
  } else if (motionFrame < 510) {
    // Chapter 3: Full dorsiflexion-to-plantarflexion alignment sweep (20% -> 62% -> 28%)
    const c3t = (motionFrame - 300) / 209;
    gaitCyclePercent = c3t < 0.65 ? lerp(18, 62, c3t / 0.65) : lerp(62, 34, (c3t - 0.65) / 0.35);
  } else if (motionFrame < 750) {
    // Chapter 4: Two complete normalized gait cycles (0..100%) to demonstrate stance vs. swing cable slack
    const c4t = (motionFrame - 510) / 239;
    gaitCyclePercent = (c4t * 200) % 100;
  } else {
    // Chapter 5: Smooth convergence by frame 959 to late-stance push-off pose (52% gait cycle) and hold 960..1019
    const c5t = Math.min(1, (motionFrame - 750) / (959 - 750));
    gaitCyclePercent = lerp(15, 53, smoothstep(0, 1, c5t));
  }

  const gait = evaluateGaitCycleCurve(gaitCyclePercent);

  // Limb segment angles for schematic rendering
  const shankTiltDeg = lerp(-12, 16, smoothstep(0, 60, gaitCyclePercent)) * (gaitCyclePercent > 62 ? 0.4 : 1);
  const footPitchDeg =
    gaitCyclePercent < 12
      ? lerp(14, 0, gaitCyclePercent / 12)
      : gaitCyclePercent < 46
      ? 0
      : gaitCyclePercent < 64
      ? lerp(0, -28, smoothstep(46, 64, gaitCyclePercent))
      : lerp(-28, 12, smoothstep(64, 96, gaitCyclePercent));

  // Effective lever arm decreases as plantarflexion approaches 55 deg singularity
  const plantarflexionMag = Math.max(0, -gait.bioAngleDeg);
  const effectiveLeverArmRatio = Math.max(0.18, 1 - plantarflexionMag / 55);

  // Mechanical load transfer magnitudes (normalized 0..1 for explanatory vector scaling)
  const cableTensionNormalized = gait.cableSlack ? 0 : gait.torqueNorm;
  const normalShankForceNormalized = cableTensionNormalized * 0.92;
  const heelUpwardForceNormalized = cableTensionNormalized;
  const toeDownwardReactionNormalized = cableTensionNormalized * 0.88;
  const softTissueCompressionNormalized = smoothstep(0, 1, normalShankForceNormalized);

  // Biological vs mechanical axis offset (schematic locus)
  const rad = (gait.bioAngleDeg * Math.PI) / 180;
  const bioAxisOffsetPx = {
    dx: Math.round(Math.sin(rad) * 14 * 100) / 100,
    dy: Math.round((1 - Math.cos(rad)) * 18 * 100) / 100 - 6
  };
  const cuffRelativeSlipMmIllustrative = Math.round(Math.abs(gait.bioAngleDeg - gait.deviceAngleDeg) * 1.4 * 10) / 10;

  // Deterministic signal pulse phase
  const signalPulsePhase = (motionFrame % 30) / 30;

  // Speed bin & bout step counter for Chapter 4 & 5 overlays
  const activeSpeedBin: 1 | 2 | 3 = motionFrame < 600 ? 1 : motionFrame < 680 ? 2 : 3;
  const stepCounterInBout = Math.min(44, Math.max(1, Math.floor(((motionFrame % 240) / 240) * 44) + 1));

  // Layer opacity weights
  const layers = {
    fullAssemblyContext:
      frame < 150
        ? 1
        : frame < 300
        ? lerp(1, 0.35, smoothstep(150, 180, frame))
        : frame < 510
        ? 0.45
        : 1,
    attachmentCallouts:
      frame < 150 ? smoothstep(5, 35, frame) * (1 - smoothstep(130, 149, frame)) : 0,
    sectionalCutaway:
      frame >= 140 && frame < 315
        ? smoothstep(145, 175, frame) * (1 - smoothstep(285, 305, frame))
        : 0,
    loadTransferVectors:
      frame >= 150 && frame < 310
        ? smoothstep(155, 185, frame) * (1 - smoothstep(285, 305, frame))
        : frame >= 510
        ? 0.65
        : 0,
    alignmentAxesOverlay:
      frame >= 295 && frame < 520
        ? smoothstep(300, 330, frame) * (1 - smoothstep(490, 510, frame))
        : 0,
    sensingAndControllerOverlay:
      frame >= 505 && frame < 760
        ? smoothstep(510, 540, frame) * (1 - smoothstep(735, 755, frame))
        : frame >= 750
        ? 0.55
        : 0,
    qualitativeWaveformGraph:
      frame >= 505 && frame < 760
        ? smoothstep(515, 545, frame) * (1 - smoothstep(730, 750, frame))
        : 0,
    variabilitySystemBoundary:
      frame >= 745 ? smoothstep(750, 795, motionFrame) : 0,
    finalTakeawayBanner:
      frame >= 880 ? smoothstep(880, 955, motionFrame) : 0
  };

  return {
    frame,
    timeSeconds,
    timeFormatted,
    chapterIndex,
    chapter,
    chapterProgress,
    isFinalHold,
    viewBox: {
      x: Math.round(vx * 100) / 100,
      y: Math.round(vy * 100) / 100,
      w: Math.round(vw * 100) / 100,
      h: Math.round(vh * 100) / 100,
      String: `${vx.toFixed(1)} ${vy.toFixed(1)} ${vw.toFixed(1)} ${vh.toFixed(1)}`
    },
    gaitCyclePercent: Math.round(gaitCyclePercent * 100) / 100,
    gaitPhaseLabel: gait.phaseLabel,
    biologicalAnkleAngleDeg: Math.round(gait.bioAngleDeg * 100) / 100,
    deviceJointAngleDeg: Math.round(gait.deviceAngleDeg * 100) / 100,
    shankTiltDeg: Math.round(shankTiltDeg * 100) / 100,
    footPitchDeg: Math.round(footPitchDeg * 100) / 100,
    cableTensionNormalized: Math.round(cableTensionNormalized * 1000) / 1000,
    isCableSlack: gait.cableSlack,
    assistiveTorqueNormalized: Math.round(gait.torqueNorm * 1000) / 1000,
    effectiveLeverArmRatio: Math.round(effectiveLeverArmRatio * 1000) / 1000,
    normalShankForceNormalized: Math.round(normalShankForceNormalized * 1000) / 1000,
    heelUpwardForceNormalized: Math.round(heelUpwardForceNormalized * 1000) / 1000,
    toeDownwardReactionNormalized: Math.round(toeDownwardReactionNormalized * 1000) / 1000,
    softTissueCompressionNormalized: Math.round(softTissueCompressionNormalized * 1000) / 1000,
    bioAxisOffsetPx,
    cuffRelativeSlipMmIllustrative,
    insoleActiveZones: gait.insole,
    signalPulsePhase,
    activeSpeedBin,
    stepCounterInBout,
    layers
  };
}
