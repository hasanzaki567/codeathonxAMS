import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { EVENT } from '../data/site'
import { Reveal } from './ui/Reveal'
import { useRouter } from '../router'

export function Registration() {
  const { navigate } = useRouter()

  return (
    <section
      id="register"
      className="registration relative overflow-hidden bg-night py-24 text-white sm:py-32"
    >
      <div
        className="registration__glow pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(0,224,124,0.08),transparent_60%)]"
        aria-hidden="true"
      />
      <div className="registration__inner wrap relative text-center">
        <Reveal>
          <h2 className="registration__heading font-display text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl">
            Ready to compete?
          </h2>
          <p className="registration__sub mx-auto mt-4 max-w-md text-base text-white/60 sm:text-lg">
            Pick your challenge. Build your team. Register.
          </p>
          <motion.div
            className="registration__cta-wrap mt-10"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          >
            <button
              type="button"
              onClick={() => navigate('/form')}
              className="registration__cta group inline-flex items-center gap-2.5 rounded-full bg-accent px-9 py-4 text-lg font-semibold text-night transition-shadow hover:shadow-[0_16px_40px_-12px_rgba(0,224,124,0.5)]"
            >
              Register for {EVENT.name}
              <ArrowRight className="registration__cta-icon h-5 w-5 transition-transform duration-200 group-hover:translate-x-0.5" />
            </button>
          </motion.div>
        </Reveal>
      </div>
    </section>
  )
}