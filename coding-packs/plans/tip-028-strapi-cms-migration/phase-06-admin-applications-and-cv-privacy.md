# Phase 06 — Admin Workflows, Applications, and CV Privacy

## zflow Phase Mapping
- EXECUTE Green phase for admin/application behaviors.
- VERIFY requires separate security/code review because this phase touches auth, tokens, user submissions, and private CV access.

## Goal
[SECURITY] Preserve the CMS shell and privacy-sensitive application/CV behavior while connecting admin workflows to Strapi or safely handing off editing to Strapi Admin.

## Files to Modify as Needed
- `app/admin/layout.tsx`
- `app/admin/page.tsx`
- `app/admin/jobs/page.tsx`
- `app/admin/jobs/new/page.tsx`
- `app/admin/jobs/[id]/edit/page.tsx`
- `app/admin/news/page.tsx`
- `app/admin/news/new/page.tsx`
- `app/admin/news/[id]/edit/page.tsx`
- `app/admin/applications/page.tsx`
- `app/admin/applications/[id]/page.tsx`
- `app/admin/settings/page.tsx`
- `components/admin/*`
- `app/api/applications/route.ts`
- `app/api/applications/[id]/route.ts`
- `app/api/applications/[id]/cv/route.ts`
- `.env.example`

## Admin Strategy
[DECISION] Choose one strategy during implementation and document it in `coding-packs/strapi/setup.md`:

### Strategy A — In-app Admin CRUD backed by Strapi
- Existing forms remain in Next.js.
- API routes call Strapi with server-only token.
- Success/error feedback remains in current CMS UI.

### Strategy B — Strapi Admin Handoff
- Next.js admin pages remain protected dashboards/read-only lists.
- Create/edit actions become accessible "Open in Strapi" links.
- `STRAPI_ADMIN_URL` is documented.
- No fake in-app editing UI remains for workflows not implemented in Next.js.

## CV/Application Privacy Requirements
1. Public application submission validates all inputs before writes.
2. Application record is created in Strapi or documented hybrid storage.
3. CV storage remains private:
   - Prefer existing signed/server-mediated access if already implemented.
   - If Strapi media is used, document and enforce non-public access expectations.
4. Admin application detail never exposes raw private paths or tokens to client logs/errors.

## Acceptance Criteria
- [ ] Admin shell/nav stays visually consistent and protected.
- [ ] Admin create/edit behavior is explicit: in-app Strapi CRUD or Strapi Admin handoff.
- [ ] Admin mutation success/error states are visible and safe.
- [ ] Candidate application submission creates the expected production record.
- [ ] CV download/access remains private and server-mediated.
- [ ] `.env.example` documents all Strapi variables without real secrets.

## Security Review Triggers
- Server-only Strapi token handling.
- Application submission input validation.
- CV/private media access.
- Auth/admin route protection.
