# SPEC: About Content Model

## AC-01: Locale normalization
- Given an About content request with locale `vi`
- When the loader normalizes the locale
- Then it returns `vi`.

- Given an About content request with locale `ja`
- When the loader normalizes the locale
- Then it returns `ja`.

- Given an About content request with missing or unsupported locale
- When the loader normalizes the locale
- Then it falls back to `vi`.

## AC-02: Complete mock schema
- Given local mock mode or missing Supabase credentials
- When About content is loaded for `vi` or `ja`
- Then the content contains hero, stats, company intro, activities, highlights, and CTA sections.

## AC-03: Same schema across languages
- Given Vietnamese and Japanese mock About content
- When their top-level sections are compared
- Then both locales expose the same schema shape and required arrays are non-empty.
