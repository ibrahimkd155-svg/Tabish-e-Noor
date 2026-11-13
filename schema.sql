-- Run once in Supabase SQL Editor. Review the project before exposing it publicly.
create table if not exists public.admin_users (
 user_id uuid primary key references auth.users(id) on delete cascade,
 role text not null check (role in ('school_admin','branch_manager')),
 branch_no integer null check (branch_no between 1 and 3),
 display_name text,
 created_at timestamptz not null default now(),
 constraint branch_role_scope check ((role='school_admin' and branch_no is null) or (role='branch_manager' and branch_no is not null))
);
create table if not exists public.branches (
 branch_no integer primary key check (branch_no between 1 and 3),
 name_fa text not null default '', phone text not null default '', hours text not null default '',
 grades text not null default '', address text not null default '', programs text not null default '',
 manager_name text not null default '', manager_bio text not null default '', updated_at timestamptz not null default now()
);
create table if not exists public.news (
 id uuid primary key default gen_random_uuid(), branch_no integer not null references public.branches(branch_no) on delete cascade,
 title text not null, body text not null, published boolean not null default true, created_at timestamptz not null default now()
);
create table if not exists public.gallery (
 id uuid primary key default gen_random_uuid(), branch_no integer not null references public.branches(branch_no) on delete cascade,
 image_url text not null, storage_path text not null, caption text, published boolean not null default true, created_at timestamptz not null default now()
);
insert into public.branches(branch_no,name_fa) values (1,'نمایندگی اول'),(2,'نمایندگی دوم'),(3,'نمایندگی سوم') on conflict (branch_no) do nothing;
create or replace function public.can_manage_branch(target integer) returns boolean
language sql stable security definer set search_path=public as $$
 select exists(select 1 from public.admin_users a where a.user_id=auth.uid() and (a.role='school_admin' or (a.role='branch_manager' and a.branch_no=target)))
$$;
create or replace function public.is_school_admin() returns boolean
language sql stable security definer set search_path=public as $$
 select exists(select 1 from public.admin_users a where a.user_id=auth.uid() and a.role='school_admin')
$$;
alter table public.admin_users enable row level security;
alter table public.branches enable row level security;
alter table public.news enable row level security;
alter table public.gallery enable row level security;
drop policy if exists "admin reads own profile" on public.admin_users;
create policy "admin reads own profile" on public.admin_users for select to authenticated using (user_id=auth.uid());
drop policy if exists "public reads branches" on public.branches;
create policy "public reads branches" on public.branches for select to anon,authenticated using (true);
drop policy if exists "authorized updates branch" on public.branches;
create policy "authorized updates branch" on public.branches for update to authenticated using (public.can_manage_branch(branch_no)) with check (public.can_manage_branch(branch_no));
drop policy if exists "public reads published news" on public.news;
create policy "public reads published news" on public.news for select to anon,authenticated using (published or public.can_manage_branch(branch_no));
drop policy if exists "authorized creates news" on public.news;
create policy "authorized creates news" on public.news for insert to authenticated with check (public.can_manage_branch(branch_no));
drop policy if exists "authorized edits news" on public.news;
create policy "authorized edits news" on public.news for update to authenticated using (public.can_manage_branch(branch_no)) with check (public.can_manage_branch(branch_no));
drop policy if exists "authorized deletes news" on public.news;
create policy "authorized deletes news" on public.news for delete to authenticated using (public.can_manage_branch(branch_no));
drop policy if exists "public reads published gallery" on public.gallery;
create policy "public reads published gallery" on public.gallery for select to anon,authenticated using (published or public.can_manage_branch(branch_no));
drop policy if exists "authorized adds gallery" on public.gallery;
create policy "authorized adds gallery" on public.gallery for insert to authenticated with check (public.can_manage_branch(branch_no));
drop policy if exists "authorized deletes gallery" on public.gallery;
create policy "authorized deletes gallery" on public.gallery for delete to authenticated using (public.can_manage_branch(branch_no));
insert into storage.buckets(id,name,public,file_size_limit,allowed_mime_types)
values ('school-media','school-media',true,8388608,array['image/jpeg','image/png','image/webp'])
on conflict (id) do update set public=true,file_size_limit=8388608,allowed_mime_types=array['image/jpeg','image/png','image/webp'];
drop policy if exists "public reads school media" on storage.objects;
create policy "public reads school media" on storage.objects for select to anon,authenticated using (bucket_id='school-media');
drop policy if exists "authorized uploads school media" on storage.objects;
create policy "authorized uploads school media" on storage.objects for insert to authenticated with check (bucket_id='school-media' and (public.is_school_admin() or ((storage.foldername(name))[1] ~ '^[1-3]$' and public.can_manage_branch(((storage.foldername(name))[1])::integer))));
drop policy if exists "authorized deletes school media" on storage.objects;
create policy "authorized deletes school media" on storage.objects for delete to authenticated using (bucket_id='school-media' and (public.is_school_admin() or ((storage.foldername(name))[1] ~ '^[1-3]$' and public.can_manage_branch(((storage.foldername(name))[1])::integer))));
-- Add approved users manually after they sign up / are created in Auth. Never enable public sign-up.
-- Example after obtaining a user's auth UUID:
-- insert into public.admin_users(user_id,role,branch_no,display_name) values ('AUTH-USER-UUID','school_admin',null,'مدیر اصلی');
-- Branch manager example: ('AUTH-USER-UUID','branch_manager',1,'مدیر نمایندگی اول');
