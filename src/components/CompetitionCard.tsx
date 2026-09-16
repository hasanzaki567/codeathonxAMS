import { ArrowRight } from 'lucide-react'
import BorderGlow from './BorderGlow'
import type { Competition } from '../data/competitions'
import { useFlow } from '../flowContext'
import { useRouter } from '../router'

interface CompetitionCardProps {
  competition: Competition
}

export function CompetitionCard({ competition }: CompetitionCardProps) {
  const { openDetail } = useFlow()
  const { navigate } = useRouter()

  return (
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
      className="competition-card group flex cursor-pointer flex-col rounded-2xl border border-line bg-surface p-6 transition-all duration-300 hover:-translate-y-1 hover:border-ink/20 hover:shadow-[0_24px_48px_-24px_rgba(0,0,0,0.18)] sm:p-8"
    >
      <div className="competition-card__header flex items-start justify-between gap-4">
        <div className="competition-card__symbol grid h-12 w-12 place-items-center rounded-xl bg-night font-mono text-base text-accent">
          {competition.symbol}
        </div>
        <span className="competition-card__index font-mono text-xs uppercase tracking-[0.2em] text-soft">{competition.index}</span>
      </div>

      <p className="competition-card__category mt-6 font-mono text-[11px] uppercase tracking-[0.2em] text-accent-ink">
        {competition.category}
      </p>
      <h3 className="competition-card__title mt-2 font-display text-2xl font-bold tracking-tight text-ink sm:text-[1.7rem]">
        {competition.name}
      </h3>

      <div className="competition-card__team-size mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-mist px-3 py-1">
        <span className="font-mono text-[11px] uppercase tracking-[0.12em] text-muted">{competition.teamSize}</span>
      </div>

      <p className="competition-card__tagline mt-4 text-sm font-medium text-ink">{competition.tagline}</p>
      <p className="competition-card__description mt-1.5 text-sm leading-relaxed text-muted">{competition.description}</p>

      {competition.stages && (
        <ul className="competition-card__stages mt-5 space-y-1.5">
          {competition.stages.map((stage) => (
            <li key={stage} className="competition-card__stage flex items-center gap-2 text-sm text-muted">
              <span className="competition-card__stage-dot h-1 w-1 rounded-full bg-accent-ink" />
              {stage}
            </li>
          ))}
        </ul>
      )}

      {competition.domains && (
        <div className="competition-card__domains mt-5 flex flex-wrap gap-1.5">
          {competition.domains.map((tag) => (
            <span
              key={tag}
              className="competition-card__domain rounded-full border border-line px-2.5 py-1 font-mono text-[11px] tracking-wide text-muted"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      <div className="competition-card__footer mt-auto flex items-center justify-between gap-4 pt-8">
        <span className="competition-card__fee font-mono text-sm text-ink">{competition.fee}</span>
        <div className="competition-card__actions flex items-center gap-3">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              navigate('/form')
            }}
            className="competition-card__register rounded-full bg-[linear-gradient(135deg,#02A4FF_0%,#34D9B2_100%)] px-4 py-2 text-sm font-semibold text-night transition-transform duration-200 hover:scale-[1.04] active:scale-[0.97]"
          >
            Register
          </button>
          <span className="competition-card__view inline-flex items-center gap-1.5 text-sm font-medium text-ink">
            View Challenge
            <ArrowRight className="competition-card__view-icon h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
          </span>
        </div>
      </div>
      </div>
    </BorderGlow>
  )
}