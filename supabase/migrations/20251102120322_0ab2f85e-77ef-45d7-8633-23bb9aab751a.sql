-- Add year_built column to properties table
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS year_built INTEGER;