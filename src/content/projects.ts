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
  snippet?: string // hand-authored card one-liner paraphrasing the doc's opening — review when re-baking the README
  figure?: FigureData // code-window preview for the landing course box
  liveUrl?: string // doc-specific launch button (gold, same-tab) on landing + doc page
  liveLabel?: string // label for the doc-specific button
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
      'Four challenges in file-format internals, payload carving, applied crypto, and address translation — playable in a 32-bit Linux lab that runs in the browser, with an automated solver per challenge that re-derives the flag from the player files.',
    github: 'https://github.com/jdtherobot/steganography-ctf',
    liveUrl: 'https://britt.gg/jd-ctf-environment/browser-lab/workbench.html',
    liveLabel: 'Launch challenges →',
    tags: ['Steganography', 'Cryptography', 'Computer architecture'],
    featured: true,
    // Docs order = tab order = cycle order: overview, then strength-first —
    // Warehouse, then the levels hardest → simplest (play order is stated in
    // the overview; these are writeups).
    docs: [
      { docSlug: 'overview', title: 'Overview', file: 'README.md' },
      {
        docSlug: 'warehouse',
        title: 'Computer Architecture Warehouse',
        file: 'warehouse.md',
        snippet:
          "You're cast as the MMU: handed a virtual address and no shortcuts, you resolve it level by level to find one box on a warehouse floor.",
        // opens the challenge in the lab (sim embedded on challenge 04) rather
        // than the standalone full-screen game
        liveUrl: 'https://britt.gg/jd-ctf-environment/browser-lab/workbench.html#04-computer-architecture-warehouse',
        liveLabel: 'Launch warehouse sim →',
      },
      {
        docSlug: 'steganography-lvl-3',
        title: 'Steganography lvl 3',
        file: 'lvl-3.md',
        snippet:
          'The hardest of the set: one JPEG hiding six payloads — carve them apart, derive the outer password from the brief, pull a key from quantization tables, unwind to the flag.',
      },
      {
        docSlug: 'steganography-lvl-2',
        title: 'Steganography lvl 2',
        file: 'lvl-2.md',
        snippet:
          'A payload hidden in an image with steghide behind a deliberately weak passphrase — the lesson is spotting the payload, recovering it, and catching the pivot it hands you.',
      },
      {
        docSlug: 'steganography-lvl-1',
        title: 'Steganography lvl 1',
        file: 'lvl-1.md',
        snippet:
          "The one the set grew out of — an AES-encrypted flag parked in a photo's EXIF comment, with the password sitting in plain sight in the email it arrived with.",
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
    .thenApply(v -> List.of(en.join(), fr.join()))
    .join();
}`,
    },
    docs: [
      { docSlug: 'overview', title: 'Overview', file: 'README.md' },
      {
        docSlug: 'hotel-reservation-platform',
        title: 'Hotel Reservation Platform',
        file: 'hotel-reservation-platform.md',
        snippet:
          'A full-stack hotel reservation app extended with i18n, multithreaded resource loading, timezone and currency handling, and a single-image Docker build.',
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
        snippet:
          'A server-rendered Spring MVC inventory app extended with enforced min/max inventory invariants, cross-entity validation, and a lightweight purchase flow.',
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
        snippet:
          'A Spring Boot e-commerce backend built from the ground up — domain model to checkout service — behind the course-provided Angular client, which consumes it unmodified.',
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
