create table if not exists public.metrics_app_state (
  id text primary key,
  data jsonb not null,
  updated_at timestamptz not null default now()
);

alter table public.metrics_app_state enable row level security;

drop policy if exists "Metrics app public read" on public.metrics_app_state;
drop policy if exists "Metrics app public insert" on public.metrics_app_state;
drop policy if exists "Metrics app public update" on public.metrics_app_state;

create policy "Metrics app public read"
on public.metrics_app_state
for select
to anon
using (id = 'main');

create policy "Metrics app public insert"
on public.metrics_app_state
for insert
to anon
with check (id = 'main');

create policy "Metrics app public update"
on public.metrics_app_state
for update
to anon
using (id = 'main')
with check (id = 'main');
