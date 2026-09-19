export const EVENT = {
  name: 'AMS CODEATHON',
  year: '2026',
  tagline: 'Code. Build. Innovate.',
  dateLong: '01 October 2026',
  dateShort: '01 OCT 2026',
  location: 'Chennai',
  college: 'Aalim Muhammed Salegh College of Engineering, Chennai',
  footprint: 'INTER-COLLEGE TECHNICAL INNOVATION CHALLENGE',
} as const

export const COUNTDOWN_TARGET = '2026-10-01T09:00:00+05:30'

export const REGISTRATION_URL = 'https://forms.gle/NpBTJM6PMTWVmPty9'

export const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Prizes', href: '#prizes' },
  { label: 'FAQ', href: '#faq' },
] as const

export const HERO = {
  eyebrow: 'Inter-College Technical Innovation Challenge',
  title: 'AMS Codeathon',
  year: '2026',
  supporting: 'Code. Build. Innovate.',
  meta: '01 OCTOBER 2026 • CHENNAI',
  primaryCta: 'Register Now',
  secondaryCta: 'Explore Events',
} as const

export const ABOUT = {
  label: '01 / ABOUT',
  heading: 'ABOUT',
  description:
    'CODEATHON 2026 is an inter-college technical innovation challenge organized by Aalim Muhammed Salegh College of Engineering, Avadi, Chennai.It brings students together across coding, software innovation, and hardware engineering, giving them a platform to solve problems, build solutions, compete, and showcase what they can create.',
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
  sub: 'The leadership behind AMS Codeathon — championing innovation, learning, and impact at AMS college of engineering.',
  groupLabel: 'MAIN PATRONS',
  main: [
    { title: 'Secretary & Correspondent', name: 'Mr. H. Mohamed Salegh', featured: true, image: '/images/correspondent.jpeg' },
    { title: 'Advisor', name: 'Prof. A. Mohamed Abdul Kadher', image: '/images/advisor.png' },
    { title: 'Principal', name: 'Dr. K.G. Parthiban', image: '/images/principal.jpeg' },
    { title: 'Vice Principal', name: 'Dr. AS. Salma Banu', image: '/images/vice-principal.png' },
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

export const TEAM = {
  label: 'TEAM',
  heading: 'OUR TEAM',
  sub: 'THE PEOPLE BEHIND IT',
  organizers: [
    { name: 'Ms M Sukanya', role: 'Event Organizer', socials: {} },
    { name: 'Ms A Faridha Banu', role: 'Event Organizer', socials: {} },
  ],
  leads: [
    { name: 'Mohamed Fizal', role: 'Event Lead', socials: {} },
    { name: 'Mohammed Zubair', role: 'Event Lead', socials: {} },
    { name: 'Arif Basha T', role: 'Event Lead', socials: {} },
    { name: 'Suhail', role: 'Treasurer', socials: {} },
  ],
  technicalLeads: [
    { name: 'Hasan Zaki', role: 'Technical Lead', socials: {} },
    { name: 'Sharafah S', role: 'Technical Lead', socials: {} },
    { name: 'Nihaya A', role: 'Technical Lead', socials: {} },
    { name: 'Aafreen', role: 'Technical Lead', socials: {} },
  ],
  coordinators: [
    { name: 'Multhazim', role: 'Event Coordinator', socials: {} },
    { name: 'Aasif Ibrahim', role: 'Event Coordinator', socials: {} },
    { name: 'Joyce Katherine', role: 'Event Coordinator', socials: {} },
    { name: 'Ajay', role: 'Event Coordinator', socials: {} },
  ],
  media: [
    { name: 'Rifan Al Deen', role: 'Media Team', socials: {} },
    { name: 'Mohammed Umar', role: 'Media Team', socials: {} },
    { name: 'Bala P', role: 'Media Team', socials: {} },
    { name: 'Abdur Razeeth', role: 'Media Team', socials: {} },
  ],
} as const

export const FOOTER = {
  links: NAV_LINKS,
  college: 'Aalim Muhammed Salegh College of Engineering, Chennai',
  copyright: '© 2026 AMS Codeathon',
} as const