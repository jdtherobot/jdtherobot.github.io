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

  // fit the slot, but never blow a small diagram up past its natural size,
  // and never shrink below the legibility floor
  const available = slot.clientWidth
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
    const clean = DOMPurify.sanitize(raw, { ADD_ATTR: ['target', 'rel'] }).replace(
      /<a /g,
      '<a target="_blank" rel="noreferrer noopener" '
    )
    return { html: clean, diagrams: blocks }
  }, [source])

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
