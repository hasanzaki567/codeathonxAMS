import { motion } from 'framer-motion'
import { TIMELINE } from '../data/timeline'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'
import { FerrofluidBackground } from './FerrofluidBackground'

export function Timeline() {
  const confirmedIndex = TIMELINE.findIndex((item) => item.state === 'confirmed')

  return (
    <section id="timeline" className="timeline relative overflow-hidden bg-black py-24 text-white sm:py-32">
      <FerrofluidBackground
        colors={['#02A4FF', '#34D9B2', '#02A4FF']}
        speed={0.5}
        scale={1.6}
        turbulence={1}
        fluidity={0.1}
        rimWidth={0.2}
        sharpness={2.5}
        shimmer={1.5}
        glow={2}
        flowDirection="down"
        opacity={0.3}
        mouseInteraction
        mouseStrength={1}
        mouseRadius={0.35}
      />
      <div className="timeline__inner wrap relative z-10">
        <Reveal>
          <SectionHeader
            label="04 / TIMELINE"
            heading="The journey."
            sub="Registration dates are confirmed by the organizers — placeholders are marked clearly below."
            dark
          />
        </Reveal>

        <div className="timeline__body mt-20">
          <Reveal>
            <div className="timeline__track relative hidden items-start lg:flex">
              <motion.div
                className="timeline__line absolute top-4 h-px bg-white/20"
                style={{ left: 0, right: 0 }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="timeline__line-progress absolute top-4 h-px origin-left bg-accent"
                style={{ left: 0, right: `${100 - ((confirmedIndex + 1) / TIMELINE.length) * 100}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              {TIMELINE.map((item, i) => (
                <div key={item.key} className="timeline__item group flex-1 pr-8">
                  <div className="timeline__item-header flex items-center gap-3">
                    <span
                      className={`timeline__item-dot relative z-10 grid h-8 w-8 place-items-center rounded-full border font-mono text-[10px] transition-colors ${
                        item.state === 'confirmed'
                          ? 'border-accent bg-accent font-semibold text-night'
                          : 'border-white/25 bg-transparent text-white/50 group-hover:border-accent/60 group-hover:text-accent'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`timeline__item-date font-mono text-xs uppercase tracking-[0.15em] ${
                        item.state === 'confirmed' ? 'text-accent' : 'text-white/40'
                      }`}
                    >
                      {item.date}
                    </span>
                  </div>
                  <div className="timeline__item-body mt-4">
                    <h3
                      className={`timeline__item-title font-display text-base font-bold tracking-tight ${
                        item.state === 'confirmed' ? 'text-white' : 'text-white/75'
                      }`}
                    >
                      {item.label}
                      {item.state === 'confirmed' && <span className="timeline__item-status ml-2 text-accent align-middle text-xs">●</span>}
                    </h3>
                    <p className="timeline__item-note mt-1 text-sm text-white/60">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <ol className="timeline__mobile relative space-y-8 border-l border-white/20 pl-6 lg:hidden">
              {TIMELINE.map((item, i) => (
                <li key={item.key} className="timeline__mobile-item relative">
                  <span
                    className={`timeline__mobile-dot absolute -left-6 top-1.5 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border ${
                      item.state === 'confirmed'
                        ? 'border-accent bg-accent'
                        : 'border-white/25 bg-transparent'
                    }`}
                  />
                  <div className="timeline__mobile-header flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      className={`timeline__mobile-date font-mono text-xs uppercase tracking-[0.15em] ${
                        item.state === 'confirmed' ? 'text-accent' : 'text-white/40'
                      }`}
                    >
                      {item.date}
                    </span>
                    <span className="timeline__mobile-step font-mono text-[11px] text-white/40">STEP {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="timeline__mobile-title mt-1 font-display text-lg font-bold tracking-tight text-white">{item.label}</h3>
                  <p className="timeline__mobile-note mt-1 text-sm text-white/60">{item.note}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}