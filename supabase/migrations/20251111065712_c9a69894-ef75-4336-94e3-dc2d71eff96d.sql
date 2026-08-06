-- Add new fields to properties table for enhanced property details
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS property_id TEXT,
ADD COLUMN IF NOT EXISTS completion_date TEXT,
ADD COLUMN IF NOT EXISTS plot_ratio TEXT,
ADD COLUMN IF NOT EXISTS clear_height TEXT,
ADD COLUMN IF NOT EXISTS payment_plans JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS nearby_places JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS floor_plans JSONB DEFAULT '[]'::jsonb,
ADD COLUMN IF NOT EXISTS video_url TEXT;

-- Add comment to clarify structure
COMMENT ON COLUMN public.properties.payment_plans IS 'Array of payment plan objects with structure: [{period: "2 Years", amount: 50000}]';
COMMENT ON COLUMN public.properties.nearby_places IS 'Array of nearby place objects with structure: [{name: "Airport", distance: "10 min drive", icon: "plane"}]';
COMMENT ON COLUMN public.properties.floor_plans IS 'Array of floor plan objects with structure: [{title: "MR-002", subtitle: "Ground Floor", area: "100 m²", image_url: "..."}]';