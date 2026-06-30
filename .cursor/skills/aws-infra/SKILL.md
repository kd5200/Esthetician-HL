---
name: aws-infra
description: >-
  Use when provisioning, changing, or deploying AWS infrastructure for this
  static site (Terraform, S3, CloudFront, GitHub OIDC deploy).
---

# Skill: AWS infrastructure

Use for Terraform changes and AWS deploy troubleshooting. Do not touch `src/`.

## Stack

S3 (private) → CloudFront (HTTPS) ← GitHub Actions OIDC deploy

## Common tasks

### Provision / update infra

```bash
cd infra/terraform
terraform plan
terraform apply
```

### Deploy site manually

```bash
npm run build
aws s3 sync dist/ s3://BUCKET --delete
aws cloudfront create-invalidation --distribution-id ID --paths "/*"
```

### After terraform apply

Set GitHub secrets: `AWS_DEPLOY_ROLE_ARN`, `AWS_S3_BUCKET`,
`AWS_CLOUDFRONT_DISTRIBUTION_ID`.

## Rules

- Keep infra lean — no VPC/ECS/RDS for this marketing site
- Contact webhook Lambda is a separate spec; don't add unless requested
- ACM certs for custom domains must be in **us-east-1**
- Never commit `terraform.tfvars` or AWS credentials

## References

- [infra/README.md](../../infra/README.md)
- [docs/infrastructure.md](../../docs/infrastructure.md)
