CREATE OR REPLACE VIEW public.public_profiles AS
SELECT
  id,
  username,
  full_name,
  avatar_url,
  website,
  created_at
FROM public.profiles;

GRANT SELECT ON public.public_profiles TO anon, authenticated;
REVOKE INSERT, UPDATE, DELETE ON public.public_profiles FROM anon, authenticated;