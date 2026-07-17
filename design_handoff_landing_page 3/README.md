# Handoff: JD Britt — Personal Landing Page

## Overview
A small, deliberately-scoped personal landing page for JD Britt — a full-time
IT professional, full-time CS undergrad, and U.S. Air Force member positioning
for a CNODP selection board, PhD lab PIs / intern managers, and technical
recruiters (grad-school admissions read throughout). The page must read as
serious and well-built, never as a sprawling portfolio and never as "more than
it is." It is a single scrolling landing page plus **separate** project-detail
pages (writeups open as their own pages, not modals or inline expansion).

## About the Design Files
The file in this bundle is a **design reference created in HTML** — a working
prototype showing intended look and behavior, **not production code to copy
directly**. The task is to **recreate this design in the target codebase's
environment** using its established patterns and libraries. If no environment
exists yet, choose an appropriate framework (React/Next recommended, since the
design system already ships as React components) and implement there.

The design is built on the **Cybernetic Premium — JD Britt Design System**,
which exists as real React components + CSS tokens. Reuse that system rather
than re-deriving styles from the prototype markup. In this prototype the DS is
loaded from `_ds/cybernetic-premium-jd-britt-design-syste-2f21f3b4-.../` — the
production app should consume the published design-system package instead.

> **Offline copy included.** This folder now ships a full copy of the design
> system under `_ds/…` plus `support.js` alongside the prototype, so
> `JD Britt - Landing.dc.html` opens and renders standalone (double-click / any
> static server) with no external dependency. These bundled files are a
> convenience snapshot for review only — in production, consume the published
> design-system package, not this copy.

## Fidelity
**High-fidelity for visual design; placeholder for copy and imagery.**
- Colors, typography, spacing, components, layout, motion, and interactions are
  final — recreate them faithfully.
- **All body/heading copy is placeholder** (bracketed `[…]` text). JD writes
  real content later. Do not treat placeholder wording as final.
- **All imagery is reserved empty slots** (carbon-framed placeholders). Real
  screenshots/figures are supplied later. Per the DS imagery rule: project
  screenshots go in a carbon frame; **no stock photography, no third-party
  product photos**.
- **The hero "morph"** is a square (1:1) animated schematic JD supplies as a
  built prototype later — reserve the square slot; mount the supplied component
  into it. It runs ~2s once on first view, rests, and replays only on revisit.

## Screens / Views

### 1. Landing (route: `home`)
Single vertical scroll. Sticky top nav. Sections, top to bottom:

1. **Hero** — dot-grid ground. Two-column grid (`1fr .8fr`, gap 48px, vertically
   centered). Left column: eyebrow (mono) → `JD BRITT` H1 (Rajdhani 700, 56px,
   uppercase) → one-line positioning (Space Grotesk, 17px, max 560px) → gold
   `WaveTrace` motif (width 300) → four action buttons. Right column: a
   carbon-framed reserved figure slot (aspect 5/4). **The four primary exits —
   Résumé (primary/gold), GitHub, LinkedIn, Email (outline) — must be reachable
   without scrolling.** Section padding `76px 0 60px`.
2. **Hero morph** — centered, `460px` max width, carbon frame, 1:1 reserved slot
   for the supplied animated schematic. Section padding `8px 0 72px`.
3. **Background** — dot-grid, top hairline. Eyebrow + H2 "Three commitments, at
   once", then a `1.25fr 1fr` grid: left = two narrative paragraphs (this section
   resolves the apparent contradiction and needs room to breathe); right = three
   bordered link rows (Occupation / Academics / Personal development), each an
   `<a>` that hover-highlights (border → gold, faint gold wash). Below, a hairline
   rule then three `Stat` placeholders (`[ — ]`, "verify" labels).
4. **Research direction** — dot-grid. Eyebrow + H2 "The questions I want to work
   on" + lead. Three `Card`s in a `repeat(3,1fr)` grid, gap 20px, one per tier:
   **Theory** (`tier="plain"`), **Implementation** (`tier="branch"`),
   **Application** (`tier="dissolve"`), each with a `TIER.0n` stencil. This is a
   **research agenda** (questions + approach), NOT a portfolio of finished work.
   Never label anything "coming soon."
