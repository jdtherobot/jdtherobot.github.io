import { useState, useEffect, type CSSProperties, type ReactNode } from 'react'

/* CtfFigure — original, SPOILER-FREE vignettes for the steganography-ctf boxes.
   These are cover art, not walkthroughs: they evoke each challenge's domain in
   the site's stencil-and-hairline language (cream washes on the --screen ground,
   material gold for one accent) without printing a single flag, key, filename,
   command, cipher name, address, or resolved location. If a figure would help a
   player *win*, it does not belong here.

   The flagship is a slideshow that cross-fades through three real techniques
   from the set — EXIF metadata (loupe), JPEG quantization-table stego
   (bit-planes), and a binwalk carve (signal in noise) — every 4s (paused under
   prefers-reduced-motion). These name techniques the overview already lists
   openly; they still reveal no flag, key, password, or the four-square cipher. */

export type CtfFigureKind = 'flagship' | 'warehouse' | 'lvl1' | 'lvl2' | 'lvl3'

const MONO = 'var(--font-mono)'
const GOLD = 'var(--gold)'
const G10 = 'var(--gold-10)'
const G40 = 'var(--gold-40)'
const G72 = 'var(--gold-72)'
const C28 = 'var(--cream-28)'
const C50 = 'var(--cream-50)'
const C70 = 'var(--cream-70)'
// cream shades between the named tokens; the --screen ground is dark in both
// themes, so these literals read the same in light and dark.
const C22 = 'rgba(236,226,198,0.22)'
const C45 = 'rgba(236,226,198,0.45)'
const C55 = 'rgba(236,226,198,0.55)'

// deterministic RNG so the binary glyphs are stable across re-renders/fades
function makeRng(seed: number) {
  let s = seed >>> 0
  return () => {
    s = (Math.imul(s, 1103515245) + 12345) & 0x7fffffff
    return s / 0x7fffffff
  }
}

function Frame({ caption, children }: { caption: string; children: ReactNode }) {
  return (
    <div
      className="ctf-fig"
      style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', background: 'var(--screen)', overflow: 'hidden' }}
    >
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect x={6} y={6} width={308} height={188} fill="none" stroke="var(--gold-25)" strokeWidth={1} />
        {children}
        <text x={306} y={190} fontFamily={MONO} fontSize={7} letterSpacing=".1em" fill={C28} textAnchor="end">
          {caption}
        </text>
      </svg>
    </div>
  )
}

/* flagship frame: a domain tagline bottom-left + the STEGANOGRAPHY CTF stamp */
function FlagFrame({ tagline, children }: { tagline: string; children: ReactNode }) {
  return (
    <div
      className="ctf-fig"
      style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', background: 'var(--screen)', overflow: 'hidden' }}
    >
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        <rect x={6} y={6} width={308} height={188} fill="none" stroke="var(--gold-25)" strokeWidth={1} />
        {children}
        <text x={14} y={185} fontFamily={MONO} fontSize={8} letterSpacing=".16em" fill={C55}>{tagline}</text>
        <text x={306} y={185} fontFamily={MONO} fontSize={7} letterSpacing=".11em" fill={C28} textAnchor="end">STEGANOGRAPHY CTF</text>
      </svg>
    </div>
  )
}

/* small padlock, closed — generic "encryption / locked", no values */
function Lock({ x, y, s = 1, stroke = GOLD }: { x: number; y: number; s?: number; stroke?: string }) {
  return (
    <g stroke={stroke} strokeWidth={1} fill="none">
      <rect x={x} y={y} width={12 * s} height={9 * s} rx={1.5} />
      <path d={`M ${x + 2.5 * s} ${y} v ${-3 * s} a ${3.5 * s} ${3.5 * s} 0 0 1 ${7 * s} 0 v ${3 * s}`} />
    </g>
  )
}

/* classic image-icon interior: a horizon ridge + a sun */
function Picture({ x, y, w, h, stroke = C50 }: { x: number; y: number; w: number; h: number; stroke?: string }) {
  const cx = x + w * 0.24
  const cy = y + h * 0.3
  return (
    <g stroke={stroke} strokeWidth={1} fill="none">
      <circle cx={cx} cy={cy} r={Math.min(w, h) * 0.11} />
      <polyline
        points={`${x},${y + h * 0.82} ${x + w * 0.3},${y + h * 0.5} ${x + w * 0.5},${y + h * 0.66} ${x + w * 0.72},${y + h * 0.42} ${x + w},${y + h * 0.66}`}
      />
    </g>
  )
}

