# TIP-015 Plan Directory

This plan implements `coding-packs/tips/TIP-015-about-api-mockdata-backup.md` in zflow plan-supervised mode.

## Execute

```text
/zflow --plan D:\WORKSPACE\CODE\Coporate_Website\coding-packs\plans\tip-015-about-api-mockdata-backup --quality=high --effort=high
```

## Phases
1. Red Gate + Contract Tests
2. Typed Content Model + Mock Backup
3. API Route + Loader
4. About Page Data Binding + Interactions
5. Verification / DESLOP / Regress

## Hard Gates
- Red Gate before implementation.
- Preserve existing About page visual composition.
- API and page must work without Supabase credentials.
- Green Gate before completion.
- Separate verifier required.
- Browser screenshot required for `/vi/about` and `/ja/about`.
