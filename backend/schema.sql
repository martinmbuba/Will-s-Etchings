create table if not exists public.tattoo_designs (
  id uuid primary key default gen_random_uuid(),
  catalog_id integer unique,
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

alter table public.tattoo_designs add column if not exists catalog_id integer;
do $$
begin
  if not exists (
    select 1
    from pg_constraint
    where conname = 'tattoo_designs_catalog_id_key'
      and conrelid = 'public.tattoo_designs'::regclass
  ) then
    alter table public.tattoo_designs
      add constraint tattoo_designs_catalog_id_key unique (catalog_id);
  end if;
end
$$;

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

insert into public.tattoo_designs (catalog_id, title, style, artist_name, price, duration, image_url, available)
values
  (1, 'Forest Deer', 'Black & Grey', 'Dom Carter', 280, '3–4 hours', '/real-tattoos/tattoo-01.jpg', true),
  (2, 'Lunar Wolf', 'Blackwork', 'Mika Ren', 220, '2–3 hours', '/real-tattoos/tattoo-02.jpg', true),
  (3, 'Shadow Wolf', 'Illustrative', 'Soren Vale', 260, '2–3 hours', '/real-tattoos/tattoo-03.jpg', true),
  (4, 'Ink Wolf', 'Black & Grey', 'Alan Hindes', 320, '4–5 hours', '/real-tattoos/tattoo-04.jpg', true),
  (5, 'Sloth Spirit', 'Neo Traditional', 'Dom Carter', 250, '2–3 hours', '/real-tattoos/tattoo-05.jpg', true),
  (6, 'Lion Mandala', 'Fine Line', 'Dom Carter', 290, '3–4 hours', '/real-tattoos/tattoo-06.jpg', true),
  (7, 'Lion and Cub', 'Illustrative', 'Alan Hindes', 340, '4–5 hours', '/real-tattoos/tattoo-07.jpg', true),
  (8, 'Noble Lion', 'Black & Grey', 'Alan Hindes', 310, '3–4 hours', '/real-tattoos/tattoo-08.jpg', true),
  (9, 'Bear Totem', 'Neo Traditional', 'Dom Carter', 210, '2–3 hours', '/real-tattoos/tattoo-09.jpg', true),
  (10, 'Orchid Tribal', 'Tribal', 'Guest Artist', 195, '1–2 hours', '/real-tattoos/tattoo-10.jpg', true),
  (11, 'Tribal Revival', 'Tribal', 'Tattoo Collective', 300, '3–4 hours', '/real-tattoos/tattoo-11.jpg', true),
  (12, 'Tribal Band', 'Tribal', 'Studio Archive', 270, '3–4 hours', '/real-tattoos/tattoo-12.jpg', true),
  (13, 'Dragon Backpiece', 'Japanese', 'Mika Ren', 175, '5–6 hours', '/real-tattoos/tattoo-13.jpg', true),
  (14, 'Eagle Backpiece', 'Illustrative', 'Convention Artist', 310, '5–6 hours', '/real-tattoos/tattoo-14.jpg', true),
  (15, 'London Owl', 'Fine Line', 'Guest Artist', 230, '2–3 hours', '/real-tattoos/tattoo-15.jpg', true),
  (16, 'Koi Study', 'Japanese', 'Leila Moss', 350, '4–5 hours', '/real-tattoos/tattoo-16.jpg', true),
  (17, 'Butterfly Blackwork', 'Blackwork', 'Dom Carter', 240, '2–3 hours', '/real-tattoos/tattoo-17.jpg', true),
  (18, 'Lion Mandala', 'Fine Line', 'Dom Carter', 290, '3–4 hours', '/real-tattoos/tattoo-18.jpg', true),
  (19, 'Tattooed Hand', 'Hand', 'Convention Artist', 160, '1–2 hours', '/real-tattoos/tattoo-19.jpg', true),
  (20, 'Snake Handpiece', 'Hand', 'Brussels Collective', 190, '2 hours', '/real-tattoos/tattoo-21.jpg', true),
  (21, 'Neck Script', 'Neck', 'Guest Artist', 210, '2 hours', '/real-tattoos/tattoo-22.jpg', true),
  (22, 'Barcode Neck', 'Neck', 'Studio Archive', 180, '1–2 hours', '/real-tattoos/tattoo-23.jpg', true),
  (23, 'Tribal Neck', 'Tribal', 'Tribal Collective', 220, '2–3 hours', '/real-tattoos/tattoo-24.jpg', true),
  (24, 'Evil Leg', 'Leg', 'Convention Artist', 280, '3–4 hours', '/real-tattoos/tattoo-25.jpg', true),
  (25, 'Leg Artwork', 'Leg', 'Guest Artist', 260, '3 hours', '/real-tattoos/tattoo-26.jpg', true),
  (26, 'Lower Back', 'Back', 'Studio Archive', 240, '2–3 hours', '/real-tattoos/tattoo-28.jpg', true),
  (27, 'Christian Backpiece', 'Back', 'Mika Ren', 520, '8–10 hours', '/real-tattoos/tattoo-29.jpg', true),
  (28, 'Full Back', 'Back', 'Soren Vale', 480, '8–10 hours', '/real-tattoos/tattoo-30.jpg', true),
  (29, 'Angel Sleeve', 'Sleeve', 'Leila Moss', 430, '6–8 hours', '/real-tattoos/tattoo-31.jpg', true),
  (30, 'Phoenix Sleeve', 'Sleeve', 'Maaika', 460, '7–9 hours', '/real-tattoos/tattoo-32.jpg', true),
  (31, 'Northern Sleeve', 'Sleeve', 'Tattoo Belfast', 440, '6–8 hours', '/real-tattoos/tattoo-33.jpg', true),
  (32, 'Pattern Study', 'Geometric', 'Aya Linden', 170, '1–2 hours', '/real-tattoos/tattoo-34.png', true),
  (33, 'Dom Geometric', 'Geometric', 'Dom Carter', 290, '3–4 hours', '/real-tattoos/tattoo-35.jpg', true),
  (34, 'Ornamental Art', 'Geometric', 'Studio Archive', 200, '2 hours', '/real-tattoos/tattoo-36.png', true)
  on conflict (catalog_id) do update set
    title = excluded.title,
    style = excluded.style,
    artist_name = excluded.artist_name,
    price = excluded.price,
    duration = excluded.duration,
    image_url = excluded.image_url,
    available = excluded.available;
