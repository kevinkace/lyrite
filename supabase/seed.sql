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

-- Add a repeatable set of demo accounts with song counts ranging from zero to ten.
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
SELECT
  md5('lyrite-demo-user-' || generated.user_number::text)::uuid,
  format('demo%s@example.com', lpad(generated.user_number::text, 2, '0')),
  '$2a$10$dummy.password.hash.for.seed.user',
  jsonb_build_object('full_name', format('Demo User %s', lpad(generated.user_number::text, 2, '0'))),
  false,
  false,
  now(),
  now()
FROM generate_series(1, 15) AS generated(user_number)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  encrypted_password = EXCLUDED.encrypted_password,
  raw_user_meta_data = EXCLUDED.raw_user_meta_data,
  updated_at = EXCLUDED.updated_at;

UPDATE public.profiles AS profile
SET
  full_name = format('Demo User %s', lpad(generated.user_number::text, 2, '0')),
  username = NULL,
  website = NULL
FROM generate_series(1, 15) AS generated(user_number)
WHERE profile.id = md5('lyrite-demo-user-' || generated.user_number::text)::uuid;

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
),
(
  '96b9fa4f-0f94-4ed7-b4eb-4ab1dd2d1d12',
  'Neon Rooftops',
  'Luna Harbor',
  true,
  true,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'neon-rooftops',
  $$Neon lights on the downtown train,
Paint the windows silver rain.
We were chasing every spark,
With our names still in the dark.

You were a heartbeat in the haze,
Turning every mile to blaze.
Now the city hums our tune,
And the night is ours to bloom.$$,
  $json$
  [
    {"id": 0, "text": "Neon lights on the downtown train,\nPaint the windows silver rain.\nWe were chasing every spark,\nWith our names still in the dark.", "style": {"color": 3}},
    {"id": 1, "text": "You were a heartbeat in the haze,\nTurning every mile to blaze.\nNow the city hums our tune,\nAnd the night is ours to bloom.", "style": {"color": 1}}
  ]
  $json$::jsonb,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
),
(
  '7d2d7f91-d34c-49f1-bca8-578684f96dd2',
  'Lanterns in the Rain',
  'Cora Vale',
  true,
  true,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'lanterns-in-the-rain',
  $$Streetlamps glow like little moons,
Dripping silver on the stones.
We were walking, warm and slow,
While the whole world drifted low.

Every puddle held a sky,
Every step became a sigh.
If the storm should pass us by,
I will still be yours tonight.$$,
  $json$
  [
    {"id": 0, "text": "Streetlamps glow like little moons,\nDripping silver on the stones.\nWe were walking, warm and slow,\nWhile the whole world drifted low.", "style": {"color": 2}},
    {"id": 1, "text": "Every puddle held a sky,\nEvery step became a sigh.\nIf the storm should pass us by,\nI will still be yours tonight.", "style": {"color": 5}}
  ]
  $json$::jsonb,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
),
(
  '18c5b5d0-5f6a-4d56-9d3a-91d9f8dfba44',
  'Velvet Sunset Run',
  'The North Line',
  true,
  false,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'velvet-sunset-run',
  $$The road turned rose before the dark,
A ribbon of gold in our hands.
We flew with the wind behind us,
Like all our old fears were gone.

The horizon wore a soft blue fire,
And every mile felt new again.
When the sun went down, we kept running,
Toward the music in the air.$$,
  $json$
  [
    {"id": 0, "text": "The road turned rose before the dark,\nA ribbon of gold in our hands.\nWe flew with the wind behind us,\nLike all our old fears were gone.", "style": {"color": 4}},
    {"id": 1, "text": "The horizon wore a soft blue fire,\nAnd every mile felt new again.\nWhen the sun went down, we kept running,\nToward the music in the air.", "style": {"color": 0}}
  ]
  $json$::jsonb,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
),
(
  '22d3e303-98aa-45ed-8e34-085f6ae13080',
  'Glass Horizon',
  'Mira Sol',
  true,
  true,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'glass-horizon',
  $$We chased a line of blue on fire,
Across the waking sea.
Hands full of morning, hearts full of wonder,
We called it destiny.

The waves kept breaking into light,
Turned silver in the breeze.
If this is all we ever know,
Then let it be a dream.$$,
  $json$
  [
    {"id": 0, "text": "We chased a line of blue on fire,\nAcross the waking sea.\nHands full of morning, hearts full of wonder,\nWe called it destiny.", "style": {"color": 3}},
    {"id": 1, "text": "The waves kept breaking into light,\nTurned silver in the breeze.\nIf this is all we ever know,\nThen let it be a dream.", "style": {"color": 1}}
  ]
  $json$::jsonb,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
),
(
  '8acd1119-28ff-4db2-bfdd-50cf1a3e89e9',
  'Cedar & Copper',
  'Juniper Bloom',
  true,
  false,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'cedar-and-copper',
  $$The cedar breathes in the golden dust,
The copper creek sings low.
We learned the shape of home in the quiet,
In the way the wild winds go.

I carry a little piece of that place,
In the pockets of my coat.
It warms the long nights when the world is loud,
And everything feels remote.$$,
  $json$
  [
    {"id": 0, "text": "The cedar breathes in the golden dust,\nThe copper creek sings low.\nWe learned the shape of home in the quiet,\nIn the way the wild winds go.", "style": {"color": 2}},
    {"id": 1, "text": "I carry a little piece of that place,\nIn the pockets of my coat.\nIt warms the long nights when the world is loud,\nAnd everything feels remote.", "style": {"color": 4}}
  ]
  $json$::jsonb,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
),
(
  'a7f1c4ef-b6e3-4b2d-8cb7-07d973bf7b49',
  'Moonlit Arcade',
  'Sable Echo',
  true,
  true,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'moonlit-arcade',
  $$The quarter glows with tired old stars,
And the pinball dreams begin.
We were a couple of midnight ghosts,
Dancing under flickering skin.

The jukebox hums a river of blue,
Across the vinyl moon.
When the lights go low, we laugh like children,
And the whole world is in tune.$$,
  $json$
  [
    {"id": 0, "text": "The quarter glows with tired old stars,\nAnd the pinball dreams begin.\nWe were a couple of midnight ghosts,\nDancing under flickering skin.", "style": {"color": 1}},
    {"id": 1, "text": "The jukebox hums a river of blue,\nAcross the vinyl moon.\nWhen the lights go low, we laugh like children,\nAnd the whole world is in tune.", "style": {"color": 5}}
  ]
  $json$::jsonb,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
),
(
  '36f120aa-9d13-4fb4-9f08-7f3d37d4fa0d',
  'Summer in Static',
  'The River Hours',
  true,
  false,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'summer-in-static',
  $$Static in the window fan,
A warm and lazy hum.
We were writing summer in the air,
Like a song we almost sung.

The sunset hit the screen in gold,
Then bled into the night.
Every borrowed hour was a spark,
Every promise felt alight.$$,
  $json$
  [
    {"id": 0, "text": "Static in the window fan,\nA warm and lazy hum.\nWe were writing summer in the air,\nLike a song we almost sung.", "style": {"color": 0}},
    {"id": 1, "text": "The sunset hit the screen in gold,\nThen bled into the night.\nEvery borrowed hour was a spark,\nEvery promise felt alight.", "style": {"color": 4}}
  ]
  $json$::jsonb,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
),
(
  'e3c1710a-7c07-4fe8-8a72-0c7f2b02a3d2',
  'Paper Wings',
  'Eden Gray',
  true,
  true,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'paper-wings',
  $$Folded dreams in my coat pocket,
Pressed flat by a thousand miles.
I sent them out with a careless grin,
And watched them learn to fly.

Now every little gust of change,
Carries my name in the wind.
If I fall, I fall toward morning,
And the place where I belong.$$,
  $json$
  [
    {"id": 0, "text": "Folded dreams in my coat pocket,\nPressed flat by a thousand miles.\nI sent them out with a careless grin,\nAnd watched them learn to fly.", "style": {"color": 2}},
    {"id": 1, "text": "Now every little gust of change,\nCarries my name in the wind.\nIf I fall, I fall toward morning,\nAnd the place where I belong.", "style": {"color": 3}}
  ]
  $json$::jsonb,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
),
(
  '4ef370c9-9e47-4e7d-96f5-4907d4d7b30a',
  'Golden Hour Train',
  'Theo Cross',
  true,
  false,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'golden-hour-train',
  $$The rails are warm with afternoon,
The window glass is gold.
We are all just passengers tonight,
Heading toward a softer road.

A siren fades behind the hills,
A chorus in the sky.
And every stop feels like a secret,
Leaving little sparks behind.$$,
  $json$
  [
    {"id": 0, "text": "The rails are warm with afternoon,\nThe window glass is gold.\nWe are all just passengers tonight,\nHeading toward a softer road.", "style": {"color": 4}},
    {"id": 1, "text": "A siren fades behind the hills,\nA chorus in the sky.\nAnd every stop feels like a secret,\nLeaving little sparks behind.", "style": {"color": 0}}
  ]
  $json$::jsonb,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
),
(
  'd222e51d-879a-4db3-9d83-c2490a8c2a4e',
  'After the Fireworks',
  'Ash & Pine',
  true,
  true,
  'ace29b57-c6e4-4d32-abc5-b97a2c96fbb5',
  now(),
  now(),
  'after-the-fireworks',
  $$The night keeps glittering in the grass,
Like someone spilled the stars.
We stand with warm hands under the smoke,
And let the silence carve us new.

The sky is fading into blue,
The echoes still run deep.
If this is the end of the show,
Then hold me close and let it be.$$,
  $json$
  [
    {"id": 0, "text": "The night keeps glittering in the grass,\nLike someone spilled the stars.\nWe stand with warm hands under the smoke,\nAnd let the silence carve us new.", "style": {"color": 3}},
    {"id": 1, "text": "The sky is fading into blue,\nThe echoes still run deep.\nIf this is the end of the show,\nThen hold me close and let it be.", "style": {"color": 1}}
  ]
  $json$::jsonb,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
);

