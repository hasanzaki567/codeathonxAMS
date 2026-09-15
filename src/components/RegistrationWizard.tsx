import { useState } from 'react'
import type { ReactNode } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Download,
  PartyPopper,
  Printer,
  Trash2,
  UserPlus,
} from 'lucide-react'
import { COMPETITION_MAP } from '../data/competitions'
import type { Competition, CompetitionId } from '../data/competitions'
import { EVENT } from '../data/site'
import { useFlow } from '../flowContext'
import { Modal } from './ui/Modal'

interface Participant {
  fullName: string
  email: string
  phone: string
  college: string
  department: string
  year: string
  studentId: string
}

const EMPTY_PARTICIPANT: Participant = {
  fullName: '',
  email: '',
  phone: '',
  college: '',
  department: '',
  year: '',
  studentId: '',
}

interface Registration {
  id: string
  competitionId: CompetitionId
  competition: string
  feePerParticipant: number
  team: {
    name: string
    leader: Participant
    members: string[]
    size: number
    totalFee: number
  }
  payment: { status: 'pending' | 'confirmed'; mode: string }
  createdAt: string
}

const STEP_LABELS = ['Competition', 'Details', 'Team', 'Review', 'Done']
const COMP_CODES: Record<CompetitionId, string> = {
  'crack-the-code': 'CDE',
  hackathon: 'HKT',
  techforge: 'TFG',
}

function loadRegistrations(): Registration[] {
  try {
    const raw = localStorage.getItem('amsfrost-registrations')
    return raw ? (JSON.parse(raw) as Registration[]) : []
  } catch {
    return []
  }
}

function generateId(competitionId: CompetitionId): string {
  const random = Math.random().toString(36).slice(2, 8).toUpperCase()
  return `AMS26-${COMP_CODES[competitionId]}-${random}`
}

export function RegistrationWizard() {
  const { wizardOpen, closeWizard, wizardCompetitionId, openCount } = useFlow()

  return (
    <Modal open={wizardOpen} onClose={closeWizard} wide>
      <WizardBody key={openCount} presetCompetitionId={wizardCompetitionId} />
    </Modal>
  )
}

