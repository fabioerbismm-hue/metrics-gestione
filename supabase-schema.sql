create table if not exists public.metrics_app_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now(),
  updated_by uuid references auth.users(id),
  updated_by_email text
);

alter table public.metrics_app_state
add column if not exists updated_by uuid references auth.users(id);

alter table public.metrics_app_state
add column if not exists updated_by_email text;

create table if not exists public.metrics_audit_log (
  id bigint generated always as identity primary key,
  created_at timestamptz not null default now(),
  user_id uuid references auth.users(id),
  user_email text not null,
  action text not null,
  scope text not null,
  details jsonb not null default '{}'::jsonb
);

alter table public.metrics_app_state enable row level security;
alter table public.metrics_audit_log enable row level security;

drop policy if exists "Metrics app public read" on public.metrics_app_state;
drop policy if exists "Metrics app public insert" on public.metrics_app_state;
drop policy if exists "Metrics app public update" on public.metrics_app_state;
drop policy if exists "Metrics app authenticated read" on public.metrics_app_state;
drop policy if exists "Metrics app authenticated insert" on public.metrics_app_state;
drop policy if exists "Metrics app authenticated update" on public.metrics_app_state;

create policy "Metrics app authenticated read"
on public.metrics_app_state
for select
to authenticated
using (id = 'main');

create policy "Metrics app authenticated insert"
on public.metrics_app_state
for insert
to authenticated
with check (id = 'main');

create policy "Metrics app authenticated update"
on public.metrics_app_state
for update
to authenticated
using (id = 'main')
with check (id = 'main');

drop policy if exists "Metrics audit authenticated read" on public.metrics_audit_log;
drop policy if exists "Metrics audit authenticated insert" on public.metrics_audit_log;

create policy "Metrics audit authenticated read"
on public.metrics_audit_log
for select
to authenticated
using (true);

create policy "Metrics audit authenticated insert"
on public.metrics_audit_log
for insert
to authenticated
with check (auth.uid() = user_id);
