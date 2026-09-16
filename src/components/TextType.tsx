import { useEffect, useRef, useState } from 'react'

interface TextTypeProps {
  texts?: string[]
  text?: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
  showCursor?: boolean
  cursorCharacter?: string
  cursorBlinkDuration?: number
  variableSpeedEnabled?: boolean
  variableSpeedMin?: number
  variableSpeedMax?: number
  className?: string
  cursorClassName?: string
}

export default function TextType({
  texts,
  text,
  typingSpeed = 75,
  deletingSpeed = 50,
  pauseDuration = 1500,
  showCursor = true,
  cursorCharacter = '_',
  cursorBlinkDuration = 0.5,
  variableSpeedEnabled = false,
  variableSpeedMin = 60,
  variableSpeedMax = 120,
  className = '',
  cursorClassName = '',
}: TextTypeProps) {
  const list = texts && texts.length > 0 ? texts : text ?? []
  const [index, setIndex] = useState(0)
  const [charCount, setCharCount] = useState(0)
  const [deleting, setDeleting] = useState(false)
  const timeoutRef = useRef<number | undefined>(undefined)

  const current = list.length > 0 ? list[index % list.length] : ''

  useEffect(() => {
    if (list.length === 0) return

    if (!deleting && charCount === current.length) {
      timeoutRef.current = window.setTimeout(() => setDeleting(true), pauseDuration)
    } else if (deleting && charCount === 0) {
      setDeleting(false)
      setIndex((i) => (i + 1) % list.length)
    } else {
      const base = deleting ? deletingSpeed : typingSpeed
      const delay = variableSpeedEnabled
        ? variableSpeedMin + Math.random() * (variableSpeedMax - variableSpeedMin)
        : base
      timeoutRef.current = window.setTimeout(() => {
        setCharCount((c) => (deleting ? c - 1 : c + 1))
      }, delay)
    }

    return () => window.clearTimeout(timeoutRef.current)
  }, [
    charCount,
    deleting,
    index,
    list,
    current.length,
    pauseDuration,
    typingSpeed,
    deletingSpeed,
    variableSpeedEnabled,
    variableSpeedMin,
    variableSpeedMax,
  ])

  if (list.length === 0) return null

  const typed = list[index % list.length].slice(0, charCount)
  const caret = showCursor ? cursorCharacter : ''

  return (
    <span className={className}>
      {typed}
      <span
        aria-hidden="true"
        className={`text-type-cursor inline-block ${cursorClassName}`}
        style={{ animationDuration: `${cursorBlinkDuration}s` }}
      >
        {caret}
      </span>
    </span>
  )
}