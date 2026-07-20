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
import { PROJECTS, findProject, overviewDoc, subDocs, docSnippet } from '../content/projects'
import { ACCOMPLISHMENTS, AWARDS } from '../content/work'
import { useReveal, useRailScroll, usePianoIntro } from '../hooks/useMotion'

const RESEARCH_TIERS = [
  {
    tier: 'plain',
    stencil: 'Q.01',
    eyebrow: 'Adaptive Learning',
    question: 'How can a system adapt continually without erasing what it already knows?',
    tagline: 'Continual learning without catastrophic forgetting — brain-inspired algorithms as the lens.',
    tag: 'Adaptive Learning',
  },
  {
    tier: 'branch',
    stencil: 'Q.02',
    eyebrow: 'Computer Systems',
    question: 'How should learning, memory, runtime, and hardware be co-designed under limited resources?',
    tagline: 'Neuromorphic and embedded constraints as a design input, not an afterthought.',
    tag: 'Computer Systems',
  },
  {
    tier: 'dissolve',
    stencil: 'Q.03',
    eyebrow: 'Neurotechnology',
    question: 'Can adaptive methods improve neural-signal decoding and other real-time closed-loop systems?',
    tagline: 'Real-time decoding for BCIs — where latency, drift, and noise are the problem.',
    tag: 'Neurotechnology',
  },
] as const

const BG_ROWS = [
  { stencil: 'Occupation', title: 'Full-time U.S. Air Force IT professional', to: '/background/occupation' },
  { stencil: 'Academics', title: 'Full-time CS undergrad', to: '/background/academics' },
  { stencil: 'Personal development', title: 'Projects, books, certifications', to: '/background/personal-development' },
]

function Ph({ children, ratio = '16/10', style }: { children: React.ReactNode; ratio?: string; style?: React.CSSProperties }) {
  return (
    <div className="ph" style={{ aspectRatio: ratio, ...style }}>
      <span>{children}</span>
    </div>
  )
}

