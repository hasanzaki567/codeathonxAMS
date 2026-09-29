import { ArrowLeft, CheckCircle2 } from 'lucide-react'
import { Navbar } from '../components/Navbar'
import { Footer } from '../components/Footer'
import { FerrofluidBackground } from '../components/FerrofluidBackground'
import { CONTACT, EVENT } from '../data/site'
import { Link } from '../router'

export function RegistrationClosed() {
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
          <div className="form-hero__inner wrap relative z-10 text-center">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-white/45">
              {EVENT.name} {EVENT.year}
            </p>
            <div className="mx-auto mt-8 grid h-16 w-16 place-items-center rounded-full border border-white/20 bg-white/5">
              <CheckCircle2 className="h-7 w-7 text-accent" />
            </div>
            <h1 className="form-hero__title mt-6 font-display text-4xl font-bold tracking-tight sm:text-6xl">
              Registration Closed<span className="text-accent">.</span>
            </h1>
            <p className="form-hero__sub mx-auto mt-4 max-w-lg text-base text-white/60 sm:text-lg">
              Registrations for {EVENT.name} are now closed. Thank you for your interest — see you at
              the event.
            </p>
          </div>
        </section>

        <section className="form-body relative z-10">
          <div className="form-body__wrap wrap pb-24 sm:pb-32">
            <div className="form-body__card -mt-14 overflow-hidden rounded-3xl border border-line bg-surface shadow-[0_32px_80px_-40px_rgba(0,0,0,0.25)] p-10 text-center sm:p-16">
              <p className="form-body__note text-lg text-muted">
                Already registered? Watch this space for further announcements.
              </p>
              <p className="form-body__note mt-2 text-sm text-soft">
                {EVENT.dateLong} · {EVENT.location}
              </p>
              <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-5">
                <Link
                  to="/"
                  className="inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#02A4FF_0%,#34D9B2_100%)] px-8 py-4 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
                >
                  <ArrowLeft className="h-4 w-4" />
                  Back to home
                </Link>
                <a
                  href={`mailto:${CONTACT.channels.find((c) => c.key === 'email')?.value}`}
                  className="inline-flex items-center gap-2 rounded-full border border-line px-8 py-4 text-base font-medium text-ink transition-colors duration-200 hover:border-ink/40 hover:bg-mist"
                >
                  Contact the team
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}
