import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { FAQ_ITEMS } from '../data/faq'
import { Reveal } from './ui/Reveal'
import { SectionHeader } from './ui/SectionHeader'

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="bg-paper py-24 sm:py-32">
      <div className="wrap">
        <Reveal>
          <SectionHeader label="08 / FAQ" heading="Questions, answered." align="center" />
        </Reveal>

        <div className="mx-auto mt-12 max-w-3xl">
          {FAQ_ITEMS.map((item, i) => {
            const open = openIndex === i
            return (
              <Reveal key={item.q} delay={Math.min(i * 0.04, 0.3)}>
                <div
                  className={`border-b border-line ${i === 0 ? 'border-t' : ''}`}
                >
                  <button
                    type="button"
                    onClick={() => setOpenIndex(open ? null : i)}
                    aria-expanded={open}
                    aria-controls={`faq-${i}`}
                    className="flex w-full items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-base font-medium text-ink sm:text-lg">{item.q}</span>
                    <span className="flex items-center gap-2.5">
                      {item.editable && (
                        <span className="rounded-full bg-mist px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.12em] text-muted">
                          TBC
                        </span>
                      )}
                      <span
                        className={`grid h-8 w-8 shrink-0 place-items-center rounded-full border transition-all duration-300 ${
                          open ? 'rotate-45 border-accent-deep bg-accent-tint text-accent-ink' : 'border-line text-muted'
                        }`}
                      >
                        <Plus className="h-4 w-4" />
                      </span>
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        id={`faq-${i}`}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="max-w-2xl pb-6 pr-10 text-[15px] leading-relaxed text-muted">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}