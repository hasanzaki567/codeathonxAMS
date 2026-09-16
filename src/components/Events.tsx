import { COMPETITIONS } from '../data/competitions'
import { CompetitionCard } from './CompetitionCard'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function Events() {
  return (
    <section id="events" className="events bg-mist py-24 sm:py-32">
      <div className="events__inner wrap">
        <Reveal>
          <SectionHeader
            label="02 / EVENTS"
            heading="Choose your challenge."
            sub="One track focuses on pure coding, the next on software innovation, and the third on hardware engineering."
          />
        </Reveal>

        <div className="events__grid mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-7">
          {COMPETITIONS.map((competition, i) => (
            <Reveal key={competition.id} delay={i * 0.1}>
              <CompetitionCard competition={competition} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}