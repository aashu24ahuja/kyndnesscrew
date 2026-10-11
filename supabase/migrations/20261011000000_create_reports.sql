-- Reports of people in need, submitted from the website's intake form.
-- The site inserts with the publishable (anon) key; nobody can read, update
-- or delete rows through the public API. Volunteers work from the Supabase
-- dashboard (Table Editor) or, later, an authenticated admin view.

create table public.reports (
  id             uuid primary key default gen_random_uuid(),
  reference      text not null unique check (reference ~ '^KC-[A-Z0-9]{4,20}$'),
  created_at     timestamptz not null default now(),
  needs          text[] not null check (
                   cardinality(needs) between 1 and 8
                   and needs <@ array['food','shelter','medical','clothing','elderly','child','livelihood','other']
                 ),
  location       text not null check (char_length(location) between 3 and 300),
  landmark       text check (char_length(landmark) <= 200),
  description    text not null check (char_length(description) between 10 and 2000),
  people         integer not null default 1 check (people between 1 and 500),
  urgency        text not null check (urgency in ('today', 'week', 'ongoing')),
  reporter_name  text check (char_length(reporter_name) <= 100),
  reporter_phone text check (char_length(reporter_phone) <= 20),

  -- Filled in by the team, never by the public form.
  status         text not null default 'new'
                   check (status in ('new', 'assigned', 'visited', 'helped', 'closed')),
  volunteer      text,
  notes          text
);

create index reports_status_created_at_idx on public.reports (status, created_at desc);

alter table public.reports enable row level security;

-- Public form: insert only, and only as a fresh untriaged report.
create policy "Anyone can submit a report"
  on public.reports
  for insert
  to anon, authenticated
  with check (status = 'new' and volunteer is null and notes is null);

-- No select/update/delete policies: reports contain reporters' phone numbers.

revoke all on public.reports from anon, authenticated;
grant insert on public.reports to anon, authenticated;
