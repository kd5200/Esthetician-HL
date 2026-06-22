---
description: Hajime Lente — stack, paths, CI contract
tags: [project, overview]
globs: []
alwaysApply: false
---

# Hajime Lente Skin Studio

Single-page marketing site for a licensed esthetician. React + Vite + Framer Motion.

## Stack

- **Runtime:** Node 20+
- **Framework:** React 19, Vite 6
- **Animation:** Framer Motion
- **Styles:** `styles.css` (CSS variables, no CSS-in-JS)
- **CI:** GitHub Actions — `npm run build`

## Canonical paths

| Path | Role |
|------|------|
| `src/App.jsx` | Page content, services, contact |
| `src/components/` | HeroBanner, Motion*, SiteChrome |
| `styles.css` | Global styles and palette |
| `images/`, `videos/` | Static assets |
| `specs/active/` | In-flight specs |
| `artifacts/` | Generated screenshots/exports (gitignored) |

## Commands

```bash
npm run dev
npm run build
```

Full guide: [AGENTS.md](../../AGENTS.md)
