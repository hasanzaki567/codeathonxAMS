import { Suspense, lazy, useEffect, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { FerrofluidProps } from './Ferrofluid'

const Ferrofluid = lazy(() => import('./Ferrofluid'))

// Mobile WebGL context budgets are small. During a fast scroll several section
// backgrounds can enter the viewport in the same frame and each one creates a
// whole WebGL context (plus FBOs) — that burst is what gets the oldest context
// killed by the browser (and blank/reflow fallout). Cap the number of live
// contexts to this many; extras queue until a slot frees.
const MAX_CONCURRENT = 2
let activeCount = 0
const waiters: Array<() => void> = []

function acquireSlot(onGranted: () => void): () => void {
  if (activeCount < MAX_CONCURRENT) {
    activeCount++
    queueMicrotask(onGranted)
    let released = false
    return () => {
      if (released) return
      released = true
      activeCount = Math.max(0, activeCount - 1)
      const next = waiters.shift()
      if (next) next()
    }
  }
  let release: (() => void) | null = null
  const waiter = () => {
    activeCount++
    release = () => {
      activeCount = Math.max(0, activeCount - 1)
      const next = waiters.shift()
      if (next) next()
    }
    queueMicrotask(onGranted)
  }
  waiters.push(waiter)
  return () => {
    const idx = waiters.indexOf(waiter)
    if (idx >= 0) {
      waiters.splice(idx, 1)
      return
    }
    release?.()
  }
}

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
  const [granted, setGranted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      queueMicrotask(() => setActive(true))
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

  useEffect(() => {
    if (!active) return
    let release: (() => void) | null = null
    release = acquireSlot(() => {
      setGranted(true)
    })
    return () => {
      setGranted(false)
      release?.()
    }
  }, [active])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`ferrofluid-bg absolute inset-0 z-0 overflow-hidden ${containerClassName}`}
      style={style}
    >
      {granted && (
        <Suspense fallback={null}>
          <Ferrofluid className={`h-full w-full ${className ?? ''}`} {...ferrofluidProps} />
        </Suspense>
      )}
    </div>
  )
}