# Phase 04 — Strapi Client, Types, and Transformers

## zflow Phase Mapping
- SPEC Red Gate inputs: transformer/data-source specs must exist before implementation.
- EXECUTE Green phase: implement server-only Strapi integration and make specs pass.

## Goal
[CORE] Add a typed, server-only Strapi integration layer that normalizes Strapi responses into existing app domain types without leaking raw Strapi objects into UI components.

## Files to Create
- `lib/strapi/config.ts`
- `lib/strapi/client.ts`
- `lib/strapi/types.ts`
- `lib/strapi/transformers.ts`
- `lib/strapi/repositories/jobs.ts`
- `lib/strapi/repositories/news.ts`
- `lib/strapi/repositories/applications.ts`
- `lib/strapi/repositories/settings.ts`
- `lib/strapi/repositories/about.ts`

## Files to Read/Reference
- `lib/cms/types.ts`
- `lib/api-response.ts`
- `lib/config/data-source.ts`
- Existing `lib/db/repositories/*.ts` for method shape and domain semantics.

## Required Design
1. `config.ts`
   - Server-only required-env validation.
   - Does not evaluate Strapi env in mock mode paths.
   - Produces safe error types/messages without exposing secrets.
2. `client.ts`
   - Centralized fetch wrapper.
   - Adds bearer token only server-side.
   - Handles query params, populate, filters, locale, status.
   - Converts Strapi error responses into typed errors.
3. `types.ts`
   - Strapi entity/collection response types.
   - Strapi field shapes for jobs, news, applications, settings, about.
4. `transformers.ts`
   - Strapi job → existing job domain type.
   - Strapi article → existing news/article domain type.
   - Strapi application → existing application type.
   - Strapi setting/about → existing page/content types.
   - Filters public visibility defensively.
5. Repositories
   - Match current repository method names where practical.
   - Public methods fetch only published/visible content.
   - Admin methods use server token and return safe domain types.

## Acceptance Criteria
- [ ] No Strapi module is imported by client components.
- [ ] Missing env in Strapi mode fails clearly and safely.
- [ ] Mock-mode code path can be imported/executed without Strapi env.
- [ ] Transformers convert valid Strapi fixtures to existing domain types.
- [ ] Transformers reject/filter non-public statuses for public reads.
- [ ] Strapi client never exposes token values in thrown/public errors.

## Tests to Prepare
- `lib/strapi/__tests__/config.test.ts`
- `lib/strapi/__tests__/transformers.test.ts`
- `lib/strapi/__tests__/client.test.ts` or equivalent mocked-fetch tests.
