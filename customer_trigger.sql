-- ============================================================
--  GajananGems — Customer Profiles & Metrics Synchronization
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- 1. Create the customers table to hold unique profiles
create table if not exists public.customers (
  id             bigint generated always as identity primary key,
  first_name     text not null,
  last_name      text not null,
  email          text not null unique,
  phone          text not null,
  address        text not null,
  city           text not null,
  state          text not null,
  pin            text not null,
  country        text not null default 'India',
  
  -- Metrics
  total_orders   integer not null default 0,
  total_spent    numeric(10,2) not null default 0.00,
  last_order_at  timestamptz,
  
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Index for speedy queries on email
create index if not exists customers_email_idx on public.customers(email);

-- Enable Row Level Security (RLS)
-- Crucial: This ensures customer contact/address details are kept completely private
-- and are only accessible by administrative dashboards (using the service_role key).
alter table public.customers enable row level security;

-- 2. Create the Trigger Function to automate synchronization
create or replace function public.sync_customer_from_order()
returns trigger
security definer -- Executes with administrative privileges to bypass RLS restrictions
set search_path = public
as $$
declare
  v_email text;
begin
  v_email := lower(trim(new.email));

  -- Sync/recalculate stats for valid active orders
  if new.status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered') then
    insert into public.customers (
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      state,
      pin,
      country,
      total_orders,
      total_spent,
      last_order_at,
      updated_at
    )
    values (
      new.first_name,
      new.last_name,
      v_email,
      new.phone,
      new.address,
      new.city,
      new.state,
      new.pin,
      new.country,
      1,
      new.total,
      new.created_at,
      now()
    )
    on conflict (email) do update
    set
      first_name    = excluded.first_name,
      last_name     = excluded.last_name,
      phone         = excluded.phone,
      address       = excluded.address,
      city          = excluded.city,
      state         = excluded.state,
      pin           = excluded.pin,
      country       = excluded.country,
      total_orders  = (
        select count(*)::int
        from public.orders
        where lower(trim(email)) = v_email
          and status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered')
      ),
      total_spent   = (
        select coalesce(sum(total), 0.00)
        from public.orders
        where lower(trim(email)) = v_email
          and status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered')
      ),
      last_order_at = greatest(customers.last_order_at, excluded.last_order_at),
      updated_at    = now();

  -- Recalculate stats if an order is cancelled or reverted to pending payment
  elsif new.status in ('cancelled', 'payment_pending') then
    update public.customers
    set
      total_orders  = (
        select count(*)::int
        from public.orders
        where lower(trim(email)) = v_email
          and status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered')
      ),
      total_spent   = (
        select coalesce(sum(total), 0.00)
        from public.orders
        where lower(trim(email)) = v_email
          and status in ('pending', 'confirmed', 'processing', 'shipped', 'delivered')
      ),
      updated_at    = now()
    where email = v_email;
  end if;

  return new;
end;
$$ language plpgsql;

-- 3. Bind the trigger to the orders table
drop trigger if exists trigger_sync_customer on public.orders;
create trigger trigger_sync_customer
after insert or update on public.orders
for each row
execute function public.sync_customer_from_order();
