import { useEffect, useState, type CSSProperties } from 'react'
import { CERTIFICATIONS } from '../content/background'
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
    <div className={className} style={{ position: 'relative', ...style }}>
      <span style={done ? undefined : { opacity: 0 }}>{text}</span>
      {!done && (
        <span aria-hidden="true" style={{ position: 'absolute', left: 0, top: 0, userSelect: 'none' }}>
          {text.slice(0, n)}
        </span>
      )}
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
            onClick={(e) => {
              /* The details are working text — IDs get pasted into issuer
                 verify forms — so clicks there, and any click that ends a
                 drag-selection, must not collapse the tiles. Title, badge,
                 and blank tile space still toggle. */
              if ((e.target as HTMLElement).closest('a,[data-copyzone]')) return
              if (window.getSelection()?.toString()) return
              toggle()
            }}
            onKeyDown={(e) => {
              if ((e.target as HTMLElement).closest('a')) return
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
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
                {c.logo === 'mit' ? <MitMark /> : c.mark ?? '✦'}
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
                <div data-copyzone style={{ overflow: 'hidden', minHeight: 0, userSelect: 'text', cursor: 'text' }}>
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
