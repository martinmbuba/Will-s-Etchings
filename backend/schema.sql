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

alter table public.tattoo_designs enable row level security;
alter table public.booking_requests enable row level security;

create policy "Public designs are readable"
  on public.tattoo_designs for select
  using (available = true);

create policy "No public direct booking writes"
  on public.booking_requests for insert
  to anon
  with check (false);