function WizardBody({ presetCompetitionId }: { presetCompetitionId: CompetitionId | null }) {
  const { closeWizard } = useFlow()

  const [competitionId, setCompetitionId] = useState<CompetitionId | null>(presetCompetitionId)
  const [step, setStep] = useState(presetCompetitionId ? 1 : 0)
  const [participant, setParticipant] = useState<Participant>(EMPTY_PARTICIPANT)
  const [teamName, setTeamName] = useState('')
  const [members, setMembers] = useState<string[]>([''])
  const [duo, setDuo] = useState(true)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [registration, setRegistration] = useState<Registration | null>(null)
  const [submitting, setSubmitting] = useState(false)

  const competition: Competition | null = competitionId ? COMPETITION_MAP[competitionId] : null
  const maxMembers = competition?.maxMembers ?? 0
  const memberSlots = competition ? Math.max(0, maxMembers - 1) : 0
  const presentMembers = members.slice(0, memberSlots).filter((m) => m.trim() !== '')
  const size = competition ? Math.max(1, 1 + presentMembers.length) : 0
  const totalFee = (competition?.feeAmount ?? 0) * size

  const canProceed =
    (step === 0 && competitionId !== null) ||
    (step === 1 &&
      participant.fullName.trim() !== '' &&
      /^\S+@\S+\.\S+$/.test(participant.email) &&
      participant.phone.replace(/\D/g, '').length >= 10 &&
      participant.college.trim() !== '' &&
      participant.department.trim() !== '' &&
      participant.year.trim() !== '' &&
      participant.studentId.trim() !== '') ||
    (step === 2 && validTeam()) ||
    step === 3

  function validTeam() {
    if (!competition) return false
    if (competitionId === 'crack-the-code') return duo ? (members[0] ?? '').trim() !== '' : true
    return presentMembers.length >= competition.minMembers - 1
  }

  function next() {
    if (!canProceed) {
      const nextErrors: Record<string, string> = {}
      if (step === 1) {
        if (!participant.fullName.trim()) nextErrors.fullName = 'Required'
        if (!/^\S+@\S+\.\S+$/.test(participant.email)) nextErrors.email = 'Enter a valid email'
        if (participant.phone.replace(/\D/g, '').length < 10) nextErrors.phone = 'Enter a valid phone number'
        if (!participant.college.trim()) nextErrors.college = 'Required'
        if (!participant.department.trim()) nextErrors.department = 'Required'
        if (!participant.year.trim()) nextErrors.year = 'Required'
        if (!participant.studentId.trim()) nextErrors.studentId = 'Required'
      }
      setErrors(nextErrors)
      return
    }
    setErrors({})
    if (step < 3) {
      setStep(step + 1)
    } else {
      submit()
    }
  }

  function back() {
    setErrors({})
    setStep(Math.max(0, step - 1))
  }

  function submit() {
    if (!competition) return
    setSubmitting(true)
    const reg: Registration = {
      id: generateId(competition.id),
      competitionId: competition.id,
      competition: competition.name,
      feePerParticipant: competition.feeAmount,
      team: {
        name: resolveTeamName(),
        leader: participant,
        members: presentMembers,
        size,
        totalFee,
      },
      payment: { status: 'pending', mode: 'TBD' },
      createdAt: new Date().toISOString(),
    }
    const all = loadRegistrations()
    all.push(reg)
    localStorage.setItem('amsfrost-registrations', JSON.stringify(all))
    setRegistration(reg)
    setStep(4)
    setSubmitting(false)
  }

  function resolveTeamName() {
    const trimmed = teamName.trim()
    if (trimmed) return trimmed
    const first = participant.fullName.trim().split(' ')[0]
    if (competitionId === 'crack-the-code') return duo ? `${first || 'My'}'s Duo` : 'Solo Entry'
    return `${first || 'My'}'s Team`
  }

  const setField = (key: keyof Participant, value: string) => setParticipant((p) => ({ ...p, [key]: value }))

  return (
    <div className="flex min-h-full flex-col">
      {step < 4 && <StepIndicator step={step} />}

      <div className="flex-1 p-6 sm:p-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <Step key="s0" title="Choose Competition" subtitle="Pick the challenge you want to enter.">
              <div className="grid gap-3">
                {Object.values(COMPETITION_MAP).map((c) => {
                  const active = competitionId === c.id
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => setCompetitionId(c.id)}
                      className={`flex items-center justify-between gap-4 rounded-xl border p-4 text-left transition-all duration-200 ${
                        active ? 'border-accent-deep bg-accent-tint' : 'border-line bg-surface hover:border-ink/20'
                      }`}
                    >
                      <div>
                        <p className="font-display text-base font-bold tracking-tight text-ink">{c.name}</p>
                        <p className="mt-0.5 text-sm text-muted">
                          {c.category} · {c.teamSize}
                        </p>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-sm text-ink">{c.fee}</span>
                        <span
                          className={`grid h-6 w-6 place-items-center rounded-full border transition-colors ${
                            active ? 'border-accent-deep bg-accent-deep text-white' : 'border-line text-transparent'
                          }`}
                        >
                          <Check className="h-3.5 w-3.5" />
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>
            </Step>
          )}

          {step === 1 && (
            <Step key="s1" title="Participant Details" subtitle="The team leader's details.">
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Full Name" id="fullName" error={errors.fullName} className="sm:col-span-2">
                  <input
                    id="fullName"
                    value={participant.fullName}
                    onChange={(e) => setField('fullName', e.target.value)}
                    className={inputClass(!!errors.fullName)}
                    placeholder="Your full name"
                  />
                </Field>
                <Field label="Email" id="email" error={errors.email} className="sm:col-span-2">
                  <input
                    id="email"
                    type="email"
                    value={participant.email}
                    onChange={(e) => setField('email', e.target.value)}
                    className={inputClass(!!errors.email)}
                    placeholder="you@college.edu"
                  />
                </Field>
                <Field label="Phone" id="phone" error={errors.phone}>
                  <input
                    id="phone"
                    type="tel"
                    value={participant.phone}
                    onChange={(e) => setField('phone', e.target.value)}
                    className={inputClass(!!errors.phone)}
                    placeholder="+91 ··· ··· ····"
                  />
                </Field>
                <Field label="College" id="college" error={errors.college}>
                  <input
                    id="college"
                    value={participant.college}
                    onChange={(e) => setField('college', e.target.value)}
                    className={inputClass(!!errors.college)}
                    placeholder="Your college"
                  />
                </Field>
                <Field label="Department" id="department" error={errors.department}>
                  <input
                    id="department"
                    value={participant.department}
                    onChange={(e) => setField('department', e.target.value)}
                    className={inputClass(!!errors.department)}
                    placeholder="CSE / ECE / …"
                  />
                </Field>
                <Field label="Year" id="year" error={errors.year}>
                  <select
                    id="year"
                    value={participant.year}
                    onChange={(e) => setField('year', e.target.value)}
                    className={inputClass(!!errors.year)}
                  >
                    <option value="">Select year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                    <option value="other">Other</option>
                  </select>
                </Field>
                <Field label="Student ID" id="studentId" error={errors.studentId}>
                  <input
                    id="studentId"
                    value={participant.studentId}
                    onChange={(e) => setField('studentId', e.target.value)}
                    className={inputClass(!!errors.studentId)}
                    placeholder="Valid college ID number"
                  />
                </Field>
              </div>
            </Step>
          )}

          {step === 2 && (
            <Step
              key="s2"
              title="Team Details"
              subtitle={
                competitionId === 'crack-the-code'
                  ? 'Enter solo or choose a partner.'
                  : `Add up to ${memberSlots} team members.`
              }
            >
              <Field label="Team Name" id="teamName" hint="Optional">
                <input
                  id="teamName"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className={inputClass(false)}
                  placeholder="e.g. Null Pointers"
                />
              </Field>

              {competitionId === 'crack-the-code' ? (
                <>
                  <div className="mt-5">
                    <div className="flex w-fit gap-1 rounded-full border border-line bg-mist p-1">
                      {(['solo', 'duo'] as const).map((mode) => (
                        <button
                          key={mode}
                          type="button"
                          onClick={() => setDuo(mode === 'duo')}
                          className={`rounded-full px-5 py-2 text-sm font-medium transition-colors ${
                            (mode === 'duo') === duo ? 'bg-surface text-ink shadow-sm' : 'text-muted hover:text-ink'
                          }`}
                        >
                          {mode === 'solo' ? 'Solo' : 'Duo (2 members)'}
                        </button>
                      ))}
                    </div>
                  </div>
                  {duo && (
                    <div className="mt-6">
                      <p className="mb-2 font-mono text-[11px] uppercase tracking-[0.2em] text-soft">Partner</p>
                      <input
                        aria-label="Partner name"
                        value={members[0] ?? ''}
                        onChange={(e) => setMembers([e.target.value])}
                        className={inputClass(false)}
                        placeholder="Partner name"
                      />
                    </div>
                  )}
                </>
              ) : (
                <div className="mt-6">
                  <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.2em] text-soft">
                    Team Members
                    <span className="ml-2 normal-case tracking-normal text-muted">
                      {presentMembers.length} of {memberSlots} added
                    </span>
                  </p>
                  <div className="space-y-2.5">
                    {members.slice(0, memberSlots).map((member, i) => (
                      <div key={i} className="flex items-center gap-2.5">
                        <div className="relative flex-1">
                          <span className="pointer-events-none absolute left-3.5 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center rounded-md bg-mist font-mono text-xs text-muted">
                            {i + 2}
                          </span>
                          <input
                            aria-label={`Member ${i + 2}`}
                            value={member}
                            onChange={(e) => {
                              const copy = [...members]
                              copy[i] = e.target.value
                              setMembers(copy)
                            }}
                            className={`${inputClass(false)} pl-12`}
                            placeholder="Member name"
                          />
                        </div>
                        {(members.length > 1 || i !== 0) && (
                          <button
                            type="button"
                            onClick={() => setMembers(members.filter((_, idx) => idx !== i))}
                            aria-label={`Remove member ${i + 2}`}
                            className="grid h-10 w-10 place-items-center rounded-lg border border-line text-muted transition-colors hover:border-red-300 hover:text-red-500"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                  {members.length < memberSlots && (
                    <button
                      type="button"
                      onClick={() => setMembers((m) => [...m, ''])}
                      className="mt-3 inline-flex items-center gap-2 text-sm font-medium text-accent-ink transition-colors hover:text-accent-deep"
                    >
                      <UserPlus className="h-4 w-4" />
                      Add member
                    </button>
                  )}
                </div>
              )}
            </Step>
          )}

          {step === 3 && competition && (
            <Step key="s3" title="Review" subtitle="Check everything is correct before you submit.">
              <dl className="divide-y divide-line rounded-xl border border-line">
                <Row label="Competition">
                  <div className="text-right">
                    <p className="text-sm font-semibold text-ink">{competition.name}</p>
                    <p className="text-xs text-muted">{competition.category}</p>
                  </div>
                </Row>
                <Row label="Team">
                  <p className="text-sm font-semibold text-ink">{resolveTeamName()}</p>
                </Row>
                <Row label="Team Size">
                  <p className="text-sm font-semibold text-ink">
                    {size} {size === 1 ? 'participant' : 'participants'}
                  </p>
                </Row>
                <Row label="Participants">
                  <ul className="text-right text-sm text-ink">
                    <li className="font-medium">
                      {participant.fullName || '—'} <span className="text-xs text-soft">(Leader)</span>
                    </li>
                    {presentMembers.map((m) => (
                      <li key={m} className="text-muted">
                        {m}
                      </li>
                    ))}
                  </ul>
                </Row>
                <Row label="College">
                  <p className="text-sm font-semibold text-ink">{participant.college || '—'}</p>
                </Row>
                <Row label="Fee">
                  <p className="font-mono text-sm font-semibold text-ink">
                    ₹{totalFee.toLocaleString('en-IN')}
                    <span className="ml-1.5 text-xs font-normal text-muted">
                      ({competition.feeAmount} × {size})
                    </span>
                  </p>
                </Row>
              </dl>
              <p className="mt-4 text-xs text-muted">
                Payment status will be confirmed by the organizing team after submission.
              </p>
            </Step>
          )}

          {step === 4 && registration && (
            <Step key="s4" title="You're registered." done>
              <Confirmation registration={registration} />
            </Step>
          )}
        </AnimatePresence>
      </div>

      {step < 4 && (
        <div className="flex items-center justify-between gap-4 border-t border-line bg-mist/60 px-6 py-4 sm:px-10">
          <button
            type="button"
            onClick={step === 0 ? closeWizard : back}
            className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-muted transition-colors hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            {step === 0 ? 'Cancel' : 'Back'}
          </button>
          <button
            type="button"
            onClick={next}
            disabled={submitting}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-7 py-3 text-sm font-semibold text-night transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 disabled:hover:scale-100"
          >
            {step === 3 ? 'Submit Registration' : 'Continue'}
            {step === 3 ? <Check className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
          </button>
        </div>
      )}
    </div>
  )
}

function StepIndicator({ step }: { step: number }) {
  return (
    <div className="border-b border-line bg-surface px-6 pt-6 sm:px-10">
      <ol className="flex items-center gap-1">
        {STEP_LABELS.map((label, i) => {
          const done = i < step
          const current = i === step
          return (
            <li key={label} className="flex flex-1 items-center gap-1 last:flex-none">
              <div className="flex flex-col items-center gap-1.5">
                <span
                  className={`grid h-7 w-7 place-items-center rounded-full font-mono text-xs font-semibold transition-colors ${
                    done ? 'bg-accent text-night' : current ? 'bg-night text-white' : 'bg-mist text-soft'
                  }`}
                >
                  {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
                </span>
                <span className={`hidden text-[11px] sm:block ${current ? 'font-medium text-ink' : 'text-soft'}`}>
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <span className={`mx-1 mb-4 hidden h-px flex-1 sm:block ${done ? 'bg-accent' : 'bg-line'}`} />
              )}
            </li>
          )
        })}
      </ol>
    </div>
  )
}

function Step({
  title,
  subtitle,
  done,
  children,
}: {
  title: string
  subtitle?: string
  done?: boolean
  children: ReactNode
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -16 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
    >
      {!done && (
        <div className="mb-6">
          <h3 className="font-display text-2xl font-bold tracking-tight text-ink sm:text-3xl">{title}</h3>
          {subtitle && <p className="mt-1.5 text-sm text-muted">{subtitle}</p>}
        </div>
      )}
      {children}
    </motion.div>
  )
}

function Field({
  label,
  id,
  error,
  hint,
  className,
  children,
}: {
  label: string
  id: string
  error?: string
  hint?: string
  className?: string
  children: ReactNode
}) {
  return (
    <div className={className}>
      <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {error && <span className="ml-2 text-xs font-normal text-red-500">{error}</span>}
      </label>
      {children}
      {hint && !error && <p className="mt-1 text-xs text-soft">{hint}</p>}
    </div>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 px-4 py-3.5 sm:px-5">
      <dt className="font-mono text-[11px] uppercase tracking-[0.18em] text-soft">{label}</dt>
      <dd className="min-w-0">{children}</dd>
    </div>
  )
}

function inputClass(hasError: boolean) {
  return `h-11 w-full rounded-xl border bg-surface px-3.5 text-sm text-ink placeholder:text-soft transition-colors focus:outline-none focus:ring-2 focus:ring-accent-deep/30 ${
    hasError ? 'border-red-400' : 'border-line hover:border-ink/25'
  }`
}

function Confirmation({ registration }: { registration: Registration }) {
  const { closeWizard } = useFlow()

  function printConfirmation() {
    window.print()
  }

  function downloadConfirmation() {
    const lines = [
      `${EVENT.name} ${EVENT.year} — Registration Confirmation`,
      '------------------------------------------',
      `Registration ID : ${registration.id}`,
      `Competition      : ${registration.competition}`,
      `Team             : ${registration.team.name}`,
      `Team Size        : ${registration.team.size}`,
      `Leader           : ${registration.team.leader.fullName}`,
      `Email            : ${registration.team.leader.email}`,
      `Phone            : ${registration.team.leader.phone}`,
      `College          : ${registration.team.leader.college}`,
      `Department       : ${registration.team.leader.department}`,
      `Year             : ${registration.team.leader.year}`,
      `Student ID       : ${registration.team.leader.studentId}`,
      `Total Fee        : ₹${registration.team.totalFee.toLocaleString('en-IN')}`,
      `Payment Status   : Pending (to be confirmed)`,
      '',
      'Keep this confirmation for check-in on 01 October 2026.',
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `${registration.id}-confirmation.txt`
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <div className="text-center">
      <div className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-accent">
        <PartyPopper className="h-7 w-7 text-night" />
      </div>
      <h3 className="mt-6 font-display text-3xl font-bold tracking-tight text-ink">You're registered.</h3>
      <p className="mt-2 text-sm text-muted">Keep your confirmation details safe — you'll need them at check-in.</p>

      <div className="print-area mx-auto mt-8 max-w-md rounded-2xl border border-line p-6 text-left">
        <div className="flex items-center justify-between border-b border-dashed border-line pb-4">
          <p className="font-display text-sm font-bold tracking-tight text-ink">
            {EVENT.name} {EVENT.year}
          </p>
          <span className="rounded-full bg-accent-tint px-3 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-accent-ink">
            {registration.payment.status}
          </span>
        </div>
        <dl className="divide-y divide-line">
          <ConfRow label="Registration ID" value={registration.id} mono />
          <ConfRow label="Competition" value={registration.competition} />
          <ConfRow label="Team" value={registration.team.name} />
          <ConfRow label="Participants" value={`${registration.team.size}`} />
          <ConfRow label="Leader" value={registration.team.leader.fullName} />
          <ConfRow label="College" value={registration.team.leader.college} />
          <ConfRow label="Fee" value={`₹${registration.team.totalFee.toLocaleString('en-IN')}`} mono />
          <ConfRow label="Payment Status" value="Pending · to be confirmed" />
          <ConfRow label="Event Date" value="01 OCT 2026" />
        </dl>
      </div>

      <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
        <button
          type="button"
          onClick={downloadConfirmation}
          className="inline-flex items-center justify-center gap-2 rounded-full bg-night px-6 py-3 text-sm font-semibold text-white transition-transform duration-200 hover:scale-[1.02] active:scale-[0.98]"
        >
          <Download className="h-4 w-4" />
          Download
        </button>
        <button
          type="button"
          onClick={printConfirmation}
          className="inline-flex items-center justify-center gap-2 rounded-full border border-line px-6 py-3 text-sm font-semibold text-ink transition-colors hover:border-ink/30"
        >
          <Printer className="h-4 w-4" />
          Print
        </button>
        <button
          type="button"
          onClick={closeWizard}
          className="inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-muted transition-colors hover:text-ink"
        >
          Done
        </button>
      </div>
    </div>
  )
}

function ConfRow({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-2.5">
      <dt className="text-xs text-muted">{label}</dt>
      <dd className={`text-right text-sm font-medium text-ink ${mono ? 'font-mono' : ''}`}>{value}</dd>
    </div>
  )
}