import { useState, useEffect, type CSSProperties } from 'react'

/* ModeToggle — the day/night switch. THEME is chosen by content, not the
   visitor; this control lets a visitor override for comfort, persists the
   choice, and otherwise follows prefers-color-scheme. Writes data-mode on
   <html>. The track is the sole rounded element; the thumb is material gold. */

type Props = {
  showLabel?: boolean
  style?: CSSProperties
}

export default function ModeToggle({ showLabel = true, style = {} }: Props) {
  const get = () =>
    typeof document !== 'undefined' ? document.documentElement.getAttribute('data-mode') : null
  const [mode, setMode] = useState<string>(get() || 'day')

  useEffect(() => {
    let saved: string | null = null
    try {
      saved = localStorage.getItem('jdb-mode')
    } catch {
      /* ignore */
    }
    // Canonical theme for this page is Day: respect an explicit saved choice,
    // otherwise force day (the prototype forces day when nothing is saved).
    const initial = get() || saved || 'day'
    document.documentElement.setAttribute('data-mode', initial)
    setMode(initial)
    const mo = new MutationObserver(() => setMode(get() || 'day'))
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] })
    return () => mo.disconnect()
  }, [])

  const toggle = () => {
    const next = mode === 'night' ? 'day' : 'night'
    document.documentElement.setAttribute('data-mode', next)
    try {
      localStorage.setItem('jdb-mode', next)
    } catch {
      /* ignore */
    }
    setMode(next)
  }

  const night = mode === 'night'
  return (
    <div className="ds-mode-toggle" style={{ display: 'flex', alignItems: 'center', gap: 8, ...style }}>
      {showLabel && (
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '10px',
            letterSpacing: '.08em',
            opacity: 0.7,
            width: 36,
            textTransform: 'uppercase',
          }}
        >
          {mode}
        </span>
      )}
      <button
        type="button"
        onClick={toggle}
        aria-label="Toggle day and night mode"
        aria-pressed={night}
        style={{
          width: 42,
          height: 22,
          borderRadius: 'var(--radius-pill)',
          background: 'var(--edge)',
          border: 'none',
          position: 'relative',
          cursor: 'pointer',
          padding: 0,
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: 2.5,
            left: 2.5,
            width: 17,
            height: 17,
            borderRadius: '50%',
            background: 'var(--gold)',
            transform: night ? 'translateX(20px)' : 'none',
            transition: 'transform .2s',
          }}
        />
      </button>
    </div>
  )
}
