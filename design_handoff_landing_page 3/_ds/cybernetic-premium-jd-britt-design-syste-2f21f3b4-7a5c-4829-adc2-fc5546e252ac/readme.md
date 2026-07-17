# Cybernetic Premium — JD Britt Design System

**Cybernetic Premium** is the PRIMARY visual register of JD Britt's personal brand — a researcher / systems-engineer portfolio at the intersection of **neuroscience, embedded hardware, and machine learning**. The homepage, about, résumé, and most pages use this system. Two sibling registers (*Cassette Futurism*, *Field-Worn*) exist for occasional project subpages and share the connective tissue documented below; they are **not** built out in this project.

**Audience:** PhD advisors and technical recruiters, equally — the design has to survive both. Credibility is the bar; personality is welcome but never at the expense of being taken seriously. Not cyberpunk-neon, not corporate-flat.

**Reference:** the ASUS ROG Flow Z13 × Kojima Productions edition — bone/cream + gold + black carbon fibre. Precision over decoration: laser-etched panel seams, a faint dot-grid, small stencilled equipment labels. Expensive because restrained, not because shiny.

---

## Sources

- **Reference implementation** — `02_CODE_drag_this_whole_folder/index.html` (single-file, read-only mount). A complete, heavily-commented build of the Cybernetic Premium homepage in both Day and Night modes. This design system is the factored, reusable extraction of it.
- **Provided brand assets** — `uploads/jdbritt-mark-spike.svg` (the mark), `uploads/jdbritt-waveform-trace.svg` (the signature motif). Copied into `assets/`.
- **Reference renders** — `uploads/cybernetic-DAY.png`, `cybernetic-NIGHT.png`, `cybernetic-MOBILE.png` (full-page captures of the reference site).
- **Mood / inspiration photography** — the ROG Flow Z13 product photos (`uploads/*.webp`, `uploads/hEF4JoFZMN533ETL6xdhvJ.jpg`). These are third-party product photography and are **inspiration only** — per the brand's imagery rule they are NOT shipped as brand assets.

---

## The one core rule — GOLD IS A MATERIAL, NOT AN INK

In the reference photos, gold is always a **surface** (the lid, the trim, a trace) and **never small text**. `--gold #C9A45E` on cream `#ECE2C6` measures **1.9:1** and is unreadable. So gold is confined to **fills, traces, rules, the mark, and LARGE numerals**. All small text is ink — dark on light grounds, bone on dark grounds. Focus rings use an ink (`--label-on-bg`), never gold. Headings **inherit** colour rather than binding a fixed token, or they go invisible on inverted cards. Internalise this before touching anything.

---

## CONTENT FUNDAMENTALS

How copy is written in this brand:

- **Register:** direct, professional, technical. Zero roleplay, zero "cyber" affect. Writes like a serious researcher, not a game UI. *All copy in the reference is PLACEHOLDER — tone-correct, not final; final wording comes in a later pass.*
- **Voice / person:** third-person or implied-first for the subject ("Systems engineer and researcher building the hardware-to-application stack…"), plain second-person for CTAs ("Download résumé", "View research"). No "I am a passionate…" bio clichés.
- **Casing:** headings and eyebrows are **UPPERCASE** (Rajdhani display / JetBrains Mono). Body copy is sentence case. Nav, tags, buttons, captions, stencils are mono and usually uppercase or Title Case.
- **Eyebrows** name the section in a few words: `RESEARCH FRAMEWORK`, `SELECTED WORK`, `GET IN TOUCH`. **Tags** are single words or short phrases: `Theory`, `Implementation`, `Application`.
- **Headlines** are short, declarative, often a system idea: "Three tiers, one stack", "Current focus", "Before the PhD".
- **Numbers** are concrete and credit-bearing: `$10M+`, `3.2K`, `8 YRS`, `CISSP`. In the reference these carry a "VERIFY BEFORE LAUNCH" note — treat metrics as claims to confirm.
- **Stencil metadata** is REAL: section IDs and revisions (`SEC.03 · REV 2026.07`), never decorative made-up strings.
- **Punctuation:** middot separators (`·`), directional arrows appended to actions (`View research →`, `Download résumé ↓`). Em dashes for asides.
- **No emoji.** Ever. Unicode is limited to arrows (→ ↓ ↑) and the middot.

