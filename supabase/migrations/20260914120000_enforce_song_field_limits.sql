-- supabase/migrations/<timestamp>_enforce_song_field_limits.sql

ALTER TABLE public.songs
  DROP CONSTRAINT IF EXISTS lyrics_length_limit;

ALTER TABLE public.songs
  ADD CONSTRAINT title_length_limit CHECK ((char_length(title) <= 100)),
  ADD CONSTRAINT artist_length_limit CHECK ((char_length(artist) <= 100)),
  ADD CONSTRAINT lyrics_length_limit CHECK ((char_length(lyrics) <= 2000));