// ---- flagship slide B · LOUPE — a photo that resolves into data under a lens
const LOUPE_CX = 176
const LOUPE_CY = 116
const LOUPE_R = 40
const loupeGrid = (() => {
  const rng = makeRng(7788)
  const cells: { x: number; y: number; ch: string; on: boolean }[] = []
  for (let r = 0; r < 7; r++)
    for (let c = 0; c < 9; c++) {
      const x = LOUPE_CX - 32 + c * 8
      const y = LOUPE_CY - 26 + r * 8
      const dx = x - LOUPE_CX
      const dy = y - LOUPE_CY
      if (dx * dx + dy * dy > (LOUPE_R - 6) * (LOUPE_R - 6)) continue
      const on = rng() > 0.5
      cells.push({ x, y, ch: on ? '1' : '0', on })
    }
  return cells
})()

function Loupe() {
  // handle: collinear with the lens center at 45° down-right, so it reads as a
  // real magnifying glass instead of leaving the rim at an angle
  const u = Math.SQRT1_2 // cos/sin 45°
  const hx1 = LOUPE_CX + (LOUPE_R - 4) * u
  const hy1 = LOUPE_CY + (LOUPE_R - 4) * u
  const hx2 = LOUPE_CX + (LOUPE_R + 34) * u
  const hy2 = LOUPE_CY + (LOUPE_R + 34) * u
  return (
    <FlagFrame tagline="EXIF METADATA">
      <rect x={34} y={34} width={176} height={118} fill="none" stroke={C55} strokeWidth={1.25} />
      <Picture x={34} y={34} w={176} h={118} stroke={C28} />
      <clipPath id="ctf-lens">
        <circle cx={LOUPE_CX} cy={LOUPE_CY} r={LOUPE_R - 3} />
      </clipPath>
      <circle cx={LOUPE_CX} cy={LOUPE_CY} r={LOUPE_R - 3} fill="#0b0a0d" />
      <g clipPath="url(#ctf-lens)">
        {loupeGrid.map((c, i) => (
          <text key={i} x={c.x} y={c.y} fontFamily={MONO} fontSize={8} fill={c.on ? G72 : C45}>{c.ch}</text>
        ))}
      </g>
      {/* handle first, rim on top so the join is capped cleanly */}
      <line x1={hx1} y1={hy1} x2={hx2} y2={hy2} stroke={GOLD} strokeWidth={6} strokeLinecap="round" />
      <circle cx={LOUPE_CX} cy={LOUPE_CY} r={LOUPE_R} fill="none" stroke={GOLD} strokeWidth={2.5} />
    </FlagFrame>
  )
}

// ---- flagship slide C · BITS — the photo peels into layers; the payload rides the JPEG's quantization tables
const BITS_ON = [3, 4, 9, 10, 11, 16, 17, 22]
function Bits() {
  return (
    <FlagFrame tagline="QUANTIZATION TABLES">
      <Picture x={60} y={30} w={150} h={24} stroke={C55} />
      <rect x={60} y={30} width={150} height={24} fill="none" stroke={C55} strokeWidth={1.1} />
      {Array.from({ length: 6 }, (_, i) => (
        <rect key={i} x={60} y={42 + i * 9} width={150} height={5} fill="none" stroke={`rgba(236,226,198,${(0.5 - i * 0.06).toFixed(2)})`} strokeWidth={1} />
      ))}
      <path d="M 210,93 C 240,96 240,116 214,120" fill="none" stroke={G40} strokeWidth={1} strokeDasharray="3 3" />
      <rect x={58} y={116} width={152} height={13} fill={G10} stroke={G40} strokeWidth={1} />
      {Array.from({ length: 24 }, (_, c) => (
        <rect key={c} x={62 + c * 6} y={120} width={4} height={5} fill={BITS_ON.includes(c) ? GOLD : C28} />
      ))}
      <text x={60} y={146} fontFamily={MONO} fontSize={7.5} letterSpacing=".08em" fill={G72}>low bits of the DCT divisors</text>
    </FlagFrame>
  )
}

