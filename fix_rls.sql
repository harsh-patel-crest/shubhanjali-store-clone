-- ============================================================
--  GajananGems — Fix Row Level Security (RLS) Policies
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================

-- ────────────────────────────────────────────────────────────
-- 1. ORDERS & ORDER ITEMS POLICIES
-- ────────────────────────────────────────────────────────────

-- Enable RLS
alter table public.orders     enable row level security;
alter table public.order_items enable row level security;

-- A. INSERT policies (allow anyone to place orders)
alter policy "allow anon insert orders"
  on "public"."orders"
  to anon
  with check (true);

drop policy if exists "allow anon insert order_items" on "public"."order_items";
create policy "allow anon insert order_items"
  on "public"."order_items" for insert
  to anon
  with check (true);

-- B. SELECT policies (needed for checkout RETURNING id and order tracking page)
drop policy if exists "allow anon select orders" on "public"."orders";
create policy "allow anon select orders"
  on "public"."orders" for select
  to anon
  using (true);

drop policy if exists "allow anon select order_items" on "public"."order_items";
create policy "allow anon select order_items"
  on "public"."order_items" for select
  to anon
  using (true);

-- C. UPDATE policy (Crucial: Allows checkout script to update status to 'confirmed' or 'cancelled')
--    Without this, orders stay as 'payment_pending' and never sync to the Customers table.
drop policy if exists "allow anon cancel pending orders" on public.orders;
drop policy if exists "allow anon update own pending orders" on public.orders;
drop policy if exists "allow anon update own orders" on public.orders;

create policy "allow anon update own orders"
  on public.orders for update
  to anon
  using (status in ('payment_pending', 'pending'))
  with check (status in ('confirmed', 'cancelled'));


-- ────────────────────────────────────────────────────────────
-- 2. CATEGORIES POLICIES
-- ────────────────────────────────────────────────────────────

-- Enable RLS on categories (in case it was enabled via Dashboard)
alter table public.categories enable row level security;

-- Allow public read access to categories (fixes the empty "Top Categories" section)
drop policy if exists "Public read categories" on public.categories;
create policy "Public read categories"
  on public.categories for select
  to anon, authenticated
  using (true);
