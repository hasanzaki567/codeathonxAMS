import { Suspense, lazy } from 'react'
import { FlowProvider } from './FlowProvider'
import { RouterProvider, useRouter } from './router'
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

const SplashCursor = lazy(() => import('./components/SplashCursor'))
const CompetitionDetails = lazy(() =>
  import('./components/CompetitionDetails').then((m) => ({ default: m.CompetitionDetails })),
)
const FormPage = lazy(() => import('./pages/FormPage').then((m) => ({ default: m.FormPage })))

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
        <div className="about-stage relative h-2x-dvh">
          <About />
        </div>
        <div className="patrons-stage relative z-30 neg-mt-screen-dvh">
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
      <Suspense fallback={null}>
        <CompetitionDetails />
      </Suspense>
    </>
  )
}

function ScreenRouter() {
  const { path } = useRouter()
  return path === '/form' ? (
    <Suspense fallback={null}>
      <FormPage />
    </Suspense>
  ) : (
    <HomePage />
  )
}

export default function App() {
  return (
    <RouterProvider>
      <FlowProvider>
        <Suspense fallback={null}>
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
        </Suspense>
        <ScreenRouter />
      </FlowProvider>
    </RouterProvider>
  )
}