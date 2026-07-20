import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import ProjectPage from './pages/ProjectPage'
import CareerPage from './pages/CareerPage'
import BackgroundPage from './pages/BackgroundPage'
import useScrollRestoration from './hooks/useScrollRestoration'

export default function App() {
  // Owns scroll placement for every route — pages must not scroll themselves.
  useScrollRestoration()

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/career" element={<CareerPage />} />
      <Route path="/background/:slug" element={<BackgroundPage />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="/projects/:slug/:doc" element={<ProjectPage />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
