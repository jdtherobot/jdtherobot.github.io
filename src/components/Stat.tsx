import type { CSSProperties, ReactNode } from 'react'

/* Stat — a large numeral over a mono label. The numeral is the ONE place small
   copy graduates to gold-eligible: it uses --stat and is large-only. */

type Props = {
  value: ReactNode
  label: ReactNode
  style?: CSSProperties
}

export default function Stat({ value, label, style = {} }: Props) {
  return (
    <div className="ds-stat" style={{ ...style }}>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--w-display)' as unknown as number,
          fontSize: 'var(--fs-display)',
          color: 'var(--stat)',
          lineHeight: 1,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-eyebrow)',
          letterSpacing: '.04em',
          textTransform: 'uppercase',
          opacity: 0.65,
          marginTop: 6,
        }}
      >
        {label}
      </div>
    </div>
  )
}
