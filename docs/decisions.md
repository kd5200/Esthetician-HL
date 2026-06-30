# Decisions

Significant decisions, newest first.

## Template

```markdown
### YYYY-MM-DD — Title

**Decision:** …
**Why:** …
```

---

### 2026-06-22 — AWS static hosting

**Decision:** S3 + CloudFront via Terraform; GitHub Actions OIDC deploy (no
long-lived AWS keys). No Lambda/API Gateway until contact webhook is spec'd.

**Why:** Matches site complexity — static assets only, optional external webhook.

---

### 2026-06-22 — Lean agentic delivery layout

**Decision:** Adopt jarvis-capital-style folders (AGENTS.md, specs/, docs/, CI)
but keep it minimal — no test matrix, no domain skills, no lint pipeline yet.

**Why:** Single-page marketing site; at most a contact webhook. Agents need
structure without trading-system overhead.
