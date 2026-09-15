ALTER TABLE public.profiles
  ALTER COLUMN created_at SET DEFAULT now();

ALTER TABLE public.profiles
  ALTER COLUMN updated_at SET DEFAULT now();

UPDATE public.profiles
SET created_at = COALESCE(created_at, now()),
    updated_at = COALESCE(updated_at, now())
WHERE created_at IS NULL OR updated_at IS NULL;

DROP TRIGGER IF EXISTS profiles_set_updated_at ON public.profiles;

CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO ''
AS $function$
begin
  insert into public.profiles (id, full_name, avatar_url, tier_name, created_at, updated_at)
  select new.id,
         new.raw_user_meta_data->>'full_name',
         new.raw_user_meta_data->>'avatar_url',
         'free'::public.user_tier_name,
         now(),
         now();
  return new;
end;
$function$;

CREATE TRIGGER profiles_set_updated_at
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();
