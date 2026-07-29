import { Link, useNavigate } from 'react-router-dom'
import Nav from '../components/Nav'
import Eyebrow from '../components/Eyebrow'
import Tag from '../components/Tag'
import Button from '../components/Button'
import Card from '../components/Card'
import Stat from '../components/Stat'
import { WaveTrace, MarkSpike } from '../components/WaveTrace'
import PrimaryExits from '../components/PrimaryExits'
import CodeFigure from '../components/CodeFigure'
import DashboardFigure from '../components/DashboardFigure'
import WorkFigure from '../components/WorkFigure'
import CtfFigure, { type CtfFigureKind } from '../components/CtfFigure'
import CertTiles from '../components/CertTiles'
import { PROJECTS, findProject, overviewDoc, subDocs } from '../content/projects'
import { ACCOMPLISHMENTS, AWARDS } from '../content/work'
import { useReveal, useRailDrift, usePianoIntro } from '../hooks/useMotion'
import { usePageMeta } from '../hooks/usePageMeta'

const RESEARCH_TIERS = [
  {
    tier: 'plain',
    stencil: 'Q.01',
    eyebrow: 'Adaptive Learning',
    question: 'How can a system adapt continually without erasing what it already knows?',
    tagline: 'Continual learning without catastrophic forgetting — brain-inspired algorithms as the lens.',
    tag: 'Theory',
  },
  {
    tier: 'branch',
    stencil: 'Q.02',
    eyebrow: 'Computer Systems',
    question: 'How should learning, memory, runtime, and hardware be co-designed under limited resources?',
    tagline: 'Neuromorphic and embedded constraints as a design input, not an afterthought.',
    tag: 'Implementation',
  },
  {
    tier: 'dissolve',
    stencil: 'Q.03',
    eyebrow: 'Neurotechnology',
    question: 'Can adaptive methods improve neural-signal decoding and other real-time closed-loop systems?',
    tagline: 'Real-time decoding for BCIs — where latency, drift, and noise are the problem.',
    tag: 'Application',
  },
] as const

const BG_ROWS = [
  { stencil: 'Occupation', title: 'Full-time U.S. Air Force IT professional', to: '/background/occupation' },
  { stencil: 'Academics', title: 'Full-time CS undergrad', to: '/background/academics' },
  { stencil: 'Personal development', title: 'Projects and extracurriculars', to: '/background/personal-development' },
]

/* landing-rail doc slug → drawn challenge vignette */
const CTF_FIGS: Record<string, CtfFigureKind> = {
  warehouse: 'warehouse',
  'steganography-lvl-1': 'lvl1',
  'steganography-lvl-2': 'lvl2',
  'steganography-lvl-3': 'lvl3',
}

