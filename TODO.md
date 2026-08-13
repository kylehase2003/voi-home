# Voi Home — Setup Checklist

This project is a copy of the MR. Property codebase, kept because it shares the same
property filtering mechanism (search bar, `/properties`, `/properties-map`, filters,
Supabase schema for listings). Everything below still needs to change before this is
a real, independent site.

## 1. Backend (Supabase)

- [ ] Create a new Supabase project for Voi Home (don't reuse MR. Property's).
- [ ] Run the SQL files in `supabase/migrations/` against the new project to create the
      schema (`properties`, `blogs`, `partners`, `team_members`, `testimonials`,
      `contact_submissions`, `maintenance_settings`, `profiles`, `user_roles`, and the
      storage buckets).
- [ ] Fill in the new project's credentials in three places (currently placeholders):
  - [ ] `.env` — `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`
  - [ ] `scripts/generate-sitemap.ts` — `SUPABASE_URL`, `SUPABASE_ANON_KEY`
  - [ ] `supabase/config.toml` — `project_id`

### Database schema reference

Full source of truth: `src/integrations/supabase/types.ts` (auto-generated — regenerate
this from the new Supabase project once it's set up, via `supabase gen types typescript`).
Below is the current shape, table by table.

**`properties`** — the core listings table the filtering mechanism queries.
`id`, `property_id`, `slug`, `title` / `title_ar` / `title_ru`, `description` /
`_ar` / `_ru`, `long_description` / `_ar` / `_ru`, `why_this_property` / `_ar` / `_ru`,
`price`, `property_type`, `transaction_type`, `region`, `district`, `location`,
`latitude`, `longitude`, `map_embed_url`, `map_link_url`, `bedrooms`, `bathrooms`,
`area_sqm`, `layout`, `floors`, `blocks`, `furnished`, `gated_community`,
`construction_status`, `completion_date`, `delivery_date`, `year_built`,
`title_deed`, `plot_ratio`, `clear_height`, `down_payment_percentage`,
`installments_count`, `rental_yield`, `investment_return_1y/3y/5y`,
`benefit` / `_ar` / `_ru`, `features` (json), `floor_plans` (json), `payment_plans` (json),
`images` (json), `video_url`, `nearby_places` (json), `area_class`, `area_population`,
`area_sex_ratio_male/female`, `is_featured`, `display_order`, `status`,
`created_by`, `created_at`, `updated_at`.

**`blogs`** — `id`, `slug`, `title` / `_ar` / `_ru`, `excerpt` / `_ar` / `_ru`,
`content` / `_ar` / `_ru`, `featured_image`, `category`, `region`, `tags` (json,
per language), `author_id`, `published`, `published_at`, `display_order`,
`created_at`, `updated_at`.

**`team_members`** — `id`, `name` / `_ar` / `_ru`, `role` / `_ar` / `_ru`,
`bio` / `_ar` / `_ru`, `email`, `phone`, `linkedin_url`, `image_url`, `is_active`,
`display_order`, `created_at`, `updated_at`.

**`testimonials`** — `id`, `name`, `role` / `_ar` / `_ru`, `text` / `_ar` / `_ru`,
`rating` (1–5), `image_url`, `is_active`, `display_order`, `created_at`, `updated_at`.

**`partners`** — `id`, `name` / `_ar` / `_ru`, `subtitle` / `_ar` / `_ru`,
`description` / `_ar` / `_ru`, `logo_url`, `website_url`, `is_active`,
`display_order`, `created_at`, `updated_at`.

**`contact_submissions`** — `id`, `name`, `email`, `phone`, `message`, `status`,
`reply`, `replied_at`, `created_at`, `updated_at`.

**`maintenance_settings`** — `id`, `is_active`, `updated_by`, `updated_at`
(single-row toggle that powers `MaintenanceCheck.tsx`, puts the whole site into
maintenance mode).

**`profiles`** — `id` (matches `auth.users.id`), `email`, `full_name`, `created_at`,
`updated_at`.

**`user_roles`** — `id`, `user_id`, `role` (`enum: "admin" | "user"`), `created_at`.
Grant yourself `admin` here to unlock `/dashboard`.

**Storage buckets** (public read, admin write): `property-images`, `blog-images`,
`testimonial-images`, `partner-logos`.

**DB functions**: `has_role(user_id, role)` — used by RLS policies to gate admin
writes; `generate_slug(title)` — auto-generates URL slugs.

Every `_ar` / `_ru` suffixed column is optional — if empty, the site falls back to the
base (English) column via `getTranslatedContent()` in `src/lib/i18n-content.ts`.
- [ ] Deploy/reconfigure the Supabase Edge Functions in `supabase/functions/`
      (`send-contact-email`, `send-contact-reply`, `og-preview`, `sitemap`) for the new project.
- [ ] Create an admin user + `user_roles` entry so the `/dashboard` is accessible.
- [ ] Populate real data: properties, team members, testimonials, partners, blog posts
      (all currently MR. Property's data, managed via `/dashboard` or directly in Supabase).

## 2. Domain & deployment

- [ ] Replace `mrpropertytr.com` with the real Voi Home domain — found in:
  - `index.html`
  - `src/components/SEOHead.tsx`
  - `src/components/Footer.tsx`
  - `src/components/Header.tsx`
  - `src/pages/PrivacyPolicy.tsx`
  - `src/pages/PropertyDetail.tsx`
  - `src/pages/Contact.tsx`
  - `src/pages/BlogDetail.tsx`
  - `src/pages/TermsConditions.tsx`
  - `src/pages/ComingSoon.tsx`
  - `src/pages/Properties.tsx`
  - `public/robots.txt`, `public/sitemap.xml` (sitemap regenerates automatically on build)
  - `scripts/generate-sitemap.ts` — `BASE_URL`

## 3. Branding & content

- [ ] Replace the logo files in `src/assets/`: `logo.png`, `logo.webp`, `logo-new.png`,
      `logo-auth.png`, `logo-auth-new.png`.
- [ ] Replace the hero background video: `public/video/hero-background.mp4`.
- [ ] Replace the About section video cover: `src/assets/about-vision-video.webp`.
- [ ] Replace the founder photo: `src/assets/founder-samer.webp` (and rewrite the
      About page's "About the Founder" copy — currently about Samer Al Helwani).
- [ ] Replace remaining stock/property imagery in `src/assets/` (hero images, blog
      thumbnails, buyer-guide illustrations, etc.) with real Voi Home photos.
- [ ] Rewrite all "MR. PROPERTY" brand mentions — found in:
  - `src/components/AboutCompany.tsx`
  - `src/pages/About.tsx`
  - `src/pages/ComingSoon.tsx`
  - `src/pages/landing/translations.ts`
  - All three `src/i18n/locales/*.json` files (en, ar, ru) — search for "MR. PROPERTY" /
    "MR.PROPERTY" across all of them, this is the bulk of the copy to rewrite.
- [ ] Update Tailwind theme colors/fonts in `tailwind.config.ts` and `src/index.css`
      if Voi Home has different brand colors than MR. Property's gold/olive palette.

## 4. Contact info

- [ ] Replace the WhatsApp number (`905545707580`) — found in:
  - `src/components/WhatsAppButton.tsx`
  - `src/components/Footer.tsx`
  - `src/components/Header.tsx`
  - `src/pages/PropertyDetail.tsx`
  - `src/pages/About.tsx` (the "You need Voi Home" CTA button)
- [ ] Replace the email address (`info@mrpropertytr.com` / `info@mrproperty.com`) — found in:
  - `src/components/Footer.tsx`
  - `src/components/Header.tsx`
  - `src/pages/ComingSoon.tsx`
  - `src/pages/PrivacyPolicy.tsx`
  - `src/pages/TermsConditions.tsx`
  - `src/pages/Contact.tsx`
- [ ] Replace the physical address / map — `src/pages/Contact.tsx` has
      `addressLocality: "Zeytinburnu"`, `addressCountry: "TR"` in structured data, plus
      a Google Maps embed/link and `src/components/MapSection.tsx`.
- [ ] Replace social links in `src/components/Footer.tsx` (Facebook, Instagram, TikTok,
      LinkedIn — currently all `mrpropertytr` handles).
- [ ] Default phone country code in contact forms is currently `US` — change if Voi Home
      targets a different region (`defaultCountry` in `src/pages/Contact.tsx`,
      `src/pages/BuyerGuide.tsx`, `src/components/ContactPopup.tsx`).

## 5. Markets / geography

The filtering mechanism itself is reusable, but the actual markets are hardcoded for
Turkey + Dubai — update if Voi Home covers different countries/cities:
- [ ] `src/constants/property.ts` — `COUNTRIES`, `TURKIYE_CITIES`, districts, etc.
- [ ] Any copy referencing "Türkiye", "Turkey", "Dubai", "Istanbul", "Bodrum" across
      `src/i18n/locales/*.json` and page components.

## 6. Content strategy (translations)

- [ ] Decide if Voi Home needs all three languages (EN/AR/RU) or fewer/different ones —
      config is in `src/i18n/config.ts` and `src/i18n/locales/`.
- [ ] Rewrite every string in `src/i18n/locales/en.json` (and `ar.json`/`ru.json` if kept)
      — these currently contain all of MR. Property's marketing copy.

## 7. Git & hosting

- [ ] No git repo yet — initialize one and connect it to wherever Voi Home will be hosted.
- [ ] `package-lock.json` / `bun.lock` were copied as-is; fine to keep as a starting
      dependency baseline.

## What's already reusable as-is (no action needed)

- Property filtering mechanism: `src/components/property/PropertyFilters.tsx`,
  `src/hooks/useFilterOptions.ts`, `src/hooks/useProperties.ts`, the hero search bar,
  `/properties` and `/properties-map` pages.
- Overall site structure, routing, dashboard, shadcn-ui components, and Supabase schema
  shape (once migrated to a new Supabase project).
