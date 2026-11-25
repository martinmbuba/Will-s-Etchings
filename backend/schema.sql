create table if not exists public.tattoo_designs (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  style text not null,
  artist_name text not null,
  description text,
  price integer not null check (price >= 0),
  duration text,
  image_url text,
  available boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.booking_requests (
  id uuid primary key default gen_random_uuid(),
  design_id uuid references public.tattoo_designs(id),
  full_name text not null,
  email text not null,
  preferred_date date not null,
  placement text not null,
  notes text,
  status text not null default 'pending' check (status in ('pending', 'confirmed', 'cancelled', 'completed')),
  created_at timestamptz not null default now()
);

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  email text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.tattoo_designs enable row level security;
alter table public.booking_requests enable row level security;
alter table public.profiles enable row level security;

drop policy if exists "Public designs are readable" on public.tattoo_designs;
create policy "Public designs are readable"
  on public.tattoo_designs for select
  using (available = true);

drop policy if exists "No public direct booking writes" on public.booking_requests;
create policy "No public direct booking writes"
  on public.booking_requests for insert
  to anon
  with check (false);

drop policy if exists "Users can view own profile" on public.profiles;
create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

drop policy if exists "Users can update own profile" on public.profiles;
create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'full_name', ''),
    new.email
  )
  on conflict (id) do update set
    full_name = excluded.full_name,
    email = excluded.email,
    updated_at = now();
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();
