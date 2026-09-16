import { useRef, useState } from 'react'
import type { CSSProperties, ReactNode } from 'react'

interface GlareHoverProps {
  children: ReactNode
  glareColor?: string
  glareOpacity?: number
  glareAngle?: number
  glareSize?: number | string
  transitionDuration?: number
  playOnce?: boolean
  className?: string
}

export function GlareHover({
  children,
  glareColor = '#ffffff',
  glareOpacity = 0.4,
  glareAngle = 0,
  glareSize = '300%',
  transitionDuration = 500,
  playOnce = false,
  className,
}: GlareHoverProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [position, setPosition] = useState<{ x: number; y: number } | null>(null)
  const [entered, setEntered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect()
    if (!rect) return
    setPosition({ x: e.clientX - rect.left, y: e.clientY - rect.top })
    setEntered(true)
  }

  const handleMouseLeave = () => {
    setPosition(null)
    setEntered(false)
  }

  const glareStyle: CSSProperties | undefined =
    entered && position
      ? {
          background: `radial-gradient(circle at ${position.x}px ${position.y}px, ${glareColor} 0%, transparent ${glareSize}px)`,
          opacity: playOnce ? 0 : glareOpacity,
          transform: `rotate(${glareAngle}deg)`,
          transition: `opacity ${transitionDuration}ms ease`,
        }
      : {
          opacity: 0,
          transition: `opacity ${transitionDuration}ms ease`,
        }

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`glare-hover relative overflow-hidden ${className ?? ''}`.trim()}
    >
      <div
        aria-hidden="true"
        className="glare-hover__glare pointer-events-none absolute inset-0"
        style={glareStyle}
      />
      {children}
    </div>
  )
}