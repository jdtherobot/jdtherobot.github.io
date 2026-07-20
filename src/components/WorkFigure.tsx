import type { CSSProperties, ReactNode } from 'react'

/* WorkFigure — themed pictogram figures for the career accomplishment cards.
   Shares the code-window chrome (bar + gold mark dot + lowercase mono label)
   and the standard 16/10 figure box with CodeFigure / DashboardFigure. Each
   drawing is a mono-weight schematic in the system's materials: gold strokes,
   cream ink, bronze secondary — on the constant carbon screen ground. */

const BRONZE = '#8A6F2E' // --stat's day value; fixed — the ground never inverts

export type WorkFigureKind =
  | 'deployed-comms'
  | 'plans'
  | 'gantt'
  | 'enclave'
  | 'org-tree'
  | 'globe-route'
  | 'lifecycle'
  | 'checklist'
  | 'bench-trace'
  | 'ticket-queue'
  | 'rack'
  | 'top-grad'

const LABELS: Record<WorkFigureKind, string> = {
  'deployed-comms': 'deployed.comms',
  plans: 'plans.reqs',
  gantt: 'pm.portfolio',
  enclave: 'enclave.map',
  'org-tree': 'ops.tree',
  'globe-route': 'deploy.log',
  lifecycle: 'lifecycle.loop',
  checklist: 'acq.checklist',
  'bench-trace': 'bench.trace',
  'ticket-queue': 'ticket.queue',
  rack: 'rack.elev',
  'top-grad': 'grad.top',
}

const G = 'var(--gold)'
const C = 'var(--cream)'

