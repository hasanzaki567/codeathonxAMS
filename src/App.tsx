import { FlowProvider } from './FlowProvider'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Stats } from './components/Stats'
import { About } from './components/About'
import { Events } from './components/Events'
import { Experience } from './components/Experience'
import { Timeline } from './components/Timeline'
import { Prizes } from './components/Prizes'
import { Registration } from './components/Registration'
import { Rules } from './components/Rules'
import { Evaluation } from './components/Evaluation'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { Patrons } from './components/Patrons'
import { Footer } from './components/Footer'
import { MobileCTA } from './components/MobileCTA'
import { CompetitionDetails } from './components/CompetitionDetails'
import { RegistrationWizard } from './components/RegistrationWizard'

export default function App() {
  return (
    <FlowProvider>
      <a
        href="#main"
        className="fixed left-4 top-4 z-[110] -translate-y-20 rounded-full bg-night px-5 py-2.5 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main">
        <Hero />
        <Stats />
        <div className="relative h-[200dvh]">
          <About />
        </div>
        <div className="relative z-30 -mt-[100dvh]">
          <Patrons />
        </div>
        <Events />
        <Experience />
        <Timeline />
        <Prizes />
        <Registration />
        <Rules />
        <Evaluation />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
      <CompetitionDetails />
      <RegistrationWizard />
    </FlowProvider>
  )
}