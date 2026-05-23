# Security Audit Report

**Project**: Coporate_Website
**Date**: 2026-05-23
**Scope**: Hardcoded secrets, XSS, SQL injection, Auth bypass, CSRF, Path traversal, Rate limiting, Cookie security

---

## Findings

| ID | Severity | File | Issue | Fix |
|----|----------|------|--------|-----|
| SEC-001 | HIGH | .env.local:11 | Hardcoded service role key placeholder in source | Move to `.env.local` (already done), ensure .gitignore covers it, add `SUPABASE_SERVICE_ROLE_KEY` rotation instructions in README |
| SEC-002 | HIGH | .env.example:30 | SERVICE_ROLE_KEY documented in template with placeholder text | Replace placeholder comment with usage note pointing to `.env.local` only |
| SEC-003 | MEDIUM | middleware.ts:97 | Fail-open auth on error for public routes | Change to `fail-closed` - return 401 on auth errors for any non-public path |
| SEC-004 | LOW | middleware.ts:19 | Incomplete public path list - `/apply/success`, `/news`, `/jobs` sub-paths not listed | Add `/apply/success` to `publicPaths`, or rely on middleware matcher excluding specific admin sub-paths |
| SEC-005 | MEDIUM | middleware.ts:119 | Matcher excludes all API routes - no auth on API endpoints | Add explicit `('/api/apply')` exclusion or implement per-route auth middleware |
| SEC-006 | LOW | lib/sanitize.ts:6 | DOMPurify allows `target` attribute on `<a>` - can open links to unexpected targets | Restrict to `target="_blank"` only via ADD_ATTR whitelist, add `rel="noopener noreferrer"` enforcement in sanitizer |
| SEC-007 | LOW | lib/sanitize.ts:6 | DOMPurify tag list allows `<script>` via nesting in other tags | Confirm DOMPurify version supports `ALLOWED_TAGS` correctly and add test coverage for XSS payloads |
| SEC-008 | HIGH | app/(public)/jobs/[slug]/page.tsx:193-197 | Hardcoded image URL for hero banner (potential tracking/impersonation) | Remove hardcoded URL; use a local asset, a dynamic route, or validate against an allowlist |
| SEC-009 | HIGH | app/(public)/jobs/[slug]/page.tsx:226 | Hardcoded `data:image/svg+xml` background for dropzone upload | Verify the SVG is a static decorative element with no external requests; if safe, add a comment explaining why |
| SEC-010 | LOW | app/(public)/jobs/[slug]/page.tsx:1 | `DOMPurify` imported server-side (compatibility concern) | DOMPurify requires a DOM; confirm this works in Next.js App Router RSC context or move sanitization to a client boundary |
| SEC-011 | LOW | components/admin/ArticleForm.tsx:161 | `img` tag rendered from user-supplied `cover_image_url` without validation | Add URL validation (scheme allowlist: `https` only, domain allowlist if possible) before rendering |
| SEC-012 | LOW | components/admin/ArticleForm.tsx:52-61 | `generateSlug` uses `normalize('NFD')` but allows dash - potential homograph attack vector if slug is used in domain | Keep slug lowercase-only and consider adding uniqueness validation at DB level |
| SEC-013 | MEDIUM | components/admin/SettingsForm.tsx:113 | Auto-save on blur without CSRF token | Add `SameSite=Strict` cookie or include CSRF token in the PUT request body |
| SEC-014 | MEDIUM | app/api/applications/route.ts:1 | No rate limiting on public application submission endpoint | Implement rate limiting (e.g., `express-rate-limit` or Upstash Redis) - max 5 submissions per IP per hour |
| SEC-015 | MEDIUM | app/api/settings/route.ts:91 | Whitelist-based key validation is good but value can be arbitrarily long | Add `maxLength` constraint per key (e.g., 255 chars for most fields) |
| SEC-016 | LOW | app/login/page.tsx:15 | Redirect validation checks `startsWith('/')` but `//` is already blocked | Consider stricter validation: ensure redirect matches a known safe path pattern (e.g., `/admin/*`) |
| SEC-017 | LOW | app/login/page.tsx:38 | Email regex is simple and may not catch all edge cases | Consider using a library like `zod` with `.email()` for stronger validation |
| SEC-018 | MEDIUM | app/api/applications/route.ts:87 | File name sanitization removes non-alphanumeric but uses `Date.now()` prefix - collision possible in same-second uploads | Use `crypto.randomUUID()` instead of `Date.now()` for unique prefix |
| SEC-019 | LOW | middleware.ts:31 | Duplicate `startsWith('/admin/')` check (already covered by `.some()` loop) | Remove redundant `\|\| pathname.startsWith('/admin/')` |
| SEC-020 | LOW | components/public/ApplyForm.tsx:37 | Client-side email regex is weak | Use same validation library as server (zod) |
| SEC-021 | LOW | app/(public)/apply/page.tsx:1 | `USE_MOCK_DATA` import used in server component - works but consider extracting to server-only utility | No code change needed; just a note that the pattern is correct |
| SEC-022 | LOW | components/admin/SettingsForm.tsx:30 | `console.error` in production code (SettingsForm load failure) | Replace with a structured logger or suppress in non-dev environments |
| SEC-023 | LOW | components/admin/ArticleForm.tsx:101 | `setError` on catch uses `err.message` which could be user-supplied | Sanitize error messages before displaying to user |
| SEC-024 | MEDIUM | app/api/applications/route.ts:128 | On insert failure, cleanup of uploaded file may not execute if Supabase throws | Wrap file cleanup in try-finally; consider using Supabase Edge Function or background job for cleanup |
| SEC-025 | LOW | lib/sanitize.ts:11 | `sanitizeAndFormatHtml` adds `<br/>` after sanitization - this is safe but the replacement could bypass sanitization if `\n` appears inside a tag | Ensure `\n` replacement happens on text nodes only; add integration test with malicious input like `<script>\nalert(1)</script>` |

