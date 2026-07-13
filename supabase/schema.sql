-- Photography Portfolio Schema for Supabase (PostgreSQL)
-- Run this in the Supabase SQL Editor to set up your database.

create table if not exists photos (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  description text not null default '',
  alt_text text not null,
  category text not null check (category in ('maternity', 'city', 'landscape')),
  cloudinary_public_id text not null,
  width integer not null default 1600,
  height integer not null default 1067,
  location text,
  taken_at date not null default current_date,
  featured boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists photos_category_idx on photos (category);
create index if not exists photos_taken_at_idx on photos (taken_at desc);
create index if not exists photos_featured_idx on photos (featured) where featured = true;

alter table photos enable row level security;

create policy "Public read access"
  on photos for select
  using (true);

-- Example insert (replace cloudinary_public_id with your uploaded image ID):
-- insert into photos (slug, title, description, alt_text, category, cloudinary_public_id, width, height, location, taken_at, featured)
-- values (
--   'my-first-photo',
--   'My First Photo',
--   'A beautiful landscape captured at dawn.',
--   'Mountain landscape at dawn with pink sky',
--   'landscape',
--   'portfolio/my-first-photo',
--   1600,
--   1067,
--   'Colorado, USA',
--   '2025-06-01',
--   true
-- );

-- Also run supabase/leads.sql to enable contact form lead capture.
