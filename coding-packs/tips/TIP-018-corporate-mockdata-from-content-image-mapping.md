# TIP-018: Corporate Mock Data from Content/Image Mapping

## HEADER
- TIP-ID: TIP-018
- Project: Coporate_Website
- Module: Corporate Site Mock Data / Local Media Wiring
- Priority: P0
- Depends on: TIP-016
- Estimated: M

## CONTEXT
- Working dir: `D:\WORKSPACE\CODE\Coporate_Website`
- Tech stack: `coding-packs/product/tech-stack.md` — Next.js App Router, TypeScript, Tailwind CSS with project-owned design tokens, Next.js Route Handlers / Server Actions, Supabase Postgres/Auth/Storage, Vercel + Supabase deployment target.
- Key files to read first:
  - `coding-packs/crawlings/content_image_mapping.json`
  - `coding-packs/crawlings/crawled_raw_data.json`
  - `coding-packs/crawlings/images/**`
  - `lib/mock-data.ts`
  - `lib/about/mock-data.ts`
  - `app/(public)/news/page.tsx`
  - `app/(public)/news/[slug]/page.tsx`
  - `app/(public)/about/page.tsx`
  - `app/[locale]/news/page.tsx`
  - `app/[locale]/about/page.tsx`
- Patterns to follow:
  - Use `content_image_mapping.json` as the source of truth for pairing content sections/pages with downloaded local image filenames.
  - Use only local public assets served from `/images/...` after copying/curating assets under `public/images/`.
  - Keep public routes mock-first compatible with `USE_MOCK_DATA=true`.
  - Preserve existing layout/component structure; only correct data, image mapping, and minimal URL normalization needed for rendering.

## APPLICABLE STANDARDS
Builder MUST conform to:
- [domain/recruitment-content](../standards/domain/recruitment-content.md) — jobs/applications/news public content model rules.
- [database/supabase-saas](../standards/database/supabase-saas.md) — mock data should map cleanly to future Supabase-backed tables and seed strategy.
- [frontend/html-to-nextjs](../standards/frontend/html-to-nextjs.md) — replace generated/remote placeholder images with managed local assets while preserving visual composition.

## TASK
Rebuild the corporate-site mock data and image wiring from `content_image_mapping.json` and `crawled_raw_data.json`, correcting the previous mock package so live public pages render crawled Fabbi content with matching local images. This task must make the data visible in the existing Next.js app, not only create processed JSON artifacts.

The output must update the app mock data sources and image URL handling so `/vi/news`, `/vi/news/[slug]`, `/vi/about`, and other public mock-mode pages display local crawled assets without `/_next/image` 400/404 failures.

## SPECIFICATIONS
### Business Rules
1. Treat `coding-packs/crawlings/content_image_mapping.json` as the authoritative content-to-image mapping source.
2. Treat `coding-packs/crawlings/crawled_raw_data.json` as the authoritative source for raw page text/facts.
3. Use `coding-packs/crawlings/images/**` as the only source for downloadable local media.
4. Ensure all referenced media files needed by app-visible mock data exist under `public/images/`.
5. Rebuild/update processed data under `coding-packs/crawlings/processed/` as needed, but final acceptance requires app runtime mock data to be wired into `lib/mock-data.ts` and `lib/about/mock-data.ts` or their loaders.
6. Do not use remote image URLs, Unsplash/Picsum placeholders, or stale generated placeholders for corporate/news/about imagery.
7. Normalize local image paths to browser-safe app URLs beginning with `/images/` exactly once.
8. Create a small URL helper if needed so components do not duplicate `/images/` prefixes or pass bare filenames to `next/image`.
9. Preserve public page layout, spacing, routing, and translations; only adjust content/media mapping and minimal supporting data transforms.
10. Japanese content may remain machine-drafted when no crawl source exists, but must keep `translationStatus: "machine_draft_needs_review"` in processed data.
11. If a mapped image is unavailable (`local_filename: null` or `is_available: false`), do not use it as a primary visible image; select a nearby mapped available image and document the fallback.
12. News/article cover images must come from article/page-specific image mappings where possible, not random culture images unless the mapping indicates that page.

