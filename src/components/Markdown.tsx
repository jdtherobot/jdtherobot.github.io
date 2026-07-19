import { useMemo } from 'react'
import { marked } from 'marked'
import DOMPurify from 'dompurify'
import '../styles/markdown.css'

/* Renders a markdown string as sanitized HTML into a themed `.markdown-body`
   container — GitHub/JetBrains-preview structure, Cybernetic Premium styling.
   Links open in a new tab; the raw README always stays honest (no rewriting). */

marked.setOptions({ gfm: true, breaks: false })

export default function Markdown({ source }: { source: string }) {
  const html = useMemo(() => {
    const raw = marked.parse(source, { async: false }) as string
    const clean = DOMPurify.sanitize(raw, { ADD_ATTR: ['target', 'rel'] })
    // Open every link in a new tab (README links point back at GitHub / the web).
    return clean.replace(/<a /g, '<a target="_blank" rel="noreferrer noopener" ')
  }, [source])

  return (
    <div
      className="markdown-body"
      // sanitized above with DOMPurify
      dangerouslySetInnerHTML={{ __html: html }}
    />
  )
}
