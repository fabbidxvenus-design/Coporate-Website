# Vibecode Kit v5.0 — Coporate_Website Builder Handoff

> Paste this into Claude Code at the START of each build session.
> Then paste the specific TIP(s) for that session.

---

## VAI TRO

Bạn là Builder trong Vibecode workflow. Nhiệm vụ của bạn là implement từng TIP đúng scope, không tự mở rộng tính năng, luôn verify bằng app thực tế khi có UI, và trả Completion Report rõ ràng.

## QUY TAC TUYET DOI

1. Reuse `.design/**/code.html` and screenshots as visual source; do not redesign from scratch.
2. Highest frontend priority: preserve original HTML/screenshot layout, item placement, component structure, colors, spacing, and responsive stacking. Code cleanliness and abstraction are secondary when they conflict with visual fidelity.
3. Convert HTML exports into typed Next.js components without changing the visual composition; do not paste entire static pages as production code.
4. Do not ship CDN Tailwind, lorem content, generated remote placeholder images, or hardcoded secrets.
5. All external inputs must be server-validated before writing to Supabase.
6. All `/admin/*` routes and CMS mutations must require Supabase Auth single-admin access.
7. Enable Supabase RLS and private CV storage policies before exposing admin/application flows.
8. After code changes, run build/type/lint/test checks and manually verify changed UI in browser against `.design` screenshots.

## PROJECT CONTEXT

### Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS with project-owned design tokens |
| Backend | Next.js Route Handlers / Server Actions |
| Database | Supabase Postgres |
| Auth | Supabase Auth for CMS/admin users |
| Storage | Supabase Storage for private CV/media files |
| Deployment | Vercel + Supabase |

### Workspace Structure

Target structure:

```text
Coporate_Website/
├── .design/                         # Source HTML/screenshots/design docs, read-only visual SoT
├── app/
│   ├── (public)/
│   │   ├── layout.tsx               # Public header/footer shell
│   │   ├── page.tsx                 # Home
│   │   ├── about/page.tsx
│   │   ├── jobs/page.tsx
│   │   ├── jobs/[slug]/page.tsx
│   │   ├── apply/page.tsx
│   │   ├── news/page.tsx
│   │   └── news/[slug]/page.tsx
│   ├── admin/
│   │   ├── layout.tsx               # Protected CMS shell
│   │   ├── page.tsx                 # Dashboard
│   │   ├── jobs/page.tsx
│   │   ├── jobs/[id]/page.tsx
│   │   ├── jobs/new/page.tsx
│   │   ├── news/page.tsx
│   │   ├── news/[id]/page.tsx
│   │   ├── news/new/page.tsx
│   │   ├── applications/page.tsx
│   │   ├── applications/[id]/page.tsx
│   │   └── settings/page.tsx
│   ├── login/page.tsx
│   ├── api/
│   │   ├── applications/route.ts
│   │   ├── uploads/cv/route.ts
│   │   └── admin/cv/[id]/route.ts
│   ├── globals.css
│   └── layout.tsx
├── components/
│   ├── ui/                          # Button, Input, Card, Chip, StatusBadge, DataTable
│   ├── public/                      # PublicHeader, PublicFooter, Hero, JobCard, NewsCard
│   ├── cms/                         # CmsSidebar, CmsTopbar, MetricCard, ManagementHeader
│   ├── forms/                       # ApplicationForm, JobForm, NewsForm, SettingsForm
│   └── rich-text/                   # RichTextEditor, RichTextRenderer
├── lib/
│   ├── actions/                     # Server actions for jobs/news/settings/applications
│   ├── queries/                     # Public/admin Supabase reads
│   ├── supabase/                    # browser/server/admin clients
│   ├── validation/                  # zod schemas
│   ├── auth.ts                      # admin guard helpers
│   ├── api-response.ts
│   └── constants.ts
├── types/
│   ├── database.ts
│   ├── domain.ts
│   └── api.ts
├── supabase/
│   ├── migrations/
│   └── seed.sql
├── tests/
│   ├── unit/
│   └── e2e/
├── middleware.ts
├── .env.example
├── package.json
├── tailwind.config.ts
└── tsconfig.json
```

