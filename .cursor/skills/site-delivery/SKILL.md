---
name: site-delivery
description: >-
  Use when updating content, wiring a contact webhook, building, or deploying
  this marketing site. Keeps changes scoped to a single-page React SPA.
---

# Skill: Site delivery

Use for content edits, optional webhook wiring, build verification, and deploy.

## Before changing the site

1. Confirm the user explicitly requested a product change.
2. Check `specs/active/` for an existing spec; create one for non-trivial work.

## Content edits

| What | Where |
|------|-------|
| Services, prices, copy | `src/App.jsx` |
| Colors, typography | `styles.css` → `:root` |
| Hero videos | `src/components/HeroBanner.jsx` + `videos/` |
| Contact info | `src/App.jsx` → contact + footer |

## Contact webhook (when requested)

- Add `VITE_CONTACT_WEBHOOK_URL` to `.env` (see `.env.example`)
- POST form data from `useSiteChrome()` in `SiteChrome.jsx`
- Never commit the URL with tokens — use env vars only

## Verify

```bash
npm run build
npm run preview   # optional smoke check
```

## Deploy

- Build: `npm run build`
- Output: `dist/`
- See [docs/deployment.md](../../docs/deployment.md)
