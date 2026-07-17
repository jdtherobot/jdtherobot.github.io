import type { CSSProperties, ReactNode } from 'react'

/* Tag — mono, hairline-outlined metadata chip (square, not pill). Ink only —
   never a gold fill. Adapts to page vs card ground via `on`. */

type Props = {
  children: ReactNode
  on?: 'bg' | 'panel'
  style?: CSSProperties
}

export default function Tag({ children, on = 'bg', style = {} }: Props) {
  const color = on === 'panel' ? 'var(--label-on-panel)' : 'var(--label-on-bg)'
  return (
    <span
      className="ds-tag"
      style={{
        display: 'inline-block',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-tag)',
        letterSpacing: 'var(--ls-tag)',
        textTransform: 'uppercase',
        padding: '5px 11px',
        border: `1px solid ${color}`,
        color,
        borderRadius: 'var(--radius)',
        lineHeight: 1,
        ...style,
      }}
    >
      {children}
    </span>
  )
}
