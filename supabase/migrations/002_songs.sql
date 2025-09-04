-- -----------------------------
-- Songs table migration
-- -----------------------------

-- Create table if it doesn't exist
CREATE TABLE IF NOT EXISTS public.songs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    artist text,
    lyrics text,
    is_public boolean NOT NULL DEFAULT false,
    user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
    slug text,
    created_at timestamptz NOT NULL DEFAULT now(),
    updated_at timestamptz NOT NULL DEFAULT now()
);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION public.set_updated_at()
RETURNS trigger AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS set_updated_at ON public.songs;
CREATE TRIGGER set_updated_at
BEFORE UPDATE ON public.songs
FOR EACH ROW
EXECUTE FUNCTION public.set_updated_at();

-- Enable Row Level Security
ALTER TABLE public.songs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "public read access" ON public.songs;
DROP POLICY IF EXISTS "users can insert their own rows" ON public.songs;
DROP POLICY IF EXISTS "users can update their own rows" ON public.songs;
DROP POLICY IF EXISTS "users can delete their own rows" ON public.songs;

-- Public read access
CREATE POLICY "public read access"
ON public.songs
FOR SELECT
USING (true);

-- Insert own row (authenticated only)
CREATE POLICY "users can insert their own rows"
ON public.songs
FOR INSERT
TO authenticated
WITH CHECK (auth.uid() = user_id);

-- Update own row (authenticated only)
CREATE POLICY "users can update their own rows"
ON public.songs
FOR UPDATE
TO authenticated
USING (auth.uid() = user_id);

-- Delete own row (authenticated only)
CREATE POLICY "users can delete their own rows"
ON public.songs
FOR DELETE
TO authenticated
USING (auth.uid() = user_id);

-- -----------------------------
-- Slug generation per user
-- -----------------------------

CREATE OR REPLACE FUNCTION public.generate_slug()
RETURNS trigger AS $$
DECLARE
  base_slug text;
  unique_slug text;
  counter int := 1;
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    -- Generate base slug from title
    base_slug := lower(regexp_replace(NEW.title, '\s+', '-', 'g'));
    unique_slug := base_slug;

    -- Ensure slug is unique per user
    WHILE EXISTS (
      SELECT 1 FROM public.songs
      WHERE user_id = NEW.user_id AND slug = unique_slug AND id <> NEW.id
    ) LOOP
      unique_slug := base_slug || '-' || counter;
      counter := counter + 1;
    END LOOP;

    NEW.slug := unique_slug;
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS generate_slug ON public.songs;
CREATE TRIGGER generate_slug
BEFORE INSERT ON public.songs
FOR EACH ROW
EXECUTE FUNCTION public.generate_slug();
