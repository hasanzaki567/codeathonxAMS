import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { EVENT, HERO, REGISTRATION_URL } from '../data/site'
import { Countdown } from './Countdown'
import TextType from './TextType'
import { FerrofluidBackground } from './FerrofluidBackground'
import WarpText from './WarpText'

const ease = [0.22, 1, 0.36, 1] as const

const WELCOME_MESSAGES = [
  `Welcome to ${EVENT.name}`,
  'Code. Build. Innovate.',
  'Are you ready to compete?',
]

export function Hero() {
  return (
    <section id="top" className="hero relative z-10 min-h-[100dvh] w-full overflow-hidden bg-black text-white">
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
        opacity={0.7}
        mouseInteraction
        mouseStrength={1}
        mouseRadius={0.35}
      />
      <div className="hero__frame relative z-10">
        <div className="hero__inner wrap flex min-h-[100dvh] flex-col items-center justify-center pb-24 pt-28 text-center sm:pt-32">
          <div className="hero__content flex w-full flex-col items-center">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="hero__eyebrow font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-accent"
            >
              {HERO.eyebrow}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="hero__title mt-6 w-full max-w-5xl"
            >
              <h1 className="sr-only">{EVENT.name}</h1>
              <WarpText
                text={EVENT.name}
                color="#f8f5ff"
                gradient={['#02A4FF', '#34D9B2']}
                warpStrength={0.08}
                warpScale={1.7}
                speed={0.55}
                pointerInfluence={0.42}
                pointerStrength={0.38}
                refraction={0.018}
                ripple
                fontSize={116}
                fontWeight={800}
                style={{ height: '320px' }}
                fontFamily="inherit"
                letterSpacing={-0.06}
                lineHeight={0.9}
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="hero__typewriter mt-8 flex min-h-[2.5rem] items-center justify-center font-display text-xl font-medium tracking-[0.04em] text-white/90 sm:text-2xl"
            >
              <TextType
                texts={WELCOME_MESSAGES}
                typingSpeed={75}
                deletingSpeed={45}
                pauseDuration={2200}
                showCursor
                cursorCharacter="_"
                cursorBlinkDuration={0.5}
                variableSpeedEnabled={false}
              />
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease }}
              className="hero__meta mt-5 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-white/45"
            >
              {HERO.meta}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease }}
              className="hero__ctas mt-10 flex flex-col items-center gap-4 sm:flex-row sm:items-center sm:gap-5"
            >
              <a
                href={REGISTRATION_URL}
                target="_blank"
                rel="noreferrer"
                className="hero__cta-primary group inline-flex items-center gap-2 rounded-full bg-[linear-gradient(135deg,#02A4FF_0%,#34D9B2_100%)] px-8 py-4 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                {HERO.primaryCta}
                <ArrowRight className="hero__cta-primary-icon h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <a
                href="#events"
                className="hero__cta-secondary inline-flex items-center gap-2 rounded-full border border-white/20 px-8 py-4 text-base font-medium text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/5"
              >
                {HERO.secondaryCta}
                <ArrowDown className="hero__cta-secondary-icon h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="hero__countdown mt-16"
          >
            <p className="hero__countdown-label mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Starts in
            </p>
            <Countdown />
          </motion.div>
        </div>
      </div>
    </section>
  )
}