import { useEffect, useState } from 'react'
import { COUNTDOWN_TARGET } from '../data/site'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

function getTimeLeft(): TimeLeft {
  const target = new Date(COUNTDOWN_TARGET).getTime()
  const diff = Math.max(0, target - Date.now())
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

const pad = (n: number) => String(n).padStart(2, '0')

export function Countdown() {
  const [left, setLeft] = useState<TimeLeft>(getTimeLeft)

  useEffect(() => {
    const id = setInterval(() => setLeft(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const cells = [
    { label: 'Days', value: pad(left.days), wide: true },
    { label: 'Hours', value: pad(left.hours) },
    { label: 'Minutes', value: pad(left.minutes) },
    { label: 'Seconds', value: pad(left.seconds) },
  ]

  return (
    <div className="countdown flex items-center gap-3 sm:gap-4" aria-label={`Countdown to ${COUNTDOWN_TARGET}`}>
      {cells.map((cell, i) => (
        <div key={cell.label} className="countdown__cell flex items-center gap-3 sm:gap-4">
          <div
            className={`countdown__cell-box flex flex-col items-start justify-center rounded-xl border border-white/25 bg-white/[0.08] px-4 py-3.5 sm:px-5 sm:py-4 ${
              cell.wide ? 'w-[92px] sm:w-[112px]' : 'w-[84px] sm:w-[100px]'
            }`}
          >
            <span className="countdown__value font-mono text-3xl font-medium leading-none text-white sm:text-4xl">{cell.value}</span>
            <span className="countdown__label mt-1.5 font-mono text-xs uppercase tracking-[0.18em] text-white/80 sm:text-sm">
              {cell.label}
            </span>
          </div>
          {i < cells.length - 1 && <span className="countdown__separator font-mono text-white/60">:</span>}
        </div>
      ))}
    </div>
  )
}