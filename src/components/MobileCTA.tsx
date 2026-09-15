import { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useFlow } from '../flowContext'

export function MobileCTA() {
  const { openWizard, wizardOpen } = useFlow()
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && !wizardOpen && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-x-0 bottom-0 z-40 p-4 md:hidden"
        >
          <button
            type="button"
            onClick={() => openWizard()}
            className="flex w-full items-center justify-center gap-2 rounded-full bg-accent py-4 text-base font-semibold text-night shadow-[0_16px_40px_-12px_rgba(0,0,0,0.4)]"
          >
            Register Now
            <ArrowRight className="h-4 w-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}