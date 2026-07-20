import { useParams, Link, useNavigate, Navigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Eyebrow from '../components/Eyebrow'
import Markdown from '../components/Markdown'
import { getBackgroundRaw, CERTIFICATIONS, EXTRACURRICULARS } from '../content/background'
import { PROJECTS, findProject, subDocs, docSnippet } from '../content/projects'
import { useReveal } from '../hooks/useMotion'
import { canGoBack } from '../hooks/useScrollRestoration'

/* Background pages — /background/<slug>. Occupation and Academics render a
   baked markdown doc in the standard doc-card; Personal Development composes
   certifications (badge placeholders until JD supplies vendor art), the site's
   project index, and the extracurricular record — résumé-bottom, in order. */

const PAGES: Record<string, { title: string; eyebrow: string; tagline: string; file?: string }> = {
  occupation: {
    title: 'Work Experience',
    eyebrow: 'Background · Occupation',
    tagline:
      'Twelve years of U.S. Air Force IT, translated from performance reports into plain English — every position, newest first.',
    file: 'occupation.md',
  },
  academics: {
    title: 'Coursework',
    eyebrow: 'Background · Academics',
    tagline: 'Computer-science coursework across a B.S. in progress, an A.A.S., and transfer credit.',
    file: 'academics.md',
  },
  'personal-development': {
    title: 'Personal Development',
    eyebrow: 'Background · Personal development',
    tagline:
      'The résumé-bottom section, expanded: certifications, the projects on this site, and the extracurricular record behind them.',
  },
}

function ProjectIndex() {
  const coursework = findProject('coursework-portfolio')
  const rows: { to: string; title: string; line: string }[] = [
    ...PROJECTS.map((p) => ({ to: `/projects/${p.slug}`, title: p.title, line: p.tagline })),
    ...(coursework
      ? subDocs(coursework).map((d) => ({
          to: `/projects/${coursework.slug}/${d.docSlug}`,
          title: `Coursework · ${d.title}`,
          line: docSnippet(coursework.slug, d.file),
        }))
      : []),
  ]
  return (
    <div style={{ borderTop: '1px solid var(--edge)' }}>
      {rows.map((r) => (
        <Link
          key={r.to}
          to={r.to}
          style={{
            display: 'block',
            padding: '14px 0',
            borderBottom: '1px solid var(--edge)',
            color: 'inherit',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14 }}>
            <span className="disp" style={{ fontSize: 15 }}>{r.title}</span>
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, opacity: 0.55, flex: 'none' }}>→</span>
          </div>
          <p className="body" style={{ fontSize: 13, opacity: 0.75, margin: '4px 0 0', maxWidth: 640 }}>{r.line}</p>
        </Link>
      ))}
    </div>
  )
}

function PersonalDevelopment() {
  return (
    <>
      {/* 1 · Certifications */}
      <section className="rv" style={{ marginBottom: 44 }}>
        <Eyebrow>Certifications</Eyebrow>
        <p className="body" style={{ fontSize: 13.5, opacity: 0.7, margin: '8px 0 16px' }}>
          Official vendor badges land here; placeholders hold their spots.
        </p>
        <div className="cert-grid">
          {CERTIFICATIONS.map((c) => (
            <div key={c.name} className="cert-tile">
              {c.badge ? (
                <img src={c.badge} alt={`${c.name} badge`} className="cert-badge" />
              ) : (
                <div className="cert-badge ph">
                  <span>BADGE</span>
                </div>
              )}
              <div>
                <div className="disp" style={{ fontSize: 14 }}>{c.name}</div>
                <div className="stencil" style={{ marginTop: 4 }}>
                  {c.issuer}
                  {c.year ? ` · ${c.year}` : ''}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 2 · Projects on this site */}
      <section className="rv" style={{ marginBottom: 44 }}>
        <Eyebrow>Projects on this site</Eyebrow>
        <p className="body" style={{ fontSize: 13.5, opacity: 0.7, margin: '8px 0 14px' }}>
          Every project published here, in brief — each opens its writeup.
        </p>
        <ProjectIndex />
      </section>

      {/* 3 · Extracurriculars */}
      <section className="rv">
        <Eyebrow>Extracurriculars</Eyebrow>
        <div style={{ borderTop: '1px solid var(--edge)', marginTop: 14 }}>
          {EXTRACURRICULARS.map((e) => (
            <div key={e.title} style={{ padding: '14px 0', borderBottom: '1px solid var(--edge)' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 14, flexWrap: 'wrap' }}>
                <span className="disp" style={{ fontSize: 15 }}>{e.title}</span>
                <span className="stencil" style={{ flex: 'none' }}>{e.meta}</span>
              </div>
              <p className="body" style={{ fontSize: 13, opacity: 0.75, margin: '4px 0 0', maxWidth: 680 }}>{e.line}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  )
}

export default function BackgroundPage() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const page = PAGES[slug]
  useReveal(`background/${slug}`)

  if (!page) return <Navigate replace to="/" />

  const raw = page.file ? getBackgroundRaw(page.file) : undefined
  const goBack = () => (canGoBack() ? navigate(-1) : navigate('/#sec-background'))

  return (
    <>
      <Nav />
      <main>
        {/* back bar */}
        <div style={{ borderBottom: '1px solid var(--edge)' }}>
          <div className="wrap backbar">
            <button className="navlink" style={{ color: 'var(--text)', opacity: 1 }} onClick={goBack}>
              ← Back
            </button>
            <span className="stencil backbar-meta">BACKGROUND · REV 2026.07</span>
          </div>
        </div>

        {/* header */}
        <header className="dot" style={{ padding: '56px 0 40px' }}>
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div className="ey rv">{page.eyebrow}</div>
            <h1 className="disp rv page-h1" data-slice style={{ fontSize: 42, margin: '14px 0 14px' }}>
              {page.title}
            </h1>
            <p className="body rv" style={{ fontSize: 17, opacity: 0.9, maxWidth: 640, margin: 0 }}>
              {page.tagline}
            </p>
          </div>
        </header>

        {/* body */}
        <div className="wrap" style={{ maxWidth: 900, paddingTop: 20, paddingBottom: 72 }}>
          {raw ? (
            <div className="doc-card">
              <Markdown source={raw} />
            </div>
          ) : (
            <PersonalDevelopment />
          )}
        </div>

        {/* footer */}
        <footer style={{ borderTop: '1px solid var(--edge)' }}>
          <div
            className="wrap"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, paddingTop: 26, paddingBottom: 26 }}
          >
            <Link className="navlink" style={{ color: 'var(--text)', opacity: 1 }} to="/#sec-background">
              ← Background
            </Link>
            <Link className="navlink" style={{ color: 'var(--text)', opacity: 1 }} to="/career">
              Full career résumé →
            </Link>
          </div>
        </footer>
      </main>
    </>
  )
}
