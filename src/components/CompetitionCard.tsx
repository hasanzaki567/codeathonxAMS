import { ArrowRight } from 'lucide-react'
import { SpotlightCard } from './SpotlightCard'
import type { Competition } from '../data/competitions'
import { useFlow } from '../flowContext'
import { REGISTRATION_URL } from '../data/site'
import { FlipCard } from './FlipCard'

interface CompetitionCardProps {
  competition: Competition
}

export function CompetitionCard({ competition }: CompetitionCardProps) {
  const { openDetail } = useFlow()

  const front = (
    <SpotlightCard
      className="competition-card-front flex h-full flex-col rounded-2xl border border-line bg-surface p-6 sm:p-8"
      spotlightColor="rgba(192, 132, 252, 0.15)"
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

      <div className="mt-auto flex items-center justify-between pt-8">
        <span className="font-mono text-sm text-ink">{competition.fee}</span>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
          Hover to flip
          <ArrowRight className="h-4 w-4" />
        </span>
      </div>
    </SpotlightCard>
  )

  const back = (
    <SpotlightCard
      className="competition-card-back flex h-full flex-col rounded-2xl border border-accent-deep/30 bg-night p-6 sm:p-8"
      spotlightColor="rgba(56, 189, 248, 0.2)"
    >
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-ink">
        {competition.index} / Details
      </p>
      <h3 className="mt-2 font-display text-xl font-bold tracking-tight text-white">
        {competition.name}
      </h3>

      {competition.stages && (
        <div className="mt-5">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-soft">Stages</p>
          <ul className="space-y-1.5">
            {competition.stages.map((stage) => (
              <li key={stage} className="flex items-center gap-2 text-sm text-white/70">
                <span className="h-1 w-1 rounded-full bg-accent" />
                {stage}
              </li>
            ))}
          </ul>
        </div>
      )}

      {competition.domains && (
        <div className="mt-5">
          <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.15em] text-soft">Domains</p>
          <div className="flex flex-wrap gap-1.5">
            {competition.domains.map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-white/10 px-2.5 py-1 font-mono text-[11px] tracking-wide text-white/60"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-4 pt-6">
        <span className="font-mono text-sm text-white">{competition.fee}</span>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              window.open(REGISTRATION_URL, '_blank', 'noopener,noreferrer')
            }}
            className="rounded-full bg-[linear-gradient(135deg,#02A4FF_0%,#34D9B2_100%)] px-4 py-2 text-sm font-semibold text-night transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97]"
          >
            Register
          </button>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              openDetail(competition.id)
            }}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-white"
          >
            View Challenge
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </SpotlightCard>
  )

  return (
    <FlipCard
      front={front}
      back={back}
      className="competition-flip h-[420px]"
    />
  )
}
