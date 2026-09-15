-- supabase/migrations/<timestamp>_tier_aware_song_rls.sql

DROP POLICY IF EXISTS "limit songs per user" ON public.songs;
DROP POLICY IF EXISTS "users can insert their own rows" ON public.songs;
DROP POLICY IF EXISTS "users can update their own rows" ON public.songs;

ALTER TABLE public.songs
  DROP CONSTRAINT IF EXISTS lyrics_length_limit;

CREATE OR REPLACE FUNCTION public.song_count_limit_for_tier(p_tier public.user_tier_name)
RETURNS integer
LANGUAGE sql
STABLE
AS $function$
  SELECT CASE p_tier
    WHEN 'pro' THEN 100
    WHEN 'premium' THEN 1000
    ELSE 10
  END;
$function$;

CREATE OR REPLACE FUNCTION public.song_char_limit_for_tier(p_tier public.user_tier_name)
RETURNS integer
LANGUAGE sql
STABLE
AS $function$
  SELECT CASE p_tier
    WHEN 'pro' THEN 5000
    WHEN 'premium' THEN 9999
    ELSE 2000
  END;
$function$;

CREATE POLICY "users can insert their own rows"
  ON public.songs
  FOR INSERT
  TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND (
      SELECT count(*)
      FROM public.songs s
      WHERE s.user_id = auth.uid()
    ) < public.song_count_limit_for_tier(
      COALESCE((SELECT p.tier_name FROM public.profiles p WHERE p.id = auth.uid()), 'free'::public.user_tier_name)
    )
    AND (
      CASE COALESCE((SELECT p.tier_name FROM public.profiles p WHERE p.id = auth.uid()), 'free'::public.user_tier_name)
        WHEN 'pro' THEN char_length(lyrics) <= 5000
        WHEN 'premium' THEN char_length(lyrics) <= 9999
        ELSE char_length(lyrics) <= 2000
      END
    )
  );

CREATE POLICY "users can update their own rows"
  ON public.songs
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (
    auth.uid() = user_id
    AND (
      CASE COALESCE((SELECT p.tier_name FROM public.profiles p WHERE p.id = auth.uid()), 'free'::public.user_tier_name)
        WHEN 'pro' THEN char_length(lyrics) <= 5000
        WHEN 'premium' THEN char_length(lyrics) <= 9999
        ELSE char_length(lyrics) <= 2000
      END
    )
  );
