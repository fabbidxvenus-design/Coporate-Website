# PLAN: TIP-018 Corporate Mock Data from Content/Image Mapping

[CORE] Source TIP: `coding-packs/tips/TIP-018-corporate-mockdata-from-content-image-mapping.md`

## 1. INTAKE

[DECISION] Complexity score: **72 / STANDARD+**.

Rationale:
- Runtime data wiring spans crawl artifacts, processed mock data, public assets, mock loaders, and public page renderers.
- The task fixes a repeated user-visible failure: fresh checkout/mock mode still showed stale data and local images returned 400/404.
- It changes visible public output, so browser verification and screenshots are mandatory.
- It is not THOROUGH because the TIP forbids database schema, routing, CMS redesign, and color/layout redesign work.

State root: `coding-packs/plans/tip-018-corporate-mockdata-from-content-image-mapping/.zflow/`.

## 2. Approved Requirements

[CORE] TIP-018 goal: rebuild app-visible corporate mock data and local image wiring from:
- `coding-packs/crawlings/content_image_mapping.json`
- `coding-packs/crawlings/crawled_raw_data.json`
- `coding-packs/crawlings/images/**`

[CORE] Runtime acceptance is mandatory. Generating processed JSON alone is not sufficient.

Required visible surfaces:
- `/vi/news`
- `/vi/news/[slug]`
- `/vi/about`
- corresponding locale-aware runtime loaders/components used by those routes.

Constraints:
- Do not use Unsplash, Picsum, crawled remote image URLs, or stale placeholder images for corporate/news/about imagery.
- Do not invent factual company claims, awards, offices, certifications, or partner names beyond crawl sources.
- Do not redesign layout hierarchy, spacing, routing, translations, Tailwind colors, Supabase schema, RLS, storage, or production credentials.
- Normalize every app-visible local image to `/images/<local_filename>` exactly once.
- Ensure every referenced local image exists under `public/images/`.

## 3. SPEC / Red Gate Plan

[SPEC] Behavioral specs are in `specs/spec-corporate-mockdata-image-mapping.md`.

[RED] Before changing implementation, add targeted validation/browser tests that fail against the current stale/partial runtime wiring. Suggested test scope:
1. Static runtime mock-image integrity validation for `lib/mock-data.ts` and `lib/about/mock-data.ts` outputs.
2. Browser request validation for `/vi/news`, `/vi/news/[slug]`, and `/vi/about` in mock mode.
3. Forbidden remote placeholder scan for app-visible mock data and relevant public renderers.
4. Public asset existence validation for every referenced `/images/...` path.

Red Gate conditions:
- Spec file exists.
- Tests compile and run.
- At least one assertion fails before implementation because current runtime still has one or more of: stale About mock images, bare image filenames passed to renderers, remote placeholder URLs, or missing/invalid local asset references.

## 4. Decomposition

### Batch 1 — Source mapping and asset inventory
Artifact: `tips/tip-001-source-mapping-and-assets.md`

Steps:
1. Parse `content_image_mapping.json` and group images by source page URL, content summary, filename, availability, and alt text.
2. Parse `crawled_raw_data.json` for factual public page/article/about text.
3. Inventory `coding-packs/crawlings/images/**` and `public/images/**`.
4. Decide the exact app-visible source-to-image mapping for news covers and About images.
5. Document unavailable-image fallbacks and exclude unavailable images from primary visible data.

### Batch 2 — Red gate validation
Artifact: `tips/tip-002-red-gate-validation.md`

Steps:
1. Add or update an audit test, preferably `tests/audit/corporate-mockdata-images.spec.ts`.
2. Validate app-visible image references are local `/images/...`, not remote and not bare filenames.
3. Validate referenced files exist under `public/images/`.
4. Validate `/vi/news`, selected `/vi/news/[slug]`, and `/vi/about` produce no 400/404 image responses.
5. Run the targeted command and capture the expected RED failure before implementation.

### Batch 3 — Runtime mock loaders and image helper
Artifact: `tips/tip-003-runtime-loaders-and-image-helper.md`

Steps:
1. Add a small shared local image normalizer if current duplication is unsafe.
2. Update `lib/mock-data.ts` so news/article image fields are deterministic `/images/<local_filename>` paths based on the authoritative mapping.
3. Update `lib/about/mock-data.ts` so hero/story/activity/team images use local mapped assets instead of Unsplash/Picsum/remote placeholders.
4. Keep data shaped for existing repository/database types without changing schema.
5. Prefer typed raw-data transforms over broad `any[]` usage where practical.

### Batch 4 — Public renderer wiring
Artifact: `tips/tip-004-public-renderer-wiring.md`

