import { motion } from 'framer-motion'
import { ArrowDown, ArrowRight } from 'lucide-react'
import { EVENT, HERO } from '../data/site'
import { Countdown } from './Countdown'
import { useRouter } from '../router'

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const { navigate } = useRouter()

  return (
    <section id="top" className="hero relative z-10 min-h-[100dvh] w-full overflow-hidden bg-black text-white">
      <div className="hero__frame relative">
        <div className="hero__inner wrap flex min-h-[100dvh] flex-col justify-between pb-16 pt-28 sm:pt-32">
          <div className="hero__content">
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="hero__eyebrow font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-accent"
            >
              {HERO.eyebrow}
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.08, ease }}
              className="hero__title mt-6 font-display text-[clamp(3.2rem,13vw,8.5rem)] font-bold leading-[0.95] tracking-[-0.03em]"
            >
              {EVENT.name}
              <span className="hero__title-year block font-medium text-accent">{EVENT.year}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.18, ease }}
              className="hero__supporting mt-8 font-display text-xl font-medium tracking-[0.04em] text-white/90 sm:text-2xl"
            >
              {HERO.supporting}
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.26, ease }}
              className="hero__meta mt-3 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-white/45"
            >
              {HERO.meta}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.34, ease }}
              className="hero__ctas mt-10 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5"
            >
              <button
                type="button"
                onClick={() => navigate('/form')}
                className="hero__cta-primary group inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3.5 text-base font-semibold text-night transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
              >
                {HERO.primaryCta}
                <ArrowRight className="hero__cta-primary-icon h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </button>
              <a
                href="#events"
                className="hero__cta-secondary inline-flex items-center gap-2 rounded-full border border-white/20 px-7 py-3.5 text-base font-medium text-white transition-colors duration-200 hover:border-white/50 hover:bg-white/5"
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