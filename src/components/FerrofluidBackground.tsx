import { useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import Ferrofluid, { type FerrofluidProps } from './Ferrofluid'

interface FerrofluidBackgroundProps extends FerrofluidProps {
  containerClassName?: string
  style?: CSSProperties
}

export function FerrofluidBackground({
  containerClassName = '',
  style,
  className,
  ...ferrofluidProps
}: FerrofluidBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setActive(true)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry && entry.isIntersecting && !active) setActive(true)
        if (entry && !entry.isIntersecting && active) setActive(false)
      },
      { rootMargin: '300px 0px 300px 0px' }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [active])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`ferrofluid-bg absolute inset-0 z-0 overflow-hidden ${containerClassName}`}
      style={style}
    >
      {active && <Ferrofluid className={`h-full w-full ${className ?? ''}`} {...ferrofluidProps} />}
    </div>
  )
}