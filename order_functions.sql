-- ============================================================
--  GajananGems — Order RPC Functions
--  Run this in: Supabase Dashboard → SQL Editor → New Query
-- ============================================================
--
--  WHY: Supabase RLS blocks anon users from using RETURNING
--  after INSERT (it needs SELECT policy). Instead of opening
--  SELECT to all anon users, we use SECURITY DEFINER functions
--  that run with elevated privileges and return only what's needed.
--
--  FUNCTIONS:
--    create_order(...)  → inserts order + items atomically, returns order ID
--    confirm_order(...) → sets status='confirmed' + razorpay_payment_id
--    cancel_order(...)  → sets status='cancelled' (only from payment_pending)
-- ============================================================

-- 0. Add razorpay_payment_id column if not already there
--    (skip if you already ran the column migration)
do $$
begin
  if not exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name   = 'orders'
      and column_name  = 'razorpay_payment_id'
  ) then
    alter table public.orders add column razorpay_payment_id text;
  end if;
end $$;

-- ─── 1. create_order ─────────────────────────────────────────────────────────
-- Inserts an order + all its items in a single transaction.
-- Returns the new order's integer ID.
create or replace function public.create_order(
  p_first_name  text,
  p_last_name   text,
  p_email       text,
  p_phone       text,
  p_address     text,
  p_city        text,
  p_state       text,
  p_pin         text,
  p_country     text,
  p_notes       text,
  p_subtotal    numeric,
  p_total       numeric,
  p_items       jsonb    -- [{slug, product_id, title, price, qty, size}]
)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare
  v_id bigint;
begin
  -- Insert order
  insert into orders (
    first_name, last_name, email, phone,
    address, city, state, pin, country, notes,
    subtotal, shipping, total,
    payment_method, status
  ) values (
    p_first_name, p_last_name, lower(trim(p_email)), p_phone,
    p_address, p_city, p_state, p_pin, p_country, nullif(trim(p_notes), ''),
    p_subtotal, 0, p_total,
    'razorpay', 'payment_pending'
  )
  returning id into v_id;

  -- Insert order items (from JSONB array)
  insert into order_items (order_id, product_id, slug, title, price, qty, size)
  select
    v_id,
    nullif(item ->> 'product_id', '')::bigint,
    item ->> 'slug',
    item ->> 'title',
    (item ->> 'price')::numeric,
    (item ->> 'qty')::int,
    nullif(item ->> 'size', '')
  from jsonb_array_elements(p_items) as item;

  return v_id;
end;
$$;

-- ─── 2. confirm_order ────────────────────────────────────────────────────────
-- Called after Razorpay payment.success — marks order confirmed.
create or replace function public.confirm_order(
  p_order_id   bigint,
  p_payment_id text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update orders
  set
    status               = 'confirmed',
    razorpay_payment_id  = p_payment_id
  where id = p_order_id
    and status = 'payment_pending';   -- guard: only confirm pending orders
end;
$$;

-- ─── 3. cancel_order ─────────────────────────────────────────────────────────
-- Called when user dismisses Razorpay modal without paying.
create or replace function public.cancel_order(p_order_id bigint)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  update orders
  set status = 'cancelled'
  where id = p_order_id
    and status = 'payment_pending';   -- guard: only cancel pending orders
end;
$$;

-- ─── 4. Grant execute permissions ────────────────────────────────────────────
grant execute on function public.create_order  to anon, authenticated;
grant execute on function public.confirm_order to anon, authenticated;
grant execute on function public.cancel_order  to anon, authenticated;
