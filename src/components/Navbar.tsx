import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { EVENT, NAV_LINKS } from '../data/site'
import { useFlow } from '../flowContext'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { openWizard } = useFlow()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!open) return
    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = previous
    }
  }, [open])

  const solid = scrolled || open

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        solid ? 'border-b border-line bg-paper/85 backdrop-blur-md' : 'border-b border-transparent bg-transparent'
      }`}
    >
      <nav className="wrap flex h-16 items-center justify-between" aria-label="Primary">
        <a href="#top" className={`font-display text-lg font-bold tracking-tight ${solid ? 'text-ink' : 'text-white'}`}>
          {EVENT.name}
          <span className={`ml-1.5 font-medium ${solid ? 'text-accent-ink' : 'text-accent'}`}>{EVENT.year}</span>
        </a>

        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`text-sm font-medium transition-colors ${
                solid ? 'text-muted hover:text-ink' : 'text-white/70 hover:text-white'
              }`}
            >
              {link.label}
            </a>
          ))}
          <button
            type="button"
            onClick={() => openWizard()}
            className="rounded-full bg-accent px-5 py-2 text-sm font-semibold text-night transition-transform duration-200 hover:scale-[1.03] active:scale-[0.98]"
          >
            Register Now
          </button>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          className={`grid h-10 w-10 place-items-center rounded-full md:hidden ${
            solid ? 'border border-line text-ink' : 'border border-white/20 text-white'
          }`}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden border-t border-line bg-paper md:hidden"
          >
            <div className="wrap flex flex-col gap-1 py-4">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-medium text-ink transition-colors hover:bg-mist"
                >
                  {link.label}
                </a>
              ))}
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  openWizard()
                }}
                className="mt-3 rounded-full bg-accent px-5 py-3 text-center text-base font-semibold text-night"
              >
                Register Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}