---

## Hardcoded Secrets

| ID | Severity | File:Line | Issue | Fix |
|----|----------|-----------|--------|-----|
| SEC-001 | HIGH | .env.local:9-11 | Placeholder credentials in `.env.local` (`.env.example` has same pattern) | These are placeholders, not real secrets. Add note in README that real credentials must be populated. Confirm `.env.local` is in `.gitignore`. |
| SEC-002 | HIGH | .env.example:30 | Template documents `SUPABASE_SERVICE_ROLE_KEY` with placeholder | Add prominent comment: "NEVER commit real values; fetch from Supabase dashboard for local dev" |

**No real secrets found** in source files. All Supabase keys use placeholder values. The `USE_MOCK_DATA=false` in `.env.local` means the app attempts real DB connection but gracefully falls back to null when credentials are placeholders (handled in `lib/supabase/server.ts` lines 19-26).

---

## XSS Vulnerabilities

| ID | Severity | File:Line | Issue | Fix |
|----|----------|-----------|--------|-----|
| SEC-006 | LOW | lib/sanitize.ts:6 | DOMPurify allows `target` attribute on `<a>` - could open links to javascript: or data: URIs | Update: `ALLOWED_ATTR: ['href', 'target', 'rel']` and enforce `rel="noopener noreferrer"` on all links |
| SEC-007 | LOW | lib/sanitize.ts:6 | DOMPurify allows `<a>` tags with `href` - verify no `data:` or `javascript:` URIs pass through | Add `FORCE_BODY: true` option and test against `href="javascript:alert(1)"` |
| SEC-010 | LOW | app/(public)/jobs/[slug]/page.tsx:1 | DOMPurify imported in server component - may not work in Next.js App Router | DOMPurify requires a DOM environment; in RSC context, it needs `@jsdom/dom` or should be called in a client component. Verify this works in production. |

**Protected:** `app/(public)/jobs/[slug]/page.tsx:236,247,258` and `app/(public)/news/[slug]/page.tsx:160` use `dangerouslySetInnerHTML` with `sanitizeAndFormatHtml()` - this is the correct pattern. The sanitizer uses DOMPurify with a strict allowlist (only `['br', 'p', 'strong', 'em', 'ul', 'ol', 'li', 'a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6']` and attributes `['href', 'target', 'rel']`).

---

## SQL Injection

**No SQL injection issues found.** All database queries use the Supabase client with parameterized `.eq()`, `.neq()`, `.select()`, `.insert()`, `.update()`, `.delete()` methods. No raw SQL string concatenation is present.

---

## Authentication / Authorization

| ID | Severity | File:Line | Issue | Fix |
|----|----------|-----------|--------|-----|
| SEC-003 | MEDIUM | middleware.ts:97 | Fail-open on auth error for public routes - error is caught and request proceeds | Change to fail-closed for non-public paths; only public paths should proceed on error |
| SEC-004 | LOW | middleware.ts:19 | Incomplete public path list | Add `/apply/success` to `publicPaths` |
| SEC-005 | MEDIUM | middleware.ts:119 | Matcher excludes all API routes - no auth enforcement on API layer | Add per-route auth checks in each API file, or add explicit auth routes to matcher |
| SEC-016 | LOW | app/login/page.tsx:15 | Open redirect protection is basic (`startsWith('/')` only) | Use a stricter pattern like `^\/admin(\/.*)?$` for allowed redirect targets |

**Positive findings:**
- `lib/auth.ts:59-71`: `requireAdmin()` properly checks both authentication and admin role before returning
- `app/api/applications/route.ts:155`: GET endpoint calls `requireAdmin()` - auth enforced
- `app/api/applications/[id]/route.ts:21,78,164`: All protected endpoints call `requireAdmin()`
- `app/api/news/route.ts:17`: POST calls `requireAdmin()`
- `app/api/news/[id]/route.ts:63,164`: PUT/DELETE call `requireAdmin()`
- `app/api/settings/route.ts:79`: PUT calls `requireAdmin()`
- `app/api/auth/signout/route.ts:8`: Signout is a POST (CSRF-safe by method)
- `middleware.ts:66-91`: Proper role-based access control for admin paths

