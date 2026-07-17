import { useState, type CSSProperties, type ReactNode } from 'react'
import Tag from './Tag'

/* NoteRow — an index row for lab notes / writing: a tier Tag + title on the
   left, a mono date on the right, divided by a hairline rule. */

type Props = {
  tag?: ReactNode
  title: ReactNode
  href?: string
  date?: ReactNode
  style?: CSSProperties
}

export default function NoteRow({ tag, title, href = '#', date, style = {} }: Props) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className="ds-note-row"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: 16,
        padding: '18px 0',
        borderBottom: '1px solid var(--edge)',
        ...style,
      }}
    >
      <div>
        {tag && <Tag>{tag}</Tag>}
        <div style={{ marginTop: tag ? 8 : 0, fontSize: '15px' }}>
          <a
            href={href}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
              color: hover ? 'var(--label-on-bg)' : 'inherit',
              textDecoration: 'none',
              transition: 'color .18s',
            }}
          >
            {title}
          </a>
        </div>
      </div>
      <div
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '11px',
          opacity: 0.55,
          whiteSpace: 'nowrap',
          textTransform: 'uppercase',
        }}
      >
        {date}
      </div>
    </div>
  )
}
