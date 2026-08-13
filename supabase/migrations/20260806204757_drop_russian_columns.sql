-- Drop Russian (_ru) translation columns; Voi Home only supports English and Arabic.
ALTER TABLE public.blogs
  DROP COLUMN IF EXISTS content_ru,
  DROP COLUMN IF EXISTS excerpt_ru,
  DROP COLUMN IF EXISTS tags_ru,
  DROP COLUMN IF EXISTS title_ru;

ALTER TABLE public.partners
  DROP COLUMN IF EXISTS description_ru,
  DROP COLUMN IF EXISTS name_ru,
  DROP COLUMN IF EXISTS subtitle_ru;

ALTER TABLE public.properties
  DROP COLUMN IF EXISTS benefit_ru,
  DROP COLUMN IF EXISTS description_ru,
  DROP COLUMN IF EXISTS long_description_ru,
  DROP COLUMN IF EXISTS title_ru,
  DROP COLUMN IF EXISTS why_this_property_ru;

ALTER TABLE public.team_members
  DROP COLUMN IF EXISTS bio_ru,
  DROP COLUMN IF EXISTS name_ru,
  DROP COLUMN IF EXISTS role_ru;

ALTER TABLE public.testimonials
  DROP COLUMN IF EXISTS role_ru,
  DROP COLUMN IF EXISTS text_ru;
