-- Fix 1: Remove duplicate has_role overload to prevent ambiguous resolution
DROP FUNCTION IF EXISTS public.has_role(app_role, uuid);

-- Fix 2: Replace permissive properties SELECT policy to hide drafts at DB level
DROP POLICY IF EXISTS "Anyone can view all properties" ON public.properties;
CREATE POLICY "Public can view non-draft properties"
  ON public.properties FOR SELECT
  USING (status <> 'draft' OR has_role(auth.uid(), 'admin'::app_role));