// ---- flagship slide E · SIGNAL — a gold signal threads through a field of static
const signalField = (() => {
  const rng = makeRng(4242)
  const cells: { x: number; y: number; ch: string; on: boolean }[] = []
  for (let r = 0; r < 12; r++)
    for (let c = 0; c < 30; c++) {
      const x = 18 + c * 9.6
      const y = 30 + r * 11
      const wave = 96 + Math.sin((x / 320) * Math.PI * 3) * 34
      const on = Math.abs(y - wave) < 6
      cells.push({ x: +x.toFixed(1), y, ch: rng() > 0.5 ? '1' : '0', on })
    }
  return cells
})()

function Signal() {
  return (
    <FlagFrame tagline="BINWALK — CARVE OUT">
      {signalField.map((c, i) => (
        <text key={i} x={c.x} y={c.y} fontFamily={MONO} fontSize={8} fill={c.on ? G72 : C22}>{c.ch}</text>
      ))}
    </FlagFrame>
  )
}

/* FLAGSHIP — cross-fading slideshow: loupe → bit-planes → signal, 4s each. */
const FLAGSHIP_SLIDES = [Loupe, Bits, Signal]
function Flagship() {
  const [i, setI] = useState(0)
  useEffect(() => {
    const mq = typeof window !== 'undefined' && window.matchMedia ? window.matchMedia('(prefers-reduced-motion: reduce)') : null
    if (mq && mq.matches) return // honor reduced motion: hold on the first slide
    const id = window.setInterval(() => setI((n) => (n + 1) % FLAGSHIP_SLIDES.length), 4000)
    return () => window.clearInterval(id)
  }, [])
  return (
    <div style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10' }}>
      {FLAGSHIP_SLIDES.map((Slide, idx) => (
        <div
          key={idx}
          aria-hidden={idx !== i}
          style={{ position: 'absolute', inset: 0, opacity: idx === i ? 1 : 0, transition: 'opacity .8s ease' }}
        >
          <Slide />
        </div>
      ))}
    </div>
  )
}

/* WAREHOUSE — a top-down memory warehouse and an abstract address token. No VA,
   no bit-split, no level names, no resolved box: the mapping is exactly what the
   player has to work out. */
function Warehouse() {
  const rackRow = (y: number) =>
    Array.from({ length: 8 }, (_, i) => (
      <rect key={`${y}-${i}`} x={22 + i * 34} y={y} width={28} height={13} fill="none" stroke={C28} strokeWidth={1} />
    ))
  return (
    <Frame caption="FIG.04">
      {/* an address token — five blank fields, deliberately unlabeled */}
      <text x={22} y={32} fontFamily={MONO} fontSize={7.5} letterSpacing=".1em" fill={C50}>
        ADDRESS
      </text>
      {Array.from({ length: 5 }, (_, i) => (
        <rect key={i} x={78 + i * 20} y={24} width={18} height={12} fill={i === 4 ? 'var(--gold-12)' : 'none'} stroke={C50} strokeWidth={1} />
      ))}
      {/* the arrow enters the space but resolves to nothing in particular */}
      <path d="M 96,42 L 96,54 L 150,54" fill="none" stroke={GOLD} strokeWidth={1} strokeDasharray="3 3" opacity={0.6} />
      <text x={156} y={57} fontFamily={MONO} fontSize={9} fill={GOLD} opacity={0.7}>?</text>
      {/* the warehouse: rows of racks, an aisle down the middle */}
      {rackRow(74)}
      {rackRow(90)}
      {rackRow(120)}
      {rackRow(136)}
      {rackRow(162)}
      <line x1={12} y1={107} x2={308} y2={107} stroke={C28} strokeWidth={1} strokeDasharray="2 4" opacity={0.5} />
      <text x={22} y={186} fontFamily={MONO} fontSize={7} letterSpacing=".1em" fill={C28}>
        RESOLVE THE ADDRESS TO A SHELF
      </text>
    </Frame>
  )
}

/* LVL 1 — a photograph that carries more than pixels: unlabeled metadata fields
   and a lock. No EXIF values, no command, no flag, no filename. */
