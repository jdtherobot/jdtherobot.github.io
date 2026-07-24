import type { CSSProperties, ReactNode } from 'react'

/* CtfFigure — original vignettes for the steganography-ctf boxes. Each is
   drawn (no images) on the --screen ground in the site's stencil-and-hairline
   language: cream washes for structure, material gold for the one thing each
   challenge is really about. The warehouse one is a top-down sketch of the
   memory-warehouse sim itself. */

export type CtfFigureKind = 'flagship' | 'warehouse' | 'lvl1' | 'lvl2' | 'lvl3'

const MONO = 'var(--font-mono)'
const GOLD = 'var(--gold)'
const C28 = 'var(--cream-28)'
const C50 = 'var(--cream-50)'
const C70 = 'var(--cream-70)'

function T({
  x,
  y,
  size = 8,
  fill = C50,
  anchor = 'start',
  children,
}: {
  x: number
  y: number
  size?: number
  fill?: string
  anchor?: 'start' | 'middle' | 'end'
  children: ReactNode
}) {
  return (
    <text x={x} y={y} fontFamily={MONO} fontSize={size} letterSpacing=".08em" fill={fill} textAnchor={anchor}>
      {children}
    </text>
  )
}

function Frame({ caption, style, children }: { caption: string; style?: CSSProperties; children: ReactNode }) {
  return (
    <div
      className="ctf-fig"
      style={{ position: 'relative', width: '100%', aspectRatio: '16 / 10', background: 'var(--screen)', overflow: 'hidden', ...style }}
    >
      <svg viewBox="0 0 320 200" preserveAspectRatio="xMidYMid meet" aria-hidden="true" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
        {children}
        <text x={308} y={191} fontFamily={MONO} fontSize={7} letterSpacing=".1em" fill={C28} textAnchor="end">
          {caption}
        </text>
      </svg>
    </div>
  )
}

/* Top-down slice of the memory warehouse: rack bands, the walked aisle, and
   the one box the page-table walk resolves to. */
function Warehouse() {
  const cell = (x: number, y: number, hot = false) => (
    <rect key={`${x}-${y}`} x={x} y={y} width={24} height={11} fill={hot ? GOLD : 'none'} stroke={hot ? GOLD : C28} strokeWidth={1} />
  )
  const band = (y: number, hotIdx = -1) => Array.from({ length: 8 }, (_, i) => cell(20 + i * 28, y, i === hotIdx))
  return (
    <Frame caption="FIG.04 · MEMORY WAREHOUSE">
      <T x={14} y={22}>VA 0x0000_0100_4040_1005</T>
      <T x={14} y={36} fill={GOLD}>→ 2 · 1 · 2 · 1 · 5</T>
      {band(56)}
      {band(71)}
      {band(96, 2)}
      {band(111)}
      {band(136)}
      {band(151)}
      {/* the walk: entry, down the aisle, into row 2 / bay 2, box 5 */}
      <polyline points="6,190 6,101 74,101" fill="none" stroke={GOLD} strokeWidth={1} strokeDasharray="3 3" opacity={0.7} />
      <circle cx={88} cy={101.5} r={9} fill="none" stroke={GOLD} strokeWidth={1} />
      <line x1={97} y1={101.5} x2={148} y2={84} stroke={GOLD} strokeWidth={0.75} opacity={0.6} />
      <T x={152} y={84} size={7.5} fill={GOLD}>ROW 2 · SHELF 1 · BAY 2 · BOX 5</T>
      <T x={14} y={176} size={7} fill={C28}>PML4 → PDPT → PD → PT → OFFSET</T>
    </Frame>
  )
}

/* Intercepted email → squadron photo → the EXIF comment that isn't a comment. */
function Lvl1() {
  return (
    <Frame caption="FIG.01 · EXIF / OPENSSL">
      <rect x={16} y={26} width={72} height={46} fill="none" stroke={C50} strokeWidth={1} />
      <polyline points="16,26 52,54 88,26" fill="none" stroke={C50} strokeWidth={1} />
      <T x={16} y={86} size={7}>email.eml</T>
      <line x1={94} y1={49} x2={126} y2={49} stroke={GOLD} strokeWidth={1} />
      <polyline points="121,45 127,49 121,53" fill="none" stroke={GOLD} strokeWidth={1} />
      <rect x={132} y={22} width={84} height={54} fill="none" stroke={C50} strokeWidth={1} />
      {/* the squadron photo — rank and file, no badger in frame */}
      {Array.from({ length: 12 }, (_, i) => (
        <circle key={i} cx={144 + (i % 6) * 12} cy={40 + Math.floor(i / 6) * 14} r={3} fill="none" stroke={C28} strokeWidth={1} />
      ))}
      <T x={132} y={86} size={7}>badger_photo.jpeg</T>
      <rect x={16} y={100} width={288} height={64} fill="none" stroke={C28} strokeWidth={1} />
      <T x={26} y={118} size={7.5}>MAKE      —</T>
      <T x={26} y={131} size={7.5}>MODEL     —</T>
      <T x={26} y={144} size={7.5} fill={GOLD}>COMMENT   U2FsdGVkX18nGm…</T>
      <T x={26} y={157} size={7.5} fill={C70}>openssl -aes-256-cbc → Flag{'{'}H0NeyB4d6er…</T>
    </Frame>
  )
}

