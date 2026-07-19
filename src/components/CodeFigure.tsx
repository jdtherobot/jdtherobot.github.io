import type { CSSProperties } from 'react'

/* CodeFigure — a themed "code window" used as a project preview figure. Carbon
   ground in both modes (mirrors the site's code blocks), a mono chrome bar with
   the filename + a gold mark dot, a dim line-number gutter, and the snippet in
   JetBrains Mono. Lines beginning with // or # render as dim comments. */

export type FigureData = { filename: string; code: string }

export default function CodeFigure({ data, style }: { data: FigureData; style?: CSSProperties }) {
  const lines = data.code.replace(/\n+$/, '').split('\n')
  return (
    <div
      className="code-figure"
      aria-hidden="true"
      style={{
        background: '#0e0d10',
        border: '1px solid var(--edge)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        ...style,
      }}
    >
      <div className="code-figure-bar">
        <span className="code-figure-dot" />
        <span className="code-figure-name">{data.filename}</span>
      </div>
      <div className="code-figure-body">
        <pre className="code-figure-pre">
          {lines.map((ln, i) => {
            const t = ln.trimStart()
            const comment = t.startsWith('//') || t.startsWith('#')
            return (
              <span key={i} className="code-figure-line">
                <span className="code-figure-num">{i + 1}</span>
                <span className={comment ? 'code-figure-code is-comment' : 'code-figure-code'}>
                  {ln || ' '}
                </span>
              </span>
            )
          })}
        </pre>
      </div>
    </div>
  )
}
