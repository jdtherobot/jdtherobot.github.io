import { useEffect, useState, type CSSProperties } from 'react'
import { CERTIFICATIONS, type Certification } from '../content/background'
import { prefersReducedMotion } from '../hooks/useMotion'

/* CertTiles — the certification tiles, landing edition (moved here from
   /background/personal-development). Collapsed by default: title only, every
   tile the same width via .cert-grid, so the block earns its landing-page
   space. Clicking any tile — or the header control, which is the accessible
   toggle — expands all six together: the badge settles in, the issuer/ID
   lines typewriter into place, and the Verify link fades up. The expanded
   state reuses .cert-grid/.cert-tile/.cert-badge (global.css) so it matches
   the old Personal Development tiles exactly. Reduced motion: instant expand,
   whole text, no typing. */

/* The MIT seven-bar wordmark, traced from the official logo geometry
   (bar width 35, pitch 57, on a 321×166 canvas). Bars inherit the badge
   gold like every other tile mark; the I-stem keeps MIT's red — the one
   brand color the mark is unrecognizable without. */
const MIT_RED = '#A31F34'
function MitMark() {
  const bars: [x: number, y: number, w: number, h: number, red?: boolean][] = [
    [0, 0, 35, 166], // M
    [57, 0, 35, 113],
    [114, 0, 35, 166],
    [171, 0, 35, 33], // I dot
    [171, 53, 35, 113, true], // I stem — MIT red
    [229, 53, 35, 113], // T stem
    [229, 0, 92, 33], // T crossbar
  ]
  return (
    <svg width={34} viewBox="0 0 321 166" shapeRendering="crispEdges" aria-hidden="true">
      {bars.map(([x, y, w, h, red], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} fill={red ? MIT_RED : 'currentColor'} />
      ))}
    </svg>
  )
}

/* Issuer wordmarks beyond MIT, approximated with the site's font stack in
   each brand's signature treatment: CISSP's heavy grotesque in ink (mode-
   aware via --text, as ISC2's black would vanish at night), Security+'s
   white-on-red plate, CompTIA-red-over-ink A+, and LPI's stacked blue
   Linux Essentials. Brand colors stay put where they read on both modes. */
const COMPTIA_RED = '#C8202F'
const LPI_BLUE = '#2BA9E0'

function BrandMark({ logo }: { logo: NonNullable<Certification['logo']> }) {
  if (logo === 'mit') return <MitMark />
  if (logo === 'cissp')
    return (
      <span style={{ fontFamily: 'var(--font-body)', fontWeight: 700, fontSize: 12.5, letterSpacing: '.01em', color: 'var(--text)' }}>
        CISSP
      </span>
    )
  if (logo === 'security-plus')
    return (
      <span
        style={{
          background: COMPTIA_RED,
          color: '#fff',
          fontFamily: 'var(--font-body)',
          fontWeight: 700,
          fontSize: 8,
          letterSpacing: '.01em',
          padding: '4px 4px',
          borderRadius: 2,
          whiteSpace: 'nowrap',
        }}
      >
        Security+
      </span>
    )
  if (logo === 'a-plus')
    return (
      <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-body)', fontWeight: 700, lineHeight: 1 }}>
        <span style={{ color: COMPTIA_RED, fontSize: 9.5 }}>CompTIA</span>
        <span style={{ color: 'var(--text)', fontSize: 17, marginTop: 3 }}>A+</span>
      </span>
    )
  // linux-essentials
  return (
    <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', fontFamily: 'var(--font-display)', fontWeight: 700, lineHeight: 1.15, color: LPI_BLUE }}>
      <span style={{ fontSize: 12, letterSpacing: '.1em' }}>LINUX</span>
      <span style={{ fontSize: 7.5, letterSpacing: '.06em' }}>ESSENTIALS</span>
    </span>
  )
}

/* One detail line. The full string sits in the flow at opacity 0 — it
   reserves the final layout so nothing reflows mid-type, and it is what
   screen readers get — while an aria-hidden overlay reveals characters. */
function TypeLine({
  text,
  play,
  delay,
  className,
  style,
}: {
  text: string
  play: boolean
  delay: number
  className?: string
  style?: CSSProperties
}) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (!play) {
      setN(0)
      return
    }
    if (prefersReducedMotion()) {
      setN(text.length)
      return
    }
    let i = 0
    let timer = 0
    const start = window.setTimeout(() => {
      timer = window.setInterval(() => {
        i += 1
        setN(i)
        if (i >= text.length) window.clearInterval(timer)
      }, 9)
    }, delay)
    return () => {
      window.clearTimeout(start)
      window.clearInterval(timer)
    }
  }, [play, text, delay])
  /* Once typed out, collapse to a single plain-text node — the two-layer
     trick would put an invisible duplicate of every line into copied text. */
  const done = n >= text.length
  return (
    <div className={className} style={style}>
      {/* the copy zone hugs this line's text — an inline-block sized by the
          glyphs plus a small grab margin (padding pulled back by negative
          margin, so nothing shifts visually). Clicks on the blank remainder
          of the row fall through to the tile toggle. */}
      <span
        data-copyzone
        style={{
          display: 'inline-block',
          position: 'relative',
          padding: '3px 6px 3px 0',
          margin: '-3px -6px -3px 0',
          userSelect: 'text',
          cursor: 'text',
        }}
      >
        <span style={done ? undefined : { opacity: 0 }}>{text}</span>
        {/* right: 6 pins the overlay to the content box — without it the
            overlay wraps against the padding box (6px wider) and long lines
            can break one word later than the reserved text mid-type */}
        {!done && (
          <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: 3, right: 6, userSelect: 'none' }}>
            {text.slice(0, n)}
          </span>
        )}
      </span>
    </div>
  )
}

