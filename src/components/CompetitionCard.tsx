import { ArrowRight } from 'lucide-react'
import type { Competition } from '../data/competitions'
import { useFlow } from '../flowContext'

interface CompetitionCardProps {
  competition: Competition
}

export function CompetitionCard({ competition }: CompetitionCardProps) {
  const { openDetail, openWizard } = useFlow()

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={() => openDetail(competition.id)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          openDetail(competition.id)
        }
      }}
      className="group flex cursor-pointer flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)] sm:p-8"
    >
      <div className="flex items-start justify-between gap-4">
        <div className="grid h-12 w-12 place-items-center rounded-xl bg-night font-mono text-base text-accent">
          {competition.symbol}
        </div>
        <span className="font-mono text-xs uppercase tracking-[0.2em] text-soft">{competition.index}</span>
      </div>

      <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-ink">
        {competition.category}
      </p>
      <h3 className="mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.7rem]">
        {competition.name}
      </h3>

      <div className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-mist px-3 py-1">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{competition.teamSize}</span>
      </div>

      <p className="mt-4 text-sm font-medium text-ink">{competition.tagline}</p>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{competition.description}</p>

      {competition.stages && (
        <ul className="mt-5 space-y-1.5">
          {competition.stages.map((stage) => (
            <li key={stage} className="flex items-center gap-2 text-sm text-muted">
              <span className="h-1 w-1 rounded-full bg-accent-ink" />
              {stage}
            </li>
          ))}
        </ul>
      )}

      {competition.domains && (
        <div className="mt-5 flex flex-wrap gap-1.5">
          {competition.domains.map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-line px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-4 pt-8">
        <span className="font-mono text-sm text-ink">{competition.fee}</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              openWizard(competition.id)
            }}
            className="rounded-full bg-accent px-4 py-2 text-sm font-semibold text-night transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97]"
          >
            Register
          </button>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
            View Challenge
            <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
    </div>
  )
}