export default function Landing() {
  // Scroll placement (top / #hash / restored offset) belongs to
  // useScrollRestoration in App — doing it here too would fight it.
  useReveal('home')
  useRailDrift('home')
  usePianoIntro('home')
  usePageMeta()

  const navigate = useNavigate()
  const ctf = findProject('steganography-ctf')!
  const ctfDocs = subDocs(ctf)

  const coursework = findProject('coursework-portfolio')!
  const courseworkOverview = overviewDoc(coursework)
  const courseBoxes = subDocs(coursework)
  const otherProjects = PROJECTS.filter((p) => !p.featured)

  return (
    <>
      <Nav />
      <main>
        {/* HERO */}
        <section className="dot" style={{ padding: '76px 0 60px' }}>
          <div
            className="wrap hero-grid"
            style={{ display: 'grid', gridTemplateColumns: '1fr .8fr', gap: 48, alignItems: 'center' }}
          >
            <div>
              <div className="ey rv">Senior IT Leader · Computer Science B.S. Candidate</div>
              <h1 className="disp rv" data-slice style={{ fontSize: 56, margin: '16px 0 0' }}>
                <span className="hero-h1" style={{ fontSize: 'inherit' }}>JD Britt</span>
              </h1>
              <p className="body rv" style={{ fontSize: 17, maxWidth: 560, opacity: 0.9, margin: '18px 0 0' }}>
                Twelve years keeping Air Force missions online — still active duty, now completing
                a full-time computer science degree alongside the job. Record, projects, and
                writeups below.
              </p>
              <div className="rv" style={{ margin: '26px 0 28px' }}>
                <WaveTrace width={300} />
              </div>
              <div className="rv">
                <PrimaryExits />
              </div>
            </div>
            {/* the cell stretches to the row (sized by the copy beside it); the
                frame is absolute inside it, so the photo never drives the row */}
            <div className="hero-figure-cell">
              <div className="frame rv hero-figure">
                <img src="/hero-figure/portrait-toned.jpeg" alt="JD Britt" />
              </div>
            </div>
          </div>
        </section>

        {/* BACKGROUND */}
        <section id="sec-background" className="dot section">
          <div className="wrap">
            <div className="ey rv">Background</div>
            <h2 className="disp rv h2-lg" data-slice style={{ fontSize: 32, margin: '14px 0 6px' }}>
              Who I am
            </h2>
            <div
              className="bg-grid"
              style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 44, alignItems: 'start', marginTop: 22 }}
            >
              <div className="rv">
                {/* Owner-authored copy — edit only at JD's direction. */}
                <p className="body" style={{ fontSize: 16, opacity: 0.9, margin: 0 }}>
                  Active-duty U.S. Air Force Master Sergeant (E-7), full-time computer science
                  undergrad. I enlisted in 2014 and have experience across systems and network
                  administration, operational infrastructure, cybersecurity, and technical project
                  leadership, alongside software built through personal and academic projects.
                  Near-term, I&rsquo;m looking for ways to stay in uniform while staying as
                  technical as possible. The work that motivates me is understanding how systems
                  work, taking on challenging problems, and building things. Long-term, I plan to
                  enter research at the intersection of computer science and neuroscience. My
                  framing for building across these disciplines is based on the pillars of{' '}
                  <Link
                    to="/#sec-research"
                    style={{ color: 'inherit', textDecoration: 'none', borderBottom: '1px solid var(--gold)' }}
                  >
                    adaptive learning algorithms, hardware–software co-design, and brain–computer
                    interfaces
                  </Link>.
                </p>
              </div>
              <div className="rv" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {BG_ROWS.map((r) => (
                  <Link key={r.stencil} to={r.to} className="linkrow">
                    <div style={{ flex: 1 }}>
                      <div className="stencil">{r.stencil}</div>
                      <div className="disp" style={{ fontSize: 15, marginTop: 5 }}>{r.title}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, opacity: 0.55 }}>→</span>
                  </Link>
                ))}
              </div>
            </div>
            {/* full cert tiles (moved from /background/personal-development):
                collapsed titles until tapped — see CertTiles */}
            <CertTiles />
            {/* Sums of documented figures across performance reports — the whole
                row clicks through to the underlying line items on
                /background/occupation. 37K+ counts vulnerabilities and inspection
                discrepancies, hence "findings". */}
            {/* $83M = every project/program directed (21 line items across 12
                years, $61.1M) plus the $21.9M Windows 10 upgrade. Excludes
                environments supported and savings produced. */}
            <Link to="/background/occupation" className="rv stat-row" style={{ color: 'inherit', textDecoration: 'none' }}>
              <Stat value="37K+" label="Security findings eliminated" />
              <Stat value="250+ · $83M" label="Projects led · documented value" />
              <Stat value="95K+" label="Labor-hours saved" />
            </Link>
          </div>
        </section>

        {/* PROJECTS — the puzzle/challenges block (re-themed) + code projects */}
        <section id="sec-projects" className="dot section">
          <div className="wrap">
            <div className="ey rv">Projects</div>
            <h2 className="disp rv h2-lg" data-slice style={{ fontSize: 32, margin: '14px 0 8px' }}>
              Things I’ve built
            </h2>
            <p className="body rv" style={{ fontSize: 15, opacity: 0.82, maxWidth: 620, margin: '0 0 30px' }}>
              Just some things I built — security challenges, working tools, and full-stack
              coursework, each with a full writeup on its own page.
            </p>

            {/* Challenges sub-block (re-themed: follows day/night, black figure boxes kept) */}
            <div className="rv" style={{ marginBottom: 14 }}>
              <Eyebrow>Challenges I’ve built</Eyebrow>
              <p className="body" style={{ fontSize: 14, opacity: 0.75, margin: '8px 0 0', maxWidth: 640 }}>
                The best way to learn is to teach — these four ran as a live CTF for the computer
                science club I founded while forward-deployed. Every writeup includes the complete solve.
              </p>
            </div>
            <div
              className="rv flagship-grid"
              style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 28, alignItems: 'center', border: '1px solid var(--edge)', padding: 24, marginBottom: 26 }}
            >
              <Link to={`/projects/${ctf.slug}/overview`} style={{ display: 'block', color: 'inherit' }}>
                <CtfFigure kind="flagship" />
              </Link>
              <div>
                <Eyebrow>Featured · Steganography</Eyebrow>
                <Link to={`/projects/${ctf.slug}/overview`} style={{ color: 'inherit', textDecoration: 'none' }}>
                  <h3 className="disp" style={{ fontSize: 24, margin: '10px 0 12px' }}>{ctf.title}</h3>
                </Link>
                <p className="body" style={{ fontSize: 14.5, opacity: 0.82, margin: '0 0 16px' }}>{ctf.tagline}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                  {ctf.tags.map((tg) => (<Tag key={tg}>{tg}</Tag>))}
                </div>
                <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', alignItems: 'center' }}>
                  <Button variant="primary" onClick={() => navigate(`/projects/${ctf.slug}/overview`)}>
                    Read the writeup →
                  </Button>
                  {ctf.liveUrl && (
                    <Button href={ctf.liveUrl} variant="primary">
                      {ctf.liveLabel ?? 'Launch app →'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="wrap">
            <div className="rail" data-rail data-piano>
              {/* the wrapper div is the bordered box; the Link fills it, so a
                  doc's launch button can sit inside without nesting anchors */}
              {ctfDocs.map((d) => (
                <div
                  key={d.docSlug}
                  style={{ width: 300, border: '1px solid var(--edge)', padding: 18, display: 'flex', flexDirection: 'column' }}
                >
                  <Link
                    to={`/projects/${ctf.slug}/${d.docSlug}`}
                    style={{ flex: 1, color: 'inherit', display: 'block' }}
                  >
                    {/* unmapped future doc slugs fall back to the flagship art —
                        never a literal placeholder box */}
                    <CtfFigure kind={CTF_FIGS[d.docSlug] ?? 'flagship'} style={{ marginBottom: 14 }} />
                    <div className="disp" style={{ fontSize: 16 }}>{d.title}</div>
                    <p className="body" style={{ fontSize: 12.5, opacity: 0.75, margin: '8px 0 0' }}>{d.snippet}</p>
                  </Link>
                  {d.liveUrl && (
                    <div style={{ marginTop: 14 }}>
                      {/* same-tab on purpose — the sim replaces this window.
                          one type-step smaller than the flagship buttons. */}
                      <Button
                        href={d.liveUrl}
                        variant="primary"
                        style={{ padding: '8px 14px', fontSize: 'var(--fs-eyebrow)' }}
                      >
                        {d.liveLabel ?? 'Launch →'}
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Software & tools */}
          <div className="wrap" style={{ marginTop: 44 }}>
            <div className="rv" style={{ marginBottom: 16 }}>
              <Eyebrow>Software &amp; tools</Eyebrow>
            </div>
            <div className="proj-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: 20 }}>
              {otherProjects.map((p) => (
                <div
                  key={p.slug}
                  className="rv"
                  style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--edge)', padding: '22px 24px', background: 'var(--bg)' }}
                >
                  <Link
                    to={`/projects/${p.slug}`}
                    style={{ display: 'flex', flexDirection: 'column', flex: 1, color: 'inherit', textDecoration: 'none' }}
                  >
                    {p.dashboardFigure ? (
                      <DashboardFigure style={{ marginBottom: 16 }} />
                    ) : (
                      p.figure && <CodeFigure data={p.figure} style={{ marginBottom: 16 }} />
                    )}
                    <div className="disp" style={{ fontSize: 18, marginBottom: 10 }}>{p.title}</div>
                    <p className="body" style={{ fontSize: 13.5, opacity: 0.82, margin: '0 0 16px', flex: 1 }}>{p.tagline}</p>
                    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                      {p.tags.map((tg) => (<Tag key={tg}>{tg}</Tag>))}
                    </div>
                  </Link>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, marginTop: 14 }}>
                    <Link to={`/projects/${p.slug}`} className="navlink" style={{ color: 'var(--text)', opacity: 1 }}>
                      Read the writeup →
                    </Link>
                    {p.liveUrl && (
                      <Button
                        href={p.liveUrl}
                        variant="primary"
                        style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '9px 16px' }}
                      >
                        {p.liveLabel ?? 'Launch app →'}
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Coursework — flagship block (feature card → overview + 3 course boxes) */}
          <div className="wrap" style={{ marginTop: 44 }}>
            <div className="rv" style={{ marginBottom: 14 }}>
              <Eyebrow>Coursework</Eyebrow>
              <p className="body" style={{ fontSize: 14, opacity: 0.75, margin: '8px 0 0', maxWidth: 640 }}>
                Software engineering coursework across the stack.
              </p>
            </div>
            <Link
              to={`/projects/${coursework.slug}/${courseworkOverview.docSlug}`}
              className="rv flagship-grid"
              style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 28, alignItems: 'center', border: '1px solid var(--edge)', padding: 24, color: 'inherit', marginBottom: 26 }}
            >
              {coursework.figure && <CodeFigure data={coursework.figure} />}
              <div>
                <Eyebrow>Featured · Coursework</Eyebrow>
                <h3 className="disp" style={{ fontSize: 24, margin: '10px 0 12px' }}>{coursework.title}</h3>
                <p className="body" style={{ fontSize: 14.5, opacity: 0.82, margin: '0 0 16px' }}>{coursework.tagline}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                  {coursework.tags.map((tg) => (<Tag key={tg}>{tg}</Tag>))}
                </div>
                <Button variant="primary">Read the writeup →</Button>
              </div>
            </Link>
            {/* no .rv on these boxes — the piano intro owns their entrance */}
            <div className="proj-grid" data-piano style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {courseBoxes.map((d) => (
                <Link
                  key={d.docSlug}
                  to={`/projects/${coursework.slug}/${d.docSlug}`}
                  style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--edge)', padding: 18, color: 'inherit', background: 'var(--bg)' }}
                >
                  {d.figure && <CodeFigure data={d.figure} style={{ marginBottom: 14 }} />}
                  <div className="disp" style={{ fontSize: 16 }}>{d.title}</div>
                  <p className="body" style={{ fontSize: 12.5, opacity: 0.75, margin: '8px 0 0' }}>{d.snippet}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* WORK — puzzle-style: accomplishments rail + awards. Title → /career */}
        <section id="sec-work" className="dot section">
          <div className="wrap">
            <div className="ey rv">Work</div>
            <h2 className="disp rv h2-lg" data-slice style={{ fontSize: 32, margin: '14px 0 8px' }}>
              <Link to="/career" style={{ color: 'inherit', borderBottom: '2px solid var(--gold)', paddingBottom: 2 }}>
                Twelve years of IT →
              </Link>
            </h2>
            <p className="body rv" style={{ fontSize: 15, opacity: 0.82, maxWidth: 620, margin: '0 0 8px' }}>
              Throughout my career, I&rsquo;ve been the Air Force&rsquo;s geek squad — helpdesk,
              asset management, team lead, supervisor, project manager, section and flight
              leadership. Here are a few highlights.
            </p>
            <div className="rv" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '18px 0 14px' }}>
              <span className="ey">Accomplishments</span>
              <span className="stencil">advances as you scroll · drag → to explore</span>
            </div>
          </div>
          <div className="wrap">
            <div className="rail" data-rail data-rail-drift data-piano>
              {ACCOMPLISHMENTS.map((a) => (
                <Link
                  key={a.slug}
                  to="/career"
                  style={{ width: 300, border: '1px solid var(--edge)', padding: 18, color: 'inherit', display: 'block' }}
                >
                  <div className="stencil" style={{ marginBottom: 10 }}>{a.period}</div>
                  <WorkFigure kind={a.figure} style={{ marginBottom: 14 }} />
                  <div className="disp" style={{ fontSize: 16 }}>{a.title}</div>
                  <p className="body" style={{ fontSize: 12.5, opacity: 0.75, margin: '8px 0 0' }}>{a.oneLine}</p>
                </Link>
              ))}
            </div>
          </div>
          <div className="wrap" style={{ marginTop: 34 }}>
            <div className="rv" style={{ marginBottom: 8 }}>
              <Eyebrow>Awards</Eyebrow>
            </div>
            <div className="rv awards-scroll" style={{ borderTop: '1px solid var(--edge)' }}>
              {AWARDS.map((aw, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'baseline', gap: 18, padding: '16px 0', borderBottom: '1px solid var(--edge)' }}>
                  <span className="stencil" style={{ width: 70, flex: 'none' }}>{aw.year}</span>
                  <div style={{ flex: 1 }}>
                    <div className="disp" style={{ fontSize: 15 }}>{aw.title}</div>
                    <div className="body" style={{ fontSize: 12.5, opacity: 0.68, marginTop: 2 }}>{aw.detail}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* RESEARCH DIRECTION */}
        <section id="sec-research" className="dot section">
          <div className="wrap">
            <div className="ey rv">Research direction</div>
            <h2 className="disp rv h2-lg" data-slice style={{ fontSize: 32, margin: '14px 0 8px' }}>
              The long game
            </h2>
            <p className="body rv" style={{ fontSize: 15, opacity: 0.82, maxWidth: 600, margin: '0 0 28px' }}>
              Two threads I keep coming back to: fundamentally adaptive learning algorithms, and practical
              brain–computer interfaces capable of lifelong operation. To me they look inseparable — adaptive
              neurotechnology will need advances in learning algorithms and in the hardware–software co-design
              beneath them. These are early ideas rather than a research agenda; the questions below are where
              I want to start digging.
            </p>
            <div className="research-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {RESEARCH_TIERS.map((t) => (
                <div className="rv" key={t.stencil}>
                  <Card
                    tier={t.tier}
                    stencil={t.stencil}
                    innerStyle={{ padding: 20, height: '100%', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}
                  >
                    <Eyebrow on="panel">{t.eyebrow}</Eyebrow>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1.3, fontSize: 17, margin: '10px 0' }}>
                      {t.question}
                    </h3>
                    <p className="body" style={{ fontSize: 13.5, opacity: 0.8, margin: '0 0 14px' }}>{t.tagline}</p>
                    {/* pinned so all three tags sit the same distance off the bottom border */}
                    <div style={{ marginTop: 'auto' }}>
                      <Tag on="panel">{t.tag}</Tag>
                    </div>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CONTACT / FOOTER */}
        <section style={{ padding: '72px 0 0', borderTop: '1px solid var(--edge)' }}>
          <div className="wrap">
            <div className="ey rv">Get in touch</div>
            <h2 className="disp rv h2-lg" style={{ fontSize: 32, margin: '14px 0 22px' }}>Résumé &amp; contact</h2>
            <div className="rv"><PrimaryExits /></div>
          </div>
          <div style={{ borderTop: '1px solid var(--edge)', marginTop: 48 }}>
            <div
              className="wrap"
              style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 14, paddingTop: 26, paddingBottom: 26 }}
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-mono)', fontSize: 12, letterSpacing: '.1em' }}>
                <MarkSpike size={16} />
                JD BRITT
              </span>
              <span className="stencil">REV 2026.07</span>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
