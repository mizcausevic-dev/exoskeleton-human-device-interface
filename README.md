# EXOSKELETON HUMAN–DEVICE INTERFACE

**Subtitle:** How attachment, structure, sensing, and actuation connect a wearable robot to a moving person.  
**Industry:** Wearable Assistive Robotics

---

## GitHub Repository Metadata

- **Repository:** https://github.com/mizcausevic-dev/exoskeleton-human-device-interface
- **About (One Line):** Interactive scientific explainer, 34-second deterministic motion stage (1,020 frames @ 30 fps), annotated technical diagram, mind map, and source-verified article on the ankle exoskeleton human–device interface.
- **Topics (9 Tags):** `wearable-robotics`, `exoskeleton`, `biomechanics`, `scientific-visualization`, `human-device-interface`, `assistive-robotics`, `react`, `typescript`, `svg-animation`

---

## Overview & Architecture Selection

This project delivers a complete educational experience explaining the five connected aspects of the lower-limb exoskeleton human–device interface:

1. **Attachment:** Where the device contacts and connects to the body (waist battery pack, below-knee Velcro calf strap with interchangeable mediolateral spacers, and modified running shoe with embedded carbon-fiber sole plate and heel rope tube).
2. **Load transfer:** How mechanical loads cross those interfaces (0.020 m aluminum drum winding a Vectran cable to pull upward on a 0.115 m heel spur up to 54 Nm peak torque, while the rigid frame reacts axial downward cable tension at the mechanical pin joint to apply normal shank force without downward skin shear).
3. **Alignment:** How device geometry relates to biological movement (single mechanical pin pivot with rotary encoder vs. shifting biological talocrural axis, 55° plantarflexion geometric safety singularity, and direct heel-spur Wheatstone strain-gauge torque sensing).
4. **Sensing and actuation:** What the onboard 200 Hz Raspberry Pi 4b architecture measures (4-zone pressure insole, joint rotary encoder, and heel-spur strain bridge), why assistive torque peaks in late stance (~54.6% gait cycle) and ends by toe-off (~62%), and why the motor drives slack into the cable during swing (62–100%).
5. **Variability:** Why fit, movement, optimal control parameters, suitability, and outcomes differ across users (44-step opportunistic data-driven optimization yielding +9 ± 4% speed and −17 ± 5% energy cost outdoors in $n = 10$ healthy adults, alongside prototype constraints and clinical rehabilitation heterogeneity).

### Selected Approach: A. Documented Device with Schematic Anatomy
- **Primary Documented Device:** Stanford Biomechatronics Laboratory untethered bilateral ankle exoskeleton prototype ([Slade et al., 2022, *Nature* / PMC9556303](https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/); [NIH Research Matters, 2022](https://www.nih.gov/news-events/nih-research-matters/robotic-exoskeleton-helps-people-walk)).
- **General Taxonomy & Clinical Context:** [Siviy et al., 2023, *Nature Biomedical Engineering* / PMC11536595](https://pmc.ncbi.nlm.nih.gov/articles/PMC11536595/).

---

## Deliverables Included in This Repository

| Deliverable | Path | Description |
| :--- | :--- | :--- |
| **Interactive Website** | `src/`, `index.html`, `dist/` | Responsive Vite + React + TypeScript application with Hero, 34s Interactive Explainer, Annotated Interface Diagram, Mind Map, Full Article, and Filterable Source Ledger. |
| **Deterministic Scene Engine** | `src/engine/sceneState.ts`, `src/data/timelineSpec.ts` | Single authoritative `computeSceneState(frame)` function over frames `0–1019` (34s @ 30 fps) with final hold during frames `960–1019`. |
| **Encoded 1080p MP4 Video** | `public/video/exoskeleton-interface-explainer-1080p.mp4` | Rendered from the authoritative timeline without player controls: `1920×1080`, `H.264 (High)`, constant `30 fps`, exact `1,020 frames` (`34.000000s`). |
| **Original Visual Assets** | `public/assets/` | `hero-exoskeleton-interface.{svg,png}`, `annotated-interface-diagram.{svg,png}`, `interface-mind-map.{svg,png}`, and `social-preview-card.{svg,png}` (`1200×630`). |
| **Medium-Ready Article** | `docs/MEDIUM_ARTICLE.md` & `#article` section | Complete ~1,460-word article with headline, subtitle, inline source links, figure placement guidance, 5 Medium tags, SEO metadata, and social copy. |
| **Source & Evidence Ledger** | `docs/SOURCE_LEDGER.md` & `src/data/sourceLedger.ts` | Claim-to-source ledger separating documented facts, interpretive simplifications, and unresolved details. |
| **Standalone Dashboards** | `dashboard-Claude.html`, `dashboard-Cursor.html` | Single-file HTML system architecture and verification dashboards with 7 themes (light/dark + `localStorage` persistence). |

---

## Local Development, Build, and Deterministic Video Export

### 1. Install Dependencies
```bash
npm install
```

### 2. Run Local Development Server
```bash
npx vite --host 127.0.0.1 --port 43123
```

### 3. Build Production Static Site (`dist/`)
```bash
npm run build
```

### 4. Re-Render Deterministic 1080p MP4 Video & PNG Assets
The export script launches headless Chromium at `1920×1080`, navigates to `/?export=1&frame=0` (which hides all player controls while preserving stage labels and synchronized explanatory text), awaits `document.fonts.ready`, steps `window.__setExportFrame(n)` for `n = 0..1019`, and pipes frames into `ffmpeg`:

```bash
node scripts/render-video-and-assets.mjs
```

### 5. Verify Video Stream Metadata with `ffprobe`
```bash
ffprobe -v error -select_streams v:0 -count_frames \
  -show_entries stream=codec_name,width,height,r_frame_rate,nb_read_frames,duration \
  -of json public/video/exoskeleton-interface-explainer-1080p.mp4
```

### 6. Run End-to-End Automated Verification Suite
```bash
node scripts/verify-all.mjs
```

---

## Cross-Vertical Repurposing Note

The deterministic frame-indexed SVG stage engine (`src/engine/sceneState.ts` + `scripts/render-video-and-assets.mjs`) decouples mathematical timeline state from DOM playback and video encoding. It can be repurposed directly to other technical verticals—such as **autonomous hip/knee exoskeletons**, **surgical robotics kinematics**, **cardiovascular medical device load-transfer explainers**, or **aerospace actuation fault-tree visualizers**—simply by replacing the chapter specification (`timelineSpec.ts`) and SVG assembly layers while retaining the 30 fps frame-locked player, reduced-motion keyframe grid, and headless MP4 pipeline.
