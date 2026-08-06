-- Add display_order column to blogs table
ALTER TABLE public.blogs ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Create index for display_order
CREATE INDEX IF NOT EXISTS idx_blogs_display_order ON public.blogs(display_order);

-- Update existing blogs with sequential display_order based on created_at
WITH ranked_blogs AS (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) - 1 AS new_order
  FROM public.blogs
)
UPDATE public.blogs
SET display_order = ranked_blogs.new_order
FROM ranked_blogs
WHERE blogs.id = ranked_blogs.id;