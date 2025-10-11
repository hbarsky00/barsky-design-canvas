-- Phase 1: Create seo_meta table for dynamic SEO management
create table if not exists public.seo_meta (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  path_type text not null check (path_type in ('page','project','post')),
  title text not null,
  description text not null,
  canonical_url text,
  og_image_url text,
  keywords text[],
  updated_at timestamptz default now(),
  created_at timestamptz default now()
);

-- Enable RLS
alter table public.seo_meta enable row level security;

-- Public read access (SEO data is public)
create policy "seo_meta public read"
  on public.seo_meta for select
  using (true);

-- Admin-only write access (reuses existing is_admin function)
create policy "seo_meta admin insert"
  on public.seo_meta for insert
  with check (is_admin());

create policy "seo_meta admin update"
  on public.seo_meta for update
  using (is_admin())
  with check (is_admin());

create policy "seo_meta admin delete"
  on public.seo_meta for delete
  using (is_admin());

-- Indexes for performance
create index if not exists idx_seo_meta_slug on public.seo_meta(slug);
create index if not exists idx_seo_meta_path_type on public.seo_meta(path_type);
create index if not exists idx_seo_meta_updated_at on public.seo_meta(updated_at desc);

-- Trigger to auto-update updated_at
create trigger update_seo_meta_updated_at
  before update on public.seo_meta
  for each row
  execute function update_updated_at_column();

-- Seed initial data
insert into public.seo_meta (slug, path_type, title, description, canonical_url, og_image_url)
values 
  (
    'home',
    'page',
    'Hiram Barsky - Senior UX Designer & Product Strategist',
    'Senior UX Designer with 15+ years creating user-centered digital experiences. Specializing in design thinking, user research, and product strategy.',
    'https://barskydesign.pro/',
    'https://barskydesign.pro/images/hiram-barsky-profile.jpg'
  ),
  (
    'projects',
    'page',
    'UX Design Projects & Case Studies - Hiram Barsky',
    'Explore detailed UX design case studies showcasing user research, design thinking, and product strategy across healthcare, fintech, and SaaS platforms.',
    'https://barskydesign.pro/projects',
    'https://barskyux.com/wp-content/uploads/2025/08/projects-showcase.png'
  ),
  (
    'herbalink',
    'project',
    'HerbaLink Healthcare Marketplace - UX Case Study by Hiram Barsky',
    'Designing a HIPAA-compliant herbalist marketplace that increased certified herbalist bookings and patient retention through trustworthy UX and streamlined scheduling.',
    'https://barskydesign.pro/project/herbalink',
    'https://barskydesign.pro/images/herbalink-desktop-1.webp'
  ),
  (
    'splittime',
    'project',
    'SplitTime Co-Parenting App - UX Case Study by Hiram Barsky',
    'A thoughtful co-parenting app that reduces conflict with shared calendars, smart reminders, and transparent expense tracking designed for real families facing complex schedules.',
    'https://barskydesign.pro/project/splittime',
    'https://barskydesign.pro/images/splittime-desktop-1.webp'
  )
on conflict (slug) do nothing;