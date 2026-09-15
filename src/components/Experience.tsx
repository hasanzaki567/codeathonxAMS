import { WHY } from '../data/site'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function Experience() {
  return (
    <section id="experience" className="bg-paper py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionHeader label={WHY.label} heading={WHY.heading} />
        </Reveal>

        <div className="mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {WHY.items.map((item, i) => (
            <Reveal key={item.index} delay={i * 0.08} className="h-full">
              <div className="group h-full bg-surface p-7 transition-colors duration-300 hover:bg-accent-tint">
                <span className="font-mono text-sm text-accent-ink">{item.index}</span>
                <h3 className="mt-4 font-display text-lg font-bold tracking-tight text-ink">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}