# GitHub CI/CD setup

Two workflows run on this repo:

| Workflow | Trigger | Purpose |
|----------|---------|---------|
| `ci.yml` | push + PR to `main` | `npm ci` + `npm run build` |
| `deploy.yml` | push to `main` + manual | build → S3 sync → CloudFront invalidation |

Deploy uses **AWS OIDC** — no long-lived AWS keys in GitHub.

---

## One-time: repository secrets

GitHub → **Esthetician-HL** → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

| Secret name | Value |
|-------------|-------|
| `AWS_DEPLOY_ROLE_ARN` | `arn:aws:iam::810044337112:role/hajime-lente-skin-studio-prod-github-deploy` |
| `AWS_S3_BUCKET` | `hajime-lente-skin-studio-prod` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | `E3BH1WXEBBVSWY` |

Optional (build-time env vars):

| Secret | Purpose |
|--------|---------|
| `VITE_BOOKING_URL` | Online booking link |
| `VITE_CONTACT_WEBHOOK_URL` | Contact form endpoint |
| `VITE_BOOKING_DEPOSIT_PERCENT` | e.g. `50` |
| `VITE_BOOKING_DEPOSIT_MINIMUM` | e.g. `10` |

---

## Optional: production environment

`deploy.yml` uses a `production` environment. To add approval gates:

1. Settings → **Environments** → **New environment** → `production`
2. Add required reviewers (optional)

If the environment doesn't exist, GitHub creates it automatically on first deploy.

---

## Verify

1. Set the 3 required secrets above
2. Push to `main` (or Actions → **Deploy** → **Run workflow**)
3. Open **https://d1e26rswx25971.cloudfront.net** after the workflow completes

---

## Troubleshooting

| Error | Fix |
|-------|-----|
| `Could not assume role` | Confirm secrets match table above; repo must be `kd5200/Esthetician-HL` |
| `Access Denied` on S3 sync | IAM deploy role policy — re-run `terraform apply` |
| Site still old | CloudFront cache — invalidation step should run; wait 1–2 min |
| CI passes, deploy fails | Missing one of the 3 AWS secrets |

Terraform outputs (refresh if infra changes):

```bash
cd infra/terraform && terraform output
```
