/* Background pages — content registry.
   Occupation and Academics render baked markdown from ./background/*.md; the
   Personal Development page is composed (certifications → site projects →
   extracurriculars) from the data below. */

// Raw markdown baked at build time, keyed by glob path (same pattern as readmes).
const RAW = import.meta.glob('./background/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export function getBackgroundRaw(file: string): string | undefined {
  return RAW[`./background/${file}`]
}

export type Certification = {
  name: string
  issuer: string
  year?: string
  /* badge image supplied later by JD (official vendor badge); until then the
     tile renders an honest placeholder square */
  badge?: string
}

export const CERTIFICATIONS: Certification[] = [
  { name: 'CompTIA A+', issuer: 'CompTIA', year: '2014' },
  { name: 'CompTIA Security+', issuer: 'CompTIA', year: '2016' },
  { name: 'Linux Foundations', issuer: 'Western Governors University', year: '2026' },
  { name: 'Designing AI Products and Services', issuer: 'MIT', year: '' },
  { name: 'Project Management', issuer: 'U.S. Air Force', year: '2022' },
]

export type Extracurricular = {
  title: string
  meta: string // where · when
  line: string // one-line breakdown
}

export const EXTRACURRICULARS: Extracurricular[] = [
  {
    title: 'Computer Science Club — Founder & Facilitator',
    meta: 'Beale AFB · 2025 – present',
    line:
      'Founded the installation’s first CS club: weekly peer-led instruction in Linux, shell scripting, and Python; authored curriculum spanning pentesting fundamentals, packet analysis, Assembly, and embedded C; co-designing an internal CTF environment.',
  },
  {
    title: 'Air Force Sergeants Association, Ch. 1372 — Senior Advisor · VP · Trustee',
    meta: 'Beale AFB · 2023 – present',
    line:
      'Three-year leadership progression in a 100+ member professional association: placed 12 chapter officers, managed 22 committees, and organized 465 volunteers across 28 community events.',
  },
  {
    title: 'U.S. Air Force Ceremonial Honor Guard — Guardsman → Trainer → Manager',
    meta: 'Osan AB & Yokota AB · 2014 – 2021',
    line:
      'Seven years of ceremonial service — military funeral honors, color guard, and official ceremonies; ran the training program, managed the wing guard, and earned 2019 Honor Guard Member of the Year.',
  },
  {
    title: 'Mentorship & Professional Development',
    meta: 'Yokota · Kunsan · Beale · 2018 – 2023',
    line:
      'Lead mentor for the installation’s junior-enlisted seminar; hosted 11 leadership seminars training 148 airmen; coached an eight-member team to 2nd place in Japan’s national Ministry of Defense language competition.',
  },
  {
    title: 'Innovation Lab Representative',
    meta: 'Kunsan AB · 2021 – 2022',
    line: 'Unit representative to the installation innovation cell, connecting squadron ideas to base-level innovation resources.',
  },
  {
    title: 'Community Service',
    meta: '2014 – present',
    line:
      'Food-bank drives, Habitat for Humanity builds, veterans stand-downs, and host-nation charity programs — hundreds of thousands of pounds of food distributed and dozens of events organized across four installations.',
  },
]
