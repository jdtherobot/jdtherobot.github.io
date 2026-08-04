import { useEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'

/* Scroll restoration for the SPA.

   The browser's own restoration is useless here: it fires before React has
   rendered the route, so the target offset gets clamped against a document that
   is still nearly empty. We take it over ourselves and retry until the page has
   actually grown tall enough to hold the offset — READMEs run 8–25k px and
   mermaid diagrams resolve asynchronously, so "tall enough" can be several
   frames out.

   POP  → restore the offset saved for that history entry.
   PUSH → top of the page, or the #hash target if the URL carries one. */

const KEY = 'jdb-scroll'
/** The sticky nav covers the top of any anchor target. Exported so the nav's own
    same-page scrolling lands identically to a #hash arrival. */
export const NAV_OFFSET = 62
const SETTLE_MS = 1000

type Positions = Record<string, number>

function read(): Positions {
  try {
    return JSON.parse(sessionStorage.getItem(KEY) || '{}') as Positions
  } catch {
    return {}
  }
}

function write(positions: Positions) {
  try {
    sessionStorage.setItem(KEY, JSON.stringify(positions))
  } catch {
    /* private mode / quota — restoration degrades, nothing breaks */
  }
}

/** Run a scroll until the document is tall enough for it to stick. The retry
    is timer-based, not rAF: rAF stalls entirely in a tab that isn't rendering. */
function scrollWhenSettled(getTarget: () => number | null) {
  const started = performance.now()
  let timer = 0
  const attempt = () => {
    const target = getTarget()
    if (target == null) return
    window.scrollTo(0, target)
    const reached = Math.abs(window.scrollY - target) < 2
    const expired = performance.now() - started > SETTLE_MS
    if (!reached && !expired) timer = window.setTimeout(attempt, 60)
  }
  attempt()
  return () => clearTimeout(timer)
}

export default function useScrollRestoration() {
  const location = useLocation()
  const navigationType = useNavigationType()

  // Own the behaviour outright.
  useEffect(() => {
    if ('scrollRestoration' in history) {
      const prev = history.scrollRestoration
      history.scrollRestoration = 'manual'
      return () => {
        history.scrollRestoration = prev
      }
    }
  }, [])

  /* Record where the user is, against the entry they are on. The write is
     synchronous — cleanup runs as the route leaves, and a deferred write would
     land after the next route has already reset the scroll position.

     What gets written is `lastY`, not a fresh window.scrollY read: by the time
     cleanup runs React has begun tearing the outgoing page down, so the document
     is shorter and the browser has already clamped window.scrollY toward the new
     maximum. Reading it there recorded a position well above where the visitor
     actually was, and Back landed short. The listener keeps lastY honest while
     the page is still whole. */
  const lastY = useRef(0)
  useEffect(() => {
    const key = location.key
    lastY.current = window.scrollY
    const save = () => {
      const positions = read()
      positions[key] = lastY.current
      write(positions)
    }
    let throttle = 0
    const onScroll = () => {
      lastY.current = window.scrollY
      if (throttle) return
      throttle = window.setTimeout(() => {
        throttle = 0
        save()
      }, 120)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('pagehide', save)
    return () => {
      clearTimeout(throttle)
      save()
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('pagehide', save)
    }
  }, [location.key])

  // Place the new route.
  useEffect(() => {
    if (navigationType === 'POP') {
      const saved = read()[location.key]
      if (typeof saved === 'number') return scrollWhenSettled(() => saved)
    }

    if (location.hash) {
      const id = location.hash.slice(1)
      return scrollWhenSettled(() => {
        const el = document.getElementById(id)
        return el ? el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET : null
      })
    }

    window.scrollTo(0, 0)
  }, [location.key, location.hash, navigationType])
}
