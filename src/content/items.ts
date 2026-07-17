/* Content model — every challenge, hardware, and software item resolves to its
   own blank detail page at /:section/:slug. Copy is PLACEHOLDER (bracketed);
   JD writes real content later. To add/edit an item, edit this file only —
   the landing cards and the detail routes are both generated from it. */

export type Section = 'challenges' | 'hardware' | 'software'

export type Item = {
  section: Section
  slug: string
  title: string
  eyebrow: string // detail-page kicker, e.g. "Challenge · Steganography"
  oneLine: string // short premise shown on the landing card / row sub
  sub?: string // mono label for software rows (e.g. "Java")
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
  hardware: 'Hardware & firmware',
  software: 'Software & coursework',
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
  // ---------------- Challenges ----------------
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

  // ---------------- Hardware & firmware ----------------
  {
    section: 'hardware',
    slug: 'ps2-shell-console',
    title: 'PS2-shell emulation console',
    eyebrow: 'Hardware · Embedded',
    oneLine: '[AMD APU · authentic 15 kHz CRT output via external DAC.]',
    tags: ['Embedded', 'Analog / CRT'],
    ...ph,
    stencil: 'HW.01 · REV 2026.07',
  },
  {
    section: 'hardware',
    slug: 'psp-vita-android-firmware',
    title: 'PSP / PS Vita / Android firmware',
    eyebrow: 'Hardware · Firmware',
    oneLine: '[Firmware modding for retro emulation.]',
    tags: ['Firmware'],
    ...ph,
    stencil: 'HW.02 · REV 2026.07',
  },
  {
    section: 'hardware',
    slug: 'signal-path-03',
    title: '[Signal-path detail]',
    eyebrow: 'Hardware · Signal',
    oneLine: '[Placeholder for a third hardware artifact.]',
    tags: ['Signal'],
    ...ph,
    stencil: 'HW.03 · REV 2026.07',
  },

  // ---------------- Software & coursework ----------------
  {
    section: 'software',
    slug: 'java-coursework',
    title: 'Coursework projects',
    eyebrow: 'Software · Java',
    sub: 'Java',
    oneLine: '[D288 · D387 · others]',
    tags: ['Java'],
    ...ph,
    stencil: 'SW.01 · REV 2026.07',
  },
  {
    section: 'software',
    slug: 'cpp-c-coursework',
    title: 'Coursework & practice',
    eyebrow: 'Software · C++ / C',
    sub: 'C++ / C',
    oneLine: '[Placeholder — to be retrieved]',
    tags: ['C++', 'C'],
    ...ph,
    stencil: 'SW.02 · REV 2026.07',
  },
  {
    section: 'software',
    slug: 'cisco-config-generator',
    title: 'Cisco switch-config generator',
    eyebrow: 'Software · VBA / Excel',
    sub: 'VBA / Excel',
    oneLine: '[GUI that generates switch configs]',
    tags: ['VBA', 'Tooling'],
    ...ph,
    stencil: 'SW.03 · REV 2026.07',
  },
  {
    section: 'software',
    slug: 'career-planning-app',
    title: 'Career-planning app',
    eyebrow: 'Software · Web app',
    sub: 'Web app',
    oneLine: '[Finishing final details]',
    tags: ['Web app'],
    ...ph,
    stencil: 'SW.04 · REV 2026.07',
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
