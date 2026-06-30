# Infrastructure runbook — current status

**Last checked:** 2026-06-29  
**AWS account:** `810044337112`  
**Blocker:** CloudFront permissions on current IAM user

---

## Progress

| Step | Status | Notes |
|------|--------|-------|
| Terraform code in repo | ✅ Done | `infra/terraform/` |
| CI workflow (`ci.yml`) | ✅ Done | build on PR/push |
| Deploy workflow (`deploy.yml`) | ✅ Done | not committed/pushed yet |
| S3 bucket | ✅ Live | `hajime-lente-skin-studio-prod` |
| GitHub OIDC provider | ✅ Live | account-level |
| GitHub deploy role (shell) | ✅ Live | needs policy after CloudFront |
| CloudFront distribution | ❌ Blocked | IAM: `cloudfront:CreateOriginAccessControl` |
| S3 bucket policy | ❌ Pending | depends on CloudFront |
| IAM deploy role policy | ❌ Pending | depends on CloudFront |
| GitHub secrets | ❌ Not set | need CloudFront ID first |
| First deploy to prod | ❌ Not done | |
| Custom domain | ⏸ Optional | later |

**Site is not live yet** — bucket exists but is empty; no CDN URL.

---

## Step 1 — Create dedicated Terraform IAM user

Do **not** use `read-aloud-studio-dev` (another project; lacks CloudFront).

```bash
# Run with an admin AWS profile
aws iam create-user --user-name hajime-lente-terraform

aws iam put-user-policy \
  --user-name hajime-lente-terraform \
  --policy-name HajimeLenteTerraformBootstrap \
  --policy-document file://infra/iam/bootstrap-policy.json

aws iam create-access-key --user-name hajime-lente-terraform
```

Configure locally:

```bash
aws configure --profile hajime-lente
export AWS_PROFILE=hajime-lente
aws sts get-caller-identity   # should show hajime-lente-terraform
```

Policy file: [`infra/iam/bootstrap-policy.json`](../infra/iam/bootstrap-policy.json)

---

## Step 2 — Finish Terraform

```bash
cd infra/terraform
terraform plan    # should show 4 resources to add
terraform apply
```

Expected new resources:
- CloudFront Origin Access Control
- CloudFront distribution
- S3 bucket policy
- IAM deploy role policy

Save outputs:

```bash
terraform output site_url
terraform output -raw github_deploy_role_arn
terraform output -raw s3_bucket_name
terraform output -raw cloudfront_distribution_id
```

---

## Step 3 — Commit & push infra to GitHub

Infra files are local only today. Before deploy workflow can run from GitHub:

```bash
git add infra/ .github/workflows/deploy.yml docs/infrastructure.md docs/infra-runbook.md specs/
git commit -m "Add AWS static hosting infrastructure and deploy workflow"
git push origin main
```

(Product/site changes can be a separate commit later.)

---

## Step 4 — GitHub repository secrets

Repo → **Settings → Secrets and variables → Actions**

| Secret | Value |
|--------|-------|
| `AWS_DEPLOY_ROLE_ARN` | `terraform output -raw github_deploy_role_arn` |
| `AWS_S3_BUCKET` | `hajime-lente-skin-studio-prod` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | from terraform output |

Optional later: `VITE_BOOKING_URL`, `VITE_CONTACT_WEBHOOK_URL`, `VITE_BOOKING_DEPOSIT_PERCENT`

---

## Step 5 — Deploy

**Option A:** Push to `main` (triggers `deploy.yml`)

**Option B:** GitHub → Actions → **Deploy** → Run workflow

**Option C:** Manual smoke test before CI:

```bash
npm run build
aws s3 sync dist/ s3://hajime-lente-skin-studio-prod --delete --profile hajime-lente
aws cloudfront create-invalidation --distribution-id YOUR_ID --paths "/*"
```

Visit `terraform output site_url`.

---

## Step 6 — Custom domain (optional, later)

1. ACM certificate in **us-east-1**
2. Edit `infra/terraform/terraform.tfvars`:
   ```hcl
   domain_names        = ["yourdomain.com"]
   acm_certificate_arn = "arn:aws:acm:us-east-1:810044337112:certificate/..."
   ```
3. `terraform apply`
4. DNS ALIAS → CloudFront

---

## Troubleshooting

### CloudFront 403 on apply
Current user lacks CloudFront permissions. Use `hajime-lente-terraform` (Step 1).

### OIDC provider already exists
Already created in this account — no action needed.

### Deploy workflow fails at AWS credentials
- Confirm all 3 GitHub secrets are set
- Repo must be `kd5200/Esthetician-HL` (matches `github_repository` in terraform)

### Site shows old content
CloudFront cache — invalidation runs automatically in deploy workflow

---

## After infra is live

- [ ] Confirm site loads at CloudFront URL
- [ ] Archive spec to `specs/archived/`
- [ ] Resume product/content work in separate commits
