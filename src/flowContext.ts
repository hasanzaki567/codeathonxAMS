import { createContext, useContext } from 'react'
import type { CompetitionId } from './data/competitions'

export interface FlowContextValue {
  detailId: CompetitionId | null
  wizardOpen: boolean
  wizardCompetitionId: CompetitionId | null
  openCount: number
  openDetail: (id: CompetitionId) => void
  closeDetail: () => void
  openWizard: (id?: CompetitionId) => void
  closeWizard: () => void
}

export const FlowContext = createContext<FlowContextValue | null>(null)

export function useFlow(): FlowContextValue {
  const ctx = useContext(FlowContext)
  if (!ctx) throw new Error('useFlow must be used within FlowProvider')
  return ctx
}