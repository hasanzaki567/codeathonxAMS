// CREDIT
// Component inspired by @BalintFerenczy on X
// https://codepen.io/BalintFerenczy/pen/KwdoyEN

import { useId } from 'react'
import type { CSSProperties, ReactNode } from 'react'

export interface ElectricBorderProps {
  color?: string
  speed?: number
  chaos?: number
  thickness?: number
  className?: string
  style?: CSSProperties
  children: ReactNode
}

const toHex = (value: number) => Math.max(0, Math.min(255, Math.round(value))).toString(16).padStart(2, '0')

function withAlpha(hex: string, alpha: number) {
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) return `${hex}${toHex(alpha * 255)}`
  return hex
}

export default function ElectricBorder({
  color = '#dd8448',
  speed = 1,
  chaos = 0.12,
  thickness = 2,
  className = '',
  style,
  children,
}: ElectricBorderProps) {
  const id = useId()
  const filterId = `electric-displace-${id.replace(/[^a-zA-Z0-9-]/g, '')}`
  const duration = 6 / Math.max(speed, 0.01)
  const displacement = chaos * 250
  const radius = (style?.borderRadius as number | string | undefined) ?? '16px'
  const radiusPx = typeof radius === 'number' ? `${radius}px` : radius
  const pad = thickness + 2

  return (
    <div
      className={`electric-border relative ${className}`}
      style={{ borderRadius: radiusPx, padding: pad, ...style }}
    >
      <svg className="electric-border__svg absolute" width="0" height="0" aria-hidden="true">
        <defs>
          <filter id={filterId} colorInterpolationFilters="sRGB" x="-20%" y="-20%" width="140%" height="140%">
            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="1" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise1">
              <animate attributeName="dy" values="700; 0" dur={`${duration}s`} repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="1" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise2">
              <animate attributeName="dy" values="0; -700" dur={`${duration}s`} repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise1" seed="2" />
            <feOffset in="noise1" dx="0" dy="0" result="offsetNoise3">
              <animate attributeName="dx" values="490; 0" dur={`${duration}s`} repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feTurbulence type="turbulence" baseFrequency="0.02" numOctaves="10" result="noise2" seed="2" />
            <feOffset in="noise2" dx="0" dy="0" result="offsetNoise4">
              <animate attributeName="dx" values="0; -490" dur={`${duration}s`} repeatCount="indefinite" calcMode="linear" />
            </feOffset>

            <feComposite in="offsetNoise1" in2="offsetNoise2" result="part1" />
            <feComposite in="offsetNoise3" in2="offsetNoise4" result="part2" />
            <feBlend in="part1" in2="part2" mode="color-dodge" result="combinedNoise" />

            <feDisplacementMap
              in="SourceGraphic"
              in2="combinedNoise"
              scale={displacement}
              xChannelSelector="R"
              yChannelSelector="B"
            />
          </filter>
        </defs>
      </svg>

      <div
        className="electric-border__ring pointer-events-none absolute"
        style={{
          top: pad,
          left: pad,
          right: pad,
          bottom: pad,
          border: `${thickness}px solid ${color}`,
          borderRadius: radiusPx,
          filter: `url(#${filterId})`,
        }}
        aria-hidden="true"
      />

      <div
        className="electric-border__glow-1 pointer-events-none absolute"
        style={{
          top: pad,
          left: pad,
          right: pad,
          bottom: pad,
          border: `${thickness}px solid ${withAlpha(color, 0.6)}`,
          borderRadius: radiusPx,
          filter: 'blur(1px)',
        }}
        aria-hidden="true"
      />

      <div
        className="electric-border__glow-2 pointer-events-none absolute"
        style={{
          top: pad,
          left: pad,
          right: pad,
          bottom: pad,
          border: `${thickness}px solid ${withAlpha(color, 1)}`,
          borderRadius: radiusPx,
          filter: 'blur(4px)',
        }}
        aria-hidden="true"
      />

      <div
        className="electric-border__overlay-1 pointer-events-none absolute inset-0"
        style={{
          borderRadius: radiusPx,
          opacity: 1,
          mixBlendMode: 'overlay',
          transform: 'scale(1.1)',
          filter: 'blur(16px)',
          background: 'linear-gradient(-30deg, white, transparent 30%, transparent 70%, white)',
        }}
        aria-hidden="true"
      />

      <div
        className="electric-border__overlay-2 pointer-events-none absolute inset-0"
        style={{
          borderRadius: radiusPx,
          opacity: 0.5,
          mixBlendMode: 'overlay',
          transform: 'scale(1.1)',
          filter: 'blur(16px)',
          background: 'linear-gradient(-30deg, white, transparent 30%, transparent 70%, white)',
        }}
        aria-hidden="true"
      />

      <div className="electric-border__bg-glow pointer-events-none absolute" aria-hidden="true" style={{ top: 0, left: 0, right: 0, bottom: 0, borderRadius: radiusPx, filter: 'blur(32px)', transform: 'scale(1.1)', opacity: 0.3, zIndex: -1, background: `linear-gradient(-30deg, ${withAlpha(color, 0.5)}, transparent, ${withAlpha(color, 0.5)})` }} />

      <div className="electric-border__content relative">{children}</div>
    </div>
  )
}