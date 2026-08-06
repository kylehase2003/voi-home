-- Add long description columns for project information (separate from short description)
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS long_description text;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS long_description_ar text;
ALTER TABLE public.properties ADD COLUMN IF NOT EXISTS long_description_ru text;