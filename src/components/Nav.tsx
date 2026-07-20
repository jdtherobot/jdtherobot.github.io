import { useState, useEffect, useRef, useCallback } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { MarkSpike } from './WaveTrace'
import ModeToggle from './ModeToggle'
import { PRIMARY_LINKS, SECTION_LINKS } from '../content/links'
import { prefersReducedMotion } from '../hooks/useMotion'

/* Sticky top nav.
   - Waveform mark = the sole menu trigger for the four primary links.
   - "JD BRITT" wordmark = scroll to top (returns home first from a detail route).
   - Section links smooth-scroll (−62px offset); from detail, return home then scroll.
   - Under 820px the section links are hidden, so a row of four square marks takes
     their place: it reports which section you're in and opens the same links as a
     menu. Without it those four sections are unreachable on a phone. */

export default function Nav() {
  const navigate = useNavigate()
  const location = useLocation()
  const isHome = location.pathname === '/'
  const [menuOpen, setMenuOpen] = useState(false)
  const [secOpen, setSecOpen] = useState(false)
  const [activeSection, setActiveSection] = useState<string | null>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const menuRef = useRef<HTMLDivElement>(null)
  const secTriggerRef = useRef<HTMLButtonElement>(null)
  const secMenuRef = useRef<HTMLDivElement>(null)

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

  // close either menu on any outside click
  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const t = e.target as Node
      if (menuOpen && !triggerRef.current?.contains(t) && !menuRef.current?.contains(t)) {
        setMenuOpen(false)
      }
      if (secOpen && !secTriggerRef.current?.contains(t) && !secMenuRef.current?.contains(t)) {
        setSecOpen(false)
      }
    }
    document.addEventListener('click', onDoc)
    return () => document.removeEventListener('click', onDoc)
  }, [menuOpen, secOpen])

  // Escape closes whichever menu is open and hands focus back to its trigger
  useEffect(() => {
    if (!menuOpen && !secOpen) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'Escape') return
      if (menuOpen) {
        setMenuOpen(false)
        triggerRef.current?.focus()
      }
      if (secOpen) {
        setSecOpen(false)
        secTriggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [menuOpen, secOpen])

  /* Which section is on screen, for the mobile marks. Only meaningful on home;
     elsewhere every mark reads inactive and the menu still navigates home. */
  useEffect(() => {
    if (!isHome || !('IntersectionObserver' in window)) {
      setActiveSection(null)
      return
    }
    const io = new IntersectionObserver(
      (entries) => {
        const onScreen = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (onScreen.length) setActiveSection(onScreen[0].target.id)
      },
      // the nav itself covers the top 62px
      { rootMargin: '-62px 0px -55% 0px' }
    )
    const t = setTimeout(() => {
      SECTION_LINKS.forEach((s) => {
        const el = document.getElementById(s.id)
        if (el) io.observe(el)
      })
    }, 40)
    return () => {
      clearTimeout(t)
      io.disconnect()
    }
  }, [isHome])

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
            aria-haspopup="menu"
            aria-expanded={menuOpen}
            aria-label="Open links menu"
            onClick={() => setMenuOpen((v) => !v)}
            style={{
              display: 'flex',
              alignItems: 'center',
              background: 'none',
              border: 'none',
              // 22px mark, 44px touch target
              padding: '11px 12px',
              margin: '-11px -12px',
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

        {/* mobile stand-in for .nav-sections */}
        <div className="sec-dots">
          <button
            ref={secTriggerRef}
            type="button"
            className="sec-dots-trigger"
            aria-haspopup="menu"
            aria-expanded={secOpen}
            aria-label={
              activeSection
                ? `Sections — currently in ${
                    SECTION_LINKS.find((s) => s.id === activeSection)?.label ?? ''
                  }`
                : 'Sections'
            }
            onClick={() => setSecOpen((v) => !v)}
          >
            {SECTION_LINKS.map((s) => (
              <span
                key={s.id}
                className={`sec-dot${activeSection === s.id ? ' is-active' : ''}`}
              />
            ))}
          </button>
          {secOpen && (
            <div ref={secMenuRef} className="linksmenu is-right" role="menu">
              {SECTION_LINKS.map((s) => (
                <a
                  key={s.id}
                  href={`/#${s.id}`}
                  role="menuitem"
                  className={activeSection === s.id ? 'is-active' : undefined}
                  onClick={(e) => {
                    e.preventDefault()
                    setSecOpen(false)
                    scrollToId(s.id)
                  }}
                >
                  {s.label}
                  <span className="arrow">↓</span>
                </a>
              ))}
            </div>
          )}
        </div>

        <ModeToggle />
      </div>
    </nav>
  )
}
