# Phase 07: Final Visual Audit, Regression, and Completion Report

## ZFlow Context

**Phase purpose:** DET-UX-006, DET-VAL-003, DET-NFR-001, DET-EDGE-004, final zflow REGRESS + COMPLETE gate.

## Overview

Run the final audit after implementation and tests. Capture evidence for every page at required desktop widths, compare to design screenshots, document deviations, rerun regression checks, and produce a final compliance report.

## Tasks

1. **Final screenshot capture.**
   - Start Next.js app locally.
   - Capture screenshots for all public routes at 1440px and 1920px.
   - Capture screenshots for all CMS routes at 1440px and 1920px after authenticated setup.
   - Store output under `plans/04-detail-definition-impl/audit/final-screenshots/`.

2. **Manual visual comparison.**
   - Compare app screenshots with `.design/**/screen.png`.
   - Record each page as PASS / PASS-WITH-DEVIATIONS / FAIL.
   - Any material mismatch must be fixed or explicitly accepted (DET-EDGE-004).

3. **Accessibility spot audit.**
   - Keyboard navigation for public nav, public forms, login form, admin nav.
   - Focus states visible/design-equivalent.
   - Form labels and validation association present.

4. **Regression checks.**
   - `pnpm type-check`.
   - `pnpm build`.
   - Playwright E2E.
   - Security grep: `dangerouslySetInnerHTML`, Tailwind CDN, hardcoded Supabase secrets.

5. **Separate verifier final audit.**
   - Use `code-reviewer` agent for final review.
   - Use `security-reviewer` agent for auth/submission/privacy review.
   - Use `a11y-architect` agent for accessibility review.
   - Use `e2e-runner` agent for critical journey verification.

6. **Final compliance report.**
   - Summarize DET coverage.
   - Summarize visual evidence.
   - Summarize tests and checks.
   - Summarize deviations and accepted exceptions.
   - Mark incomplete items clearly; no hidden gaps.

## Acceptance Criteria

- [ ] Every implemented page has 1440px and 1920px screenshot evidence.
- [ ] Every visual mismatch is fixed or explicitly recorded.
- [ ] Public form, login, admin auth, admin navigation critical journeys verified.
- [ ] Type-check, build, and E2E pass or blocking failures are documented.
- [ ] Separate verifier agents were used.
- [ ] Final compliance report maps every DET-* item to PASS / PARTIAL / FAIL.
- [ ] No TODO/TBD remains in delivered output.

## Outputs

- `plans/04-detail-definition-impl/audit/final-screenshots/`
- `plans/04-detail-definition-impl/audit/visual-audit.md`
- `plans/04-detail-definition-impl/audit/security-audit.md`
- `plans/04-detail-definition-impl/audit/accessibility-audit.md`
- `plans/04-detail-definition-impl/audit/final-report.md`

## DET Traceability

DET-UX-006, DET-VAL-003, DET-NFR-001, DET-EDGE-004, DET-TEST-001, DET-TEST-002, DET-TEST-003, DET-TEST-004, DET-TEST-005
