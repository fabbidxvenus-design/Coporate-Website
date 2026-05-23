# TIP-006: QA, Security, Visual Evidence, and Final Report

**Agent:** e2e-runner + security-reviewer + a11y-architect + code-reviewer
**Model:** opus
**File ownership:** `tests/**`, `playwright.config.ts`, `plans/04-detail-definition-impl/audit/**`, review reports
**Blocked by:** TIP-002, TIP-003, TIP-004, TIP-005

## Acceptance Criteria

- [ ] Public route/page coverage exists for `.design/recruitment_site`.
- [ ] Public form tests cover required validation failure, successful submission, and Supabase/API failure.
- [ ] CMS auth tests cover direct unauthenticated access, failed login, successful login, and logout/session expiry.
- [ ] CMS route/page coverage exists for `.design/cms_site`.
- [ ] Screenshots are captured or manually inspected for every page at 1440px and 1920px.
- [ ] No unsafe wholesale HTML injection from design files.
- [ ] No production reliance on Tailwind CDN from design HTML.
- [ ] User input is validated before successful submission.
- [ ] Separate verifier agents complete code, security, accessibility, and E2E review.
- [ ] Final DD04 compliance report maps every DET-* item to PASS/PARTIAL/FAIL.

## Context

Covers DET-UX-006, DET-VAL-003, DET-NFR-001, DET-SEC-002, DET-TEST-001 through DET-TEST-005, DET-EDGE-004.
