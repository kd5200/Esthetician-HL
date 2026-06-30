# AWS infrastructure

Static hosting for the marketing site: **S3 + CloudFront**, with optional
GitHub Actions deploy via OIDC.

## What gets created

| Resource | Purpose |
|----------|---------|
| S3 bucket | Private origin for `dist/` assets |
| CloudFront | HTTPS CDN in front of S3 |
| IAM OIDC + role | GitHub Actions deploy (no long-lived keys) |

No servers, no VPC, no database. Contact form webhooks stay external unless
you add a separate spec later.

## Prerequisites

- [Terraform](https://developer.hashicorp.com/terraform/install) >= 1.5
- AWS CLI configured (`aws configure` or env vars)
- A **dedicated IAM user** for running Terraform locally (recommended)

## IAM setup (recommended)

Use **two identities** — don't reuse a dev user from another project:

| Identity | Purpose | Keys? |
|----------|---------|-------|
| `hajime-lente-terraform` (IAM user) | Run `terraform apply` / `destroy` locally | Yes — access key on your machine only |
| `hajime-lente-skin-studio-prod-github-deploy` (IAM role) | GitHub Actions deploy via OIDC | No — created by Terraform |

### 1. Create the Terraform bootstrap user

In AWS Console → IAM → Users → Create user:

- **Name:** `hajime-lente-terraform`
- **Access:** Programmatic access (access key)
- **Policy:** Attach [iam/bootstrap-policy.json](iam/bootstrap-policy.json) as an inline or customer-managed policy

Or with an admin account:

```bash
aws iam create-user --user-name hajime-lente-terraform
aws iam put-user-policy \
  --user-name hajime-lente-terraform \
  --policy-name HajimeLenteTerraformBootstrap \
  --policy-document file://infra/iam/bootstrap-policy.json
aws iam create-access-key --user-name hajime-lente-terraform
```

### 2. Configure AWS CLI for this project

```bash
aws configure --profile hajime-lente
# paste access key + secret

export AWS_PROFILE=hajime-lente   # or set in your shell profile for this repo
```

Then run Terraform with that profile active.

### 3. GitHub deploy (no IAM user)

After `terraform apply`, GitHub uses **OIDC** to assume the deploy role — no AWS
keys in GitHub secrets (only the role ARN + bucket + distribution ID).

## First-time setup

```bash
cd infra/terraform
cp terraform.tfvars.example terraform.tfvars
# edit terraform.tfvars if needed

terraform init
terraform plan
terraform apply
```

Save the outputs:

```bash
terraform output site_url
terraform output github_deploy_role_arn
terraform output -raw s3_bucket_name
terraform output -raw cloudfront_distribution_id
```

## GitHub Actions deploy

After `terraform apply`, add these repository **secrets**:

| Secret | Value |
|--------|-------|
| `AWS_DEPLOY_ROLE_ARN` | `terraform output -raw github_deploy_role_arn` |
| `AWS_S3_BUCKET` | `terraform output -raw s3_bucket_name` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | `terraform output -raw cloudfront_distribution_id` |

Optional: `VITE_CONTACT_WEBHOOK_URL` for build-time form endpoint.

The [deploy workflow](../.github/workflows/deploy.yml) runs on push to `main`
and via manual dispatch. Until secrets are set, the deploy job will fail at the
AWS credentials step — CI (`ci.yml`) still passes independently.

### OIDC provider already exists?

If `terraform apply` errors on duplicate GitHub OIDC provider, either:

- Import the existing provider:
  `terraform import 'aws_iam_openid_connect_provider.github[0]' arn:aws:iam::ACCOUNT:oidc-provider/token.actions.githubusercontent.com`
- Or set `enable_github_deploy_role = false` and attach S3/CloudFront permissions
  to an existing role manually.

## Custom domain (optional)

1. Request an ACM certificate in **us-east-1** (required for CloudFront).
2. Validate via DNS.
3. Set `domain_names` and `acm_certificate_arn` in `terraform.tfvars`.
4. `terraform apply`
5. Point Route 53 (or your DNS) CNAME/ALIAS to the CloudFront domain.

## Remote state (recommended for teams)

Uncomment the `backend "s3"` block in `versions.tf` and create a dedicated
state bucket before the first `terraform init -migrate-state`.

## Tear down

```bash
cd infra/terraform
terraform destroy
```

Empty the S3 bucket first if destroy fails on non-empty bucket.

## Cost note

This stack is typically a few dollars/month at low traffic (S3 storage +
CloudFront egress). Price class is set to `PriceClass_100` (US/EU only).
