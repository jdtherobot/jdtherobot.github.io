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
  liveUrl?: string // deployed app; renders a primary "Launch app →" button
  tags: string[]
  docs: ProjectDoc[]
  featured?: boolean // rendered as a flagship block on the landing
  figure?: FigureData // code-window preview for the landing card / flagship
}

export const PROJECTS: Project[] = [
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
      filename: 'Module1.bas',
      code: `' Reference!F:AF -> AutoBuildVLANs -> A:C
' VLAN_List (dynamic named range)
FinalConfig = ConfigTemplate _
  & Reference(A:B) & Ports(A:D)`,
    },
    docs: [{ docSlug: 'overview', title: 'Overview', file: 'README.md' }],
  },
  {
    slug: 'career-plan-app',
    title: 'Career Plan Codex',
    tagline:
      'A deterministic 50-year career-path financial planner that runs entirely in the browser via Pyodide.',
    github: 'https://github.com/jdtherobot/career-plan-app',
    liveUrl: 'https://britt.gg/career-plan-app/',
    tags: ['React', 'TypeScript', 'Pyodide'],
    figure: {
      filename: 'build.sh',
      code: `# deterministic 50-yr planner, in-browser
python3 scripts/export_web_data.py
cd web && npm run build:full
# Pyodide runs the projection client-side`,
    },
    docs: [{ docSlug: 'overview', title: 'Overview', file: 'README.md' }],
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
