import React from 'react';
import { computeSceneState, evaluateGaitCycleCurve } from '../engine/sceneState';

interface ExplainerStageSvgProps {
  frame: number;
  exportMode?: boolean;
  compactMobile?: boolean;
}

export const ExplainerStageSvg: React.FC<ExplainerStageSvgProps> = ({
  frame,
  exportMode = false,
  compactMobile = false
}) => {
  const state = computeSceneState(frame);
  const {
    chapter,
    chapterIndex,
    isFinalHold,
    gaitCyclePercent,
    gaitPhaseLabel,
    deviceJointAngleDeg,
    shankTiltDeg,
    footPitchDeg,
    cableTensionNormalized,
    isCableSlack,
    effectiveLeverArmRatio,
    normalShankForceNormalized,
    heelUpwardForceNormalized,
    toeDownwardReactionNormalized,
    softTissueCompressionNormalized,
    bioAxisOffsetPx,
    insoleActiveZones,
    signalPulsePhase,
    activeSpeedBin,
    stepCounterInBout,
    layers
  } = state;

  // Base anatomical joint anchor in stage coordinates
  const anklePivotX = chapterIndex === 3 ? 620 : 880;
  const anklePivotY = chapterIndex === 3 ? 650 : 690;

  // Precompute qualitative waveform points for Chapter 4 graph (100 samples across 0..100% gait cycle)
  const graphOriginX = 1040;
  const graphOriginY = 230;
  const graphWidth = 760;
  const graphHeight = 470;

  const torquePoints: string[] = [];
  const bioAnglePoints: string[] = [];
  const devAnglePoints: string[] = [];

  for (let i = 0; i <= 100; i += 2) {
    const sample = evaluateGaitCycleCurve(i);
    const gx = graphOriginX + (i / 100) * graphWidth;
    // Torque plot in upper band (y: 270..430)
    const ty = graphOriginY + 185 - sample.torqueNorm * 135;
    torquePoints.push(`${gx.toFixed(1)},${ty.toFixed(1)}`);

    // Angle plot in lower band (y: 480..650)
    const by = graphOriginY + 370 - ((sample.bioAngleDeg + 20) / 36) * 120;
    const dy = graphOriginY + 370 - ((sample.deviceAngleDeg + 20) / 36) * 120;
    bioAnglePoints.push(`${gx.toFixed(1)},${by.toFixed(1)}`);
    devAnglePoints.push(`${gx.toFixed(1)},${dy.toFixed(1)}`);
  }

  const cursorX = graphOriginX + (gaitCyclePercent / 100) * graphWidth;
  const dashOffsetSignal = -Math.round(signalPulsePhase * 28);

  return (
    <svg
      viewBox="0 0 1920 1080"
      className="w-full h-auto block select-none"
      style={{ backgroundColor: '#0B1019', fontFamily: "'Space Grotesk', system-ui, sans-serif" }}
      role="img"
      aria-label={`Interactive Exoskeleton Human-Device Interface Stage — ${chapter.title}, Frame ${state.frame} of 1019 (${state.timeFormatted})`}
    >
