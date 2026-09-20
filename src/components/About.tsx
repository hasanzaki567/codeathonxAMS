import { ABOUT } from '../data/site'
import collegeImg from '../assets/college.jpeg'
import BorderGlow from './BorderGlow'
import { Reveal } from './ui/Reveal'
import { FerrofluidBackground } from './FerrofluidBackground'

export function About() {
  return (
    <section id="about" className="about sticky top-0 z-20 flex min-h-screen-svh flex-col justify-center bg-paper py-16 sm:py-24">
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
        opacity={0.45}
        mouseInteraction
        mouseStrength={1}
        mouseRadius={0.35}
      />
      <div className="about__grid wrap relative z-10 grid items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal className="about__copy">
          <p className="about__label font-mono text-[11px] sm:text-xs uppercase tracking-[0.25em] text-accent-ink">
            {ABOUT.label}
          </p>
          <h2 className="about__heading mt-4 font-display text-3xl font-bold tracking-tight text-ink sm:text-4xl md:text-5xl text-balance">
            {ABOUT.heading}
          </h2>
          <p className="about__description mt-6 max-w-md text-base leading-relaxed text-muted sm:text-lg">{ABOUT.description}</p>
        </Reveal>

        <Reveal delay={0.12} className="about__media">
          <BorderGlow
            edgeSensitivity={30}
            glowColor="40 80 80"
            backgroundColor="#f5f5f5"
            borderRadius={18}
            glowRadius={40}
            glowIntensity={1}
            coneSpread={25}
            animated={false}
            colors={['#c084fc', '#f472b6', '#38bdf8']}
          >
            <div
              className="about__figure relative mx-auto aspect-[5/4] w-full max-w-md cursor-pointer overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm group"
              onDoubleClick={() => window.open('https://maps.app.goo.gl/f7iPJ5ENmMyyRgwGA', '_blank', 'noopener,noreferrer')}
              title="Double click to view location on Google Maps"
              role="link"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter') window.open('https://maps.app.goo.gl/f7iPJ5ENmMyyRgwGA', '_blank', 'noopener,noreferrer')
              }}
              aria-label="Double click to view college location on Google Maps"
            >
            <img
              src={collegeImg}
              alt="College campus"
              className="about__figure-img absolute inset-0 h-full w-full object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 top-0 flex items-center justify-center bg-gradient-to-b from-black/45 via-black/10 to-transparent p-3 transition-opacity duration-300">
              <span className="flex items-center gap-2 rounded-full border border-white/25 bg-black/55 px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.2em] text-white/90 shadow-sm backdrop-blur-sm sm:text-[11px]">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-3.5 w-3.5">
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                Double click to view location
              </span>
            </div>
            </div>
          </BorderGlow>
        </Reveal>
      </div>
    </section>
  )
}