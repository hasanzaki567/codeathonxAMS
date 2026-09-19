import { Briefcase, Camera, Mail, Phone } from 'lucide-react'
import { EVENT, FOOTER, REGISTRATION_URL } from '../data/site'
import { FerrofluidBackground } from './FerrofluidBackground'

const SOCIALS: { key: string; label: string; icon: typeof Mail }[] = [
  { key: 'instagram', label: 'Instagram', icon: Camera },
  { key: 'linkedin', label: 'LinkedIn', icon: Briefcase },
  { key: 'email', label: 'Email', icon: Mail },
  { key: 'phone', label: 'Phone', icon: Phone },
]

export function Footer() {
  return (
    <footer className="footer relative overflow-hidden border-t border-night-line bg-night text-white">
      <FerrofluidBackground
        colors={['#02A4FF', '#34D9B2', '#02A4FF']}
        speed={0.5}
        scale={1.6}
        turbulence={1}
        fluidity={0.1}
        rimWidth={0.2}
        sharpness={2.5}
        shimmer={1.5}
        glow={2}
        flowDirection="down"
        opacity={0.25}
        mouseInteraction={false}
      />
      <div className="footer__inner wrap relative z-10 py-16">
        <div className="footer__grid grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="footer__brand">
            <p className="footer__brand-name font-display text-2xl font-bold tracking-tight">
              {EVENT.name}
              <span className="footer__brand-year ml-2 text-accent">{EVENT.year}</span>
            </p>
            <p className="footer__tagline mt-2 font-display text-sm font-medium tracking-[0.12em] text-white/60">
              {EVENT.tagline}
            </p>
            <ul className="footer__socials mt-6 flex gap-2.5">
              {SOCIALS.map((social) => (
                <li key={social.key} className="footer__social">
                  <a
                    href="#contact"
                    aria-label={social.label}
                    className="footer__social-link grid h-10 w-10 place-items-center rounded-full border border-night-line text-white/50 transition-colors hover:border-accent hover:text-accent"
                  >
                    <social.icon className="footer__social-icon h-4 w-4" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <nav aria-label="Footer" className="footer__nav">
            <p className="footer__nav-label font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Explore</p>
            <ul className="footer__nav-list mt-4 space-y-2.5">
              {FOOTER.links.map((link) => (
                <li key={link.href} className="footer__nav-item">
                  <a href={link.href} className="footer__nav-link text-sm text-white/70 transition-colors hover:text-white">
                    {link.label}
                  </a>
                </li>
              ))}
              <li className="footer__nav-item">
                <button
                  type="button"
                  onClick={() => window.open(REGISTRATION_URL, '_blank', 'noopener,noreferrer')}
                  className="footer__register text-sm text-accent transition-colors hover:text-white"
                >
                  Register
                </button>
              </li>
            </ul>
          </nav>

          <div className="footer__org">
            <p className="footer__org-label font-mono text-[11px] uppercase tracking-[0.2em] text-white/40">Organized by</p>
            <p className="footer__college mt-4 text-sm leading-relaxed text-white/70">{FOOTER.college}</p>
          </div>
        </div>

        <div className="footer__bottom mt-14 flex flex-col gap-2 border-t border-night-line pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="footer__bottom-left flex flex-col gap-2 sm:items-start">
            <p className="footer__copyright text-xs text-white/40">{FOOTER.copyright}</p>
            <a
              href="https://www.linkedin.com/in/hasan-zaki-9083b2344/"
              target="_blank"
              rel="noopener noreferrer"
              className="footer__credit text-xs text-white/40 transition-colors hover:text-white/70"
            >
              Designed and developed by HASAN ZAKI
            </a>
          </div>
          <p className="footer__bottom-tagline font-mono text-[11px] uppercase tracking-[0.18em] text-white/30">
            {EVENT.tagline}
          </p>
        </div>
      </div>
    </footer>
  )
}