import { Briefcase, Camera, Mail, MessageCircle, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CONTACT } from '../data/site'
import BorderGlow from './BorderGlow'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'
import { FerrofluidBackground } from './FerrofluidBackground'

const ICONS: Record<string, LucideIcon> = {
  email: Mail,
  phone: Phone,
  instagram: Camera,
  linkedin: Briefcase,
  whatsapp: MessageCircle,
}

export function Contact() {
  return (
    <section id="contact" className="contact relative overflow-hidden bg-mist py-24 sm:py-32">
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
      <div className="contact__inner wrap relative z-10">
        <Reveal>
          <SectionHeader label={CONTACT.label} heading={CONTACT.heading} sub={CONTACT.sub} align="center" />
        </Reveal>

        <div className="contact__grid mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CONTACT.channels.map((channel, i) => {
            const Icon = ICONS[channel.key] ?? Phone
            const filled = channel.value.trim() !== ''
            return (
              <Reveal key={channel.key} delay={i * 0.06}>
<BorderGlow
                  edgeSensitivity={30}
                  glowColor="40 80 80"
                  backgroundColor="#120F17"
                  borderRadius={18}
                  glowRadius={40}
                  glowIntensity={1}
                  coneSpread={25}
                  animated={false}
                  colors={['#c084fc', '#f472b6', '#38bdf8']}
                >
                  <div
                    className={`contact__channel flex h-full flex-col items-center gap-3 rounded-2xl border p-5 text-center ${
                      filled ? 'border-line bg-surface' : 'border-dashed border-line bg-surface/60'
                    }`}
                  >
                  <span className="contact__channel-icon grid h-11 w-11 place-items-center rounded-full bg-night">
                    <Icon className="contact__channel-icon-svg h-5 w-5 text-accent" />
                  </span>
                  <div className="contact__channel-body min-w-0">
                    <p className="contact__channel-label font-mono text-[10px] uppercase tracking-[0.16em] text-soft">{channel.label}</p>
                    <p className="contact__channel-value mt-1 text-sm font-medium text-ink">
                      {filled ? channel.value : 'TBA'}
                    </p>
                  </div>
                  </div>
                </BorderGlow>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="contact__note mt-10 text-center text-xs text-soft">TBA marks placeholder details — finalized by the organizers soon.</p>
        </Reveal>
      </div>
    </section>
  )
}