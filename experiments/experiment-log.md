# Experiment log

Notes on copy, layout, or design experiments. One entry per try.

## Template

```markdown
### YYYY-MM-DD — Short title

**Change:** …
**Result:** …
**Decision:** keep | revert | iterate
```

---

### 2026-06-22 — AWS static hosting scaffold

**Change:** Added `infra/terraform/` (S3 + CloudFront + GitHub OIDC) and deploy workflow.

**Result:** Infra code ready; `terraform apply` not yet run in AWS account.

**Decision:** keep — proceed with AWS account setup when ready

---

### 2026-06-22 — Agentic delivery scaffold

**Change:** Added lean agentic layout (AGENTS.md, specs/, docs/, CI) without touching site logic.

**Result:** Scaffolding only; build unchanged.

**Decision:** keep
