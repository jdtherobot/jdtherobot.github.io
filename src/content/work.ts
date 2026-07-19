/* Work — a 12-year career told as a left→right scroll of accomplishments, plus
   a list of awards. All placeholder for now; the section title links to the
   full career résumé page (/career), distinct from the standard résumé.
   To fill later, edit ACCOMPLISHMENTS and AWARDS. */

export type Accomplishment = {
  slug: string
  period: string // e.g. "2014 — 2016"
  title: string
  oneLine: string
}

export type Award = {
  year: string
  title: string
  detail: string
}

export const ACCOMPLISHMENTS: Accomplishment[] = [
  { slug: 'acc-01', period: '[YEAR]', title: '[Accomplishment]', oneLine: '[One-line summary of the role, scope, or result.]' },
  { slug: 'acc-02', period: '[YEAR]', title: '[Accomplishment]', oneLine: '[One-line summary of the role, scope, or result.]' },
  { slug: 'acc-03', period: '[YEAR]', title: '[Accomplishment]', oneLine: '[One-line summary of the role, scope, or result.]' },
  { slug: 'acc-04', period: '[YEAR]', title: '[Accomplishment]', oneLine: '[One-line summary of the role, scope, or result.]' },
  { slug: 'acc-05', period: '[YEAR]', title: '[Accomplishment]', oneLine: '[One-line summary of the role, scope, or result.]' },
]

export const AWARDS: Award[] = [
  { year: '[YEAR]', title: '[Award or decoration]', detail: '[Placeholder — the citation or reason, one line.]' },
  { year: '[YEAR]', title: '[Award or decoration]', detail: '[Placeholder — the citation or reason, one line.]' },
  { year: '[YEAR]', title: '[Award or decoration]', detail: '[Placeholder — the citation or reason, one line.]' },
  { year: '[YEAR]', title: '[Award or decoration]', detail: '[Placeholder — the citation or reason, one line.]' },
]
