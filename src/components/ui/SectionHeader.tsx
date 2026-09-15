interface SectionHeaderProps {
  label?: string
  heading: string
  sub?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export function SectionHeader({ label, heading, sub, align = 'left', dark = false }: SectionHeaderProps) {
  return (
    <div className={align === 'center' ? 'text-center mx-auto max-w-2xl' : 'max-w-2xl'}>
      {label && (
        <p className={`font-mono text-[11px] sm:text-xs tracking-[0.25em] uppercase ${dark ? 'text-accent' : 'text-accent-ink'}`}>
          {label}
        </p>
      )}
      <h2
        className={`font-display font-bold tracking-tight text-3xl sm:text-4xl md:text-5xl mt-4 text-balance ${
          dark ? 'text-white' : 'text-ink'
        }`}
      >
        {heading}
      </h2>
      {sub && <p className={`mt-4 text-base sm:text-lg ${dark ? 'text-white/60' : 'text-muted'}`}>{sub}</p>}
    </div>
  )
}