-- Add new columns to properties table for additional filters
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS furnished BOOLEAN DEFAULT NULL,
ADD COLUMN IF NOT EXISTS gated_community BOOLEAN DEFAULT NULL,
ADD COLUMN IF NOT EXISTS construction_status TEXT DEFAULT NULL;

-- Add check constraint for construction_status
ALTER TABLE public.properties 
ADD CONSTRAINT check_construction_status 
CHECK (construction_status IS NULL OR construction_status IN ('ready', 'under-construction', 'off-plan'));