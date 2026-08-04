import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Eyebrow from '../components/Eyebrow'
import Markdown from '../components/Markdown'
import NotFound from './NotFound'
import { loadBackgroundRaw } from '../content/background'
import { PROJECTS, findProject, subDocs } from '../content/projects'
import { useReveal } from '../hooks/useMotion'
import { usePageMeta } from '../hooks/usePageMeta'

/* Background pages — /background/<slug>. Occupation and Academics render a
   baked markdown doc in the standard doc-card; Personal Development composes
   certifications (site-styled tiles with optional Verify links), the site's
   project index, and the extracurricular record — résumé-bottom, in order. */

/* tagline is optional — a page can lead straight from the H1 into its content. */
const PAGES: Record<string, { title: string; tagline?: string; file?: string }> = {
  occupation: {
    title: 'Work Experience',
    tagline: 'Twelve years of Air Force IT.',
    file: 'occupation.md',
  },
  academics: {
    title: 'Coursework',
    tagline: 'Computer-science coursework across a B.S. in progress, an A.A.S., and transfer credit.',
    file: 'academics.md',
  },
  'personal-development': {
    title: 'Personal Development',
  },
}

/* header tab order — mirrors the Background rows on the landing */
const TAB_ORDER = ['occupation', 'academics', 'personal-development'] as const

function ProjectIndex() {
  const coursework = findProject('coursework-portfolio')
  const rows: { to: string; title: string; line: string }[] = [
    ...PROJECTS.map((p) => ({ to: `/projects/${p.slug}`, title: p.title, line: p.tagline })),
    ...(coursework
      ? subDocs(coursework).map((d) => ({
          to: `/projects/${coursework.slug}/${d.docSlug}`,
          title: `Coursework · ${d.title}`,
          line: d.snippet ?? '',
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
  const [extras, setExtras] = useState<string | undefined>(undefined)
  useEffect(() => {
    let stale = false
    loadBackgroundRaw('extracurriculars.md').then((raw) => {
      if (!stale) setExtras(raw)
    })
    return () => {
      stale = true
    }
  }, [])

  return (
    <>
      {/* Certifications moved to the landing page (CertTiles) — this page is
          projects + extracurriculars now. */}

      {/* 1 · Projects on this site */}
      <section className="rv" style={{ marginBottom: 44 }}>
        <Eyebrow>Projects on this site</Eyebrow>
        <p className="body" style={{ fontSize: 13.5, opacity: 0.7, margin: '8px 0 14px' }}>
          Every project published here, in brief — each opens its writeup.
        </p>
        <ProjectIndex />
      </section>

      {/* 2 · Extracurriculars — the volunteer record, in the same doc card
             /background/occupation uses, since it is the same kind of document.
             The markdown is a lazy chunk; the card renders once it arrives. */}
      {extras && (
        <section className="rv">
          <Eyebrow>Extracurriculars</Eyebrow>
          <div className="doc-card" style={{ marginTop: 16 }}>
            <Markdown source={extras} />
          </div>
        </section>
      )}
    </>
  )
}

export default function BackgroundPage() {
  const { slug = '' } = useParams()
  const page = PAGES[slug]
  useReveal(`background/${slug}`)
  usePageMeta(page?.title ?? 'Not found', page?.tagline)

  /* Page markdown is a lazy chunk. Hooks stay above the NotFound return (hook
     order must not depend on the route); the effect guards on page/file. */
  const [raw, setRaw] = useState<string | undefined>(undefined)
  useEffect(() => {
    setRaw(undefined)
    if (!page?.file) return
    let stale = false
    loadBackgroundRaw(page.file).then((r) => {
      if (!stale) setRaw(r)
    })
    return () => {
      stale = true
    }
  }, [page])

  if (!page) return <NotFound />

  return (
    <>
      <Nav />
      <main>
        {/* header */}
        <header className="dot" style={{ padding: '56px 0 40px' }}>
          <div className="wrap" style={{ maxWidth: 900 }}>
            {/* The three background pages cross-link like project writeups:
                eyebrow + tab row, the current page gold-boxed. Occupation
                doubles as a work surface, so it alone carries the work links
                on the row's right — mirroring the career-highlights header. */}
            <div className="rv" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <div className="ey">Background</div>
              <div className="doc-tabs">
                {TAB_ORDER.map((s) => (
                  <Link
                    key={s}
                    to={`/background/${s}`}
                    className={`doc-tab${s === slug ? ' is-active' : ''}`}
                  >
                    {PAGES[s].title}
                  </Link>
                ))}
              </div>
              {slug === 'occupation' && (
                <div style={{ display: 'flex', alignItems: 'baseline', gap: 18, flexWrap: 'wrap', marginLeft: 'auto' }}>
                  <Link
                    to="/career"
                    className="stencil"
                    style={{ color: 'var(--label-on-bg)', textDecoration: 'none' }}
                  >
                    Career highlights →
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
              )}
            </div>
            <h1 className="disp rv page-h1" data-slice style={{ fontSize: 42, margin: page.tagline ? '14px 0 14px' : '14px 0 0' }}>
              {page.title}
            </h1>
            {page.tagline && (
              <p className="body rv" style={{ fontSize: 17, opacity: 0.9, maxWidth: 640, margin: 0 }}>
                {page.tagline}
              </p>
            )}
          </div>
        </header>

        {/* body — branch on the page shape, not the loaded state, so a doc page
            shows a clean loading frame rather than flashing the composed page */}
        <div className="wrap" style={{ maxWidth: 900, paddingTop: 20, paddingBottom: 72 }}>
          {page.file ? (
            raw && (
              <div className="doc-card">
                <Markdown source={raw} />
              </div>
            )
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
              Career highlights →
            </Link>
          </div>
        </footer>
      </main>
    </>
  )
}
