import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MarkSpike } from './WaveTrace'
import ModeToggle from './ModeToggle'
import { PRIMARY_LINKS, SECTION_LINKS } from '../content/links'
import { prefersReducedMotion } from '../hooks/useMotion'

/* Sticky top nav.
   - Waveform mark = the sole menu trigger for the four primary links.
   - "JD BRITT" wordmark = scroll to top (returns home first from a detail route).
   - Section links smooth-scroll (−62px offset); from detail, return home then scroll. */

export default function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const smooth = !prefersReducedMotion()

  const scrollToId = useCallback(
    (id: string) => {
      const doIt = () => {
        const el = document.getElementById(id)
        if (el)
          window.scrollTo({
            top: el.getBoundingClientRect().top + window.pageYOffset - 62,
            behavior: smooth ? 'smooth' : 'auto',
          })
      }
      if (!isHome) {
        navigate('/')
        setTimeout(doIt, 80)
      } else {
        doIt()
      }
    },
    [isHome, navigate, smooth]
  )

  const goTop = useCallback(() => {
    setMenuOpen(false)
    if (!isHome) {
      navigate('/')
      setTimeout(() => window.scrollTo({ top: 0, behavior: 'auto' }), 20)
    } else {
      window.scrollTo({ top: 0, behavior: smooth ? 'smooth' : 'auto' })
    }
  }, [isHome, navigate, smooth])

  // close the menu on any outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (!menuOpen) return
      const t = e.target as Node
      if (triggerRef.current?.contains(t) || menuRef.current?.contains(t)) return
      setMenuOpen(false)
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [menuOpen])

  return (
    <nav
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 80,
        background: 'var(--bg)',
        borderBottom: '1px solid var(--edge)',
      }}
    >
      <div
        className="wrap"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          height: 60,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, position: 'relative' }}>
          <button
            ref={triggerRef}
            type="button"
            aria-haspopup="true"
            aria-expanded={menuOpen}
            aria-label="Open links menu"
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              padding: 4,
              margin: -4,
              cursor: 'pointer',
            }}
          >
            <MarkSpike size={22} />
          </button>
          <button
            className="navlink"
            onClick={goTop}
            style={{ color: 'var(--text)', opacity: 1, fontSize: 13, letterSpacing: '.1em' }}
          >
            JD BRITT
          </button>
          {menuOpen && (
            <div ref={menuRef} className="linksmenu" role="menu">
              {PRIMARY_LINKS.map((l) => (
                <a
                  key={l.label}
                  href={l.href}
                  role="menuitem"
                  {...(l.external ? { target: '_blank', rel: 'noreferrer noopener' } : {})}
                  onClick={() => setMenuOpen(false)}
                >
                  {l.label}
                  <span className="arrow">{l.arrow}</span>
                </a>
              ))}
            </div>
          )}
        </div>

        <div className="nav-sections">
          {SECTION_LINKS.map((s) => (
            <button key={s.id} className="navlink" onClick={() => scrollToId(s.id)}>
              {s.label}
            </button>
          ))}
        </div>

        <ModeToggle />
      </div>
    </nav>
  )
}
