# RRI Matrix — TIP-015 About Page API and Mock Data Backup

## Overview

TIP-015 replaces hardcoded About page content with a typed, localized content model, mock fallback data, an API/loader boundary, and tests for fallback behavior. The work is implementation-ready and should be treated as **STANDARD** complexity: it has moderate data-shape and fallback logic, moderate IO through Supabase/API/mock paths, and low-to-moderate visual risk because the existing About layout must be preserved rather than redesigned.

## Complexity Score

| Axis | Score | Justification |
|---|---:|---|
| Logic | 2 | Requires a typed About content model, locale normalization, field-level fallback behavior, runtime validation/narrowing for Supabase data, and deterministic activity/highlight behavior. Logic is more than a simple static binding, but no complex algorithms, workflows, or admin CRUD are in scope. |
| IO | 2 | Adds a central loader plus `GET /api/about?locale=vi\|ja`, integrates with existing Supabase/mock fallback behavior, and must handle missing credentials, empty Supabase results, invalid locale, and API errors. IO is moderate because public rendering must never require Supabase locally. |
| Visual | 1 | The About page must preserve the current visual structure, classes, section order, colors, spacing, and responsive behavior. Visual work is mostly data binding, not redesign. Risk exists only around accidental layout drift when replacing hardcoded arrays/copy. |

## Tier Assignment

**Assigned tier: STANDARD**

### Why not SIMPLE

This is not SIMPLE because it crosses multiple boundaries:

- typed domain model
- bilingual mock data
- loader fallback behavior
- public API route
- Supabase/mock environment behavior
- page binding
- contract tests and E2E tests

It also includes security and validation concerns around public unauthenticated reads and untrusted Supabase content.

### Why not COMPLEX

This is not COMPLEX because it explicitly excludes:

- admin editing UI
- full CMS CRUD
- new migration unless proven necessary
- multi-role authorization changes
- visual redesign
- complex business workflow

The implementation can be delivered as a contained public content-read slice.

## No-Orphans Coverage Check

No orphaned TIP-015 requirements were found. Each requirement maps to at least one RRI requirement, implementation artifact, and verification path.

## RRI Coverage Matrix

| TIP-015 Requirement / Acceptance Point | RRI Requirement(s) | Implementation Artifact(s) | Verification |
|---|---|---|---|
| Typed About content model covering hero, stats, intro, activities, highlights, CTA | REQ-A02, REQ-B02, REQ-F01 | `lib/about/types.ts` | Type-check; unit tests for content shape |
| Complete Vietnamese mock About content | REQ-B02, REQ-E06, REQ-F05 | `lib/about/mock-data.ts` or `lib/mock-data.ts` | Unit fallback test; `/vi/about` E2E |
| Complete Japanese mock About content | REQ-B02, REQ-F05; promoted bilingual route scope from TIP-011 | `lib/about/mock-data.ts` or `lib/mock-data.ts` | Unit locale test; `/ja/about` E2E |
| Public `/[locale]/about` renders localized About content for `vi` and `ja` | REQ-B02, REQ-A02 | `app/(public)/about/page.tsx`, `app/[locale]/about/page.tsx` | E2E for `/vi/about` and `/ja/about` |
| Unsupported locale safely falls back to Vietnamese behavior | REQ-F02, REQ-F04 | `lib/about/get-about-content.ts`, route locale normalization | Unit test for unsupported locale; E2E/API test for `locale=en` |
| Fresh checkout works without Supabase credentials | REQ-E06, REQ-F04 | `lib/about/get-about-content.ts`, mock data module | Unit fallback test; E2E smoke in mock/missing-env mode |
| Supabase mode remains available with `USE_MOCK_DATA=false` and valid credentials | REQ-E01, REQ-E02, REQ-E04, REQ-E05 | `lib/about/get-about-content.ts`, optional existing table/view types | Contract test with mocked Supabase success path |
| Public unauthenticated About reads expose only safe/published content | REQ-E04, REQ-E05, REQ-F04 | Loader query constraints; API response mapping | Code review; mocked Supabase query contract test |
| API route returns consistent envelope for `GET /api/about?locale=vi\|ja` | REQ-E01, REQ-F02 | `app/api/about/route.ts` | API contract tests for `vi`, `ja`, unsupported locale, and failure path |
| API route does not leak Supabase errors, credentials, table names, or stack traces | REQ-F04 | `app/api/about/route.ts`, loader error handling | Failure-path API test; security review |
| Supabase data shape is validated/narrowed before rendering | REQ-F01, REQ-F02, REQ-F04 | `lib/about/get-about-content.ts`, optional schema/narrowing helpers | Unit tests for invalid/partial Supabase payload fallback |
| Image URLs from Supabase use safe fallback when absent/invalid | REQ-A03, REQ-F02, REQ-F05 | `lib/about/get-about-content.ts`, mock fallback images | Unit test for missing/invalid image fields; visual smoke |
| About page preserves existing visual structure and design tokens | REQ-A01, REQ-A03, REQ-B02 | `app/(public)/about/page.tsx` | Playwright screenshot/manual visual review at key breakpoints |
| Activity tabs update visible content deterministically or are explicitly static | REQ-B02, REQ-F02, TIP-014 button handling scope | `app/(public)/about/page.tsx` and/or child client component if required | E2E click test |
| Highlight/accordion controls expand/collapse or are explicitly non-interactive | REQ-B02, REQ-F02, TIP-014 button handling scope | `app/(public)/about/page.tsx` and/or child client component if required | E2E click/semantics test |
| CTA navigates to localized jobs page | REQ-B03, REQ-F02, TIP-011 localized routing scope | About content CTA href and page binding | E2E link assertion for `/vi/jobs` and `/ja/jobs` |
| Do not introduce admin editing UI | RRI scope boundary; REQ-D scope remains separate | No admin files required | Scope/code review |
| Do not introduce a migration unless necessary | REQ-E02, REQ-E04, REQ-E05 | Prefer existing settings/content storage or mock-first typed loader | Architecture review before implementation |
| Type-check and production build pass | REQ-F01 | All touched TypeScript/Next.js files | `npm run type-check`; `npm run build` |
| Add contract and E2E tests for fallback behavior | REQ-F02 | `tests/unit/about-content.test.ts`, `tests/e2e/about-api-mockdata.spec.ts` | Unit and Playwright test runs |

