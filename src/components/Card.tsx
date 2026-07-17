import type { CSSProperties, ReactNode } from 'react'
import TierLine from './TierLine'

/* Card — the carbon panel. Inverts against the page. Gold TierLine at the top
   edge, laser-etched diagonal seams fading across the top-left (masked to
   dissolve by ~42%), content, optional stencil metadata bottom-right.
   Headings inside inherit colour so they stay legible on the inverted ground. */

type Props = {
  tier?: 'plain' | 'branch' | 'dissolve'
  stencil?: string
  children: ReactNode
  style?: CSSProperties
  innerStyle?: CSSProperties
  onClick?: () => void
}

export default function Card({
  tier = 'plain',
  stencil,
  children,
  style = {},
  innerStyle = {},
  onClick,
}: Props) {
  return (
    <div
      className="ds-card card"
      onClick={onClick}
      style={{
        position: 'relative',
        overflow: 'hidden',
        background: 'var(--panel)',
        color: 'var(--panel-text)',
        border: '1px solid var(--edge)',
        borderRadius: 'var(--radius)',
        // slice-backing must match the card ground, not the page
        ['--slice-bg' as string]: 'var(--panel)',
        ...style,
      }}
    >
      <TierLine variant={tier} />
      <div
        aria-hidden="true"
        style={{
          content: '""',
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          backgroundImage:
            'repeating-linear-gradient(115deg,var(--seam) 0 1px,transparent 1px 15px)',
          WebkitMaskImage: 'linear-gradient(to bottom right,black 0%,transparent 42%)',
          maskImage: 'linear-gradient(to bottom right,black 0%,transparent 42%)',
          opacity: 0.5,
        }}
      />
      <div
        className="ds-card-inner"
        style={{ position: 'relative', zIndex: 1, padding: 'var(--card-pad)', ...innerStyle }}
      >
        {children}
      </div>
      {stencil && (
        <div
          className="ds-stencil"
          style={{
            position: 'absolute',
            bottom: 14,
            right: 18,
            zIndex: 1,
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fs-stencil)',
            letterSpacing: 'var(--ls-stencil)',
            lineHeight: 1.7,
            textAlign: 'right',
            opacity: 0.5,
            color: 'var(--panel-text)',
            whiteSpace: 'pre-line',
          }}
        >
          {stencil}
        </div>
      )}
    </div>
  )
}
