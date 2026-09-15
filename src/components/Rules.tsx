import { useState } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { COMPETITIONS } from '../data/competitions'
import type { CompetitionId } from '../data/competitions'
import { Modal } from './ui/Modal'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function Rules() {
  const [selected, setSelected] = useState<CompetitionId | null>(null)

  return (
    <section id="rules" className="bg-paper py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionHeader
            label="06 / RULES"
            heading="Know the rules. Play fair."
            sub="Full rule sets are kept short and readable — open any competition for its complete list."
          />
        </Reveal>

        <div className="mt-14 grid gap-4 md:grid-cols-3">
          {COMPETITIONS.map((competition, i) => (
            <Reveal key={competition.id} delay={i * 0.08}>
              <button
                type="button"
                onClick={() => setSelected(competition.id)}
                className="group flex w-full items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-6 py-6 text-left transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_16px_32px_-20px_rgba(0,0,0,0.2)]"
              >
                <div>
                  <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-ink">
                    {competition.category}
                  </p>
                  <h3 className="mt-1.5 font-display text-lg font-bold tracking-tight text-ink">{competition.name}</h3>
                  <p className="mt-1 text-sm font-medium text-ink/70">{competition.details.rules.length} rules</p>
                </div>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="h-4 w-4" />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>

      <RulesModal selected={selected} onClose={() => setSelected(null)} />
    </section>
  )
}

function RulesModal({ selected, onClose }: { selected: CompetitionId | null; onClose: () => void }) {
  const competition = selected ? COMPETITIONS.find((c) => c.id === selected) : null

  return (
    <Modal open={selected !== null} onClose={onClose}>
      {competition && (
        <div className="p-6 sm:p-10">
          <div className="flex items-center gap-4 pr-10">
            <div className="grid h-11 w-11 place-items-center rounded-xl bg-night">
              <ShieldCheck className="h-5 w-5 text-accent" />
            </div>
            <div>
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink">{competition.name}</h3>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-ink">Rules</p>
            </div>
          </div>

          <div className="mt-7 space-y-3.5">
            {competition.details.rules.map((rule, i) => (
              <div
                key={rule}
                className="flex items-start gap-3.5 rounded-xl border border-line bg-surface px-4 py-3.5"
              >
                <span className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent font-mono text-[11px] font-semibold text-night">
                  {i + 1}
                </span>
                <p className="text-[15px] leading-relaxed text-ink">{rule}</p>
              </div>
            ))}
          </div>

          <p className="mt-6 text-sm text-muted">
            The organizing committee reserves the right to interpret and apply these rules. Decisions are final.
          </p>
        </div>
      )}
    </Modal>
  )
}