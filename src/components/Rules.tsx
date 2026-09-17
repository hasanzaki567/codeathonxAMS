import { useState } from 'react'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import BorderGlow from './BorderGlow'
import { COMPETITIONS } from '../data/competitions'
import type { CompetitionId } from '../data/competitions'
import { Modal } from './ui/Modal'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'
import { FerrofluidBackground } from './FerrofluidBackground'

export function Rules() {
  const [selected, setSelected] = useState<CompetitionId | null>(null)

  return (
    <section id="rules" className="rules relative overflow-hidden bg-paper py-24 sm:py-32">
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
      <div className="rules__inner wrap relative z-10">
        <Reveal>
          <SectionHeader
            label="06 / RULES"
            heading="Know the rules. Play fair."
            sub="Full rule sets are kept short and readable — open any competition for its complete list."
          />
        </Reveal>

        <div className="rules__grid mt-14 grid gap-4 md:grid-cols-3">
          {COMPETITIONS.map((competition, i) => (
            <Reveal key={competition.id} delay={i * 0.08}>
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
                <button
                  type="button"
                  onClick={() => setSelected(competition.id)}
                  className="rules__card group flex w-full items-center justify-between gap-4 rounded-2xl border border-line bg-surface px-6 py-6 text-left shadow-[0_10px_28px_-20px_rgba(0,0,0,0.18)] transition-all duration-200 hover:-translate-y-0.5 hover:border-ink/20 hover:shadow-[0_16px_32px_-20px_rgba(0,0,0,0.2)]"
                >
                <div className="rules__card-body">
                  <p className="rules__card-category font-mono text-[11px] uppercase tracking-[0.2em] text-accent-ink">
                    {competition.category}
                  </p>
                  <h3 className="rules__card-title mt-1.5 font-display text-lg font-bold tracking-tight text-ink">{competition.name}</h3>
                  <p className="rules__card-count mt-1 text-sm font-medium text-ink/70">{competition.details.rules.length} rules</p>
                </div>
                <span className="rules__card-arrow grid h-10 w-10 shrink-0 place-items-center rounded-full border border-line text-ink transition-transform duration-200 group-hover:translate-x-0.5">
                  <ArrowRight className="rules__card-arrow-icon h-4 w-4" />
                </span>
                </button>
              </BorderGlow>
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
        <div className="rules-modal p-6 sm:p-10">
          <div className="rules-modal__header flex items-center gap-4 pr-10">
            <div className="rules-modal__icon grid h-11 w-11 place-items-center rounded-xl bg-night">
              <ShieldCheck className="rules-modal__icon-svg h-5 w-5 text-accent" />
            </div>
            <div className="rules-modal__title">
              <h3 className="rules-modal__name font-display text-2xl font-bold tracking-tight text-ink">{competition.name}</h3>
              <p className="rules-modal__label font-mono text-[11px] uppercase tracking-[0.2em] text-accent-ink">Rules</p>
            </div>
          </div>

          <div className="rules-modal__list mt-7 space-y-3.5">
            {competition.details.rules.map((rule, i) => (
              <div
                key={rule}
                className="rules-modal__rule flex items-start gap-3.5 rounded-xl border border-line bg-surface px-4 py-3.5"
              >
                <span className="rules-modal__rule-index mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent font-mono text-[11px] font-semibold text-night">
                  {i + 1}
                </span>
                <p className="rules-modal__rule-text text-[15px] leading-relaxed text-ink">{rule}</p>
              </div>
            ))}
          </div>

          <p className="rules-modal__note mt-6 text-sm text-muted">
            The organizing committee reserves the right to interpret and apply these rules. Decisions are final.
          </p>
        </div>
      )}
    </Modal>
  )
}