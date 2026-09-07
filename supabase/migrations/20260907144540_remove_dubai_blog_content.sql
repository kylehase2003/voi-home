-- Voi Home is now Türkiye-only. Remove blog posts that are fundamentally about
-- Dubai/UAE, and reclassify the generically-written "both" posts as Turkey-only.

DELETE FROM public.blogs WHERE slug IN (
  'dubai-off-plan-demand-2026',
  'golden-visa-vs-turkish-citizenship'
);

UPDATE public.blogs
SET region = 'turkey'
WHERE slug IN (
  'sustainable-rental-yield-signs',
  'due-diligence-checklist-before-deposit'
);

COMMENT ON COLUMN public.blogs.region IS 'Region filter: turkey (Türkiye-only site)';
