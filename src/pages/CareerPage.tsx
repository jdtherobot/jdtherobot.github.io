import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import { ACCOMPLISHMENTS } from '../content/work'
import { useReveal } from '../hooks/useMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import { canGoBack } from '../hooks/useScrollRestoration'

/* Career highlights — a chronological one-line-per-role timeline. The full
   one-page résumé lives at /resume/JD-Britt-Resume.pdf (linked from the header). */

export default function CareerPage() {
  const navigate = useNavigate()
  useReveal('career')
  usePageMeta('Career résumé', 'Twelve years of U.S. Air Force IT leadership — a chronological highlights timeline.')

  return (
    <>
      <Nav />
      <main>
        <div style={{ borderBottom: '1px solid var(--edge)' }}>
          <div className="wrap backbar">
            <button
              className="navlink"
              style={{ color: 'var(--text)', opacity: 1 }}
              onClick={() => (canGoBack() ? navigate(-1) : navigate('/#sec-work'))}
            >
              ← Back to work
            </button>
            <span className="stencil backbar-meta">CAREER · REV 2026.07</span>
          </div>
        </div>

        <header className="dot" style={{ padding: '56px 0 40px' }}>
          <div className="wrap" style={{ maxWidth: 820 }}>
            {/* The three résumé surfaces link to each other: these highlights, the
                full work record, and the PDF. Both links group on the right so
                space-between keeps the eyebrow alone on the left. */}
            <div className="rv" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
              <div className="ey">Résumé</div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap' }}>
                <Link
                  to="/background/occupation"
                  className="stencil"
                  style={{ color: 'var(--label-on-bg)', textDecoration: 'none' }}
                >
                  Work experience →
                </Link>
                <a
                  href="/resume/JD-Britt-Resume.pdf"
                  target="_blank"
                  rel="noreferrer noopener"
                  className="stencil"
                  style={{ color: 'var(--label-on-bg)', textDecoration: 'none' }}
                >
                  Full résumé ↓
                </a>
              </div>
            </div>
            <h1 className="disp rv page-h1" data-slice style={{ fontSize: 42, margin: '14px 0 0' }}>
              Highlights
            </h1>
          </div>
        </header>

        <article className="wrap" style={{ maxWidth: 820, padding: '38px 32px 72px' }}>
          {ACCOMPLISHMENTS.map((a) => (
            <div key={a.slug} className="rv career-row" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 20, padding: '22px 0', borderBottom: '1px solid var(--edge)' }}>
              <div className="stencil" style={{ paddingTop: 4 }}>{a.period}</div>
              <div>
                <h2 className="disp" style={{ fontSize: 18, margin: '0 0 8px' }}>{a.title}</h2>
                <p className="body" style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>{a.oneLine}</p>
              </div>
            </div>
          ))}
        </article>
      </main>
    </>
  )
}
