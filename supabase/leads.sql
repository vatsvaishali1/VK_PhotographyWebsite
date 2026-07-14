-- Leads / contact inquiries
-- Run this in the Supabase SQL Editor.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text not null,
  source text not null default 'about-page',
  created_at timestamptz not null default now(),

  constraint leads_name_length check (char_length(trim(name)) between 1 and 120),
  constraint leads_email_length check (char_length(trim(email)) between 3 and 254),
  constraint leads_message_length check (char_length(trim(message)) between 1 and 5000)
);

create index if not exists leads_created_at_idx on leads (created_at desc);
create index if not exists leads_email_idx on leads (email);

alter table leads enable row level security;

-- RLS policies only apply after base table privileges are granted.
-- Without this, anon/authenticated get "permission denied for table leads".
grant insert on leads to anon, authenticated;

-- Visitors can submit leads from the website (via anon key / API).
drop policy if exists "Public can insert leads" on leads;
create policy "Public can insert leads"
  on leads for insert
  to anon, authenticated
  with check (true);

-- Nobody can read leads via the public anon key.
-- View/manage leads in the Supabase Table Editor (dashboard uses elevated access).
drop policy if exists "No public read leads" on leads;
create policy "No public read leads"
  on leads for select
  to anon, authenticated
  using (false);
