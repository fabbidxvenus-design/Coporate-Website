# Supabase SaaS Baseline

## Rule
Design Supabase schema, auth, and RLS before implementing CMS mutations.

## Apply
- Create tables for jobs, applications, news/articles, media/assets if needed, settings, and profiles/admin users.
- Enable RLS on all tables.
- Public reads should be limited to published jobs/news.
- Admin writes require authenticated CMS roles.
- File uploads for CVs must use storage policies and avoid public buckets for private candidate data.
- Store environment variables in `.env.local` and document required keys in `.env.example`.

## Why
Applications and CVs may contain personal data, and the CMS is an admin surface; security cannot be retrofitted safely after launch.

## Exceptions
Local prototypes may use seed data, but production deployment must have RLS and storage policies enabled.