## Implementation-Relevant Files

| File | Status | Purpose |
|---|---|---|
| `D:\WORKSPACE\CODE\Coporate_Website\lib\about\types.ts` | Create | About content domain model |
| `D:\WORKSPACE\CODE\Coporate_Website\lib\about\mock-data.ts` | Create | Complete VI/JA fallback content |
| `D:\WORKSPACE\CODE\Coporate_Website\lib\about\get-about-content.ts` | Create | Supabase-or-mock loader with validation and fallback |
| `D:\WORKSPACE\CODE\Coporate_Website\app\api\about\route.ts` | Create | Public API route returning About content envelope |
| `D:\WORKSPACE\CODE\Coporate_Website\app\(public)\about\page.tsx` | Modify | Bind existing visual layout to typed content |
| `D:\WORKSPACE\CODE\Coporate_Website\app\[locale]\about\page.tsx` | Modify only if needed | Preserve locale route compatibility |
| `D:\WORKSPACE\CODE\Coporate_Website\types\database.ts` | Modify only if needed | Add Supabase table/view types only if a real storage path is introduced |
| `D:\WORKSPACE\CODE\Coporate_Website\.env.example` | Modify only if needed | Document new env behavior only if introduced |
| `D:\WORKSPACE\CODE\Coporate_Website\tests\unit\about-content.test.ts` | Create | Loader, locale, fallback, shape tests |
| `D:\WORKSPACE\CODE\Coporate_Website\tests\e2e\about-api-mockdata.spec.ts` | Create | `/vi/about`, `/ja/about`, API fallback, interaction tests |

## Risks and Mitigations

| Risk | Severity | Mitigation |
|---|---|---|
| Visual drift while replacing hardcoded content | Medium | Keep existing markup/classes; bind data only; run screenshot/manual visual checks |
| Partial Japanese localization causing mixed-language sections | Medium | Require complete JA mock object with same schema as VI; test visible JA content |
| Supabase unavailable causing public 500 | High | Loader must catch unavailable/missing config and return mock content |
| Invalid Supabase content causing runtime crash | Medium | Runtime validation/narrowing and field-level mock fallback |
| Public API leaking internal Supabase errors | High | Return generic error envelope; log server-side only if existing logging pattern supports it |
| Scope creep into CMS CRUD/migrations | Medium | Defer admin editing UI and migrations unless an existing table/view is already available and suitable |

## Success Criteria

- [ ] No orphan TIP-015 requirement remains unmapped.
- [ ] Logic score is documented as 2.
- [ ] IO score is documented as 2.
- [ ] Visual score is documented as 1.
- [ ] STANDARD tier assignment is justified.
- [ ] Every TIP-015 acceptance criterion maps to implementation and verification.
- [ ] Implementation can start without adding CMS CRUD or redesign work.