function Lvl1() {
  return (
    <Frame caption="FIG.01">
      <rect x={30} y={44} width={120} height={92} fill="none" stroke={C50} strokeWidth={1.25} />
      <Picture x={30} y={44} w={120} h={92} />
      <Lock x={136} y={120} s={1.1} />
      {/* metadata fields trailing off the image — unlabeled, unreadable */}
      <rect x={182} y={48} width={116} height={84} fill="none" stroke={C28} strokeWidth={1} />
      {[62, 76, 90, 104, 118].map((y, i) => (
        <line key={i} x1={194} y1={y} x2={i === 2 ? 250 : 286} y2={y} stroke={i === 2 ? GOLD : C28} strokeWidth={2} opacity={i === 2 ? 0.9 : 0.5} />
      ))}
      <text x={182} y={148} fontFamily={MONO} fontSize={7} letterSpacing=".1em" fill={C28}>
        A PICTURE IS DATA TOO
      </text>
    </Frame>
  )
}

/* LVL 2 — a document concealed inside an image, behind a key. No document
   contents, no flag, no key text, no filename. */
function Lvl2() {
  return (
    <Frame caption="FIG.02">
      {/* the hidden sheet, peeking out from behind the image */}
      <rect x={150} y={40} width={110} height={128} fill="var(--screen)" stroke={C50} strokeWidth={1} />
      {[58, 72, 86, 100, 114, 128, 142].map((y, i) => (
        <line key={i} x1={198} y1={y} x2={248} y2={y} stroke={C28} strokeWidth={2} opacity={0.5} />
      ))}
      {/* the carrier image on top */}
      <rect x={34} y={54} width={128} height={96} fill="var(--screen)" stroke={C50} strokeWidth={1.25} />
      <Picture x={34} y={54} w={128} h={96} />
      {/* the passphrase gate */}
      <Lock x={150} y={96} s={1.3} />
      <text x={34} y={172} fontFamily={MONO} fontSize={7} letterSpacing=".1em" fill={C28}>
        SOMETHING IS TUCKED INSIDE
      </text>
    </Frame>
  )
}

/* LVL 3 — one carrier, layers within layers, a secret buried deep. No filename,
   no payload count, no segment names, no flag, no password recipe. */
function Lvl3() {
  return (
    <Frame caption="FIG.03">
      <rect x={44} y={30} width={232} height={140} rx={6} fill="none" stroke={C50} strokeWidth={1.25} />
      <rect x={70} y={46} width={180} height={108} rx={6} fill="none" stroke={C50} strokeWidth={1} />
      <rect x={96} y={62} width={128} height={76} rx={5} fill="none" stroke={C28} strokeWidth={1} />
      <rect x={122} y={78} width={76} height={44} rx={4} fill="var(--gold-08)" stroke="var(--gold-25)" strokeWidth={1} />
      {/* the buried core */}
      <rect x={150} y={92} width={20} height={16} rx={2} fill="none" stroke={GOLD} strokeWidth={1.25} />
      <circle cx={160} cy={100} r={2.5} fill={GOLD} />
      {/* locks marking two of the layers */}
      <Lock x={52} y={150} s={1} stroke={C50} />
      <Lock x={104} y={120} s={1} stroke={C50} />
      <text x={44} y={186} fontFamily={MONO} fontSize={7} letterSpacing=".1em" fill={C28}>
        ONE FILE IS NEVER JUST ONE FILE
      </text>
      <text x={276} y={40} fontFamily={MONO} fontSize={7} letterSpacing=".1em" fill={C70} textAnchor="end">
        ▢
      </text>
    </Frame>
  )
}

const FIGURES: Record<CtfFigureKind, () => ReactNode> = {
  /* keys map 1:1 to the ctf doc slugs used on the landing rail */
  flagship: Flagship,
  warehouse: Warehouse,
  lvl1: Lvl1,
  lvl2: Lvl2,
  lvl3: Lvl3,
}

export default function CtfFigure({ kind, style }: { kind: CtfFigureKind; style?: CSSProperties }) {
  const Fig = FIGURES[kind]
  return (
    <div style={style}>
      <Fig />
    </div>
  )
}
