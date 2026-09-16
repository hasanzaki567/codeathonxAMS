export type TimelineState = 'confirmed' | 'pending'

export interface TimelineItem {
  key: string
  label: string
  date: string
  note: string
  state: TimelineState
  editable: boolean
}

// Dates marked TBA are placeholders. Update them here when confirmed by the organizers.
export const TIMELINE: TimelineItem[] = [
  {
    key: 'opens',
    label: 'Registration Opens',
    date: 'TBA',
    note: 'Registration opens for all three competitions',
    state: 'pending',
    editable: true,
  },
  {
    key: 'closes',
    label: 'Registration Closes',
    date: 'TBA',
    note: 'Final date to confirm participation',
    state: 'pending',
    editable: true,
  },
  {
    key: 'shortlist',
    label: 'Shortlist / Confirmation',
    date: 'TBA',
    note: 'Registered teams receive confirmation',
    state: 'pending',
    editable: true,
  },
  {
    key: 'event-day',
    label: 'Event Day',
    date: '01 OCT 2026',
    note: 'AMS Codeathon 2026',
    state: 'confirmed',
    editable: false,
  },
  {
    key: 'results',
    label: 'Results & Awards',
    date: 'TBA',
    note: 'Results announced at the closing ceremony',
    state: 'pending',
    editable: true,
  },
]