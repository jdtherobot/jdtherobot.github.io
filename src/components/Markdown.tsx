import { useEffect, useMemo, useRef, useState } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import '../styles/markdown.css'

/* Renders a markdown string as sanitized HTML into a themed `.markdown-body`
   container — GitHub/JetBrains-preview structure, Cybernetic Premium styling.
   ```mermaid fences are rendered as real diagrams (lazy-loaded, site-themed,
   re-rendered when day/night flips). Links open in a new tab. */

marked.setOptions({ gfm: true, breaks: false })

const MERMAID_FENCE = /```mermaid\r?\n([\s\S]*?)```/g

/* Literal hex, not var(--token), on purpose: mermaid bakes these into generated
   SVG presentation attributes and gradient stops before the nodes are in the
   document, so an unresolved var() would render as black. Keep in sync with
   styles/colors.css — mode flips re-run render() via the MutationObserver. */
function mermaidThemeVariables(mode: string) {
  const day = mode !== 'night'
  return {
    // grounds + inks from the design system; gold stays a material
    background: day ? '#ECE2C6' : '#17161A',
    primaryColor: '#17161A',
    primaryTextColor: '#ECE2C6',
    primaryBorderColor: '#C9A45E',
    secondaryColor: day ? '#e2d6b4' : '#242229',
    tertiaryColor: day ? '#ECE2C6' : '#17161A',
    lineColor: day ? '#4A4436' : '#C9BFA6',
    textColor: day ? '#1E1B12' : '#ECE2C6',
    clusterBkg: 'transparent',
    clusterBorder: '#C9A45E',
    edgeLabelBackground: day ? '#ECE2C6' : '#17161A',
    fontFamily: "'JetBrains Mono', ui-monospace, monospace",
    fontSize: '13px',
  }
}

/* Below this scale a 13px mermaid label stops being readable, so we stop
   shrinking and let the slot scroll instead. 0.8 ≈ 10.4px type. */
const MIN_SCALE = 0.8

/** Size a rendered diagram to its slot, but never below MIN_SCALE. */
function fitDiagram(slot: HTMLElement) {
  const svg = slot.querySelector('svg')
  if (!svg) return
  const intrinsic = svg.viewBox.baseVal.width
  if (!intrinsic) return

  // Measure the CONTENT box, not clientWidth — the slot carries 18px of padding
  // on each side, so clientWidth over-reports the usable width by 36px and any
  // diagram between (clientWidth - padding) and clientWidth renders a few pixels
  // past the edge with no scroll hint to say so.
  const pad = getComputedStyle(slot)
  const available =
    slot.clientWidth - parseFloat(pad.paddingLeft) - parseFloat(pad.paddingRight)

  // fit the slot, but never blow a small diagram up past its natural size,
  // and never shrink below the legibility floor
  const width = Math.max(Math.min(available, intrinsic), intrinsic * MIN_SCALE)

  svg.style.width = `${width}px`
  svg.style.maxWidth = 'none'
  svg.style.height = 'auto'
  svg.removeAttribute('height')
  // wider than the slot → the slot scrolls, and CSS shows the edge hint
  slot.toggleAttribute('data-scrollable', width > available + 1)
  slot.dataset.mmdReady = '1'
}

