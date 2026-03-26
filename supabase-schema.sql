-- ============================================================
-- TRIBU Candidate Space — Supabase Database Schema
-- Run this in Supabase SQL Editor (supabase.com/dashboard)
-- ============================================================

-- 1. PROFILES
create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text not null,
  first_name text not null default '',
  last_name text not null default '',
  role text not null default 'freelancer',
  account_status text not null default 'active',
  created_at timestamptz not null default now(),
  invited_at timestamptz,
  activated_at timestamptz
);

alter table profiles enable row level security;
create policy "Users can read own profile" on profiles for select using (auth.uid() = id);
create policy "Users can update own profile" on profiles for update using (auth.uid() = id);

-- 2. MISSIONS
create table if not exists missions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  client_name text not null,
  job_title text not null,
  start_date date not null,
  end_date date not null,
  mission_daily_rate numeric not null default 550,
  tribu_daily_fee numeric not null default 80,
  mission_status text not null default 'active',
  average_worked_days_per_month numeric not null default 20,
  created_at timestamptz not null default now()
);

alter table missions enable row level security;
create policy "Users can read own missions" on missions for select using (auth.uid() = user_id);
create policy "Users can update own mission avg days" on missions for update using (auth.uid() = user_id) with check (auth.uid() = user_id);

-- 3. DOCUMENTS
create table if not exists documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  mission_id uuid references missions(id) on delete set null,
  document_name text not null,
  document_type text not null default 'other',
  file_path text not null,
  file_url text,
  uploaded_by text not null default 'tribu',
  status text not null default 'available',
  created_at timestamptz not null default now()
);

alter table documents enable row level security;
create policy "Users can read own documents" on documents for select using (auth.uid() = user_id);
create policy "Users can insert own documents" on documents for insert with check (auth.uid() = user_id);
create policy "Users can update own documents" on documents for update using (auth.uid() = user_id);

-- 4. CRA SUBMISSIONS
create table if not exists cra_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  mission_id uuid references missions(id) on delete set null,
  month integer not null,
  year integer not null,
  status text not null default 'draft',
  expected_days integer not null default 20,
  worked_days integer not null default 0,
  submitted_at timestamptz,
  created_at timestamptz not null default now(),
  unique(user_id, month, year)
);

alter table cra_submissions enable row level security;
create policy "Users can read own CRA" on cra_submissions for select using (auth.uid() = user_id);
create policy "Users can insert own CRA" on cra_submissions for insert with check (auth.uid() = user_id);
create policy "Users can update own CRA" on cra_submissions for update using (auth.uid() = user_id);

-- 5. CRA DAYS
create table if not exists cra_days (
  id uuid primary key default gen_random_uuid(),
  cra_submission_id uuid not null references cra_submissions(id) on delete cascade,
  day_date date not null,
  day_status text not null default 'empty',
  unique(cra_submission_id, day_date)
);

alter table cra_days enable row level security;
create policy "Users can read own CRA days" on cra_days for select
  using (exists (select 1 from cra_submissions where cra_submissions.id = cra_days.cra_submission_id and cra_submissions.user_id = auth.uid()));
create policy "Users can insert own CRA days" on cra_days for insert
  with check (exists (select 1 from cra_submissions where cra_submissions.id = cra_days.cra_submission_id and cra_submissions.user_id = auth.uid()));
create policy "Users can update own CRA days" on cra_days for update
  using (exists (select 1 from cra_submissions where cra_submissions.id = cra_days.cra_submission_id and cra_submissions.user_id = auth.uid()));

-- 6. TRIBU CONTACTS
create table if not exists tribu_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references profiles(id) on delete cascade,
  contact_name text not null,
  contact_role text not null default 'Talent Partner',
  contact_email text not null,
  contact_phone text,
  calendly_url text,
  created_at timestamptz not null default now()
);

alter table tribu_contacts enable row level security;
create policy "Users can read own contact" on tribu_contacts for select using (auth.uid() = user_id);

-- ============================================================
-- STORAGE BUCKET for documents
-- Run this separately or create via Supabase Dashboard:
-- Storage → New Bucket → "documents" (private)
-- ============================================================

-- Create a profile row automatically when a new user signs up
create or replace function handle_new_user()
returns trigger as $$
begin
  insert into profiles (id, email, first_name, last_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'first_name', ''),
    coalesce(new.raw_user_meta_data->>'last_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure handle_new_user();
