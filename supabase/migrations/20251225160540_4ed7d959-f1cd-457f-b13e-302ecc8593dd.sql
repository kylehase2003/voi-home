-- Add region column to blogs table for filtering
ALTER TABLE public.blogs 
ADD COLUMN IF NOT EXISTS region text DEFAULT 'turkey';

-- Add a comment to explain the column
COMMENT ON COLUMN public.blogs.region IS 'Region filter: turkey, dubai, or both';