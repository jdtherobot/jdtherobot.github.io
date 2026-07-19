/* Challenges — the "puzzle" work, now nested inside the Projects section. Each
   challenge resolves to its own detail page at /challenges/<slug>. Copy is
   PLACEHOLDER (bracketed); JD writes real content later. */

export type Section = 'challenges'

export type Item = {
  section: Section
  slug: string
  title: string
  eyebrow: string // detail-page kicker, e.g. "Challenge · Steganography"
  oneLine: string // short premise shown on the landing card
  tags: string[]
  flagship?: boolean
  // detail-page body (all placeholder)
  deck: string
  premise: string
  concept: string
  how: string
  proves: string
  stencil: string // real metadata: DOC id · revision
}

export const SECTION_LABEL: Record<Section, string> = {
  challenges: 'Challenges',
}

const ph = {
  deck: '[Deck — one or two sentences framing what this is and why it exists, at real length. Placeholder until JD writes the final copy.]',
  premise:
    '[Premise. Placeholder set at the length real prose runs so the measure and rhythm read true. Sentence, sentence, sentence — enough to fill a real column.]',
  concept: '[The concept — the core idea and how the pieces map together. Placeholder.]',
  how: '[How it works — the mechanics, step by step. Placeholder.]',
  proves: '[What it proves — the signal this sends. Placeholder that closes the argument.]',
}

export const ITEMS: Item[] = [
  {
    section: 'challenges',
    slug: 'warehouse-scavenger-hunt',
    title: 'Warehouse scavenger hunt',
    eyebrow: 'Challenge · Steganography',
    oneLine:
      '[A physical challenge built on computer-architecture concepts. Placeholder describing the premise at real length.]',
    tags: ['Steganography', 'Computer architecture'],
    flagship: true,
    ...ph,
    stencil: 'DOC.01 · REV 2026.07',
  },
  {
    section: 'challenges',
    slug: 'challenge-02',
    title: '[Challenge title]',
    eyebrow: 'Challenge',
    oneLine: '[One-line premise.]',
    tags: ['[Tag]'],
    ...ph,
    stencil: 'DOC.02 · REV 2026.07',
  },
  {
    section: 'challenges',
    slug: 'challenge-03',
    title: '[Challenge title]',
    eyebrow: 'Challenge',
    oneLine: '[One-line premise.]',
    tags: ['[Tag]'],
    ...ph,
    stencil: 'DOC.03 · REV 2026.07',
  },
  {
    section: 'challenges',
    slug: 'challenge-04',
    title: '[Challenge title]',
    eyebrow: 'Challenge',
    oneLine: '[One-line premise.]',
    tags: ['[Tag]'],
    ...ph,
    stencil: 'DOC.04 · REV 2026.07',
  },
  {
    section: 'challenges',
    slug: 'challenge-05',
    title: '[Challenge title]',
    eyebrow: 'Challenge',
    oneLine: '[One-line premise.]',
    tags: ['[Tag]'],
    ...ph,
    stencil: 'DOC.05 · REV 2026.07',
  },
]

export function itemsBySection(section: Section): Item[] {
  return ITEMS.filter((i) => i.section === section)
}

export function findItem(section: string, slug: string): Item | undefined {
  return ITEMS.find((i) => i.section === section && i.slug === slug)
}

export function nextInSection(section: Section, slug: string): Item {
  const list = itemsBySection(section)
  const idx = list.findIndex((i) => i.slug === slug)
  return list[(idx + 1) % list.length]
}
