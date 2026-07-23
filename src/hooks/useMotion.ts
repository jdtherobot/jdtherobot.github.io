import { useEffect } from 'react'

export function prefersReducedMotion(): boolean {
  try {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  } catch {
    return false
  }
}

/* Reveal-on-scroll: .rv elements fade + rise, each firing once.
   threshold MUST stay 0: a ratio-based threshold can never be met by an element
   taller than viewport/threshold, so tall nodes (a full README runs 8–25k px on
   a phone) would stay at opacity 0 forever. The negative bottom rootMargin is
   what delays the reveal until the element is properly on screen.
   Re-runs whenever `dep` changes (e.g. route change) to pick up new nodes. */
export function useReveal(dep?: unknown) {
  useEffect(() => {
    const reduced = prefersReducedMotion()
    if (reduced || !('IntersectionObserver' in window)) {
      document.querySelectorAll('.rv').forEach((el) => el.classList.add('in'))
      return
    }
    document.body.classList.add('motion')
    let delivered = false
    const io = new IntersectionObserver(
      (ents) => {
        delivered = true
        ents.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add('in')
            io.unobserve(en.target)
          }
        })
      },
      { threshold: 0, rootMargin: '0px 0px -10% 0px' }
    )
    // slight delay so freshly-mounted nodes exist
    const t = setTimeout(() => {
      document.querySelectorAll('.rv:not(.in)').forEach((el) => io.observe(el))
    }, 40)
    /* Observers ride the rendering loop, so a tab that isn't producing frames
       (hidden, occluded, some embedders) never gets even the guaranteed initial
       callback — and would sit at opacity 0. If nothing has been delivered
       shortly after observing, stop animating and show everything. */
    const failsafe = setTimeout(() => {
      if (!delivered) document.querySelectorAll('.rv').forEach((el) => el.classList.add('in'))
    }, 700)
    return () => {
      clearTimeout(t)
      clearTimeout(failsafe)
      io.disconnect()
    }
  }, [dep])
}

/* Scroll-through drift for horizontal rails.

   A [data-rail-drift] rail advances its own scrollLeft as the section drifts
   past — there's no pin and no injected height, so no blank gap can form and
   vertical scroll is never intercepted. Progress maps the rail's vertical
   center across a band (its center travels from ENTER→EXIT down the viewport)
   and eases with a smoothstep, so the cards glide through around mid-screen
   and finish before the rail reaches the top: the reader is never held in
   place. A deliberate horizontal drag or wheel-x hands the rail to the user
   and the auto-drive yields permanently. Skipped on mobile (≤820px) and under
   reduced motion, where the rail stays a plain swipe-scroller. */
const DRIFT_ENTER = 0.8 // rail center this far down the viewport → progress 0
const DRIFT_EXIT = 0.2 // …and this far down → progress 1 (fully advanced)

