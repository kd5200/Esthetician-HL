# Assets guide

Drop Hajime's photos and videos here, then update paths in `src/assets.js` if filenames differ.

## Folder structure

```
images/
  photos/
    hero-glow.jpg          ← hero carousel posters (one per clip)
    hero-closeup.jpg
    hero-treatment.jpg
    hero-relax.jpg
    about.jpg              ← about section
    services/
      signature.jpg
      dermaplaning.jpg
      nano-needling.jpg
      chemical-peel.jpg
      back-facial.jpg

videos/
  collage-glow.mp4              ← hero carousel (landscape)
  collage-face-closeup.mp4
  collage-treatment.mp4
  collage-relax.mp4
  01519bcaf4d84c3aaded60e074f0c29b.mov   ← studio carousel (about)
  bbae932e045642e7becd1cfbfe6cba9d.mov   ← studio carousel (clip 2)
  94126bf612ec4916b80caf9d7947bd7f.mov   ← studio carousel
  2ee9194f58604ad6ae01bc60541d2dc7.mov   ← studio carousel
```

Files in `images/` and `videos/` are served at `/images/...` and `/videos/...`.

## Recommended specs (keeps the site fast)

| Asset | Format | Max size | Notes |
|-------|--------|----------|-------|
| Hero posters | JPG/WebP | ~200 KB each | 1600×900+, quality 80 |
| Hero videos | MP4 (H.264) | **≤ 2 MB each** | 720p–1080p landscape (16:9), 10–15 sec loops |
| Service photos | JPG/WebP | ~150 KB | 800×600 |
| About photo | JPG/WebP | ~250 KB | Portrait, 4:5 ratio |

Compress before adding:
- Photos: [Squoosh](https://squoosh.app) or `imageoptim`
- Video: [HandBrake](https://handbrake.fr) — 720p–1080p landscape, RF 28–32

When Hajime's real clips are ready, update `CLIPS` in `src/components/HeroBanner.jsx` for the hero, and `ASSETS.studio.clips` in `src/assets.js` for the about carousel.

## After adding files

1. Update `src/assets.js` if your filenames differ
2. `npm run build` locally to verify
3. Push to `main` — deploy workflow uploads to S3 automatically

SVG placeholders remain as fallbacks until real photos exist.
