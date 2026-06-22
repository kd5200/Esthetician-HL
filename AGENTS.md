# Agent guide — Hajime Lente Skin Studio

Lean agentic layout for a single-page marketing site. Read this before structural
or product changes.

## Layout

```
esthetician-hl/
  AGENTS.md              ← you are here
  README.md              ← human quick start
  .env.example           ← optional webhook / form URL (copy to .env)

  src/                   ← React app (do not change without explicit direction)
    App.jsx              ← copy, services, contact
    components/          ← HeroBanner, Motion*, SiteChrome
    motion/              ← animation presets
  styles.css             ← global styles + CSS variables
  index.html             ← Vite entry

  docs/                  ← architecture, deploy, decisions
  specs/active/          ← in-flight work (read before non-trivial changes)
  specs/archived/        ← done or rejected specs
  experiments/           ← copy/layout experiment notes
  artifacts/             ← screenshots, exports (gitignored)
  .github/workflows/     ← CI
  .cursor/rules/         ← agent conventions
```

## Agent workflow

1. **Spec first** — Non-trivial work (contact webhook, new sections, deploy changes)
   starts in `specs/active/`.
2. **Implement** — Keep diffs focused. Match existing React + CSS style.
3. **Verify** — `npm run build` must pass. Preview with `npm run dev`.
4. **Document** — Update `docs/` or `experiments/experiment-log.md` when relevant.
5. **Archive** — Move completed specs to `specs/archived/`.

## Commands

```bash
npm install
npm run dev          # http://localhost:5173
npm run build        # output → dist/
npm run preview      # serve dist/
```

## Constraints

- **Product logic**: Do not change `src/` unless explicitly directed.
- **Secrets**: Never commit `.env`, webhook URLs with tokens, or API keys.
- **Scope**: This is a static marketing site — at most a contact-form webhook.
- **Artifacts**: Put screenshots and exports in `artifacts/` (never commit).

## CI

`ci.yml` runs `npm ci && npm run build` on every push/PR to `main`.

## When unsure

- Architecture → [docs/architecture.md](docs/architecture.md)
- Deploy → [docs/deployment.md](docs/deployment.md)
- Decisions → [docs/decisions.md](docs/decisions.md)
