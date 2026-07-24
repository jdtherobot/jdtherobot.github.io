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
  liveUrl?: string // doc-specific launch button (gold, same-tab) on landing + doc page
  liveLabel?: string // label for the doc-specific button
}

export type ProjectFlag = {
  id: string // stable key for localStorage
  label: string // challenge name shown on the chip
  sha256: string // hex SHA-256 of the exact Flag{…} string
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
  flags?: ProjectFlag[] // CTF flags; enables the FlagCheck panel on the project page
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
    liveUrl: 'https://britt.gg/jd-ctf-environment/browser-lab/workbench.html',
    liveLabel: 'Launch challenges →',
    tags: ['Steganography', 'Cryptography', 'Computer architecture'],
    featured: true,
    // Docs order = tab order = cycle order: overview, then Warehouse first, then the levels.
    docs: [
      { docSlug: 'overview', title: 'Overview', file: 'README.md' },
      {
        docSlug: 'warehouse',
        title: 'Computer Architecture Warehouse',
        file: 'warehouse.md',
        liveUrl: 'https://britt.gg/jd-ctf-environment/warehouse-game/',
        liveLabel: 'Launch warehouse sim →',
      },
      { docSlug: 'steganography-lvl-1', title: 'Steganography lvl 1', file: 'lvl-1.md' },
      { docSlug: 'steganography-lvl-2', title: 'Steganography lvl 2', file: 'lvl-2.md' },
      { docSlug: 'steganography-lvl-3', title: 'Steganography lvl 3', file: 'lvl-3.md' },
    ],
    // SHA-256 of the exact Flag{…} strings. FlagCheck hashes input locally and
    // compares — no network, no plaintext beyond what the writeups already print.
    flags: [
      {
        id: 'warehouse',
        label: 'Computer Architecture Warehouse',
        sha256: '81223d18eaf595d4324aa3a8f7f23598ec769a20c12812cc15fec534da2b4d71',
      },
      {
        id: 'steganography-lvl-1',
        label: 'Steganography lvl 1',
        sha256: 'd95e39d16dcf40a6705a49c39a6820c33dc3296896abd98d29f691002dc01e13',
      },
      {
        id: 'steganography-lvl-2',
        label: 'Steganography lvl 2',
        sha256: '061f3d2d27c3b9ce8e55596494670fa93e6fa56e6f3ba76ae3b8776d0a309a74',
      },
      {
        id: 'steganography-lvl-3',
        label: 'Steganography lvl 3',
        sha256: '43f9a331935218745b0f3ae6ecdede8777e04068865bb9f580ed09b1c1dcc4f8',
      },
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
