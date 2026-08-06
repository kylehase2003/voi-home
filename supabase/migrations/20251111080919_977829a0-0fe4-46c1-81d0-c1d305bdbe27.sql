-- Add new fields for property detail sidebar
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS benefit TEXT,
ADD COLUMN IF NOT EXISTS delivery_date TEXT,
ADD COLUMN IF NOT EXISTS title_deed TEXT;