---

## VISUAL FOUNDATIONS

- **Colour vibe:** two grounds that invert by mode — cream `#ECE2C6` and carbon `#17161A` — with material gold `#C9A45E` as the single accent. Warm, restrained, expensive. No second hue anywhere except a whisper of teal `#4a9a9a` that appears ONLY inside the Night glitch (chromatic split), never as a UI colour.
- **Two modes, chosen by content not visitor.** `data-mode="day|night"` on `<html>`. The page ground and card ground swap; gold stays constant; label inks swap. A visitor toggle exists as a comfort override (persists to localStorage, defaults from `prefers-color-scheme`) but the canonical theme of a page is set by its content.
- **Type:** three faces, no more. **Rajdhani** 600/700 for display/headings (UPPERCASE, tight tracking). **Space Grotesk** 400 for body (proportional — mono body undercuts the premium read). **JetBrains Mono** 400 for eyebrows, labels, data, stencil, nav, buttons. Eyebrows \~11px / .16em tracking.
- **Backgrounds:** a radial **dot-grid** (26px pitch, \~45% opacity) sits behind every page section. No photographic backgrounds, no gradients (decorative gradients are banned), no textures.
- **Cards:** carbon panel that inverts against the page; **1px `--edge` hairline border**; **square corners** (radius 0); **no shadow**. A **gold tier line** runs along the top edge; **laser-etched diagonal seams** fade across the top-left (masked to dissolve by \~42%); an optional **stencil** label sits bottom-right.
- **Tier lines** are one gold progression (never multi-hue category coding): `plain` (Theory) → `branch` (Implementation) → `dissolve` (Application).
- **Imagery:** project screenshots in a **carbon frame** (8px padding, 1px edge, 16:10, mono caption). No duotone, filter, or overlay — the frame does the brand work, the image stays honest.
- **Borders / radii / shadow:** hairline `--edge` borders everywhere; corners are square; the mode-toggle track (`--radius-pill 11px`) is the SOLE rounded element; **no drop shadows, inner shadows, or glows anywhere in the system.**
- **Buttons:** primary = material gold fill + carbon ink (7.8:1, both modes); secondary = ink outline (fills with ink ground on hover). Gold is never the ink.
- **Hover / press:** links and titles darken toward the label ink; the outline button inverts (ink ground, page-colour text); primary button dims slightly (opacity \~.88). No scale/bounce on press. Transitions are short and eased.
- **Motion:** headers/titles get a rare **ambient slice** (every 20–45s, \~400ms; Day = soft gold-tinted, Night = harder chromatic). Other text gets an **entrance "piano run"** (segments settle left→right, 26ms stagger) on scroll into view, re-firing only if out of view ≥8s AND a random roll passes. Images get very-rare ambient static that FADES (never strobes). Every- thing is suppressed under `prefers-reduced-motion`; nothing flashes faster than \~3Hz (clear of the 3–55Hz photosensitivity band). Split text keeps its accessible name via `aria-label`; segments are `aria-hidden`.
- **Layout:** `1040px` max content width, `32px` gutters, `72px` section rhythm, `20px` grid gaps. Sticky nav. Everything is orthogonal and grid-aligned.
- **No blur / transparency effects** beyond the seam/dot opacity and glitch backing.

### DO NOT ADD

No neon, no glow, no decorative gradients, no drop shadows, no scuffs/grit/wear textures, no rounded "feet" or protruding tabs, no glossy diagonal sheen, no mascot dots, no HUD corner brackets, no hexagon logo, no multi-hue tier coding. All tried and explicitly rejected. Restraint is the point.

