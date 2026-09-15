import { motion } from 'framer-motion'
import { EVALUATION } from '../data/competitions'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function Evaluation() {
  return (
    <section id="evaluation" className="bg-surface py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionHeader
            label="07 / EVALUATION"
            heading="How it's judged."
            sub="Each competition is scored on its own weighted criteria — transparency for every participant."
          />
        </Reveal>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {EVALUATION.map((group, gi) => (
            <Reveal key={group.competition} delay={gi * 0.1} className="h-full">
              <div className="flex h-full flex-col rounded-2xl border border-line bg-paper p-6 sm:p-8">
                <div className="flex items-baseline justify-between gap-3 border-b border-line pb-4">
                  <h3 className="font-display text-lg font-bold tracking-tight text-ink">{group.competition}</h3>
                  <span className="font-mono text-[11px] uppercase tracking-[0.14em] text-soft">
                    {group.teamSize}
                  </span>
                </div>
                <ul className="mt-6 flex-1 space-y-4">
                  {group.scoring.map((criterion, ci) => (
                    <ScoreBar key={criterion.label} label={criterion.label} weight={criterion.weight} index={gi * 8 + ci} />
                  ))}
                </ul>
                <p className="mt-7 font-mono text-[11px] uppercase tracking-[0.18em] text-soft">
                  Total 100%
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}

function ScoreBar({ label, weight, index }: { label: string; weight: number; index: number }) {
  return (
    <li>
      <div className="mb-1.5 flex items-center justify-between gap-3">
        <span className="text-sm text-ink">{label}</span>
        <span className="font-mono text-sm text-muted">{weight}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-line" role="img" aria-label={`${label}: ${weight} percent`}>
        <motion.div
          className="h-full origin-left rounded-full bg-accent-deep"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: weight / 100 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.8, delay: index * 0.04, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
    </li>
  )
}