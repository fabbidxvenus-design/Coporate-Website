# PLAN: TIP-020 Migrate Crawled Data to SQLite

## INTAKE
- Source TIP: `coding-packs/tips/TIP-020-migrate-crawled-data-to-sqlite.md`
- Goal: build a repeatable import path from crawled Fabbi markdown/images into `.data/sqlite.db`, while preserving mock mode behavior.
- Active tier: STANDARD
- Complexity score: 80
  - +20 migrate keyword
  - +15 database/migration risk
  - +10 cross-file paths >3
  - +25 estimated subtasks
  - +15 cross-file dependencies
  - +5 test/build requirements
  - +20 system-wide impact
  - +15 difficult reversibility
  - Clamped to 80
- [DECISION] Use STANDARD instead of THOROUGH because the scope is system-wide but bounded to local import/data seeding, no external deployment, and no auth rewrite.

## SOURCE OF TRUTH
- Crawled content:
  - `coding-packs/crawlings/crawled_all_pages.md`
  - `coding-packs/crawlings/crawled_with_images.md`
  - `coding-packs/crawlings/images/`
- Current DB/runtime:
  - `lib/db/connection.ts`
  - `lib/db/migrate.ts`
  - `lib/db/seed.ts`
  - `lib/db/types.ts`
  - `lib/db/repositories/*`
- Verification commands:
  - `pnpm run type-check`
  - `pnpm run build`
  - targeted Vitest tests created for TIP-020

## KEY FINDINGS
- Crawl markdown is structured as numbered `#### x.y. TRANG n: <url>` sections with bullet labels: `Phân loại trang`, `Tiêu đề`, `Mô tả chi tiết`, `Hình ảnh`, contact info, and links.
- Image mapping markdown groups images by `## Page: <url>` with `./images/<filename>` references and explicit `[Missing Image]` markers.
- Current `seed.ts` uses `INSERT OR IGNORE`; TIP-020 needs idempotent upsert/update semantics, so import code should use deterministic IDs/slugs and `INSERT ... ON CONFLICT DO UPDATE` or delete+insert in transactions.
- `migrate.ts` currently has no `009_create_indexes` after prior edit; include a schema sanity pass before implementation to avoid losing indexes.
- `better-sqlite3` native bindings may require `pnpm approve-builds`; test failures from missing bindings should be surfaced as environment blockers, not hidden.

## PHASES

### Phase 01 — SPEC / Red Gate
[CORE]
Create executable specs before implementation.

Tasks:
1. Create `coding-packs/plans/tip-020-migrate-crawled-data-to-sqlite/specs/spec-import-crawled-data.md` with G/W/T criteria for:
   - fresh import creates/populates SQLite
   - repeated import is idempotent
   - images copied to `public/images` and stored as `/images/<filename>`
   - mock mode remains independent
   - DB mode can read imported public content
   - malformed sections are skipped with summary
2. Add Vitest tests for parser/import helpers before implementing them.
   - Recommended test file: `tests/import-crawled-data.spec.ts`
   - Tests should import pure helpers from a new module, not run the full script directly.
3. Red Gate command:
   - `pnpm run test -- tests/import-crawled-data.spec.ts`
4. Expected Red Gate result:
   - tests compile but fail because helper module/functions do not exist or behavior is not implemented yet.

Deliverables:
- `specs/spec-import-crawled-data.md`
- failing test file
- red gate output captured in final report

### Phase 02 — Data Import Module Design
[CORE]
Implement a pure import module that can be tested without mutating production DB by default.

Tasks:
1. Create `scripts/import-crawled-data.mjs` as CLI entrypoint.
2. Create testable helper module, preferably `scripts/import-crawled-data-lib.mjs`, exporting:
   - `parseCrawledPages(markdown)`
   - `parseImageMapping(markdown)`
   - `buildImportPlan({ pages, imageMap, imageDir, publicImageDir })`
   - `copyImages(plan)`
   - `upsertImportPlan(db, plan)`
   - `runImport(options)`
3. Keep parser deterministic and conservative:
   - split pages by `#### ... TRANG ...: URL`
   - extract page type, title, detail body, contact fields, dates where possible
   - classify news from `/tin-tuc/` and article-like pages
   - classify about/greeting/company/team/culture content into `about_content` and `site_settings`
   - only import jobs if crawl contains job/career/recruitment content with required fields; otherwise log skipped jobs rather than inventing jobs
4. Use browser-safe image URLs only.