---

## ICONOGRAPHY

This brand is **deliberately icon-light** — precision comes from type, rules, and the tier lines, not an icon set. Specifically:

- **The mark** is the waveform: `assets/mark-spike.svg` (square spike crop, for favicon / nav / 16px) and `assets/waveform-trace.svg` (the full signature motif). Both are pure gold polylines. These are the only true brand glyphs. Use `WaveTrace` / `MarkSpike` components.
- **No icon font, no icon library, no SVG icon set.** The reference ships none, so this system ships none. Do not introduce Lucide/Heroicons/etc. — an icon set would read as generic and break the restraint.
- **Directional arrows** (`→ ↓ ↑`) are Unicode glyphs typed directly into button/link copy — not icon components.
- **The tier lines and seams** are generated SVG/CSS motifs, not icons.
- **No emoji, ever.**

If a future surface genuinely needs functional glyphs (e.g. social links in a footer), add a thin-stroke set that matches the 1px hairline weight and FLAG the addition — do not reach for a heavy filled set.

---

## Components

Reusable React primitives, grouped by concern. Each is `Name.jsx` + `Name.d.ts` + `Name.prompt.md`, with a `@dsCard` thumbnail per directory. Mount via `window.CyberneticPremiumJDBrittDesignSystem_2f21f3`.

- **core/** — `Button` (primary / outline), `Tag` (metadata chip), `Eyebrow` (mono kicker)
- **brand/** — `WaveTrace` + `MarkSpike` (signature motif & mark), `TierLine` (plain / branch / dissolve)
- **surface/** — `Card` (carbon panel), `Figure` (carbon-framed imagery)
- **data/** — `Stat` (metric numeral + label), `NoteRow` (notes-index row), `ModeToggle` (day/night switch)

**Component skeleton — same order everywhere:** eyebrow → headline → body → tag → button.

---

## UI kit

- **ui_kits/portfolio/** — the JD Britt portfolio site. `index.html` is an interactive Day/Night homepage recreation composed from the components above (hero, research framework, selected work, lab notes, background stats, résumé/contact, footer). Screens: `HomePage.jsx`.

---

## SHARED CONNECTIVE TISSUE (across all three sibling registers)

- **Signature motif:** the neural waveform trace, recoloured per system, never redrawn — `viewBox="0 0 280 40"`, `points="0,20 40,20 48,6 56,34 64,20 120,20 128,10 136,20 180,20 188,4 196,36 204,20 280,20"`.
- **Mark:** a square crop of that trace's sharpest spike — same gesture, legible at 16px.
- **Component skeleton** in the same order everywhere: eyebrow → headline → body → tag → button.
- **`data-mode="day|night"`** is a persisted comfort toggle that respects `prefers-color-scheme`; the THEME is chosen by content, never by the visitor.
- **JetBrains Mono** is the shared label/data face across all three systems.

---

## Fonts

All three faces are **Google Fonts** — no substitution required. Loaded via `tokens/fonts.css` (`@import` of the Google Fonts CSS2 endpoint): Rajdhani, Space Grotesk, JetBrains Mono. If a future offline build needs self-hosted binaries, swap the `@import` for local `@font-face` rules and drop the files in `assets/fonts/`.

---

## Index / manifest (root)

- `styles.css` — global entry point (import list only). Consumers link this one file.
- `tokens/` — `fonts.css`, `colors.css` (Day/Night grounds + inks + material gold), `typography.css` (faces + scale), `spacing.css` (spacing / borders / motion).
- `components/` — `core/`, `brand/`, `surface/`, `data/` (see Components above).
- `guidelines/` — foundation specimen cards (Colors, Type, Spacing, Brand).
- `ui_kits/portfolio/` — the portfolio UI kit.
- `assets/` — `mark-spike.svg`, `waveform-trace.svg`.
- `thumbnail.html` — design-system homepage tile.
- `SKILL.md` — Agent-Skills-compatible entry point.
