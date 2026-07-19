import { useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Eyebrow from '../components/Eyebrow'
import Tag from '../components/Tag'
import Button from '../components/Button'
import Markdown from '../components/Markdown'
import { findProject, getDocRaw, docSnippet } from '../content/projects'
import { useReveal } from '../hooks/useMotion'

/* Project page. /projects/:slug shows the repo's README, or — when the repo has
   multiple docs — a grid of clickable preview boxes. /projects/:slug/:doc
   renders one specific doc. Content is baked locally under content/readmes. */

export default function ProjectPage() {
  const { slug = '', doc } = useParams()
  const navigate = useNavigate()
  const project = findProject(slug)
  useReveal(`${slug}/${doc ?? ''}`)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [slug, doc])

  if (!project) {
    return (
      <>
        <Nav />
        <main className="dot" style={{ minHeight: '60vh' }}>
          <div className="wrap" style={{ maxWidth: 820, padding: '80px 0' }}>
            <div className="ey">Error · 404</div>
            <h1 className="disp" style={{ fontSize: 42, margin: '14px 0 14px' }}>Project not found</h1>
            <Link className="navlink" style={{ color: 'var(--text)', opacity: 1 }} to="/">← Back home</Link>
          </div>
        </main>
      </>
    )
  }

  const single = project.docs.length === 1
  const activeDoc = doc
    ? project.docs.find((d) => d.docSlug === doc)
    : single
      ? project.docs[0]
      : undefined

  const activeRaw = activeDoc ? getDocRaw(project.slug, activeDoc.file) : undefined

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
            {doc && !single ? (
              <button className="navlink" style={{ color: 'var(--text)', opacity: 1 }} onClick={() => navigate(`/projects/${project.slug}`)}>
                ← {project.title}
              </button>
            ) : (
              <button className="navlink" style={{ color: 'var(--text)', opacity: 1 }} onClick={() => navigate('/')}>
                ← All projects
              </button>
            )}
            <span className="stencil">{project.github.replace('https://github.com/', 'GH · ')}</span>
          </div>
        </div>

        {/* header */}
        <header className="dot" style={{ padding: '56px 0 40px' }}>
          <div className="wrap" style={{ maxWidth: 900 }}>
            <div className="ey rv">Project</div>
            <h1 className="disp rv" data-slice style={{ fontSize: 42, margin: '14px 0 14px' }}>
              {activeDoc && !single && doc ? activeDoc.title : project.title}
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
          {activeDoc && activeRaw ? (
            <div
              className="rv"
              style={{ border: '1px solid var(--edge)', background: 'var(--bg)', padding: '32px 34px' }}
            >
              <Markdown source={activeRaw} />
            </div>
          ) : (
            <>
              <div className="rv" style={{ marginBottom: 18 }}>
                <Eyebrow>Documents</Eyebrow>
              </div>
              <div
                className="rv"
                style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill,minmax(260px,1fr))', gap: 16 }}
              >
                {project.docs.map((d) => (
                  <Link
                    key={d.docSlug}
                    to={`/projects/${project.slug}/${d.docSlug}`}
                    style={{ display: 'block', border: '1px solid var(--edge)', padding: '20px 22px', color: 'inherit', background: 'var(--panel)' }}
                  >
                    <div style={{ color: 'var(--panel-text)' }}>
                      <div className="disp" style={{ fontSize: 17, marginBottom: 8 }}>{d.title}</div>
                      <p className="body" style={{ fontSize: 13, opacity: 0.75, margin: 0, color: 'var(--panel-text)' }}>
                        {docSnippet(project.slug, d.file)}
                      </p>
                      <div className="stencil" style={{ marginTop: 14, color: 'var(--label-on-panel)' }}>Open →</div>
                    </div>
                  </Link>
                ))}
              </div>
            </>
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
