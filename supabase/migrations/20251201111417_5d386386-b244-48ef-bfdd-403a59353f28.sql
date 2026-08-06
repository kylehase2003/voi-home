-- Add multi-language columns to properties table
ALTER TABLE public.properties
ADD COLUMN title_ar TEXT,
ADD COLUMN title_ru TEXT,
ADD COLUMN description_ar TEXT,
ADD COLUMN description_ru TEXT,
ADD COLUMN why_this_property_ar TEXT,
ADD COLUMN why_this_property_ru TEXT,
ADD COLUMN benefit_ar TEXT,
ADD COLUMN benefit_ru TEXT;

-- Add multi-language columns to blogs table
ALTER TABLE public.blogs
ADD COLUMN title_ar TEXT,
ADD COLUMN title_ru TEXT,
ADD COLUMN excerpt_ar TEXT,
ADD COLUMN excerpt_ru TEXT,
ADD COLUMN content_ar TEXT,
ADD COLUMN content_ru TEXT;

-- Add multi-language columns to testimonials table
ALTER TABLE public.testimonials
ADD COLUMN text_ar TEXT,
ADD COLUMN text_ru TEXT,
ADD COLUMN role_ar TEXT,
ADD COLUMN role_ru TEXT;

-- Add multi-language columns to partners table
ALTER TABLE public.partners
ADD COLUMN name_ar TEXT,
ADD COLUMN name_ru TEXT,
ADD COLUMN subtitle_ar TEXT,
ADD COLUMN subtitle_ru TEXT,
ADD COLUMN description_ar TEXT,
ADD COLUMN description_ru TEXT;

-- Add multi-language columns to team_members table
ALTER TABLE public.team_members
ADD COLUMN name_ar TEXT,
ADD COLUMN name_ru TEXT,
ADD COLUMN role_ar TEXT,
ADD COLUMN role_ru TEXT,
ADD COLUMN bio_ar TEXT,
ADD COLUMN bio_ru TEXT;

-- Add comment to explain the language columns
COMMENT ON COLUMN properties.title_ar IS 'Arabic translation of title';
COMMENT ON COLUMN properties.title_ru IS 'Russian translation of title';
COMMENT ON COLUMN blogs.title_ar IS 'Arabic translation of title';
COMMENT ON COLUMN blogs.title_ru IS 'Russian translation of title';
COMMENT ON COLUMN testimonials.text_ar IS 'Arabic translation of testimonial text';
COMMENT ON COLUMN testimonials.text_ru IS 'Russian translation of testimonial text';
COMMENT ON COLUMN partners.name_ar IS 'Arabic translation of partner name';
COMMENT ON COLUMN partners.name_ru IS 'Russian translation of partner name';
COMMENT ON COLUMN team_members.name_ar IS 'Arabic translation of team member name';
COMMENT ON COLUMN team_members.name_ru IS 'Russian translation of team member name';