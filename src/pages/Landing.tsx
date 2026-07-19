import { useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import Nav from '../components/Nav'
import Eyebrow from '../components/Eyebrow'
import Tag from '../components/Tag'
import Button from '../components/Button'
import Card from '../components/Card'
import Stat from '../components/Stat'
import { WaveTrace, MarkSpike } from '../components/WaveTrace'
import PrimaryExits from '../components/PrimaryExits'
import { itemsBySection, type Item } from '../content/items'
import { PROJECTS } from '../content/projects'
import { ACCOMPLISHMENTS, AWARDS } from '../content/work'
import { useReveal, useGlitchSlice, useRailScroll } from '../hooks/useMotion'

const RESEARCH_TIERS = [
  { tier: 'plain', stencil: 'TIER.01', eyebrow: 'Theory', tagline: '[How I’d approach it — the theoretical lens, placeholder length.]', tag: 'Theory' },
  { tier: 'branch', stencil: 'TIER.02', eyebrow: 'Implementation', tagline: '[How I’d approach it — where hardware meets the theory.]', tag: 'Implementation' },
  { tier: 'dissolve', stencil: 'TIER.03', eyebrow: 'Application', tagline: '[How I’d approach it — what the theory + hardware make possible.]', tag: 'Application' },
] as const

const BG_ROWS = [
  { stencil: 'Occupation', title: 'Full-time U.S. Air Force IT professional' },
  { stencil: 'Academics', title: 'Full-time CS undergrad' },
  { stencil: 'Personal development', title: 'Projects, books, certifications' },
]

function Ph({ children, ratio = '16/10', style }: { children: React.ReactNode; ratio?: string; style?: React.CSSProperties }) {
  return (
    <div className="ph" style={{ aspectRatio: ratio, ...style }}>
      <span>{children}</span>
    </div>
  )
}

export default function Landing() {
  const location = useLocation()
  useReveal('home')
  useGlitchSlice()
  useRailScroll('home')

  useEffect(() => {
    if (location.hash) {
      const id = location.hash.slice(1)
      setTimeout(() => {
        const el = document.getElementById(id)
        if (el) window.scrollTo({ top: el.getBoundingClientRect().top + window.pageYOffset - 62, behavior: 'auto' })
      }, 60)
    }
  }, [location.hash])

  const challenges = itemsBySection('challenges')
  const flagship = challenges.find((c) => c.flagship) as Item
  const railChallenges = challenges.filter((c) => !c.flagship)

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
              <div className="ey rv">Systems engineering · embedded · applied ML</div>
              <h1 className="disp rv" data-slice style={{ fontSize: 56, margin: '16px 0 0' }}>
                <span className="hero-h1" style={{ fontSize: 'inherit' }}>JD Britt</span>
              </h1>
              <p className="body rv" style={{ fontSize: 17, maxWidth: 560, opacity: 0.9, margin: '18px 0 0' }}>
                [One-line positioning — the hardware-to-application through-line, written last.]
                Placeholder sized like the real sentence will run so the measure reads true.
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
              Three commitments, at once
            </h2>
            <div
              className="bg-grid"
              style={{ display: 'grid', gridTemplateColumns: '1.25fr 1fr', gap: 44, alignItems: 'start', marginTop: 22 }}
            >
              <div className="rv">
                <p className="body" style={{ fontSize: 16, opacity: 0.9, margin: '0 0 16px' }}>
                  [Narrative paragraph — how a full-time IT career, a full-time CS degree, and U.S.
                  Air Force service run in parallel rather than in conflict. The section that reframes
                  the load as evidence of throughput, not overreach.]
                </p>
                <p className="body" style={{ fontSize: 16, opacity: 0.9, margin: 0 }}>
                  [Second paragraph — the through-line, and why it points at the research direction below.]
                </p>
              </div>
              <div className="rv" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {BG_ROWS.map((r) => (
                  <a key={r.stencil} href="#" className="linkrow">
                    <div style={{ flex: 1 }}>
                      <div className="stencil">{r.stencil}</div>
                      <div className="disp" style={{ fontSize: 15, marginTop: 5 }}>{r.title}</div>
                    </div>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, opacity: 0.55 }}>→</span>
                  </a>
                ))}
              </div>
            </div>
            <div
              className="rv"
              style={{ display: 'flex', gap: 40, flexWrap: 'wrap', marginTop: 30, paddingTop: 24, borderTop: '1px solid var(--edge)' }}
            >
              <Stat value="[ — ]" label="Placeholder metric · verify" />
              <Stat value="[ — ]" label="Placeholder metric · verify" />
              <Stat value="[ — ]" label="Placeholder metric · verify" />
            </div>
          </div>
        </section>

        {/* RESEARCH DIRECTION */}
        <section id="sec-research" className="dot section">
          <div className="wrap">
            <div className="ey rv">Research direction</div>
            <h2 className="disp rv h2-lg" data-slice style={{ fontSize: 32, margin: '14px 0 8px' }}>
              The questions I want to work on
            </h2>
            <p className="body rv" style={{ fontSize: 15, opacity: 0.82, maxWidth: 600, margin: '0 0 28px' }}>
              [Lead — states a point of view. This grows over ~2 years; each tier reads as an angle
              of attack, not a finished result.]
            </p>
            <div className="research-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {RESEARCH_TIERS.map((t) => (
                <div className="rv" key={t.stencil}>
                  <Card tier={t.tier} stencil={t.stencil} innerStyle={{ padding: 20 }}>
                    <Eyebrow on="panel">{t.eyebrow}</Eyebrow>
                    <h3 className="disp" style={{ fontSize: 18, margin: '10px 0' }}>[The question]</h3>
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
                Twelve years of it →
              </Link>
            </h2>
            <p className="body rv" style={{ fontSize: 15, opacity: 0.82, maxWidth: 620, margin: '0 0 8px' }}>
              [Lead — the through-line of a 12-year career, told as a scroll of accomplishments.
              The title opens the full career résumé.]
            </p>
            <div className="rv" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '18px 0 14px' }}>
              <span className="ey">Accomplishments</span>
              <span className="stencil">advances as you scroll · drag → to explore</span>
            </div>
          </div>
          <div className="wrap">
            <div className="rail" data-rail>
              {ACCOMPLISHMENTS.map((a) => (
                <Link
                  key={a.slug}
                  to="/career"
                  style={{ width: 300, border: '1px solid var(--edge)', padding: 18, color: 'inherit', display: 'block' }}
                >
                  <div className="stencil" style={{ marginBottom: 10 }}>{a.period}</div>
                  <Ph style={{ marginBottom: 14 }}>FIGURE</Ph>
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
            <div className="rv" style={{ borderTop: '1px solid var(--edge)' }}>
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
              [Lead — the range: challenges authored for others to solve, and shipped software with
              writeups. Each opens its own page.]
            </p>

            {/* Challenges sub-block (re-themed: follows day/night, black figure boxes kept) */}
            <div className="rv" style={{ marginBottom: 14 }}>
              <Eyebrow>Challenges I’ve built</Eyebrow>
              <p className="body" style={{ fontSize: 14, opacity: 0.75, margin: '8px 0 0', maxWidth: 640 }}>
                [Authoring a challenge others solve is a rarer signal than solving one.]
              </p>
            </div>
            <Link
              to={`/challenges/${flagship.slug}`}
              className="rv flagship-grid"
              style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 28, alignItems: 'center', border: '1px solid var(--edge)', padding: 24, color: 'inherit', marginBottom: 26 }}
            >
              <Ph>FLAGSHIP FIGURE<br />warehouse scavenger hunt</Ph>
              <div>
                <Eyebrow>Featured · Steganography</Eyebrow>
                <h3 className="disp" style={{ fontSize: 24, margin: '10px 0 12px' }}>{flagship.title}</h3>
                <p className="body" style={{ fontSize: 14.5, opacity: 0.82, margin: '0 0 16px' }}>{flagship.oneLine}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                  {flagship.tags.map((tg) => (<Tag key={tg}>{tg}</Tag>))}
                </div>
                <Button variant="primary">Read the writeup →</Button>
              </div>
            </Link>
          </div>
          <div className="wrap">
            <div className="rail" data-rail>
              {railChallenges.map((c) => (
                <Link
                  key={c.slug}
                  to={`/challenges/${c.slug}`}
                  style={{ width: 300, border: '1px solid var(--edge)', padding: 18, color: 'inherit', display: 'block' }}
                >
                  <Ph style={{ marginBottom: 14 }}>FIGURE</Ph>
                  <div className="disp" style={{ fontSize: 16 }}>{c.title}</div>
                  <p className="body" style={{ fontSize: 12.5, opacity: 0.75, margin: '8px 0 0' }}>{c.oneLine}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Code projects sub-block — each opens its README page */}
          <div className="wrap" style={{ marginTop: 44 }}>
            <div className="rv" style={{ marginBottom: 16 }}>
              <Eyebrow>Code &amp; coursework</Eyebrow>
            </div>
            <div className="proj-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: 20 }}>
              {PROJECTS.map((p) => (
                <Link
                  key={p.slug}
                  to={`/projects/${p.slug}`}
                  className="rv"
                  style={{ display: 'flex', flexDirection: 'column', border: '1px solid var(--edge)', padding: '22px 24px', color: 'inherit', background: 'var(--bg)' }}
                >
                  <div className="disp" style={{ fontSize: 18, marginBottom: 10 }}>{p.title}</div>
                  <p className="body" style={{ fontSize: 13.5, opacity: 0.82, margin: '0 0 16px', flex: 1 }}>{p.tagline}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 14 }}>
                    {p.tags.map((tg) => (<Tag key={tg}>{tg}</Tag>))}
                  </div>
                  <span className="stencil">Read the writeup →</span>
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
