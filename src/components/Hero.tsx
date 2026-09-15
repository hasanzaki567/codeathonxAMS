import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { EVENT, HERO } from '../data/site'
import { Countdown } from './Countdown'
import { useFlow } from '../flowContext'
import SplashCursor from './SplashCursor'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const { openWizard } = useFlow()

  return (
    <section id="top" className="relative z-10 min-h-[100dvh] w-full overflow-hidden bg-black text-white">
      <SplashCursor
        DENSITY_DISSIPATION={3.5}
        VELOCITY_DISSIPATION={2}
        PRESSURE={0.1}
        CURL={3}
        SPLAT_RADIUS={0.2}
        SPLAT_FORCE={6000}
        COLOR_UPDATE_SPEED={10}
        SHADING
        RAINBOW_MODE
        COLOR="#A855F7"
      />
      <div className="relative">
        <div className="wrap flex min-h-[100dvh] flex-col justify-between pb-16 pt-28 sm:pt-32">
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-accent"
            >
              {HERO.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="mt-6 font-display text-[clamp(3.2rem,13vw,8.5rem)] font-bold leading-[0.95] tracking-[-0.03em]"
            >
              {EVENT.name}
              <span className="block font-medium text-accent">{EVENT.year}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="mt-8 font-display text-xl font-medium tracking-[0.04em] text-white/90 sm:text-2xl"
            >
              {HERO.supporting}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease }}
              className="mt-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-white/45"
            >
              {HERO.meta}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease }}
              className="mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5"
            >
              <button
                type="button"
                onClick={() => openWizard()}
                className="group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                {HERO.primaryCta}
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              <a
                href="#events"
                className="inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/5"
              >
                {HERO.secondaryCta}
                <ArrowDown className="h-4 w-4" />
              </a>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-16"
          >
            <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.25em] text-white/40">
              Starts in
            </p>
            <Countdown />
          </motion.div>
        </div>
      </div>
    </section>
  )
}