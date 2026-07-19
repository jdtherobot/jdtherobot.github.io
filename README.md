# britt.gg — JD Britt

Personal landing page for JD Britt — full-time U.S. Air Force IT professional,
full-time CS undergrad — built on the **Cybernetic Premium** design system
(bone/cream + material gold + carbon fibre; Rajdhani / Space Grotesk / JetBrains
Mono). Live at **https://britt.gg**.

## Stack

- **React + Vite + TypeScript**, no runtime UI libraries.
- **react-router-dom** — a single-scroll landing page plus a detail page per
  project at `/:section/:slug`.
- Design system re-authored from the handoff bundle as TSX components
  (`src/components/`) consuming the token CSS in `src/styles/`
  (`colors/typography/spacing/fonts.css`, copied verbatim from the design
  system).
- Deployed to **GitHub Pages via GitHub Actions** (`.github/workflows/deploy.yml`).

## Local development

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## Deploy

Push to `main` → the Actions workflow builds and publishes `dist/` to Pages.

- **Custom domain:** `public/CNAME` contains `britt.gg`. It lives in `public/`
  so Vite copies it verbatim into `dist/` on every build — the custom domain can
  never be dropped by the build. Do not move or delete it.
- `public/.nojekyll` disables Jekyll processing.
- `public/404.html` is an SPA fallback so deep links (e.g.
  `/challenges/warehouse-scavenger-hunt`) resolve on refresh.

## Sections

Nav: **Background · Research Direction · Work · Projects**.

- **Work** (`src/content/work.ts`) — a 12-year career as a scroll of
  accomplishments plus an awards list; the section title links to the full
  career résumé at `/career` (distinct from the standard résumé).
- **Projects** — the "puzzle" challenges (`src/content/items.ts`, detail pages at
  `/challenges/<slug>`) plus code projects (`src/content/projects.ts`). Each code
  project links to `/projects/<slug>`, which renders the repo's README(s), themed
  like a GitHub/JetBrains preview. READMEs are **baked locally** under
  `src/content/readmes/<slug>/` so the site works regardless of repo visibility;
  a repo with multiple docs shows them as clickable preview boxes.

## Editing content

- Challenges → `src/content/items.ts`
- Work accomplishments + awards → `src/content/work.ts`
- Code projects (repos, tags, doc list) → `src/content/projects.ts`; refresh the
  baked markdown by re-fetching into `src/content/readmes/<slug>/`
- Primary links (Résumé / GitHub / LinkedIn / Email) → `src/content/links.ts`

Copy and imagery are **placeholder** (bracketed `[…]` text; reserved carbon-frame
figure slots) pending real content.

## Notes

- **Day is the canonical theme**; a Day/Night toggle persists to
  `localStorage['jdb-mode']`. Gold is a material (fills/traces/rules/mark/large
  numerals) — never small ink.
- **The SVG schematic assets** shipped in earlier design bundles (brain, IC
  package, 1984 Macintosh, prosthetic arm, head) were **intentionally dropped**
  from this build at JD's request. Figure slots are reserved empty carbon frames;
  real screenshots go in later. No stock or third-party product photography.
- Custom email on `britt.gg` (via Tuta) is a separate, owner-only task and is not
  part of this repo.

## Reference

`design_handoff_landing_page 3/` holds the original design handoff (prototype +
offline design-system bundle). It is reference only and is excluded from the
built site.