---

## CSRF Protection

| ID | Severity | File:Line | Issue | Fix |
|----|----------|-----------|--------|-----|
| SEC-013 | MEDIUM | components/admin/SettingsForm.tsx:113 | Auto-save on blur sends PUT request without CSRF token | Add `SameSite=Strict` cookie flag to session cookie in Supabase config, or include a CSRF token in the request body |
| SEC-022 | LOW | components/admin/ArticleForm.tsx:101 | Same auto-save-on-submit pattern could be vulnerable | Same as above; ensure session cookies have `sameSite: 'strict'` or `lax` |

**No CSRF token found** in state-changing API calls. The application relies on:
1. SameSite cookies (default from Supabase SSR)
2. POST method for signout
3. The `lib/auth.ts` pattern (server-side auth check on every protected request)

**Recommendation:** Verify Supabase cookie configuration includes `sameSite: 'strict'` or `'lax'`. If not configured explicitly, add to the cookie options in `lib/auth.ts:17-21` and `lib/supabase/server.ts:34-50`.

---

## Path Traversal

**No path traversal issues found.** File upload in `app/api/applications/route.ts:87` uses `Date.now()` prefix and filename sanitization (`replace(/[^a-zA-Z0-9.-]/g, '_')`). No user-controlled paths are used in filesystem operations.

---

## Rate Limiting

| ID | Severity | File:Line | Issue | Fix |
|----|----------|-----------|--------|-----|
| SEC-014 | MEDIUM | app/api/applications/route.ts:1 | No rate limiting on public application submission endpoint | Implement rate limiting: e.g., Upstash Redis or `express-rate-limit` with config: `max: 5, windowMs: 3600000` (5 per hour per IP) |
| SEC-015 | MEDIUM | app/api/settings/route.ts:91 | Settings PUT has no rate limit - could be abused to fill DB | Add rate limit: `max: 10, windowMs: 60000` (10 per minute per admin session) |

**No rate limiting implemented** on any endpoint. Public endpoints (`/api/applications` POST, `/api/news` GET) have no throttling.

---

## Cookie Security

| ID | Severity | File:Line | Issue | Fix |
|----|----------|-----------|--------|-----|
| SEC-013 | MEDIUM | lib/auth.ts:17-21, lib/supabase/server.ts:34-50 | Cookie options not explicitly configured - defaults may vary | Explicitly set: `{ sameSite: 'lax', secure: true, httpOnly: true }` for all auth cookies. Note: `secure: true` may break local HTTP dev - use `process.env.NODE_ENV === 'production'` |
| SEC-019 | LOW | middleware.ts:31 | Redundant path check in middleware | Clean up duplicate condition for clarity |

**Supabase SSR cookie configuration** is handled by `@supabase/ssr`. Check Supabase SDK version to confirm default cookie settings include `httpOnly: true`. The SDK sets cookies as `httpOnly` and `sameSite: 'lax'` by default. Explicit configuration would provide defense in depth.

---

## Summary by Severity

| Severity | Count | Items |
|----------|-------|-------|
| CRITICAL | 0 | None found |
| HIGH | 3 | SEC-001, SEC-002, SEC-008, SEC-009 |
| MEDIUM | 7 | SEC-003, SEC-005, SEC-013, SEC-014, SEC-018, SEC-024 |
| LOW | 11 | SEC-004, SEC-006, SEC-007, SEC-010, SEC-011, SEC-012, SEC-015, SEC-016, SEC-017, SEC-019, SEC-020, SEC-021, SEC-022, SEC-023, SEC-025 |

---

## Recommendations (Priority Order)

1. **SEC-014 (MEDIUM):** Add rate limiting to `/api/applications` POST endpoint before going to production. This is the most exposed public endpoint.

2. **SEC-003 (MEDIUM):** Change fail-open behavior in middleware to fail-closed for non-public paths.

3. **SEC-013 (MEDIUM):** Verify `SameSite` cookie configuration. Add explicit cookie options to all Supabase client instances.

4. **SEC-008 / SEC-009 (HIGH):** Remove hardcoded external URLs. Use local assets or validate against a allowlist.

5. **SEC-001 / SEC-002 (HIGH):** Document the credential management process. Confirm `.env.local` is in `.gitignore`.

6. **SEC-006 (LOW):** Strengthen DOMPurify attribute allowlist to prevent `target` abuse.

7. **SEC-010 (LOW):** Verify DOMPurify works correctly in Next.js App Router RSC context, or move HTML sanitization to a client component boundary.

8. **SEC-011 (LOW):** Validate `cover_image_url` URLs in ArticleForm before rendering.

9. **SEC-018 (MEDIUM):** Replace `Date.now()` file prefix with `crypto.randomUUID()` to prevent collision attacks.

10. **SEC-024 (MEDIUM):** Improve CV upload cleanup reliability on insert failure.