import type { CSSProperties, ReactNode, ElementType } from 'react'

/* Eyebrow — the mono, uppercase, wide-tracked kicker that opens every block.
   First element of the skeleton: eyebrow → headline → body → tag → button. */

type Props = {
  children: ReactNode
  on?: 'bg' | 'panel'
  as?: ElementType
  style?: CSSProperties
  className?: string
}

export default function Eyebrow({ children, on = 'bg', as, style = {}, className }: Props) {
  const Comp = (as || 'div') as ElementType
  const color = on === 'panel' ? 'var(--label-on-panel)' : 'var(--label-on-bg)'
  return (
    <Comp
      className={['ds-eyebrow', className].filter(Boolean).join(' ')}
      style={{
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-eyebrow)',
        letterSpacing: 'var(--ls-eyebrow)',
        textTransform: 'uppercase',
        color,
        margin: 0,
        ...style,
      }}
    >
      {children}
    </Comp>
  )
}
