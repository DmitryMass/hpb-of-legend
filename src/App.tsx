import { useEffect, useRef, useState } from 'react'
import { Route, Routes, useLocation } from 'react-router-dom'
import { FloatingNav } from './components/FloatingNav'
import { IntroScreen } from './components/IntroScreen'
import { photoEntries } from './lib/photos'
import { HomePage } from './pages/HomePage'
import { LuxDrivePage } from './pages/LuxDrivePage'
import { MemoriesPage } from './pages/MemoriesPage'

function ScrollToTop() {
  const location = useLocation()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])

  return null
}

function BackgroundDecor() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 overflow-hidden"
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.2),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(14,165,233,0.18),_transparent_28%),linear-gradient(180deg,_#050816_0%,_#090f22_54%,_#04050b_100%)]" />
      <div className="absolute left-1/2 top-24 h-64 w-64 -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-3xl" />
      <div className="absolute -left-12 top-[24%] h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />
      <div className="absolute bottom-10 right-0 h-72 w-72 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="grid-overlay absolute inset-0 opacity-40" />
      <div className="sparkles absolute inset-0" />
    </div>
  )
}

function App() {
  const location = useLocation()
  const prevPathRef = useRef(location.pathname)
  const [introOpen, setIntroOpen] = useState(location.pathname === '/')

  useEffect(() => {
    const prev = prevPathRef.current
    prevPathRef.current = location.pathname
    // Re-open intro when navigating back to / from another page
    if (location.pathname === '/' && prev !== '/') {
      setIntroOpen(true)
    }
  }, [location.pathname])

  useEffect(() => {
    document.body.classList.toggle('overflow-hidden', introOpen)

    return () => {
      document.body.classList.remove('overflow-hidden')
    }
  }, [introOpen])

  const photoCount = photoEntries.filter((photo) => !photo.isPlaceholder).length

  const handleStart = () => {
    setIntroOpen(false)
  }

  return (
    <div className="relative min-h-screen overflow-x-clip text-white">
      <BackgroundDecor />
      <ScrollToTop />
      <IntroScreen open={introOpen} onStart={handleStart} />
      <FloatingNav hidden={introOpen} />

      <div
        className={`relative z-10 transition duration-700 ${
          introOpen ? 'blur-sm saturate-75' : 'blur-0'
        }`}
      >
        <Routes>
          <Route path="/" element={<HomePage photoCount={photoCount} />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/lux-drive" element={<LuxDrivePage />} />
        </Routes>
      </div>
    </div>
  )
}

export default App
