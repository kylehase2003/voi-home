-- Add area details and investment returns fields to properties table
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS area_population TEXT,
ADD COLUMN IF NOT EXISTS area_sex_ratio_male TEXT,
ADD COLUMN IF NOT EXISTS area_sex_ratio_female TEXT,
ADD COLUMN IF NOT EXISTS area_class TEXT,
ADD COLUMN IF NOT EXISTS investment_return_1y TEXT,
ADD COLUMN IF NOT EXISTS investment_return_3y TEXT,
ADD COLUMN IF NOT EXISTS investment_return_5y TEXT;

COMMENT ON COLUMN public.properties.area_population IS 'Area population number';
COMMENT ON COLUMN public.properties.area_sex_ratio_male IS 'Male percentage for area sex ratio';
COMMENT ON COLUMN public.properties.area_sex_ratio_female IS 'Female percentage for area sex ratio';
COMMENT ON COLUMN public.properties.area_class IS 'Area class rating (e.g., A+)';
COMMENT ON COLUMN public.properties.investment_return_1y IS 'Investment return percentage for 1 year';
COMMENT ON COLUMN public.properties.investment_return_3y IS 'Investment return percentage for 3 years';
COMMENT ON COLUMN public.properties.investment_return_5y IS 'Investment return percentage for 5 years';