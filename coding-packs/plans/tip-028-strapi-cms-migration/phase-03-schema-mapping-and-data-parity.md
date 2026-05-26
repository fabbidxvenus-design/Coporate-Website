# Phase 03 — Schema Mapping and Data Parity Contract

## zflow Phase Mapping
- SPEC/DECOMPOSE guard phase before Strapi client and route migration.
- Blocks production route migration until Strapi schema maps cleanly to current domain types.

## Goal
[CORE] Create an explicit migration contract between existing CMS/domain data and Strapi content models so implementation can validate data integrity instead of relying on implicit transformer behavior.

## Files to Create
- `coding-packs/strapi/schema-map.md`
- `coding-packs/strapi/data-parity-checklist.md`
- Optional implementation script during execution: `scripts/verify-strapi-parity.*` or equivalent project script.

## Required Schema Map
For each model, document current source fields, Strapi fields, app domain fields, transform rules, required/default behavior, and public visibility rules:
1. `job`
2. `newsArticle` / `article`
3. `application`
4. `siteSetting`
5. `aboutPage`
6. media/CV references

## Data Integrity Gates
- [CORE] Record-count parity: exported legacy records and Strapi collection records match for imported jobs/news/about/settings unless explicitly excluded.
- [CORE] Critical-field parity: `slug`, `locale`, `title`, `status`, `publishedAt`, and route-critical relation fields match 100%.
- [CORE] Public response parity: old repository response shape and Strapi repository response shape satisfy the same app domain type assertions.
- [SECURITY] Private CV references are excluded from public parity outputs and never printed with signed URLs/tokens.

## Route Migration Sequencing
[PIVOT] Do not cut over every public/admin route at once. Execute in this order:
1. Strapi client/transformers with fixtures only.
2. Jobs API + `/[locale]/jobs` list.
3. Jobs detail.
4. News list/detail.
5. About/settings.
6. Applications submission and admin application detail/CV.
7. Admin jobs/news/settings workflows or Strapi Admin handoff.

Each route group must pass mock-mode and Strapi-mode smoke checks before the next route group starts.

## Acceptance Criteria
- [ ] `schema-map.md` maps every critical field from existing app types to Strapi fields.
- [ ] `data-parity-checklist.md` defines record-count, critical-field, response-shape, and private-data exclusion checks.
- [ ] Route cutover order is documented and used by downstream TIPs.
- [ ] No downstream implementation starts route migration until schema mapping exists.
