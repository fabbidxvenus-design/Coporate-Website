# TIP-009: Strapi Security Hardening

**Agent:** security engineer
**Model:** opus
**File ownership:** security-related updates in `coding-packs/strapi/**`, `lib/strapi/config.ts`, `app/api/applications/**`, `app/api/revalidate/**`, `.env.example`, security tests
**Blocked by:** tip-001-strapi-contract-docs, tip-002-strapi-core-client, tip-006-admin-applications-cv
**Acceptance criteria:**
- [ ] Strapi secrets are environment-only and server-only.
- [ ] Strapi Admin protection requirements are documented.
- [ ] CORS restrictions are documented for approved origins only.
- [ ] Application/CV validation includes schema validation, mime/type constraints, and size limits.
- [ ] Rich text/user content rendering is sanitized or uses safe serializers.
- [ ] Security-sensitive event audit logging avoids secrets and sensitive candidate content.

## Context
[SECURITY] Added after security review found gaps around admin exposure, CORS, upload validation, media access, and sanitization.

## Implementation Notes
This TIP may update docs and code, but must not broaden public access to Strapi or CV/media assets.
