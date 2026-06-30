# Deployment

Static site — deploy the `dist/` folder after `npm run build`.

## AWS (primary)

Infrastructure is defined in [`infra/terraform/`](../infra/terraform/). See
[docs/infrastructure.md](infrastructure.md) for the full runbook.

**Summary:**

```bash
cd infra/terraform && terraform apply
# Set GitHub secrets from terraform output (see infra/README.md)
# Push to main → auto-deploy, or run Deploy workflow manually
```

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Host | S3 + CloudFront |

## Alternative hosts

Netlify, Vercel, and Cloudflare Pages also work if you skip AWS:

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
- [ ] AWS: `terraform apply` + GitHub secrets configured

## Env vars (optional)

Set in GitHub secrets or host dashboard if using a contact webhook:

```
VITE_CONTACT_WEBHOOK_URL=https://...
```

Vite inlines `VITE_*` vars at build time.
