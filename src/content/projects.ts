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

import type { FigureData } from '../components/CodeFigure'

export type ProjectDoc = {
  docSlug: string // URL segment; 'overview' for the root README
  title: string
  file: string // filename under readmes/<slug>/
  figure?: FigureData // code-window preview for the landing course box
}

export type Project = {
  slug: string
  title: string
  tagline: string
  github: string
  liveUrl?: string // deployed app; renders a primary launch button in the header
  liveLabel?: string // label for the liveUrl button (default "Launch app →")
  tags: string[]
  docs: ProjectDoc[]
  featured?: boolean // rendered as a flagship block on the landing
  figure?: FigureData // code-window preview for the landing card / flagship
  dashboardFigure?: boolean // render the themed dashboard preview instead of a code window
}

export const PROJECTS: Project[] = [
  {
    slug: 'steganography-ctf',
    title: 'Steganography CTF Challenges',
    tagline:
      'A four-challenge steganography CTF — photo-metadata crypto, steghide, a page-table warehouse hunt, and a nested-payload carve.',
    github: 'https://github.com/jdtherobot/steganography-ctf',
    // TODO: swap to the deployed lab page once jd-ctf-environment is hosted on the site.
    liveUrl: 'https://github.com/jdtherobot/jd-ctf-environment',
    liveLabel: 'Launch challenges →',
    tags: ['Steganography', 'Cryptography', 'Computer architecture'],
    featured: true,
    // Docs order = tab order = cycle order: overview, then Warehouse first, then the levels.
    docs: [
      { docSlug: 'overview', title: 'Overview', file: 'README.md' },
      { docSlug: 'warehouse', title: 'Warehouse Scavenger Hunt', file: 'warehouse.md' },
      { docSlug: 'steganography-lvl-1', title: 'Steganography lvl 1', file: 'lvl-1.md' },
      { docSlug: 'steganography-lvl-2', title: 'Steganography lvl 2', file: 'lvl-2.md' },
      { docSlug: 'steganography-lvl-3', title: 'Steganography lvl 3', file: 'lvl-3.md' },
    ],
  },
  {
    slug: 'coursework-portfolio',
    title: 'Coursework portfolio',
    tagline:
      'Software-engineering coursework — full-stack builds across i18n, multithreading, Docker, and data modeling.',
    github: 'https://github.com/jdtherobot/coursework-portfolio',
    tags: ['Java', 'Software engineering', 'Full-stack'],
    featured: true,
    figure: {
      filename: 'WelcomeController.java',
      code: `// Three full-stack builds, one portfolio.
@GetMapping("/room/reservation/v1/welcome")
List<String> welcome() {   // EN + FR on 2 threads
  return CompletableFuture.allOf(en, fr)
    .thenApply(v -> List.of(en.join(), fr.join()));
}`,
    },
    docs: [
      { docSlug: 'overview', title: 'Overview', file: 'README.md' },
      {
        docSlug: 'hotel-reservation-platform',
        title: 'Hotel Reservation Platform',
        file: 'hotel-reservation-platform.md',
        figure: {
          filename: 'TimeController.java',
          code: `// live-presentation time: ET / MT / UTC
ZonedDateTime.now(ZoneId.of("America/Denver"))
  .withZoneSameInstant(ZoneId.of("UTC"));`,
        },
      },
      {
        docSlug: 'inventory-management-system',
        title: 'Inventory Management System',
        file: 'inventory-management-system.md',
        figure: {
          filename: 'Part.java',
          code: `// min <= inventory <= max, enforced
@ValidInventory
class Part {
  @Min(0) int minimum, maximum, inventory;
}`,
        },
      },
      {
        docSlug: 'vacation-booking-platform',
        title: 'Vacation Booking Platform',
        file: 'vacation-booking-platform.md',
        figure: {
          filename: 'checkout.flow',
          code: `NG --REST/JSON--> CheckoutController
   --> CheckoutService --> JpaRepositories
   --> JPA entities --> MySQL
@CrossOrigin  RestDataConfig exposes repos`,
        },
      },
    ],
  },
  {
    slug: 'cisco-switch-config-generator',
    title: 'Cisco switch-config generator',
    tagline: 'A VBA / Excel GUI that generates Cisco switch configurations.',
    github: 'https://github.com/jdtherobot/cisco-switch-config-generator',
    tags: ['VBA', 'Tooling', 'Networking'],
    figure: {
      filename: 'FinalConfig.txt',
      code: `hostname CORE-B12
!
vlan 10
 name USERS
vlan 20
 name VOICE
!
interface GigabitEthernet1/0/1
 switchport mode access
 switchport access vlan 10
 switchport voice vlan 20`,
    },
    docs: [{ docSlug: 'overview', title: 'Overview', file: 'README.md' }],
  },
  {
    slug: 'career-plan-app',
    title: 'Career Plan — Financial Planner',
    tagline:
      'A deterministic 50-year career-path financial planner that runs entirely in the browser via Pyodide.',
    github: 'https://github.com/jdtherobot/career-plan-app',
    liveUrl: 'https://britt.gg/career-plan-app/',
    tags: ['React', 'TypeScript', 'Pyodide'],
    dashboardFigure: true,
    // Both docs are verbatim copies of the files in the career-plan-app repo.
    // They are baked at build time (see the glob above), so edits there do NOT
    // propagate — re-copy both after changing either. Their screenshots use
    // absolute raw.githubusercontent.com URLs so the same file renders here and
    // on GitHub without path rewriting.
    docs: [
      { docSlug: 'overview', title: 'Overview', file: 'README.md' },
      {
        docSlug: 'engineering',
        title: 'Engineering Background',
        file: 'ENGINEERING.md',
      },
    ],
  },
]

export function findProject(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}

/** The 'overview' (root README) doc of a project. */
export function overviewDoc(project: Project): ProjectDoc {
  return project.docs.find((d) => d.docSlug === 'overview') ?? project.docs[0]
}

/** Docs other than the overview — the sub-writeups (e.g. course projects). */
export function subDocs(project: Project): ProjectDoc[] {
  return project.docs.filter((d) => d.docSlug !== 'overview')
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
