-- ============================================================
-- Coporate_Website — Initial Schema Migration
-- Created: 2026-05-22
-- Purpose: Create all MVP tables, indexes, RLS policies, and storage
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ============================================================
-- PROFILES TABLE (Admin users, references auth.users)
-- ============================================================
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null unique,
  display_name text,
  role text not null default 'admin' check (role in ('admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.profiles is 'Admin user profiles linked to Supabase Auth';

-- Index for email lookups
create index if not exists idx_profiles_email on public.profiles(email);
create index if not exists idx_profiles_role on public.profiles(role);

-- ============================================================
-- JOBS TABLE
-- ============================================================
create table if not exists public.jobs (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  department text,
  location text,
  employment_type text check (employment_type in ('full-time', 'part-time', 'contract', 'internship')),
  salary_min numeric,
  salary_max numeric,
  currency text not null default 'VND',
  summary text,
  description text not null default '',
  requirements text,
  benefits text,
  skills text[] default '{}',
  status text not null default 'draft' check (status in ('draft', 'review', 'published', 'closed', 'archived')),
  published_at timestamptz,
  closed_at timestamptz,
  created_by uuid references public.profiles(id),
  updated_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.jobs is 'Job postings for the careers site';

create index if not exists idx_jobs_slug on public.jobs(slug);
create index if not exists idx_jobs_status on public.jobs(status);
create index if not exists idx_jobs_published_at on public.jobs(published_at) where status = 'published';
create index if not exists idx_jobs_department on public.jobs(department);
create index if not exists idx_jobs_location on public.jobs(location);
create index if not exists idx_jobs_employment_type on public.jobs(employment_type);

-- ============================================================
-- JOB STATUS HISTORY TABLE
-- ============================================================
create table if not exists public.job_status_history (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid not null references public.jobs(id) on delete cascade,
  status text not null check (status in ('draft', 'review', 'published', 'closed', 'archived')),
  changed_by uuid references public.profiles(id),
  changed_at timestamptz not null default now(),
  note text
);

comment on table public.job_status_history is 'Audit trail for job status changes';

create index if not exists idx_job_status_history_job_id on public.job_status_history(job_id);
create index if not exists idx_job_status_history_changed_at on public.job_status_history(changed_at);

-- ============================================================
-- NEWS ARTICLES TABLE
-- ============================================================
create table if not exists public.news_articles (
  id uuid primary key default uuid_generate_v4(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text not null default '',
  cover_image_url text,
  category text,
  tags text[] default '{}',
  status text not null default 'draft' check (status in ('draft', 'review', 'published', 'archived')),
  author_id uuid references public.profiles(id),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.news_articles is 'News/blog articles for the careers site';

create index if not exists idx_news_slug on public.news_articles(slug);
create index if not exists idx_news_status on public.news_articles(status);
create index if not exists idx_news_published_at on public.news_articles(published_at) where status = 'published';
create index if not exists idx_news_category on public.news_articles(category);
create index if not exists idx_news_author_id on public.news_articles(author_id);

-- ============================================================
-- APPLICATIONS TABLE
-- ============================================================
create table if not exists public.applications (
  id uuid primary key default uuid_generate_v4(),
  job_id uuid references public.jobs(id) on delete set null,
  full_name text not null,
  email text not null,
  phone text not null,
  portfolio_url text,
  message text,
  cv_file_path text not null,
  cv_file_name text not null,
  cv_file_size integer not null,
  cv_mime_type text not null default 'application/pdf',
  source text not null default 'website',
  status text not null default 'new' check (status in ('new', 'reviewing', 'shortlisted', 'rejected', 'hired')),
  submitted_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table public.applications is 'Job applications with CV file metadata';

create index if not exists idx_applications_job_id on public.applications(job_id);
create index if not exists idx_applications_status on public.applications(status);
create index if not exists idx_applications_email on public.applications(email);
create index if not exists idx_applications_submitted_at on public.applications(submitted_at);

-- ============================================================
-- SITE SETTINGS TABLE
-- ============================================================
create table if not exists public.site_settings (
  key text primary key,
  value jsonb not null default '{}',
  updated_by uuid references public.profiles(id),
  updated_at timestamptz not null default now()
);

comment on table public.site_settings is 'Key-value store for site configuration';

-- ============================================================
-- MEDIA ASSETS TABLE
-- ============================================================
create table if not exists public.media_assets (
  id uuid primary key default uuid_generate_v4(),
  bucket text not null,
  path text not null,
  alt_text text,
  content_type text,
  size integer,
  created_by uuid references public.profiles(id),
  created_at timestamptz not null default now()
);

comment on table public.media_assets is 'Track uploaded media files';

create index if not exists idx_media_assets_bucket on public.media_assets(bucket);
create index if not exists idx_media_assets_path on public.media_assets(path);

-- ============================================================
-- ENABLE RLS ON ALL TABLES
-- ============================================================
alter table public.profiles enable row level security;
alter table public.jobs enable row level security;
alter table public.job_status_history enable row level security;
alter table public.news_articles enable row level security;
alter table public.applications enable row level security;
alter table public.site_settings enable row level security;
alter table public.media_assets enable row level security;

-- ============================================================
-- RLS POLICIES: PROFILES
-- ============================================================
-- Admin can read all profiles
create policy "Admin can view profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles p
      where p.id = auth.uid() and p.role = 'admin'
    )
  );

-- Users can update their own profile
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- Service role can manage profiles (for initial admin setup)
-- Note: This is managed by Supabase internally, not exposed to app client

-- ============================================================
-- RLS POLICIES: JOBS
-- ============================================================
-- Public: read only published jobs
create policy "Public can view published jobs"
  on public.jobs for select
  using (status = 'published');

-- Admin: full access to all jobs
create policy "Admin can view all jobs"
  on public.jobs for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admin can insert jobs"
  on public.jobs for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admin can update jobs"
  on public.jobs for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admin can delete jobs"
  on public.jobs for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- RLS POLICIES: JOB STATUS HISTORY
-- ============================================================
create policy "Admin can view job status history"
  on public.job_status_history for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admin can insert job status history"
  on public.job_status_history for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- RLS POLICIES: NEWS ARTICLES
-- ============================================================
-- Public: read only published news
create policy "Public can view published news"
  on public.news_articles for select
  using (status = 'published');

-- Admin: full access
create policy "Admin can view all news"
  on public.news_articles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admin can insert news"
  on public.news_articles for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admin can update news"
  on public.news_articles for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admin can delete news"
  on public.news_articles for delete
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- RLS POLICIES: APPLICATIONS
-- ============================================================
-- Admin only: no public access
create policy "Admin can view all applications"
  on public.applications for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admin can update applications"
  on public.applications for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Public insert allowed (candidates apply)
create policy "Public can submit applications"
  on public.applications for insert
  with check (true);

-- ============================================================
-- RLS POLICIES: SITE SETTINGS
-- ============================================================
create policy "Admin can view site settings"
  on public.site_settings for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admin can update site settings"
  on public.site_settings for update
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admin can insert site settings"
  on public.site_settings for insert
  with check (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- RLS POLICIES: MEDIA ASSETS
-- ============================================================
create policy "Admin can view media assets"
  on public.media_assets for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

create policy "Admin can manage media assets"
  on public.media_assets for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- TRIGGER: Auto-update updated_at
-- ============================================================
create or replace function public.handle_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger set_updated_at
  before update on public.profiles
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.jobs
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.news_articles
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.applications
  for each row execute function public.handle_updated_at();

create trigger set_updated_at
  before update on public.site_settings
  for each row execute function public.handle_updated_at();

-- ============================================================
-- TRIGGER: Auto-set created_by/updated_by on jobs
-- ============================================================
create or replace function public.handle_job_create()
returns trigger as $$
begin
  if new.created_by is null and auth.uid() is not null then
    new.created_by = auth.uid();
  end if;
  if new.updated_by is null and auth.uid() is not null then
    new.updated_by = auth.uid();
  end if;
  return new;
end;
$$ language plpgsql;

create trigger set_job_creator
  before insert on public.jobs
  for each row execute function public.handle_job_create();

create trigger set_job_updater
  before update on public.jobs
  for each row execute function public.handle_job_updater();

-- Fix: proper update trigger
drop trigger if exists set_job_updater on public.jobs;
create trigger set_job_updater
  before update on public.jobs
  for each row execute function public.handle_updated_at();

-- ============================================================
-- STORAGE: Candidate CVs Bucket
-- ============================================================
-- Note: Run this separately in Supabase dashboard or via CLI after migration
-- insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
-- values ('candidate-cvs', 'candidate-cvs', false, 5242880, '{"application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"}');

-- Storage policies for candidate-cvs bucket (created separately)
-- insert into storage.objects (bucket_id, name) select 'candidate-cvs', 'placeholder.txt';