### Validation
1. Every app-visible `cover_image_url`, `heroImage`, `imageUrl`, or equivalent field must resolve to an existing file under `public/images/`.
2. No app-visible mock data may contain `https://images.unsplash.com`, `picsum.photos`, or crawled remote URLs for images.
3. Local image URLs must not be double-prefixed (`/images//images/...`) or sent as bare filenames to `next/image`.
4. `/vi/news` must render at least one crawled news/corporate article with a visible local image.
5. `/vi/news/[slug]` for each mock published article must render the same local cover image or a documented fallback.
6. `/vi/about` must not render Unsplash or placeholder hero/activity/employee images.
7. `npm run build` or `npx next build` must pass after the changes.
8. Add or update Playwright/audit validation to check that referenced image files exist and that the page does not issue 404/400 image responses for key mock pages.

### Error Handling
1. If `content_image_mapping.json` contains duplicate images, deduplicate by filename while preserving page-specific usage in source documentation.
2. If a filename exists in mapping but not in `coding-packs/crawlings/images/`, mark it as unavailable and exclude it from app-visible mock data.
3. If `next/image` still returns 400 for a valid local image, either fix the image URL normalization or switch that specific rendering path to a standard `<img>` while preserving dimensions and accessibility.
4. If existing code has unrelated build/test failures, document them separately with exact command output and do not hide them behind this TIP.

## ACCEPTANCE CRITERIA
- Given `content_image_mapping.json` maps a crawled page to local filenames When mock data is generated Then app-visible content uses matching `/images/<local_filename>` values for available images.
- Given `/vi/news` is opened in mock mode When the browser requests article images Then no image request returns 400 or 404.
- Given `/vi/news/[slug]` is opened for each published mock article When the cover image renders Then the image URL starts with `/images/` and the file exists in `public/images/`.
- Given `/vi/about` is opened in mock mode When hero/story/activity images render Then they use local crawl images, not Unsplash/Picsum/remote placeholders.
- Given `lib/mock-data.ts` is inspected When article/job data is read Then it is wired from the rebuilt processed package or from deterministic transformed data based on `content_image_mapping.json` and `crawled_raw_data.json`, not stale hand-written placeholder records.
- Given `npm run build` or `npx next build` runs When the task is complete Then the build passes or unrelated blockers are reported with evidence.
- Given the validation test runs When it checks app-visible image references Then all referenced local images exist and no double-prefix image paths are produced.

## CONSTRAINTS
- DO NOT: stop at generating JSON files only; the visible app mock data must be wired and verified.
- DO NOT: use remote/placeholder image services for mock-mode public pages.
- DO NOT: invent factual company claims, awards, offices, certifications, or partner names beyond crawl sources.
- DO NOT: redesign pages, change layout hierarchy, change Tailwind color tokens, or alter routing behavior.
- DO NOT: change Supabase schema, migrations, RLS policies, or production credentials.
- REUSE: `content_image_mapping.json`, `crawled_raw_data.json`, `coding-packs/crawlings/images/**`, current mock-first loaders, and existing public components.
- SKIP: Supabase import/migration execution and CMS UI redesign.

## QUALITY GATE: SELF-REVIEW
- Completeness: Includes source files, runtime wiring requirement, image path normalization, public page acceptance, build/test validation, and constraints.
- Cross-reference: Aligns with REQ-B02, REQ-B07, REQ-D06, REQ-E02, REQ-F05 and the mock-first/content quality requirements from the project context.
- Blueprint fit: Preserves Next.js App Router + TypeScript + Tailwind + Supabase-ready architecture while correcting mock-mode data/media assets.
- Gaps: Exact article/page selection must be decided by inspecting `content_image_mapping.json` and `crawled_raw_data.json`; ambiguous/unavailable images must be documented during implementation.
- Builder note: This TIP exists because the previous processed package did not fully wire correct image/content mappings into the visible app. Runtime browser verification is mandatory.
