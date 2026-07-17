import { Routes, Route } from 'react-router-dom'
import Landing from './pages/Landing'
import DetailPage from './pages/DetailPage'

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/:section/:slug" element={<DetailPage />} />
      <Route path="*" element={<Landing />} />
    </Routes>
  )
}
