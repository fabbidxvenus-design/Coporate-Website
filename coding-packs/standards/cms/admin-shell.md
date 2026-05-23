# CMS Admin Shell

## Rule
CMS screens use one protected admin shell with persistent sidebar, topbar, and consistent management surfaces.

## Apply
- Protect all `/admin/*` routes behind authentication.
- Keep sidebar navigation consistent: dashboard, jobs, news, applications, settings, logout.
- Use search/filter/sort patterns consistently across management screens.
- Dashboard metrics should be derived from real Supabase data, not duplicated counters.
- All mutations need visible success/error feedback.

## Why
The design exports share a unified CMS shell, and SaaS deployment requires predictable authenticated admin workflows.

## Exceptions
Mobile admin can collapse navigation, but must preserve access to the same sections.
