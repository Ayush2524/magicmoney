-- Magic Money — lock down public.users
--
-- PROBLEM (verified 2026-07-31): the anon key could INSERT, UPDATE and DELETE
-- rows in public.users. The anon key ships in the browser bundle, so anyone who
-- opened the site could have wiped or forged the user table.
--
-- FIX: reads stay open (the app resolves display_name by party_id); all writes
-- go through service_role only, which bypasses RLS and is server-side.
--
-- Run in: Supabase dashboard -> SQL Editor -> New query -> Run.

begin;

-- 1. Clear whatever permissive policies exist today (names unknown, so loop).
do $$
declare pol record;
begin
  for pol in
    select policyname from pg_policies
    where schemaname = 'public' and tablename = 'users'
  loop
    execute format('drop policy %I on public.users', pol.policyname);
  end loop;
end $$;

-- 2. RLS on. With RLS enabled and no policy for a command, that command is
--    denied for anon/authenticated. service_role bypasses RLS entirely.
alter table public.users enable row level security;

-- 3. Read-only access for the app.
--    NOTE: this exposes every party_id + display_name to anyone with the anon
--    key. If the directory should be private, delete this policy and read the
--    table from your server with the service_role key instead.
create policy users_read_public
  on public.users
  for select
  to anon, authenticated
  using (true);

-- 4. Belt and braces: also remove the underlying table grants, so a future
--    accidental "allow all" policy still can't let the browser write.
revoke insert, update, delete on public.users from anon, authenticated;
grant  select                 on public.users to anon, authenticated;

commit;

-- Verify (expect: rowsecurity = true, exactly one SELECT policy):
--   select relrowsecurity from pg_class where relname = 'users';
--   select policyname, cmd, roles from pg_policies
--     where schemaname = 'public' and tablename = 'users';
--
-- Then re-test from a terminal — both should return 401/403, not 204:
--   curl -X DELETE -H "apikey: <ANON>" -H "Authorization: Bearer <ANON>" \
--     "https://xiygaaywyozuhaospbiw.supabase.co/rest/v1/users?party_id=eq.zzz"
