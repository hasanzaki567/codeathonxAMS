import type { ReactNode } from 'react'
import { Mail } from 'lucide-react'
import { TEAM } from '../data/site'
import BorderGlow from './BorderGlow'
import { Reveal } from './ui/Reveal'

type IconComponent = (props: { className?: string }) => ReactNode

interface Socials {
  email?: string
  linkedin?: string
  github?: string
  instagram?: string
}

interface Member {
  name: string
  role: string
  socials: Socials
}

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55v-2.15c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.23-1.28-5.23-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.58.23 2.75.11 3.04.73.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.25 5.67.41.35.78 1.05.78 2.12v3.14c0 .3.21.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  )
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29zM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 3.25.15 4.77 1.69 4.92 4.92.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.15 3.22-1.66 4.77-4.92 4.92-1.27.06-1.64.07-4.85.07s-3.58-.01-4.85-.07c-3.26-.15-4.77-1.7-4.92-4.92-.06-1.27-.07-1.64-.07-4.85s.01-3.58.07-4.85c.15-3.23 1.66-4.77 4.92-4.92C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 2.7.27.27 2.69.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.2 4.36 2.62 6.78 6.98 6.98 1.28.06 1.69.07 4.95.07s3.67-.01 4.95-.07c4.35-.2 6.78-2.62 6.98-6.98.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95C23.73 2.7 21.31.27 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 1 0 0 12.32 6.16 6.16 0 0 0 0-12.32zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.41-11.85a1.44 1.44 0 1 0 0 2.88 1.44 1.44 0 0 0 0-2.88z" />
    </svg>
  )
}

const EmailIcon: IconComponent = ({ className }) => <Mail className={className} />

const SOCIAL_ICONS: { key: keyof Socials; label: string; Icon: IconComponent }[] = [
  { key: 'email', label: 'Email', Icon: EmailIcon },
  { key: 'linkedin', label: 'LinkedIn', Icon: LinkedinIcon },
  { key: 'github', label: 'GitHub', Icon: GithubIcon },
  { key: 'instagram', label: 'Instagram', Icon: InstagramIcon },
]

function initials(name: string) {
  return name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()
}

function TeamCard({ member, wide = false }: { member: Member; wide?: boolean }) {
  return (
    <BorderGlow
      edgeSensitivity={30}
      glowColor="40 80 80"
      backgroundColor="#0d0d0d"
      borderRadius={18}
      glowRadius={40}
      glowIntensity={1}
      coneSpread={25}
      animated={false}
      colors={['#c084fc', '#f472b6', '#38bdf8']}
    >
      <div className="team-card group flex h-full flex-col items-center rounded-2xl border border-neutral-800 bg-[#0d0d0d] p-6 text-center shadow-lg transition-colors duration-300 hover:border-neutral-600 sm:p-8">
      <div className={`relative mb-5 ${wide ? 'sm:h-28 sm:w-28' : ''}`}>
        <div
          className="grid h-24 w-24 place-items-center rounded-full border-2 border-neutral-700 object-cover transition-colors duration-300 group-hover:border-neutral-500"
          aria-hidden="true"
        >
          <span className="font-display text-lg font-bold tracking-tight text-neutral-300">{initials(member.name)}</span>
        </div>
      </div>
      <h3 className="font-display text-base font-bold uppercase tracking-wide text-white">{member.name}</h3>
      <p className="mt-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-neutral-500 sm:text-[11px]">{member.role}</p>
      <div className="mt-5 flex items-center justify-center gap-2.5 border-t border-neutral-800 pt-4">
        {SOCIAL_ICONS.map(({ key, label, Icon }) => {
          const href = member.socials[key]
          if (!href) return null
          return (
            <a
              key={key}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${member.name} on ${label}`}
              className="grid h-8 w-8 place-items-center rounded-full text-neutral-500 transition-colors duration-200 hover:bg-neutral-800 hover:text-white"
            >
              <Icon className="h-3.5 w-3.5" />
            </a>
          )
        })}
      </div>
      </div>
    </BorderGlow>
  )
}

export function Team() {
  return (
    <section id="team" className="team bg-black py-24 text-white sm:py-32">
      <div className="team__inner wrap">
        <Reveal>
          <header className="team__header text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-neutral-500 sm:text-xs">{TEAM.label}</p>
            <h2 className="mt-4 font-display text-3xl font-black uppercase tracking-tight text-white sm:text-4xl md:text-5xl">
              {TEAM.heading}
            </h2>
            <p className="mt-3 text-sm uppercase tracking-[0.18em] text-neutral-500 sm:text-base">{TEAM.sub}</p>
          </header>
        </Reveal>

        <div className="team__lead mx-auto mt-14 max-w-xl">
          <Reveal delay={0.05}>
            <TeamCard member={TEAM.lead} wide />
          </Reveal>
        </div>

        <div className="team__directors mx-auto mt-6 grid max-w-3xl gap-6 sm:grid-cols-2">
          {TEAM.directors.map((member, i) => (
            <Reveal key={member.name} delay={0.1 + i * 0.08}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>

        <div className="team__core mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {TEAM.core.map((member, i) => (
            <Reveal key={member.name} delay={0.16 + i * 0.06}>
              <TeamCard member={member} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}