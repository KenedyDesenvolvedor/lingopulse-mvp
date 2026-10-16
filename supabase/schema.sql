-- Execute uma vez no SQL Editor do seu projeto Supabase.
create table if not exists public.lingopulse_coin_wallets (
  player_id uuid primary key,
  balance integer not null default 0 check (balance >= 0),
  updated_at timestamptz not null default now()
);

create table if not exists public.lingopulse_coin_orders (
  id uuid primary key,
  player_id uuid not null,
  pack_id text not null,
  coin_amount integer not null check (coin_amount > 0),
  amount_cents integer not null check (amount_cents > 0),
  currency text not null default 'BRL' check (currency = 'BRL'),
  status text not null default 'pending' check (status in ('pending', 'approved', 'refunded', 'checkout_error')),
  preference_id text unique,
  mp_payment_id text unique,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  refunded_at timestamptz
);

create table if not exists public.lingopulse_checkout_attempts (
  id bigint generated always as identity primary key,
  player_id uuid not null,
  created_at timestamptz not null default now()
);
create table if not exists public.lingopulse_life_grants (
  id uuid primary key default gen_random_uuid(),
  player_id uuid not null,
  created_at timestamptz not null default now(),
  redeemed_at timestamptz
);
create index if not exists lingopulse_life_grants_player_pending_idx
  on public.lingopulse_life_grants (player_id, created_at)
  where redeemed_at is null;
create index if not exists lingopulse_checkout_attempts_player_time_idx
  on public.lingopulse_checkout_attempts (player_id, created_at desc);

alter table public.lingopulse_coin_wallets enable row level security;
alter table public.lingopulse_coin_orders enable row level security;
alter table public.lingopulse_checkout_attempts enable row level security;
alter table public.lingopulse_life_grants enable row level security;
revoke all on public.lingopulse_coin_wallets from anon, authenticated;
revoke all on public.lingopulse_coin_orders from anon, authenticated;
revoke all on public.lingopulse_checkout_attempts from anon, authenticated;
revoke all on public.lingopulse_life_grants from anon, authenticated;
grant all on public.lingopulse_coin_wallets to service_role;
grant all on public.lingopulse_coin_orders to service_role;
grant all on public.lingopulse_checkout_attempts to service_role;
grant all on public.lingopulse_life_grants to service_role;

create or replace function public.guard_lingopulse_checkout(p_player_id uuid)
returns table (allowed boolean, retry_after_seconds integer)
language plpgsql
security definer
set search_path = ''
as $$
declare
  attempt_count integer;
  oldest_attempt timestamptz;
begin
  insert into public.lingopulse_coin_wallets (player_id, balance)
  values (p_player_id, 0)
  on conflict (player_id) do nothing;
  perform 1 from public.lingopulse_coin_wallets w where w.player_id = p_player_id for update;
  delete from public.lingopulse_checkout_attempts a
    where a.player_id = p_player_id and a.created_at < now() - interval '1 day';
  select count(*)::integer, min(a.created_at)
    into attempt_count, oldest_attempt
    from public.lingopulse_checkout_attempts a
    where a.player_id = p_player_id and a.created_at > now() - interval '5 minutes';
  if attempt_count >= 3 then
    return query select false, greatest(1, ceil(extract(epoch from (oldest_attempt + interval '5 minutes' - now())))::integer);
    return;
  end if;
  insert into public.lingopulse_checkout_attempts (player_id) values (p_player_id);
  return query select true, 0;
end;
$$;

