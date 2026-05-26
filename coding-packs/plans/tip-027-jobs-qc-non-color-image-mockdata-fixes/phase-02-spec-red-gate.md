# Phase 02 — SPEC and Red Gate

## Objective
Create executable behavioral checks before implementation so the builder proves TIP-027 behavior rather than only matching their own code.

## Inputs
- `specs/spec-jobs-qc-parity.md`
- Existing test framework: Vitest/Playwright per `package.json`
- Candidate test locations:
  - `tests/audit/` for browser/QC-oriented Playwright checks if existing conventions support it.
  - `tests/e2e/` or existing Playwright location if present.
  - Component/unit tests only for pure transforms if implementation extracts helpers.

## [SPEC] Behavioral Coverage Required
The Red Gate must cover at least these acceptance criteria:
1. `/vi/jobs` contains design-equivalent jobs heading and non-excluded structural sections.
2. Filter controls render as checkbox-style controls with accessible names.
3. Job cards expose discernible link names and reference-style structural landmarks.
4. Lower photo and location sections are present after the listing/sidebar area.
5. Floating bell is present, keyboard focusable, and named.
6. No horizontal overflow at 1440 and a mobile width.
7. Diff guard: no changes solely to pink colors, images, or mock data records.

## [RED] Red Gate Strategy
1. Write specs in `specs/spec-jobs-qc-parity.md`.
2. Add failing Playwright/visual-audit test stubs in the project test tree if executing implementation now.
3. Before code changes, run the new tests and confirm at least one meaningful failure for each unimplemented behavior.
4. If tests cannot be added in this planning pass, document exact future test commands and expected RED failures in `.zflow/verify-report.md`.

## Suggested Test Names
- `AC-01 jobs listing renders non-excluded reference sections`
- `AC-02 jobs filters are checkbox-style and accessible`
- `AC-03 jobs cards expose accessible named controls`
- `AC-04 jobs page has no horizontal overflow at desktop and mobile`
- `AC-05 excluded artifacts are not modified`

## Quality Gate
- [ ] G/W/T specs exist.
- [ ] Test strategy maps every acceptance criterion.
- [ ] Red Gate expected failures are documented before implementation.
- [ ] No implementation code changed before Red Gate artifacts exist.
