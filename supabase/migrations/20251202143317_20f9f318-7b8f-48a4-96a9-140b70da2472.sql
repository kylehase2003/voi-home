-- Fix the ambiguous slug column reference in the trigger function
CREATE OR REPLACE FUNCTION public.set_property_slug()
RETURNS TRIGGER AS $$
BEGIN
  IF NEW.slug IS NULL OR NEW.slug = '' THEN
    NEW.slug := generate_slug(NEW.title);
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;