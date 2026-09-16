import { ArrowRight, Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { COMPETITION_MAP } from '../data/competitions'
import { useFlow } from '../flowContext'
import { REGISTRATION_URL } from '../data/site'
import { Modal } from './ui/Modal'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="details__block">
      <h4 className="details__block-title font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-soft">{title}</h4>
      <div className="details__block-content mt-3">{children}</div>
    </div>
  )
}

function Line({ children }: { children: ReactNode }) {
  return (
    <li className="details__line flex items-start gap-2.5 text-[15px] leading-relaxed text-ink">
      <Check className="details__line-icon mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
      <span className="details__line-text">{children}</span>
    </li>
  )
}

export function CompetitionDetails() {
  const { detailId, closeDetail } = useFlow()
  const competition = detailId ? COMPETITION_MAP[detailId] : null

  return (
    <Modal open={detailId !== null} onClose={closeDetail} wide>
      {competition && (
        <div className="details p-6 sm:p-10">
          <div className="details__header flex flex-wrap items-start gap-x-5 gap-y-3 pr-10">
            <div className="details__symbol grid h-12 w-12 place-items-center rounded-xl bg-night font-mono text-base text-accent">
              {competition.symbol}
            </div>
            <div className="details__title">
              <p className="details__category font-mono text-[11px] uppercase tracking-[0.2em] text-accent-ink">{competition.category}</p>
              <h3 className="details__name font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {competition.name}
              </h3>
            </div>
          </div>
          <p className="details__tagline mt-5 text-base font-medium text-ink">{competition.tagline}</p>
          <p className="details__description mt-1.5 text-[15px] leading-relaxed text-muted">{competition.description}</p>

          <div className="details__meta my-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            <div className="details__meta-cell bg-surface p-4">
              <p className="details__meta-label font-mono text-[10px] uppercase tracking-[0.18em] text-soft">Team Size</p>
              <p className="details__meta-value mt-1.5 text-sm font-semibold text-ink">{competition.details.teamSize}</p>
            </div>
            <div className="details__meta-cell bg-surface p-4">
              <p className="details__meta-label font-mono text-[10px] uppercase tracking-[0.18em] text-soft">Entry Fee</p>
              <p className="details__meta-value mt-1.5 text-sm font-semibold text-ink">{competition.fee}</p>
            </div>
            <div className="details__meta-cell col-span-2 bg-surface p-4 sm:col-span-1">
              <p className="details__meta-label font-mono text-[10px] uppercase tracking-[0.18em] text-soft">Rounds</p>
              <p className="details__meta-value mt-1.5 text-sm font-semibold text-ink">{competition.stages.length}</p>
            </div>
          </div>

          <div className="details__body space-y-8">
            <Block title="Eligibility">
              <ul className="details__list space-y-2">
                {competition.details.eligibility.map((item) => (
                  <Line key={item}>{item}</Line>
                ))}
              </ul>
            </Block>

            <Block title="Procedure">
              <ol className="details__steps space-y-2">
                {competition.details.procedure.map((step, i) => (
                  <li key={step} className="details__step flex items-start gap-2.5 text-[15px] leading-relaxed text-ink">
                    <span className="details__step-index mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent font-mono text-[11px] font-semibold text-night">
                      {i + 1}
                    </span>
                    <span className="details__step-text">{step}</span>
                  </li>
                ))}
              </ol>
            </Block>

            <Block title="Rules">
              <ul className="details__list space-y-2">
                {competition.details.rules.map((rule) => (
                  <Line key={rule}>{rule}</Line>
                ))}
              </ul>
            </Block>

            <Block title="Evaluation">
              <p className="details__evaluation-note max-w-xl text-[15px] leading-relaxed text-muted">{competition.details.evaluationNote}</p>
            </Block>

            {competition.details.suggestedDomains && (
              <Block title="Suggested Domains">
                <div className="details__domains flex flex-wrap gap-2">
                  {competition.details.suggestedDomains.map((domain) => (
                    <span
                      key={domain}
                      className="details__domain rounded-full border border-line px-3 py-1.5 font-mono text-xs tracking-wide text-ink"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </Block>
            )}
          </div>

          <div className="details__footer mt-10 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="details__fee font-mono text-sm text-muted">{competition.fee}</p>
            <button
              type="button"
              onClick={() => {
                closeDetail()
                window.open(REGISTRATION_URL, '_blank', 'noopener,noreferrer')
              }}
              className="details__register inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#02A4FF_0%,#34D9B2_100%)] px-7 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Register for {competition.name}
              <ArrowRight className="details__register-icon h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}