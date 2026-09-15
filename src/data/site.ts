export const EVENT = {
  name: 'AMSFROST',
  year: '2026',
  tagline: 'Code. Build. Innovate.',
  dateLong: '01 October 2026',
  dateShort: '01 OCT 2026',
  location: 'Chennai',
  college: 'Aalim Muhammed Salegh College of Engineering, Chennai',
  footprint: 'INTER-COLLEGE TECHNICAL INNOVATION CHALLENGE',
} as const

export const COUNTDOWN_TARGET = '2026-10-01T09:00:00+05:30'

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Timeline', href: '#timeline' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'FAQ', href: '#faq' },
] as const

export const HERO = {
  eyebrow: 'Inter-College Technical Innovation Challenge',
  title: 'AMSFROST',
  year: '2026',
  supporting: 'Code. Build. Innovate.',
  meta: '01 OCTOBER 2026 • CHENNAI',
  primaryCta: 'Register Now',
  secondaryCta: 'Explore Events',
} as const

export const STATS = [
  { value: '3', label: 'Competitions' },
  { value: '100%', label: 'Student Driven' },
  { value: '01', label: 'Day' },
  { value: '₹200', label: 'Starting Fee' },
] as const

export const ABOUT = {
  label: '01 / ABOUT',
  heading: 'Three ways to compete. One platform to build.',
  description:
    'AMSFROST 2026 brings students together to compete in coding, software innovation, and hardware engineering.',
} as const

export const WHY = {
  label: '03 / THE EXPERIENCE',
  heading: 'More than a competition.',
  items: [
    { index: '01', title: 'Build real solutions', note: 'Working software and hardware, judged on outcomes.' },
    { index: '02', title: 'Compete across colleges', note: 'Go up against students from every institution.' },
    { index: '03', title: 'Showcase your skills', note: 'A public stage for code, design, and engineering.' },
    { index: '04', title: 'Earn recognition', note: 'Awards, certificates, and opportunities that count.' },
  ],
} as const

export const PATRONS = {
  label: 'OUR PATRONS',
  heading: 'GUIDING THE VISION.',
  sub: 'The leadership behind FROST HACKS — championing innovation, learning, and impact at AMS college of engineering.',
  groupLabel: 'MAIN PATRONS',
  main: [
    { title: 'Secretary & Correspondent', featured: true },
    { title: 'Advisor' },
    { title: 'Principal' },
    { title: 'Vice Principal' },
  ],
} as const

export const CONTACT = {
  label: 'CONTACT',
  heading: 'Have a question?',
  sub: 'Contact the organizing team.',
  channels: [
    { key: 'email', label: 'Email', value: '', hint: 'Set email in src/data/site.ts' },
    { key: 'phone', label: 'Phone', value: '', hint: 'Set phone in src/data/site.ts' },
    { key: 'instagram', label: 'Instagram', value: '', hint: 'Set handle in src/data/site.ts' },
    { key: 'linkedin', label: 'LinkedIn', value: '', hint: 'Set profile in src/data/site.ts' },
    { key: 'whatsapp', label: 'WhatsApp / Community', value: '', hint: 'Set link in src/data/site.ts' },
  ],
} as const

export const FOOTER = {
  links: NAV_LINKS,
  college: 'Aalim Muhammed Salegh College of Engineering, Chennai',
  copyright: '© 2026 AMSFROST',
} as const