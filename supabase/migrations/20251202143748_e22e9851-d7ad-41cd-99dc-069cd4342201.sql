-- Fix ambiguous slug reference in generate_slug function
CREATE OR REPLACE FUNCTION public.generate_slug(title text)
RETURNS text
LANGUAGE plpgsql
SET search_path = public
AS $function$
DECLARE
  result_slug text;
  counter integer := 0;
  base_slug text;
BEGIN
  -- Convert to lowercase and replace spaces with hyphens
  base_slug := lower(trim(title));
  base_slug := regexp_replace(base_slug, '[^a-z0-9\s-]', '', 'g');
  base_slug := regexp_replace(base_slug, '\s+', '-', 'g');
  base_slug := regexp_replace(base_slug, '-+', '-', 'g');
  
  result_slug := base_slug;
  
  -- Check if slug exists and append counter if needed
  WHILE EXISTS (SELECT 1 FROM public.blogs b WHERE b.slug = result_slug) OR
        EXISTS (SELECT 1 FROM public.properties p WHERE p.slug = result_slug) LOOP
    counter := counter + 1;
    result_slug := base_slug || '-' || counter;
  END LOOP;
  
  RETURN result_slug;
END;
$function$;