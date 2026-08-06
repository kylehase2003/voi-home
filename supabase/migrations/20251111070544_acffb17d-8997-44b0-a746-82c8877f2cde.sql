-- Add map embed URL field to properties table
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS map_embed_url TEXT;

COMMENT ON COLUMN public.properties.map_embed_url IS 'Google Maps or other map service embed URL for the property location';