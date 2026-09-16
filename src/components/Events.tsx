import { AnimatedContent } from './AnimatedContent'
import { COMPETITIONS } from '../data/competitions'
import { CompetitionCard } from './CompetitionCard'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'
import { FerrofluidBackground } from './FerrofluidBackground'

export function Events() {
  return (
    <section id="events" className="events relative overflow-hidden bg-mist py-24 sm:py-32">
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
      <div className="events__inner wrap relative z-10">
        <Reveal>
          <SectionHeader
            label="02 / EVENTS"
            heading="Choose your challenge."
            sub="One track focuses on pure coding, the next on software innovation, and the third on hardware engineering."
          />
        </Reveal>

        <div className="events__grid mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {COMPETITIONS.map((competition, i) => (
            <AnimatedContent
              key={competition.id}
              direction="vertical"
              distance={60}
              delay={i * 0.12}
              duration={0.7}
            >
              <CompetitionCard competition={competition} />
            </AnimatedContent>
          ))}
        </div>

        <Reveal delay={0.4}>
          <p className="events__hint mt-10 text-center font-mono text-xs uppercase tracking-[0.15em] text-muted">
            Hover over a card to flip and see details
          </p>
        </Reveal>
      </div>
    </section>
  )
}