Entry points:
- Public routes in `app/(public)/*` render published content only.
- Admin routes in `app/admin/*` are protected by `middleware.ts` and server-side admin guards.
- Form submissions use Server Actions when possible; file upload/download flows use Route Handlers.

### API Patterns

- Prefer Server Actions for CMS CRUD and normal form submissions.
- Use `/api/applications` for candidate application submission when multipart/file metadata makes endpoint semantics clearer.
- Use `/api/uploads/cv` for private CV upload orchestration if direct-to-storage signed uploads are needed.
- Use `/api/admin/cv/[id]` for authenticated CV download/signed URL generation.
- Route Handler response envelope:

```ts
type ApiResponse<T> =
  | { success: true; data: T; error: null }
  | { success: false; data: null; error: { code: string; message: string } }
```

### Product Mission

HR teams need a professional recruitment website and admin CMS to publish jobs, manage applicants, and keep recruitment news updated without developer involvement. Users are HR/admin staff and job candidates. Differentiation is design-first execution from `.design` into a production-ready SaaS-style Next.js + Supabase application.

### Roadmap Priorities

MVP priorities:
- Public careers website: home, about, jobs list/search, job detail, apply form, news list, news detail.
- CMS/admin: dashboard, jobs management, news management, applications management, settings.
- Supabase database/auth/storage with protected admin routes and private CV handling.
- Deployment-ready Next.js application with environment documentation.

Post-launch: none yet; focus on full MVP.

### Applicable Standards

- [cms/admin-shell](standards/cms/admin-shell.md) — Protected CMS shell, navigation, management UX, and mutation feedback.
- [database/supabase-saas](standards/database/supabase-saas.md) — Supabase schema, auth, RLS, storage, and environment baseline.
- [domain/recruitment-content](standards/domain/recruitment-content.md) — Jobs, applications, and news content model rules.
- [frontend/html-to-nextjs](standards/frontend/html-to-nextjs.md) — Convert static HTML exports into typed reusable Next.js components.
- [ui/design-tokens](standards/ui/design-tokens.md) — Professional Tech Hub colors, typography, spacing, and radius source of truth.

## MODULE ARCHITECTURE

### Frontend Foundation

Responsibilities:
- Scaffold Next.js App Router, TypeScript, Tailwind, lint/build/test tooling.
- Convert Tailwind token values from `.design/**/DESIGN.md` and inline HTML configs into `tailwind.config.ts` and CSS variables.
- Create shared UI primitives: Button, Input, Textarea, Select, Card, Chip, Badge, StatusBadge, DataTable, EmptyState, LoadingState, ErrorState.

### Public Website

Responsibilities:
- Implement visual parity for all public `.design/recruitment_site` screens.
- Public pages query published jobs/news only.
- Application forms support validation, CV upload, and user feedback.

### CMS Admin

Responsibilities:
- Implement protected admin layout from `.design/cms_site` screens.
- Provide CRUD/management for jobs, news, applications, settings.
- Dashboard metrics read real Supabase aggregates.

### Supabase Layer

Responsibilities:
- Migrations, seed data, RLS policies, storage bucket policies.
- Tables: `profiles`, `jobs`, `job_status_history`, `news_articles`, `applications`, `site_settings`, `media_assets`.
- Private bucket: `candidate-cvs`.

## DATA MODELS

### `profiles`
| Field | Type | Notes |
|-------|------|-------|
| id | uuid pk | References `auth.users.id` |
| email | text unique not null | Admin email |
| display_name | text | Admin display name |
| role | text | MVP value: `admin` |
| created_at | timestamptz | default now |
| updated_at | timestamptz | update on mutation |

