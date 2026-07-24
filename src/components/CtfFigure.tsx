import type { CSSProperties, ReactNode } from 'react'

/* CtfFigure — original, SPOILER-FREE vignettes for the steganography-ctf boxes.
   These are cover art, not walkthroughs: they evoke each challenge's domain in
   the site's stencil-and-hairline language (cream washes on the --screen ground,
   material gold for one accent) without printing a single flag, key, filename,
   command, cipher name, address, or resolved location. If a figure would help a
   player *win*, it does not belong here. */

export type CtfFigureKind = 'flagship' | 'warehouse' | 'lvl1' | 'lvl2' | 'lvl3'

const MONO = 'var(--font-mono)'
const GOLD = 'var(--gold)'
const C28 = 'var(--cream-28)'
const C50 = 'var(--cream-50)'
const C70 = 'var(--cream-70)'

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

/* FLAGSHIP — the overall steganography emblem: a carrier image with its corner
   peeled back to reveal a hidden layer of data underneath. Iconic to the whole
   set (things concealed inside other things) and gives nothing away. */
function Flagship() {
  const bits: Array<[number, number]> = [
    [248, 156], [260, 156], [272, 150], [256, 146], [278, 140],
    [266, 134], [282, 128], [250, 144], [270, 160],
  ]
  return (
    <Frame caption="STEGANOGRAPHY CTF">
      {/* the carrier image */}
      <rect x={30} y={26} width={260} height={140} fill="none" stroke={C50} strokeWidth={1.25} />
      <Picture x={30} y={26} w={220} h={140} />
      {/* revealed underlayer at the peeled corner */}
      <polygon points="228,166 290,166 290,108" fill="var(--gold-08)" />
      {bits.map(([bx, by], i) => (
        <rect key={i} x={bx} y={by} width={3} height={3} fill={GOLD} opacity={0.85} />
      ))}
      {/* the fold crease + a hint of the lifted flap */}
      <line x1={228} y1={166} x2={290} y2={108} stroke={GOLD} strokeWidth={1.25} />
      <polyline points="228,166 240,150 290,108" fill="none" stroke={GOLD} strokeWidth={0.6} opacity={0.7} />
      <text x={30} y={186} fontFamily={MONO} fontSize={7.5} letterSpacing=".12em" fill={C50}>
        HIDDEN IN PLAIN SIGHT
      </text>
    </Frame>
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
        <line key={i} x1={194} y1={y} x2={i === 2 ? 250 : 286} y2={y} stroke={i === 2 ? GOLD : C28} strokeWidth={i === 2 ? 2 : 2} opacity={i === 2 ? 0.9 : 0.5} />
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
