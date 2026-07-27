import { useEffect } from 'react'

/* Per-route document title + description (and matching og:/twitter: tags) for a
   client-rendered SPA — index.html ships one static set, so each page overrides
   them here on mount. The site is noindex (see robots.txt / index.html), so this
   is for browser tabs and link-share unfurls, not search. */

const SITE = 'JD Britt'
const DEFAULT_TITLE = `${SITE} — Adaptive Learning · Computer Systems · Neurotechnology`
const DEFAULT_DESC =
  'JD Britt — full-time U.S. Air Force IT professional, full-time CS undergrad, building the hardware-to-application stack across embedded systems, analog signal work, and applied ML.'

function setMeta(name: string, value: string, asProperty = false) {
  const attr = asProperty ? 'property' : 'name'
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${name}"]`)
  if (!el) {
    el = document.createElement('meta')
    el.setAttribute(attr, name)
    document.head.appendChild(el)
  }
  el.setAttribute('content', value)
}

/** Set the page title (composed as "<title> — JD Britt") and description. */
export function usePageMeta(title?: string, description?: string) {
  useEffect(() => {
    const full = title ? `${title} — ${SITE}` : DEFAULT_TITLE
    const desc = description || DEFAULT_DESC
    document.title = full
    setMeta('description', desc)
    setMeta('og:title', full, true)
    setMeta('og:description', desc, true)
    setMeta('twitter:title', full)
    setMeta('twitter:description', desc)
  }, [title, description])
}
