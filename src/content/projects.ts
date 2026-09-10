/* Projects — the "Projects" section. Each project links to its own page that
   renders the repo's README(s), baked locally under readmes/<slug>/ so the site
   works regardless of repo visibility. A repo with multiple docs shows them as
   clickable preview boxes; a single-doc repo renders directly. */

// Raw markdown baked from the repos, keyed by glob path. Lazy: each doc is its
// own chunk, fetched when its page renders — the landing ships no markdown.
const RAW = import.meta.glob('./readmes/**/*.md', {
  query: '?raw',
  import: 'default',
}) as Record<string, () => Promise<string>>

import type { FigureData } from '../components/CodeFigure'

export type ProjectDoc = {
  docSlug: string // URL segment; 'overview' for the root README
  title: string
  tab?: string // short label for the writeup-page tab row (falls back to title); keeps the tabs on one line
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
  liveUrl?: string // primary action — deployed app or a direct file (e.g. the
  // workbook); renders the gold button at the right edge of the header action
  // row on the project page, and on the landing card
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
        tab: 'Warehouse',
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
        tab: 'Lvl 3',
        file: 'lvl-3.md',
        snippet:
          'The hardest of the set: one JPEG hiding six payloads — carve them apart, derive the outer password from the brief, pull a key from quantization tables, unwind to the flag.',
      },
      {
        docSlug: 'steganography-lvl-2',
        title: 'Steganography lvl 2',
        tab: 'Lvl 2',
        file: 'lvl-2.md',
        snippet:
          'A payload hidden in an image with steghide behind a deliberately weak passphrase — the lesson is spotting the payload, recovering it, and catching the pivot it hands you.',
      },
      {
        docSlug: 'steganography-lvl-1',
        title: 'Steganography lvl 1',
        tab: 'Lvl 1',
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
        tab: 'Hotel',
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
        tab: 'Inventory',
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
        tab: 'Vacation',
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
    // the runnable deliverable is the macro-enabled workbook itself — hand the
    // visitor the canonical file from the repo (raw URL → direct download).
    // Re-point when the workbook filename version-bumps.
    liveUrl:
      'https://raw.githubusercontent.com/jdtherobot/cisco-switch-config-generator/main/workbook/ConfigGenerator_13%20Sep_v3.0.xlsm',
    liveLabel: 'Open the workbook →',
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
    // Both docs originate in the career-plan-app repo but the baked
    // ENGINEERING.md carries one deliberate site-side edit: the Phase 1 income
    // screenshot is omitted (it showed the populated personal workbook). Do
    // NOT blind re-copy from the repo — keep that omission. Screenshots use
    // absolute raw.githubusercontent.com URLs so the same file renders here
    // and on GitHub without path rewriting.
    docs: [
      { docSlug: 'overview', title: 'Overview', file: 'README.md' },
      {
        docSlug: 'engineering',
        title: 'Engineering Background',
        file: 'ENGINEERING.md',
      },
    ],
  },
  {
    slug: 'privilege-escalation-setuid',
    title: 'Privilege Escalation via Setuid Binary',
    tagline:
      'A staged privilege-escalation demonstration that reads /etc/shadow through a setuid binary — escalating from a shell script, to C, to raw syscalls, to hand-written x86-64 assembly.',
    github: 'https://github.com/jdtherobot/privilege-escalation--setuid-binary-',
    tags: ['C', 'x86-64 Assembly', 'Privilege escalation'],
    featured: true,
    // Progression writeup, split doc-per-stage. The docs below are byte-for-byte
    // slices of the repo's single writeup.md, cut at its own section headings;
    // the overview's H1 is the sole edit (repo slug → a readable title). Figure
    // code is a faithful excerpt of each stage's real source.
    figure: {
      filename: 'wrapper.c',
      code: `// read root-only /etc/shadow via a setuid wrapper
long fd = syscall3(2, (long)"/usr/bin/sha2deep", 01101, 0600);
syscall3(33, fd, 1, 0);            // dup2 -> stdout
char *args[] = {"/bin/cat", "/etc/shadow", 0};
syscall3(59, (long)"/bin/cat", (long)args, 0);   // execve`,
    },
    docs: [
      { docSlug: 'overview', title: 'Overview', file: 'README.md' },
      {
        docSlug: 'c-wrapper',
        title: 'C Wrapper',
        tab: 'C Wrapper',
        file: 'c-wrapper.md',
        snippet:
          'The first working version — open the target file, redirect stdout onto it with dup2, then hand off to /bin/cat through execve.',
        figure: {
          filename: 'wrapper.c',
          code: `int fd = open("/usr/bin/sha2deep",
              O_WRONLY | O_CREAT | O_TRUNC, 0600);
dup2(fd, STDOUT_FILENO);   // cat writes into the fd
char *args[] = {"/bin/cat", "/etc/shadow", NULL};
execve("/bin/cat", args, NULL);`,
        },
      },
      {
        docSlug: 'syscalls',
        title: 'C Wrapper with Syscalls',
        tab: 'Syscalls',
        file: 'syscalls.md',
        snippet:
          'libc stripped out: open, dup2, close and execve driven through a hand-rolled inline-assembly syscall helper, then reduced to raw octal flags.',
        figure: {
          filename: 'wrapper.c',
          code: `static inline long syscall3(long num,
                            long a1, long a2, long a3) {
    long ret;
    __asm__ __volatile__(
        "syscall"
        : "=a"(ret)
        : "a"(num), "D"(a1), "S"(a2), "d"(a3)
        : "rcx", "r11", "memory");
    return ret;
}`,
        },
      },
      {
        docSlug: 'assembly',
        title: 'x86-64 Assembly Implementation',
        tab: 'Assembly',
        file: 'assembly.md',
        snippet:
          'No compiler at all — syscalls invoked directly in x86-64, every path string built on the stack in Little-Endian, registers loaded by hand.',
        figure: {
          filename: 'wrapper.asm',
          code: `; push "///usr/bin/sha2deep" in reverse (LE)
push 0x00706565             ; "eep\\0"
mov  rbx, 0x64326168732f6e69 ; "in/sha2d"
push rbx
mov  rsi, 577               ; flags 01101 octal
mov  rdx, 384               ; mode  0600 octal
mov  rax, 2                 ; sys_open
syscall`,
        },
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

export function loadDocRaw(slug: string, file: string): Promise<string | undefined> {
  const load = RAW[`./readmes/${slug}/${file}`]
  return load ? load() : Promise.resolve(undefined)
}
