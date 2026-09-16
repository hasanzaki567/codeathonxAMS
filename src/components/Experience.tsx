import { WHY } from '../data/site'
import BorderGlow from './BorderGlow'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function Experience() {
  return (
    <section id="experience" className="experience bg-paper py-24 sm:py-32">
      <div className="experience__inner wrap">
        <Reveal>
          <SectionHeader label={WHY.label} heading={WHY.heading} />
        </Reveal>

        <div className="experience__grid mt-14 grid gap-px overflow-hidden rounded-2xl border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {WHY.items.map((item, i) => (
            <Reveal key={item.index} delay={i * 0.08} className="experience__item h-full">
              <BorderGlow
                edgeSensitivity={30}
                glowColor="40 80 80"
                backgroundColor="#120F17"
                borderRadius={18}
                glowRadius={40}
                glowIntensity={1}
                coneSpread={25}
                animated={false}
                colors={['#c084fc', '#f472b6', '#38bdf8']}
              >
                <div className="experience__item-inner group h-full bg-surface p-7 transition-colors duration-300 hover:bg-accent-tint">
                  <span className="experience__item-index font-mono text-sm text-accent-ink">{item.index}</span>
                  <h3 className="experience__item-title mt-4 font-display text-lg font-bold tracking-tight text-ink">{item.title}</h3>
                  <p className="experience__item-note mt-2 text-sm leading-relaxed text-muted">{item.note}</p>
                </div>
              </BorderGlow>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}