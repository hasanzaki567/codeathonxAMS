import { STATS } from '../data/site'
import { Reveal } from './ui/Reveal'

export function Stats() {
  return (
    <section className="border-y border-line bg-surface" aria-label="Event statistics">
      <div className="wrap grid grid-cols-2 divide-x divide-line md:grid-cols-4">
        {STATS.map((stat, i) => (
          <Reveal key={stat.label} delay={i * 0.08} y={16}>
            <div className="flex flex-col items-center gap-1.5 py-10 sm:py-12">
              <span className="font-display text-4xl font-bold tracking-tight text-ink sm:text-5xl">
                {stat.value}
              </span>
              <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-muted sm:text-xs">
                {stat.label}
              </span>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}