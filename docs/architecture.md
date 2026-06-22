# Architecture

Single-page React SPA served by Vite. No backend — optional contact webhook only.

## Structure

```
index.html → src/main.jsx → App.jsx
                              ├── HeroBanner (video collage)
                              ├── MotionReveal / MotionStagger (scroll animations)
                              └── SiteChrome (header, footer, contact form stub)
styles.css   ← global styles, CSS variables
```

## Key files

| File | Role |
|------|------|
| `src/App.jsx` | Services array, about/tips sections, contact data |
| `src/components/HeroBanner.jsx` | Auto-cycling hero clips |
| `src/components/SiteChrome.jsx` | Nav, footer, contact form (client-side stub) |
| `src/motion/presets.js` | Shared Framer Motion variants |
| `styles.css` | Blush/cream palette, responsive layout |

## Assets

- `images/` — SVG placeholders (also under `public/images/`)
- `videos/` — hero collage MP4s (also under `public/videos/`)

## Future: contact webhook

When wired, form POST goes to `VITE_CONTACT_WEBHOOK_URL` (Formspree, Netlify, etc.).
See `.env.example`.
