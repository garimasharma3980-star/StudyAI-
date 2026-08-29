-- StudyAI production database schema.
-- Run this in Supabase SQL Editor.

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  plan text not null default 'free' check (plan in ('free','student_pro','exam_pro')),
  created_at timestamptz not null default now()
);

create table if not exists public.study_plans (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  exam_date date,
  subjects jsonb not null default '[]'::jsonb,
  plan_data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create table if not exists public.generations (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tool text not null,
  input_hash text,
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;
alter table public.study_plans enable row level security;
alter table public.generations enable row level security;

revoke all on public.profiles from anon;
revoke all on public.study_plans from anon;
revoke all on public.generations from anon;

grant select, insert, update on public.profiles to authenticated;
grant select, insert, update, delete on public.study_plans to authenticated;
grant select, insert on public.generations to authenticated;

create policy "users read own profile" on public.profiles
for select to authenticated using ((select auth.uid()) = id);

create policy "users update own profile" on public.profiles
for update to authenticated using ((select auth.uid()) = id)
with check ((select auth.uid()) = id);

create policy "users insert own profile" on public.profiles
for insert to authenticated with check ((select auth.uid()) = id);

create policy "users manage own study plans" on public.study_plans
for all to authenticated using ((select auth.uid()) = user_id)
with check ((select auth.uid()) = user_id);

create policy "users read own generations" on public.generations
for select to authenticated using ((select auth.uid()) = user_id);

create policy "users insert own generations" on public.generations
for insert to authenticated with check ((select auth.uid()) = user_id);

-- Production note:
-- Subscription state should be updated ONLY by a trusted server-side payment webhook,
-- never by a browser request.
