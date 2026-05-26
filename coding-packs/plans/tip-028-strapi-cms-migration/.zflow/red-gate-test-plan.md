# Red Gate Test Plan

## Source
Fan-out TDD review plus current repo boundary map. Adjusted to actual repository paths.

## Test Framework
- Primary: Vitest if already configured by project scripts.
- Route/browser smoke: Playwright only after implementation reaches Green/Verify phases.
- Red Gate tests must compile and fail before Strapi implementation.

## Proposed Test Files
| Test File | Framework | AC Coverage | Red Failure Mode |
|---|---|---|---|
| `tests/unit/lib/strapi/config.test.ts` | Vitest | AC-01, AC-02, AC-22 | Import/function missing or env behavior not implemented |
| `tests/unit/lib/strapi/transformers.test.ts` | Vitest | AC-03, AC-05, AC-07, AC-09, AC-26 | Transformer module missing or returns raw Strapi shape |
| `tests/unit/lib/cms/data-source.test.ts` | Vitest | AC-01, AC-02, AC-04 | Mock/Strapi mode selection not implemented |
| `tests/unit/lib/strapi/repositories.test.ts` | Vitest | AC-03, AC-04, AC-05, AC-06, AC-08 | Repositories missing or fallback behavior wrong |
| `tests/unit/app/api/revalidate.test.ts` | Vitest | AC-19, AC-20 | Revalidation endpoint missing or unauthenticated |
| `tests/unit/app/api/applications-strapi.test.ts` | Vitest | AC-13, AC-14, AC-25, AC-27 | Validation/private CV/audit paths missing |

## Commands
Use actual scripts from `package.json` during execution. Expected candidates:
- `npm run test`
- `npm run build`
- `npm run lint`

If coverage script exists:
- `npm run test:coverage`

## Go/No-Go Metrics
- Red Gate PASS: all test files compile, and at least one assertion per behavior group fails before implementation.
- Green Gate PASS: all Red Gate tests pass after implementation plus existing regression checks pass.
- Coverage Gate: 80% line coverage for changed `lib/strapi`, data-source, and API boundary modules where measurable.
- Performance Gate: record LCP target < 2.5s for affected public pages where Lighthouse/browser metrics are available.

## Path Corrections
The fan-out report mentioned `lib/repositories/jobRepository.ts`; actual repo uses:
- `lib/db/repositories/jobs.ts`
- `lib/db/repositories/news.ts`
- `lib/db/repositories/applications.ts`
- `lib/cms/data-source.ts`
- future `lib/strapi/**`