export default function CertTiles() {
  const [open, setOpen] = useState(false)
  const toggle = () => setOpen((o) => !o)
  const reduced = prefersReducedMotion()
  const settle = (props: string) => (reduced ? 'none' : props)

  return (
    <div className="rv" style={{ marginTop: 26 }}>
      <div className="ey" style={{ margin: '0 0 14px' }}>Certifications</div>
      <div id="cert-tiles" className="cert-grid">
        {CERTIFICATIONS.map((c, i) => (
          /* no visible toggle control by design — the tiles themselves are the
             interaction: role/tabIndex/keydown keep it keyboard-accessible.
             They can't be <button>s because the Verify anchors live inside. */
          <div
            key={c.name}
            className="cert-tile is-toggle"
            role="button"
            tabIndex={0}
            aria-expanded={open}
            /* scope the accessible name to the cert title — without this the
               button's name-from-content flattens issuer/ID/Verify into one
               unreadable label for screen readers */
            aria-label={c.name}
            onClick={(e) => {
              /* The details are working text — IDs get pasted into issuer
                 verify forms — so clicks on a text line (each line's snug
                 copy zone), and any click that ends a drag-selection, must
                 not collapse the tiles. Everything else — title, badge,
                 blank tile space, even the empty remainder of a detail
                 row — still toggles. */
              if ((e.target as HTMLElement).closest('a,[data-copyzone]')) return
              /* isCollapsed, not toString(): toString is rendering-aware and
                 returns '' for text mid-typewriter (opacity 0), which would
                 let a click destroy an in-progress selection. */
              const sel = window.getSelection()
              if (sel && !sel.isCollapsed) return
              toggle()
            }}
            onKeyDown={(e) => {
              if ((e.target as HTMLElement).closest('a')) return
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                /* same contract as the click path: never clip away a live
                   selection (the tile keeps focus after a drag inside it) */
                const sel = window.getSelection()
                if (sel && !sel.isCollapsed) return
                toggle()
              }
            }}
          >
            {/* clipper animates the badge's footprint; the badge itself stays
                56×56 inside so its border never renders at partial size */}
            <div
              aria-hidden="true"
              style={{
                flex: 'none',
                width: open ? 56 : 0,
                height: open ? 56 : 0,
                marginRight: open ? 0 : -14,
                opacity: open ? 1 : 0,
                overflow: 'hidden',
                transition: settle(
                  'width .3s var(--ease-settle), height .3s var(--ease-settle), margin .3s var(--ease-settle), opacity .2s'
                ),
              }}
            >
              <div
                className="cert-badge"
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
                {c.logo ? <BrandMark logo={c.logo} /> : c.mark ?? '✦'}
              </div>
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="disp" style={{ fontSize: 14 }}>{c.name}</div>
              {/* 0fr → 1fr grid trick: height animates without measurement */}
              <div
                aria-hidden={!open}
                style={{
                  display: 'grid',
                  gridTemplateRows: open ? '1fr' : '0fr',
                  transition: settle('grid-template-rows .3s var(--ease-settle)'),
                }}
              >
                <div style={{ overflow: 'hidden', minHeight: 0 }}>
                  <TypeLine
                    className="stencil"
                    style={{ marginTop: 4 }}
                    text={`${c.issuer}${c.year ? ` · ${c.year}` : ''}`}
                    play={open}
                    delay={120 + i * 50}
                  />
                  {c.credId && (
                    <TypeLine
                      className="stencil"
                      style={{ marginTop: 3, opacity: 0.6 }}
                      text={`ID · ${c.credId}`}
                      play={open}
                      delay={200 + i * 50}
                    />
                  )}
                  {c.verify && (
                    <a
                      className="stencil"
                      href={c.verify}
                      target="_blank"
                      rel="noreferrer noopener"
                      /* out of the tab order while collapsed — the 0fr row
                         hides it visually but not from keyboard focus */
                      tabIndex={open ? 0 : -1}
                      onClick={(e) => e.stopPropagation()}
                      style={{
                        display: 'inline-block',
                        marginTop: 6,
                        color: 'var(--label-on-bg)',
                        textDecoration: 'none',
                        opacity: open ? 0.55 : 0,
                        transition: settle('opacity .25s ease .35s'),
                      }}
                    >
                      Verify ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
