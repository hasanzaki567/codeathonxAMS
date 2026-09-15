import { ArrowRight, Check } from 'lucide-react'
import type { ReactNode } from 'react'
import { COMPETITION_MAP } from '../data/competitions'
import { useFlow } from '../flowContext'
import { Modal } from './ui/Modal'

function Block({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div>
      <h4 className="font-mono text-[11px] font-medium uppercase tracking-[0.22em] text-soft">{title}</h4>
      <div className="mt-3">{children}</div>
    </div>
  )
}

function Line({ children }: { children: ReactNode }) {
  return (
    <li className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink">
      <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent-ink" />
      <span>{children}</span>
    </li>
  )
}

export function CompetitionDetails() {
  const { detailId, closeDetail, openWizard } = useFlow()
  const competition = detailId ? COMPETITION_MAP[detailId] : null

  return (
    <Modal open={detailId !== null} onClose={closeDetail} wide>
      {competition && (
        <div className="p-6 sm:p-10">
          <div className="flex flex-wrap items-start gap-x-5 gap-y-3 pr-10">
            <div className="grid h-12 w-12 place-items-center rounded-xl bg-night font-mono text-base text-accent">
              {competition.symbol}
            </div>
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-ink">{competition.category}</p>
              <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">
                {competition.name}
              </h3>
            </div>
          </div>
          <p className="mt-5 text-base font-medium text-ink">{competition.tagline}</p>
          <p className="mt-1.5 text-[15px] leading-relaxed text-muted">{competition.description}</p>

          <div className="my-7 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-3">
            <div className="bg-surface p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-soft">Team Size</p>
              <p className="mt-1.5 text-sm font-semibold text-ink">{competition.details.teamSize}</p>
            </div>
            <div className="bg-surface p-4">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-soft">Entry Fee</p>
              <p className="mt-1.5 text-sm font-semibold text-ink">{competition.fee}</p>
            </div>
            <div className="col-span-2 bg-surface p-4 sm:col-span-1">
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-soft">Rounds</p>
              <p className="mt-1.5 text-sm font-semibold text-ink">{competition.stages.length}</p>
            </div>
          </div>

          <div className="space-y-8">
            <Block title="Eligibility">
              <ul className="space-y-2">
                {competition.details.eligibility.map((item) => (
                  <Line key={item}>{item}</Line>
                ))}
              </ul>
            </Block>

            <Block title="Procedure">
              <ol className="space-y-2">
                {competition.details.procedure.map((step, i) => (
                  <li key={step} className="flex items-start gap-2.5 text-[15px] leading-relaxed text-ink">
                    <span className="mt-px grid h-5 w-5 shrink-0 place-items-center rounded-full bg-accent font-mono text-[11px] font-semibold text-night">
                      {i + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </Block>

            <Block title="Rules">
              <ul className="space-y-2">
                {competition.details.rules.map((rule) => (
                  <Line key={rule}>{rule}</Line>
                ))}
              </ul>
            </Block>

            <Block title="Evaluation">
              <p className="max-w-xl text-[15px] leading-relaxed text-muted">{competition.details.evaluationNote}</p>
            </Block>

            {competition.details.suggestedDomains && (
              <Block title="Suggested Domains">
                <div className="flex flex-wrap gap-2">
                  {competition.details.suggestedDomains.map((domain) => (
                    <span
                      key={domain}
                      className="rounded-full border border-line px-3 py-1.5 font-mono text-xs tracking-wide text-ink"
                    >
                      {domain}
                    </span>
                  ))}
                </div>
              </Block>
            )}
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 border-t border-line pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="font-mono text-sm text-muted">{competition.fee}</p>
            <button
              type="button"
              onClick={() => {
                closeDetail()
                openWizard(competition.id)
              }}
              className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
            >
              Register for {competition.name}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      )}
    </Modal>
  )
}