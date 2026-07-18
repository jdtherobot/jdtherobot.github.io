# Britt.gg isolated redesign prototype

This prototype lives only on the local branch `experiment/full-site-redesign`. It is not merged into `main` and is not deployed to Britt.gg.

## Open locally

From the repository root, run:

```bash
python3 -m http.server 8080 --directory prototype-redesign
```

Then visit:

```text
http://127.0.0.1:8080/
```

The page is plain HTML and CSS with no package installation or build step.

## Return to the production branch

After stopping the local server with `Ctrl+C`, run:

```bash
git switch main
```

The production application is unchanged. The experimental branch is not merged or deployed.

## Optional remote branch later

If you decide to preserve the experiment on GitHub without merging it, run:

```bash
git push -u origin experiment/full-site-redesign
```

The repository's current Pages workflow deploys only pushes to `main`, so pushing this branch alone does not publish it to Britt.gg. A separate non-production preview service would still need to be configured intentionally.
