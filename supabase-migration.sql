-- Run this in Supabase SQL Editor before using the two manager fields.
-- Safe, non-destructive migration: it only adds nullable columns.
alter table public.branches
  add column if not exists manager_morning text,
  add column if not exists manager_afternoon text;

-- Optional: create the three branch slots with blank details if they do not exist.
-- Existing branch data is preserved; no manager/address details are invented.
insert into public.branches (name, sort_order, is_active)
select '{"fa":"شعبه دوم","ps":"دوهمه څانګه","en":"Branch Two"}'::jsonb, 2, true
where not exists (select 1 from public.branches where sort_order = 2);

insert into public.branches (name, sort_order, is_active)
select '{"fa":"شعبه سوم","ps":"درېیمه څانګه","en":"Branch Three"}'::jsonb, 3, true
where not exists (select 1 from public.branches where sort_order = 3);