export default function Landing() {
  // Scroll placement (top / #hash / restored offset) belongs to
  // useScrollRestoration in App — doing it here too would fight it.
  useReveal('home')
  useRailScroll('home')
  usePianoIntro('home')

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
              <div className="ey rv">ADAPTIVE LEARNING • COMPUTER SYSTEMS • NEUROTECHNOLOGY</div>
              <h1 className="disp rv" data-slice style={{ fontSize: 56, margin: '16px 0 0' }}>
                <span className="hero-h1" style={{ fontSize: 'inherit' }}>JD Britt</span>
              </h1>
              <p className="body rv" style={{ fontSize: 17, maxWidth: 560, opacity: 0.9, margin: '18px 0 0' }}>
                Twelve years keeping Air Force missions online — now studying the layer where
                hardware meets learning: adaptive algorithms, co-designed systems, and
                brain-computer interfaces built for the real world.
              </p>
              <div className="rv" style={{ margin: '26px 0 28px' }}>
                <WaveTrace width={300} />
              </div>
              <div className="rv">
                <PrimaryExits />
              </div>
            </div>
            <div className="frame rv hero-figure" style={{ alignSelf: 'stretch', display: 'flex' }}>
              <Ph ratio="5/4" style={{ flex: 1 }}>
                SECONDARY FIGURE
                <br />
                portrait / key schematic
                <br />
                supplied later
              </Ph>
            </div>
          </div>
        </section>

        {/* BACKGROUND */}
        <section id="sec-background" className="dot section">
          <div className="wrap">
            <div className="ey rv">Background</div>
            <h2 className="disp rv h2-lg" data-slice style={{ fontSize: 32, margin: '14px 0 6px' }}>
              Who Am I?
            </h2>
            <div
              className="bg-grid"
              style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 44, alignItems: 'start', marginTop: 22 }}
            >
              <div className="rv">
                <p className="body" style={{ fontSize: 16, opacity: 0.9, margin: 0 }}>
                  Active-duty U.S. Air Force IT Leader &amp; Computer Science Undergrad. Experienced
                  in operational infrastructure, software, and embedded experimentation. Preparing
                  for research in hardware-software co-design, adaptive algorithms, and engineering
                  next-generation brain-computer interfaces (BCIs) for real-world environments.
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
            <div className="rv stat-row">
              {/* Sums of documented figures across performance reports — see
                  /background/occupation for the underlying line items. */}
              <Stat value="250+ · $35M" label="Projects led · documented value" />
              <Stat value="38K+" label="Security vulnerabilities eliminated" />
              <Stat value="95K+" label="Labor-hours saved" />
            </div>
          </div>
        </section>

        {/* RESEARCH DIRECTION */}
        <section id="sec-research" className="dot section">
          <div className="wrap">
            <div className="ey rv">Research direction</div>
            <h2 className="disp rv h2-lg" data-slice style={{ fontSize: 32, margin: '14px 0 8px' }}>
              My long-term objective
            </h2>
            <p className="body rv" style={{ fontSize: 15, opacity: 0.82, maxWidth: 600, margin: '0 0 28px' }}>
              Twofold: to develop fundamentally adaptive learning algorithms and to enable practical brain–computer interfaces
              capable of lifelong operation. I believe these goals are inseparable. Realizing adaptive neurotechnology
              will require advances not only in learning algorithms, but also in the co-design of software, computer systems,
              and hardware that can support continuous learning.
            </p>
            <div className="research-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {RESEARCH_TIERS.map((t) => (
                <div className="rv" key={t.stencil}>
                  <Card tier={t.tier} stencil={t.stencil} innerStyle={{ padding: 20 }}>
                    <Eyebrow on="panel">{t.eyebrow}</Eyebrow>
                    <h3 style={{ fontFamily: 'var(--font-display)', fontWeight: 600, lineHeight: 1.3, fontSize: 17, margin: '10px 0' }}>
                      {t.question}
                    </h3>
                    <p className="body" style={{ fontSize: 13.5, opacity: 0.8, margin: '0 0 14px' }}>{t.tagline}</p>
                    <Tag on="panel">{t.tag}</Tag>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* WORK — puzzle-style: accomplishments rail + awards. Title → /career */}
        <section id="sec-work" data-rail-section className="dot section">
          <div className="wrap">
            <div className="ey rv">Work</div>
            <h2 className="disp rv h2-lg" data-slice style={{ fontSize: 32, margin: '14px 0 8px' }}>
              <Link to="/career" style={{ color: 'inherit', borderBottom: '2px solid var(--gold)', paddingBottom: 2 }}>
                Twelve years of I.T. →
              </Link>
            </h2>
            <p className="body rv" style={{ fontSize: 15, opacity: 0.82, maxWidth: 620, margin: '0 0 8px' }}>
              Throughout my career, I&rsquo;ve been the Air Force&rsquo;s geek squad, helpdesk, asset
              management, team lead, supervisor, project manager, section and flight leader… among
              other things — and that&rsquo;s only the work stuff. Here&rsquo;s some tidbits.
            </p>
            <div className="rv" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '18px 0 14px' }}>
              <span className="ey">Accomplishments</span>
              <span className="stencil">advances as you scroll · drag → to explore</span>
            </div>
          </div>
          <div data-rail-runway>
            <div className="rail-pin">
              <div className="wrap">
                <div className="rail" data-rail data-piano>
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

        {/* PROJECTS — the puzzle/challenges block (re-themed) + code projects */}
        <section id="sec-projects" data-rail-section className="dot section">
          <div className="wrap">
            <div className="ey rv">Projects</div>
            <h2 className="disp rv h2-lg" data-slice style={{ fontSize: 32, margin: '14px 0 8px' }}>
              Things I’ve built
            </h2>
            <p className="body rv" style={{ fontSize: 15, opacity: 0.82, maxWidth: 620, margin: '0 0 30px' }}>
              [Just some things I thought were neat. Each writeup opens its own page.]
            </p>

            {/* Challenges sub-block (re-themed: follows day/night, black figure boxes kept) */}
            <div className="rv" style={{ marginBottom: 14 }}>
              <Eyebrow>Challenges I’ve built</Eyebrow>
              <p className="body" style={{ fontSize: 14, opacity: 0.75, margin: '8px 0 0', maxWidth: 640 }}>
                [The best way to learn it to teach! Or, write a CTF challenge!]
              </p>
            </div>
            <div
              className="rv flagship-grid"
              style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 28, alignItems: 'center', border: '1px solid var(--edge)', padding: 24, marginBottom: 26 }}
            >
              <Link to={`/projects/${ctf.slug}/overview`} style={{ display: 'block', color: 'inherit' }}>
                <Ph>FLAGSHIP FIGURE<br />steganography ctf challenges</Ph>
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
                    <Button href={ctf.liveUrl} variant="primary" target="_blank" rel="noreferrer noopener">
                      {ctf.liveLabel ?? 'Launch app →'}
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div data-rail-runway>
            <div className="rail-pin">
              <div className="wrap">
                <div className="rail" data-rail data-piano>
                  {ctfDocs.map((d) => (
                    <Link
                      key={d.docSlug}
                      to={`/projects/${ctf.slug}/${d.docSlug}`}
                      style={{ width: 300, border: '1px solid var(--edge)', padding: 18, color: 'inherit', display: 'block' }}
                    >
                      <Ph style={{ marginBottom: 14 }}>FIGURE</Ph>
                      <div className="disp" style={{ fontSize: 16 }}>{d.title}</div>
                      <p className="body" style={{ fontSize: 12.5, opacity: 0.75, margin: '8px 0 0' }}>{docSnippet(ctf.slug, d.file)}</p>
                    </Link>
                  ))}
                </div>
              </div>
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
                    <Link to={`/projects/${p.slug}`} className="stencil" style={{ textDecoration: 'none' }}>
                      Read the writeup →
                    </Link>
                    {p.liveUrl && (
                      <Button
                        href={p.liveUrl}
                        variant="primary"
                        target="_blank"
                        rel="noreferrer noopener"
                        style={{ fontSize: 10, letterSpacing: '0.14em', textTransform: 'uppercase', padding: '9px 16px' }}
                      >
                        Launch app →
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
                [Full-stack software-engineering coursework — three graded builds, each with its own writeup.]
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
                  <p className="body" style={{ fontSize: 12.5, opacity: 0.75, margin: '8px 0 0' }}>{docSnippet(coursework.slug, d.file)}</p>
                </Link>
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
              <span className="stencil">SEC.09 · REV 2026.07</span>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