5. **Challenges — FLAGSHIP** (id `sec-challenges`) — **inverted ground**
   (`background: var(--panel)`, `color: var(--panel-text)`) to give it the most
   visual weight on the page. Section padding `78px 0`. Eyebrow + H2 (38px) +
   lead, then a large feature card (`1.1fr 1fr` grid, bordered, clickable → opens
   the detail page) for the warehouse scavenger hunt, then a horizontal rail of
   more challenge cards (300px each) that **advances as you scroll past** and is
   hand-draggable. This is the rarest signal on the page — building a challenge
   others solve — so it gets the most weight of any project section.
6. **Hardware & firmware** (id `sec-hardware`) — dot-grid. Eyebrow + H2 "Embedded
   systems & analog signal work" + lead, then a horizontal rail of 340px cards:
   PS2-shell emulation console (AMD APU, 15 kHz CRT via external DAC), PSP/PS
   Vita/Android firmware, a third signal-path slot. Frame as embedded-systems /
   analog-signal engineering, **not a hobby**.
7. **Software & coursework** (id `sec-software`) — plain ground. A compact,
   honest list (NOT hero cards): four `softrow`s (Java / C++·C / VBA·Excel Cisco
   config generator / career-planning web app), each a hairline-divided flex row
   with a mono label column (120px), name + sub, and a `→`. Completeness without
   oversell.
8. **Notes / writeups** — **commented out in the prototype and gated by an
   `sc-if` (`showNotes` prop, default false)**. The section MUST render only when
   at least one post exists — never ship an empty container. Layout is reserved:
   eyebrow + H2 "Recent notes" + a list of `NoteRow`s.
9. **Contact / footer** — plain ground, top hairline. Eyebrow + H2 "Résumé &
   contact" + the same four exit buttons repeated, then a footer bar (mark +
   `JD BRITT` lockup on the left, `SEC.09 · REV 2026.07` stencil on the right).

### 2. Challenge detail (route: `detail`)
Opens as its **own page/route** (not a modal, not inline expansion). Layout is a
narrower `820px` measure. Order: back bar (`← Back to challenges`, `DOC · REV`
stencil) → dot-grid header (eyebrow → H1 42px → deck → tags) → hero figure slot
(16:9, carbon frame) → article body (`Premise` / `The concept` (+ diagram slot)
/ `How it works` / `What it proves`, each an eyebrow + body paragraph) →
artifacts rail (280px carbon-framed 4:3 slots) → footer (`← All challenges`,
`Next challenge →`). One representative detail page is built; other projects/
writeups/dev-notes follow the same template.

## Interactions & Behavior
- **Routing**: single-page state (`route: 'home' | 'detail'`). Feature card, its
  button, and rail cards in Challenges open `detail`. Back links and the nav
  brand return to `home`. On route change: scroll to top and re-init observers.
  In production, implement as real routes/URLs (e.g. `/challenges/<slug>`).
- **Top-nav links** (Background/Research/Challenges/Hardware/Software) smooth-
  scroll to the section (offset −62px for the sticky nav). If invoked from the
  detail route, they first return home, then scroll.
- **Scroll behavior — critical**: sections respond to scroll (reveals, rails that
  advance as they pass) but **must never block, hijack, or trap vertical scroll**.
  A recruiter skimming with a trackpad must reach the footer at full speed.
  Cinematic for someone lingering; invisible to someone scanning.
- **Reveal on scroll-in**: `.rv` elements fade + rise (`translateY(14px)` → none,
  opacity 0 → 1) via IntersectionObserver (`threshold .14`, `rootMargin
  0 0 -6% 0`), each firing once. Transition `.55s cubic-bezier(.2,.7,.2,1)`. The
  DS spec calls this an entrance "piano run" that settles left→right — refine to
  segment stagger if desired.
- **Header/title ambient glitch slice**: rare (`data-slice` titles, one random
  on-screen title every ~9–17s, ~400–450ms clip-path slice). Day = soft;
  Night = harder/chromatic.
- **Morph slot**: a single gold scan sweep on first view (~1.9s); resets when it
  leaves the viewport so it replays on revisit. Replace with JD's supplied
  animated component.
- **Rails**: advance proportionally to the section's progress through the
  viewport (`scrollLeft = progress * maxScroll * 0.9`); yield permanently to the
  user on manual pointer/wheel-x interaction (`data-user` flag).
