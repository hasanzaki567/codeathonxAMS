// Prize amounts are placeholders. Update the amount strings here once confirmed by the organizers.
export const PRIZES = {
  label: '05 / RECOGNITION',
  heading: 'Build something worth remembering.',
  podium: [
    { place: '1st Prize', amount: '₹5,000', note: 'Cash prize for the winning team.' },
    { place: '2nd Prize', amount: '₹2,500', note: 'Cash prize for the runner-up team.' },
    { place: '3rd Prize', amount: '₹1,000', note: 'Cash prize for the third-place team.' },
  ],
  perks: [
    { title: 'Participation Certificate', note: 'For eligible registered participants.' },
    { title: 'Internship Opportunities', note: 'For outstanding performance.' },
  ],
  badges: ['Best Innovation', 'Best Technical Implementation', 'Best Interdisciplinary Team', 'Best Social Impact'],
} as const