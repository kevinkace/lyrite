-- supabase/migrations/<timestamp>_profiles_store_tier_name.sql

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS tier_name public.user_tier_name;

UPDATE public.profiles AS p
SET tier_name = t.name
FROM public.tiers AS t
WHERE p.tier_id IS NOT NULL
  AND t.id = p.tier_id;

DO $$
BEGIN
  IF EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'profiles_tier_id_fkey'
  ) THEN
    ALTER TABLE public.profiles
      DROP CONSTRAINT profiles_tier_id_fkey;
  END IF;
END
$$;

ALTER TABLE public.profiles
  DROP COLUMN IF EXISTS tier_id;

ALTER TABLE public.profiles
  ALTER COLUMN tier_name SET NOT NULL;

CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO ''
AS $function$
begin
  insert into public.profiles (id, full_name, avatar_url, tier_name)
  select new.id,
         new.raw_user_meta_data->>'full_name',
         new.raw_user_meta_data->>'avatar_url',
         'free'::public.user_tier_name;
  return new;
end;
$function$;