- **Buttons**: primary = gold fill, dims to `.88` opacity on hover; outline =
  ink outline that inverts (ink ground, page-color text) on hover. No scale/
  bounce. Transitions `.18s`.
- **Mode toggle**: day/night via `data-mode` on `<html>`, persisted to
  `localStorage['jdb-mode']`, respects `prefers-color-scheme` as the initial
  default in the DS component — **but this page's canonical theme is Day**; the
  prototype forces `day` when nothing is saved.
- **prefers-reduced-motion**: all of the above is suppressed — content shows at
  full opacity immediately, no slices, no morph sweep, no rail auto-advance,
  instant (non-smooth) scroll. Nothing flashes faster than ~3Hz.

## State Management
- `route`: `'home' | 'detail'` — which view is mounted.
- `mode`: `'day' | 'night'` — on `<html data-mode>`, persisted to localStorage.
- `showNotes`: boolean — gates the Notes section; true only when ≥1 post exists.
- Rail `data-user` flags — whether the visitor has taken manual control of a rail.
- Per-element reveal state (`.in` class) — whether an element has entered view.
- Production data: research tiers, challenges list, hardware list, software list,
  and notes/posts should be data-driven (CMS or content files), each project/
  note resolving to its own detail route.

## Design Tokens (Cybernetic Premium)
**Core rule: gold is a MATERIAL, not an ink** — only fills, traces, rules, the
mark, and LARGE numerals. All small text is ink. Focus rings use an ink, never
gold. Headings inherit color (never bind a fixed token) so they survive card
inversion.

**Color — material (constant both modes)**
- `--gold #C9A45E`, `--cream #ECE2C6`, `--carbon #17161A`, `--ink #1E1B12`

**Color — Day (cream page / carbon cards)**
- `--bg #ECE2C6` · `--text #1E1B12` · `--panel #17161A` · `--panel-text #ECE2C6`
- `--edge #c9b98a` · `--dot #c9b98a`
- `--label-on-bg #4A4436` · `--label-on-panel #C9BFA6`
- `--stat #8A6F2E` (large numerals only) · `--btn-text #17161A`
- `--seam rgba(201,164,94,.5)`

**Color — Night (carbon page / cream cards)**
- `--bg #17161A` · `--text #ECE2C6` · `--panel #ECE2C6` · `--panel-text #17161A`
- `--edge #3a3626` · `--dot #3a3626`
- `--label-on-bg #C9BFA6` · `--label-on-panel #4A4436`
- `--stat #C9A45E` · `--btn-text #17161A` · `--seam rgba(122,97,40,.35)`

**Typography** (three faces, strict roles — all Google Fonts)
- Display/headings: **Rajdhani** 600/700, UPPERCASE, `letter-spacing .005em`
- Body: **Space Grotesk** 400, line-height 1.75, measure ≤620px
- Labels/data/nav/buttons/stencil: **JetBrains Mono** 400
- Scale: H1 44px (hero uses 56px) / H2 26px (flagship 38px) / H3 17px / body
  15.5px / body-sm 13.5px / eyebrow 11px `.16em` / tag 10px `.1em` / btn 12px
  `.08em` / nav 12px `.06em` / stencil 8px `.1em` / caption 10px `.08em`

**Spacing / layout**
- Scale: 4 / 8 / 14 / 20 / 26 / 32 / 48 / **72 (section rhythm)** px
- Content max width **1040px**, gutters **32px**, grid gap **20px**
- Card padding `22px 24px 26px`; figure (carbon frame) padding `8px`
- Dot-grid pitch **26px**; tier-line height 14px

**Borders / radius / shadow**
- Hairline `1px var(--edge)` borders everywhere; **radius 0** (square corners);
  **no shadows/glows anywhere.** Sole rounded element: mode-toggle track
  (`--radius-pill 11px`).

**Motion**
- `--ease-settle cubic-bezier(.22,.9,.24,1)` (entrance) · `--dur-mode .3s`
  (day/night cross-fade). Button/hover transitions ~`.18s`.

