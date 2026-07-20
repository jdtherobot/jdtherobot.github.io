import { Routes, Route, useLocation } from 'react-router-dom'
import Landing from './pages/Landing'
import ProjectPage from './pages/ProjectPage'
import CareerPage from './pages/CareerPage'
import BackgroundPage from './pages/BackgroundPage'
import useScrollRestoration from './hooks/useScrollRestoration'
import { useGlitchSlice, useScreenStatic, useGoldShimmer } from './hooks/useGlitch'

export default function App() {
  const location = useLocation()

  // Owns scroll placement for every route — pages must not scroll themselves.
  useScrollRestoration()

  // Ambient glitches run app-wide: they query the live DOM each firing, so
  // route changes need no re-wiring. The shimmer re-arms per route (new gold
  // buttons mount) behind its own 8s cross-navigation gate.
  useGlitchSlice()
  useScreenStatic()
  useGoldShimmer(location.key)

  return (
    <>
      {/* shared filter for the STATIC glitch overlays (see useScreenStatic) */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true" focusable="false">
        <filter id="jdb-noise">
          <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.85 0"
          />
        </filter>
      </svg>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/career" element={<CareerPage />} />
        <Route path="/background/:slug" element={<BackgroundPage />} />
        <Route path="/projects/:slug" element={<ProjectPage />} />
        <Route path="/projects/:slug/:doc" element={<ProjectPage />} />
        <Route path="*" element={<Landing />} />
      </Routes>
    </>
  )
}