Deliverables:
- CLI script
- helper module
- parser tests pass for sample markdown

### Phase 03 — SQLite Upsert + Asset Copy
[CORE]
Make import mutate `.data/sqlite.db` safely and repeatably.

Tasks:
1. Ensure `runMigrations()` is called before import.
2. Add or repair migrations if schema needs fields/indexes for imported crawled content.
   - Restore `009_create_indexes` if missing.
   - If existing DBs may have `cover_letter` already renamed, make migration `010` defensive or document reset requirement.
3. Implement transaction-scoped upserts:
   - jobs by slug
   - news by slug
   - settings by key
   - about by deterministic `(id, locale)` strategy compatible with existing `UNIQUE(id, locale)`
4. Copy images to `public/images/` using non-destructive writes.
5. Produce JSON/text summary with inserted/updated/skipped/failed counts.

Deliverables:
- import writes to DB
- copied image assets
- idempotency test passes against a temporary SQLite DB path

### Phase 04 — Runtime Flag Alignment
[CORE]
Guarantee `USE_MOCK_DATA=true` means mock-only and `false` means SQLite-backed where implemented.

Tasks:
1. Audit public page loaders for jobs/news/about/home usage.
2. Ensure pages that should support SQLite mode choose data source by flag:
   - `USE_MOCK_DATA=true`: use current mock/hardcoded/mock-data fallback.
   - `USE_MOCK_DATA=false`: use repositories / `.data/sqlite.db` content.
3. Do not redesign UI; only adjust data loading paths.
4. If homepage remains hardcoded by design, document whether it is intentionally out of TIP scope or wire latest jobs/news from DB mode without changing mock mode.

Deliverables:
- data source switching is explicit and easy to test
- no Supabase dependency reintroduced

### Phase 05 — Verification / Green Gate
[CORE]
Run all required checks and independent review.

Tasks:
1. Run targeted tests:
   - `pnpm run test -- tests/import-crawled-data.spec.ts`
2. Run full checks:
   - `pnpm run type-check`
   - `pnpm run build`
3. Run the import script once and then again; compare row counts / summary for idempotency.
4. If visual public pages are affected, start the dev server and verify at minimum:
   - `/vi/jobs`
   - `/vi/news`
   - `/vi/about`
   - one imported news detail if supported
5. Use a separate `code-reviewer` agent for verification before marking complete.

Deliverables:
- green test/build output
- import summary output from first and second run
- reviewer report

### Phase 06 — DESLOP / REGRESS / COMPLETE
[CORE]
Only cleanup non-functional clutter.

Tasks:
1. Remove unused temporary parser/debug artifacts.
2. Keep no TODO/TBD in delivered code/docs.
3. Rerun targeted tests and type/build after cleanup.
4. Write final implementation report under this plan directory.
5. Dispatch EVOLVE background agent per zflow requirements.

Deliverables:
- `FINAL-REPORT.md`
- clean working implementation

## RISKS AND MITIGATIONS
- Risk: crawl format is semi-structured prose, not JSON.
  - Mitigation: parse conservatively; log skipped records; use deterministic heuristics; avoid inventing missing data.
- Risk: existing migration `010` may fail on fresh vs previously migrated DBs.
  - Mitigation: inspect schema and make migrations defensive before relying on them.
- Risk: better-sqlite3 bindings unavailable.
  - Mitigation: detect and print `pnpm approve-builds` guidance.
- Risk: mock/DB mode remains mixed.
  - Mitigation: include explicit tests/audit checks for flag behavior.

## ACCEPTANCE COVERAGE MATRIX
| TIP AC | Phase | Evidence |
|---|---:|---|
| Fresh import creates `.data/sqlite.db` and imports content | 03, 05 | import summary + DB checks |
| Re-run is idempotent | 03, 05 | repeated import test + count comparison |
| Images copied and referenced as `/images/<filename>` | 02, 03, 05 | parser/copy tests + filesystem check |
| `USE_MOCK_DATA=true` remains mock-only | 04, 05 | loader audit/test or manual verification |
| `USE_MOCK_DATA=false` renders SQLite content | 04, 05 | repository/page smoke verification |
| Bad sections skipped with reasons | 02, 05 | parser test + import summary |
| type-check/build pass | 05, 06 | command output |

## NON-GOALS
- Do not send emails.
- Do not add external storage.
- Do not redesign public/CMS UI.
- Do not change admin auth/session behavior.
- Do not delete `.data` or existing public images without approval.
