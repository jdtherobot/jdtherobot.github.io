import { useRef, useEffect, type CSSProperties } from 'react'

/* TierLine — the 14px SVG rule at a card's top edge, ALWAYS pure #C9A45E.
   plain (Theory) → branch (Implementation) → dissolve (Application).
   Ported verbatim from the design-system draw() logic. */

const GOLD = '#C9A45E'

function draw(svg: SVGSVGElement, kind: string) {
  while (svg.firstChild) svg.removeChild(svg.firstChild)
  const cs = getComputedStyle(document.documentElement)
  const bg = cs.getPropertyValue('--bg').trim() || '#ECE2C6'
  const ns = 'http://www.w3.org/2000/svg'
  const W = Math.max(60, Math.round(svg.getBoundingClientRect().width))
  svg.setAttribute('viewBox', '0 0 ' + W + ' 14')
  svg.setAttribute('preserveAspectRatio', 'xMinYMid meet')
  const y = 6
  const h = 3
  const rect = (x: number, w: number, fill: string, yy?: number, hh?: number) => {
    const r = document.createElementNS(ns, 'rect')
    r.setAttribute('x', String(x))
    r.setAttribute('y', String(yy === undefined ? y : yy))
    r.setAttribute('width', String(w))
    r.setAttribute('height', String(hh === undefined ? h : hh))
    r.setAttribute('fill', fill)
    svg.appendChild(r)
  }
  const path = (d: string, col: string, w?: number) => {
    const p = document.createElementNS(ns, 'path')
    p.setAttribute('d', d)
    p.setAttribute('fill', 'none')
    p.setAttribute('stroke', col)
    p.setAttribute('stroke-width', String(w || 2))
    p.setAttribute('stroke-linecap', 'butt')
    svg.appendChild(p)
  }
  const dot = (cx: number, cy: number, r: number, col: string) => {
    const c = document.createElementNS(ns, 'circle')
    c.setAttribute('cx', String(cx))
    c.setAttribute('cy', String(cy))
    c.setAttribute('r', String(r))
    c.setAttribute('fill', col)
    svg.appendChild(c)
  }
  if (kind === 'plain') {
    rect(0, W, GOLD)
  }
  if (kind === 'branch') {
    rect(0, W, GOLD)
    const UP = 3
    const DN = 12
    const a = W * 0.2
    const b = W * 0.36
    const c = W * 0.6
    path('M ' + a + ',7 L ' + (a + 4.5) + ',' + UP + ' H ' + W * 0.42, GOLD, 2)
    dot(W * 0.42 + 1.8, UP, 1.9, GOLD)
    path('M ' + b + ',8 L ' + (b + 4.5) + ',' + DN + ' H ' + W, GOLD, 2)
    path('M ' + c + ',7 L ' + (c + 4.5) + ',' + UP + ' H ' + W, GOLD, 2)
  }
  if (kind === 'dissolve') {
    const px = 3
    const solidTo = Math.round(W * 0.36)
    let seed = 7
    rect(0, solidTo, GOLD)
    for (let x = solidTo; x < W; x += px) {
      const f = (x - solidTo) / (W - solidTo)
      seed = (seed * 1103515245 + 12345) & 0x7fffffff
      const rnd = (seed % 1000) / 1000
      const isGold = rnd > f * 1.15
      rect(x, px, isGold ? GOLD : bg)
      if (f > 0.5 && rnd > 0.86) rect(x, px, isGold ? GOLD : bg, rnd > 0.93 ? 0.5 : 10.5, px)
    }
  }
}

type Props = {
  variant?: 'plain' | 'branch' | 'dissolve'
  style?: CSSProperties
}

export default function TierLine({ variant = 'plain', style = {} }: Props) {
  const ref = useRef<SVGSVGElement>(null)
  useEffect(() => {
    const svg = ref.current
    if (!svg) return
    const render = () => draw(svg, variant)
    render()
    const ro = new ResizeObserver(render)
    ro.observe(svg)
    // dissolve pixels track --bg, so redraw when the mode attribute flips
    const mo = new MutationObserver(render)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-mode'] })
    return () => {
      ro.disconnect()
      mo.disconnect()
    }
  }, [variant])
  return (
    <svg
      ref={ref}
      className="ds-tierline"
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: 'var(--tierline-h)', ...style }}
    />
  )
}
