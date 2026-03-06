create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  full_name text,
  declared_medical boolean not null default false,
  medical_status text not null default 'none' check (medical_status in ('none', 'pending', 'approved', 'rejected')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create or replace function public.set_profiles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_profiles_updated_at on public.profiles;
create trigger trg_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_profiles_updated_at();

create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  declared_medical_value boolean := coalesce((new.raw_user_meta_data ->> 'declared_medical')::boolean, false);
  full_name_value text := nullif(new.raw_user_meta_data ->> 'full_name', '');
begin
  insert into public.profiles (id, email, full_name, declared_medical, medical_status)
  values (
    new.id,
    new.email,
    full_name_value,
    declared_medical_value,
    case when declared_medical_value then 'pending' else 'none' end
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(excluded.full_name, public.profiles.full_name),
        declared_medical = excluded.declared_medical,
        medical_status = case
          when public.profiles.medical_status in ('approved', 'rejected') then public.profiles.medical_status
          when excluded.declared_medical then 'pending'
          else 'none'
        end,
        updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_auth_user();

create or replace function public.prevent_self_approval()
returns trigger
language plpgsql
as $$
begin
  if auth.uid() is not null
    and auth.uid() = old.id
    and new.medical_status is distinct from old.medical_status then
    raise exception 'You cannot change your own medical status.';
  end if;

  return new;
end;
$$;

drop trigger if exists trg_profiles_prevent_self_approval on public.profiles;
create trigger trg_profiles_prevent_self_approval
before update on public.profiles
for each row
execute function public.prevent_self_approval();

grant select, insert, update on table public.profiles to authenticated;

drop policy if exists "profiles_select_own" on public.profiles;
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (auth.uid() = id);

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (auth.uid() = id);

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (auth.uid() = id)
with check (auth.uid() = id);
