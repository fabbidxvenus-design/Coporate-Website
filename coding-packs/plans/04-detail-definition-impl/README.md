# ZFlow Plan: 04-detail-definition-impl

## Overview
This plan-supervised zflow workflow tracks the implementation and audit of `.requirements/04-detail-definition.md`. It covers the full pixel-perfect build, form interaction, login/auth protection, CMS administration screens, accessibility, and visual QA testing.

## Plan Phases

| Phase File | Purpose | Traceability |
|---|---|---|
| `phase-01-intake-and-baseline.md` | Inventory designs, map to routes, establish baseline | Setup |
| `phase-02-public-pages.md` | Public static layout, tokens, typography, colors | DET-UX-001/002, DET-DATA-001/002, DET-STATE-001, DET-A11Y-001, DET-NFR-001/002/003, DET-UX-006, DET-VAL-003 |
| `phase-03-public-forms.md` | Job apply forms, Supabase submission, validation | DET-UX-003, DET-API-001, DET-DATA-003, DET-VAL-001, DET-STATE-002, DET-ERR-001, DET-A11Y-002, DET-SEC-002/003, DET-EDGE-002 |
| `phase-04-login-and-protection.md` | Supabase Auth login, middleware, CMS gate | DET-UX-004, DET-API-002, DET-DATA-004, DET-VAL-002, DET-STATE-003, DET-ERR-002, DET-SEC-001, DET-A11Y-003, DET-EDGE-001/003 |
| `phase-05-cms-pages.md` | Admin dashboard, lists, empty states, visual parity | DET-UX-005/006, DET-API-003, DET-STATE-004, DET-ERR-003, DET-A11Y-003, DET-VAL-003, DET-NFR-001 |
| `phase-06-tests-and-security-audit.md` | API, auth, visual route tests + Safe injection audit | DET-TEST-001..005, DET-SEC-001..003 |
| `phase-07-final-visual-audit-and-regression.md` | Final screenshots, visual comparison, compliance report | DET-UX-006, DET-VAL-003, DET-NFR-001, DET-EDGE-004, DET-TEST-001..005 |

## How to Execute

To run this plan step-by-step using zflow plan-supervised mode:

```bash
zflow: --plan plans/04-detail-definition-impl --phase phase-01-intake-and-baseline.md
zflow: --plan plans/04-detail-definition-impl --phase phase-02-public-pages.md
zflow: --plan plans/04-detail-definition-impl --phase phase-03-public-forms.md
zflow: --plan plans/04-detail-definition-impl --phase phase-04-login-and-protection.md
zflow: --plan plans/04-detail-definition-impl --phase phase-05-cms-pages.md
zflow: --plan plans/04-detail-definition-impl --phase phase-06-tests-and-security-audit.md
zflow: --plan plans/04-detail-definition-impl --phase phase-07-final-visual-audit-and-regression.md
```

## Mode Rules (ZFlow THOROUGH tier)

- **SPEC phase (RED Gate):** G/W/T behavioral specs must be generated before code.
- **EXECUTE phase (GREEN Gate):** Code is written to satisfy specs.
- **VERIFY phase:** Independent verification (separate agent) + manual screenshot inspection at 1440px/1920px.
- **No self-verification:** The agent writing code must not be the one validating the visual or test outcome.
