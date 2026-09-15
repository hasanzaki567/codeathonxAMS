import { Briefcase, Camera, Mail, MessageCircle, Phone } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { CONTACT } from '../data/site'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

const ICONS: Record<string, LucideIcon> = {
  email: Mail,
  phone: Phone,
  instagram: Camera,
  linkedin: Briefcase,
  whatsapp: MessageCircle,
}

export function Contact() {
  return (
    <section id="contact" className="bg-mist py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionHeader label={CONTACT.label} heading={CONTACT.heading} sub={CONTACT.sub} align="center" />
        </Reveal>

        <div className="mx-auto mt-12 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {CONTACT.channels.map((channel, i) => {
            const Icon = ICONS[channel.key] ?? Phone
            const filled = channel.value.trim() !== ''
            return (
              <Reveal key={channel.key} delay={i * 0.06}>
                <div
                  className={`flex h-full flex-col items-center gap-3 rounded-2xl border p-5 text-center ${
                    filled ? 'border-line bg-surface' : 'border-dashed border-line bg-surface/60'
                  }`}
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-night">
                    <Icon className="h-5 w-5 text-accent" />
                  </span>
                  <div className="min-w-0">
                    <p className="font-mono text-[10px] uppercase tracking-[0.16em] text-soft">{channel.label}</p>
                    <p className="mt-1 text-sm font-medium text-ink">
                      {filled ? channel.value : 'TBA'}
                    </p>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.2}>
          <p className="mt-10 text-center text-xs text-soft">TBA marks placeholder details — finalized by the organizers soon.</p>
        </Reveal>
      </div>
    </section>
  )
}