import { useEffect, useMemo, useRef } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import '../styles/markdown.css'

/* Renders a markdown string as sanitized HTML into a themed `.markdown-body`
   container — GitHub/JetBrains-preview structure, Cybernetic Premium styling.
   ```mermaid fences are rendered as real diagrams (lazy-loaded, site-themed,
   re-rendered when day/night flips). Links open in a new tab. */

marked.setOptions({ gfm: true, breaks: false })

const MERMAID_FENCE = /```mermaid\r?\n([\s\S]*?)```/g

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

export default function Markdown({ source }: { source: string }) {
  const ref = useRef<HTMLDivElement>(null)

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
        flowchart: { curve: 'linear' },
      })
      const slots = ref.current?.querySelectorAll<HTMLElement>('[data-mmd-idx]') ?? []
      for (const slot of Array.from(slots)) {
        const idx = Number(slot.dataset.mmdIdx)
        const code = diagrams[idx]
        if (!code) continue
        try {
          const { svg } = await mermaid.render(`mmd-${mode}-${idx}-${Date.now()}`, code)
          if (!cancelled) slot.innerHTML = svg
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
    return () => {
      cancelled = true
      mo.disconnect()
    }
  }, [html, diagrams])

  return (
    <div
      ref={ref}
      className="markdown-body"
      // sanitized above with DOMPurify
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
