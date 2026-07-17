import type { CSSProperties, ReactNode } from 'react'

/* Figure — project imagery in a carbon frame: 8px padding, 1px edge, 16:10 by
   default, with a mono caption. NO duotone, filter or overlay — the frame does
   the brand work, the image stays honest. When no `src` is given, children
   render as the honest empty state (reserved slot). */

type Props = {
  src?: string
  alt?: string
  caption?: string
  ratio?: string
  style?: CSSProperties
  imgStyle?: CSSProperties
  children?: ReactNode
}

export default function Figure({
  src,
  alt = '',
  caption,
  ratio = '16 / 10',
  style = {},
  imgStyle = {},
  children,
}: Props) {
  return (
    <figure
      className="ds-figure"
      style={{
        margin: 0,
        background: 'var(--panel)',
        border: '1px solid var(--edge)',
        borderRadius: 'var(--radius)',
        padding: 'var(--figure-pad)',
        position: 'relative',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          aspectRatio: ratio,
          background: '#0e0d10',
          overflow: 'hidden',
        }}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            style={{ display: 'block', width: '100%', height: '100%', objectFit: 'cover', ...imgStyle }}
          />
        ) : (
          children
        )}
      </div>
      {caption && (
        <figcaption
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fs-caption)',
            letterSpacing: 'var(--ls-caption)',
            color: 'var(--panel-text)',
            opacity: 0.7,
            padding: '9px 3px 2px',
            textTransform: 'uppercase',
          }}
        >
          {caption}
        </figcaption>
      )}
    </figure>
  )
}
