import { useEffect } from 'react'
import { ArrowLeft } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { EVENT, REGISTRATION_URL } from '../data/site'
import { Link } from '../router'
import { FerrofluidBackground } from '../components/FerrofluidBackground'

export function FormPage() {
  useEffect(() => {
    window.open(REGISTRATION_URL, '_blank', 'noopener,noreferrer')
  }, [])

  return (
    <div className="form-page min-h-screen-dvh bg-paper text-ink">
      <Navbar solidAtTop />
      <main id="main" className="page-main">
        <section className="form-hero relative overflow-hidden bg-night py-20 text-white sm:py-24">
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
            opacity={0.5}
            mouseInteraction
            mouseStrength={1}
            mouseRadius={0.35}
          />
          <div
            className="pointer-events-none absolute inset-0 z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(0,224,124,0.12),transparent_60%)]"
            aria-hidden="true"
          />
          <div className="form-hero__inner wrap relative z-10">
            <Link
              to="/"
              className="form-hero__back inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-white/50 transition-colors hover:text-accent"
            >
              <ArrowLeft className="form-hero__back-icon h-4 w-4" />
              Back to home
            </Link>
            <h1 className="form-hero__title mt-8 font-display text-5xl font-bold tracking-tight sm:text-6xl">
              Register<span className="text-accent">.</span>
            </h1>
            <p className="form-hero__sub mt-3 max-w-md text-base text-white/60 sm:text-lg">
              Pick your challenge. Build your team. Register for {EVENT.name}.
            </p>
          </div>
        </section>

        <section className="form-body relative z-10">
          <div className="form-body__wrap wrap pb-24 sm:pb-32">
            <div className="form-body__card -mt-14 overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_32px_80px_-40px_rgba(0,0,0,0.25)] p-10 sm:p-16 text-center">
              <p className="form-body__note text-lg text-muted">
                Registration is handled via Google Forms.
              </p>
              <p className="form-body__note mt-2 text-sm text-soft">
                Redirecting you to the registration form…
              </p>
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noreferrer"
                className="form-body__link mt-6 inline-block rounded-full bg-[linear-gradient(135deg,#02A4FF_0%,#34D9B2_100%)] px-8 py-4 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                Open Registration Form
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
