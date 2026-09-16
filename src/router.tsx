import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { AnchorHTMLAttributes, MouseEvent as ReactMouseEvent, ReactNode } from 'react'

interface RouterContextValue {
  path: string
  search: URLSearchParams
  navigate: (to: string, options?: { scroll?: boolean }) => void
}

const RouterContext = createContext<RouterContextValue | null>(null)

function readLocation(): string {
  return window.location.pathname + window.location.search
}

function toPath(location: string): string {
  const raw = location.split('?')[0]
  return raw.length > 1 ? raw.replace(/\/+$/, '') : raw
}

export function RouterProvider({ children }: { children: ReactNode }) {
  const [location, setLocation] = useState(readLocation)

  useEffect(() => {
    const onPop = () => setLocation(readLocation())
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to: string, options?: { scroll?: boolean }) => {
    const next = to.startsWith('/') ? to : `/${to}`
    if (readLocation() === next) return
    window.history.pushState({}, '', next)
    setLocation(next)
    if (options?.scroll !== false) {
      window.scrollTo({ top: 0 })
    }
  }, [])

  const value = useMemo<RouterContextValue>(() => {
    const queryIndex = location.indexOf('?')
    const search = new URLSearchParams(queryIndex === -1 ? '' : location.slice(queryIndex + 1))
    return { path: toPath(location), search, navigate }
  }, [location, navigate])

  return <RouterContext.Provider value={value}>{children}</RouterContext.Provider>
}

export function useRouter(): RouterContextValue {
  const ctx = useContext(RouterContext)
  if (!ctx) throw new Error('useRouter must be used within RouterProvider')
  return ctx
}

interface LinkProps extends Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> {
  to: string
}

export function Link({ to, onClick, children, ...rest }: LinkProps) {
  const { navigate } = useRouter()

  function handleClick(e: ReactMouseEvent<HTMLAnchorElement>) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return
    e.preventDefault()
    onClick?.(e)
    navigate(to)
  }

  return (
    <a href={to} onClick={handleClick} {...rest}>
      {children}
    </a>
  )
}