export function useRailDrift(dep?: unknown) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    let cleanup: (() => void) | undefined
    const t = setTimeout(() => {
      const rails = Array.from(document.querySelectorAll<HTMLElement>('[data-rail-drift]'))
      if (!rails.length) return

      const wide = () => window.innerWidth > 820
      const smooth = (p: number) => p * p * (3 - 2 * p) // smoothstep ease

      /* Yield only on a DELIBERATE horizontal gesture. A bare click must not
         yield, and neither may the stray sideways ticks macOS trackpads emit
         during ordinary vertical scrolling — that hair-trigger is what used to
         kill the auto-advance the moment anyone touched the page. */
      const yieldTo = (rail: HTMLElement) => {
        rail.dataset.user = '1'
        rail.style.scrollSnapType = ''
      }

      const unbinders: Array<() => void> = []
      rails.forEach((rail) => {
        let wheelAccum = 0
        const wh = (e: WheelEvent) => {
          if (rail.dataset.user) return
          if (Math.abs(e.deltaX) > 1.5 * Math.abs(e.deltaY)) {
            wheelAccum += Math.abs(e.deltaX)
            if (wheelAccum > 60) yieldTo(rail)
          } else if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            wheelAccum = 0
          }
        }

        let dragFrom: { x: number; y: number } | null = null
        const pd = (e: PointerEvent) => {
          dragFrom = { x: e.clientX, y: e.clientY }
        }
        const pm = (e: PointerEvent) => {
          if (!dragFrom || rail.dataset.user) return
          const dx = e.clientX - dragFrom.x
          const dy = e.clientY - dragFrom.y
          if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) yieldTo(rail)
        }
        const pu = () => (dragFrom = null)

        rail.addEventListener('wheel', wh, { passive: true })
        rail.addEventListener('pointerdown', pd)
        rail.addEventListener('pointermove', pm)
        rail.addEventListener('pointerup', pu)
        rail.addEventListener('pointercancel', pu)
        unbinders.push(() => {
          rail.removeEventListener('wheel', wh)
          rail.removeEventListener('pointerdown', pd)
          rail.removeEventListener('pointermove', pm)
          rail.removeEventListener('pointerup', pu)
          rail.removeEventListener('pointercancel', pu)
          rail.style.scrollSnapType = ''
        })
      })

      /* Snap fights programmatic scrollLeft, so it's suppressed only while the
         drift can actually drive — desktop, rail not yet user-owned. On mobile
         (drift never runs) or a yielded rail, proximity snap stays on so the
         rail behaves as a plain swipe-scroller. Re-evaluated on resize so
         crossing the 820px line (e.g. tablet rotation) restores the right mode. */
      const applySnap = () => {
        const driving = wide()
        rails.forEach((rail) => {
          if (rail.dataset.user) return
          rail.style.scrollSnapType = driving ? 'none' : ''
        })
      }

      // computed directly in the scroll event (cheap: one rect read per rail);
      // an rAF hop here would stall in tabs that aren't producing frames
      const onScroll = () => {
        if (!wide()) return
        const vh = window.innerHeight
        const span = (DRIFT_ENTER - DRIFT_EXIT) * vh
        rails.forEach((rail) => {
          if (rail.dataset.user) return
          const max = rail.scrollWidth - rail.clientWidth
          if (max <= 0) return
          const r = rail.getBoundingClientRect()
          const center = r.top + r.height / 2
          const prog = Math.max(0, Math.min(1, (DRIFT_ENTER * vh - center) / span))
          rail.scrollLeft = smooth(prog) * max
        })
      }

      const onResize = () => {
        applySnap()
        onScroll()
      }

      applySnap()
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', onResize)
      cleanup = () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', onResize)
        unbinders.forEach((fn) => fn())
      }
    }, 60)
    return () => {
      clearTimeout(t)
      cleanup?.()
    }
  }, [dep])
}

/* One-time "piano" entrance: cards inside a [data-piano] container sweep in
   left→right with a settle stagger the first time the container is seen —
   once per page load, and skipped entirely (cards render normally) when
   another load ran it less than 8s ago, or under reduced motion. The hidden
   state is only applied when the intro is definitely going to run, with a
   failsafe so nothing can be left invisible. */
const PIANO_KEY = 'jdb-piano'
const PIANO_SUPPRESS_MS = 8000

export function usePianoIntro(dep?: unknown) {
  useEffect(() => {
    if (prefersReducedMotion() || !('IntersectionObserver' in window)) return
    try {
      const last = Number(sessionStorage.getItem(PIANO_KEY) || 0)
      if (Date.now() - last < PIANO_SUPPRESS_MS) return
    } catch {
      /* storage unavailable → still play */
    }

    let cleanup: (() => void) | undefined
    const t = setTimeout(() => {
      const containers = Array.from(document.querySelectorAll<HTMLElement>('[data-piano]'))
      if (!containers.length) return
      containers.forEach((c) => c.classList.add('piano-armed'))
      try {
        sessionStorage.setItem(PIANO_KEY, String(Date.now()))
      } catch {
        /* ignore */
      }

      const run = (c: HTMLElement) => {
        Array.from(c.children).forEach((child, i) => {
          ;(child as HTMLElement).style.transitionDelay = `${i * 70}ms`
        })
        c.classList.add('piano-run')
      }

      let delivered = false
      const io = new IntersectionObserver(
        (entries) => {
          delivered = true
          entries.forEach((en) => {
            if (!en.isIntersecting) return
            run(en.target as HTMLElement)
            io.unobserve(en.target)
          })
        },
        { threshold: 0.2 }
      )
      containers.forEach((c) => io.observe(c))

      /* The observer guarantees an initial callback per target when the tab is
         rendering. If nothing arrived, the tab is frozen — show everything
         rather than risk hidden cards. (Same failsafe idea as useReveal.) */
      const failsafe = window.setTimeout(() => {
        if (!delivered) containers.forEach(run)
      }, 1200)

      cleanup = () => {
        clearTimeout(failsafe)
        io.disconnect()
        containers.forEach((c) => c.classList.remove('piano-armed', 'piano-run'))
      }
    }, 40)
    return () => {
      clearTimeout(t)
      cleanup?.()
    }
  }, [dep])
}
