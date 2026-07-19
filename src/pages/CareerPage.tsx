import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Eyebrow from '../components/Eyebrow'
import { ACCOMPLISHMENTS } from '../content/work'
import { useReveal } from '../hooks/useMotion'

/* Full career résumé — distinct from the standard résumé. A chronological
   account of a 12-year career. Placeholder for now; JD fills the entries. */

export default function CareerPage() {
  useReveal('career')
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

  return (
    <>
      <Nav />
      <main>
        <div style={{ borderBottom: '1px solid var(--edge)' }}>
          <div
            className="wrap"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 54 }}
          >
            <Link className="navlink" style={{ color: 'var(--text)', opacity: 1 }} to="/#sec-work">
              ← Back to work
            </Link>
            <span className="stencil">CAREER · REV 2026.07</span>
          </div>
        </div>

        <header className="dot" style={{ padding: '56px 0 40px' }}>
          <div className="wrap" style={{ maxWidth: 820 }}>
            <div className="ey rv">Career résumé</div>
            <h1 className="disp rv" data-slice style={{ fontSize: 42, margin: '14px 0 14px' }}>
              Twelve years, in full
            </h1>
            <p className="body rv" style={{ fontSize: 17, opacity: 0.9, maxWidth: 640, margin: 0 }}>
              [The complete career narrative — assignments, scope, and results across a 12-year span.
              This is the long-form counterpart to the one-page résumé. Placeholder until JD writes it.]
            </p>
          </div>
        </header>

        <article className="wrap" style={{ maxWidth: 820, padding: '38px 32px 72px' }}>
          {ACCOMPLISHMENTS.map((a) => (
            <div key={a.slug} className="rv" style={{ display: 'grid', gridTemplateColumns: '120px 1fr', gap: 20, padding: '22px 0', borderBottom: '1px solid var(--edge)' }}>
              <div className="stencil" style={{ paddingTop: 4 }}>{a.period}</div>
              <div>
                <h2 className="disp" style={{ fontSize: 18, margin: '0 0 8px' }}>{a.title}</h2>
                <p className="body" style={{ fontSize: 15, opacity: 0.85, margin: 0 }}>{a.oneLine}</p>
              </div>
            </div>
          ))}
          <div className="rv" style={{ marginTop: 34 }}>
            <Eyebrow>More to come</Eyebrow>
            <p className="body" style={{ fontSize: 14, opacity: 0.7, marginTop: 10 }}>
              [Additional detail — education, certifications, and the full assignment history — lands here.]
            </p>
          </div>
        </article>
      </main>
    </>
  )
}
