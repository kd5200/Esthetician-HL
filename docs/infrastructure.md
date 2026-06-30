# Infrastructure (AWS)

Static site hosting on AWS. No application servers.

## Architecture

```
GitHub Actions (deploy.yml)
        │  npm run build → dist/
        ▼
   S3 bucket (private)
        │
        ▼
   CloudFront (HTTPS CDN)
        │
        ▼
   Visitors
```

Optional later: API Gateway + Lambda for a contact-form webhook (not provisioned yet).

## Resources

| Component | Terraform file | Notes |
|-----------|----------------|-------|
| S3 bucket | `s3.tf` | Versioned, encrypted, no public access |
| CloudFront | `cloudfront.tf` | OAC to S3, SPA error fallback |
| GitHub OIDC role | `iam.tf` | Deploy without long-lived AWS keys |

## Quick start

**Status & step-by-step:** [infra-runbook.md](infra-runbook.md) ← start here

See [infra/README.md](../infra/README.md) for Terraform details.

After apply, set GitHub secrets:

| Secret | Source |
|--------|--------|
| `AWS_DEPLOY_ROLE_ARN` | `terraform output -raw github_deploy_role_arn` |
| `AWS_S3_BUCKET` | `terraform output -raw s3_bucket_name` |
| `AWS_CLOUDFRONT_DISTRIBUTION_ID` | `terraform output -raw cloudfront_distribution_id` |

Deploy: push to `main` or run **Deploy** workflow manually.

## Custom domain

1. ACM certificate in **us-east-1**
2. Set `domain_names` + `acm_certificate_arn` in `terraform.tfvars`
3. DNS ALIAS/CNAME → CloudFront distribution

## Related

- [deployment.md](deployment.md) — pre-deploy checklist
- [specs/active/2026-06-22-aws-static-hosting.md](../specs/active/2026-06-22-aws-static-hosting.md)
