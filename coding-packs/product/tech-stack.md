# Product Tech Stack

## Current Assets
- Static HTML design exports in `.design/recruitment_site` and `.design/cms_site`.
- Screenshots for 13 public/CMS screens.
- Professional Tech Hub design docs with teal palette, Manrope typography, rounded components, and 1200px layout grid.

## Target Stack
| Layer | Technology |
|-------|------------|
| Framework | Next.js App Router |
| Language | TypeScript |
| Styling | Tailwind CSS with project-owned design tokens |
| Backend | Next.js Route Handlers / Server Actions |
| Database | Supabase Postgres |
| Auth | Supabase Auth for CMS/admin users |
| Storage | Supabase Storage for CV/media if required |
| Deployment | SaaS-ready Next.js deployment, preferably Vercel + Supabase unless deployment constraints change |

## Implementation Notes
- Convert exported HTML into reusable components; do not ship CDN Tailwind.
- Enable RLS and role-based policies before admin writes are exposed.
- Document required environment variables in `.env.example` during implementation.
