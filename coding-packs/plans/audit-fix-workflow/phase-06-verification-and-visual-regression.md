# Phase 06 — Verification and Visual Regression

## Goal

Prove the audit fixes satisfy requirements and do not regress the approved visual implementation.

## Requirement IDs

- `DET-UX-006`
- `DET-VAL-003`
- `DET-NFR-001`
- `DET-NFR-003`
- `DET-EDGE-004`
- `DET-TEST-001`
- `DET-TEST-002`
- `DET-TEST-003`
- `DET-TEST-004`
- `DET-TEST-005`

## Automated Checks

Run:

```bash
npm run type-check
npm run build
```

Run available tests after Phase 01 establishes the test command.

## Browser Checks

Verify at minimum:

- `/login`
- direct unauthenticated `/admin`
- authenticated admin dashboard
- `/admin/jobs`
- `/admin/news`
- `/admin/applications`
- `/admin/settings`
- `/apply`
- `/jobs`
- `/news`

## Visual Evidence

Capture or update screenshots for changed visible surfaces at:

- 1440px
- 1920px

Store evidence under:

- `plans/audit-fix-workflow/audit/screenshots/`

## Separate Reviewers

Run after implementation:

- `security-reviewer` for auth bypass, cookies/session, application submission privacy.
- `typescript-reviewer` for strict null checks and typed mock data.
- `code-reviewer` for maintainability and requirement alignment.
- `a11y-architect` if login/admin UI markup changes.

## Exit Criteria

- No CRITICAL/HIGH reviewer findings remain.
- Type-check and build pass.
- Tests for affected requirements pass.
- Visual evidence is recorded for changed surfaces.
- Final report records fixed findings, remaining risks, and requirement coverage.
