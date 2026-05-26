# Security Implementation Map

## Token and Server-Only Boundaries
- All Strapi calls must happen in Next.js server contexts: route handlers, server actions, or server-only repositories.
- `STRAPI_API_TOKEN` must be loaded from `process.env` only.
- Do not create `NEXT_PUBLIC_STRAPI_TOKEN` or pass Strapi tokens in props/responses/logs.
- Raw Strapi responses must be transformed in `lib/strapi/transformers.ts` before reaching UI components.

## CV Access and Upload Risks
- Candidate CVs are sensitive personal data.
- Prefer existing signed/server-mediated CV download pattern.
- If Strapi Media Library stores CVs, implementation must prove non-public access and server-mediated downloads.
- Validate CV metadata, mime type, and file size server-side before writing to Strapi/storage.

## Sanitization and Input Validation
- Application/contact/user inputs must use schema validation before Strapi calls.
- Locale values must be validated against allowed locales (`vi`, `ja`).
- Strapi rich text must be rendered through safe serializers/sanitization; unsanitized `dangerouslySetInnerHTML` is prohibited.

## Audit Logging and Access Control
- Public content queries must filter `status: published` and locale.
- Admin routes remain protected by existing CMS auth.
- Strapi Admin handoff links must not include session tokens.
- Log security-sensitive failures with event type and safe context only: no tokens, raw CV URLs, candidate sensitive content, or credentials.

## Review Gates
- Verify `USE_MOCK_DATA=true` requires no Strapi credentials and makes no Strapi calls.
- Verify `USE_MOCK_DATA=false` fails loudly when Strapi credentials are missing.
- Run security reviewer after implementation for Strapi token handling, CORS/admin docs, upload validation, private CV access, and rich text rendering.
