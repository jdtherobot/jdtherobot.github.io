import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Eyebrow from '../components/Eyebrow'
import Tag from '../components/Tag'
import Figure from '../components/Figure'
import { findItem, nextInSection, SECTION_LABEL, type Section, type Item } from '../content/items'
import { useReveal, useGlitchSlice, useRailScroll } from '../hooks/useMotion'

/* Shared detail template (820px measure). Every challenge/hardware/software
   item renders here at /:section/:slug. Copy is placeholder until JD fills it. */

const VALID: Section[] = ['challenges', 'hardware', 'software']

function Ph({ children, ratio = '16/9' }: { children: React.ReactNode; ratio?: string }) {
  return (
    <div className="ph" style={{ aspectRatio: ratio }}>
      <span>{children}</span>
    </div>
  )
}

export default function DetailPage() {
  const { section = '', slug = '' } = useParams()
  const navigate = useNavigate()
  const routeKey = `${section}/${slug}`

  useReveal(routeKey)
  useGlitchSlice()
  useRailScroll(routeKey)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [routeKey])

  const isValidSection = VALID.includes(section as Section)
  const item = findItem(section, slug)

  // Unknown section entirely → home.
  if (!isValidSection) {
    return <NotFound />
  }

  const sec = section as Section
  const label = SECTION_LABEL[sec]
  const next = item ? nextInSection(sec, item.slug) : undefined

  // Known section but unknown slug → graceful "content coming" on the template.
  const view: Item = item ?? {
    section: sec,
    slug,
    title: '[Content coming]',
    eyebrow: label,
    oneLine: '',
    tags: [],
    deck: '[This page is reserved. JD will add the writeup here.]',
    premise: '[Premise — placeholder.]',
    concept: '[The concept — placeholder.]',
    how: '[How it works — placeholder.]',
    proves: '[What it proves — placeholder.]',
    stencil: 'DOC · REV 2026.07',
  }

  const backTo = `/#${sec === 'challenges' ? 'sec-challenges' : sec === 'hardware' ? 'sec-hardware' : 'sec-software'}`

  return (
    <>
      <Nav />
      <main>
        {/* back bar */}
        <div style={{ borderBottom: '1px solid var(--edge)' }}>
          <div
            className="wrap"
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, height: 54 }}
          >
            <button
              className="navlink"
              style={{ color: 'var(--text)', opacity: 1 }}
              onClick={() => navigate('/')}
            >
              ← Back to {label.toLowerCase()}
            </button>
            <span className="stencil">{view.stencil}</span>
          </div>
        </div>

        {/* header */}
        <header className="dot" style={{ padding: '56px 0 40px' }}>
          <div className="wrap" style={{ maxWidth: 820 }}>
            <div className="ey rv">{view.eyebrow}</div>
            <h1 className="disp rv" data-slice style={{ fontSize: 42, margin: '14px 0 14px' }}>
              {view.title}
            </h1>
            <p className="body rv" style={{ fontSize: 17, opacity: 0.9, maxWidth: 640, margin: '0 0 18px' }}>
              {view.deck}
            </p>
            <div className="rv" style={{ display: 'flex', gap: 8, flexWrap: 'wrap', alignItems: 'center' }}>
              {view.tags.map((t) => (<Tag key={t}>{t}</Tag>))}
            </div>
          </div>
        </header>

        {/* hero figure */}
        <div className="wrap" style={{ maxWidth: 820 }}>
          <div className="frame rv">
            <Ph>HERO FIGURE · 16:9</Ph>
          </div>
        </div>

        {/* article */}
        <article className="wrap" style={{ maxWidth: 820, paddingTop: 38 }}>
          <div className="rv" style={{ marginBottom: 34 }}>
            <Eyebrow>Premise</Eyebrow>
            <p className="body" style={{ fontSize: 15.5, opacity: 0.9, margin: '12px 0 0' }}>{view.premise}</p>
          </div>
          <div className="rv" style={{ marginBottom: 34 }}>
            <Eyebrow>The concept</Eyebrow>
            <p className="body" style={{ fontSize: 15.5, opacity: 0.9, margin: '12px 0 16px' }}>{view.concept}</p>
            <Figure>
              <Ph>DIAGRAM / FIGURE</Ph>
            </Figure>
          </div>
          <div className="rv" style={{ marginBottom: 34 }}>
            <Eyebrow>How it works</Eyebrow>
            <p className="body" style={{ fontSize: 15.5, opacity: 0.9, margin: '12px 0 0' }}>{view.how}</p>
          </div>
          <div className="rv" style={{ marginBottom: 34 }}>
            <Eyebrow>What it proves</Eyebrow>
            <p className="body" style={{ fontSize: 15.5, opacity: 0.9, margin: '12px 0 0' }}>{view.proves}</p>
          </div>
        </article>

        {/* artifacts rail */}
        <section data-rail-section style={{ padding: '8px 0 24px' }}>
          <div className="wrap" style={{ maxWidth: 820, paddingBottom: 12 }}>
            <Eyebrow>Artifacts</Eyebrow>
          </div>
          <div className="wrap" style={{ maxWidth: 820 }}>
            <div className="rail" data-rail>
              {[0, 1, 2].map((i) => (
                <div key={i} className="frame" style={{ width: 280 }}>
                  <Ph ratio="4/3">ARTIFACT</Ph>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* footer */}
        <footer style={{ borderTop: '1px solid var(--edge)', marginTop: 20 }}>
          <div
            className="wrap"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, paddingTop: 26, paddingBottom: 26 }}
          >
            <Link className="navlink" style={{ color: 'var(--text)', opacity: 1 }} to={backTo}>
              ← All {label.toLowerCase()}
            </Link>
            {next && (
              <Link className="navlink" style={{ color: 'var(--text)', opacity: 1 }} to={`/${sec}/${next.slug}`}>
                Next: {next.title} →
              </Link>
            )}
          </div>
        </footer>
      </main>
    </>
  )
}

function NotFound() {
  return (
    <>
      <Nav />
      <main className="dot" style={{ minHeight: '60vh' }}>
        <div className="wrap" style={{ maxWidth: 820, padding: '80px 0' }}>
          <div className="ey">Error · 404</div>
          <h1 className="disp" style={{ fontSize: 42, margin: '14px 0 14px' }}>Page not found</h1>
          <p className="body" style={{ fontSize: 15.5, opacity: 0.9, marginBottom: 24 }}>
            That page doesn’t exist yet.
          </p>
          <Link className="navlink" style={{ color: 'var(--text)', opacity: 1 }} to="/">← Back home</Link>
        </div>
      </main>
    </>
  )
}
