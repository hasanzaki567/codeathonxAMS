import { useState } from 'react'
import type { ReactNode } from 'react'

interface FlipCardProps {
  front: ReactNode
  back: ReactNode
  className?: string
  flipOnHover?: boolean
}

export function FlipCard({ front, back, className = '', flipOnHover = true }: FlipCardProps) {
  const [flipped, setFlipped] = useState(false)

  return (
    <div
      className={`flip-card ${className}`}
      style={{ perspective: 1000 }}
      onMouseEnter={() => (flipOnHover ? setFlipped(true) : undefined)}
      onMouseLeave={() => (flipOnHover ? setFlipped(false) : undefined)}
      onClick={() => setFlipped((f) => !f)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          setFlipped((f) => !f)
        }
      }}
      role="button"
      tabIndex={0}
    >
      <div
        className="flip-card__inner"
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          transition: 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0deg)',
        }}
      >
        <div
          className="flip-card__front"
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {front}
        </div>
        <div
          className="flip-card__back"
          style={{
            position: 'absolute',
            inset: 0,
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
          }}
        >
          {back}
        </div>
      </div>
    </div>
  )
}
