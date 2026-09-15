import { useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { FlowContext } from './flowContext'
import type { CompetitionId } from './data/competitions'

export function FlowProvider({ children }: { children: ReactNode }) {
  const [detailId, setDetailId] = useState<CompetitionId | null>(null)
  const [wizardOpen, setWizardOpen] = useState(false)
  const [wizardCompetitionId, setWizardCompetitionId] = useState<CompetitionId | null>(null)
  const [openCount, setOpenCount] = useState(0)

  const openDetail = useCallback((id: CompetitionId) => setDetailId(id), [])
  const closeDetail = useCallback(() => setDetailId(null), [])

  const openWizard = useCallback((id?: CompetitionId) => {
    setWizardCompetitionId(id ?? null)
    setOpenCount((c) => c + 1)
    setWizardOpen(true)
  }, [])
  const closeWizard = useCallback(() => setWizardOpen(false), [])

  const value = useMemo(
    () => ({
      detailId,
      wizardOpen,
      wizardCompetitionId,
      openCount,
      openDetail,
      closeDetail,
      openWizard,
      closeWizard,
    }),
    [detailId, wizardOpen, wizardCompetitionId, openCount, openDetail, closeDetail, openWizard, closeWizard],
  )

  return <FlowContext.Provider value={value}>{children}</FlowContext.Provider>
}