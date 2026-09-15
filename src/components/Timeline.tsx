import { motion } from 'framer-motion'
import { TIMELINE } from '../data/timeline'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function Timeline() {
  const confirmedIndex = TIMELINE.findIndex((item) => item.state === 'confirmed')

  return (
    <section id="timeline" className="bg-surface py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionHeader
            label="04 / TIMELINE"
            heading="The journey."
            sub="Registration dates are confirmed by the organizers — placeholders are marked clearly below."
          />
        </Reveal>

        <div className="mt-20">
          <Reveal>
            <div className="relative hidden items-start lg:flex">
              <motion.div
                className="absolute top-4 h-px bg-line"
                style={{ left: 0, right: 0 }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.div
                className="absolute top-4 h-px origin-left bg-accent"
                style={{ left: 0, right: `${100 - ((confirmedIndex + 1) / TIMELINE.length) * 100}%` }}
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              {TIMELINE.map((item, i) => (
                <div key={item.key} className="group flex-1 pr-8">
                  <div className="flex items-center gap-3">
                    <span
                      className={`relative z-10 grid h-8 w-8 place-items-center rounded-full border font-mono text-[10px] transition-colors ${
                        item.state === 'confirmed'
                          ? 'border-accent bg-accent font-semibold text-night'
                          : 'border-line bg-surface text-muted group-hover:border-accent-ink/50 group-hover:text-accent-ink'
                      }`}
                    >
                      {i + 1}
                    </span>
                    <span
                      className={`font-mono text-xs uppercase tracking-[0.15em] ${
                        item.state === 'confirmed' ? 'text-accent-ink' : 'text-soft'
                      }`}
                    >
                      {item.date}
                    </span>
                  </div>
                  <div className="mt-4">
                    <h3
                      className={`font-display text-base font-bold tracking-tight ${
                        item.state === 'confirmed' ? 'text-ink' : 'text-ink/70'
                      }`}
                    >
                      {item.label}
                      {item.state === 'confirmed' && <span className="ml-2 align-middle text-xs">●</span>}
                    </h3>
                    <p className="mt-1 text-sm text-muted">{item.note}</p>
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal>
            <ol className="relative space-y-8 border-l border-line pl-6 lg:hidden">
              {TIMELINE.map((item, i) => (
                <li key={item.key} className="relative">
                  <span
                    className={`absolute -left-6 top-1.5 grid h-4 w-4 -translate-x-1/2 place-items-center rounded-full border ${
                      item.state === 'confirmed'
                        ? 'border-accent bg-accent'
                        : 'border-line bg-surface'
                    }`}
                  />
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                    <span
                      className={`font-mono text-xs uppercase tracking-[0.15em] ${
                        item.state === 'confirmed' ? 'text-accent-ink' : 'text-soft'
                      }`}
                    >
                      {item.date}
                    </span>
                    <span className="font-mono text-[11px] text-soft">STEP {String(i + 1).padStart(2, '0')}</span>
                  </div>
                  <h3 className="mt-1 font-display text-lg font-bold tracking-tight text-ink">{item.label}</h3>
                  <p className="mt-1 text-sm text-muted">{item.note}</p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  )
}