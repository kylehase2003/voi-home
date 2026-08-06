-- Add latitude and longitude columns to properties table
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS latitude numeric,
ADD COLUMN IF NOT EXISTS longitude numeric;