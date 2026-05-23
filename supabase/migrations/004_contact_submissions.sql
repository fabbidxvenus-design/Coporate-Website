-- Create contact_submissions table
create table if not exists public.contact_submissions (
    id uuid default gen_random_uuid() primary key,
    name text not null,
    email text not null,
    phone text,
    company text,
    subject text not null,
    message text not null,
    locale text not null check (locale in ('vi', 'ja')),
    status text not null default 'new' check (status in ('new', 'read', 'archived')),
    source text not null default 'contact_page',
    created_at timestamp with time zone default now() not null
);

-- Enable RLS
alter table public.contact_submissions enable row level security;

-- Admin read policy
create policy "Admins can view contact submissions"
    on public.contact_submissions
    for select
    using (
        auth.role() = 'authenticated' and
        exists (
            select 1 from public.profiles
            where id = auth.uid() and role = 'admin'
        )
    );

-- Public insert policy (allow anyone to submit contact form)
create policy "Anyone can submit contact form"
    on public.contact_submissions
    for insert
    with check (true);
