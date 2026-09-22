ALTER TABLE public.songs
ADD COLUMN featured boolean NOT NULL DEFAULT false;

CREATE INDEX songs_featured_created_at_idx
ON public.songs (featured, created_at);

CREATE OR REPLACE FUNCTION public.prevent_user_featured_songs()
RETURNS trigger
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path TO ''
AS $function$
BEGIN
	IF (select auth.role()) = 'authenticated' THEN
		IF TG_OP = 'INSERT' AND NEW.featured THEN
			RAISE EXCEPTION 'Users cannot create featured songs';
		END IF;

		IF TG_OP = 'UPDATE' AND NEW.featured IS DISTINCT FROM OLD.featured THEN
			RAISE EXCEPTION 'Users cannot change song featured status';
		END IF;
	END IF;

	RETURN NEW;
END;
$function$;

CREATE TRIGGER prevent_user_featured_songs
	BEFORE INSERT OR UPDATE OF featured ON public.songs
	FOR EACH ROW
	EXECUTE FUNCTION public.prevent_user_featured_songs();

DROP POLICY IF EXISTS "users can insert their own rows" ON public.songs;

CREATE POLICY "users can insert their own rows"
	ON public.songs
	FOR INSERT
	TO authenticated
	WITH CHECK (
		auth.uid() = user_id
		AND featured = false
	);