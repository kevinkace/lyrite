-- Seed the local Supabase database with the requested demo user and songs.
-- The user is anchored to the row data in profiles_rows.json and is assigned the premium tier.

BEGIN;

INSERT INTO auth.users (
  id,
  email,
  encrypted_password,
  raw_user_meta_data,
  is_sso_user,
  is_anonymous,
  created_at,
  updated_at
)
VALUES (
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  'kevin@example.com',
  '$2a$10$dummy.password.hash.for.seed.user',
  jsonb_build_object(
    'full_name', 'Kevin Cameron',
    'avatar_url', 'https://avatars.githubusercontent.com/u/532448?v=4'
  ),
  false,
  false,
  '2025-08-30 14:40:37+00'::timestamptz,
  '2025-10-11 18:01:03+00'::timestamptz
)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  encrypted_password = EXCLUDED.encrypted_password,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data,
  updated_at = EXCLUDED.updated_at;

-- The auth user creation trigger creates a profile row. This explicit update then
-- maps that profile to the premium tier from the same tiers enum seed data.
UPDATE public.profiles
SET
  full_name = 'Kevin Cameron',
  avatar_url = 'https://avatars.githubusercontent.com/u/532448?v=4',
  website = NULL,
  username = NULL,
  created_at = '2025-08-30 14:40:37+00'::timestamptz,
  updated_at = '2025-10-11 18:01:03+00'::timestamptz,
  tier_id = (
    SELECT id
    FROM public.tiers
    WHERE name = 'premium'
  )
WHERE id = 'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5';

-- The song row trigger derives user_id from auth.uid(), which is unavailable
-- inside a local db reset seed transaction. Disable the trigger for this seed
-- file and pass user_id explicitly in the INSERT rows.
ALTER TABLE public.songs DISABLE TRIGGER on_song_insert;

INSERT INTO public.songs (title, artist, is_public, user_id, created_at, updated_at, slug, lyrics)
VALUES
(
  'Fall In',
  'Not Alive',
  true,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'fall-in',
  $$Monday comes and I can't be fucked
give me another chance and I'll do it again
Or maybe I can't or maybe I won't
Thank god for the holes in my boat

(pre-chorus)
sinking
or bailing
it won't help

(chorus)
The water bites at my feet
inching higher up my legs
feeling the pull
dive down you can't fight it

(verse 2)
weightless with a 1000 lbs of water above me
infinite sinking swelling swaying
colder through my veins
but I'm leaving myself behind to become one

(pre-chorus)
sinking
or bailing
it won't help

(chorus)
The water bites at my feet
inching higher up my legs
feeling the pull
dive down you can't fight it

(outro)
but the bottom$$
),
(
  'Am I',
  'Not Alive',
  true,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'am-i',
  $$Here we go again
Down the path, down down down
Is this better that a machine could do?
Am I just a machine that can do better?

(pre-chorus)
oh no oh no
no no no
yes yes yes

(chorus)
Who's a machine
Whose machine is this
Who's a machine
Whose machine is this?

(verse 2)
Again we go again
Up the path, up up up
Is this better that a machine could do?
Am I just a machine that can do better?

(pre-chorus)
oh no oh no
no no no
yes yes yes

(chorus)
Who's a machine
Whose machine is this
Who's a machine
Whose machine is this?$$
),
(
  'Adherence',
  'Not Alive',
  true,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'adherence',
  $$I can't bring myself
To do the things I need to do
One thing after another
Wasting away the hours in a day

(pre-chorus)
But what about
If I just

(chorus)
Turn it off
Away from here
I can't be near it
Need to fear it

(verse 2)
Help me save myself
I can't do it, I need you
I need more help than you
Wasting away the hours in a day

(pre-chorus)
But what about
If I just

(chorus)
Turn it off
Away from here
I can't be near it
Need to fear it$$
);

ALTER TABLE public.songs ENABLE TRIGGER on_song_insert;

COMMIT;
