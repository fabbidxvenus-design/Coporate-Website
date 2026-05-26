# Project Localization (VI/JA) Implementation Review

## Status Summary
The project has been partially localized to support Vietnamese (VI) and Japanese (JA). The implementation uses Next.js 15 async `params` and a dynamic dictionary-based approach.

## Implementation Patterns

### 1. Route Structure
- **Root-level Middleware**: Handles locale detection and redirection.
- **`[locale]` Route Group**: Contains all localized pages.
- **`(public)` Route Group**: Contains the actual page implementations (source of truth).
- **Page Re-exporting**: Files in `app/[locale]/.../page.tsx` typically re-export from `app/(public)/.../page.tsx`.
  ```typescript
  export { default } from '../../(public)/news/page'
  ```

### 2. Localization Strategy
- **Dictionaries**: Located in `lib/i18n/{vi,ja}.json`.
- **Utility**: `getDictionary(locale)` in `lib/i18n/index.ts`.
- **Locale Type**: `type Locale = 'vi' | 'ja'`.
- **Async Params**: Components access `locale` via `await params`.

### 3. Client Components
- Uses `useParams()` to get the current locale.
- Accesses dictionaries via `getDictionary(locale)`.
- Locale switching is handled by string replacement in the pathname.

## Identified Pitfalls & Solutions

### 1. Relative Path Depths
- **Issue**: Re-exporting from `(public)` to `[locale]` requires careful relative path counting (e.g., `../../` vs `../../../`).
- **Solution**: Always verify the depth of the `[locale]` nested route compared to the `(public)` equivalent.

### 2. Async Params (Next.js 15)
- **Issue**: `params` and `searchParams` are now Promises.
- **Solution**: Components MUST `await params` before accessing `locale`.
- **Pitfall**: Client components using `useParams()` do not need to await, but server components do.

### 3. Mixed Content (Static vs Dynamic)
- **Issue**: Some pages (like `HomePage`) still use hardcoded Vietnamese text in the `(public)` implementation, while others (like `ContactPage`) use the dictionary.
- **Solution**: Move all hardcoded strings to `messages/*.json` and use the dictionary in both `(public)` and `[locale]` pages.

### 4. Link Handling
- **Issue**: Many `Link` components in `(public)` pages point to root paths (e.g., `href="/jobs"`).
- **Solution**: Links should be prefixed with the current locale (e.g., `href="/${locale}/jobs"`) to maintain the user's language setting.

## Best Practices for Future Tasks

1.  **Prefer Dictionary for ALL UI Text**: Even in `(public)` pages, fetch the dictionary using the default locale or the provided `locale` prop.
2.  **Shared Layouts**: Keep `PublicHeader` and `PublicFooter` locale-aware by passing the `locale` or using `useParams`.
3.  **Metadata Localization**: Use `generateMetadata` with `await params` to localize page titles and descriptions.
4.  **Legacy Redirects**: Keep `ung_tuyen` pattern as a reference for legacy SEO or old bookmark handling.
5.  **Validation Messaging**: Ensure Zod schemas (like `contactSchema`) or other validation logic support translated error messages.

## Next Steps
- Localize `HomePage` and `AboutPage` content which are currently hardcoded in VI.
- Ensure all `Link` components in shared components (`PublicHeader`, `PublicFooter`) are locale-aware.
- Audit `middleware.ts` to ensure all public paths are correctly handled for locale-less access.
