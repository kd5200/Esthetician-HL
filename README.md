# Hajime Lente — Skin Studio

A single-page marketing website for **Hajime Lente**, Licensed Esthetician based in Fort Lauderdale, FL. Inspired by the layout/aesthetic of [skinprettyla.com](https://skinprettyla.com/) with a cinematic video collage hero like [Essential Aesthetics](https://essentialaestheticsfl.com/).

## What's inside

- `index.html` — Vite entry point
- `src/App.jsx` — page content with [Framer Motion](https://www.framer.com/motion/) scroll reveals
- `src/components/HeroBanner.jsx` — multi-clip video collage hero
- `src/components/MotionReveal.jsx` — reusable fade-up animation wrapper
- `styles.css` — responsive stylesheet (warm blush/cream palette, Cormorant Garamond + Inter)
- `images/` — SVG placeholders + hero poster
- `videos/` — hero collage clips (replace before launch)

## Run locally

**Important:** This site uses React + Framer Motion. It must be run through Vite — opening `index.html` directly or using `python -m http.server` will show a blank page.

```bash
npm install
npm run dev
```

Then open **http://localhost:5173** in your browser.

For a production-style preview after building:

```bash
npm run build
npm run preview
```

## Build for production

```bash
npm run build
npm run preview
```

Output goes to `dist/` — deploy that folder to Netlify, Vercel, Cloudflare Pages, etc.

## Customize

| What to change | Where |
| --- | --- |
| Service names, descriptions, prices | `src/App.jsx` → services array |
| Studio name / tagline / hero copy | `src/App.jsx` → hero + brand |
| Colors (blush, rose, ink, cream) | `styles.css` → `:root` variables |
| Hero collage clips | `src/components/HeroBanner.jsx` → `CLIPS` array + files in `videos/` |
| Scroll animation timing | `src/components/MotionReveal.jsx` |
| Hero panel entrance | `src/components/HeroBanner.jsx` → `panelVariants` |
| Other photos | Replace SVG placeholders in `images/` |
| Contact details | `src/App.jsx` → contact list + footer |

### Hero video carousel

The hero **auto-cycles through four spa clips** with a crossfade (Framer Motion), subtle Ken Burns zoom, dot navigation, and prev/next arrows on hover. Clips pause when you hover the banner or switch browser tabs.

| File | Content |
| --- | --- |
| `videos/collage-glow.mp4` | Facial massage |
| `videos/collage-face-closeup.mp4` | Glowing face close-up |
| `videos/collage-treatment.mp4` | Facial treatment |
| `videos/collage-relax.mp4` | Relaxing spa facial |

To swap clips, replace the files above and update paths in `src/components/HeroBanner.jsx` → `CLIPS` array. Slide timing is controlled by `SLIDE_DURATION_MS` (default 7 seconds).

Placeholder clips are from [Mixkit](https://mixkit.co/) — replace with your own licensed footage before going live.

### Hooking up the contact form

The form shows a friendly success message client-side only. To send emails, wire up Formspree, Netlify Forms, or FormSubmit in `src/App.jsx` → `useSiteChrome()`.

## Deploy

**Netlify / Vercel / Cloudflare Pages:**

- Build command: `npm run build`
- Output directory: `dist`

## Content sourced from

- Hajime's resume (services: customized facials, back facials, waxing, brow services; trained at Aveda Clinic)
- Contact: Fort Lauderdale, FL 33308 · (337) 378-2049 · Hajimel@icloud.com

Update copy, prices, and policy pages with Hajime before going live.
