import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import { usePageMeta } from '../hooks/usePageMeta'

/* One shared 404 view — used for unknown top-level URLs and for unknown
   project/background slugs, so every dead link lands somewhere honest. */

export default function NotFound() {
  usePageMeta('Not found')
  return (
    <>
      <Nav />
      <main className="dot" style={{ minHeight: '60vh' }}>
        <div className="wrap" style={{ maxWidth: 820, padding: '80px 0' }}>
          <div className="ey">Error · 404</div>
          <h1 className="disp page-h1" style={{ fontSize: 42, margin: '14px 0 14px' }}>
            Page not found
          </h1>
          <p className="body" style={{ fontSize: 16, opacity: 0.85, maxWidth: 560, margin: '0 0 20px' }}>
            That page doesn’t exist — check the address, or head back.
          </p>
          <Link className="navlink" style={{ color: 'var(--text)', opacity: 1 }} to="/">
            ← Back home
          </Link>
        </div>
      </main>
    </>
  )
}
