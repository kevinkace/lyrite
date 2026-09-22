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
-- maps that profile to the premium tier name from the same tiers enum seed data.
UPDATE public.profiles
SET
  full_name = 'Kevin Cameron',
  avatar_url = 'https://avatars.githubusercontent.com/u/532448?v=4',
  website = NULL,
  username = NULL,
  created_at = '2025-08-30 14:40:37+00'::timestamptz,
  updated_at = '2025-10-11 18:01:03+00'::timestamptz,
  tier_name = 'premium'
WHERE id = 'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5';

-- The song row trigger derives user_id from auth.uid(), which is unavailable
-- inside a local db reset seed transaction. Disable the trigger for this seed
-- file and pass user_id explicitly in the INSERT rows.
ALTER TABLE public.songs DISABLE TRIGGER on_song_insert;

INSERT INTO public.songs (id, title, artist, is_public, featured, user_id, created_at, updated_at, slug, lyrics, lyrics_parsed, style)
VALUES
(
  'e88ed752-4d37-4cf8-9862-d77c4c23668a',
  'Amazing Grace',
  'John Newton',
  true,
  true,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'amazing-grace',
  $$Amazing grace! how sweet the sound,
  That saved a wretch; like me!
I once was lost, but now am found,
  Was blind, but now I see.

’Twas grace that taught my heart to fear,
  And grace my fears relieved;
How precious did that grace appear
  The hour I first believed!

The Lord hath promised good to me,
  His word my hope secures;
He will my shield and portion be
  As long as life endures.

When we’ve been there ten thousand years,
  Bright shining as the sun,
We’ve no less days to sing God’s praise
  Than when we first begun.$$,
  $json$
  [
    {"id": 0, "text": "Amazing grace! how sweet the sound,\n  That saved a wretch; like me!\nI once was lost, but now am found,\n  Was blind, but now I see.", "style": {"color": 3}},
    {"id": 1, "text": "’Twas grace that taught my heart to fear,\n  And grace my fears relieved;\nHow precious did that grace appear\n  The hour I first believed!", "style": {"color": 5}},
    {"id": 2, "text": "The Lord hath promised good to me,\n  His word my hope secures;\nHe will my shield and portion be\n  As long as life endures.", "style": {"color": 4}},
    {"id": 3, "text": "When we’ve been there ten thousand years,\n  Bright shining as the sun,\nWe’ve no less days to sing God’s praise\n  Than when we first begun.", "style": {"color": 2}}
  ]
  $json$::jsonb,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
),
(
  '1a3cde9f-97a9-4866-80e4-d94f8651a1ce',
  'Singin'' in the Rain',
  'Nacio Herb Brown',
  true,
  true,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'singin''-in-the-rain',
  $$I'm singin' in the rain,
Just singin' in the rain,
What a glorious feeling,
I'm happy again!
I'm laughing at clouds
So dark up above,
The sun's in my heart and I'm ready for love!
Let the stormy clouds chase
Everyone from the place,
Come on with your rain,
I've got a smile on my face!
I'll walk down the lane
With a happy refrain,
Just singin', singin' in the rain!

Why am I smiling and why do I sing?
Why does December seem sunny as Spring?
Why do I get up each morning to start
Happy and head-up with joy in my heart?
Why is each new task a trifle to do?
Because I am living a life full of you!

Hey, I'm singin' in the rain,
Just singin' in the rain,
What a glorious feeling,
I'm happy again!
I'm laughing at clouds
So dark up above,
The sun's in my heart and I'm ready for love!
Let the stormy clouds chase
Everyone from the place,
Come on with your rain,
I've got a smile on my face!
I'll walk down the lane
With a happy refrain,
Just singin', singin' in the rain!$$,
  $json$
  [
    {"id": 0, "text": "I'm singin' in the rain,\nJust singin' in the rain,\nWhat a glorious feeling,\nI'm happy again!", "style": {"color": 0}},
    {"id": 1, "text": "I'm laughing at clouds\nSo dark up above,\nThe sun's in my heart and I'm ready for love!", "style": {"color": 2}},
    {"id": 2, "text": "Let the stormy clouds chase\nEveryone from the place,\nCome on with your rain,\nI've got a smile on my face!", "style": {"color": 4}},
    {"id": 3, "text": "I'll walk down the lane\nWith a happy refrain,\nJust singin', singin' in the rain!", "style": {"color": 0}},
    {"id": 4, "text": "Why am I smiling and why do I sing?\nWhy does December seem sunny as Spring?", "style": {"color": 1}},
    {"id": 5, "text": "Why do I get up each morning to start\nHappy and head-up with joy in my heart?", "style": {"color": 1}},
    {"id": 6, "text": "Why is each new task a trifle to do?\nBecause I am living a life full of you!", "style": {"color": 1}},
    {"id": 7, "text": "Hey, I'm singin' in the rain,\nJust singin' in the rain,\nWhat a glorious feeling,\nI'm happy again!", "style": {"color": 0}},
    {"id": 8, "text": "I'm laughing at clouds\nSo dark up above,\nThe sun's in my heart and I'm ready for love!", "style": {"color": 2}},
    {"id": 9, "text": "Let the stormy clouds chase\nEveryone from the place,\nCome on with your rain,\nI've got a smile on my face!", "style": {}},
    {"id": 10, "text": "I'll walk down the lane\nWith a happy refrain,\nJust singin', singin' in the rain!", "style": {"color": 0}}
  ]
  $json$::jsonb,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
),
(
  '0e68ea92-2635-45bf-8ff6-dd739f5246b5',
  'Take Me Out to the Ball Game',
  'Jack Norworth',
  true,
  true,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'take-me-out-to-the-ball-game',
  $$Katie Casey was baseball mad,
Had the fever and had it bad.
Just to root for the home town crew,
Ev'ry sou[a]
Katie blew.

On a Saturday her young beau
Called to see if she'd like to go
To see a show, but Miss Kate said "No,
I'll tell you what you can do:"

(Chorus)
Take me out to the ball game,
Take me out with the crowd;
Buy me some peanuts and Cracker Jack,
I don't care if I never get back.

Let me root, root, root for the home team
If they don't win, it's a shame.
For it's one, two, three strikes, you're out,
At the old ball game.

Katie Casey saw all the games,
Knew the players by their first names.
Told the umpire he was wrong,
All along,
Good and strong.

When the score was just two to two,
Katie Casey knew what to do,
Just to cheer up the boys she knew,
She made the gang sing this song:$$,
  $json$
  [
  {"id": 0, "text": "Katie Casey was baseball mad,\nHad the fever and had it bad.\nJust to root for the home town crew,\nEv'ry sou[a]\nKatie blew.", "style": {"color": 2}},
  {"id": 1, "text": "On a Saturday her young beau\nCalled to see if she'd like to go\nTo see a show, but Miss Kate said \"No,\nI'll tell you what you can do:\"", "style": {"color": 0}},
  {"id": 2, "text": "(Chorus)\nTake me out to the ball game,\nTake me out with the crowd;\nBuy me some peanuts and Cracker Jack,\nI don't care if I never get back.", "style": {"color": 1}},
  {"id": 3, "text": "Let me root, root, root for the home team\nIf they don't win, it's a shame.\nFor it's one, two, three strikes, you're out,\nAt the old ball game.", "style": {"color": 1}},
  {"id": 4, "text": "Katie Casey saw all the games,\nKnew the players by their first names.\nTold the umpire he was wrong,\nAll along,\nGood and strong.", "style": {"color": 2}},
  {"id": 5, "text": "When the score was just two to two,\nKatie Casey knew what to do,\nJust to cheer up the boys she knew,\nShe made the gang sing this song:", "style": {}}
  ]
  $json$::jsonb,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
);

ALTER TABLE public.songs ENABLE TRIGGER on_song_insert;

COMMIT;
