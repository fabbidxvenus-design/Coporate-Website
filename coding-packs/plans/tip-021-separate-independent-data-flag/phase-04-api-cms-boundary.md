# Phase 04 — API + CMS Boundary Audit

## Objective
Apply the shared mock-vs-SQLite boundary to API routes and CMS/admin paths without changing auth/session behavior.

## Tasks
1. Inventory `app/api/**/route.ts` routes that touch jobs, news, about, contact, applications, settings, or dashboard data.
2. Inventory admin/CMS loaders/actions if present.
3. Replace scattered env checks with shared helper.
4. In mock mode, route to safe mock/no-op behavior where the project already supports mock behavior.
5. In SQLite mode, use SQLite-backed behavior and expose clear errors when DB is unavailable.
6. Do not reintroduce Supabase dependencies.

## Exit Criteria
- [ ] API routes have consistent flag semantics.
- [ ] CMS/admin data paths have consistent flag semantics.
- [ ] Auth/session behavior unchanged.
- [ ] Targeted tests or documented verification cover changed routes.
