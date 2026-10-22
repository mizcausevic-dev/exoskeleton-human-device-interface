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
      <defs>
        {/* Subtle technical stage grid */}
        <pattern id="stage-grid" width="48" height="48" patternUnits="userSpaceOnUse">
          <path
            d="M 48 0 L 0 0 0 48"
            fill="none"
            stroke="#1E293B"
            strokeWidth="1"
            strokeOpacity="0.55"
          />
        </pattern>
        <pattern id="cutaway-hatch" width="10" height="10" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="10" stroke="#94A3B8" strokeWidth="2" strokeOpacity="0.45" />
        </pattern>
        <pattern id="tissue-hatch" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(-30)">
          <line x1="0" y1="0" x2="0" y2="8" stroke="#CBD5E1" strokeWidth="1.5" strokeOpacity="0.3" />
        </pattern>

        {/* Arrowhead markers */}
        <marker id="arrow-gold" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
          <path d="M 0 1 L 10 5 L 0 9 z" fill="#FFD166" />
        </marker>
        <marker id="arrow-cyan" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#00E5FF" />
        </marker>
        <marker id="arrow-violet" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#9D4EDD" />
        </marker>
        <marker id="arrow-neutral" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#E2E8F0" />
        </marker>
      </defs>

      {/* Background Stage */}
      <rect x="0" y="0" width="1920" height="1080" fill="#0B1019" />
      <rect x="0" y="0" width="1920" height="1080" fill="url(#stage-grid)" />

      {/* =====================================================================
          CAMERA-TRANSFORMED BIOMECHANICAL & HARDWARE STAGE
      ===================================================================== */}
      <g
        transform={`translate(${(960 - (state.viewBox.x + state.viewBox.w / 2)) * 0.45}, ${(540 - (state.viewBox.y + state.viewBox.h / 2)) * 0.45}) scale(${(1920 / state.viewBox.w) * 0.65 + 0.35})`}
        style={{ transformOrigin: '960px 540px' }}
      >
        {/* Ground Plane Reference */}
        <line
          x1="180"
          y1={anklePivotY + 135}
          x2="1740"
          y2={anklePivotY + 135}
          stroke="#334155"
          strokeWidth="3"
        />
        <text
          x="200"
          y={anklePivotY + 162}
          fill="#64748B"
          fontSize="15"
          fontFamily="'JetBrains Mono', monospace"
        >
          GROUND REFERENCE PLANE | LEVEL OVERGROUND / TREADMILL DATUM
        </text>

        {/* System Boundary Box (Chapter 5: Frames 750–1019) */}
        {layers.variabilitySystemBoundary > 0.01 && (
          <g opacity={layers.variabilitySystemBoundary}>
            <rect
              x="310"
              y="135"
              width="860"
              height="745"
              rx="16"
              fill="#9D4EDD"
              fillOpacity="0.04"
              stroke="#9D4EDD"
              strokeWidth="2.5"
              strokeDasharray="12 8"
            />
            <rect x="330" y="118" width="495" height="34" rx="6" fill="#131B2E" stroke="#9D4EDD" strokeWidth="1.5" />
            <text
              x="346"
              y="140"
              fill="#E9D5FF"
              fontSize="15"
              fontWeight="700"
              fontFamily="'JetBrains Mono', monospace"
            >
              DEPICTED SYSTEM BOUNDARY: UNTETHERED ANKLE ARCHITECTURE
            </text>

            {/* Unassisted proximal body context indicator */}
            <g transform="translate(340, 175)">
              <rect x="0" y="0" width="380" height="58" rx="8" fill="#0F172A" stroke="#475569" strokeWidth="1.5" />
              <text x="16" y="24" fill="#CBD5E1" fontSize="14" fontWeight="600">
                PROXIMAL BIOLOGICAL SYSTEM (OUTSIDE ACTUATED BOUNDARY)
              </text>
              <text x="16" y="44" fill="#94A3B8" fontSize="13">
                Knee, hip, pelvis & neuromuscular control adapt to distal ankle torque
              </text>
            </g>
          </g>
        )}

        {/* Waist Battery & Power Tether Context (Shown in Ch 1 & Ch 5) */}
        {layers.fullAssemblyContext > 0.25 && (
          <g
            opacity={layers.fullAssemblyContext}
            transform={`translate(${anklePivotX - 180}, ${anklePivotY - 510})`}
          >
            <rect
              x="0"
              y="0"
              width="210"
              height="76"
              rx="10"
              fill="#1E293B"
              stroke="#64748B"
              strokeWidth="2"
            />
            <rect x="12" y="12" width="42" height="52" rx="4" fill="#0F172A" stroke="#FFD166" strokeWidth="1.5" />
            <text x="20" y="43" fill="#FFD166" fontSize="14" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
              24V
            </text>
            <text x="66" y="30" fill="#F8FAFC" fontSize="15" fontWeight="700">
              Waist Battery Pack
            </text>
            <text x="66" y="50" fill="#94A3B8" fontSize="13" fontFamily="'JetBrains Mono', monospace">
              0.3 kg | 1300 mAh LiPo
            </text>
            <text x="66" y="66" fill="#FFD166" fontSize="12" fontFamily="'JetBrains Mono', monospace">
              ~36.3 min max-assist runtime
            </text>
            {/* Power supply harness path down to shank electronics */}
            <path
              d="M 105 76 C 105 140, 145 160, 155 215"
              fill="none"
              stroke="#FFD166"
              strokeWidth="2.5"
              strokeDasharray="6 4"
            />
          </g>
        )}

        {/* =====================================================================
            ARTICULATED LOWER LIMB + EXOSKELETON ASSEMBLY
        ===================================================================== */}
        <g transform={`translate(${anklePivotX}, ${anklePivotY})`}>
          {/* SHANK & PROXIMAL EXOSKELETON FRAME GROUP */}
          <g transform={`rotate(${shankTiltDeg})`}>
            {/* Schematic Soft-Tissue Envelope (Shank) */}
            <path
              d="M -68 -360 C -76 -240, -62 -110, -42 -15 L 44 -15 C 68 -110, 82 -240, 70 -360 Z"
              fill="#1E293B"
              fillOpacity="0.65"
              stroke="#475569"
              strokeWidth="2"
            />

            {/* Schematic Tibia & Fibula (Labeled Schematic Anatomy) */}
            <path
              d="M -26 -350 L -18 -22 L 16 -22 L 24 -350 Z"
              fill="#334155"
              stroke="#94A3B8"
              strokeWidth="2"
            />
            <path
              d="M -46 -335 L -38 -28 L -28 -28 L -34 -335 Z"
              fill="#273549"
              stroke="#64748B"
              strokeWidth="1.5"
            />
            <text
              x="-12"
              y="-190"
              fill="#94A3B8"
              fontSize="13"
              fontFamily="'JetBrains Mono', monospace"
              transform="rotate(-90, -12, -190)"
            >
              SCHEMATIC TIBIA / FIBULA
            </text>

            {/* Proximal Calf Strap & Interchangeable Mediolateral Spacer (Below Knee) */}
            <g transform="translate(0, -305)">
              {/* Compliant soft-tissue compression zone in cutaway mode */}
              <rect
                x={-72 + softTissueCompressionNormalized * 5}
                y="-26"
                width={150 - softTissueCompressionNormalized * 8}
                height="52"
                rx="8"
                fill={layers.sectionalCutaway > 0.2 ? 'url(#tissue-hatch)' : '#334155'}
                stroke="#94A3B8"
                strokeWidth="2"
              />
              {/* Interchangeable Mediolateral Spacer Pad */}
              <rect
                x="32"
                y="-22"
                width="26"
                height="44"
                rx="5"
                fill="#475569"
                stroke="#E2E8F0"
                strokeWidth="1.5"
              />
              {/* Velcro Calf Strap */}
              <rect
                x="-76"
                y="-14"
                width="162"
                height="28"
                rx="6"
                fill="#0F172A"
                stroke="#CBD5E1"
                strokeWidth="2"
              />
              <line x1="-66" y1="0" x2="76" y2="0" stroke="#64748B" strokeWidth="2" strokeDasharray="8 4" />
            </g>

            {/* Rigid Carbon-Fiber & Aluminum Calf Strut */}
            <path
              d="M 52 -320 L 68 -320 L 62 -10 L 42 -10 Z"
              fill={layers.sectionalCutaway > 0.3 ? 'url(#cutaway-hatch)' : '#0F172A'}
              stroke="#E2E8F0"
              strokeWidth="2.5"
            />

            {/* Portable Control & Optimization Electronics Box (Raspberry Pi 4b + Futek IAA100, 0.15 kg) */}
            <g transform="translate(64, -255)">
              <rect
                x="0"
                y="0"
                width="54"
                height="74"
                rx="6"
                fill="#131B2E"
                stroke={layers.sensingAndControllerOverlay > 0.2 ? '#9D4EDD' : '#94A3B8'}
                strokeWidth="2.5"
              />
              <text x="9" y="24" fill="#E9D5FF" fontSize="11" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                RPi 4b
              </text>
              <text x="9" y="40" fill="#00E5FF" fontSize="10" fontFamily="'JetBrains Mono', monospace">
                200 Hz
              </text>
              <text x="9" y="56" fill="#94A3B8" fontSize="10" fontFamily="'JetBrains Mono', monospace">
                0.15 kg
              </text>
            </g>

            {/* Brushless Gearmotor (CubeMars AK80-9, 9:1) + Custom 7075-Al Drum (r = 0.020 m) */}
            <g transform="translate(56, -135)">
              {/* Motor housing */}
              <circle
                cx="26"
                cy="0"
                r="34"
                fill="#1E293B"
                stroke="#FFD166"
                strokeWidth="2.5"
              />
              {/* Custom 7075-Al Drum (0.020 m radius) */}
              <circle
                cx="26"
                cy="0"
                r="18"
                fill="#0F172A"
                stroke="#F8FAFC"
                strokeWidth="2"
              />
              {/* Drum rotation indicator spokes */}
              <g transform={`rotate(${-deviceJointAngleDeg * 4.5}, 26, 0)`}>
                <line x1="26" y1="-15" x2="26" y2="15" stroke="#FFD166" strokeWidth="2" />
                <line x1="11" y1="0" x2="41" y2="0" stroke="#FFD166" strokeWidth="2" />
              </g>
              <text x="-4" y="-42" fill="#FFD166" fontSize="12" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                AK80-9 + Drum
              </text>
            </g>

            {/* Vectran Transmission Cable (from Drum at [82, -135] to Heel Spur Tip) */}
            {isCableSlack ? (
              /* Slack wave curve during Swing Phase (62-100% gait cycle) */
              <path
                d="M 88 -120 C 115 -75, 72 -35, 96 18"
                fill="none"
                stroke="#94A3B8"
                strokeWidth="3"
                strokeDasharray="6 4"
              />
            ) : (
              /* Taut gold transmission pathway under stance actuation */
              <line
                x1="88"
                y1="-120"
                x2="96"
                y2="20"
                stroke="#FFD166"
                strokeWidth={2.5 + cableTensionNormalized * 3.5}
              />
            )}

            {/* Mechanical Load Arrows on Shank (Chapter 2 & Chapter 4/5) */}
            {layers.loadTransferVectors > 0.05 && normalShankForceNormalized > 0.05 && (
              <g opacity={layers.loadTransferVectors}>
                {/* Normal force applied to anterior shank (avoids skin shear) */}
                <line
                  x1="35"
                  y1="-305"
                  x2={-25 - normalShankForceNormalized * 45}
                  y2="-305"
                  stroke="#FFD166"
                  strokeWidth="4"
                  markerEnd="url(#arrow-gold)"
                />
                <rect x="-255" y="-332" width="215" height="46" rx="6" fill="#0F172A" stroke="#FFD166" strokeWidth="1.5" />
                <text x="-243" y="-312" fill="#FFD166" fontSize="13" fontWeight="700">
                  Normal Shank Force (F_N)
                </text>
                <text x="-243" y="-294" fill="#E2E8F0" fontSize="11" fontFamily="'JetBrains Mono', monospace">
                  No downward skin shear
                </text>
              </g>
            )}
          </g>

          {/* FOOT, SHOE, TOE STRUT & HEEL SPUR GROUP */}
          <g transform={`rotate(${footPitchDeg})`}>
            {/* Running Shoe Silhouette (0.3 kg Nike running shoe) */}
            <path
              d="M -85 18 C -92 48, -88 92, -65 112 L 195 112 C 218 112, 226 90, 205 72 L 60 22 Z"
              fill="#1E293B"
              stroke="#64748B"
              strokeWidth="2.5"
            />

            {/* Schematic Talus, Calcaneus & Metatarsals */}
            <path
              d="M -58 26 L 25 26 L 135 84 L -52 88 Z"
              fill="#334155"
              stroke="#94A3B8"
              strokeWidth="1.8"
            />

            {/* Embedded Carbon-Fiber Sole Plate & Plastic Heel Rope Tube */}
            <rect
              x="-65"
              y="96"
              width="255"
              height="10"
              rx="4"
              fill={layers.sectionalCutaway > 0.2 ? 'url(#cutaway-hatch)' : '#0F172A'}
              stroke="#E2E8F0"
              strokeWidth="2"
            />
            {/* Pin connection at tip of toe strut into carbon sole plate */}
            <circle cx="145" cy="101" r="5" fill="#FFD166" stroke="#0B1019" strokeWidth="1.5" />
            <circle cx="162" cy="101" r="5" fill="#FFD166" stroke="#0B1019" strokeWidth="1.5" />

            {/* Plastic tube in heel sole & rope loop to heel spur */}
            <rect x="-58" y="88" width="22" height="16" rx="3" fill="#0F172A" stroke="#CBD5E1" strokeWidth="1.5" />
            <path
              d="M -47 92 L 94 24"
              fill="none"
              stroke="#E2E8F0"
              strokeWidth="2.5"
              strokeDasharray="4 3"
            />

            {/* 4-Zone Pressure-Sensing Insole (Heel, 5th Metatarsal, 1st Metatarsal, Great Toe) */}
            <g transform="translate(0, 86)">
              <line x1="-52" y1="0" x2="182" y2="0" stroke="#00E5FF" strokeWidth="2" strokeOpacity="0.6" />
              {/* Heel sensor */}
              <circle
                cx="-42"
                cy="0"
                r={5 + insoleActiveZones.heel * 5}
                fill="#00E5FF"
                fillOpacity={0.35 + insoleActiveZones.heel * 0.65}
                stroke="#00E5FF"
                strokeWidth="1.5"
              />
              {/* 5th metatarsal sensor */}
              <circle
                cx="55"
                cy="0"
                r={5 + insoleActiveZones.lateralMidfoot * 5}
                fill="#00E5FF"
                fillOpacity={0.35 + insoleActiveZones.lateralMidfoot * 0.65}
                stroke="#00E5FF"
                strokeWidth="1.5"
              />
              {/* 1st metatarsal sensor */}
              <circle
                cx="118"
                cy="0"
                r={5 + insoleActiveZones.medialForefoot * 5}
                fill="#00E5FF"
                fillOpacity={0.35 + insoleActiveZones.medialForefoot * 0.65}
                stroke="#00E5FF"
                strokeWidth="1.5"
              />
              {/* Great toe sensor */}
              <circle
                cx="172"
                cy="0"
                r={5 + insoleActiveZones.greatToe * 5}
                fill="#00E5FF"
                fillOpacity={0.35 + insoleActiveZones.greatToe * 0.65}
                stroke="#00E5FF"
                strokeWidth="1.5"
              />
            </g>

            {/* Rigid Exoskeleton Toe Strut (anterior) */}
            <path
              d="M 48 0 L 155 98 L 138 102 L 36 8 Z"
              fill="#0F172A"
              stroke="#E2E8F0"
              strokeWidth="2.2"
            />

            {/* Posterior Heel Spur (Lever arm up to 0.115 m) with Wheatstone Strain Gauge Bridge */}
            <path
              d="M 46 -4 L 106 18 L 100 30 L 40 10 Z"
              fill="#0F172A"
              stroke="#E2E8F0"
              strokeWidth="2.5"
            />
            {/* Superior & Inferior Wheatstone Strain Gauges on Heel Spur */}
            <rect x="66" y="1" width="18" height="6" rx="2" fill="#00E5FF" />
            <rect x="63" y="13" width="18" height="6" rx="2" fill="#00E5FF" />

            {/* Mechanical Load Vectors on Heel Spur & Forefoot (Chapter 2) */}
            {layers.loadTransferVectors > 0.05 && heelUpwardForceNormalized > 0.05 && (
              <g opacity={layers.loadTransferVectors}>
                {/* Upward cable tension on heel spur tip */}
                <line
                  x1="102"
                  y1="20"
                  x2="102"
                  y2={-35 - heelUpwardForceNormalized * 55}
                  stroke="#FFD166"
                  strokeWidth="4.5"
                  markerEnd="url(#arrow-gold)"
                />
                {/* Downward forefoot reaction at toe strut pins */}
                <line
                  x1="152"
                  y1="95"
                  x2="152"
                  y2={35 + (1 - toeDownwardReactionNormalized) * 20}
                  stroke="#FFD166"
                  strokeWidth="4"
                  markerStart="url(#arrow-gold)"
                />
                {/* Axial joint reaction force at mechanical pin joint */}
                <line
                  x1="48"
                  y1="0"
                  x2="48"
                  y2="58"
                  stroke="#FFD166"
                  strokeWidth="3.5"
                  strokeDasharray="5 3"
                  markerEnd="url(#arrow-gold)"
                />
              </g>
            )}
          </g>

          {/* MECHANICAL PIN JOINT + ABSOLUTE ROTARY ENCODER vs. BIOLOGICAL TALOCRURAL AXIS */}
          <g>
            {/* Exoskeleton Mechanical Pin Pivot + Rotary Encoder */}
            <circle cx="48" cy="0" r="14" fill="#0F172A" stroke="#00E5FF" strokeWidth="3" />
            <circle cx="48" cy="0" r="5" fill="#FFD166" />

            {/* Schematic Biological Talocrural Axis (Shifting Instantaneous Axis) */}
            <circle
              cx={bioAxisOffsetPx.dx}
              cy={bioAxisOffsetPx.dy}
              r="11"
              fill="#9D4EDD"
              fillOpacity="0.35"
              stroke="#E9D5FF"
              strokeWidth="2"
              strokeDasharray="4 2"
            />
            <circle cx={bioAxisOffsetPx.dx} cy={bioAxisOffsetPx.dy} r="3.5" fill="#E9D5FF" />

            {/* Assistive Torque Curved Arrow around Ankle Joint */}
            {cableTensionNormalized > 0.08 && (
              <path
                d="M 10 -44 A 48 48 0 0 1 92 -12"
                fill="none"
                stroke="#FFD166"
                strokeWidth={3 + cableTensionNormalized * 3}
                markerEnd="url(#arrow-gold)"
              />
            )}
          </g>

          {/* =====================================================================
              SIGNAL PATHWAYS (CYAN DASHED) — CHAPTER 4 & 5
          ===================================================================== */}
          {layers.sensingAndControllerOverlay > 0.05 && (
            <g opacity={layers.sensingAndControllerOverlay}>
              {/* 1. Insole pressure signal -> RPi 4b controller */}
              <path
                d="M 20 86 C -15 45, 25 -120, 64 -200"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                strokeDashoffset={dashOffsetSignal}
                markerEnd="url(#arrow-cyan)"
              />
              {/* 2. Rotary encoder (θ, θ̇) -> RPi 4b controller */}
              <path
                d="M 48 -14 C 38 -90, 48 -150, 64 -215"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                strokeDashoffset={dashOffsetSignal}
                markerEnd="url(#arrow-cyan)"
              />
              {/* 3. Heel-spur Wheatstone strain bridge -> RPi 4b controller */}
              <path
                d="M 75 8 C 125 -45, 130 -145, 118 -205"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="2.5"
                strokeDasharray="8 6"
                strokeDashoffset={dashOffsetSignal}
                markerEnd="url(#arrow-cyan)"
              />
              {/* 4. Commanded motor torque signal from RPi 4b -> AK80-9 motor */}
              <path
                d="M 92 -180 L 84 -152"
                fill="none"
                stroke="#00E5FF"
                strokeWidth="3"
                strokeDasharray="5 4"
                markerEnd="url(#arrow-cyan)"
              />
            </g>
          )}
        </g>

        {/* =====================================================================
            CHAPTER-SPECIFIC ANNOTATIONS & CALLOUT OVERLAYS
        ===================================================================== */}

        {/* CHAPTER 1 CALLOUTS: Attachment & Orientation (Frames 0–149) */}
        {layers.attachmentCallouts > 0.02 && (
          <g opacity={layers.attachmentCallouts}>
            {/* Callout 1: Proximal Calf Interface */}
            <g transform="translate(260, 325)">
              <rect x="0" y="0" width="385" height="78" rx="8" fill="#111827" stroke="#CBD5E1" strokeWidth="1.5" />
              <text x="16" y="26" fill="#F8FAFC" fontSize="16" fontWeight="700">
                1. Proximal Shank Attachment (Below Knee)
              </text>
              <text x="16" y="48" fill="#CBD5E1" fontSize="13.5">
                Velcro calf strap + interchangeable mediolateral spacer
              </text>
              <text x="16" y="66" fill="#94A3B8" fontSize="12" fontFamily="'JetBrains Mono', monospace">
                Contacts soft tissue over tibia/gastrocnemius
              </text>
              <line x1="385" y1="38" x2="535" y2="62" stroke="#CBD5E1" strokeWidth="2" markerEnd="url(#arrow-neutral)" />
            </g>

            {/* Callout 2: Rigid Frame & Distal Actuator */}
            <g transform="translate(1150, 445)">
              <rect x="0" y="0" width="420" height="82" rx="8" fill="#111827" stroke="#FFD166" strokeWidth="1.5" />
              <text x="16" y="26" fill="#FFD166" fontSize="16" fontWeight="700">
                2. Shank-Mounted Actuator & Rigid Strut
              </text>
              <text x="16" y="48" fill="#E2E8F0" fontSize="13.5">
                CubeMars AK80-9 motor + 7075-Al drum (0.020 m radius)
              </text>
              <text x="16" y="68" fill="#94A3B8" fontSize="12" fontFamily="'JetBrains Mono', monospace">
                Carbon-fiber & aluminum frame | 1.2 kg total per ankle
              </text>
              <line x1="0" y1="40" x2="-170" y2="95" stroke="#FFD166" strokeWidth="2" markerEnd="url(#arrow-gold)" />
            </g>

            {/* Callout 3: Distal Shoe Coupling */}
            <g transform="translate(1150, 670)">
              <rect x="0" y="0" width="435" height="86" rx="8" fill="#111827" stroke="#00E5FF" strokeWidth="1.5" />
              <text x="16" y="26" fill="#00E5FF" fontSize="16" fontWeight="700">
                3. Two-Point Footwear Interface (0.3 kg Shoe)
              </text>
              <text x="16" y="48" fill="#E2E8F0" fontSize="13.5">
                Toe strut pins lock into embedded carbon-fiber sole plate;
              </text>
              <text x="16" y="68" fill="#94A3B8" fontSize="12.5" fontFamily="'JetBrains Mono', monospace">
                Heel spur ties via rope through plastic sole tube (0.115 m lever)
              </text>
              <line x1="0" y1="45" x2="-115" y2="85" stroke="#00E5FF" strokeWidth="2" markerEnd="url(#arrow-cyan)" />
            </g>
          </g>
        )}

        {/* CHAPTER 2 CALLOUTS: Sectional Load Transfer (Frames 150–299) */}
        {layers.sectionalCutaway > 0.05 && (
          <g opacity={layers.sectionalCutaway}>
            <g transform="translate(230, 195)">
              <rect x="0" y="0" width="445" height="122" rx="10" fill="#111827" stroke="#FFD166" strokeWidth="2" />
              <text x="18" y="28" fill="#FFD166" fontSize="16" fontWeight="700">
                ILLUSTRATIVE SECTIONAL CUTAWAY — LOAD PATHWAY
              </text>
              <text x="18" y="52" fill="#F8FAFC" fontSize="14">
                • Drum tensions Vectran cable → pulls heel spur upward
              </text>
              <text x="18" y="74" fill="#F8FAFC" fontSize="14">
                • Rigid pin joint reacts axial downward cable force (F_joint)
              </text>
              <text x="18" y="96" fill="#CBD5E1" fontSize="13">
                • Result: Normal shank force (F_N), avoiding downward skin shear
              </text>
              <text x="18" y="114" fill="#94A3B8" fontSize="11.5" fontFamily="'JetBrains Mono', monospace">
                Note: No tissue pressure (kPa) or stress magnitude is measured or implied
              </text>
            </g>

            <g transform="translate(1130, 560)">
              <rect x="0" y="0" width="430" height="106" rx="10" fill="#111827" stroke="#E2E8F0" strokeWidth="1.5" />
              <text x="18" y="28" fill="#FFD166" fontSize="16" fontWeight="700">
                Plantarflexion Assistive Torque Couple
              </text>
              <text x="18" y="52" fill="#E2E8F0" fontSize="13.5">
                Upward heel-spur pull + downward forefoot plate reaction
              </text>
              <text x="18" y="74" fill="#E2E8F0" fontSize="13.5">
                creates assistive plantarflexion moment (up to 54 Nm peak)
              </text>
              <text x="18" y="94" fill="#00E5FF" fontSize="12" fontFamily="'JetBrains Mono', monospace">
                Direct torque feedback via heel-spur Wheatstone bridge
              </text>
            </g>
          </g>
        )}

        {/* CHAPTER 3 CALLOUTS: Alignment, Axes, and 55° Singularity (Frames 300–509) */}
        {layers.alignmentAxesOverlay > 0.05 && (
          <g opacity={layers.alignmentAxesOverlay}>
            {/* Causal Sequence Panel */}
            <g transform="translate(210, 185)">
              <rect x="0" y="0" width="465" height="165" rx="10" fill="#111827" stroke="#9D4EDD" strokeWidth="2" />
              <text x="18" y="28" fill="#E9D5FF" fontSize="16" fontWeight="700">
                SCHEMATIC AXES & CAUSAL ALIGNMENT SEQUENCE
              </text>
              <text x="18" y="54" fill="#F8FAFC" fontSize="14">
                1. Biological talocrural axis shifts across dorsiflexion/plantarflexion
              </text>
              <text x="18" y="78" fill="#F8FAFC" fontSize="14">
                2. Exoskeleton frame rotates about a single fixed pin pivot
              </text>
              <text x="18" y="102" fill="#F8FAFC" fontSize="14">
                3. Axis offset causes slight cuff micro-migration & pad compliance
              </text>
              <text x="18" y="128" fill="#00E5FF" fontSize="13.5" fontWeight="600">
                4. Heel-spur strain gauges measure torque directly at the joint,
              </text>
              <text x="18" y="148" fill="#00E5FF" fontSize="13.5" fontWeight="600">
                   so interface compliance does not corrupt applied torque accuracy.
              </text>
            </g>

            {/* Geometric Lever-Arm & 55 deg Singularity Panel */}
            <g transform="translate(1130, 490)">
              <rect x="0" y="0" width="445" height="132" rx="10" fill="#111827" stroke="#FFD166" strokeWidth="2" />
              <text x="18" y="28" fill="#FFD166" fontSize="16" fontWeight="700">
                Heel-Spur Lever Geometry & Safety Singularity
              </text>
              <text x="18" y="52" fill="#E2E8F0" fontSize="13.5">
                • Max lever arm: 0.115 m (neutral stance)
              </text>
              <text x="18" y="74" fill="#E2E8F0" fontSize="13.5">
                • Effective lever arm ratio: {(effectiveLeverArmRatio * 100).toFixed(0)}% of max at current angle
              </text>
              <text x="18" y="96" fill="#FFD166" fontSize="13.5" fontWeight="600">
                • Geometric singularity at 55° plantarflexion:
              </text>
              <text x="18" y="116" fill="#94A3B8" fontSize="12.5" fontFamily="'JetBrains Mono', monospace">
                Lever arm drops to zero so cable cannot hyperextend ankle
              </text>
            </g>
          </g>
        )}
      </g>

      {/* =====================================================================
          CHAPTER 4: SYNCHRONIZED QUALITATIVE TIMING DIAGRAM (Frames 510–749)
      ===================================================================== */}
      {layers.qualitativeWaveformGraph > 0.02 && (
        <g opacity={layers.qualitativeWaveformGraph}>
          {/* Graph Panel Container */}
          <rect
            x={graphOriginX - 30}
            y={graphOriginY - 55}
            width={graphWidth + 65}
            height={graphHeight + 125}
            rx="14"
            fill="#0F172A"
            fillOpacity="0.96"
            stroke="#334155"
            strokeWidth="2"
          />

          {/* Mandatory Non-Measured Data Badge */}
          <rect
            x={graphOriginX - 10}
            y={graphOriginY - 40}
            width="430"
            height="32"
            rx="6"
            fill="#1E1B4B"
            stroke="#9D4EDD"
            strokeWidth="1.5"
          />
          <text
            x={graphOriginX + 6}
            y={graphOriginY - 19}
            fill="#E9D5FF"
            fontSize="14"
            fontWeight="700"
            fontFamily="'JetBrains Mono', monospace"
          >
            Qualitative illustration—not measured data
          </text>

          <text
            x={graphOriginX + 440}
            y={graphOriginY - 19}
            fill="#00E5FF"
            fontSize="13"
            fontFamily="'JetBrains Mono', monospace"
          >
            Bout Step {stepCounterInBout}/44 | Speed Bin {activeSpeedBin}
          </text>

          {/* Stance (0-62%) vs Swing (62-100%) Phase Regions */}
          <rect
            x={graphOriginX}
            y={graphOriginY + 15}
            width={graphWidth * 0.62}
            height={graphHeight - 30}
            fill="#1E293B"
            fillOpacity="0.45"
          />
          <rect
            x={graphOriginX + graphWidth * 0.62}
            y={graphOriginY + 15}
            width={graphWidth * 0.38}
            height={graphHeight - 30}
            fill="#0B1019"
            fillOpacity="0.7"
          />

          {/* Toe-off vertical divider at 62% gait cycle */}
          <line
            x1={graphOriginX + graphWidth * 0.62}
            y1={graphOriginY + 15}
            x2={graphOriginX + graphWidth * 0.62}
            y2={graphOriginY + graphHeight - 15}
            stroke="#9D4EDD"
            strokeWidth="2"
            strokeDasharray="6 4"
          />
          <text
            x={graphOriginX + graphWidth * 0.62 - 115}
            y={graphOriginY + 36}
            fill="#FFD166"
            fontSize="12.5"
            fontFamily="'JetBrains Mono', monospace"
          >
            Peak ~54.6% | Toe-Off ~62%
          </text>
          <text
            x={graphOriginX + graphWidth * 0.64}
            y={graphOriginY + 36}
            fill="#94A3B8"
            fontSize="12.5"
            fontFamily="'JetBrains Mono', monospace"
          >
            SWING (62–100%): CABLE SLACK
          </text>

          {/* Upper Subplot: Qualitative Assistive Torque Profile */}
          <text
            x={graphOriginX + 12}
            y={graphOriginY + 62}
            fill="#FFD166"
            fontSize="15"
            fontWeight="700"
          >
            Device Assistive Torque Timing (Qualitative Profile — No Vertical Scale Units)
          </text>
          <line
            x1={graphOriginX}
            y1={graphOriginY + 185}
            x2={graphOriginX + graphWidth}
            y2={graphOriginY + 185}
            stroke="#475569"
            strokeWidth="1.5"
          />
          <polyline
            fill="none"
            stroke="#FFD166"
            strokeWidth="4"
            points={torquePoints.join(' ')}
          />

          {/* Lower Subplot: Biological vs. Device Angle Relationship */}
          <text
            x={graphOriginX + 12}
            y={graphOriginY + 245}
            fill="#E2E8F0"
            fontSize="15"
            fontWeight="700"
          >
            Biological Ankle Motion (Solid) vs. Device Joint Motion (Cyan Dashed)
          </text>
          <line
            x1={graphOriginX}
            y1={graphOriginY + 345}
            x2={graphOriginX + graphWidth}
            y2={graphOriginY + 345}
            stroke="#475569"
            strokeWidth="1.5"
          />
          <polyline
            fill="none"
            stroke="#E2E8F0"
            strokeWidth="3.5"
            points={bioAnglePoints.join(' ')}
          />
          <polyline
            fill="none"
            stroke="#00E5FF"
            strokeWidth="2.5"
            strokeDasharray="8 5"
            points={devAnglePoints.join(' ')}
          />

          {/* X-Axis Labels (Normalized Stride 0% to 100%) */}
          <text x={graphOriginX} y={graphOriginY + graphHeight + 12} fill="#94A3B8" fontSize="13" fontFamily="'JetBrains Mono', monospace">
            0% (Heel Strike)
          </text>
          <text x={graphOriginX + graphWidth * 0.45} y={graphOriginY + graphHeight + 12} fill="#94A3B8" fontSize="13" fontFamily="'JetBrains Mono', monospace">
            50% (Late Stance)
          </text>
          <text x={graphOriginX + graphWidth - 135} y={graphOriginY + graphHeight + 12} fill="#94A3B8" fontSize="13" fontFamily="'JetBrains Mono', monospace">
            100% (Next Heel Strike)
          </text>

          {/* Synchronized Phase Cursor */}
          <line
            x1={cursorX}
            y1={graphOriginY + 15}
            x2={cursorX}
            y2={graphOriginY + graphHeight - 15}
            stroke="#00E5FF"
            strokeWidth="2.5"
          />
          <circle cx={cursorX} cy={graphOriginY + 185 - state.assistiveTorqueNormalized * 135} r="6" fill="#FFD166" />

          {/* Opportunistic Data-Driven Classifier Summary Strip */}
          <rect
            x={graphOriginX}
            y={graphOriginY + graphHeight + 24}
            width={graphWidth}
            height="36"
            rx="6"
            fill="#131B2E"
            stroke="#9D4EDD"
            strokeWidth="1.5"
          />
          <text
            x={graphOriginX + 14}
            y={graphOriginY + graphHeight + 47}
            fill="#E9D5FF"
            fontSize="13"
            fontFamily="'JetBrains Mono', monospace"
          >
            CONTROLLER OVERLAY: Logistic classifier ranks control law pairs every 44 steps (first 6 steps discarded)
          </text>
        </g>
      )}

      {/* =====================================================================
          CHAPTER 5: VARIABILITY, LIMITATIONS & FINAL HOLD (Frames 750–1019)
      ===================================================================== */}
      {layers.variabilitySystemBoundary > 0.05 && (
        <g opacity={layers.variabilitySystemBoundary} transform="translate(1205, 135)">
          {/* Card 1: Documented Outdoor Personalization Variability */}
          <rect x="0" y="0" width="655" height="215" rx="12" fill="#0F172A" stroke="#00E5FF" strokeWidth="2" />
          <text x="22" y="34" fill="#00E5FF" fontSize="18" fontWeight="700">
            1. Person-to-Person Variability in Optimized Assistance
          </text>
          <text x="22" y="62" fill="#E2E8F0" fontSize="14.5">
            • Even in 10 healthy adults (age 24.2 ± 1.8 yr), optimal peak torque and
          </text>
          <text x="22" y="84" fill="#E2E8F0" fontSize="14.5">
              rise time varied substantially across individuals and walking speeds.
          </text>
          <text x="22" y="114" fill="#FFD166" fontSize="14.5" fontWeight="600">
            • Outdoor public-course validation (Slade et al., 2022, n = 10):
          </text>
          <text x="36" y="138" fill="#F8FAFC" fontSize="14" fontFamily="'JetBrains Mono', monospace">
            +9 ± 4% self-selected speed | −17 ± 5% energy cost vs. normal shoes
          </text>
          <text x="36" y="162" fill="#F8FAFC" fontSize="14" fontFamily="'JetBrains Mono', monospace">
            −23 ± 8% metabolic energy on treadmill at 1.5 m/s (~2x generic assist)
          </text>
          <text x="22" y="194" fill="#94A3B8" fontSize="12.5" fontFamily="'JetBrains Mono', monospace">
            Documented in healthy experienced cohort; not a universal guarantee.
          </text>

          {/* Card 2: Prototype Constraints & Clinical Population Limits */}
          <rect x="0" y="235" width="655" height="235" rx="12" fill="#0F172A" stroke="#FFD166" strokeWidth="2" />
          <text x="22" y="269" fill="#FFD166" fontSize="18" fontWeight="700">
            2. Documented Prototype & Clinical Boundaries
          </text>
          <text x="22" y="298" fill="#E2E8F0" fontSize="14.5">
            • Hardware constraints (Slade et al., 2022): 36.3-min battery at max torque;
          </text>
          <text x="22" y="320" fill="#E2E8F0" fontSize="14.5">
              posterior heel spur requires care on stairs; neutral all-day comfort (SUS 72.5).
          </text>
          <text x="22" y="350" fill="#E2E8F0" fontSize="14.5">
            • Clinical rehabilitation populations (Siviy et al., 2023 review):
          </text>
          <text x="22" y="372" fill="#CBD5E1" fontSize="14">
              Stroke, SCI, MS, CP, and TBI trials show responder/non-responder divergence,
          </text>
          <text x="22" y="394" fill="#CBD5E1" fontSize="14">
              fit-related skin redness/abrasion, and fall risks requiring supervision.
          </text>
          <text x="22" y="424" fill="#E9D5FF" fontSize="13" fontFamily="'JetBrains Mono', monospace">
            LIMITATION: Mechanical assistance ≠ guaranteed clinical recovery.
          </text>
          <text x="22" y="446" fill="#94A3B8" fontSize="12.5" fontFamily="'JetBrains Mono', monospace">
            Fit, suitability & supervision depend on the specific device and user.
          </text>

          {/* Card 3: Final Hold Takeaway (Frames 960–1019) */}
          {layers.finalTakeawayBanner > 0.02 && (
            <g opacity={layers.finalTakeawayBanner} transform="translate(0, 490)">
              <rect x="0" y="0" width="655" height="165" rx="12" fill="#131B2E" stroke="#9D4EDD" strokeWidth="2.5" />
              <text x="22" y="34" fill="#E9D5FF" fontSize="17" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
                ESSENTIAL TAKEAWAY {isFinalHold ? '(FINAL HOLD: FRAMES 960–1019)' : ''}
              </text>
              <text x="22" y="64" fill="#F8FAFC" fontSize="15.5" fontWeight="600">
                A wearable robot never acts directly on a mathematical joint axis.
              </text>
              <text x="22" y="90" fill="#CBD5E1" fontSize="14.5">
                Every watt of mechanical assistance crosses straps, shoes, soft tissue,
              </text>
              <text x="22" y="114" fill="#CBD5E1" fontSize="14.5">
                and shifting biological kinematics—making direct sensing, shear-free load
              </text>
              <text x="22" y="138" fill="#00E5FF" fontSize="14.5" fontWeight="600">
                paths, and individual adaptation the core of the human–device interface.
              </text>
            </g>
          )}
        </g>
      )}

      {/* =====================================================================
          TOP EDITORIAL HUD HEADER & TRANSFORMATION BADGE
      ===================================================================== */}
      <g transform="translate(48, 32)">
        <rect x="0" y="0" width="1140" height="86" rx="10" fill="#0F172A" fillOpacity="0.92" stroke="#1E293B" strokeWidth="2" />
        <text x="22" y="30" fill="#00E5FF" fontSize="14" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
          {chapter.title.toUpperCase()} | {chapter.timeRangeLabel}
        </text>
        <text x="22" y="62" fill="#F8FAFC" fontSize="24" fontWeight="700">
          {chapter.onScreenHeadline}
        </text>

        {/* Transformation / Epistemic Badge */}
        <rect x="1160" y="0" width="664" height="86" rx="10" fill="#0F172A" fillOpacity="0.92" stroke="#334155" strokeWidth="2" />
        <text x="1182" y="28" fill="#94A3B8" fontSize="12" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
          EXPLANATORY TRANSFORMATION & EPISTEMIC LABEL
        </text>
        <text x="1182" y="52" fill="#E2E8F0" fontSize="14.5" fontWeight="600">
          {chapter.transformationBadge}
        </text>
        <text x="1182" y="73" fill="#FFD166" fontSize="13" fontFamily="'JetBrains Mono', monospace">
          Frame {String(state.frame).padStart(4, '0')} / 1019 | t = {state.timeFormatted} | Phase: {gaitPhaseLabel}
        </text>
      </g>

      {/* =====================================================================
          BOTTOM PERSISTENT VISUAL LEGEND & SYNCHRONIZED EXPLANATORY TEXT BAR
      ===================================================================== */}
      {!compactMobile && (
        <g transform="translate(48, 920)">
          <rect
            x="0"
            y="0"
            width="1824"
            height="128"
            rx="12"
            fill="#0F172A"
            fillOpacity="0.95"
            stroke="#1E293B"
            strokeWidth="2"
          />

          {/* Visual Legend Row */}
          <g transform="translate(24, 26)">
            <text x="0" y="0" fill="#94A3B8" fontSize="12.5" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
              VISUAL LEGEND:
            </text>

            {/* Signals */}
            <line x1="125" y1="-4" x2="175" y2="-4" stroke="#00E5FF" strokeWidth="3" strokeDasharray="6 4" markerEnd="url(#arrow-cyan)" />
            <text x="185" y="0" fill="#00E5FF" fontSize="13" fontWeight="600">
              Signals (200 Hz Sensor / Cmd)
            </text>

            {/* Mechanical Loads / Energy */}
            <line x1="415" y1="-4" x2="465" y2="-4" stroke="#FFD166" strokeWidth="4" markerEnd="url(#arrow-gold)" />
            <text x="475" y="0" fill="#FFD166" fontSize="13" fontWeight="600">
              Mechanical Loads & Work (Force / Torque)
            </text>

            {/* Sensing / Controller / Boundary */}
            <rect x="780" y="-13" width="24" height="16" rx="3" fill="#9D4EDD" fillOpacity="0.25" stroke="#9D4EDD" strokeWidth="2" strokeDasharray="4 2" />
            <text x="814" y="0" fill="#E9D5FF" fontSize="13" fontWeight="600">
              Controller / Conceptual Boundary
            </text>

            {/* Physical & Cutaway */}
            <rect x="1080" y="-13" width="24" height="16" rx="2" fill="url(#cutaway-hatch)" stroke="#94A3B8" strokeWidth="1.5" />
            <text x="1114" y="0" fill="#CBD5E1" fontSize="13" fontWeight="600">
              Schematic Anatomy / Cutaway Surface
            </text>

            {/* Architecture Citation Tag */}
            <text x="1420" y="0" fill="#94A3B8" fontSize="12.5" fontFamily="'JetBrains Mono', monospace">
              Architecture: Slade et al. (2022) Nature | Siviy et al. (2023)
            </text>
          </g>

          <line x1="24" y1="42" x2="1800" y2="42" stroke="#1E293B" strokeWidth="1.5" />

          {/* Synchronized Explanatory Text (Also preserved in exported video) */}
          <text x="24" y="66" fill="#00E5FF" fontSize="12" fontWeight="700" fontFamily="'JetBrains Mono', monospace">
            SYNCHRONIZED EXPLANATORY TEXT {exportMode ? '(AUTHORITATIVE RENDER)' : ''}
          </text>
          <text x="24" y="92" fill="#F8FAFC" fontSize="15.5">
            {chapter.explanatoryText.slice(0, 145)}
            {chapter.explanatoryText.length > 145 ? '...' : ''}
          </text>
          {chapter.explanatoryText.length > 145 && (
            <text x="24" y="114" fill="#CBD5E1" fontSize="14.5">
              {chapter.explanatoryText.slice(145)}
            </text>
          )}
        </g>
      )}
    </svg>
  );
};
