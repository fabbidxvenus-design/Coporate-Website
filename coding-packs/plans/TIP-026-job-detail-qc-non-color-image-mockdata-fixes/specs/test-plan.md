# Test Plan: TIP-026 Red/Green Gate

## Planned Test File
`tests/audit/job-detail-qc-non-excluded.spec.ts`

## Framework
Use the existing Playwright audit/test style already present under `tests/audit/` and `tests/e2e/`.

## Test Cases
1. `AC-01 share controls expose accessible names`
   - Navigate to `/vi/jobs/senior-frontend-engineer-react`.
   - Locate share/action buttons near job detail action area.
   - Assert buttons have accessible names or aria labels.

2. `AC-02 related jobs have valid list semantics`
   - Run axe on the page.
   - Assert there is no `aria-required-children` violation targeting related jobs.

3. `AC-03 related jobs render full card affordances`
   - Assert related job section contains card containers.
   - Assert each visible related card has a title and visible detail link.
   - Assert metadata rows/tags render when data exists.

4. `AC-05 apply CTA radius is non-color aligned`
   - Inspect computed `border-radius` for top apply CTA.
   - Assert it is 8px or equivalent Tailwind rounded-lg mapping.
   - Do not assert background/text color.

5. `AC-07 no horizontal overflow`
   - Loop viewports: 375, 768, 1024, 1440.
   - Assert `scrollWidth <= clientWidth`.

6. `AC-08 excluded categories unchanged/documented`
   - Static or artifact assertion: implementation report lists COLOR, IMAGE, MOCKDATA residuals as out of scope.
   - If this is too brittle for automated test, require manual evidence in `.zflow/final-report.md`.

## Red Gate Expectation
On current pre-TIP-026 code, at least AC-01, AC-02, AC-03, or AC-05 should fail based on `.qc/ui/job-details/qc-report.md`.
