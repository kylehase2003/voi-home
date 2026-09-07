-- Mock blog posts for local development and design review of the Blogs page.
-- Categories match the translation keys in blogs.category.* (buying-guide,
-- investment, market-update, lifestyle, news, tips) so labels render
-- translated instead of falling back to the raw slug.
INSERT INTO public.blogs (
  title, slug, excerpt, content, featured_image, category, region, tags, published, published_at
) VALUES
(
  'How Turkish Citizenship by Investment Works in 2026',
  'turkish-citizenship-by-investment-2026',
  'The property threshold, the timeline, and the paperwork that actually determines whether your application gets approved.',
  '<p>Turkey''s citizenship-by-investment program remains one of the fastest routes to a second passport for real estate buyers. The current minimum property investment is $400,000, held for at least three years.</p><p>Applications typically clear in four to six months once the title deed, valuation report, and residence permit are in place. The most common delays come from incomplete valuation reports or title deeds still under a developer''s name at the time of application.</p><p>Working with a team that manages the paperwork end to end - not just the property sale - is what separates a six-month approval from a twelve-month one.</p>',
  'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=1200',
  'buying-guide',
  'turkey',
  '["citizenship", "investment", "turkey"]'::jsonb,
  true,
  now() - interval '2 days'
),
(
  'Why Dubai Off-Plan Property Demand Keeps Climbing',
  'dubai-off-plan-demand-2026',
  'Payment plans, handover timelines, and why off-plan still outsells ready stock in Dubai''s top communities.',
  '<p>Off-plan sales have outpaced ready-property transactions across Dubai for six consecutive quarters. The appeal is straightforward: staged payment plans as low as 10% down, with the balance spread across construction milestones.</p><p>Areas like Dubai Hills Estate and Business Bay continue to see the strongest absorption rates, driven by end users and investors targeting handover-linked appreciation.</p><p>The trade-off is patience - handover delays of six to twelve months beyond the original date are not unusual, so due diligence on the developer''s delivery track record matters more than the brochure.</p>',
  'https://images.unsplash.com/photo-1512453979798-5ea266f8880c?w=1200',
  'market-update',
  'dubai',
  '["dubai", "off-plan", "market"]'::jsonb,
  true,
  now() - interval '6 days'
),
(
  '5 Signs a Rental Yield Is Actually Sustainable',
  'sustainable-rental-yield-signs',
  'A headline yield number tells you almost nothing on its own. Here''s what to check before you believe it.',
  '<p>A listing advertising an 8% rental yield sounds attractive until you ask how it was calculated. Gross yield figures often ignore service charges, vacancy periods, and management fees - all of which can shave two to three points off the real return.</p><p>Before trusting a projected yield, check the actual occupancy history of comparable units in the building, not just the developer''s pro forma. Ask whether the figure is gross or net, and whether it assumes furnished short-term rental income or long-term leasing.</p><p>Sustainable yields tend to be boring: 5-6% net, backed by a multi-year rental track record in the immediate area.</p>',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1200',
  'investment',
  'both',
  '["rental yield", "investment tips"]'::jsonb,
  true,
  now() - interval '10 days'
),
(
  'Bodrum vs. Istanbul: Where Should You Buy?',
  'bodrum-vs-istanbul-where-to-buy',
  'Two completely different investment cases - one is a lifestyle asset, the other is a growth market.',
  '<p>Istanbul and Bodrum get compared constantly, but they solve different problems. Istanbul is a growth market: dense demand, steady price appreciation, and liquidity if you need to resell in a hurry.</p><p>Bodrum is a lifestyle and seasonal-rental play. Prices per square meter can rival Istanbul''s best districts, but the return comes from short-term rental income during the May-to-October season rather than long-term capital growth alone.</p><p>If citizenship eligibility and long-term appreciation are the priority, Istanbul wins. If the property needs to double as a summer home you also rent out, Bodrum is the better fit.</p>',
  'https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?w=1200',
  'lifestyle',
  'turkey',
  '["bodrum", "istanbul", "comparison"]'::jsonb,
  true,
  now() - interval '15 days'
),
(
  'Dubai Golden Visa vs. Turkish Citizenship: A Quick Comparison',
  'golden-visa-vs-turkish-citizenship',
  'Same goal - residency security through property - two very different structures and price points.',
  '<p>The UAE Golden Visa grants ten-year renewable residency to buyers investing AED 2 million (about $545,000) or more in property. It does not lead to citizenship, but it does allow 100% business ownership and long-term residency without a local sponsor.</p><p>Turkish citizenship by investment requires a $400,000 property investment and grants full citizenship - including a passport - typically within four to six months, with no minimum stay requirement.</p><p>The choice usually comes down to what you actually want: a passport and visa-free travel (Turkey), or long-term residency and business access in the UAE (Dubai).</p>',
  'https://images.unsplash.com/photo-1512632578888-169bbbc64f33?w=1200',
  'news',
  'both',
  '["golden visa", "citizenship", "comparison"]'::jsonb,
  true,
  now() - interval '20 days'
),
(
  'Due Diligence Checklist Before You Wire a Deposit',
  'due-diligence-checklist-before-deposit',
  'The seven documents you should see before any money leaves your account, wherever you''re buying.',
  '<p>Before wiring a reservation deposit on any property abroad, insist on seeing: the title deed or its equivalent, the developer''s registration with the local regulator, an independent valuation report, the payment plan in writing, any outstanding liens on the property, the building''s completion certificate (for ready properties), and a clear breakdown of transfer and registration fees.</p><p>Wire transfers on international property deals are effectively irreversible. A deposit sent before these documents are confirmed is a deposit you should assume is gone if something goes wrong.</p><p>A good agent will hand you this checklist unprompted, not make you ask for it.</p>',
  'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1200',
  'tips',
  'both',
  '["due diligence", "buyer tips"]'::jsonb,
  true,
  now() - interval '25 days'
);
