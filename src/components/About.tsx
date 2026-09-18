import { ABOUT } from '../data/site'
import collegeImg from '../assets/college.jpeg'
import BorderGlow from './BorderGlow'
import { Reveal } from './ui/Reveal'
import { FerrofluidBackground } from './FerrofluidBackground'

export function About() {
  return (
    <section id="about" className="about sticky top-0 z-20 flex min-h-screen-dvh flex-col justify-center bg-paper py-16 sm:py-24">
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
            <div className="about__figure relative mx-auto aspect-[5/4] w-full max-w-md overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <img
              src={collegeImg}
              alt="College campus"
              className="about__figure-img absolute inset-0 h-full w-full object-cover"
            />
            </div>
          </BorderGlow>
        </Reveal>
      </div>
    </section>
  )
}