WITH demo_users AS (
  SELECT
    generated.user_number,
    (generated.user_number - 1) % 11 AS song_count,
    md5('lyrite-demo-user-' || generated.user_number::text)::uuid AS user_id
  FROM generate_series(1, 15) AS generated(user_number)
)
INSERT INTO public.songs (
  id,
  title,
  artist,
  is_public,
  featured,
  user_id,
  slug,
  lyrics,
  lyrics_parsed,
  style
)
SELECT
  md5(format('lyrite-demo-song-%s-%s', demo_users.user_number, generated.song_number))::uuid,
  format(
    'Demo Song %s-%s',
    lpad(demo_users.user_number::text, 2, '0'),
    lpad(generated.song_number::text, 2, '0')
  ),
  format('Demo Artist %s', lpad(demo_users.user_number::text, 2, '0')),
  true,
  false,
  demo_users.user_id,
  format('demo-user-%s-song-%s',
    lpad(demo_users.user_number::text, 2, '0'),
    lpad(generated.song_number::text, 2, '0')
  ),
  format(
    'Verse one of demo song %s-%s, a melody carried through the day.%s'
    'Verse two brings a new refrain, and lets the final notes fade away.',
    lpad(demo_users.user_number::text, 2, '0'),
    lpad(generated.song_number::text, 2, '0'),
    E'\n\n'
  ),
  NULL,
  '{"columns": 2, "fontSize": 30, "fontFamily": "Georgia"}'::jsonb
FROM demo_users
CROSS JOIN LATERAL generate_series(1, demo_users.song_count) AS generated(song_number)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  artist = EXCLUDED.artist,
  is_public = EXCLUDED.is_public,
  featured = EXCLUDED.featured,
  user_id = EXCLUDED.user_id,
  slug = EXCLUDED.slug,
  lyrics = EXCLUDED.lyrics,
  lyrics_parsed = EXCLUDED.lyrics_parsed,
  style = EXCLUDED.style;

ALTER TABLE public.songs ENABLE TRIGGER on_song_insert;

COMMIT;
