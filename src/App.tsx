import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import DetailPage from './pages/DetailPage'
import ProjectPage from './pages/ProjectPage'
import CareerPage from './pages/CareerPage'
import useScrollRestoration from './hooks/useScrollRestoration'

export default function App() {
  // Owns scroll placement for every route — pages must not scroll themselves.
  useScrollRestoration()

  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/career" element={<CareerPage />} />
      <Route path="/projects/:slug" element={<ProjectPage />} />
      <Route path="/projects/:slug/:doc" element={<ProjectPage />} />
      <Route path="/challenges/:slug" element={<DetailPage />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
