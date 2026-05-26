# TIP-003: Runtime loaders and image helper

## HEADER
- TIP-ID: TIP-003
- Project: Coporate_Website
- Module: Runtime loaders and image helper
- Priority: P0
- Depends on: TIP-001, TIP-002
- Estimated: M

## CONTEXT
- Key files:
  - `lib/utils/images.ts`
  - `lib/db/seed.ts`
  - `lib/db/repositories/news.ts`

## APPLICABLE STANDARDS
- typescript/coding-style
- database/supabase-saas

## TASK
1. Implement or refine `normalizeLocalImage` in `lib/utils/images.ts`.
2. Update `lib/db/seed.ts` to use local asset paths for news and about content.
3. Update repository/mock loaders to ensure local assets are returned.

## ACCEPTANCE CRITERIA
- Mock data in DB uses `/images/` prefix correctly.
- Image normalizer is used in loaders/repositories.
