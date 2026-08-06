-- Add translated tags columns for blogs
ALTER TABLE public.blogs ADD COLUMN tags_ar jsonb DEFAULT '[]'::jsonb;
ALTER TABLE public.blogs ADD COLUMN tags_ru jsonb DEFAULT '[]'::jsonb;