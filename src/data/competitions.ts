import crackTheCodeImage from '../assets/crackTheCode.jpeg'
import hackImage from '../assets/hack.jpeg'
import techforgeImage from '../assets/techforge.jpeg'

export type CompetitionId = 'crack-the-code' | 'hackathon' | 'techforge'

export interface ScoringCriterion {
  label: string
  weight: number
}

export interface CompetitionPrize {
  place: string
  amount: string
  note: string
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
  prizes: CompetitionPrize[]
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

export const EVENT_PRIZES: CompetitionPrize[] = [
  { place: '1st Prize', amount: '₹5,000', note: 'Cash prize for the winning team.' },
  { place: '2nd Prize', amount: '₹2,500', note: 'Cash prize for the runner-up team.' },
  { place: 'Best Performance', amount: '₹1,000', note: 'Awarded for the standout individual or team.' },
]

export const COMPETITIONS: Competition[] = [
  {
    id: 'crack-the-code',
    index: '01',
    name: 'CRACK THE CODE',
    category: 'Coding & Debugging',
    teamSize: 'Individual / 2',
    image: crackTheCodeImage,
    tagline: 'Solve. Optimize. Outthink.',
    description: 'A timed battle of logic, speed, and precision across three rounds of increasing difficulty.',
    fee: '₹150 / participant',
    feeAmount: 150,
    minMembers: 1,
    maxMembers: 2,
    cta: 'View Challenge',
    symbol: '{ }',
    stages: ['Round 1 · Warm-up', 'Round 2 · Advanced', 'Round 3 · Final Challenge'],
    prizes: EVENT_PRIZES,
    scoring: [
      { label: 'Correctness', weight: 35 },
      { label: 'Problem-solving', weight: 30 },
      { label: 'Code efficiency', weight: 20 },
      { label: 'Time management', weight: 15 },
    ],
    details: {
      eligibility: [
        'Open to students of any college',
        'Teams of 1–2 members',
        'Valid Student ID required at check-in',
      ],
      teamSize: '1–2 members',
      procedure: [
        'R1 · Warm-up — solve timed coding challenges on foundational problems',
        'R2 · Advanced — difficulty increases with tougher coding challenges',
        'R3 · Final Challenge — the hardest problem decides the winner',
      ],
      rules: [
        'Solve the given coding challenges within the specified time limit',
        'The event consists of 3 rounds with progressively increasing difficulty',
        'Time is a critical factor and may be considered when determining points or rankings',
        'Languages allowed: Python, C++, and Java',
        'Use of AI tools is strictly prohibited — solve the problems independently',
        'Follow all instructions provided by the event coordinators',
        'Any malpractice leads to immediate disqualification',
        'Jury and organizing committee decisions are final',
      ],
      evaluationNote:
        'Ranked on correctness, problem-solving ability, code efficiency, and time management across three rounds of increasing difficulty.',
    },
  },
  {
    id: 'hackathon',
    index: '02',
    name: 'HACKQUEST',
    category: 'Software & Innovation',
    teamSize: '2–4 Members',
    image: hackImage,
    tagline: 'Find a problem. Build the solution.',
    description: 'An open-innovation build sprint across technology domains.',
    fee: '₹150 / participant',
    feeAmount: 150,
    minMembers: 2,
    maxMembers: 4,
    cta: 'View Challenge',
    symbol: '>>_',
    stages: ['Idea & PPT', 'Feasibility & Development', 'Final Presentation & Demo'],
    prizes: EVENT_PRIZES,
    domains: ['AI/ML', 'Cybersecurity', 'EdTech', 'HealthTech', 'FinTech', 'IoT', 'Open Innovation'],
    scoring: [
      { label: 'Innovation & Originality', weight: 20 },
      { label: 'Technical Implementation', weight: 20 },
      { label: 'Development & Functionality', weight: 15 },
      { label: 'Presentation & Demonstration', weight: 15 },
      { label: 'Feasibility', weight: 10 },
      { label: 'Problem-Solving Approach', weight: 10 },
      { label: 'Future Scope', weight: 10 },
    ],
    details: {
      eligibility: [
        'Open to students of any college',
        'Teams of 2–4 members',
        'All team members must carry a valid Student ID',
      ],
      teamSize: '2–4 members',
      procedure: [
        'R1 · Idea & PPT — present your project idea using the official PPT format/template',
        'R2 · Feasibility & Development — demonstrate the feasibility and technical approach with implementation progress',
        'R3 · Final Presentation & Demonstration — present the completed project with a working prototype or demo',
      ],
      rules: [
        'The hackathon follows an Open Innovation format',
        'Teams are free to choose and develop a project based on their own ideas',
        'Pre-built projects are allowed if you clearly demonstrate your contribution and development during the hackathon',
        'A PowerPoint Presentation (PPT) is mandatory',
        'The presentation must follow the official PPT format/template provided by the organizers',
        'The hackathon consists of 3 rounds',
        'Any malpractice leads to immediate disqualification',
        'Jury and organizing committee decisions are final',
      ],
      evaluationNote:
        'Judged on innovation & originality, technical implementation, feasibility, development & functionality, problem-solving approach, presentation & demonstration, and future scope.',
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
    fee: '₹150 / participant',
    feeAmount: 150,
    minMembers: 2,
    maxMembers: 4,
    cta: 'View Challenge',
    symbol: '◇▱',
    stages: ['Concept & Design', 'Prototype Build', 'Live Demo'],
    prizes: EVENT_PRIZES,
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
      suggestedDomains: ['Robotics', 'IoT', 'EV', 'Automation', 'Energy', 'Smart Systems', 'Open Innovation'],
    },
  },
]

export const COMPETITION_MAP: Record<CompetitionId, Competition> = Object.fromEntries(
  COMPETITIONS.map((c) => [c.id, c]),
) as Record<CompetitionId, Competition>