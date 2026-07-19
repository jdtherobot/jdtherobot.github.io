# Career Plan — Financial Planner

A deterministic 50-year career-path financial planner that runs **entirely in
your browser**. The Python projection engine executes client-side via Pyodide —
there is no backend and no account, and anything you enter stays in your own
browser (IndexedDB) and never leaves your device.

**Live app: [britt.gg/career-plan-app](https://britt.gg/career-plan-app/)**

## What it does

Compare composable life paths — stay to military retirement → PhD → research ·
separate → tech · separate → gap → PhD, or anything you assemble yourself. The
planner works at month-level resolution: you build a path by stacking career
segments in any sequence, and the engine projects the full financial arc.

- **Composable month-level path builder** — assemble any sequence of career
  segments and see the projection update deterministically.
- **Full retirement lifecycle** — High-3 pension, a 36-month GI Bill ledger,
  Social Security with claim-age factors, RMDs, Medicare at 65, and
  account-level drawdown.
- **Researched cost-of-living reference data** — locked reference catalogs with
  sources, so location assumptions are grounded rather than guessed.
- **100+ passing tests** — unit, golden-master, and parity-contract suites keep
  the projection engine's output stable and reproducible.

## Try it with your own data

The public build ships a **sanitized demo profile** with a rank / TAFMS /
location service-profile picker, so you can explore realistic projections
without entering anything personal. Your edits stay in your browser and can be
backed up or restored as JSON from the Export screen.

To run it locally with your own numbers, clone the repo and start the dev
server:

```bash
git clone https://github.com/jdtherobot/career-plan-app
cd career-plan-app/web && npm install && npm run dev
# open http://localhost:5173
```

Everything still runs client-side — nothing you enter locally is uploaded
anywhere.

---

Deterministic planning estimate with simplified effective-rate taxes — not
financial advice.
