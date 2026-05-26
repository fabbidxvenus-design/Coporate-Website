# Phase 01 — SPEC / Red Gate

## Objective

Create executable behavior specs before implementation so TIP-020 starts from a real Red Gate.

## Inputs

- `coding-packs/tips/TIP-020-migrate-crawled-data-to-sqlite.md`
- `specs/spec-import-crawled-data.md`
- `coding-packs/crawlings/crawled_all_pages.md`
- `coding-packs/crawlings/crawled_with_images.md`

## Tasks

1. Review `specs/spec-import-crawled-data.md` and map every AC to at least one automated test or explicit manual verification.
2. Create `tests/import-crawled-data.spec.ts` before implementation.
3. Use small inline markdown fixtures that mirror the crawl format:
   - `#### 1.1. TRANG 1: https://...`
   - `* **Phân loại trang:** ...`
   - `* **Tiêu đề:** ...`
   - `## Page: https://...`
   - `- ![](./images/example.jpg)`
4. Assert parser behavior for valid pages, image mappings, missing images, and browser-safe URLs.
5. Add a temporary SQLite idempotency test design that can run without mutating project `.data`.
6. Run the Red Gate command and capture the expected failing output.

## Red Gate command

```bash
pnpm run test -- tests/import-crawled-data.spec.ts
```

## Expected evidence

- Test file exists before importer code.
- Command fails for missing module/export or intentionally failing stub behavior.
- Failure output is copied into `final-report.md`.

## Exit criteria

- Red Gate is documented in `.zflow/red-gate.md` and `final-report.md`.
- No production code/import script has been implemented before Red Gate evidence exists.