create or replace function public.fulfill_lingopulse_coin_order(
  p_order_id uuid,
  p_payment_id text,
  p_amount_cents integer,
  p_currency text
) returns table (balance integer, credited boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  selected_order public.lingopulse_coin_orders%rowtype;
  new_balance integer;
begin
  select * into selected_order
  from public.lingopulse_coin_orders
  where id = p_order_id
  for update;

  if not found then raise exception 'order_not_found'; end if;
  if selected_order.status = 'approved' then
    if selected_order.mp_payment_id <> p_payment_id then raise exception 'order_already_paid'; end if;
    select w.balance into new_balance from public.lingopulse_coin_wallets w where w.player_id = selected_order.player_id;
    return query select coalesce(new_balance, 0), false;
    return;
  end if;
  if selected_order.status <> 'pending'
    or selected_order.amount_cents <> p_amount_cents
    or selected_order.currency <> p_currency
    or p_currency <> 'BRL'
    or exists (select 1 from public.lingopulse_coin_orders o where o.mp_payment_id = p_payment_id and o.id <> p_order_id)
  then raise exception 'payment_does_not_match_order'; end if;

  insert into public.lingopulse_coin_wallets (player_id, balance)
  values (selected_order.player_id, selected_order.coin_amount)
  on conflict (player_id) do update
    set balance = public.lingopulse_coin_wallets.balance + excluded.balance,
        updated_at = now()
  returning public.lingopulse_coin_wallets.balance into new_balance;

  update public.lingopulse_coin_orders
    set status = 'approved', mp_payment_id = p_payment_id, updated_at = now()
    where id = p_order_id;
  return query select new_balance, true;
end;
$$;

create or replace function public.spend_lingopulse_paid_coins(p_player_id uuid, p_amount integer)
returns table (balance integer, spent boolean, life_grant_id uuid)
language plpgsql
security definer
set search_path = ''
as $$
declare
  current_balance integer;
begin
  if p_amount <> 15 then raise exception 'unsupported_purchase'; end if;
  insert into public.lingopulse_coin_wallets (player_id, balance)
  values (p_player_id, 0)
  on conflict (player_id) do nothing;
  select w.balance into current_balance
  from public.lingopulse_coin_wallets w
  where w.player_id = p_player_id
  for update;
  if current_balance < p_amount then return query select current_balance, false, null::uuid; return; end if;
  update public.lingopulse_coin_wallets
    set balance = balance - p_amount, updated_at = now()
    where player_id = p_player_id
    returning public.lingopulse_coin_wallets.balance into current_balance;
  insert into public.lingopulse_life_grants (player_id) values (p_player_id)
    returning public.lingopulse_life_grants.id into life_grant_id;
  return query select current_balance, true, life_grant_id;
end;
$$;

create or replace function public.ack_lingopulse_life_grant(p_player_id uuid, p_grant_id uuid)
returns boolean
language plpgsql
security definer
set search_path = ''
as $$
declare
  updated_count integer;
begin
  update public.lingopulse_life_grants
    set redeemed_at = now()
    where id = p_grant_id and player_id = p_player_id and redeemed_at is null;
  get diagnostics updated_count = row_count;
  return updated_count = 1;
end;
$$;

create or replace function public.reverse_lingopulse_coin_order(p_order_id uuid, p_payment_id text)
returns table (balance integer, reversed boolean)
language plpgsql
security definer
set search_path = ''
as $$
declare
  selected_order public.lingopulse_coin_orders%rowtype;
  new_balance integer;
begin
  select * into selected_order
  from public.lingopulse_coin_orders
  where id = p_order_id
  for update;
  if not found or selected_order.status <> 'approved' or selected_order.mp_payment_id <> p_payment_id then
    return query select 0, false;
    return;
  end if;
  update public.lingopulse_coin_wallets
    set balance = greatest(0, balance - selected_order.coin_amount), updated_at = now()
    where player_id = selected_order.player_id
    returning public.lingopulse_coin_wallets.balance into new_balance;
  update public.lingopulse_coin_orders
    set status = 'refunded', refunded_at = now(), updated_at = now()
    where id = p_order_id;
  return query select coalesce(new_balance, 0), true;
end;
$$;

revoke all on function public.fulfill_lingopulse_coin_order(uuid, text, integer, text) from public, anon, authenticated;
revoke all on function public.spend_lingopulse_paid_coins(uuid, integer) from public, anon, authenticated;
revoke all on function public.ack_lingopulse_life_grant(uuid, uuid) from public, anon, authenticated;
revoke all on function public.reverse_lingopulse_coin_order(uuid, text) from public, anon, authenticated;
revoke all on function public.guard_lingopulse_checkout(uuid) from public, anon, authenticated;
grant execute on function public.fulfill_lingopulse_coin_order(uuid, text, integer, text) to service_role;
grant execute on function public.spend_lingopulse_paid_coins(uuid, integer) to service_role;
grant execute on function public.ack_lingopulse_life_grant(uuid, uuid) to service_role;
grant execute on function public.reverse_lingopulse_coin_order(uuid, text) to service_role;
grant execute on function public.guard_lingopulse_checkout(uuid) to service_role;
