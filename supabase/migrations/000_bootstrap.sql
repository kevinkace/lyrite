-- -----------------------------
-- Bootstrap full DB
-- -----------------------------

-- Include profiles table + RLS
\i ./001_profiles.sql

-- Include songs table + RLS + slug trigger
\i ./002_songs.sql