### `jobs`
| Field | Type | Notes |
|-------|------|-------|
| id | uuid pk | Generated |
| slug | text unique not null | Public URL |
| title | text not null | Job title |
| department | text | Category/department |
| location | text | City/remote/hybrid |
| employment_type | text | full-time, part-time, contract, internship |
| salary_min | numeric nullable | Optional |
| salary_max | numeric nullable | Optional |
| currency | text default 'VND' | Optional display |
| summary | text | Card excerpt |
| description | text not null | Rich text/HTML-safe content |
| requirements | text | Rich text/HTML-safe content |
| benefits | text | Rich text/HTML-safe content |
| skills | text[] | Tags/chips |
| status | text | draft, review, published, closed, archived |
| published_at | timestamptz nullable | Required for public publish |
| closed_at | timestamptz nullable | Close date |
| created_by | uuid fk profiles.id | Admin |
| updated_by | uuid fk profiles.id | Admin |
| created_at | timestamptz | default now |
| updated_at | timestamptz | update on mutation |

### `news_articles`
| Field | Type | Notes |
|-------|------|-------|
| id | uuid pk | Generated |
| slug | text unique not null | Public URL |
| title | text not null | Article title |
| excerpt | text | List summary |
| body | text not null | Rich text sanitized output |
| cover_image_url | text nullable | Managed media/public URL |
| category | text nullable | Category |
| tags | text[] | Tags |
| status | text | draft, review, published, archived |
| author_id | uuid fk profiles.id | Admin author |
| published_at | timestamptz nullable | Public visibility |
| created_at | timestamptz | default now |
| updated_at | timestamptz | update on mutation |

### `applications`
| Field | Type | Notes |
|-------|------|-------|
| id | uuid pk | Generated |
| job_id | uuid fk jobs.id nullable | Selected job |
| full_name | text not null | Candidate |
| email | text not null | Candidate |
| phone | text not null | Candidate |
| portfolio_url | text nullable | Optional |
| message | text nullable | Optional |
| cv_file_path | text not null | Private storage path |
| cv_file_name | text not null | Original filename |
| cv_file_size | integer not null | Max 5MB default |
| cv_mime_type | text not null | PDF/DOC/DOCX default |
| source | text default 'website' | Lead source |
| status | text | new, reviewing, shortlisted, rejected, hired |
| submitted_at | timestamptz | default now |
| updated_at | timestamptz | update on mutation |

### `site_settings`
| Field | Type | Notes |
|-------|------|-------|
| key | text pk | e.g. company_email, phone, address |
| value | jsonb not null | Flexible settings |
| updated_by | uuid fk profiles.id | Admin |
| updated_at | timestamptz | update on mutation |

### `media_assets`
| Field | Type | Notes |
|-------|------|-------|
| id | uuid pk | Generated |
| bucket | text not null | Supabase bucket |
| path | text not null | Storage path |
| alt_text | text | Accessibility |
| content_type | text | MIME |
| size | integer | Bytes |
| created_by | uuid fk profiles.id | Admin |
| created_at | timestamptz | default now |

Client state:
- Keep server data in Supabase queries/actions, not global client stores.
- Use local component state for filters, dialogs, form pending state, optimistic UI only where needed.
- Persist shareable public filters in URL search params: `q`, `department`, `location`, `type`, `page`.

## API CONTRACTS

### Public reads

`GET /api/jobs?status=published&q=&department=&location=&type=&page=`
- Request: query params as strings.
- Response: `ApiResponse<{ items: JobSummary[]; page: number; total: number }>`
- Auth: public.

`GET /api/jobs/[slug]`
- Request: `slug: string`.
- Response: `ApiResponse<JobDetail>`.
- Auth: public, published only.

`GET /api/news?status=published&category=&tag=&page=`
- Response: `ApiResponse<{ items: NewsSummary[]; page: number; total: number }>`
- Auth: public.

`GET /api/news/[slug]`
- Response: `ApiResponse<NewsArticle>`.
- Auth: public, published only.

### Candidate applications

`POST /api/applications`
- Request: multipart form data `{ jobId?: string; fullName: string; email: string; phone: string; portfolioUrl?: string; message?: string; cv: File }`.
- Response: `ApiResponse<{ id: string; submittedAt: string }>`.
- Auth: public.
- Validation: required `fullName`, `email`, `phone`, `cv`; CV default allowlist PDF/DOC/DOCX, max 5MB.

