SET local check_function_bodies = off;

CREATE TABLE "public"."profiles" (
  "id"         uuid                     NOT NULL,
  "updated_at" timestamp with time zone,
  "username"   text,
  "full_name"  text,
  "avatar_url" text,
  "website"    text,
  "created_at" timestamp with time zone,
  CONSTRAINT "profiles_pkey" PRIMARY KEY (id),
  CONSTRAINT "profiles_username_key" UNIQUE (username),
  CONSTRAINT "username_length" CHECK ((char_length(username) >= 3))
);

ALTER TABLE "public"."profiles"
  ENABLE ROW LEVEL SECURITY;

CREATE TABLE "public"."songs" (
  "id"            uuid                     NOT NULL DEFAULT gen_random_uuid(),
  "title"         text                     NOT NULL,
  "artist"        text                     NOT NULL,
  "is_public"     boolean                  NOT NULL DEFAULT false,
  "user_id"       uuid                     NOT NULL,
  "created_at"    timestamp with time zone NOT NULL DEFAULT now(),
  "updated_at"    timestamp with time zone NOT NULL DEFAULT now(),
  "slug"          text                     NOT NULL,
  "lyrics"        text                     NOT NULL,
  "lyrics_parsed" jsonb,
  "style"         jsonb,
  CONSTRAINT "lyrics_length_limit" CHECK ((char_length(lyrics) <= 5000)),
  CONSTRAINT "lyrics_parsed_size_limit" CHECK ((pg_column_size(lyrics_parsed) <= 1000000)),
  CONSTRAINT "lyrics_style_size_limit" CHECK ((pg_column_size(style) <= 1000)),
  CONSTRAINT "songs_pkey" PRIMARY KEY (id),
  CONSTRAINT "unique_slug" UNIQUE (slug)
);

ALTER TABLE "public"."songs"
  ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.generate_song_slug()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
BEGIN
  IF NEW.slug IS NULL THEN
    NEW.slug := LOWER(REGEXP_REPLACE(NEW.title, '\s+', '-', 'g'));
  END IF;
  RETURN NEW;
END;
$function$;

CREATE OR REPLACE FUNCTION public.handle_new_user()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  SET search_path TO ''
  AS $function$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.set_song_user_id()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  SECURITY DEFINER
  AS $function$
begin
  new.user_id := auth.uid();
  return new;
end;
$function$;

CREATE OR REPLACE FUNCTION public.set_updated_at()
  RETURNS TRIGGER
  LANGUAGE plpgsql
  AS $function$
begin
    new.updated_at = now();
    return new;
end;
$function$;

ALTER TABLE "public"."profiles"
  ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;

ALTER TABLE "public"."songs"
  ADD CONSTRAINT "songs_user_id_fkey" FOREIGN KEY (user_id) REFERENCES public.profiles(id);

CREATE UNIQUE INDEX songs_user_slug_unique ON public.songs USING btree (user_id, slug);

CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

CREATE TRIGGER on_song_insert
  BEFORE INSERT ON public.songs
  FOR EACH ROW
  EXECUTE FUNCTION public.set_song_user_id();

CREATE TRIGGER songs_generate_slug
  BEFORE INSERT ON public.songs
  FOR EACH ROW
  EXECUTE FUNCTION public.generate_song_slug();

CREATE TRIGGER songs_set_updated_at
  BEFORE UPDATE ON public.songs
  FOR EACH ROW
  EXECUTE FUNCTION public.set_updated_at();

CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles"
  FOR SELECT
  TO PUBLIC
  USING (true);

CREATE POLICY "Users can insert their own profile." ON "public"."profiles"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((auth.uid() = id));

CREATE POLICY "Users can update own profile." ON "public"."profiles"
  FOR UPDATE
  TO "authenticated"
  USING ((auth.uid() = id));

CREATE POLICY "limit songs per user" ON "public"."songs"
  FOR INSERT
  TO PUBLIC
  WITH CHECK ((( SELECT count(*) AS count
   FROM public.songs songs_1
  WHERE (songs_1.user_id = auth.uid())) < 50));

CREATE POLICY "public read access" ON "public"."songs"
  FOR SELECT
  TO PUBLIC
  USING (((is_public = true) OR (auth.uid() = user_id)));

CREATE POLICY "users can delete their own rows" ON "public"."songs"
  FOR DELETE
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "users can insert their own rows" ON "public"."songs"
  FOR INSERT
  TO "authenticated"
  WITH CHECK ((( SELECT auth.uid() AS uid) = user_id));

CREATE POLICY "users can update their own rows" ON "public"."songs"
  FOR UPDATE
  TO "authenticated"
  USING ((auth.uid() = user_id));

CREATE POLICY "Anyone can upload an avatar." ON "storage"."objects"
  FOR INSERT
  TO PUBLIC
  WITH CHECK ((bucket_id = 'avatars'::text));

CREATE POLICY "Avatar images are publicly accessible." ON "storage"."objects"
  FOR SELECT
  TO PUBLIC
  USING ((bucket_id = 'avatars'::text));

GRANT EXECUTE ON FUNCTION "public"."generate_song_slug"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT EXECUTE ON FUNCTION "public"."handle_new_user"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT EXECUTE ON FUNCTION "public"."set_song_user_id"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT EXECUTE ON FUNCTION "public"."set_updated_at"() TO PUBLIC, "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."profiles" TO "anon", "authenticated", "postgres", "service_role";

GRANT DELETE, INSERT, MAINTAIN, REFERENCES, SELECT, TRIGGER, TRUNCATE, UPDATE ON TABLE "public"."songs" TO "anon", "authenticated", "postgres", "service_role";

