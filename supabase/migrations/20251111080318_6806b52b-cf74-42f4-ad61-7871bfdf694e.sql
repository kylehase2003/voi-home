-- Add new fields for property overview section
ALTER TABLE public.properties 
ADD COLUMN IF NOT EXISTS blocks INTEGER,
ADD COLUMN IF NOT EXISTS floors INTEGER,
ADD COLUMN IF NOT EXISTS rental_yield TEXT,
ADD COLUMN IF NOT EXISTS down_payment_percentage TEXT,
ADD COLUMN IF NOT EXISTS installments_count INTEGER;