### Admin auth/profile

`GET /api/admin/me`
- Response: `ApiResponse<{ id: string; email: string; role: 'admin'; displayName?: string }>`.
- Auth: admin.

### Admin jobs

`POST /api/admin/jobs`
- Request: `JobInput`.
- Response: `ApiResponse<JobDetail>`.
- Auth: admin.

`PATCH /api/admin/jobs/[id]`
- Request: `Partial<JobInput>`.
- Response: `ApiResponse<JobDetail>`.
- Auth: admin.

`PATCH /api/admin/jobs/[id]/status`
- Request: `{ status: 'draft' | 'review' | 'published' | 'closed' | 'archived' }`.
- Response: `ApiResponse<JobDetail>`.
- Auth: admin.

### Admin news

`POST /api/admin/news`
- Request: `NewsInput`.
- Response: `ApiResponse<NewsArticle>`.
- Auth: admin.

`PATCH /api/admin/news/[id]`
- Request: `Partial<NewsInput>`.
- Response: `ApiResponse<NewsArticle>`.
- Auth: admin.

### Admin applications

`GET /api/admin/applications?status=&jobId=&page=`
- Response: `ApiResponse<{ items: ApplicationSummary[]; page: number; total: number }>`.
- Auth: admin.

`GET /api/admin/applications/[id]`
- Response: `ApiResponse<ApplicationDetail>`.
- Auth: admin.

`PATCH /api/admin/applications/[id]/status`
- Request: `{ status: 'new' | 'reviewing' | 'shortlisted' | 'rejected' | 'hired' }`.
- Response: `ApiResponse<ApplicationDetail>`.
- Auth: admin.

`GET /api/admin/cv/[applicationId]`
- Response: redirect or `ApiResponse<{ url: string; expiresIn: number }>`.
- Auth: admin.

### Admin settings/dashboard

`GET /api/admin/dashboard`
- Response: `ApiResponse<{ openJobs: number; newApplications: number; publishedNews: number; applicationsByStatus: Record<string, number> }>`.
- Auth: admin.

`PATCH /api/admin/settings`
- Request: `{ settings: Record<string, unknown> }`.
- Response: `ApiResponse<Record<string, unknown>>`.
- Auth: admin.

## COMPONENT TREE

### Public home
- `HomePage`
  - `PublicHeader`
  - `HeroSection`
  - `FeaturedJobsSection` → `JobCard[]`
  - `CompanyIntroSection`
  - `NewsPreviewSection` → `NewsCard[]`
  - `PublicFooter`

### Jobs list/detail
- `JobsPage`
  - `JobSearchFilters` props: `{ filters, onChange }`
  - `JobList` props: `{ jobs, pagination }`
  - `JobCard` props: `{ job: JobSummary }`
- `JobDetailPage`
  - `JobDetailHeader` props: `{ job }`
  - `JobContent` props: `{ description, requirements, benefits }`
  - `JobSidebar` props: `{ job, applyHref }`
  - `RelatedJobs` props: `{ jobs }`

### Application
- `ApplyPage`
  - `ApplicationForm` props: `{ jobs?: JobSummary[]; selectedJobId?: string }`
  - `CvUploadField` props: `{ maxSizeMb, acceptedTypes }`
  - `SubmitStateMessage` props: `{ status, message }`
- `QuickApplyModal` props: `{ jobId?: string; open: boolean; onOpenChange: (open: boolean) => void }`

### News
- `NewsPage`
  - `NewsFilterBar`
  - `NewsGrid` → `NewsCard[]`
- `NewsDetailPage`
  - `ArticleHeader`
  - `RichTextRenderer`
  - `RelatedArticles`

### CMS shell
- `AdminLayout`
  - `CmsSidebar` props: `{ activePath: string }`
  - `CmsTopbar` props: `{ user, onLogout }`
  - page content slot

