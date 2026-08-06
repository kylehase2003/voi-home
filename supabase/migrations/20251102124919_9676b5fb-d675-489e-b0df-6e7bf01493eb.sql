-- Create maintenance_settings table
CREATE TABLE public.maintenance_settings (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  is_active BOOLEAN NOT NULL DEFAULT false,
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_by UUID REFERENCES auth.users(id)
);

-- Enable Row Level Security
ALTER TABLE public.maintenance_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for maintenance settings
CREATE POLICY "Anyone can view maintenance status" 
ON public.maintenance_settings 
FOR SELECT 
USING (true);

CREATE POLICY "Admins can update maintenance settings" 
ON public.maintenance_settings 
FOR UPDATE 
USING (has_role(auth.uid(), 'admin'::app_role));

CREATE POLICY "Admins can insert maintenance settings" 
ON public.maintenance_settings 
FOR INSERT 
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Insert default maintenance settings
INSERT INTO public.maintenance_settings (is_active) VALUES (false);

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_maintenance_settings_updated_at
BEFORE UPDATE ON public.maintenance_settings
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();