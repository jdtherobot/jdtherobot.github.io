import { useParams, Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Eyebrow from '../components/Eyebrow'
import Markdown from '../components/Markdown'
import NotFound from './NotFound'
import { getBackgroundRaw, CERTIFICATIONS } from '../content/background'
import { PROJECTS, findProject, subDocs, docSnippet } from '../content/projects'
import { useReveal } from '../hooks/useMotion'
import { usePageMeta } from '../hooks/usePageMeta'
import { canGoBack } from '../hooks/useScrollRestoration'

/* Background pages — /background/<slug>. Occupation and Academics render a
   baked markdown doc in the standard doc-card; Personal Development composes
   certifications (site-styled tiles with optional Verify links), the site's
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
        <div className="cert-grid" style={{ marginTop: 16 }}>
          {CERTIFICATIONS.map((c) => (
            <div key={c.name} className="cert-tile">
              <div
                className="cert-badge"
                aria-hidden="true"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid var(--gold-40)',
                  color: 'var(--gold)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 15,
                  letterSpacing: '.02em',
                }}
              >
                {c.mark ?? '✦'}
              </div>
              <div>
                <div className="disp" style={{ fontSize: 14 }}>{c.name}</div>
                <div className="stencil" style={{ marginTop: 4 }}>
                  {c.issuer}
                  {c.year ? ` · ${c.year}` : ''}
                </div>
                {c.credId && (
                  <div className="stencil" style={{ marginTop: 3, opacity: 0.6 }}>ID · {c.credId}</div>
                )}
                {c.verify && (
                  <a
                    className="stencil"
                    href={c.verify}
                    target="_blank"
                    rel="noreferrer noopener"
                    style={{ display: 'inline-block', marginTop: 6, color: 'var(--label-on-bg)', textDecoration: 'none' }}
                  >
                    Verify ↗
                  </a>
                )}
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

      {/* 3 · Extracurriculars — the volunteer record, in the same doc card
             /background/occupation uses, since it is the same kind of document. */}
      <section className="rv">
        <Eyebrow>Extracurriculars</Eyebrow>
        <div className="doc-card" style={{ marginTop: 16 }}>
          <Markdown source={getBackgroundRaw('extracurriculars.md') ?? ''} />
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
  usePageMeta(page?.title ?? 'Not found', page?.tagline)

  if (!page) return <NotFound />

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