### CMS dashboard/jobs/news/applications/settings
- `DashboardPage` → `MetricCard[]`, `ChartCard`, `RecentApplicationsTable`
- `AdminJobsPage` → `ManagementHeader`, `DataTable<JobSummary>`, `StatusBadge`, `RowActions`
- `JobFormPage` → `JobForm` props: `{ initialValue?, mode }`
- `AdminNewsPage` → `DataTable<NewsSummary>`
- `NewsFormPage` → `NewsForm`, `RichTextEditor`
- `ApplicationsPage` → `ApplicationFilters`, `DataTable<ApplicationSummary>`
- `ApplicationDetailPage` → `CandidateProfile`, `ApplicationStatusSelect`, `CvDownloadButton`
- `SettingsPage` → `SettingsForm`

## INTEGRATION POINTS

- Supabase Auth: login, session refresh, middleware route protection, admin profile lookup.
- Supabase Postgres: public reads, CMS CRUD, dashboard aggregates.
- Supabase Storage: private `candidate-cvs` bucket and optional media buckets.
- Vercel: app deployment and environment variable management.
- Optional later: email notifications and anti-spam provider; not required for MVP unless promoted.

## NON-FUNCTIONAL REQUIREMENTS

Performance:
- Public FCP target < 1.5s, LCP < 2.5s, CLS < 0.1.
- Landing/public JS budget target < 150kb gzipped for initial route after framework baseline.
- Admin app JS budget target < 300kb gzipped.
- Use Next image optimization or managed dimensions for images.

Error handling:
- Server actions return typed success/error states.
- Route Handlers use `ApiResponse<T>` envelope.
- UI must include loading, empty, error, and success states for public forms and CMS mutations.
- Do not expose internal Supabase errors to users; log detail server-side only.

Security:
- RLS enabled on all Supabase tables.
- Private CV bucket; admin-only signed access.
- Validate all route/action inputs.
- No hardcoded secrets; use `.env.local` and `.env.example`.

Accessibility/responsive:
- Keyboard-accessible navigation, forms, dialogs, status changes.
- Preserve visible focus states.
- Verify 320, 768, 1024, 1440 breakpoints for key public and CMS screens.

## EXECUTION ORDER

Week 1:
1. TIP-001 — Project scaffold, tooling, Tailwind tokens, base layouts.
2. TIP-002 — Supabase schema, RLS, storage, seed data.
3. TIP-003 — Supabase auth, middleware, admin guard, login.

Week 2:
4. TIP-004 — Public layout + homepage/about conversion from `.design`.
5. TIP-005 — Jobs public + jobs CMS.
6. TIP-006 — Application form + CV upload + applications CMS.

Week 3:
7. TIP-007 — News public + rich text news CMS.
8. TIP-008 — CMS dashboard/settings polish.
9. TIP-009 — QA, accessibility, responsive, tests.
10. TIP-010 — Deployment readiness, env docs, final verification.

## HOW TO USE TIPs

1. Read this handoff first.
2. Pick the next TIP whose dependencies are complete.
3. Implement only that TIP scope.
4. Run checks listed in the TIP.
5. Return Completion Report.
6. Do not proceed to dependent TIPs until current TIP is accepted.

## COMPLETION REPORT FORMAT

```markdown
# Completion Report — TIP-XXX

## Summary
- What changed:
- Files touched:

## Verification
- Build/type/lint:
- Tests:
- Browser/manual checks:

## Requirements Covered
- REQ-...

## Known Gaps
- None / list

## Screenshots or Evidence
- Paths/notes
```

## ESCALATION RULES

- Level 1 — Clarify in TIP: if requirements are ambiguous but implementation can pause safely.
- Level 2 — Stop and ask Architect: if scope conflicts, schema/auth/security assumptions change, or design parity cannot be achieved.
- Level 3 — Block release: if RLS/auth/CV privacy, data loss, build failure, or P0 acceptance criteria are not satisfied.

## Quality Gate: Self-Review

- Completeness: Builder handoff includes module architecture, data models, API contracts, component tree, integrations, non-functional requirements, product docs, standards, and execution order.
- Cross-reference: Consistent with Scan, RRI, Vision, product docs, and standards.
- Gaps: Exact form field copy and final production content still need implementation-time extraction from `.design` and user-provided real content.