Steps:
1. Update all visible news renderers that consume `cover_image_url`, `thumbnail_url`, `heroImage`, `imageUrl`, or equivalent fields.
2. Ensure `FeaturedArticle`, `ArticleGridCard`, `HorizontalArticleCard`, news detail, and shared `NewsCard` paths do not pass bare filenames or double-prefixed paths to `next/image` or `<img>`.
3. Preserve existing visual composition, layout, spacing, route behavior, and translations.
4. If `next/image` still returns 400 for a verified local file, fix normalization/config first; only switch a specific path to `<img>` with preserved accessibility and dimensions if evidence supports it.

### Batch 5 — Green gate, visual verification, and report
Artifact: `tips/tip-005-green-gate-visual-verification.md`

Steps:
1. Re-run the targeted audit/browser tests and confirm GREEN.
2. Run `npm run build` or `npx next build`.
3. Start the app and capture screenshots for `/vi/news`, `/vi/news/[slug]`, and `/vi/about` at desktop and mobile widths.
4. Invoke a separate `code-reviewer` agent for diff review.
5. Write `.zflow/final-report.md` with command results, screenshot paths, image mapping decisions, fallback decisions, gaps, and verifier result.
6. Dispatch EVOLVE as background/non-blocking learning step.

## 5. Quality Gates

[CORE] Required gates before complete:
- Complexity scored: PASS.
- SPEC G/W/T exists: PASS.
- Red Gate executed before implementation: pending execute.
- Green Gate: all targeted validation/browser tests pass after implementation.
- Build passes or unrelated blockers are documented with exact command output.
- Separate verifier agent reviews the diff.
- Visual output opened and screenshotted for `/vi/news`, `/vi/news/[slug]`, and `/vi/about`.
- No TODO/TBD in delivered implementation.
- DESLOP performs cleanup only, no functional behavior changes.
- REGRESS re-runs checks after cleanup.
- EVOLVE dispatched in background.

## 6. Verification Evidence Required

Visual evidence minimum:
- `/vi/news` desktop and mobile.
- At least one `/vi/news/[slug]` desktop and mobile.
- `/vi/about` desktop and mobile.

Command evidence minimum:
- Targeted audit/browser test command for mock image integrity.
- `npm run build` or `npx next build`.
- Optional lint/type-check if existing scripts are stable.

Runtime evidence minimum:
- No 400/404 responses for image requests on target pages.
- At least one crawled corporate/news article visible on `/vi/news` with a local image.
- About hero/story/activity images use `/images/...`, not remote placeholders.

If any command fails due to unrelated existing issues, include exact command, concise failure summary, and why it is unrelated.

## 7. DESLOP Rules

- Cleanup may only adjust duplicate image normalization, naming clarity, and dead placeholder references.
- Do not change visible layout, colors, spacing, content hierarchy, routing, auth, database schema, or CMS behavior during DESLOP.
- Do not rewrite crawl facts during DESLOP unless verifier found a source-traceability issue.

## 8. Risks and Mitigations

- Risk: mapping contains unavailable or ambiguous images. Mitigation: exclude unavailable images and document fallback selection in final report.
- Risk: news article content does not map one-to-one with image pages. Mitigation: use article/page-specific mappings first, then nearby same-category mappings only with documented fallback.
- Risk: local files exist in crawl folder but not `public/images`. Mitigation: sync only referenced assets and validate public asset existence.
- Risk: `next/image` returns 400 for valid local image due to stale dev config/cache. Mitigation: verify direct `/images/...` access, restart dev server, and fix normalization before renderer fallback.
- Risk: previous TIP-016 generated processed artifacts but not runtime wiring. Mitigation: this plan explicitly gates on visible app pages and browser request status.

## 9. Done Criteria

- Runtime mock data is wired into the visible app, not just processed JSON files.
- `/vi/news`, `/vi/news/[slug]`, and `/vi/about` render local crawled images without 400/404 image requests.
- No app-visible mock data contains Unsplash, Picsum, crawled remote image URLs, bare filenames, or double-prefixed `/images//images/...` paths.
- Every app-visible image path resolves to an existing file under `public/images/`.
- Targeted tests pass.
- Build passes or unrelated blockers are documented with evidence.
- Separate verifier approves or only non-blocking findings remain.
- `coding-packs/plans/tip-018-corporate-mockdata-from-content-image-mapping/.zflow/final-report.md` is created after execution.

## 10. Resume Instructions

To continue implementation from this plan:

```text
/zflow --plan coding-packs/plans/tip-018-corporate-mockdata-from-content-image-mapping --phase execute
```

Primary artifacts:
- `specs/spec-corporate-mockdata-image-mapping.md`
- `.zflow/tasks.json`
- `.zflow/coverage-matrix.md`
- `.zflow/pipeline.json`
- `.zflow/intake.json`
- `tips/tip-001-source-mapping-and-assets.md`
- `tips/tip-002-red-gate-validation.md`
- `tips/tip-003-runtime-loaders-and-image-helper.md`
- `tips/tip-004-public-renderer-wiring.md`
- `tips/tip-005-green-gate-visual-verification.md`
