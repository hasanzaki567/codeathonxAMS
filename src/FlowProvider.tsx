import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { FlowContext } from './flowContext'
import type { CompetitionId } from './data/competitions'

export function FlowProvider({ children }: { children: ReactNode }) {
  const [detailId, setDetailId] = useState<CompetitionId | null>(null)

  const openDetail = useCallback((id: CompetitionId) => setDetailId(id), [])
  const closeDetail = useCallback(() => setDetailId(null), [])

  const value = useMemo(
    () => ({ detailId, openDetail, closeDetail }),
    [detailId, openDetail, closeDetail],
  )

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}