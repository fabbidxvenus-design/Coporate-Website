# phase-02-implementation-green — EXECUTE [GREEN]

## [CORE] Objective
Implement the TIP-026 non-color/image/mockdata fixes until Red Gate tests pass.

## [CORE] File Ownership
Allowed primary files:
- `app/(public)/jobs/[slug]/page.tsx`
- `components/public/RelatedJobs.tsx`
- `components/public/JobSidebar.tsx`

Allowed optional files:
- `lib/i18n/vi.json`
- `lib/i18n/ja.json`
- `tests/audit/job-detail-qc-non-excluded.spec.ts`

Forbidden unless user explicitly expands scope:
- `lib/mock-data.ts`
- `app/globals.css`
- `tailwind.config.ts`
- `public/**` image/media files
- `.design/**`
- database migrations/seeds/schema files

## [TASK] Implementation Steps
1. Read `coding-packs/tips/TIP-026-job-detail-qc-non-color-image-mockdata-fixes.md` completely.
2. Read `.qc/ui/job-details/qc-report.md`, `browser-qc.json`, and `computed-style-diff.json`.
3. Add accessible names to icon-only share controls without changing visible colors or action behavior.
4. Fix related-jobs list semantics using native `<ul>/<li>` or equivalent valid role structure.
5. Expand `RelatedJobs` to full card structure using only available related job fields.
6. Improve `JobSidebar` row ordering/grouping using existing job fields only.
7. Adjust top apply CTA non-color shape/radius/layout only.
8. Fix heading-order warning while preserving visual styling and visible content.
9. Run Red Gate tests until they pass.

## [GREEN] Gate
- [ ] TIP-026 spec tests pass.
- [ ] `npm run type-check` passes.
- [ ] No forbidden file scope changes.
- [ ] No color/image/mockdata changes were introduced.

## [GAP] Execution Gap Recording
If any TIP-026 requirement cannot be implemented without changing excluded scope, record it in `.zflow/execution-gaps.md` with:
- requirement id or AC id
- blocker
- why it intersects COLOR, IMAGE, or MOCKDATA
- recommended future TIP
