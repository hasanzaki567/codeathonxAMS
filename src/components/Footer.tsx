import { Briefcase, Camera, Mail, Phone } from 'lucide-react'
import { EVENT, FOOTER } from '../data/site'
import { useFlow } from '../flowContext'

const SOCIALS: { key: string; label: string; icon: typeof Mail }[] = [
  { key: 'instagram', label: 'Instagram', icon: Camera },
  { key: 'linkedin', label: 'LinkedIn', icon: Briefcase },
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'phone', label: 'Phone', icon: Phone },
]

export function Footer() {
  const { openWizard } = useFlow()

  return (
    <footer className="border-t border-night-line bg-night text-white">
      <div className="wrap py-16">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-display text-2xl font-bold tracking-tight">
              {EVENT.name}
              <span className="ml-2 text-accent">{EVENT.year}</span>
            </p>
            <p className="mt-2 font-display text-sm font-medium tracking-[0.12em] text-white/60">
              {EVENT.tagline}
            </p>
            <ul className="mt-6 flex gap-2.5">
              {SOCIALS.map((social) => (
                <li key={social.key}>
                  <a
                    href="#contact"
                    aria-label={social.label}
                    className="grid h-10 w-10 place-items-center rounded-full border border-night-line text-white/50 transition-colors hover:border-accent hover:text-accent"
                  >
                    <social.icon className="h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Explore</p>
            <ul className="mt-4 space-y-2.5">
              {FOOTER.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <button
                  type="button"
                  onClick={() => openWizard()}
                  className="text-sm text-accent transition-colors hover:text-white"
                >
                  Register
                </button>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Organized by</p>
            <p className="mt-4 text-sm leading-relaxed text-white/70">{FOOTER.college}</p>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-2 border-t border-night-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-white/40">{FOOTER.copyright}</p>
          <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
            {EVENT.tagline}
          </p>
        </div>
      </div>
    </footer>
  )
}