/* Background pages — content registry.
   Occupation and Academics render baked markdown from ./background/*.md; the
   Personal Development page is composed — certifications from the data below,
   then the site's project index, then extracurriculars.md in a doc card. */

// Raw markdown baked at build time, keyed by glob path (same pattern as
// readmes). Lazy: each doc is its own chunk, fetched when its page renders.
const RAW = import.meta.glob('./background/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

export function loadBackgroundRaw(file: string): Promise<string | undefined> {
  const load = RAW[`./background/${file}`]
  return load ? load() : Promise.resolve(undefined)
}

export type Certification = {
  name: string
  issuer: string
  year?: string
  /* short mark shown in the site-styled tile (e.g. 'A+', 'LPI'); falls back to a seal */
  mark?: string
  /* credential / verification ID, shown on the tile so a visitor can confirm it */
  credId?: string
  /* issuer verification page (or a direct credential URL where one exists) */
  verify?: string
}

export const CERTIFICATIONS: Certification[] = [
  { name: 'CISSP', issuer: 'ISC2', year: '2026', mark: 'CISSP', credId: '3120559', verify: 'https://www.isc2.org/verify' },
  { name: 'CompTIA Security+', issuer: 'CompTIA', year: '2016', mark: 'Sec+', credId: '5W37E4LMFDQ419R1', verify: 'https://verify.comptia.org' },
  { name: 'CompTIA A+', issuer: 'CompTIA', year: '2014', mark: 'A+', credId: '2K9CBW6E3KVESYK8', verify: 'https://verify.comptia.org' },
  { name: 'Linux Essentials', issuer: 'Linux Professional Institute (LPI)', year: '2026', mark: 'LPI', credId: 'LPI000681445', verify: 'https://cs.lpi.org/caf/Xamman/certification/verify/LPI000681445/tdgdblba2u' },
  { name: 'Designing and Building AI Products and Services', issuer: 'MIT xPRO', year: '2023', mark: 'AI', credId: '798495', verify: 'https://certificates.emeritus.org/7cabcb90-9cdd-494e-a09a-d994f3349113#acc.4Bmyvs8r' },
  { name: 'Project Management', issuer: 'U.S. Air Force', year: '2022', mark: 'PM' },
]

