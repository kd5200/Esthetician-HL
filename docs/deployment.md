# Deployment

Static site — deploy the `dist/` folder after `npm run build`.

## Hosts (any of these)

| Platform | Build command | Output dir |
|----------|---------------|------------|
| Netlify | `npm run build` | `dist` |
| Vercel | `npm run build` | `dist` |
| Cloudflare Pages | `npm run build` | `dist` |

## Pre-deploy checklist

- [ ] Replace placeholder hero videos with licensed footage
- [ ] Confirm copy, prices, and contact info in `src/App.jsx`
- [ ] `npm run build` passes locally
- [ ] Wire contact form if needed (see `.env.example`)

## Env vars (optional)

Set in the host dashboard if using a contact webhook:

```
VITE_CONTACT_WEBHOOK_URL=https://...
```

Vite inlines `VITE_*` vars at build time.
