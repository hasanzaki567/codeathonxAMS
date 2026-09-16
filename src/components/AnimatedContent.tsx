import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import type { Easing } from 'framer-motion'

interface AnimatedContentProps {
  children: ReactNode
  distance?: number
  direction?: 'vertical' | 'horizontal'
  reverse?: boolean
  duration?: number
  ease?: Easing
  initialOpacity?: number
  animateOpacity?: boolean
  scale?: number
  threshold?: number
  delay?: number
  onComplete?: () => void
}

export function AnimatedContent({
  children,
  distance = 40,
  direction = 'vertical',
  reverse = false,
  duration = 0.6,
  ease = [0.22, 1, 0.36, 1] as Easing,
  initialOpacity = 0,
  animateOpacity = true,
  scale = 1,
  threshold = 0.2,
  delay = 0,
  onComplete,
}: AnimatedContentProps) {
  const distanceActive = reverse ? -distance : distance
  const x = direction === 'horizontal' ? distanceActive : 0
  const y = direction === 'vertical' ? distanceActive : 0

  return (
    <motion.div
      className="animated-content"
      initial={{ opacity: animateOpacity ? initialOpacity : 1, x, y, scale }}
      whileInView={{ opacity: 1, x: 0, y: 0, scale: 1 }}
      viewport={{ once: true, amount: threshold }}
      transition={{ duration, ease, delay }}
      onAnimationComplete={onComplete}
    >
      {children}
    </motion.div>
  )
}