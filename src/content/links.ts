/* The four primary exits, repeated in Hero, the nav mark-menu, and Contact.
   Wire all three to the same destinations. Placeholder hrefs ('#') are for JD
   to fill later; GitHub points at the known public profile. */

export type PrimaryLink = {
  label: string
  arrow: '↓' | '→' | '↑'
  href: string
  variant: 'primary' | 'outline'
  external?: boolean
}

export const PRIMARY_LINKS: PrimaryLink[] = [
  { label: 'Résumé', arrow: '↓', href: '#', variant: 'primary' },
  { label: 'GitHub', arrow: '→', href: 'https://github.com/jdtherobot', variant: 'outline', external: true },
  { label: 'LinkedIn', arrow: '→', href: '#', variant: 'outline', external: true },
  { label: 'Email', arrow: '→', href: '#', variant: 'outline' },
]

export const SECTION_LINKS = [
  { id: 'sec-background', label: 'Background' },
  { id: 'sec-research', label: 'Research' },
  { id: 'sec-challenges', label: 'Challenges' },
  { id: 'sec-hardware', label: 'Hardware' },
  { id: 'sec-software', label: 'Software' },
]
