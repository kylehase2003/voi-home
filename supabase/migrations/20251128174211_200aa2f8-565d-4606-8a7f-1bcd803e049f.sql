-- Add display_order column to properties table for drag-and-drop sorting
ALTER TABLE properties ADD COLUMN IF NOT EXISTS display_order INTEGER DEFAULT 0;

-- Create index for better performance on ordering queries
CREATE INDEX IF NOT EXISTS idx_properties_display_order ON properties(display_order);

-- Initialize display_order based on created_at for existing properties
UPDATE properties 
SET display_order = subquery.row_num 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) as row_num 
  FROM properties
) AS subquery 
WHERE properties.id = subquery.id;