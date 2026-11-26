# Graph Report - voi home website  (2026-11-22)

## Corpus Check
- 236 files · ~491,749 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1177 nodes · 2842 edges · 80 communities (61 shown, 15 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8fd77db1`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- BlogsManagement.tsx
- dependencies
- constants/property.ts
- App.tsx
- Partners.tsx
- react-router-dom
- hooks/use-toast.ts
- services/index.ts
- sonner.tsx
- FaqList.tsx
- package.json
- sidebar.tsx
- react-i18next
- guides/index.ts
- Property
- BlogDetail.tsx
- TypeScript App Config
- Dev Tool Dependencies
- Shadcn UI Config
- TypeScript Node Config
- PropertyDetail.tsx
- Button
- MapPicker.tsx
- PropertiesMap.tsx
- useProperties.ts
- Form Components
- Links.tsx
- Project Setup Docs
- Charts Data Visualization
- command.tsx
- sheet.tsx
- types.ts
- Contact Reply Email Function
- TypeScript Root Config
- class-variance-authority
- RichTextEditor.tsx
- PropertiesManagement.tsx
- Navigation Menu Component
- PropertyCard.tsx
- useIsMobile
- Build Scripts
- cn
- Contact Email Function
- Voi Home — Voice
- lucide-react
- input-otp.tsx
- RevealOnScroll.tsx
- button.tsx
- CLAUDE.md
- react
- Pill Picker Component
- Vite Build Config
- utils.ts
- prerender.mjs
- eslint.config.js
- dropdown-menu.tsx
- indexnow.mjs
- StatsOverlay.tsx
- Hero Villa - Luxury Modern Villa with Infinity Pool at Sunset
- Lead Webhook Integration
- OG Preview Function
- Dashboard.tsx
- Sitemap Edge Function
- config.ts
- ContactSubmissions.tsx
- client.ts
- Favicon Assets
- Crawler Configuration
- OG Social Share Image (Mr. Property Brand — Outdated)
- Aspect Ratio Component
- Collapsible Component
- Tailwind Configuration
- Placeholder Image
- Project README
- StatementSection.tsx
- scroll-area.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 237 edges
2. `react` - 99 edges
3. `lucide-react` - 76 edges
4. `react-i18next` - 68 edges
5. `react-router-dom` - 39 edges
6. `Button` - 37 edges
7. `RevealOnScroll()` - 27 edges
8. `supabase` - 24 edges
9. `Property` - 19 edges
10. `compilerOptions` - 18 edges

## Surprising Connections (you probably didn't know these)
- `HTML Entry Point` --references--> `Voi Home Logo — Apple Touch Icon`  [EXTRACTED]
  index.html → public/apple-touch-icon.png
- `HTML Entry Point` --references--> `Voi Home Favicon 16x16`  [EXTRACTED]
  index.html → public/favicon-16x16.png
- `Voi Home Setup Checklist` --conceptually_related_to--> `Code Quality Guidelines`  [INFERRED]
  TODO.md → CODE_QUALITY.md
- `HTML Entry Point` --references--> `Supabase Cloud Backend`  [EXTRACTED]
  index.html → TODO.md
- `ComingSoon()` --calls--> `whatsappLink()`  [EXTRACTED]
  src/pages/ComingSoon.tsx → src/lib/whatsapp.ts

## Import Cycles
- None detected.

## Communities (80 total, 15 thin omitted)

### Community 0 - "BlogsManagement.tsx"
Cohesion: 0.14
Nodes (26): @dnd-kit/core, LanguageTabs(), RichTextEditor(), DialogContent, DialogDescription, DialogHeader(), DialogTitle, Label (+18 more)

### Community 1 - "dependencies"
Cohesion: 0.03
Nodes (74): dependencies, class-variance-authority, clsx, cmdk, date-fns, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities (+66 more)

### Community 2 - "constants/property.ts"
Cohesion: 0.11
Nodes (17): ALANYA_DISTRICTS, ANKARA_DISTRICTS, ANTALYA_DISTRICTS, BENEFIT_OPTIONS, BODRUM_DISTRICTS, BURSA_DISTRICTS, CONSTRUCTION_STATUSES, DEFAULT_FEATURES (+9 more)

### Community 3 - "App.tsx"
Cohesion: 0.10
Nodes (17): @tanstack/react-query, About, App(), Contact, Faq, NotFound, PrivacyPolicy, Properties (+9 more)

### Community 4 - "Partners.tsx"
Cohesion: 0.24
Nodes (12): Partners, Alert, AlertDescription, AlertTitle, alertVariants, Card, CardContent, CardDescription (+4 more)

### Community 5 - "react-router-dom"
Cohesion: 0.19
Nodes (11): react-router-dom, PartnerLogo, PartnerStrip(), PhotoScroller(), PhotoScrollerProps, ProcessSteps(), ProcessStepsProps, Step (+3 more)

### Community 6 - "hooks/use-toast.ts"
Cohesion: 0.11
Nodes (27): @radix-ui/react-toast, Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle (+19 more)

### Community 7 - "services/index.ts"
Cohesion: 0.27
Nodes (9): SERVICES_AR, SERVICES_EN, CONTENT, ServiceCategory, ServiceContent, serviceLang, ServiceSection, ServiceSlug (+1 more)

### Community 8 - "sonner.tsx"
Cohesion: 0.50
Nodes (3): next-themes, Toaster(), ToasterProps

### Community 9 - "FaqList.tsx"
Cohesion: 0.14
Nodes (17): @radix-ui/react-accordion, faqLang(), FaqList(), FaqListProps, LINK_LABEL, FaqTeaser(), TEASER_ITEMS, AccordionContent (+9 more)

### Community 10 - "package.json"
Cohesion: 0.06
Nodes (30): name, private, type, version, autoprefixer, date-fns, embla-carousel-auto-scroll, eslint (+22 more)

### Community 11 - "sidebar.tsx"
Cohesion: 0.09
Nodes (30): @radix-ui/react-separator, @radix-ui/react-tooltip, Separator, Sidebar, SidebarContent, SidebarContext, SidebarFooter, SidebarGroup (+22 more)

### Community 12 - "react-i18next"
Cohesion: 0.21
Nodes (10): react-i18next, zod, Auth, ComingSoon, Voi Luxury Real Estate Logo (Auth Variant), LanguageSwitcher(), LanguageSwitcherProps, DropdownMenuItem (+2 more)

### Community 13 - "guides/index.ts"
Cohesion: 0.24
Nodes (13): howToBuy, offPlan, residencePermit, tapuGuide, dailyLife, europeanVsAsianSide, familyAreas, livingInIstanbul (+5 more)

### Community 14 - "Property"
Cohesion: 0.19
Nodes (10): AreaDetails(), AreaDetailsProps, InvestmentReturns(), InvestmentReturnsProps, PropertyCardMinimalProps, PropertyOverview(), PropertyOverviewProps, SortableRowProps (+2 more)

### Community 15 - "BlogDetail.tsx"
Cohesion: 0.13
Nodes (19): react-helmet-async, BlogDetail, Blogs, Blog, BlogCategoryPicker(), absolute(), Crumb, ORG_ID (+11 more)

### Community 16 - "TypeScript App Config"
Cohesion: 0.10
Nodes (19): compilerOptions, allowImportingTsExtensions, isolatedModules, jsx, lib, module, moduleDetection, moduleResolution (+11 more)

### Community 17 - "Dev Tool Dependencies"
Cohesion: 0.11
Nodes (19): devDependencies, autoprefixer, eslint, @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, lovable-tagger (+11 more)

### Community 18 - "Shadcn UI Config"
Cohesion: 0.12
Nodes (16): aliases, components, hooks, lib, ui, utils, rsc, $schema (+8 more)

### Community 19 - "TypeScript Node Config"
Cohesion: 0.12
Nodes (15): compilerOptions, allowImportingTsExtensions, isolatedModules, lib, module, moduleDetection, moduleResolution, noEmit (+7 more)

### Community 20 - "PropertyDetail.tsx"
Cohesion: 0.13
Nodes (20): dompurify, embla-carousel-react, FAQItem, PropertyFAQ(), Carousel, CarouselApi, CarouselContent, CarouselContext (+12 more)

### Community 21 - "Button"
Cohesion: 0.24
Nodes (15): ServiceCard(), ServiceCardProps, ServicesCta(), ServicesCtaProps, Button, findService(), getServiceContent(), ServiceDef (+7 more)

### Community 22 - "MapPicker.tsx"
Cohesion: 0.10
Nodes (27): leaflet, open-location-code, @radix-ui/react-tabs, react-leaflet, LanguageTabsProps, DEFAULT_CENTER, isFullPlusCode(), isValidPlusCode() (+19 more)

### Community 23 - "PropertiesMap.tsx"
Cohesion: 0.16
Nodes (12): @maplibre/maplibre-gl-leaflet, PropertiesMap, LoadingSpinner(), LoadingSpinnerProps, compactPrice(), FitBoundsProps, groupIcon(), MAP_STYLES (+4 more)

### Community 24 - "useProperties.ts"
Cohesion: 0.15
Nodes (18): PropertyScrollShowcase(), FeaturedProperties(), TURKEY_FILTER, constructionStatusTranslations, locationTranslations, PropertyCardMinimal(), propertyTypeTranslations, PropertyFiltersProps (+10 more)

### Community 25 - "Form Components"
Cohesion: 0.19
Nodes (12): @radix-ui/react-label, react-hook-form, FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext (+4 more)

### Community 26 - "Links.tsx"
Cohesion: 0.31
Nodes (7): Links, Voi Logo (White/Light Variant, PNG), Voi Logo (White Variant, PNG), TikTokIcon(), TikTokIconProps, Links(), WhatsAppGlyph()

### Community 27 - "Project Setup Docs"
Cohesion: 0.17
Nodes (12): AreaDetails Component, Code Quality Guidelines, Google Analytics GA4 (G-ERQ8NMYJ6P), Google Tag Manager (GTM-T2QKMTMP), HTML Entry Point, InvestmentReturns Component, LoadingSpinner Component, PropertyOverview Component (+4 more)

### Community 28 - "Charts Data Visualization"
Cohesion: 0.23
Nodes (10): recharts, ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, getPayloadConfigFromPayload() (+2 more)

### Community 29 - "command.tsx"
Cohesion: 0.17
Nodes (10): cmdk, Command, CommandDialogProps, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList (+2 more)

### Community 30 - "sheet.tsx"
Cohesion: 0.22
Nodes (9): @radix-ui/react-dialog, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle (+1 more)

### Community 31 - "types.ts"
Cohesion: 0.18
Nodes (10): CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums, Json, Tables (+2 more)

### Community 32 - "Contact Reply Email Function"
Cohesion: 0.24
Nodes (10): allowedOrigins, escapeHtml(), getCorsHeaders(), handler(), RequestBody, RESEND_API_KEY, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (+2 more)

### Community 33 - "TypeScript Root Config"
Cohesion: 0.18
Nodes (10): compilerOptions, allowJs, noImplicitAny, noUnusedLocals, noUnusedParameters, paths, skipLibCheck, strictNullChecks (+2 more)

### Community 34 - "class-variance-authority"
Cohesion: 0.29
Nodes (8): class-variance-authority, @radix-ui/react-toggle, @radix-ui/react-toggle-group, ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 35 - "RichTextEditor.tsx"
Cohesion: 0.29
Nodes (6): @tiptap/extension-color, @tiptap/extension-text-style, @tiptap/react, @tiptap/starter-kit, colors, RichTextEditorProps

### Community 36 - "PropertiesManagement.tsx"
Cohesion: 0.09
Nodes (32): DeleteConfirmDialog(), MobileCard(), MobileCardProps, MobileCardRow(), MobileCardRowProps, ResponsiveTable(), ResponsiveTableProps, getCityForDistrict() (+24 more)

### Community 37 - "Navigation Menu Component"
Cohesion: 0.25
Nodes (8): @radix-ui/react-navigation-menu, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 38 - "PropertyCard.tsx"
Cohesion: 0.12
Nodes (16): Blog, BlogCardMinimal(), BlogCardMinimalProps, Testimonial, TestimonialBreak(), TestimonialBreakProps, OptimizedImage, OptimizedImageProps (+8 more)

### Community 39 - "useIsMobile"
Cohesion: 0.60
Nodes (3): CustomCursor(), SidebarProvider, useIsMobile()

### Community 40 - "Build Scripts"
Cohesion: 0.25
Nodes (8): scripts, build, build:dev, dev, lint, prebuild, predev, preview

### Community 41 - "cn"
Cohesion: 0.06
Nodes (50): @radix-ui/react-avatar, @radix-ui/react-context-menu, @radix-ui/react-slot, vaul, AlertDialogOverlay, Avatar, AvatarFallback, AvatarImage (+42 more)

### Community 43 - "Contact Email Function"
Cohesion: 0.43
Nodes (6): allowedOrigins, escapeHtml(), getCorsHeaders(), handler(), RESEND_API_KEY, validateInput()

### Community 44 - "Voi Home — Voice"
Cohesion: 0.33
Nodes (5): Arabic and Russian, Audiences, Mechanics, Principles, Voi Home — Voice

### Community 45 - "lucide-react"
Cohesion: 0.20
Nodes (8): lucide-react, Footer(), Header(), MapSection(), NotFoundState(), NotFoundStateProps, SEOHead(), TeamMember

### Community 46 - "input-otp.tsx"
Cohesion: 0.33
Nodes (5): input-otp, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 48 - "RevealOnScroll.tsx"
Cohesion: 0.10
Nodes (20): AboutHero(), AboutHeroProps, FeatureRowProps, FounderProfileProps, ManifestoItem, ManifestoList(), ManifestoListProps, ServiceRow (+12 more)

### Community 49 - "button.tsx"
Cohesion: 0.07
Nodes (25): @radix-ui/react-slider, react-day-picker, CustomVideoPlayerProps, DEFAULT_CATEGORY_LABELS, formatStatusValue(), formatTransactionValue(), HiddenDefaults, RestoreHiddenOptions() (+17 more)

### Community 52 - "react"
Cohesion: 0.15
Nodes (17): react, DeletableSelect(), DeletableSelectProps, FilterOption, PropertyFilters(), ShatterHero(), TILES, Checkbox (+9 more)

### Community 53 - "Pill Picker Component"
Cohesion: 0.50
Nodes (4): pillClass(), PillOption, PillPicker(), PillPickerProps

### Community 54 - "Vite Build Config"
Cohesion: 0.50
Nodes (3): lovable-tagger, vite, @vitejs/plugin-react-swc

### Community 55 - "utils.ts"
Cohesion: 0.09
Nodes (19): clsx, @radix-ui/react-hover-card, @radix-ui/react-popover, @radix-ui/react-progress, @radix-ui/react-radio-group, react-resizable-panels, tailwind-merge, MultiSelectCheckbox() (+11 more)

### Community 56 - "prerender.mjs"
Cohesion: 0.20
Nodes (13): CONCURRENCY, DIST, main(), worker(), MIME, outFile(), PIXEL, puppeteer (+5 more)

### Community 57 - "eslint.config.js"
Cohesion: 0.33
Nodes (5): @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint

### Community 58 - "dropdown-menu.tsx"
Cohesion: 0.20
Nodes (9): @radix-ui/react-dropdown-menu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator, DropdownMenuShortcut(), DropdownMenuSubContent (+1 more)

### Community 60 - "indexnow.mjs"
Cohesion: 0.22
Nodes (9): changed, current, expectedSitemap, fileFor(), key, previous, removed, signature() (+1 more)

### Community 61 - "StatsOverlay.tsx"
Cohesion: 0.29
Nodes (7): Stat, StatBand(), StatBandProps, Stat, StatsOverlay(), StatsOverlayProps, skipCountUp()

### Community 67 - "Dashboard.tsx"
Cohesion: 0.08
Nodes (28): @supabase/supabase-js, SitemapEntry, staticEntries, today, Dashboard, DashboardSidebar(), DashboardSidebarProps, MaintenanceCheck() (+20 more)

### Community 70 - "ContactSubmissions.tsx"
Cohesion: 0.25
Nodes (11): AffectedProperty, DeleteConfirmDialogProps, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader() (+3 more)

### Community 71 - "client.ts"
Cohesion: 0.17
Nodes (12): @dnd-kit/sortable, @dnd-kit/utilities, sonner, ImageUpload(), ImageUploadProps, MultiImageUpload(), MultiImageUploadProps, SortableImageProps (+4 more)

### Community 89 - "scroll-area.tsx"
Cohesion: 0.50
Nodes (3): @radix-ui/react-scroll-area, ScrollArea, ScrollBar

## Knowledge Gaps
- **400 isolated node(s):** `DIST`, `CONCURRENCY`, `require`, `puppeteer`, `MIME` (+395 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 460 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `BlogsManagement.tsx`, `Partners.tsx`, `hooks/use-toast.ts`, `FaqList.tsx`, `sidebar.tsx`, `react-i18next`, `PropertyDetail.tsx`, `Button`, `MapPicker.tsx`, `Form Components`, `Charts Data Visualization`, `command.tsx`, `sheet.tsx`, `class-variance-authority`, `PropertiesManagement.tsx`, `Navigation Menu Component`, `PropertyCard.tsx`, `useIsMobile`, `input-otp.tsx`, `RevealOnScroll.tsx`, `button.tsx`, `react`, `utils.ts`, `dropdown-menu.tsx`, `Dashboard.tsx`, `ContactSubmissions.tsx`, `scroll-area.tsx`?**
  _High betweenness centrality (0.149) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `BlogsManagement.tsx`, `App.tsx`, `Partners.tsx`, `react-router-dom`, `hooks/use-toast.ts`, `FaqList.tsx`, `package.json`, `sidebar.tsx`, `react-i18next`, `Property`, `BlogDetail.tsx`, `PropertyDetail.tsx`, `MapPicker.tsx`, `PropertiesMap.tsx`, `useProperties.ts`, `Form Components`, `Charts Data Visualization`, `command.tsx`, `sheet.tsx`, `class-variance-authority`, `RichTextEditor.tsx`, `PropertiesManagement.tsx`, `Navigation Menu Component`, `PropertyCard.tsx`, `useIsMobile`, `cn`, `lucide-react`, `input-otp.tsx`, `RevealOnScroll.tsx`, `button.tsx`, `utils.ts`, `dropdown-menu.tsx`, `StatsOverlay.tsx`, `Dashboard.tsx`, `ContactSubmissions.tsx`, `client.ts`, `StatementSection.tsx`, `scroll-area.tsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **What connects `DIST`, `CONCURRENCY`, `require` to the rest of the system?**
  _400 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `BlogsManagement.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14035087719298245 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.02702702702702703 - nodes in this community are weakly interconnected._
- **Should `constants/property.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._