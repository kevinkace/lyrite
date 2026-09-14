-- supabase/migrations/<timestamp>_limit_songs_to_ten.sql

DROP POLICY "limit songs per user" ON "public"."songs";

CREATE POLICY "limit songs per user" ON "public"."songs"
  FOR INSERT
  TO PUBLIC
  WITH CHECK ((( SELECT count(*) AS count
   FROM public.songs songs_1
  WHERE (songs_1.user_id = auth.uid())) < 10));