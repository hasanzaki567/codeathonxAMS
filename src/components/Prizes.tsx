import { Award, ArrowRight, Briefcase, Trophy } from 'lucide-react'
import BorderGlow from './BorderGlow'
import { COMPETITIONS, EVENT_PRIZES } from '../data/competitions'
import type { Competition } from '../data/competitions'
import { PRIZES } from '../data/prizes'
import { FlipCard } from './FlipCard'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'
import { FerrofluidBackground } from './FerrofluidBackground'

export function Prizes() {
  return (
    <section id="prizes" className="prizes relative min-h-screen-dvh overflow-hidden bg-black py-24 text-white sm:py-32">
      <FerrofluidBackground
        colors={['#ffffff', '#f2f2ee', '#e8e8e3']}
        speed={0.5}
        scale={1.6}
        turbulence={1}
        fluidity={0.1}
        rimWidth={0.2}
        sharpness={2.5}
        shimmer={1.5}
        glow={2}
        flowDirection="down"
        opacity={0.35}
        mouseInteraction
        mouseStrength={1}
        mouseRadius={0.35}
      />
      <div className="prizes__inner wrap relative z-10">
        <Reveal>
          <SectionHeader label={PRIZES.label} heading={PRIZES.heading} align="center" dark />
        </Reveal>

        <Reveal delay={0.05}>
          <div className="prizes__pool mx-auto mt-14 flex max-w-3xl flex-col items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-8 py-8 text-center backdrop-blur-sm sm:flex-row sm:justify-between sm:gap-6 sm:text-left">
            <div>
              <p className="prizes__pool-label font-mono text-[11px] uppercase tracking-[0.25em] text-white/50">
                Total Prize Pool
              </p>
              <p className="prizes__pool-amount mt-1.5 font-display text-4xl font-bold tracking-tight text-accent sm:text-5xl">
                ₹25,000
              </p>
            </div>
            <p className="prizes__pool-note max-w-xs text-sm leading-relaxed text-white/60">
              A dedicated prize pool for each event — Crack the Code, HackQuest &amp; TechForge. Every competition shares the same rewards.
            </p>
          </div>
        </Reveal>

        <div className="prizes__events mt-10 grid gap-6 md:grid-cols-3">
          {COMPETITIONS.map((competition, i) => (
            <Reveal key={competition.id} delay={i * 0.1}>
              <EventPrizeCard competition={competition} />
            </Reveal>
          ))}
        </div>

        <div className="prizes__perks mx-auto mt-8 grid max-w-3xl gap-5 sm:grid-cols-2">
          <Reveal delay={0.05}>
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
              <div className="prizes__perk flex items-start gap-4 rounded-2xl border border-line bg-surface p-6">
                <div className="prizes__perk-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-tint">
                  <Award className="prizes__perk-icon-svg h-5 w-5 text-accent-ink" />
                </div>
                <div className="prizes__perk-body">
                  <h3 className="prizes__perk-title font-display text-base font-bold tracking-tight text-ink">{PRIZES.perks[0].title}</h3>
                  <p className="prizes__perk-note mt-1 text-sm text-muted">{PRIZES.perks[0].note}</p>
                </div>
              </div>
            </BorderGlow>
          </Reveal>
          <Reveal delay={0.12}>
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
              <div className="prizes__perk flex items-start gap-4 rounded-2xl border border-line bg-surface p-6">
                <div className="prizes__perk-icon grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent-tint">
                  <Briefcase className="prizes__perk-icon-svg h-5 w-5 text-accent-ink" />
                </div>
                <div className="prizes__perk-body">
                  <h3 className="prizes__perk-title font-display text-base font-bold tracking-tight text-ink">{PRIZES.perks[1].title}</h3>
                  <p className="prizes__perk-note mt-1 text-sm text-muted">{PRIZES.perks[1].note}</p>
                </div>
              </div>
            </BorderGlow>
          </Reveal>
        </div>

        <Reveal delay={0.1}>
          <div className="prizes__special mt-14 flex flex-col items-center gap-5">
            <p className="prizes__special-label font-mono text-[11px] uppercase tracking-[0.25em] text-soft">Special Recognitions</p>
            <ul className="prizes__special-list flex flex-wrap justify-center gap-2.5">
              {PRIZES.badges.map((badge) => (
                <li
                  key={badge}
                  className="prizes__badge rounded-full border border-line bg-surface px-4 py-2 text-sm font-medium text-ink transition-colors duration-200 hover:border-accent-ink/40 hover:text-accent-ink"
                >
                  {badge}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

function EventPrizeCard({ competition }: { competition: Competition }) {
  const front = (
    <div className="prize-event__front flex h-full w-full flex-col rounded-[18px] border border-white/10 bg-[linear-gradient(165deg,#16131f,#0e0c13)] p-6 sm:p-7">
      <div className="flex items-start justify-between gap-4">
        <div className="min-w-0">
          <span className="prize-event__index inline-grid h-8 w-8 place-items-center rounded-full border border-accent/30 bg-accent/10 font-mono text-xs font-semibold text-accent">
            {competition.index}
          </span>
          <p className="prize-event__category mt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-white/40">{competition.category}</p>
          <h3 className="prize-event__name mt-1.5 font-display text-2xl font-bold tracking-tight text-white">{competition.name}</h3>
          <p className="prize-event__tagline mt-1 text-sm text-white/55">{competition.tagline}</p>
        </div>
      </div>
      <div className="my-auto" />
      <button
        type="button"
        className="prize-event__btn mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#02A4FF_0%,#34D9B2_100%)] px-6 py-3.5 text-sm font-semibold text-night transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
      >
        Check Prize Pool
        <ArrowRight className="h-4 w-4" />
      </button>
    </div>
  )

  const back = (
    <div className="prize-event__back flex h-full w-full flex-col rounded-[18px] border border-accent/25 bg-[linear-gradient(150deg,rgba(2,164,255,0.12),rgba(52,217,178,0.10))] p-6 sm:p-7">
      <div className="flex items-center justify-between gap-3">
        <p className="prize-event__back-label flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          <Trophy className="h-4 w-4" />
          Prizes — {competition.name}
        </p>
      </div>
      <div className="prize-event__list mt-6 flex-1 space-y-3">
        {EVENT_PRIZES.map((prize) => (
          <div key={prize.place} className="prize-event__row rounded-xl border border-white/10 bg-black/25 px-4 py-3">
            <div className="flex items-baseline justify-between gap-3">
              <span className="text-sm font-medium text-white/85">{prize.place}</span>
              <span className="font-mono text-base font-semibold text-accent">{prize.amount}</span>
            </div>
            <p className="mt-1 text-xs leading-snug text-white/45">{prize.note}</p>
          </div>
        ))}
      </div>
      <p className="prize-event__back-hint mt-6 text-center font-mono text-[10px] uppercase tracking-[0.2em] text-white/35">
        Tap to go back
      </p>
    </div>
  )

  return (
    <FlipCard
      front={front}
      back={back}
      flipOnHover={false}
      className="prize-event h-[420px]"
    />
  )
}