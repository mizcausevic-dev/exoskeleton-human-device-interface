import React from 'react';

export const ArticleSection: React.FC = () => {
  return (
    <section
      id="article"
      aria-labelledby="article-heading"
      className="py-14 border-b border-slate-800/80 bg-[#0B1019]"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header & Metadata */}
        <div className="mb-10 border-b border-slate-800 pb-8">
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-500/40 text-cyan-300 text-xs font-mono uppercase tracking-wider">
              <span>Complete Medium-Ready Article</span>
              <span>•</span>
              <span>~1,460 Words</span>
              <span>•</span>
              <span>Source-Linked</span>
            </div>
            <span className="text-xs font-mono text-slate-400">
              Markdown source: <code className="text-cyan-300">docs/MEDIUM_ARTICLE.md</code>
            </span>
          </div>

          <h2
            id="article-heading"
            className="text-2xl sm:text-4xl font-extrabold text-slate-50 tracking-tight leading-tight mb-3"
          >
            Exoskeleton Human–Device Interface: How Attachment, Structure, Sensing, and Actuation Connect a Wearable Robot to a Moving Person
          </h2>
          <p className="text-lg sm:text-xl text-slate-300 font-medium leading-relaxed">
            Why assistive torque is only as effective as the physical cuffs, joint axes, sensor loops, and individual adaptations that carry it across the body.
          </p>

          {/* Editorial & SEO Metadata Summary Grid */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 bg-slate-900/60 border border-slate-800 rounded-xl p-4 text-xs">
            <div className="space-y-1.5">
              <div>
                <span className="font-mono text-slate-400">SEO Title: </span>
                <strong className="text-slate-200">
                  Exoskeleton Human–Device Interface: Attachment, Load Transfer, Alignment &amp; Actuation
                </strong>
              </div>
              <div>
                <span className="font-mono text-slate-400">Suggested Slug: </span>
                <code className="text-cyan-300 font-mono">exoskeleton-human-device-interface</code>
              </div>
              <div>
                <span className="font-mono text-slate-400">Five Medium Tags: </span>
                <span className="text-amber-300 font-mono">
                  Robotics, Biomechanics, Wearable Technology, Biomedical Engineering, Rehabilitation
                </span>
              </div>
            </div>
            <div className="space-y-1.5">
              <div>
                <span className="font-mono text-slate-400">Meta Description: </span>
                <span className="text-slate-300">
                  A technical visual explainer of the lower-limb ankle exoskeleton human–device interface, examining physical attachment, shear-free load transfer, joint alignment, 200 Hz sensing, and user variability.
                </span>
              </div>
              <div>
                <span className="font-mono text-slate-400">Cross-Publication Rule: </span>
                <span className="text-slate-400">
                  Not published to Medium without authorization. If cross-published later, set Medium canonical link to the primary web URL.
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Article Body */}
        <article className="space-y-8 text-slate-200 leading-relaxed text-base sm:text-[17px]">
          <p className="text-lg text-slate-100 leading-relaxed">
            A wearable robot never applies torque directly to a skeleton. Between an electric motor and a human bone sit layers of textile webbing, foam spacers, footwear soles, skin, subcutaneous fat, and muscle tissue that deform under load and shift during movement. Whether a lower-limb exoskeleton reduces the effort of walking or fights the person wearing it depends on the <strong>human–device interface</strong>: the mechanical, kinematic, and informational bridge where machine structure meets living anatomy.
          </p>

          <p>
            In wearable assistive robotics, lower-extremity systems generally follow one of two architectural strategies, as synthesized in a comprehensive review by{' '}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11536595/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
            >
              Siviy et al. (2023) in <em>Nature Biomedical Engineering</em>
            </a>
            . <strong>Weight-bearing exoskeletons</strong> span the entire leg with rigid links to transfer load directly to the ground, a configuration used in heavy industrial load-handling or to restore overground ambulation for individuals with complete spinal-cord injury. <strong>Joint-targeting exoskeletons</strong>, by contrast, do not bear the user&apos;s body weight to the ground. Instead, they apply assistive torque in parallel with a specific biological joint, such as the ankle or hip, to augment muscle-tendon mechanics and lower the metabolic energy required to walk.
          </p>

          <p>
            To understand how a joint-targeting interface works without combining incompatible parts from unrelated machines, this analysis examines one documented lower-limb system throughout: the <strong>untethered bilateral ankle exoskeleton</strong> developed at the Stanford Biomechatronics Laboratory and reported by{' '}
            <a
              href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
            >
              Slade, Kochenderfer, Delp, and Collins (2022) in <em>Nature</em>
            </a>{' '}
            (summarized in{' '}
            <a
              href="https://www.nih.gov/news-events/nih-research-matters/robotic-exoskeleton-helps-people-walk"
              target="_blank"
              rel="noopener noreferrer"
              className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
            >
              NIH Research Matters, 2022
            </a>
            ). Where internal load paths, biological joint axes, or timing curves are illustrated to clarify a physical principle, we distinguish documented hardware specifications from schematic visual simplifications.
          </p>

          {/* Section 1 */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-50 tracking-tight">
              1. Attachment: Where the Device Contacts the Body and Why Mass Location Matters
            </h3>
            <p>
              Every autonomous wearable robot confronts a fundamental physiological penalty: carrying mass on the legs requires metabolic energy, and that penalty rises steeply the farther down the leg the mass is placed. As noted in the <strong>augmentation factor</strong> framework reviewed by{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11536595/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Siviy et al. (2023)
              </a>
              , adding mass at the foot or ankle imposes a much larger energetic cost during leg swing than carrying the same mass near the waist.
            </p>
            <p>
              Designers can mount heavy actuators at the waist and route forces down the leg through flexible <strong>Bowden cables</strong> (an inner cable sliding inside an outer housing, similar to a bicycle brake cable). However, as{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Slade et al. (2022)
              </a>{' '}
              document in their hardware design analysis, Bowden cables introduce stick-slip friction, posture-dependent compliance, and history-dependent losses that reduce control bandwidth and add cable mass. The Stanford untethered prototype resolves this trade-off by splitting power storage from actuation across three physical attachment zones:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>
                <strong>Proximal Power Supply at the Waist:</strong> A rechargeable 24 V, 1,300 mAh lithium-polymer battery weighing <strong>0.3 kg</strong> is worn at the waist, keeping battery mass near the body&apos;s center of mass while supplying electrical power for roughly <strong>36.3 minutes</strong> of continuous maximum-assistance walking.
              </li>
              <li>
                <strong>Proximal Shank Interface Below the Knee:</strong> The upper end of the rigid carbon-fiber and aluminum calf strut anchors to the lower leg just below the knee. Velcro straps pass through slots in the strut and secure around a mating strap worn on the shank, while <strong>interchangeable mediolateral calf spacers</strong> accommodate differences in leg width across users.
              </li>
              <li>
                <strong>Distal Footwear Coupling at the Toe and Heel:</strong> Rather than strapping over the top of a user&apos;s everyday shoe, the frame integrates directly with a 0.3 kg running shoe at two structural points. Anteriorly, metal pins extending from the tip of the toe strut lock into a <strong>carbon-fiber plate embedded in the shoe sole</strong>. Posteriorly, the shoe heel connects to an aluminum <strong>heel spur</strong> via a rope tied to holes on either side of the spur and routed through a plastic tube embedded in the sole.
              </li>
            </ul>
            <p>
              Together, the frame, motor, drum transmission, sensors, microcontroller, and shoe weigh <strong>1.2 kg per ankle</strong>.
            </p>
          </div>

          {/* Section 2 */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-50 tracking-tight">
              2. Load Transfer: Turning Cable Tension into Normal Force Without Skin Shear
            </h3>
            <p>
              Connecting a frame to the calf and shoe is only the first step. When the device assists ankle <strong>plantarflexion</strong>—the downward push of the foot and toes against the ground at the end of stance—it must transmit substantial mechanical moments (up to <strong>54 Nm of peak assistive torque</strong> when walking at 1.5 m/s, equivalent to roughly 50% to 75% of typical biological ankle torque in the study cohort) without injuring or irritating the skin.
            </p>
            <p>
              In the{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Slade et al. (2022)
              </a>{' '}
              architecture, a <strong>CubeMars AK80-9 brushless gearmotor</strong> (0.5 kg, with an internal 9:1 single-stage planetary gear rated to 18 Nm peak motor torque) is mounted on the lateral shank strut. The motor drives a custom <strong>7075-aluminum drum</strong> with a <strong>0.020 m radius</strong>, which winds a high-strength <strong>Vectran transmission cable</strong> attached to the posterior tip of the heel spur. With a maximum heel-spur lever arm of <strong>0.115 m</strong> from the mechanical ankle joint, the drum-to-spur geometry provides an additional ~5:1 mechanical advantage.
            </p>
            <p>
              At first glance, pulling upward on the heel spur with a cable anchored to the calf strut might appear to pull the entire calf cuff downward along the shin. Downward <strong>shear force</strong>—force acting parallel to the skin surface—is poorly tolerated by human skin and rapidly causes chafing, blistering, and cuff slippage.
            </p>

            {/* Placement Guidance Callout 1 */}
            <div className="my-4 p-4 rounded-xl bg-slate-900/80 border border-amber-500/40 text-xs font-mono text-amber-200">
              [EDITORIAL FIGURE PLACEMENT 1]: Insert Annotated Interface Diagram (<code>assets/annotated-interface-diagram.svg</code>) here so readers can trace subsystems 01–07 alongside the three-point load reaction explanation.
            </div>

            <p>
              The rigid frame prevents this shear through a three-point mechanical reaction path documented by{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Slade et al. (2022)
              </a>
              :
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>
                When the cable tensions between the upper drum and the lower heel spur, the <strong>axial downward component</strong> of that cable force travels through the stiff carbon-fiber calf strut and is <strong>reacted directly across the mechanical ankle pin joint</strong> into the shoe structure.
              </li>
              <li>
                Because the mechanical joint carries the vertical axial load, the calf cuff does not slide down the leg. Instead, the reaction creates a <strong>three-point bending couple</strong>: an <strong>upward pull</strong> at the posterior heel spur, a <strong>downward reaction</strong> through the anterior toe strut pins into the carbon-fiber sole plate, and a horizontal <strong>normal force</strong> (force perpendicular to the skin) pressing against the anterior shank below the knee.
              </li>
            </ul>
            <p>
              Even with shear minimized, the human–device interface is not infinitely stiff. As{' '}
              <a
                href="https://doi.org/10.1186/s12984-017-0247-9"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Yandell et al. (2017)
              </a>{' '}
              and{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11536595/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Siviy et al. (2023)
              </a>{' '}
              explain, soft tissue and textile straps deform when loaded, absorbing and delaying mechanical energy before it reaches the underlying bones. In our interactive explainer (Chapter 2), this interface deformation is shown as an illustrative sectional cutaway; neither study reports localized kilopascal (kPa) contact-pressure maps for this untethered prototype, so force arrows represent directional load pathways rather than measured tissue stress.
            </p>
          </div>

          {/* Section 3 */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-50 tracking-tight">
              3. Alignment: Mechanical Pin Pivots versus Biological Joint Kinematics
            </h3>
            <p>
              Human joints are not simple workshop hinges. The biological ankle (<strong>talocrural</strong> and subtalar complex) rotates around a shifting, three-dimensional axis as the foot moves from heel strike through flat-foot stance to toe-off. By contrast, a lightweight rigid ankle exoskeleton typically rotates around a single mechanical pin joint.
            </p>
            <p>
              As{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11536595/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Siviy et al. (2023)
              </a>{' '}
              highlight, kinematic mismatch between a fixed mechanical axis and a shifting biological axis is a central challenge in wearable robotics. When the device pivot and biological axis do not coincide throughout the stride, the frame and limb undergo slight relative motion, compressing the calf padding and altering the instantaneous lever arm of the transmission.
            </p>
            <p>
              Rather than adding heavy multi-degree-of-freedom linkages at the ankle, the{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Slade et al. (2022)
              </a>{' '}
              prototype manages alignment and joint geometry through three mechanisms:
            </p>
            <ol className="list-decimal pl-6 space-y-2 text-slate-300">
              <li>
                <strong>Static Fit Modularity:</strong> Interchangeable running shoe sizes, carbon-fiber strut lengths, and mediolateral calf spacers align the mechanical joint near the user&apos;s anatomical malleoli during initial fitting.
              </li>
              <li>
                <strong>Geometric Safety Singularity at 55° Plantarflexion:</strong> As the ankle extends (plantarflexes) during push-off, the angle between the Vectran cable and the heel spur changes, shortening the effective lever arm from its 0.115 m maximum. At <strong>55° of plantarflexion</strong>, the cable line of action passes through a geometric singularity where the lever arm drops to zero, physically ensuring that the actuator cannot hyperextend the wearer&apos;s ankle.
              </li>
              <li>
                <strong>Direct Joint Torque Measurement via Strain Gauges:</strong> If an exoskeleton estimates joint torque merely from motor current, any geometric lever-arm change, transmission friction, or soft-tissue compliance introduces torque errors. By bonding <strong>strain gauges in a full Wheatstone bridge</strong> on the superior and inferior surfaces of the heel spur, the prototype measures bending moment directly at the ankle joint. Direct joint torque feedback (combined with iterative learning control) keeps torque tracking error below <strong>1% of peak torque</strong> regardless of changes in the lever arm or compliance in the frame and calf interface.
              </li>
            </ol>
          </div>

          {/* Section 4 */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-50 tracking-tight">
              4. Sensing and Actuation: Why Device Motion and Human Motion Are Related—Not Identical
            </h3>
            <p>
              A common misconception is that an ankle exoskeleton pushes continuously throughout the step or mirrors the biological joint angle at all times. In reality, assistive torque is highly phase-specific, and during much of the stride the device must get out of the way.
            </p>
            <p>
              To coordinate assistance with natural walking, the prototype&apos;s onboard <strong>Raspberry Pi 4b microcontroller</strong> (0.15 kg total electronics package) samples three portable sensor modalities at <strong>200 Hz</strong> (
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Slade et al., 2022
              </a>
              ):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>
                <strong>Four-Zone Pressure-Sensing Insole:</strong> Pressure sensors beneath the heel, fifth metatarsal, first metatarsal, and great toe detect the exact instant of <strong>heel strike</strong> (defining 0% and 100% of the gait cycle) and measure <strong>stride duration</strong> (<code className="text-cyan-300 font-mono">t_stride</code>) to estimate walking speed on every step.
              </li>
              <li>
                <strong>Joint Rotary Encoder:</strong> An absolute rotary encoder inside the mechanical ankle joint measures exoskeleton ankle angle (<code className="text-cyan-300 font-mono">θ</code>) and angular velocity (<code className="text-cyan-300 font-mono">θ̇</code>).
              </li>
              <li>
                <strong>Heel-Spur Strain Bridge &amp; Amplifier:</strong> The Wheatstone bridge and <strong>Futek IAA100 amplifier</strong> provide real-time ankle torque measurements for closed-loop tracking.
              </li>
            </ul>
            <p>
              Across a single normalized gait cycle (0% to 100% stride), human movement and device actuation play distinct roles:
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>
                <strong>Early to Mid-Stance (0% to ~40% Stride):</strong> Following heel strike, the biological tibia rotates forward over the foot (<strong>dorsiflexion</strong>), storing elastic energy in the Achilles tendon while plantarflexor muscles contract nearly isometrically.
              </li>
              <li>
                <strong>Late-Stance Push-Off (~40% to 62% Stride):</strong> As the heel lifts, the biological calf muscles contract concentrically—a metabolically expensive phase where external mechanical assistance yields the highest energetic return. The exoskeleton torque profile (defined by rise time, peak torque magnitude, peak time near <strong>54.6% of the gait cycle</strong>, and a <strong>10.0% fall time</strong>) ramps up to deliver peak plantarflexion torque right before <strong>toe-off (~62% stride)</strong>.
              </li>
              <li>
                <strong>Swing Phase (~62% to 100% Stride):</strong> Once the foot leaves the ground, the wearer must dorsiflex the ankle to clear the toes. Even tiny residual damping torques from a linear feedback controller during swing can increase user effort. Therefore, the backdrivable drum-and-cable transmission actively <strong>drives slack into the Vectran cable</strong> during swing and in Zero Torque mode, mechanically decoupling the motor so the biological limb swings freely.
              </li>
            </ul>
          </div>

          {/* Placement Guidance Callout 2 */}
          <div className="my-4 p-4 rounded-xl bg-slate-900/80 border border-purple-500/40 text-xs font-mono text-purple-200">
            [EDITORIAL FIGURE PLACEMENT 2]: Insert Conceptual Mind Map (<code>assets/interface-mind-map.svg</code>) here to synthesize how attachment, load transfer, alignment, sensing/actuation, and user variability interlock.
          </div>

          {/* Section 5 */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-50 tracking-tight">
              5. Variability: Why the Interface Depends on the Person
            </h3>
            <p>
              Even when two people wear the exact same hardware at the same walking speed, they do not respond identically to a fixed torque profile. Historically, tuning an exoskeleton through <strong>human-in-the-loop (HIL) optimization</strong> required hours of steady treadmill walking while wearing a respiratory mask to measure oxygen consumption and carbon dioxide production (
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11536595/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Siviy et al., 2023
              </a>
              ).
            </p>
            <p>
              To move personalization out of the laboratory,{' '}
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Slade et al. (2022)
              </a>{' '}
              trained a <strong>data-driven logistic regression classifier</strong> on approximately 3,600 laboratory walking conditions. Rather than measuring breath-by-breath gas exchange outdoors, the classifier compares pairs of candidate control laws using 64 portable sensor inputs—30 gait-cycle bins of ankle angle, 30 bins of ankle angular velocity, and 4 torque parameters—to estimate which control law lowers metabolic effort.
            </p>
            <p>
              In real-world walking, 90% of bouts last fewer than 100 steps. The Stanford controller handles this fragmentation through <strong>opportunistic optimization</strong>: whenever a user walks at least <strong>44 continuous steps</strong> (discarding the first 6 steps to allow for rapid human motor adaptation), the controller assigns the bout to one of three walking-speed bins (&lt;1.22 m/s, 1.22–1.38 m/s, or &gt;1.38 m/s) and updates an evolutionary optimizer (CMA-ES). Look at what the classifier weights revealed (
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Slade et al., 2022, Extended Data Fig. 1
              </a>
              ):
            </p>
            <ul className="list-disc pl-6 space-y-2 text-slate-300">
              <li>
                <strong>Timing outweighed raw torque magnitude:</strong> Late timing of peak torque (near 54.6% stride) accounted for roughly <strong>60%</strong> of the model&apos;s classification contribution, whereas peak torque magnitude accounted for only about <strong>4%</strong>.
              </li>
              <li>
                <strong>Kinematics encoded metabolic effort:</strong> Ankle angle and velocity terms accounted for <strong>33%</strong> of the classification, favoring larger plantarflexion angles at toe-off (~62% stride) and smooth push-off velocities while penalizing premature push-off near 48% stride. How a person&apos;s limb reacts to torque matters more than simply applying maximum force.
              </li>
            </ul>
            <p>
              When tested on <strong>10 healthy adults</strong> walking for one hour in short, speed-varied bouts along a 566-meter public sidewalk course, Real-world Optimized assistance increased self-selected walking speed by <strong>9 ± 4%</strong> and reduced the metabolic energy cost of transport by <strong>17 ± 5%</strong> compared with walking in normal shoes (and reduced metabolic energy consumption by <strong>23 ± 8%</strong> on a treadmill at 1.5 m/s)—roughly <strong>twice the benefit</strong> of generic speed-adaptive assistance (
              <a
                href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                Slade et al., 2022
              </a>
              ;{' '}
              <a
                href="https://www.nih.gov/news-events/nih-research-matters/robotic-exoskeleton-helps-people-walk"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
              >
                NIH Research Matters, 2022
              </a>
              ).
            </p>
          </div>

          {/* Section 6: Limitations */}
          <div className="space-y-4 pt-4">
            <h3 className="text-xl sm:text-2xl font-bold text-slate-50 tracking-tight">
              6. Scientific, Technical, and Clinical Limitations
            </h3>
            <p>
              Separating verified engineering results from unwarranted extrapolation is essential when evaluating any wearable robot:
            </p>
            <ol className="list-decimal pl-6 space-y-2.5 text-slate-300">
              <li>
                <strong>Prototype Hardware Constraints:</strong> The untethered device in{' '}
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC9556303/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
                >
                  Slade et al. (2022)
                </a>{' '}
                is a research prototype, not a consumer or medical product. Its 0.3 kg battery lasts 36.3 minutes under maximum assistance, its long posterior heel spur requires care when descending stairs to avoid catching steps, and while participants scored usability at <strong>72.5 on the System Usability Scale</strong> (65th percentile) and 6 of 10 preferred it over normal shoes for the course, they were neutral on whether it would be comfortable for all-day wear.
              </li>
              <li>
                <strong>Study Cohort Boundaries:</strong> The outdoor optimization trials tested <em>n</em> = 10 healthy young adults (age 24.2 ± 1.8 years) who already had at least 8 hours of prior experience walking with powered ankle exoskeletons.
              </li>
              <li>
                <strong>Clinical Rehabilitation Complexity:</strong> As{' '}
                <a
                  href="https://pmc.ncbi.nlm.nih.gov/articles/PMC11536595/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-300 underline decoration-cyan-500/50 hover:text-cyan-200"
                >
                  Siviy et al. (2023)
                </a>{' '}
                document across clinical trials for stroke, spinal-cord injury, multiple sclerosis, cerebral palsy, and traumatic brain injury, reducing metabolic cost in unimpaired walkers does not automatically translate into clinical gait recovery. Patients often rely on compensatory gait patterns for stability, exhibit pronounced responder versus non-responder variability, face risks of skin redness or abrasion at strap interfaces (especially when peripheral sensation is impaired), and require fall-safe supervision. Because multicenter randomized controlled trials have shown mixed results against conventional physical therapy, clinical practice guidelines have not yet universally endorsed robotic gait training for chronic stroke, incomplete spinal-cord injury, or traumatic brain injury.
              </li>
              <li>
                <strong>Explanatory Visualization Limits:</strong> In our accompanying interactive explainer and diagrams, anatomical structures, joint-axis offsets, sectional cutaways, and time-normalized waveforms are schematic educational illustrations—not finite-element tissue simulations, clinical fitting guides, or raw patient recordings.
              </li>
            </ol>
            <p className="pt-2 text-slate-100 font-medium">
              Understanding the exoskeleton human–device interface means recognizing that the robot does not end at the motor shaft. The true machine is the coupled biomechanical loop formed by frame geometry, compliant human tissue, high-rate joint sensing, and a nervous system continuously adapting to every step.
            </p>
          </div>
        </article>
      </div>
    </section>
  );
};
