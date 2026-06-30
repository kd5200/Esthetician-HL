# AWS static hosting

## Problem

The marketing site needs production hosting. AWS is the target platform — lean
static delivery without over-engineering.

## Scope

- Terraform: S3 + CloudFront + GitHub OIDC deploy role
- GitHub Actions deploy workflow (build → S3 sync → CloudFront invalidation)
- Documentation in `infra/` and `docs/infrastructure.md`

## Acceptance criteria

- [x] `infra/terraform/` provisions S3, CloudFront, IAM deploy role
- [x] `deploy.yml` deploys on push to `main` when secrets are set
- [ ] `terraform apply` completes in AWS account (**blocked: CloudFront IAM**)
- [ ] Infra committed and pushed to GitHub
- [ ] GitHub secrets configured from terraform outputs
- [ ] First successful deploy to CloudFront URL
- [ ] Custom domain wired (optional — when domain + ACM cert ready)

## Current blocker (2026-06-29)

`read-aloud-studio-dev` cannot create CloudFront resources. Create
`hajime-lente-terraform` IAM user with `infra/iam/bootstrap-policy.json`, then
re-run `terraform apply`.

See [docs/infra-runbook.md](../../docs/infra-runbook.md) for step-by-step.

## Out of scope

- VPC, ECS, RDS, or any always-on compute
- Contact form Lambda/API Gateway (future spec if needed)
- Route 53 / DNS automation (document manual steps only)

## References

- [infra/README.md](../../infra/README.md)
- [docs/infrastructure.md](../../docs/infrastructure.md)
- [docs/infra-runbook.md](../../docs/infra-runbook.md)
