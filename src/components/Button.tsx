import { useState, type CSSProperties, type ReactNode, type MouseEvent } from 'react'

/* Button — mono, square, hairline. Primary = material gold fill + carbon ink
   (7.8:1, identical both modes). Outline = ink outline, transparent. Gold is
   NEVER the ink. Renders <a> when href is set, else <button>. */

type Props = {
  variant?: 'primary' | 'outline'
  href?: string
  children: ReactNode
  onClick?: (e: MouseEvent) => void
  disabled?: boolean
  type?: 'button' | 'submit' | 'reset'
  style?: CSSProperties
  target?: string
  rel?: string
}

export default function Button({
  variant = 'primary',
  href,
  children,
  onClick,
  disabled = false,
  type = 'button',
  style = {},
  ...rest
}: Props) {
  const [hover, setHover] = useState(false)
  const base: CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '7px',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--fs-btn)',
    letterSpacing: 'var(--ls-btn)',
    lineHeight: 1,
    padding: '11px 20px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
    border: '1px solid',
    borderRadius: 'var(--radius)',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.4 : hover ? 0.88 : 1,
    transition: 'opacity .18s, background .18s, color .18s',
  }
  const variants: Record<string, CSSProperties> = {
    primary: {
      background: 'var(--gold)',
      color: 'var(--btn-text)',
      borderColor: 'var(--gold)',
    },
    outline: {
      background: hover && !disabled ? 'var(--label-on-bg)' : 'transparent',
      color: hover && !disabled ? 'var(--bg)' : 'var(--label-on-bg)',
      borderColor: 'var(--label-on-bg)',
    },
  }
  const cls: CSSProperties = { ...base, ...(variants[variant] || variants.primary), ...style }
  const handlers = {
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    onClick: disabled ? undefined : onClick,
  }
  // gold buttons carry the one-time attention shimmer (see useGoldShimmer)
  const shimmer = variant === 'primary' ? { 'data-shimmer': '' } : {}
  if (href && !disabled) {
    return (
      <a href={href} className="ds-btn" style={cls} {...shimmer} {...handlers} {...rest}>
        {children}
      </a>
    )
  }
  return (
    <button type={type} disabled={disabled} className="ds-btn" style={cls} {...shimmer} {...handlers} {...rest}>
      {children}
    </button>
  )
}
