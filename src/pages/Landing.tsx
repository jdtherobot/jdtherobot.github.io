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

  // If arriving with a hash (e.g. from a detail "All challenges" link), scroll
  // to that section with the sticky-nav offset once the DOM is present.
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
  const hardware = itemsBySection('hardware')
  const software = itemsBySection('software')

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

        {/* RESEARCH */}
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

        {/* CHALLENGES — flagship, inverted ground */}
        <section
          id="sec-challenges"
          data-rail-section
          style={{ padding: '78px 0', background: 'var(--panel)', color: 'var(--panel-text)', borderTop: '1px solid var(--edge)' }}
        >
          <div className="wrap">
            <div className="ey rv" style={{ color: 'var(--label-on-panel)' }}>Challenges I’ve built</div>
            <h2 className="disp rv h2-lg" data-slice style={{ fontSize: 38, margin: '14px 0 12px' }}>
              Building the puzzle is the deeper proof
            </h2>
            <p className="body rv" style={{ fontSize: 16, opacity: 0.85, maxWidth: 640, margin: '0 0 32px' }}>
              [Lead — why authoring a challenge others solve is a rarer signal than solving one. This
              is the strongest thing on the page; it gets the most room.]
            </p>
            <Link
              to={`/challenges/${flagship.slug}`}
              className="rv flagship-grid"
              style={{ display: 'grid', gridTemplateColumns: '1.1fr 1fr', gap: 28, alignItems: 'center', border: '1px solid var(--edge)', padding: 24, color: 'inherit' }}
            >
              <Ph>FLAGSHIP FIGURE<br />warehouse scavenger hunt</Ph>
              <div>
                <Eyebrow on="panel">Featured · Steganography</Eyebrow>
                <h3 className="disp" style={{ fontSize: 24, margin: '10px 0 12px' }}>{flagship.title}</h3>
                <p className="body" style={{ fontSize: 14.5, opacity: 0.82, margin: '0 0 16px' }}>{flagship.oneLine}</p>
                <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 18 }}>
                  {flagship.tags.map((tg) => (<Tag key={tg} on="panel">{tg}</Tag>))}
                </div>
                <Button variant="primary">Read the writeup →</Button>
              </div>
            </Link>
            <div className="rv" style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', margin: '26px 0 14px' }}>
              <span className="ey" style={{ color: 'var(--label-on-panel)' }}>More challenges</span>
              <span className="stencil" style={{ color: 'var(--label-on-panel)' }}>advances as you scroll · drag → to explore</span>
            </div>
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
        </section>

        {/* HARDWARE & FIRMWARE */}
        <section id="sec-hardware" data-rail-section className="dot section">
          <div className="wrap">
            <div className="ey rv">Hardware &amp; firmware</div>
            <h2 className="disp rv h2-lg" data-slice style={{ fontSize: 32, margin: '14px 0 8px' }}>
              Embedded systems &amp; analog signal work
            </h2>
            <p className="body rv" style={{ fontSize: 15, opacity: 0.82, maxWidth: 600, margin: '0 0 26px' }}>
              [Lead — the discipline behind the builds: APUs, timing, authentic signal paths.]
            </p>
          </div>
          <div className="wrap">
            <div className="rail" data-rail>
              {hardware.map((h) => (
                <Link
                  key={h.slug}
                  to={`/hardware/${h.slug}`}
                  style={{ width: 340, border: '1px solid var(--edge)', padding: 18, background: 'var(--bg)', color: 'inherit', display: 'block' }}
                >
                  <Ph style={{ marginBottom: 14 }}>FIGURE</Ph>
                  <div className="disp" style={{ fontSize: 16 }}>{h.title}</div>
                  <p className="body" style={{ fontSize: 12.5, opacity: 0.78, margin: '8px 0 12px' }}>{h.oneLine}</p>
                  <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                    {h.tags.map((tg) => (<Tag key={tg}>{tg}</Tag>))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* SOFTWARE & COURSEWORK */}
        <section id="sec-software" className="section">
          <div className="wrap">
            <div className="ey rv">Software &amp; coursework</div>
            <h2 className="disp rv h2-lg" data-slice style={{ fontSize: 32, margin: '14px 0 22px' }}>
              Everything else, plainly listed
            </h2>
            <div className="rv" style={{ borderTop: '1px solid var(--edge)' }}>
              {software.map((s) => (
                <Link key={s.slug} to={`/software/${s.slug}`} className="softrow">
                  <span className="stencil" style={{ width: 120, flex: 'none' }}>{s.sub}</span>
                  <span style={{ flex: 1 }}>
                    <span className="disp softname" style={{ fontSize: 15, transition: 'color .18s', display: 'block' }}>{s.title}</span>
                    <span className="body" style={{ fontSize: 12.5, opacity: 0.68, marginTop: 2, display: 'block' }}>{s.oneLine}</span>
                  </span>
                  <span style={{ fontFamily: 'var(--font-mono)', fontSize: 11, opacity: 0.5 }}>→</span>
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