const ART: Record<WorkFigureKind, ReactNode> = {
  /* antenna mast radiating over a bare horizon */
  'deployed-comms': (
    <>
      <line x1="30" y1="120" x2="270" y2="120" stroke={BRONZE} strokeWidth="1.5" strokeDasharray="5 6" />
      <line x1="150" y1="120" x2="150" y2="48" stroke={G} strokeWidth="2" />
      <line x1="138" y1="62" x2="162" y2="62" stroke={G} strokeWidth="2" />
      <line x1="150" y1="72" x2="118" y2="120" stroke={G} strokeWidth="1.2" opacity=".55" />
      <line x1="150" y1="72" x2="182" y2="120" stroke={G} strokeWidth="1.2" opacity=".55" />
      <path d="M 136 36 A 20 20 0 0 1 164 36" fill="none" stroke={C} strokeWidth="1.5" opacity=".8" />
      <path d="M 126 26 A 34 34 0 0 1 174 26" fill="none" stroke={C} strokeWidth="1.5" opacity=".5" />
      <path d="M 116 16 A 48 48 0 0 1 184 16" fill="none" stroke={C} strokeWidth="1.5" opacity=".3" />
      <circle cx="150" cy="46" r="3" fill={G} />
    </>
  ),
  /* blueprint — dashed envelope, drawn footprint, dimension line */
  plans: (
    <>
      <rect x="70" y="28" width="160" height="86" fill="none" stroke={C} strokeWidth="1.3" strokeDasharray="6 5" opacity=".55" />
      <rect x="92" y="48" width="82" height="48" fill="none" stroke={G} strokeWidth="2" />
      <line x1="205" y1="72" x2="229" y2="72" stroke={G} strokeWidth="1.3" />
      <line x1="217" y1="60" x2="217" y2="84" stroke={G} strokeWidth="1.3" />
      <circle cx="217" cy="72" r="6" fill="none" stroke={G} strokeWidth="1.3" />
      <line x1="70" y1="132" x2="230" y2="132" stroke={BRONZE} strokeWidth="1.5" />
      <line x1="70" y1="126" x2="70" y2="138" stroke={BRONZE} strokeWidth="1.5" />
      <line x1="230" y1="126" x2="230" y2="138" stroke={BRONZE} strokeWidth="1.5" />
    </>
  ),
  /* portfolio gantt — staggered bars, milestone diamonds, today-line */
  gantt: (
    <>
      <rect x="42" y="30" width="70" height="9" fill={G} />
      <rect x="76" y="52" width="92" height="9" fill={BRONZE} />
      <rect x="120" y="74" width="78" height="9" fill={G} />
      <rect x="96" y="96" width="108" height="9" fill={C} opacity=".7" />
      <rect x="152" y="118" width="88" height="9" fill={BRONZE} />
      <path d="M 118 34.5 l 5 -5 5 5 -5 5 z" fill={C} />
      <path d="M 204 78.5 l 5 -5 5 5 -5 5 z" fill={C} />
      <line x1="190" y1="22" x2="190" y2="136" stroke={C} strokeWidth="1.2" strokeDasharray="4 4" opacity=".45" />
    </>
  ),
  /* the enclave — hub, six nodes, dashed boundary */
  enclave: (
    <>
      <circle cx="150" cy="75" r="58" fill="none" stroke={BRONZE} strokeWidth="1.3" strokeDasharray="5 6" />
      {[
        [198, 75], [174, 116], [126, 116], [102, 75], [126, 34], [174, 34],
      ].map(([x, y], i) => (
        <g key={i}>
          <line x1="150" y1="75" x2={x} y2={y} stroke={G} strokeWidth="1.3" opacity=".7" />
          <circle cx={x} cy={y} r="6" fill="none" stroke={G} strokeWidth="1.8" />
        </g>
      ))}
      <circle cx="150" cy="75" r="7.5" fill="none" stroke={C} strokeWidth="2" />
      <circle cx="150" cy="75" r="2.5" fill={C} />
    </>
  ),
  /* one lead, four teams — the ops org tree */
  'org-tree': (
    <>
      <rect x="133" y="24" width="34" height="18" fill="none" stroke={C} strokeWidth="2" />
      <line x1="150" y1="42" x2="150" y2="66" stroke={G} strokeWidth="1.5" />
      <line x1="60" y1="66" x2="240" y2="66" stroke={G} strokeWidth="1.5" />
      {[60, 120, 180, 240].map((x) => (
        <g key={x}>
          <line x1={x} y1="66" x2={x} y2="90" stroke={G} strokeWidth="1.5" />
          <rect x={x - 17} y="90" width="34" height="18" fill="none" stroke={G} strokeWidth="1.8" />
        </g>
      ))}
    </>
  ),
  /* pacific globe with a dashed sortie route */
  'globe-route': (
    <>
      <circle cx="112" cy="82" r="44" fill="none" stroke={G} strokeWidth="1.8" />
      <ellipse cx="112" cy="82" rx="18" ry="44" fill="none" stroke={G} strokeWidth="1" opacity=".5" />
      <ellipse cx="112" cy="82" rx="44" ry="16" fill="none" stroke={G} strokeWidth="1" opacity=".5" />
      <line x1="68" y1="82" x2="156" y2="82" stroke={G} strokeWidth="1" opacity=".5" />
      <path d="M 134 46 Q 196 8 248 44" fill="none" stroke={C} strokeWidth="1.5" strokeDasharray="5 5" />
      <path d="M 248 44 l -13 2 6 -10 z" fill={C} />
    </>
  ),
  /* acquisition → deployment → retirement, and around again */
  lifecycle: (
    <>
      <path d="M 112 52 A 42 42 0 0 1 188 52" fill="none" stroke={G} strokeWidth="2" />
      <path d="M 188 52 l -3 -11 M 188 52 l -11 -3" stroke={G} strokeWidth="2" fill="none" />
      <path d="M 188 98 A 42 42 0 0 1 112 98" fill="none" stroke={G} strokeWidth="2" />
      <path d="M 112 98 l 3 11 M 112 98 l 11 3" stroke={G} strokeWidth="2" fill="none" />
      <rect x="134" y="62" width="32" height="26" fill="none" stroke={C} strokeWidth="1.8" />
    </>
  ),
  /* the asset checklist — three closed out, one open */
  checklist: (
    <>
      <rect x="100" y="26" width="100" height="104" fill="none" stroke={G} strokeWidth="1.8" />
      <rect x="134" y="19" width="32" height="13" fill="none" stroke={G} strokeWidth="1.8" />
      {[50, 72, 94, 116].map((y, i) => (
        <g key={y}>
          <rect x="112" y={y - 6} width="11" height="11" fill="none" stroke={G} strokeWidth="1.5" />
          <line x1="132" y1={y} x2="188" y2={y} stroke={C} strokeWidth="1.3" opacity=".55" />
          {i < 3 && (
            <polyline points={`${114},${y} ${117},${y + 3} ${122},${y - 5}`} fill="none" stroke={C} strokeWidth="1.6" />
          )}
        </g>
      ))}
    </>
  ),
  /* probe on a pin — the trace is the signature waveform */
  'bench-trace': (
    <>
      <rect x="98" y="52" width="66" height="46" fill="none" stroke={G} strokeWidth="2" />
      {[62, 74, 86].map((y) => (
        <g key={y}>
          <line x1="88" y1={y} x2="98" y2={y} stroke={G} strokeWidth="1.5" />
          <line x1="164" y1={y} x2="174" y2={y} stroke={G} strokeWidth="1.5" />
        </g>
      ))}
      <circle cx="131" cy="75" r="4" fill="none" stroke={G} strokeWidth="1.3" />
      <polyline
        points="174,74 200,74 206,62 213,88 219,74 262,74"
        fill="none"
        stroke={C}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </>
  ),
  /* the queue — tickets stacked, top one resolved */
  'ticket-queue': (
    <>
      <rect x="94" y="36" width="92" height="56" fill="none" stroke={G} strokeWidth="1.3" opacity=".35" />
      <rect x="104" y="48" width="92" height="56" fill="none" stroke={G} strokeWidth="1.5" opacity=".6" />
      <rect x="114" y="60" width="92" height="56" fill="none" stroke={G} strokeWidth="2" />
      <line x1="126" y1="78" x2="182" y2="78" stroke={C} strokeWidth="1.3" opacity=".6" />
      <line x1="126" y1="92" x2="168" y2="92" stroke={C} strokeWidth="1.3" opacity=".6" />
      <circle cx="193" cy="103" r="8" fill="none" stroke={C} strokeWidth="1.5" />
      <polyline points="189,103 192,106 197,99" fill="none" stroke={C} strokeWidth="1.6" />
    </>
  ),
  /* rack elevation, one unit racked out */
  rack: (
    <>
      <rect x="112" y="22" width="76" height="108" fill="none" stroke={G} strokeWidth="2" />
      {[44, 66, 110].map((y) => (
        <line key={y} x1="112" y1={y} x2="188" y2={y} stroke={G} strokeWidth="1.3" />
      ))}
      {[33, 55, 120].map((y, i) => (
        <circle key={y} cx="124" cy={y} r="2.2" fill={i === 1 ? C : G} />
      ))}
      <rect x="96" y="76" width="76" height="24" fill="none" stroke={C} strokeWidth="1.8" />
      <circle cx="108" cy="88" r="2.2" fill={C} />
    </>
  ),
  /* top graduate — star over stacked chevrons */
  'top-grad': (
    <>
      <path d="M 150 22 l 4.4 9 10 1.4 -7.2 7 1.7 9.9 -8.9 -4.7 -8.9 4.7 1.7 -9.9 -7.2 -7 10 -1.4 z" fill={C} />
      <path d="M 106 96 L 150 58 L 194 96" fill="none" stroke={G} strokeWidth="6" strokeLinecap="square" />
      <path d="M 106 122 L 150 84 L 194 122" fill="none" stroke={BRONZE} strokeWidth="6" strokeLinecap="square" />
    </>
  ),
}

type Props = { kind: WorkFigureKind; style?: CSSProperties }

export default function WorkFigure({ kind, style }: Props) {
  return (
    <div
      className="code-figure"
      aria-hidden="true"
      style={{
        background: 'var(--screen)',
        border: '1px solid var(--edge)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        aspectRatio: 'var(--figure-ratio)',
        ...style,
      }}
    >
      <div className="code-figure-bar">
        <span className="code-figure-dot" />
        <span className="code-figure-name">{LABELS[kind]}</span>
      </div>
      <div style={{ flex: 1, padding: '6px 10px 10px', overflow: 'hidden' }}>
        <svg
          viewBox="0 0 300 150"
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
          style={{ display: 'block' }}
        >
          {ART[kind]}
        </svg>
      </div>
    </div>
  )
}
