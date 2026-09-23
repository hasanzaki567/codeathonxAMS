export interface FaqItem {
  q: string
  a: string
  editable?: boolean
}

// Items flagged editable hold placeholder answers to be confirmed against the official proposal.
export const FAQ_ITEMS: FaqItem[] = [
  {
    q: 'Who can participate?',
    a: 'Students of Aalim Muhammed Salegh College of Engineering and, as an inter-college challenge, students of all other colleges as well.',
  },
  {
    q: 'Can students from other colleges participate?',
    a: 'Yes. AMS Codeathon is an inter-college challenge open to students from any institution.',
  },
  {
    q: 'What is the team size?',
    a: 'Crack the Code — 1–2 participants · Hackathon — 2–5 members · TechForge — 2–4 members.',
  },
  {
    q: 'What is the registration fee?',
    a: 'All events — ₹150 per participant.',
  },
  {
    q: 'Can I participate in more than one competition?',
    a: 'no, one can participate in one event only ',

  },
  {
    q: 'What should I bring?',
    a: ' a good lunch , working laptop and extension box ',
  },
  {
    q: 'Is a college ID required?',
    a: 'Yes, a valid college Student ID is required for verification at check-in.',
  },
  {
    q: 'Are certificates provided?',
    a: 'Yes — participation certificates are awarded to eligible registered participants.',
  },
  {
    q: 'Are internships available?',
    a: 'Internship opportunities are being arranged for outstanding performance. Details will be announced.',
  },
  {
    q: 'Can interdisciplinary teams participate?',
    a: 'Interdisciplinary teams are encouraged — there is a dedicated Best Interdisciplinary Team recognition.',
  },
]