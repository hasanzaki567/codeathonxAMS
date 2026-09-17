import crackTheCodeImage from '../assets/crackTheCode.jpeg'
import hackathonImage from '../assets/hackathon.jpeg'
import techforgeImage from '../assets/techforge.jpeg'

export type CompetitionId = 'crack-the-code' | 'hackathon' | 'techforge'

export interface ScoringCriterion {
  label: string
  weight: number
}

export interface Competition {
  id: CompetitionId
  index: string
  name: string
  category: string
  teamSize: string
  image: string
  tagline: string
  description: string
  fee: string
  feeAmount: number
  minMembers: number
  maxMembers: number
  cta: string
  symbol: string
  stages: string[]
  domains?: string[]
  scoring: ScoringCriterion[]
  details: {
    eligibility: string[]
    teamSize: string
    procedure: string[]
    rules: string[]
    evaluationNote: string
    suggestedDomains?: string[]
  }
}

export const COMPETITIONS: Competition[] = [
  {
    id: 'crack-the-code',
    index: '01',
    name: 'CRACK THE CODE',
    category: 'Coding & Debugging',
    teamSize: 'Individual / 2',
    image: crackTheCodeImage,
    tagline: 'Solve. Debug. Outthink.',
    description: 'A timed battle of logic, speed, and precision across three rounds.',
    fee: '₹100 / participant',
    feeAmount: 100,
    minMembers: 1,
    maxMembers: 2,
    cta: 'View Challenge',
    symbol: '{ }',
    stages: ['Code Sprint', 'Debugging Arena', 'Final Code Challenge'],
    scoring: [
      { label: 'Correctness', weight: 40 },
      { label: 'Problem-solving', weight: 25 },
      { label: 'Code efficiency', weight: 15 },
      { label: 'Debugging', weight: 10 },
      { label: 'Time management', weight: 10 },
    ],
    details: {
      eligibility: [
        'Open to students of any college',
        'Can be played solo or as a duo (1–2 participants)',
        'Valid Student ID required at check-in',
      ],
      teamSize: '1–2 participants',
      procedure: [
        'R1 · Code Sprint — timed competitive coding against the clock',
        'R2 · Debugging Arena — spot and fix bugs in broken code',
        'R3 · Final Code Challenge — one complex problem, best solution wins',
      ],
      rules: [
        'All submissions must be original work',
        'No copying or unauthorized assistance from other participants',
        'Reference materials and internet use are allowed only where stated per round',
        'Strict per-round deadlines — late submissions are not accepted',
        'Any malpractice leads to immediate disqualification',
        'Jury and organizing committee decisions are final',
      ],
      evaluationNote:
        'Ranked by correctness of output first, then problem-solving, efficiency, debugging accuracy, and speed.',
    },
  },
  {
    id: 'hackathon',
    index: '02',
    name: 'HACKATHON',
    category: 'Software & Innovation',
    teamSize: '2–5 Members',
    image: hackathonImage,
    tagline: 'Find a problem. Build the solution.',
    description: 'A full-day build sprint across technology domains.',
    fee: '₹200 / participant',
    feeAmount: 200,
    minMembers: 2,
    maxMembers: 5,
    cta: 'View Challenge',
    symbol: '>>_',
    stages: ['Problem Identification', 'Prototype Build', 'Pitch & Demo'],
    domains: ['AI/ML', 'Cybersecurity', 'EdTech', 'HealthTech', 'FinTech', 'IoT', 'Open Innovation'],
    scoring: [
      { label: 'Problem Identification', weight: 15 },
      { label: 'Innovation', weight: 20 },
      { label: 'Technical Implementation', weight: 25 },
      { label: 'Functionality & Demo', weight: 15 },
      { label: 'Impact & Scalability', weight: 10 },
      { label: 'UI/UX', weight: 5 },
      { label: 'Presentation & Q&A', weight: 10 },
    ],
    details: {
      eligibility: [
        'Open to students of any college',
        'Teams of 2–5 members',
        'All team members must carry a valid Student ID',
      ],
      teamSize: '2–5 members',
      procedure: [
        'Ideate — identify a real problem in a chosen domain',
        'Build — develop a working software solution',
        'Pitch — present the product and demo it to the jury',
      ],
      rules: [
        'All submitted work must be built during the event window',
        'No copying, resubmission, or unauthorized assistance',
        'AI and internet use are permitted only where explicitly stated',
        'Deadlines are strict — demos after the cut-off are disqualified',
        'Any malpractice leads to immediate disqualification',
        'Jury and organizing committee decisions are final',
      ],
      evaluationNote:
        'Judged on the problem, innovation, implementation quality, a working demo, and how well it could scale.',
      suggestedDomains: ['AI/ML', 'Cybersecurity', 'EdTech', 'HealthTech', 'FinTech', 'IoT', 'Open Innovation'],
    },
  },
  {
    id: 'techforge',
    index: '03',
    name: 'TECHFORGE',
    category: 'Hardware & Engineering',
    teamSize: '2–4 Members',
    image: techforgeImage,
    tagline: 'Design. Build. Demonstrate.',
    description: 'Turn ideas into working hardware in a single day.',
    fee: '₹200 / participant',
    feeAmount: 200,
    minMembers: 2,
    maxMembers: 4,
    cta: 'View Challenge',
    symbol: '◇▱',
    stages: ['Concept & Design', 'Prototype Build', 'Live Demo'],
    domains: ['Robotics', 'IoT', 'EV', 'Automation', 'Energy', 'Smart Systems'],
    scoring: [
      { label: 'Problem Relevance', weight: 10 },
      { label: 'Innovation & Creativity', weight: 15 },
      { label: 'Engineering Design', weight: 20 },
      { label: 'Technical Implementation', weight: 20 },
      { label: 'Working Prototype & Demo', weight: 20 },
      { label: 'Practicality & Scalability', weight: 5 },
      { label: 'Presentation & Q&A', weight: 10 },
    ],
    details: {
      eligibility: [
        'Open to students of any college',
        'Teams of 2–4 members',
        'All team members must carry a valid Student ID',
      ],
      teamSize: '2–4 members',
      procedure: [
        'Design — define the system and its purpose',
        'Build — assemble a working prototype',
        'Demonstrate — show a live demo to the jury',
      ],
      rules: [
        'All work must be original and produced during the event window',
        'No copying or unauthorized assistance from other teams',
        'Materials and tool usage follow the rules announced at the event',
        'Deadlines are strict — protototypes after the cut-off are disqualified',
        'Any malpractice leads to immediate disqualification',
        'Jury and organizing committee decisions are final',
      ],
      evaluationNote:
        'Judged on relevance, design maturity, a working prototype demo, and whether the build could scale.',
      suggestedDomains: ['Robotics', 'IoT', 'EV', 'Automation', 'Energy', 'Smart Systems'],
    },
  },
]

export const COMPETITION_MAP: Record<CompetitionId, Competition> = Object.fromEntries(
  COMPETITIONS.map((c) => [c.id, c]),
) as Record<CompetitionId, Competition>