## Components (from the design system — reuse, don't rebuild)
Mounted in the prototype via `window.CyberneticPremiumJDBrittDesignSystem_2f21f3`:
- **core/** `Button` (`variant: primary|outline`, `href`, `onClick`), `Tag`
  (`on: bg|panel`), `Eyebrow` (`on: bg|panel`)
- **brand/** `WaveTrace` (`color`, `width`), `MarkSpike` (`color`, `size`),
  `TierLine` (`variant: plain|branch|dissolve`)
- **surface/** `Card` (`tier`, `stencil`, `innerStyle`), `Figure` (`src`, `alt`,
  `caption`, `ratio`; renders children as an empty state when no `src`)
- **data/** `Stat` (`value`, `label`), `NoteRow` (`tag`, `title`, `date`,
  `href`), `ModeToggle`
- **The signature motif** is the neural waveform trace: `viewBox="0 0 280 40"`,
  `points="0,20 40,20 48,6 56,34 64,20 120,20 128,10 136,20 180,20 188,4 196,36 204,20 280,20"`.
  Recolor per system, never redraw. The mark is a square crop of its sharpest
  spike. **This brand ships no icon set and no emoji** — arrows (→ ↓ ↑) are
  Unicode typed into copy; precision comes from type, rules, and tier lines.

## Assets
- **Brand mark / motif**: `mark-spike.svg`, `waveform-trace.svg` (pure gold
  polylines) — provided by the design system (`WaveTrace` / `MarkSpike`).
- **All figures/screenshots**: reserved empty carbon-framed slots in the
  prototype; JD supplies real images later. No stock or third-party product
  photography.
- **Hero morph**: JD supplies a built square (1:1) animated-schematic prototype;
  mount it into the reserved slot.
- **Fonts**: Rajdhani, Space Grotesk, JetBrains Mono (Google Fonts).

## Files
- `JD Britt — Landing.dc.html` — the full prototype (landing + challenge-detail
  route) in one file. Contains the layout, motion logic, routing, and the exact
  placeholder copy. Reference it for structure, measurements, and behavior.
- The Cybernetic Premium design system (React components + CSS token files) is
  the styling source of truth — consume its published package in production.

## Update: nav brand → links menu (2026.07)
The top-left brand lockup was split into two distinct controls:

- **Waveform mark (`MarkSpike`)** — now a **menu trigger**. Clicking it opens a
  dropdown of the four primary links, in order: **Résumé** (`↓`), **GitHub**
  (`→`), **LinkedIn** (`→`), **Email** (`→`). No caret/arrow indicator on the
  mark itself — the mark alone is the affordance. `aria-haspopup="true"`,
  `aria-expanded` reflects state, `aria-label="Open links menu"`.
- **"JD BRITT" wordmark** — now **scrolls to the top of the page** (smooth; from
  the detail route it returns to `home` first). It no longer opens the menu.

**Menu behavior / styling**: absolutely positioned under the mark, `min-width
190px`, `var(--bg)` ground, `1px var(--edge)` hairline border, square corners,
no shadow. Each item is a mono row (`12px`, `.06em`), `12px 16px` padding,
hairline divider between rows, label left + Unicode arrow right (`opacity .5`),
hover = faint gold wash (`rgba(201,164,94,.08)`) + text to `var(--text)`. Opens
on mark click, closes on item click or any outside click; suppressed-motion path
uses instant scroll.

**State**: add `menuOpen: boolean`. Handlers — `toggleMenu` (mark), `closeMenu`
(items + outside click), `goTop` (wordmark). A document-level click listener
closes the menu when the click is outside the trigger and outside any link.

These four links are the same primary exits repeated in the Hero and Contact
sections — wire all three to the same destinations.

## Update: nav mark = menu, wordmark = scroll-to-top (2026.07)
Refinement of the above. The mark and wordmark are now cleanly separated with no
caret indicator:

- **Waveform mark (`MarkSpike`, 22px)** — the sole menu trigger. No `▾` caret;
  the mark alone is the affordance.
- **"JD BRITT" wordmark** — scrolls to the top of the page (smooth; returns to
  `home` first from the detail route). Does **not** open the menu.

## Update: hero morph section removed (2026.07)
The standalone hero-morph section (the reserved 1:1 animated-schematic slot that
sat between Hero and Background) has been **removed** at JD's request — he'll add
a morph animation back later only if he decides to use one. The Hero now flows
directly into Background. The morph-related JS (`_playMorph`, the `[data-morph]`
IntersectionObserver in `_setup`) is now inert (no matching element) and can be
deleted in production, or left as the mount hook if the morph returns.
