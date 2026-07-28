/* The four primary exits, repeated in Hero, the nav mark-menu, and Contact.
   Wire all three to the same destinations. Résumé opens the PDF at
   public/resume/JD-Britt-Resume.pdf in a new tab (drop the file in to go live). */

export type PrimaryLink = {
  label: string
  arrow: '↓' | '→' | '↑'
  href: string
  variant: 'primary' | 'outline'
  external?: boolean
}

export const PRIMARY_LINKS: PrimaryLink[] = [
  { label: 'Résumé', arrow: '↓', href: '/resume/JD-Britt-Resume.pdf', variant: 'primary', external: true },
  { label: 'GitHub', arrow: '→', href: 'https://github.com/jdtherobot', variant: 'outline', external: true },
  { label: 'LinkedIn', arrow: '→', href: 'https://www.linkedin.com/in/justinderekbritt/', variant: 'outline', external: true },
  { label: 'Email', arrow: '→', href: 'mailto:jd@britt.gg', variant: 'outline' },
]

export const SECTION_LINKS = [
  { id: 'sec-background', label: 'Background' },
  { id: 'sec-projects', label: 'Projects' },
  { id: 'sec-work', label: 'Work' },
  { id: 'sec-research', label: 'Research Direction' },
]
