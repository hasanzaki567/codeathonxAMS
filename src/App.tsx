import { FlowProvider } from './FlowProvider'
import { RouterProvider, useRouter } from './router'
import SplashCursor from './components/SplashCursor'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Events } from './components/Events'
import { Prizes } from './components/Prizes'
import { Rules } from './components/Rules'
import { Team } from './components/Team'
import { FAQ } from './components/FAQ'
import { Contact } from './components/Contact'
import { Patrons } from './components/Patrons'
import { Footer } from './components/Footer'
import { MobileCTA } from './components/MobileCTA'
import { CompetitionDetails } from './components/CompetitionDetails'
import { FormPage } from './pages/FormPage'

function HomePage() {
  return (
    <>
      <a
        href="#main"
        className="skip-link fixed left-4 top-4 z-[110] -translate-y-20 rounded-full bg-night px-5 py-2.5 text-sm font-semibold text-white transition-transform focus:translate-y-0"
      >
        Skip to content
      </a>
      <Navbar />
      <main id="main" className="page-main">
        <Hero />
        <div className="about-stage relative h-[200dvh]">
          <About />
        </div>
        <div className="patrons-stage relative z-30 -mt-[100dvh]">
          <Patrons />
        </div>
        <Events />
        <Prizes />
        <Rules />
        <Team />
        <FAQ />
        <Contact />
      </main>
      <Footer />
      <MobileCTA />
      <CompetitionDetails />
    </>
  )
}

function ScreenRouter() {
  const { path } = useRouter()
  return path === '/form' ? <FormPage /> : <HomePage />
}

export default function App() {
  return (
    <RouterProvider>
      <FlowProvider>
        <div
          aria-hidden="true"
          className="splash-cursor-global fixed inset-0"
          style={{ zIndex: 35, pointerEvents: 'none' }}
        >
          <SplashCursor
            DENSITY_DISSIPATION={3.5}
            VELOCITY_DISSIPATION={2}
            PRESSURE={0.1}
            CURL={3}
            SPLAT_RADIUS={0.2}
            SPLAT_FORCE={6000}
            COLOR_UPDATE_SPEED={10}
            SHADING
            RAINBOW_MODE
            COLOR="#A855F7"
          />
        </div>
        <ScreenRouter />
      </FlowProvider>
    </RouterProvider>
  )
}