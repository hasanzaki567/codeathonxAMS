import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { PATRONS } from '../data/site'
import BorderGlow from './BorderGlow'
import { GlareHover } from './GlareHover'
import { SectionHeader } from './ui/SectionHeader'
import { FerrofluidBackground } from './FerrofluidBackground'

function Avatar({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" role="img" aria-label="Abstract patron avatar" className={`patron-card__avatar-svg ${className ?? ''}`.trim()}>
      <circle
        cx="32"
        cy="32"
        r="30"
        fill="none"
        stroke="currentColor"
        strokeWidth="0.8"
        opacity="0.35"
      />
      <circle
        cx="32"
        cy="27"
        r="8.5"
        fill="currentColor"
        opacity="0.92"
      />
      <path
        d="M32 38.5c-9.4 0-14.5 5.6-16.5 10.4 3.8 2.7 9.8 4.1 16.5 4.1s12.7-1.4 16.5-4.1c-2-4.8-7-10.4-16.5-10.4Z"
        fill="currentColor"
        opacity="0.92"
      />
    </svg>
  )
}

interface PatronCardProps {
  title: string
  name?: string
  image?: string
  featured?: boolean
}

function PatronCard({ title, name, image, featured = false }: PatronCardProps) {
  return (
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
      <GlareHover
        glareColor="#ffffff"
      glareOpacity={0.15}
      glareAngle={-30}
      glareSize="300%"
      transitionDuration={800}
      className={`patron-card group relative flex flex-col items-center gap-6 overflow-hidden rounded-2xl border p-8 text-center sm:p-10 transition-all duration-300 ${
        featured
          ? 'patron-card--featured border-accent/25 bg-night-soft shadow-[0_0_64px_-24px_rgba(0,224,124,0.45)] hover:border-accent/55 hover:shadow-[0_0_90px_-18px_rgba(0,224,124,0.55)]'
          : 'patron-card--regular border-night-line bg-night-soft/60 hover:border-accent/35 hover:shadow-[0_0_56px_-24px_rgba(0,224,124,0.4)]'
      }`}
    >
      {featured && (
        <span className="patron-card__accent absolute left-1/2 top-0 h-1 w-16 -translate-x-1/2 -translate-y-0.5 rounded-full bg-accent shadow-[0_0_24px_-2px_rgba(0,224,124,0.55)]" />
      )}

      <span
        aria-hidden="true"
        className="patron-card__glow pointer-events-none absolute -top-24 left-1/2 h-44 w-44 -translate-x-1/2 rounded-full bg-accent/[0.07] blur-3xl opacity-60 transition-opacity duration-300 group-hover:opacity-100"
      />

      <span className="patron-card__avatar relative grid h-28 w-28 shrink-0 place-items-center overflow-hidden rounded-full border border-night-line bg-night-soft transition-colors duration-300 group-hover:border-accent/50">
        {image ? (
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="patron-card__avatar-img h-full w-full object-cover object-top"
          />
        ) : (
          <Avatar className="h-14 w-14" />
        )}
      </span>

      <div className="patron-card__body relative">
        <h3 className="patron-card__title font-display text-sm font-bold uppercase tracking-[0.16em] text-white sm:text-base">
          {title}
        </h3>
        {name && (
          <p className="patron-card__name mt-2 text-sm font-medium text-white/70">{name}</p>
        )}
      </div>
    </GlareHover>
    </BorderGlow>
  )
}

function ScrollPatronCard({ title, name, image, featured = false, depth = 1 }: PatronCardProps & { depth?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.9', 'end 0.1'] })
  const y = useTransform(scrollYProgress, [0, 1], [60 * depth, -60 * depth])
  const rotateX = useTransform(scrollYProgress, [0, 0.4, 0.8], [10, 0, -6])
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1])
  const opacity = useTransform(scrollYProgress, [0, 0.12, 0.88, 1], [0, 1, 1, 0.3])

  return (
    <motion.div
      ref={ref}
      className="patron-card-scroll will-change-transform"
      style={{ y, rotateX, scale, opacity, transformPerspective: 800 }}
    >
      <PatronCard title={title} name={name} image={image} featured={featured} />
    </motion.div>
  )
}

function PatronHeader() {
  return (
    <div className="patrons__sticky -mx-4 px-4 pt-2 sm:-mx-6 sm:px-6">
      <div className="relative z-10">
        <SectionHeader
          label={PATRONS.label}
          heading={PATRONS.heading}
          sub={PATRONS.sub}
          align="center"
          dark
        />
        <p className="patrons__group-label mt-10 text-center font-mono text-[11px] uppercase tracking-[0.3em] text-white/40">
          {PATRONS.groupLabel}
        </p>
        <div className="patrons__divider mx-auto mt-4 h-px w-14 bg-accent/30" />
      </div>
    </div>
  )
}

export function Patrons() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] })

  const glowX = useTransform(scrollYProgress, [0, 1], [0, 120])
  const glowY = useTransform(scrollYProgress, [0, 1], [0, -80])
  const orbA = useTransform(scrollYProgress, [0, 1], [0, 160])
  const orbB = useTransform(scrollYProgress, [0, 1], [0, -120])

  return (
    <section ref={sectionRef} id="patrons" className="patrons relative overflow-visible bg-black py-16 text-white sm:py-20">
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden">
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
          opacity={0.25}
          mouseInteraction
          mouseStrength={1}
          mouseRadius={0.35}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -top-32 right-[-10%] h-[420px] w-[420px] rounded-full bg-[radial-gradient(circle,rgba(0,224,124,0.12),transparent_70%)] blur-2xl"
          style={{ y: orbA }}
        />
        <motion.div
          aria-hidden="true"
          className="absolute -bottom-32 left-[-10%] h-[440px] w-[440px] rounded-full bg-[radial-gradient(circle,rgba(2,164,255,0.12),transparent_70%)] blur-2xl"
          style={{ y: orbB }}
        />
      </div>
      <motion.div
        className="patrons__glow pointer-events-none absolute inset-x-[-15%] inset-y-[-10%] z-10 bg-[radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,224,124,0.06),transparent_70%)]"
        style={{ x: glowX, y: glowY }}
        aria-hidden="true"
      />
      <div className="patrons__inner wrap relative z-10">
        <PatronHeader />

        <div className="patrons__featured mt-8">
          <ScrollPatronCard title={PATRONS.main[0].title} name={PATRONS.main[0].name} image={PATRONS.main[0].image} featured depth={0.9} />
        </div>

        <div className="patrons__grid mt-5 grid gap-5 sm:grid-cols-3">
          {PATRONS.main.slice(1).map((patron, i) => (
            <ScrollPatronCard key={patron.title} title={patron.title} name={patron.name} image={patron.image} depth={1 + i * 0.15} />
          ))}
        </div>
      </div>
    </section>
  )
}