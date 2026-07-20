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

/* Ambient glitch slice on [data-slice] titles: one random on-screen title
   every ~9–17s, ~450ms. Suppressed under reduced-motion. */
export function useGlitchSlice() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    let timer: number
    const tick = () => {
      const titles = document.querySelectorAll<HTMLElement>('[data-slice]')
      if (titles.length) {
        const el = titles[Math.floor(Math.random() * titles.length)]
        const r = el.getBoundingClientRect()
        if (r.top > 0 && r.bottom < window.innerHeight) {
          el.classList.add('slice')
          window.setTimeout(() => el.classList.remove('slice'), 450)
        }
      }
      timer = window.setTimeout(tick, 9000 + Math.random() * 8000)
    }
    timer = window.setTimeout(tick, 9000 + Math.random() * 8000)
    return () => window.clearTimeout(timer)
  }, [])
}

/* Rails advance proportionally to their section's scroll progress and yield
   permanently to the user on manual pointer/wheel-x. Never blocks vertical
   scroll. Re-runs on `dep` change (route). Suppressed under reduced-motion. */
export function useRailScroll(dep?: unknown) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    let cleanup: (() => void) | undefined
    const t = setTimeout(() => {
      const rails: { sec: Element; rail: HTMLElement }[] = []
      document.querySelectorAll('[data-rail-section]').forEach((sec) => {
        const rail = sec.querySelector<HTMLElement>('[data-rail]')
        if (rail) rails.push({ sec, rail })
      })

      const markUser = (rail: HTMLElement) => () => (rail.dataset.user = '1')
      const wheelHandlers: Array<() => void> = []
      rails.forEach((o) => {
        const pd = markUser(o.rail)
        const wh = (e: WheelEvent) => {
          if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) o.rail.dataset.user = '1'
        }
        o.rail.addEventListener('pointerdown', pd)
        o.rail.addEventListener('wheel', wh, { passive: true })
        wheelHandlers.push(() => {
          o.rail.removeEventListener('pointerdown', pd)
          o.rail.removeEventListener('wheel', wh)
        })
      })

      const onScroll = () => {
        window.requestAnimationFrame(() => {
          const vh = window.innerHeight
          rails.forEach((o) => {
            const r = o.sec.getBoundingClientRect()
            let prog = (vh - r.top) / (vh + r.height)
            prog = Math.max(0, Math.min(1, prog))
            const max = o.rail.scrollWidth - o.rail.clientWidth
            if (max > 0 && !o.rail.dataset.user) o.rail.scrollLeft = prog * max * 0.9
          })
        })
      }
      window.addEventListener('scroll', onScroll, { passive: true })
      onScroll()
      cleanup = () => {
        window.removeEventListener('scroll', onScroll)
        wheelHandlers.forEach((fn) => fn())
      }
    }, 60)
    return () => {
      clearTimeout(t)
      cleanup?.()
    }
  }, [dep])
}
