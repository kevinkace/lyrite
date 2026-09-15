-- supabase/migrations/<timestamp>_add_user_tiers.sql

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_type WHERE typname = 'user_tier_name') THEN
    CREATE TYPE public.user_tier_name AS ENUM ('free', 'pro', 'premium');
  END IF;
END
$$;

CREATE TABLE IF NOT EXISTS public.tiers (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  name public.user_tier_name NOT NULL,
  price_cents integer NOT NULL DEFAULT 0 CHECK (price_cents >= 0),
  billing_period text NOT NULL DEFAULT 'lifetime' CHECK (billing_period IN ('lifetime', 'monthly')),
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  CONSTRAINT tiers_pkey PRIMARY KEY (id),
  CONSTRAINT tiers_name_key UNIQUE (name)
);

ALTER TABLE public.tiers
  ENABLE ROW LEVEL SECURITY;

CREATE POLICY "tiers are viewable by everyone"
  ON public.tiers
  FOR SELECT
  TO PUBLIC
  USING (true);

INSERT INTO public.tiers (name, price_cents, billing_period)
VALUES
  ('free', 0, 'lifetime'),
  ('pro', 500, 'lifetime'),
  ('premium', 1000, 'monthly')
ON CONFLICT (name) DO NOTHING;

ALTER TABLE public.profiles
  ADD COLUMN IF NOT EXISTS tier_id uuid;

UPDATE public.profiles AS p
SET tier_id = t.id
FROM public.tiers AS t
WHERE p.tier_id IS NULL
  AND t.name = 'free';

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_constraint
    WHERE conname = 'profiles_tier_id_fkey'
  ) THEN
    ALTER TABLE public.profiles
      ADD CONSTRAINT profiles_tier_id_fkey
      FOREIGN KEY (tier_id)
      REFERENCES public.tiers(id)
      ON DELETE RESTRICT;
  END IF;
END
$$;

ALTER TABLE public.profiles
  ALTER COLUMN tier_id SET NOT NULL;

CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO ''
AS $function$
begin
  insert into public.profiles (id, full_name, avatar_url, tier_id)
  select new.id,
         new.raw_user_meta_data->>'full_name',
         new.raw_user_meta_data->>'avatar_url',
         t.id
  from public.tiers t
  where t.name = 'free';
  return new;
end;
$function$;

CREATE OR REPLACE TRIGGER tiers_set_updated_at
  BEFORE UPDATE ON public.tiers
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
