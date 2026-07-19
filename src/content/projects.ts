/* Projects — the "Projects" section. Each project links to its own page that
   renders the repo's README(s), baked locally under readmes/<slug>/ so the site
   works regardless of repo visibility. A repo with multiple docs shows them as
   clickable preview boxes; a single-doc repo renders directly. */

// Raw markdown baked from the repos, keyed by glob path.
const RAW = import.meta.glob('./readmes/**/*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
}) as Record<string, string>

export type ProjectDoc = {
  docSlug: string // URL segment; 'overview' for the root README
  title: string
  file: string // filename under readmes/<slug>/
}

export type Project = {
  slug: string
  title: string
  tagline: string
  github: string
  tags: string[]
  docs: ProjectDoc[]
}

export const PROJECTS: Project[] = [
  {
    slug: 'coursework-portfolio',
    title: 'Coursework portfolio',
    tagline:
      'Software-engineering coursework — full-stack builds across i18n, multithreading, Docker, and data modeling.',
    github: 'https://github.com/jdtherobot/coursework-portfolio',
    tags: ['Java', 'Software engineering', 'Full-stack'],
    docs: [
      { docSlug: 'overview', title: 'Overview', file: 'README.md' },
      { docSlug: 'hotel-reservation-platform', title: 'Hotel Reservation Platform', file: 'hotel-reservation-platform.md' },
      { docSlug: 'inventory-management-system', title: 'Inventory Management System', file: 'inventory-management-system.md' },
      { docSlug: 'vacation-booking-platform', title: 'Vacation Booking Platform', file: 'vacation-booking-platform.md' },
    ],
  },
  {
    slug: 'cisco-switch-config-generator',
    title: 'Cisco switch-config generator',
    tagline: 'A VBA / Excel GUI that generates Cisco switch configurations.',
    github: 'https://github.com/jdtherobot/cisco-switch-config-generator',
    tags: ['VBA', 'Tooling', 'Networking'],
    docs: [{ docSlug: 'overview', title: 'Overview', file: 'README.md' }],
  },
  {
    slug: 'career-plan-app',
    title: 'Career Plan Codex',
    tagline:
      'A deterministic 50-year career-path financial planner that runs entirely in the browser via Pyodide.',
    github: 'https://github.com/jdtherobot/Career-Plan-app',
    tags: ['React', 'TypeScript', 'Pyodide'],
    docs: [{ docSlug: 'overview', title: 'Overview', file: 'README.md' }],
  },
]

export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

export function getDocRaw(slug: string, file: string): string | undefined {
  return RAW[`./readmes/${slug}/${file}`]
}

/** First meaningful paragraph of a markdown doc, for preview snippets. */
export function docSnippet(slug: string, file: string, max = 160): string {
  const raw = getDocRaw(slug, file)
  if (!raw) return ''
  const line = raw
    .split('\n')
    .map((l) => l.trim())
    .find(
      (l) =>
        l.length > 24 &&
        !l.startsWith('#') &&
        !l.startsWith('![') &&
        !l.startsWith('|') &&
        !l.startsWith('```') &&
        !l.startsWith('>') &&
        !l.startsWith('<') &&
        !l.startsWith('[') &&
        !l.startsWith('- ') &&
        !l.startsWith('* ') &&
        !/https?:\/\//.test(l) &&
        !/^\*\*[^*]+:\*\*/.test(l)
    )
  if (!line) return ''
  const clean = line.replace(/[*_`>[\]()]/g, '').replace(/\s+/g, ' ').trim()
  return clean.length > max ? clean.slice(0, max).replace(/\s\S*$/, '') + '…' : clean
}
