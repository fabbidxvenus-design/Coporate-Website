-- ============================================================
-- Coporate_Website — Storage Bucket Setup
-- Created: 2026-05-22
-- Purpose: Create private candidate-cvs bucket for CV storage
-- Note: Run this AFTER 001_initial_schema.sql
-- ============================================================

-- Create candidate-cvs bucket (private by default)
-- The bucket is NOT public, which is correct for CV security

insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'candidate-cvs',
  'candidate-cvs',
  false,
  5242880, -- 5MB max
  array['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document']
) on conflict (id) do update set
  file_size_limit = excluded.file_size_limit,
  allowed_mime_types = excluded.allowed_mime_types;

-- ============================================================
-- STORAGE POLICIES: candidate-cvs bucket
-- ============================================================

-- Admin can upload CVs (for testing/admin purposes)
create policy "Admin can upload CVs"
  on storage.objects for insert
  with check (
    bucket_id = 'candidate-cvs' and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin can read CVs (download/view)
create policy "Admin can view CVs"
  on storage.objects for select
  using (
    bucket_id = 'candidate-cvs' and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- Admin can delete CVs
create policy "Admin can delete CVs"
  on storage.objects for delete
  using (
    bucket_id = 'candidate-cvs' and
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'admin'
    )
  );

-- ============================================================
-- NOTE: Public upload is NOT allowed for CV bucket
-- Candidates submit applications via the applications table
-- which has its own insert policy (public can insert)
-- CV file paths are stored in the applications table
-- but actual file upload happens via signed URLs or server-side
-- ============================================================