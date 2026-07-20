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

/* Sticky scroll-runway rails.

   Each [data-rail-runway] gets extra height (the rail's horizontal overflow,
   capped at 1.2 viewports); its .rail-pin child sticks while that runway
   passes, and runway progress maps linearly onto rail.scrollLeft. Slow
   scrolling walks the cards; a fast flick crosses the runway in a moment —
   vertical scroll is never intercepted. Manual horizontal input (drag or
   wheel-x) marks the rail user-owned and the auto-drive yields permanently.
   Skipped on mobile (≤820px) and under reduced motion: the runway collapses
   and rails stay plain swipe-scrollers. */
export function useRailScroll(dep?: unknown) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    let cleanup: (() => void) | undefined
    const t = setTimeout(() => {
      const units: { runway: HTMLElement; pin: HTMLElement; rail: HTMLElement }[] = []
      document.querySelectorAll<HTMLElement>('[data-rail-runway]').forEach((runway) => {
        const pin = runway.querySelector<HTMLElement>('.rail-pin')
        const rail = runway.querySelector<HTMLElement>('[data-rail]')
        if (pin && rail) units.push({ runway, pin, rail })
      })
      if (!units.length) return

      const wide = () => window.innerWidth > 820

      const measure = () => {
        units.forEach((u) => {
          if (!wide()) {
            u.runway.style.height = ''
            return
          }
          const overflow = u.rail.scrollWidth - u.rail.clientWidth
          if (overflow <= 0) {
            u.runway.style.height = ''
            return
          }
          const extra = Math.min(overflow, window.innerHeight * 1.2)
          u.runway.style.height = `${u.pin.offsetHeight + extra}px`
        })
      }

      /* Yield only on a DELIBERATE horizontal gesture. A bare click must not
         yield, and neither may the stray sideways ticks macOS trackpads emit
         during ordinary vertical scrolling — that hair-trigger is what used to
         kill the auto-advance the moment anyone touched the page. On yield the
         runway collapses too, so no dead vertical scroll is left behind. */
      const yieldTo = (u: (typeof units)[number]) => {
        u.rail.dataset.user = '1'
        u.rail.style.scrollSnapType = ''
        u.runway.style.height = ''
      }
      const unbinders: Array<() => void> = []
      units.forEach((u) => {
        // snap fights programmatic scrollLeft — off while the runway drives
        u.rail.style.scrollSnapType = 'none'

        let wheelAccum = 0
        const wh = (e: WheelEvent) => {
          if (u.rail.dataset.user) return
          if (Math.abs(e.deltaX) > 1.5 * Math.abs(e.deltaY)) {
            wheelAccum += Math.abs(e.deltaX)
            if (wheelAccum > 60) yieldTo(u)
          } else if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
            wheelAccum = 0
          }
        }

        let dragFrom: { x: number; y: number } | null = null
        const pd = (e: PointerEvent) => {
          dragFrom = { x: e.clientX, y: e.clientY }
        }
        const pm = (e: PointerEvent) => {
          if (!dragFrom || u.rail.dataset.user) return
          const dx = e.clientX - dragFrom.x
          const dy = e.clientY - dragFrom.y
          if (Math.abs(dx) > 12 && Math.abs(dx) > Math.abs(dy)) yieldTo(u)
        }
        const pu = () => (dragFrom = null)

        u.rail.addEventListener('wheel', wh, { passive: true })
        u.rail.addEventListener('pointerdown', pd)
        u.rail.addEventListener('pointermove', pm)
        u.rail.addEventListener('pointerup', pu)
        u.rail.addEventListener('pointercancel', pu)
        unbinders.push(() => {
          u.rail.removeEventListener('wheel', wh)
          u.rail.removeEventListener('pointerdown', pd)
          u.rail.removeEventListener('pointermove', pm)
          u.rail.removeEventListener('pointerup', pu)
          u.rail.removeEventListener('pointercancel', pu)
          u.rail.style.scrollSnapType = ''
        })
      })

      // computed directly in the scroll event (cheap: two rect reads per rail);
      // an rAF hop here would stall in tabs that aren't producing frames
      const onScroll = () => {
        if (!wide()) return
        units.forEach((u) => {
          if (u.rail.dataset.user) return
          const max = u.rail.scrollWidth - u.rail.clientWidth
          const track = u.runway.offsetHeight - u.pin.offsetHeight
          if (max <= 0 || track <= 0) return
          const r = u.runway.getBoundingClientRect()
          const pinTop = parseFloat(getComputedStyle(u.pin).top) || 0
          const prog = Math.max(0, Math.min(1, (pinTop - r.top) / track))
          u.rail.scrollLeft = prog * max
        })
      }

      measure()
      onScroll()
      window.addEventListener('scroll', onScroll, { passive: true })
      window.addEventListener('resize', measure)
      cleanup = () => {
        window.removeEventListener('scroll', onScroll)
        window.removeEventListener('resize', measure)
        unbinders.forEach((fn) => fn())
        units.forEach((u) => (u.runway.style.height = ''))
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
