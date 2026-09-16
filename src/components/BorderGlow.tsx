import { useCallback, useRef, useState } from 'react'
import type { MouseEvent, ReactNode } from 'react'

type Edge = 'top' | 'right' | 'bottom' | 'left'

export interface BorderGlowProps {
  edgeSensitivity?: number
  glowColor?: string
  backgroundColor?: string
  borderRadius?: number
  glowRadius?: number
  glowIntensity?: number
  coneSpread?: number
  animated?: boolean
  colors?: string[]
  className?: string
  children: ReactNode
}

interface GlowState {
  x: number
  y: number
  ex: number
  ey: number
  angle: number
  visible: number
}

const DEFAULTS = {
  edgeSensitivity: 30,
  glowColor: '40 80 80',
  borderRadius: 28,
  glowRadius: 40,
  glowIntensity: 1,
  coneSpread: 25,
  animated: false,
  colors: ['#c084fc', '#f472b6', '#38bdf8'],
}

export default function BorderGlow({
  edgeSensitivity = DEFAULTS.edgeSensitivity,
  glowColor = DEFAULTS.glowColor,
  borderRadius = DEFAULTS.borderRadius,
  glowRadius = DEFAULTS.glowRadius,
  glowIntensity = DEFAULTS.glowIntensity,
  coneSpread = DEFAULTS.coneSpread,
  animated = DEFAULTS.animated,
  colors = DEFAULTS.colors,
  className = '',
  children,
}: BorderGlowProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [glow, setGlow] = useState<GlowState | null>(null)

  const handleMouseMove = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top
      const w = rect.width
      const h = rect.height

      const dist: Record<Edge, number> = { top: y, right: w - x, bottom: h - y, left: x }
      let edge: Edge = 'top'
      let d = Infinity
      ;(Object.keys(dist) as Edge[]).forEach((k) => {
        if (dist[k] < d) {
          d = dist[k]
          edge = k
        }
      })

      const edgePoint: Record<Edge, [number, number]> = {
        top: [x, 0],
        right: [w, y],
        bottom: [x, h],
        left: [0, y],
      }
      const [ex, ey] = edgePoint[edge]
      const visible = Math.max(0, Math.min(1, (edgeSensitivity - d) / edgeSensitivity))
      const angle = (Math.atan2(y - ey, x - ex) * 180) / Math.PI

      setGlow((prev) =>
        prev && prev.x === x && prev.y === y && prev.ex === ex && prev.ey === ey && prev.visible === visible
          ? prev
          : { x, y, ex, ey, angle, visible },
      )
    },
    [edgeSensitivity],
  )

  const handleMouseLeave = useCallback(() => setGlow(null), [])

  const base: [number, number] = [glow?.ex ?? 0, glow?.ey ?? 0]
  const dx = (glow?.x ?? 0) - base[0]
  const dy = (glow?.y ?? 0) - base[1]
  const len = Math.hypot(dx, dy) || 1
  const perpX = (-dy / len) * coneSpread
  const perpY = (dx / len) * coneSpread
  const b1 = `${base[0] + perpX}px ${base[1] + perpY}px`
  const b2 = `${base[0] - perpX}px ${base[1] - perpY}px`
  const tip = `${glow ? glow.x : 0}px ${glow ? glow.y : 0}px`
  const opacity = glow ? glow.visible * glowIntensity : 0

  const intensity = Math.min(1, opacity)

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`border-glow relative ${className}`}
      style={{ borderRadius, overflow: 'hidden' }}
    >
      {children}

      <div
        aria-hidden="true"
        className="border-glow__overlay pointer-events-none absolute inset-0"
        style={{
          borderRadius,
          overflow: 'hidden',
          opacity,
          transition: 'opacity 0.35s ease',
        }}
      >
        <div
          className="border-glow__ring absolute inset-0"
          style={{
            background: `linear-gradient(90deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
            padding: 1.5,
            WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
            WebkitMaskComposite: 'xor',
            maskComposite: 'exclude',
          }}
        />
        <div
          className="border-glow__beam absolute inset-0"
          style={{
            clipPath: `polygon(${b1}, ${b2}, ${tip})`,
            background: `linear-gradient(${glow ? glow.angle : 0}deg, ${colors[0]}, ${colors[1]}, ${colors[2]})`,
            opacity: 0.7 * intensity,
            animation: animated ? 'border-glow-spin 6s linear infinite' : undefined,
          }}
        />
        <div
          className="border-glow__hotspot absolute inset-0"
          style={{
            background:
              glow && (glow.x || glow.y)
                ? `radial-gradient(${glowRadius}px circle at ${glow.x}px ${glow.y}px, rgba(${glowColor}, ${0.5 * intensity}) 0%, rgba(${glowColor}, 0) 100%)`
                : undefined,
          }}
        />
      </div>
    </div>
  )
}