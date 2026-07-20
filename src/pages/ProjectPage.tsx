import { useParams, Link, useNavigate, Navigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Tag from '../components/Tag'
import Button from '../components/Button'
import Markdown from '../components/Markdown'
import { findProject, getDocRaw, overviewDoc } from '../content/projects'
import { useReveal } from '../hooks/useMotion'
import { canGoBack } from '../hooks/useScrollRestoration'

/* Project page. /projects/:slug/:doc renders one writeup; multi-doc projects
   cross-link their writeups with a tab row (active one gold-boxed) and redirect
   the bare /projects/:slug to their overview. Content is baked under readmes. */

export default function ProjectPage() {
  const { slug = '', doc } = useParams()
  const navigate = useNavigate()
  const project = findProject(slug)
  useReveal(`${slug}/${doc ?? ''}`)

  /* Going back beats the section anchor: it lands the visitor exactly where they
     left off rather than at the top of the Projects block. Only when there is no
     history to return to (deep link, fresh tab) do we fall back to the anchor. */
  const goBack = () => (canGoBack() ? navigate(-1) : navigate('/#sec-projects'))

  if (!project) {
    return (
      <>
        <Nav />
        <main className="dot" style={{ minHeight: '60vh' }}>
          <div className="wrap" style={{ maxWidth: 820, padding: '80px 0' }}>
            <div className="ey">Error · 404</div>
            <h1 className="disp page-h1" style={{ fontSize: 42, margin: '14px 0 14px' }}>Project not found</h1>
            <Link className="navlink" style={{ color: 'var(--text)', opacity: 1 }} to="/">← Back home</Link>
          </div>
        </main>
      </>
    )
  }

  const single = project.docs.length === 1
  const activeDoc = doc ? project.docs.find((d) => d.docSlug === doc) : project.docs[0]

  // Bare multi-doc URL, or an unknown doc slug → send to the overview writeup.
  if ((!doc && !single) || (doc && !activeDoc)) {
    return <Navigate replace to={`/projects/${project.slug}/${overviewDoc(project).docSlug}`} />
  }

  const activeRaw = activeDoc ? getDocRaw(project.slug, activeDoc.file) : undefined

  return (
    <>
      <Nav />
      <main>
        {/* back bar */}
        <div style={{ borderBottom: '1px solid var(--edge)' }}>
          <div className="wrap backbar">
            <button className="navlink" style={{ color: 'var(--text)', opacity: 1 }} onClick={goBack}>
              ← All projects
            </button>
            <span className="stencil backbar-meta">
              {project.github.replace('https://github.com/', 'GH · ')}
            </span>
          </div>
        </div>

        {/* header */}
        <header className="dot" style={{ padding: '56px 0 40px' }}>
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div className="rv" style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
              <div className="ey">Project</div>
              {!single && (
                <div className="doc-tabs">
                  {project.docs.map((d) => (
                    <Link
                      key={d.docSlug}
                      to={`/projects/${project.slug}/${d.docSlug}`}
                      className={`doc-tab${activeDoc?.docSlug === d.docSlug ? ' is-active' : ''}`}
                    >
                      {d.title}
                    </Link>
                  ))}
                </div>
              )}
              {project.liveUrl && (
                <Button
                  href={project.liveUrl}
                  variant="primary"
                  target="_blank"
                  rel="noreferrer noopener"
                  style={{ marginLeft: 'auto' }}
                >
                  {project.liveLabel ?? 'Launch app →'}
                </Button>
              )}
            </div>
            <h1 className="disp rv page-h1" data-slice style={{ fontSize: 42, margin: '14px 0 14px' }}>
              {single ? project.title : activeDoc?.title ?? project.title}
            </h1>
            <p className="body rv" style={{ fontSize: 17, opacity: 0.9, maxWidth: 640, margin: '0 0 18px' }}>
              {project.tagline}
            </p>
            <div className="rv" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', alignItems: 'center' }}>
              <Button href={project.github} variant="outline" target="_blank" rel="noreferrer noopener">
                View on GitHub →
              </Button>
              {project.tags.map((t) => (<Tag key={t}>{t}</Tag>))}
            </div>
          </div>
        </header>

        {/* body */}
        <div className="wrap" style={{ maxWidth: 900, paddingTop: 20, paddingBottom: 72 }}>
          {/* No .rv here: the wrapper is the whole rendered README (8–25k px tall),
              so a reveal on it is invisible anyway — and it used to trap the page
              at opacity 0 on short viewports. The header above still reveals. */}
          {activeRaw && (
            <div className="doc-card">
              <Markdown source={activeRaw} />
            </div>
          )}
        </div>

        {/* footer */}
        <footer style={{ borderTop: '1px solid var(--edge)' }}>
          <div
            className="wrap"
            style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, paddingTop: 26, paddingBottom: 26 }}
          >
            <Link className="navlink" style={{ color: 'var(--text)', opacity: 1 }} to="/#sec-projects">
              ← All projects
            </Link>
            <a
              className="navlink"
              style={{ color: 'var(--text)', opacity: 1 }}
              href={project.github}
              target="_blank"
              rel="noreferrer noopener"
            >
              View on GitHub →
            </a>
          </div>
        </footer>
      </main>
    </>
  )
}
