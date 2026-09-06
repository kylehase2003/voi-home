-- Mock property listings for local development and design review.
-- Covers Istanbul and Bodrum (Turkey only) across sale/rent and several property types.
INSERT INTO public.properties (
  title, slug, location, region, district, property_type, layout,
  transaction_type, status, construction_status, price, bedrooms, bathrooms,
  area_sqm, year_built, furnished, gated_community, is_featured,
  latitude, longitude, benefit, description, features, images
) VALUES
(
  'Bosphorus View Residence', 'bosphorus-view-residence-besiktas', 'Istanbul, Turkey', 'Turkey', 'Beşiktaş',
  'apartment', '2+1', 'sale', 'available', 'ready', 285000, 2, 2,
  120, 2022, true, true, true,
  41.0430, 29.0094, 'Citizenship Eligible, High ROI',
  'A light-filled 2+1 apartment in Beşiktaş with uninterrupted Bosphorus views, finished to a high standard and ready for immediate move-in.',
  '["Fully Furnished","Smart Home System","Central AC","Security 24/7","Parking Space","Swimming Pool"]'::jsonb,
  '["https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200","https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200","https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200"]'::jsonb
),
(
  'Başakşehir Garden Flats', 'basaksehir-garden-flats', 'Istanbul, Turkey', 'Turkey', 'Başakşehir',
  'apartment', '1+1', 'sale', 'available', 'under-construction', 142000, 1, 1,
  75, 2027, false, true, false,
  41.0950, 28.8000, 'Citizenship Eligible, Rental Yields',
  'An entry-level investment opportunity in one of Istanbul''s fastest-growing districts, inside a master-planned gated community with on-site amenities.',
  '["Central AC","Security 24/7","Parking Space","Swimming Pool","Children''s Playground"]'::jsonb,
  '["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200","https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=1200"]'::jsonb
),
(
  'Yalıkavak Marina Villa', 'yalikavak-marina-villa', 'Bodrum, Turkey', 'Turkey', 'Yalıkavak',
  'villa', '4+1', 'sale', 'available', 'ready', 1250000, 4, 4,
  320, 2021, true, true, true,
  37.1050, 27.2833, 'Lifestyle, High ROI',
  'A private hillside villa minutes from Yalıkavak Marina, with an infinity pool, landscaped gardens, and panoramic Aegean sea views.',
  '["Private Pool","Sea View","Smart Home System","Central AC","Security 24/7","Garden"]'::jsonb,
  '["https://images.unsplash.com/photo-1613977257363-707ba9348227?w=1200","https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1200","https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200"]'::jsonb
),
(
  'Türkbükü Bay House', 'turkbuku-bay-house', 'Bodrum, Turkey', 'Turkey', 'Türkbükü',
  'villa', '3+1', 'rent', 'available', 'ready', 4500, 3, 3,
  210, 2019, true, false, false,
  37.1216, 27.3153, 'Lifestyle',
  'A breezy seasonal rental in Türkbükü, walking distance to beach clubs, with a private terrace and shared bay views.',
  '["Furnished","Sea View","Central AC","Terrace","Parking Space"]'::jsonb,
  '["https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=1200","https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?w=1200"]'::jsonb
);
