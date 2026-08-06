-- Update RLS policy to allow viewing all properties regardless of status
DROP POLICY IF EXISTS "Anyone can view published properties" ON public.properties;

CREATE POLICY "Anyone can view all properties"
ON public.properties
FOR SELECT
USING (true OR has_role(auth.uid(), 'admin'::app_role));