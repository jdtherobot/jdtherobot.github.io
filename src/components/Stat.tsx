import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { prefersReducedMotion } from '../hooks/useMotion'

/* Stat — a large numeral over a mono label. The numeral is the ONE place small
   copy graduates to gold-eligible: it uses --stat and is large-only.

   String values get the old-school clock treatment: on first viewport entry
   (once per mount) each DIGIT slot spins 0-9 like a split-flap board and the
   slots lock in left→right. Symbols and letters ($ + · K M) never spin — only
   the digits roll. Reduced motion, non-string values, or no observer support
   render the value plainly. */

const TICK_MS = 70 // one digit face per tick
const LOCK_STAGGER_MS = 130 // each digit slot locks this long after the previous
const BASE_SPIN_MS = 420 // how long the first slot spins before locking

function CascadeValue({ value }: { value: string }) {
  const chars = Array.from(value)
  const [locked, setLocked] = useState<number>(-1) // highest digit-index locked so far
  const [faces, setFaces] = useState<number[]>(() => chars.map(() => Math.floor(Math.random() * 10)))

  useEffect(() => {
    const digitCount = Array.from(value).filter((c) => /\d/.test(c)).length
    if (!digitCount) return
    const spin = window.setInterval(() => {
      setFaces((f) => f.map(() => Math.floor(Math.random() * 10)))
    }, TICK_MS)
    const locks: number[] = []
    for (let i = 0; i < digitCount; i++) {
      locks.push(window.setTimeout(() => setLocked(i), BASE_SPIN_MS + i * LOCK_STAGGER_MS))
    }
    const stop = window.setTimeout(
      () => clearInterval(spin),
      BASE_SPIN_MS + digitCount * LOCK_STAGGER_MS
    )
    return () => {
      clearInterval(spin)
      clearTimeout(stop)
      locks.forEach((t) => clearTimeout(t))
    }
  }, [value])

  let digitIdx = -1
  return (
    <span aria-label={value}>
      {chars.map((c, i) => {
        if (!/\d/.test(c)) {
          return (
            <span key={i} aria-hidden="true">
              {c}
            </span>
          )
        }
        digitIdx += 1
        const settled = digitIdx <= locked
        return (
          <span
            key={i}
            aria-hidden="true"
            style={{ display: 'inline-block', minWidth: '0.62em', textAlign: 'center' }}
          >
            {settled ? c : faces[i]}
          </span>
        )
      })}
    </span>
  )
}

type Props = {
  value: ReactNode
  label: ReactNode
  style?: CSSProperties
}

export default function Stat({ value, label, style = {} }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [play, setPlay] = useState(false)
  const canCascade = typeof value === 'string' && /\d/.test(value)

  useEffect(() => {
    if (!canCascade || prefersReducedMotion() || !('IntersectionObserver' in window)) return
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(
      (ents) => {
        if (ents.some((en) => en.isIntersecting)) {
          setPlay(true)
          io.disconnect()
        }
      },
      { threshold: 0.6 }
    )
    io.observe(el)
    return () => io.disconnect()
  }, [canCascade])

  return (
    <div className="ds-stat" ref={ref} style={{ ...style }}>
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontWeight: 'var(--w-display)' as unknown as number,
          fontSize: 'var(--fs-display)',
          color: 'var(--stat)',
          lineHeight: 1,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {play && canCascade ? <CascadeValue value={value as string} /> : value}
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
