# Plan: Consolidate Mock Data into `lib/mock-data.ts`

## Context
Currently, mock data is scattered across several JSON files in `coding-packs/crawlings/processed/`. These artifacts are being imported directly into the application's repositories and initialization scripts, which is an anti-pattern as they are intended to be build/crawl artifacts rather than runtime source code. This plan consolidates all runtime mock data into `lib/mock-data.ts`, making it the single source of truth and ensuring a consistent bilingual structure (`{ vi, ja }`).

## Proposed Changes

### 1. Data Consolidation in `lib/mock-data.ts`
- **Consolidate all JSON data**: Merge `mock-seed.json`, `news.*.json`, `portfolio.*.json`, `site-content.*.json`, and `activities.json` into `lib/mock-data.ts`.
- **Bilingual Normalization**: Use `{ vi: string, ja: string }` objects for all translatable fields.
- **Maintain Interfaces**: Keep existing `Job`, `NewsArticle`, and `PortfolioItem` interfaces.
- **Add Missing Data**: Incorporate all portfolio items (6 total), activities, and media assets found in the processed JSON files.

### 2. Repository Updates
- **Update News Repository**: Replace direct JSON imports in `lib/db/repositories/news.ts` with imports from `lib/mock-data.ts`. Implement an adapter to handle locale filtering and ID prefixing if still required.
- **Update Jobs Repository**: Update `lib/db/repositories/jobs.ts` to use canonical `jobs` from `lib/mock-data.ts`.
- **Update About Repository**: Update `lib/db/repositories/about.ts` to use `aboutContent` and `activities` from the central store.
- **Update Settings Repository**: Update `lib/db/repositories/settings.ts` to use `siteSettings`.
- **Create Portfolio Repository**: Add `lib/db/repositories/portfolio.ts` to provide a consistent access pattern for portfolio mock data.

### 3. Initialization & Script Updates
- **Update DB Init**: Modify `lib/db/init.ts` to use a seed adapter from `lib/mock-data.ts` instead of `mock-seed.json`.
- **Update Scripts**: Update `scripts/db-init.ts` to remove direct `fs.readFileSync` calls on artifact files.

## Critical Files
- `lib/mock-data.ts` (Major update/Consolidation)
- `lib/db/repositories/news.ts` (Refactor)
- `lib/db/repositories/jobs.ts` (Refactor)
- `lib/db/repositories/about.ts` (Refactor)
- `lib/db/repositories/settings.ts` (Refactor)
- `lib/db/repositories/portfolio.ts` (New file)
- `lib/db/init.ts` (Refactor)
- `scripts/db-init.ts` (Refactor)

## Verification Plan
1. **Repository Testing**: Run unit/integration tests for each repository in mock mode (`USE_MOCK_DATA=true`) to ensure data is correctly served from the new central store.
2. **UI Verification**: Manually check pages (News, Jobs, Portfolio, About) in both `/vi` and `/ja` locales to verify content parity.
3. **Build Check**: Run `pnpm build` to ensure no broken imports or type errors.
4. **Audit**: Search for any remaining references to `coding-packs/crawlings/processed` in the `lib`, `app`, and `components` directories.
