# Phase 01 — Intake and Baseline

## Objective
Establish the approved source of truth, current implementation baseline, and non-negotiable exclusions before any code changes.

## Inputs
- Source TIP: `coding-packs/tips/TIP-027-jobs-qc-non-color-image-mockdata-fixes.md`
- QC report: `.qc/ui/jobs/qc-report.md`
- Visual mismatch JSON: `.qc/ui/jobs/visual-mismatches.json`
- Computed CSS diff: `.qc/ui/jobs/computed-style-diff.json`
- A11y results: `.qc/ui/jobs/a11y-results.json`
- Design HTML: `.design/recruitment_site/tim_kiem_cong_viec_fabbi_final_precision/code.html`
- Rendered route: `http://localhost:3000/vi/jobs`

## [CORE] Required Reads
1. `app/[locale]/jobs/page.tsx`
2. `app/(public)/jobs/page.tsx`
3. `components/public/JobCard.tsx`
4. `components/public/JobsSearch.tsx`
5. `components/public/PublicHeader.tsx`
6. `components/public/PublicFooter.tsx`
7. `lib/i18n/vi.json`
8. `lib/i18n/ja.json`
9. `lib/mock-data.ts` — read only; do not change records.

## [DECISION] Scope Boundaries
In scope:
- Correct actual jobs route target for implementation and verification.
- Convert filter links to checkbox-style controls.
- Rework jobs listing card structure and spacing.
- Add lower photo/category section shell using existing assets only.
- Add location card section using existing job/location data or local static labels.
- Add accessible fixed floating bell control.
- Fix unnamed links and keyboard/accessibility issues not caused solely by excluded pink contrast.

Out of scope:
- COLOR PINK changes.
- Image asset replacements or image mapping changes.
- Mock data/seed data/content record edits.
- Database/repository behavior changes.
- Legacy `ung_tuyen` route changes.

## Baseline Evidence Tasks
1. Confirm `/vi/jobs` renders before edits.
2. Capture or preserve current screenshots from `.qc/ui/jobs/screenshots`.
3. Record current failing QC categories in `.zflow/coverage-matrix.md`.
4. Confirm whether `JobCard` is reused by job detail/related jobs before choosing variant strategy.

## Quality Gate
- [ ] All source artifacts read.
- [ ] Exclusion list copied into implementation notes.
- [ ] Current route and component ownership understood.
- [ ] No functional code changed in this phase.
