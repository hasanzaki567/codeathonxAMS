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
    <div className="competition-card-front group relative h-full w-full overflow-hidden rounded-2xl border border-line">
      <img
        src={competition.image}
        alt={competition.name}
        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-night/90 via-night/20 to-transparent" />
      <span className="absolute right-4 top-4 rounded-full border border-white/15 bg-night/50 px-2.5 py-1 font-mono text-xs tracking-[0.2em] text-white/80 backdrop-blur-sm">
        {competition.index}
      </span>
      <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent-ink">
          {competition.category}
        </p>
        <h3 className="mt-1.5 font-display text-2xl font-bold tracking-tight text-white sm:text-[1.7rem]">
          {competition.name}
        </h3>
        <p className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-[0.15em] text-white/70">
          Flip for details
          <ArrowRight className="h-3.5 w-3.5" />
        </p>
      </div>
    </div>
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
      <p className="mt-1 text-sm font-medium text-white/80">{competition.tagline}</p>

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
