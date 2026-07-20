import { useEffect } from 'react'
import { prefersReducedMotion } from './useMotion'

/* The ambient glitch package. Three effects, all token-colored and all
   suppressed under reduced motion:

   SLICE   — a headline tears into two horizontal bands that nudge sideways,
             re-randomized ~16x/s for ~500ms. The bands are opaque (backed by
             the ground behind the text) so they genuinely replace the real
             text rather than ghosting a duplicate over it. One random fully
             visible [data-slice] headline fires every ~4–11s.
   STATIC  — TV-noise burst on a figure/preview screen (.ph / .code-figure).
             Rare by design: each visible screen rolls a 1% chance every 30s.
             A burst lasts ~1.5s, flickering unevenly while its brightness
             decays — loudest at the start, tapering out.
   SHIMMER — a single left→right sheen across each gold (primary) button the
             first time it enters the viewport, once per page load, and not at
             all if another page fired it less than 8s ago. A pointer, not an
             ambient effect.

   The 8-second sessionStorage gates ("jdb-flare", "jdb-piano" in useMotion)
   share one idea: entrance flourishes replay for a returning visitor, but
   never while they're actively clicking around the site. */

const SLICE_MS = 500
const SLICE_MIN_GAP = 4000
const SLICE_MAX_GAP = 11000

export function useGlitchSlice() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    let gapTimer = 0
    let bandTimer = 0
    let stopTimer = 0

    const randomizeBands = (el: HTMLElement) => {
      const t1 = 4 + Math.random() * 56
      const t2 = 24 + Math.random() * 56
      el.style.setProperty('--s1top', `${t1}%`)
      el.style.setProperty('--s1bot', `${t1 + 6 + Math.random() * 16}%`)
      el.style.setProperty('--s1x', `${(Math.random() * 8 - 4).toFixed(1)}px`)
      el.style.setProperty('--s2top', `${t2}%`)
      el.style.setProperty('--s2bot', `${t2 + 6 + Math.random() * 16}%`)
      el.style.setProperty('--s2x', `${(Math.random() * 8 - 4).toFixed(1)}px`)
    }

    const fire = () => {
      const candidates = Array.from(document.querySelectorAll<HTMLElement>('[data-slice]')).filter(
        (el) => {
          const r = el.getBoundingClientRect()
          return r.width > 0 && r.top >= 0 && r.bottom <= window.innerHeight
        }
      )
      if (candidates.length) {
        const el = candidates[Math.floor(Math.random() * candidates.length)]
        // the band pseudo-elements re-render the text via attr(data-text)
        el.dataset.text = el.textContent ?? ''
        randomizeBands(el)
        el.classList.add('glitch-slice-live')
        bandTimer = window.setInterval(() => randomizeBands(el), 60)
        stopTimer = window.setTimeout(() => {
          clearInterval(bandTimer)
          el.classList.remove('glitch-slice-live')
        }, SLICE_MS)
      }
      gapTimer = window.setTimeout(fire, SLICE_MIN_GAP + Math.random() * (SLICE_MAX_GAP - SLICE_MIN_GAP))
    }

    gapTimer = window.setTimeout(fire, 1500 + Math.random() * 2500)
    return () => {
      clearTimeout(gapTimer)
      clearInterval(bandTimer)
      clearTimeout(stopTimer)
      document
        .querySelectorAll('.glitch-slice-live')
        .forEach((el) => el.classList.remove('glitch-slice-live'))
    }
  }, [])
}

const STATIC_WINDOW_MS = 30000
const STATIC_CHANCE = 0.01
const STATIC_MS = 1500

function staticBurst(host: HTMLElement, timers: Set<number>) {
  let overlay = host.querySelector<HTMLElement>(':scope > .screen-static')
  if (!overlay) {
    overlay = document.createElement('div')
    overlay.className = 'screen-static'
    host.appendChild(overlay)
  }
  const start = performance.now()
  const step = () => {
    const elapsed = performance.now() - start
    if (elapsed >= STATIC_MS) {
      overlay!.style.opacity = '0'
      return
    }
    // uneven on/off, peak brightness decaying across the burst
    const envelope = 0.7 * (1 - (elapsed / STATIC_MS) * 0.9)
    overlay!.style.opacity = Math.random() > 0.38 ? envelope.toFixed(2) : '0'
    const t = window.setTimeout(step, 18 + Math.random() * 85)
    timers.add(t)
  }
  step()
}

export function useScreenStatic() {
  useEffect(() => {
    if (prefersReducedMotion()) return
    const timers = new Set<number>()
    const roll = () => {
      document.querySelectorAll<HTMLElement>('.ph, .code-figure').forEach((host) => {
        const r = host.getBoundingClientRect()
        const visible = r.width > 0 && r.bottom > 0 && r.top < window.innerHeight
        if (visible && Math.random() < STATIC_CHANCE) staticBurst(host, timers)
      })
    }
    const interval = window.setInterval(roll, STATIC_WINDOW_MS)
    return () => {
      clearInterval(interval)
      timers.forEach((t) => clearTimeout(t))
      document.querySelectorAll('.screen-static').forEach((el) => el.remove())
    }
  }, [])
}

const FLARE_KEY = 'jdb-flare'
const FLARE_SUPPRESS_MS = 8000

export function useGoldShimmer(dep?: unknown) {
  useEffect(() => {
    if (prefersReducedMotion()) return
    try {
      const last = Number(sessionStorage.getItem(FLARE_KEY) || 0)
      if (Date.now() - last < FLARE_SUPPRESS_MS) return
    } catch {
      /* storage unavailable → just shimmer */
    }

    const done = new WeakSet<Element>()
    const io = new IntersectionObserver(
      (entries) => {
        let batchIndex = 0
        entries.forEach((en) => {
          if (!en.isIntersecting || done.has(en.target)) return
          done.add(en.target)
          io.unobserve(en.target)
          const el = en.target as HTMLElement
          window.setTimeout(() => {
            el.classList.add('shimmering')
            window.setTimeout(() => el.classList.remove('shimmering'), 900)
          }, 150 + batchIndex++ * 180)
          try {
            sessionStorage.setItem(FLARE_KEY, String(Date.now()))
          } catch {
            /* ignore */
          }
        })
      },
      { threshold: 0.9 }
    )
    const t = setTimeout(() => {
      document.querySelectorAll('.ds-btn[data-shimmer]').forEach((b) => io.observe(b))
    }, 80)
    return () => {
      clearTimeout(t)
      io.disconnect()
    }
  }, [dep])
}
