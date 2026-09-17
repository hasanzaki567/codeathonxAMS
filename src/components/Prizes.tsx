import { Award, Briefcase } from 'lucide-react'
import BorderGlow from './BorderGlow'
import { PRIZES } from '../data/prizes'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'
import { FerrofluidBackground } from './FerrofluidBackground'

export function Prizes() {
  const [first, second, third] = PRIZES.podium

  return (
    <section id="prizes" className="prizes relative overflow-hidden bg-mist py-24 sm:py-32">
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
          <SectionHeader label={PRIZES.label} heading={PRIZES.heading} align="center" />
        </Reveal>

        <div className="prizes__podium mt-16 grid items-end gap-5 md:grid-cols-3">
          <Reveal delay={0.1}>
            <PodiumCard place={second.place} amount={second.amount} note={second.note} rank="2" />
          </Reveal>
          <Reveal delay={0}>
            <PodiumCard place={first.place} amount={first.amount} note={first.note} rank="1" featured />
          </Reveal>
          <Reveal delay={0.2}>
            <PodiumCard place={third.place} amount={third.amount} note={third.note} rank="3" />
          </Reveal>
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

interface PodiumCardProps {
  place: string
  amount: string
  note: string
  rank: string
  featured?: boolean
}

function PodiumCard({ place, amount, note, rank, featured }: PodiumCardProps) {
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
      className={featured ? 'md:-translate-y-12' : ''}
    >
      <div
        className={`prizes__card relative flex h-full flex-col rounded-2xl border p-7 text-center transition-transform duration-300 hover:-translate-y-1 ${
        featured
          ? 'prizes__card--featured border-[#d4af37] bg-night text-white shadow-[0_24px_48px_-24px_rgba(212,175,55,0.45)]'
          : 'prizes__card--regular border-line bg-surface text-ink'
      }`}
    >
      <span
        className={`prizes__card-accent absolute left-1/2 top-0 h-1.5 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full ${
          featured ? 'bg-[#d4af37]' : 'bg-line'
        }`}
      />
      <span
        className={`prizes__card-rank mx-auto grid h-10 w-10 place-items-center rounded-full font-mono text-sm font-semibold ${
          featured ? 'bg-[#d4af37] text-night' : 'bg-mist text-muted'
        }`}
      >
        {rank}
      </span>
      <h3 className={`prizes__card-place mt-4 font-display text-lg font-bold tracking-tight ${featured ? 'text-white' : 'text-ink'}`}>
        {place}
      </h3>
      <p className={`prizes__card-amount mt-2 font-display text-4xl font-bold tracking-tight sm:text-5xl ${featured ? 'text-accent' : 'text-ink'}`}>
        {amount}
      </p>
      <p className={`prizes__card-note mt-4 text-xs text-muted ${featured ? 'text-white/50' : ''}`}>{note}</p>
      </div>
    </BorderGlow>
  )
}