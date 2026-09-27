CREATE TABLE public.setlists (
  id uuid NOT NULL DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL,
  is_public boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT setlists_pkey PRIMARY KEY (id),
  CONSTRAINT setlists_title_length CHECK (char_length(title) BETWEEN 1 AND 100),
  CONSTRAINT setlists_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.profiles(id) ON DELETE CASCADE
);

CREATE TABLE public.setlist_songs (
  setlist_id uuid NOT NULL,
  song_id uuid NOT NULL,
  position integer NOT NULL,
  CONSTRAINT setlist_songs_pkey PRIMARY KEY (setlist_id, song_id),
  CONSTRAINT setlist_songs_position_check CHECK (position >= 0),
  CONSTRAINT setlist_songs_setlist_id_fkey FOREIGN KEY (setlist_id) REFERENCES public.setlists(id) ON DELETE CASCADE,
  CONSTRAINT setlist_songs_song_id_fkey FOREIGN KEY (song_id) REFERENCES public.songs(id) ON DELETE CASCADE
);

CREATE INDEX setlists_user_id_updated_at_idx ON public.setlists (user_id, updated_at DESC);
CREATE INDEX setlist_songs_setlist_id_position_idx ON public.setlist_songs (setlist_id, position);

ALTER TABLE public.setlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.setlist_songs ENABLE ROW LEVEL SECURITY;

CREATE TRIGGER setlists_set_updated_at
  BEFORE UPDATE ON public.setlists
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE OR REPLACE FUNCTION public.setlist_count_limit_for_tier(p_tier public.user_tier_name)
RETURNS integer
LANGUAGE sql
STABLE
AS $function$
  SELECT CASE p_tier
    WHEN 'pro' THEN 10
    WHEN 'premium' THEN 100
    ELSE 3
  END;
$function$;

CREATE POLICY "public setlists are viewable by everyone"
  ON public.setlists FOR SELECT TO public
  USING (is_public OR auth.uid() = user_id);

CREATE POLICY "users can create their own setlists"
  ON public.setlists FOR INSERT TO authenticated
  WITH CHECK (
    auth.uid() = user_id
    AND (
      SELECT count(*)
      FROM public.setlists
      WHERE setlists.user_id = auth.uid()
    ) < public.setlist_count_limit_for_tier(
      COALESCE(public.current_user_tier(), 'free'::public.user_tier_name)
    )
  );

CREATE POLICY "users can update their own setlists"
  ON public.setlists FOR UPDATE TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "users can delete their own setlists"
  ON public.setlists FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "users can view songs in their own setlists"
  ON public.setlist_songs FOR SELECT TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.setlists
    WHERE setlists.id = setlist_songs.setlist_id
      AND setlists.user_id = auth.uid()
  ));

CREATE POLICY "public setlist songs are viewable by everyone"
  ON public.setlist_songs FOR SELECT TO public
  USING (EXISTS (
    SELECT 1 FROM public.setlists
    WHERE setlists.id = setlist_songs.setlist_id
      AND (setlists.is_public OR setlists.user_id = auth.uid())
  ));

CREATE POLICY "users can add their own songs to setlists"
  ON public.setlist_songs FOR INSERT TO authenticated
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.setlists
      WHERE setlists.id = setlist_songs.setlist_id
        AND setlists.user_id = auth.uid()
    )
    AND EXISTS (
      SELECT 1 FROM public.songs
      WHERE songs.id = setlist_songs.song_id
        AND songs.user_id = auth.uid()
    )
  );

CREATE POLICY "users can update songs in their own setlists"
  ON public.setlist_songs FOR UPDATE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.setlists
    WHERE setlists.id = setlist_songs.setlist_id
      AND setlists.user_id = auth.uid()
  ))
  WITH CHECK (EXISTS (
    SELECT 1 FROM public.setlists
    WHERE setlists.id = setlist_songs.setlist_id
      AND setlists.user_id = auth.uid()
  ));

CREATE POLICY "users can remove songs from their own setlists"
  ON public.setlist_songs FOR DELETE TO authenticated
  USING (EXISTS (
    SELECT 1 FROM public.setlists
    WHERE setlists.id = setlist_songs.setlist_id
      AND setlists.user_id = auth.uid()
  ));

GRANT SELECT, INSERT, UPDATE, DELETE ON public.setlists TO authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.setlist_songs TO authenticated;
GRANT SELECT ON public.setlists TO anon;
GRANT SELECT ON public.setlist_songs TO anon;