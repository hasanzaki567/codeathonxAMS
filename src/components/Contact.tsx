import { Briefcase, Camera, Mail, MessageCircle, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CONTACT } from '../data/site'
import BorderGlow from './BorderGlow'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'
import { FerrofluidBackground } from './FerrofluidBackground'

const ICONS: Record<string, LucideIcon> = {
  call: Phone,
  phone: Phone,
  instagram: Camera,
  email: Mail,
  linkedin: Briefcase,
  whatsapp: MessageCircle,
}

export function Contact() {
  return (
    <section id="contact" className="contact relative overflow-hidden bg-black py-24 text-white sm:py-32">
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
          <SectionHeader label={CONTACT.label} heading={CONTACT.heading} sub={CONTACT.sub} align="center" dark />
        </Reveal>

        <div className="contact__grid mx-auto mt-12 grid max-w-3xl grid-cols-3 gap-4 sm:gap-6">
          {CONTACT.channels.map((channel, i) => {
            const Icon = ICONS[channel.key] ?? Phone
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
                  <a
                    href={channel.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${channel.label} ${channel.value}`}
                    className="contact__channel group flex h-full w-full flex-col items-center gap-3 rounded-2xl border border-white/10 bg-[#131312] p-5 text-center shadow-[0_20px_40px_-28px_rgba(0,0,0,0.8)] transition-colors duration-300 hover:border-white/25"
                  >
                  <span className="contact__channel-icon grid h-11 w-11 place-items-center rounded-full border border-white/20 bg-white/5">
                    <Icon className="contact__channel-icon-svg h-5 w-5 text-white/80" />
                  </span>
                  <div className="contact__channel-body min-w-0">
                    <p className="contact__channel-label font-mono text-[10px] uppercase tracking-[0.16em] text-white/50">{channel.label}</p>
                    <p className="contact__channel-value mt-1 text-sm font-medium text-white">{channel.value}</p>
                  </div>
                  </a>
                </BorderGlow>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}