# TIP-007: Verification and Regression

**Agent:** QA/verifier coordinator
**Model:** opus
**File ownership:** `.zflow/verify-report.md`, `.zflow/final-report.md`, `.zflow/evolve-report.md`, test updates not owned by earlier TIPs
**Blocked by:** tip-001-strapi-contract-docs, tip-002-strapi-core-client, tip-003-strapi-repositories, tip-004-data-source-switch, tip-005-api-public-routes, tip-006-admin-applications-cv
**Acceptance criteria:**
- [ ] Red Gate status is documented.
- [ ] Green Gate status is documented.
- [ ] Build/type/lint/test checks are recorded.
- [ ] Separate code review and security review findings are recorded.
- [ ] Visual smoke evidence for affected pages is recorded or blockers are explicit.
- [ ] Final report maps every acceptance criterion to evidence.

## Context
[GREEN] This TIP does not implement new functionality except test/report adjustments required to complete verification.

## Implementation Notes
Use separate verifier agent. Do not self-verify final correctness.
