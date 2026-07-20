import type { CSSProperties } from 'react'

/* DashboardFigure — a themed recreation of the Career Plan financial-planner
   dashboard, used as a project preview. Shares the code-window chrome (bar +
   gold dot + title) and the standard 16/10 figure box, but the body is an
   inline SVG "net cash flow" mini-chart with three path lines. On-brand: gold
   for Path A, warm cream/bronze for C/B (no imported categorical palette). */

// Three plausible net-cash-flow curves: early volatility, then a steady climb.
// Bronze/cream/gold rather than an imported categorical palette.
const BRONZE = '#8A6F2E' // --stat's day value; fixed here because the figure
// always sits on the carbon screen ground, in both modes.
const PATHS: { d: string; stroke: string; width: number }[] = [
  { d: '10,104 40,101 70,99 100,93 130,89 160,85 190,79 220,72 250,63 290,57', stroke: BRONZE, width: 2 }, // Path B
  { d: '10,102 40,131 70,120 100,58 130,73 160,67 190,60 220,50 250,40 290,26', stroke: 'var(--cream)', width: 2 }, // Path C
  { d: '10,100 40,119 70,96 100,60 130,90 160,80 190,70 220,55 250,45 290,31', stroke: 'var(--gold)', width: 2.4 }, // Path A
]

export default function DashboardFigure({ style }: { style?: CSSProperties }) {
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
        <span className="code-figure-name">financial-planner · net cash flow</span>
      </div>
      <div style={{ flex: 1, padding: '10px 12px 12px', overflow: 'hidden' }}>
        {/* uniform scaling: 'none' stretched the strokes and turned the legend
            circles into ellipses in the 16/10 box */}
        <svg
          viewBox="0 0 300 150"
          preserveAspectRatio="xMidYMid meet"
          width="100%"
          height="100%"
          style={{ display: 'block' }}
        >
          {/* faint gridlines + zero baseline */}
          <line x1="10" y1="40" x2="290" y2="40" stroke="var(--gold-12)" strokeWidth="1" />
          <line x1="10" y1="110" x2="290" y2="110" stroke="var(--cream-28)" strokeWidth="1" strokeDasharray="3 4" />
          {[75, 150, 225].map((x) => (
            <line key={x} x1={x} y1="18" x2={x} y2="132" stroke="var(--gold-08)" strokeWidth="1" />
          ))}
          {/* path lines */}
          {PATHS.map((p, i) => (
            <polyline
              key={i}
              points={p.d}
              fill="none"
              stroke={p.stroke}
              strokeWidth={p.width}
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
          {/* legend dots */}
          <circle cx="14" cy="142" r="2.5" fill="var(--gold)" />
          <circle cx="30" cy="142" r="2.5" fill={BRONZE} />
          <circle cx="46" cy="142" r="2.5" fill="var(--cream)" />
        </svg>
      </div>
    </div>
  )
}
