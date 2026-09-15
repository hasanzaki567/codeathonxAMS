import { ABOUT } from '../data/site'
import { Reveal } from './ui/Reveal'

const SYMBOLS = ['{ }', '>>_', '◇▱']

export function About() {
  return (
    <section id="about" className="sticky top-0 z-20 flex min-h-[100dvh] flex-col justify-center bg-paper py-16 sm:py-24">
      <div className="wrap grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal>
          <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink">
            {ABOUT.label}
          </p>
          <h2 className="mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl text-balance">
            {ABOUT.heading}
          </h2>
          <p className="mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">{ABOUT.description}</p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="relative mx-auto aspect-[5/4] w-full max-w-md overflow-hidden rounded-2xl border border-line bg-surface">
            <div
              className="absolute inset-0 bg-[radial-gradient(circle,var(--color-line)_1px,transparent_1px)] bg-[size:22px_22px] opacity-60"
              aria-hidden="true"
            />
            <svg
              viewBox="0 0 492 392"
              className="absolute inset-0 h-full w-full"
              role="img"
              aria-label="Abstract geometry representing the three competitions"
            >
              <circle cx="246" cy="196" r="154" fill="none" stroke="var(--color-line)" strokeWidth="1" />
              <path
                d="M246 66 L370 282 L122 282 Z"
                fill="none"
                stroke="var(--color-ink)"
                strokeWidth="1.5"
                opacity="0.55"
              />
              <rect
                x="146"
                y="96"
                width="200"
                height="200"
                transform="rotate(45 246 196)"
                fill="none"
                stroke="var(--color-accent-deep)"
                strokeWidth="1.5"
              />
              <circle cx="246" cy="196" r="6" fill="var(--color-accent-deep)" />
            </svg>
            <div className="absolute inset-x-0 bottom-5 flex justify-center gap-4">
              {SYMBOLS.map((glyph) => (
                <span
                  key={glyph}
                  className="rounded-lg border border-line bg-surface/90 px-3 py-1.5 font-mono text-sm text-ink shadow-sm"
                >
                  {glyph}
                </span>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}