/* One cute stego-badger, one document it should not be carrying. */
function Lvl2() {
  return (
    <Frame caption="FIG.02 · STEGHIDE / ROCKYOU">
      <rect x={18} y={30} width={112} height={84} fill="none" stroke={C50} strokeWidth={1} />
      {/* the badger in its stegosaurus onesie: back plates + body */}
      <polyline points="34,84 42,68 50,84 58,68 66,84 74,68 82,84 90,68 98,84" fill="none" stroke={GOLD} strokeWidth={1} />
      <path d="M30,98 Q64,78 104,98" fill="none" stroke={C50} strokeWidth={1} />
      <circle cx={104} cy={92} r={4} fill="none" stroke={C50} strokeWidth={1} />
      <T x={18} y={126} size={7}>stego_badger.jpeg</T>
      {/* extraction: the 202-line document sliding out */}
      <line x1={136} y1={72} x2={160} y2={72} stroke={GOLD} strokeWidth={1} />
      <polyline points="155,68 161,72 155,76" fill="none" stroke={GOLD} strokeWidth={1} />
      <rect x={168} y={24} width={136} height={140} fill="none" stroke={C50} strokeWidth={1} />
      <T x={178} y={44} size={7.5} fill={GOLD}>L1 Flag{'{'}DanG 7hat'S…</T>
      {Array.from({ length: 5 }, (_, i) => (
        <line key={i} x1={178} y1={56 + i * 10} x2={294} y2={56 + i * 10} stroke={C28} strokeWidth={2} opacity={0.5} />
      ))}
      <T x={178} y={119} size={7.5} fill={GOLD}>L9 UPNAHLNSIBESOLTUE…</T>
      {Array.from({ length: 3 }, (_, i) => (
        <line key={i} x1={178} y1={130 + i * 10} x2={294} y2={130 + i * 10} stroke={C28} strokeWidth={2} opacity={0.5} />
      ))}
      <T x={178} y={158} size={7} fill={C28}>+ 201 strings · not noise</T>
    </Frame>
  )
}

/* The carve: one JPEG, six payloads stacked behind it, three locks deep. */
function Lvl3() {
  const segs: Array<[string, number, string]> = [
    ['jpeg', 86, 'var(--gold-06)'],
    ['enc', 40, 'var(--gold-12)'],
    ['txt', 18, 'none'],
    ['zip', 32, 'none'],
    ['jpg', 52, 'var(--gold-12)'],
    ['enc', 42, 'var(--gold-25)'],
    ['enc', 22, 'none'],
  ]
  let x = 14
  const bars = segs.map(([label, w, fill], i) => {
    const el = (
      <g key={i}>
        <rect x={x} y={78} width={w} height={26} fill={fill} stroke={C50} strokeWidth={1} />
        <T x={x + w / 2} y={i % 2 ? 72 : 118} size={6.5} anchor="middle" fill={i === 5 ? GOLD : C50}>{label}</T>
      </g>
    )
    x += w
    return el
  })
  return (
    <Frame caption="FIG.03 · BINWALK CARVE">
      <T x={14} y={26}>Honey.jpeg · 277,078 B</T>
      <T x={306} y={26} size={7} fill={C28} anchor="end">binwalk -e</T>
      {bars}
      {/* offset ticks */}
      {[14, 100, 140, 158, 190, 242, 284, 306].map((tx, i) => (
        <line key={i} x1={tx} y1={104} x2={tx} y2={110} stroke={C28} strokeWidth={1} />
      ))}
      <T x={14} y={146} size={7.5} fill={C70}>carve → reason out the password → qtable key</T>
      <T x={14} y={162} size={7.5} fill={GOLD}>→ Flag{'{'}Y0u haVe EnCouNTeR3d…</T>
    </Frame>
  )
}

/* The set's signature: the four-square note, four corner keys, one house style. */
function Flagship() {
  const grid = (gx: number, gy: number) => (
    <g>
      <rect x={gx} y={gy} width={60} height={60} fill="none" stroke={C50} strokeWidth={1} />
      {Array.from({ length: 4 }, (_, i) => (
        <g key={i}>
          <line x1={gx + (i + 1) * 12} y1={gy} x2={gx + (i + 1) * 12} y2={gy + 60} stroke={C28} strokeWidth={0.5} />
          <line x1={gx} y1={gy + (i + 1) * 12} x2={gx + 60} y2={gy + (i + 1) * 12} stroke={C28} strokeWidth={0.5} />
        </g>
      ))}
    </g>
  )
  return (
    <Frame caption="STEGANOGRAPHY CTF · 4 CHALLENGES">
      {grid(30, 36)}
      {grid(98, 36)}
      {grid(30, 104)}
      {grid(98, 104)}
      <T x={30} y={28} size={8} fill={GOLD}>HONEY</T>
      <T x={158} y={28} size={8} fill={GOLD} anchor="end">BADGER</T>
      <T x={30} y={178} size={8} fill={GOLD}>HECK</T>
      <T x={158} y={178} size={8} fill={GOLD} anchor="end">YEAH</T>
      <T x={196} y={58} size={8} fill={C70}>dCode ▢ ▢ ▢ ▢</T>
      <T x={196} y={74} size={8} fill={C50}>Line #9</T>
      <T x={196} y={106} size={7.5} fill={C28}>EXIF · steghide ·</T>
      <T x={196} y={118} size={7.5} fill={C28}>binwalk · page tables</T>
      <T x={196} y={150} size={8} fill={GOLD}>Flag{'{'} … {'}'}</T>
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