export default function Markdown({ source }: { source: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [zoomed, setZoomed] = useState<string | null>(null)

  // Pull mermaid blocks out before marked sees them; leave numbered slots.
  const { html, diagrams } = useMemo(() => {
    const blocks: string[] = []
    const withSlots = source.replace(MERMAID_FENCE, (_m, code: string) => {
      blocks.push(code.trim())
      return `<div class="mermaid-slot" data-mmd-idx="${blocks.length - 1}"></div>`
    })
    const raw = marked.parse(withSlots, { async: false }) as string
    const clean = DOMPurify.sanitize(raw, { ADD_ATTR: ['target', 'rel'] })
    // External links open in a new tab; same-origin links — e.g. a writeup's
    // "Launch the app" pointing at a britt.gg app — navigate in the current tab.
    let html = clean
    try {
      const origin = window.location.origin
      const doc = new DOMParser().parseFromString(clean, 'text/html')
      doc.querySelectorAll('a[href]').forEach((a) => {
        let external = false
        try {
          external = new URL(a.getAttribute('href') || '', origin).origin !== origin
        } catch {
          external = false
        }
        if (external) {
          a.setAttribute('target', '_blank')
          a.setAttribute('rel', 'noreferrer noopener')
        } else {
          a.removeAttribute('target')
        }
      })
      // Tables get a scroll wrapper. Two divs, not one: the outer is the
      // positioning context for the edge fade, the inner is the scroller. A
      // fade absolutely positioned inside the scroller would anchor to the
      // content and hide at the far end instead of riding the visible edge.
      doc.querySelectorAll('table').forEach((table) => {
        const wrap = doc.createElement('div')
        wrap.className = 'md-table-wrap'
        const scroll = doc.createElement('div')
        scroll.className = 'md-table-scroll'
        table.replaceWith(wrap)
        wrap.appendChild(scroll)
        scroll.appendChild(table)
      })
      html = doc.body.innerHTML
    } catch {
      /* no DOMParser (shouldn't happen client-side) → leave links as sanitized */
    }
    return { html, diagrams: blocks }
  }, [source])

  /* Flag the tables that actually overflow so CSS can show an edge fade, and
     drop the flag once the scroll reaches the end. Same [data-scrollable]
     idiom fitDiagram uses for a diagram too wide for its slot — but not gated
     on diagrams, since most pages with tables have none. */
  useEffect(() => {
    const root = ref.current
    if (!root) return
    const scrollers = Array.from(root.querySelectorAll<HTMLElement>('.md-table-scroll'))
    if (!scrollers.length) return
    let cancelled = false

    const sync = (sc: HTMLElement) => {
      const wrap = sc.parentElement
      if (!wrap) return
      // A zero-width box is an unlaid-out one (a hidden tab, a card mid-route
      // transition) — it always looks like it overflows, so measure nothing
      // and leave whatever flags it already had until a real layout arrives.
      if (!sc.clientWidth) return
      const overflows = sc.scrollWidth > sc.clientWidth + 1
      wrap.toggleAttribute('data-scrollable', overflows)
      wrap.toggleAttribute(
        'data-at-end',
        overflows && sc.scrollLeft + sc.clientWidth >= sc.scrollWidth - 1,
      )
      // only a region that can really scroll earns a tab stop
      if (overflows) sc.setAttribute('tabindex', '0')
      else sc.removeAttribute('tabindex')
    }
    const syncAll = () => scrollers.forEach(sync)
    const onScroll = (e: Event) => sync(e.currentTarget as HTMLElement)

    syncAll()
    // a table measured before the webfonts settle reports the wrong width
    document.fonts?.ready.then(() => !cancelled && syncAll()).catch(() => {})

    const ro = new ResizeObserver(syncAll)
    scrollers.forEach((sc) => {
      ro.observe(sc)
      sc.addEventListener('scroll', onScroll, { passive: true })
    })

    return () => {
      cancelled = true
      ro.disconnect()
      scrollers.forEach((sc) => sc.removeEventListener('scroll', onScroll))
    }
  }, [html])

  // Render diagrams (and re-render on day/night flips).
  useEffect(() => {
    if (!diagrams.length || !ref.current) return
    let cancelled = false

    const render = async () => {
      const mode = document.documentElement.getAttribute('data-mode') || 'day'
      const { default: mermaid } = await import('mermaid')
      if (cancelled) return
      mermaid.initialize({
        startOnLoad: false,
        securityLevel: 'strict',
        theme: 'base',
        themeVariables: mermaidThemeVariables(mode),
        // useMaxWidth:false stops mermaid emitting width="100%", which is what
        // let a 1600px diagram be squashed into a 260px column at 2px type.
        flowchart: { curve: 'linear', useMaxWidth: false },
      })
      const slots = ref.current?.querySelectorAll<HTMLElement>('[data-mmd-idx]') ?? []
      for (const slot of Array.from(slots)) {
        const idx = Number(slot.dataset.mmdIdx)
        const code = diagrams[idx]
        if (!code) continue
        try {
          const { svg } = await mermaid.render(`mmd-${mode}-${idx}-${Date.now()}`, code)
          if (!cancelled) {
            slot.innerHTML = svg
            fitDiagram(slot)
          }
        } catch {
          // Invalid diagram source → leave it as an honest code block instead.
          if (!cancelled) {
            slot.outerHTML = `<pre><code>${code.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</code></pre>`
          }
        }
      }
    }

    render()
    const mo = new MutationObserver(render)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] })

    // the fit depends on the slot width, so redo it when that changes
    const onResize = () => {
      ref.current?.querySelectorAll<HTMLElement>('.mermaid-slot[data-mmd-ready]').forEach(fitDiagram)
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelled = true
      mo.disconnect()
      window.removeEventListener('resize', onResize)
    }
  }, [html, diagrams])

  /* Tap/click a diagram to open it full-screen. Even a well-fitted diagram is
     cramped on a phone, and the tall ones need panning. */
  useEffect(() => {
    const root = ref.current
    if (!root || !diagrams.length) return
    const onClick = (e: MouseEvent) => {
      const slot = (e.target as HTMLElement).closest<HTMLElement>('.mermaid-slot[data-mmd-ready]')
      const svg = slot?.querySelector('svg')
      if (!svg) return
      // drop the fitted width so the enlarged copy renders at natural size
      const full = svg.cloneNode(true) as SVGSVGElement
      full.style.width = `${svg.viewBox.baseVal.width}px`
      setZoomed(full.outerHTML)
    }
    root.addEventListener('click', onClick)
    return () => root.removeEventListener('click', onClick)
  }, [diagrams, html])

  useEffect(() => {
    if (!zoomed) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setZoomed(null)
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [zoomed])

  return (
    <>
      <div
        ref={ref}
        className="markdown-body"
        // sanitized above with DOMPurify
        dangerouslySetInnerHTML={{ __html: html }}
      />
      {zoomed && (
        <div
          className="mmd-zoom"
          role="dialog"
          aria-modal="true"
          aria-label="Diagram, enlarged"
          onClick={() => setZoomed(null)}
        >
          <button type="button" className="mmd-zoom-close" aria-label="Close diagram">
            Close ✕
          </button>
          <div
            className="mmd-zoom-canvas"
            onClick={(e) => e.stopPropagation()}
            // same SVG already sanitized and rendered above
            dangerouslySetInnerHTML={{ __html: zoomed }}
          />
        </div>
      )}
    </>
  )
}
