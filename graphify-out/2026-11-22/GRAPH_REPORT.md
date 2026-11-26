# Graph Report - voi home website  (2026-11-22)

## Corpus Check
- 236 files · ~491,749 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1179 nodes · 2857 edges · 88 communities (67 shown, 17 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `53fd1669`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- TestimonialsManagement.tsx
- dependencies
- constants/property.ts
- App.tsx
- breadcrumb.tsx
- Experience.tsx
- hooks/use-toast.ts
- services/index.ts
- sonner.tsx
- Faq.tsx
- package.json
- sidebar.tsx
- context-menu.tsx
- guides/index.ts
- Property
- Blogs.tsx
- TypeScript App Config
- Dev Tool Dependencies
- Shadcn UI Config
- TypeScript Node Config
- carousel.tsx
- Button
- MapPicker.tsx
- PropertiesMap.tsx
- useProperties.ts
- Form Components
- Links.tsx
- Project Setup Docs
- Charts Data Visualization
- Dashboard.tsx
- RestoreHiddenOptions.tsx
- types.ts
- Contact Reply Email Function
- TypeScript Root Config
- class-variance-authority
- RichTextEditor.tsx
- PropertiesManagement.tsx
- Navigation Menu Component
- Partners.tsx
- PropertyDetail.tsx
- Build Scripts
- cn
- PropertyCardMinimal.tsx
- Contact Email Function
- Voi Home — Voice
- lucide-react
- input-otp.tsx
- CustomVideoPlayer.tsx
- react-i18next
- Properties.tsx
- CLAUDE.md
- ErrorBoundary
- react
- Pill Picker Component
- Vite Build Config
- radio-group.tsx
- prerender.mjs
- eslint.config.js
- dropdown-menu.tsx
- OurServices.tsx
- indexnow.mjs
- StatsOverlay.tsx
- Hero Villa - Luxury Modern Villa with Infinity Pool at Sunset
- Lead Webhook Integration
- OG Preview Function
- avatar.tsx
- Auth.tsx
- Sitemap Edge Function
- config.ts
- BlogsManagement.tsx
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
- YouTubeFacade.tsx
- useCustomOptions.ts
- drawer.tsx
- scroll-area.tsx

## God Nodes (most connected - your core abstractions)
1. `cn()` - 237 edges
2. `react` - 99 edges
3. `lucide-react` - 76 edges
4. `react-i18next` - 68 edges
5. `react-router-dom` - 39 edges
6. `Button` - 37 edges
7. `RevealOnScroll()` - 29 edges
8. `supabase` - 24 edges
9. `SEOHead()` - 20 edges
10. `Property` - 19 edges

## Surprising Connections (you probably didn't know these)
- `HTML Entry Point` --references--> `Voi Home Logo — Apple Touch Icon`  [EXTRACTED]
  index.html → public/apple-touch-icon.png
- `HTML Entry Point` --references--> `Voi Home Favicon 16x16`  [EXTRACTED]
  index.html → public/favicon-16x16.png
- `Voi Home Setup Checklist` --conceptually_related_to--> `Code Quality Guidelines`  [INFERRED]
  TODO.md → CODE_QUALITY.md
- `HTML Entry Point` --references--> `Supabase Cloud Backend`  [EXTRACTED]
  index.html → TODO.md
- `PropertyCardProps` --references--> `Property`  [EXTRACTED]
  src/components/property/PropertyCard.tsx → src/types/property.ts

## Import Cycles
- None detected.

## Communities (88 total, 17 thin omitted)

### Community 0 - "TestimonialsManagement.tsx"
Cohesion: 0.15
Nodes (21): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, LanguageTabs(), Label, labelVariants, Switch, Table (+13 more)

### Community 1 - "dependencies"
Cohesion: 0.03
Nodes (74): dependencies, class-variance-authority, clsx, cmdk, date-fns, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities (+66 more)

### Community 2 - "constants/property.ts"
Cohesion: 0.11
Nodes (16): ALANYA_DISTRICTS, ANKARA_DISTRICTS, ANTALYA_DISTRICTS, BENEFIT_OPTIONS, BODRUM_DISTRICTS, BURSA_DISTRICTS, CONSTRUCTION_STATUSES, FETHIYE_DISTRICTS (+8 more)

### Community 3 - "App.tsx"
Cohesion: 0.10
Nodes (20): react-router-dom, @tanstack/react-query, About, App(), ComingSoon, Contact, Dashboard, Faq (+12 more)

### Community 4 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (8): @radix-ui/react-slot, Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 5 - "Experience.tsx"
Cohesion: 0.14
Nodes (14): PartnerLogo, PartnerStrip(), PhotoScroller(), PhotoScrollerProps, ProcessSteps(), ProcessStepsProps, Step, PropertyScrollShowcase() (+6 more)

### Community 6 - "hooks/use-toast.ts"
Cohesion: 0.11
Nodes (26): @radix-ui/react-toast, Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle (+18 more)

### Community 7 - "services/index.ts"
Cohesion: 0.20
Nodes (12): ServiceCardProps, SERVICES_AR, SERVICES_EN, CONTENT, findService(), ServiceCategory, ServiceContent, ServiceDef (+4 more)

### Community 8 - "sonner.tsx"
Cohesion: 0.50
Nodes (3): next-themes, Toaster(), ToasterProps

### Community 9 - "Faq.tsx"
Cohesion: 0.16
Nodes (17): @radix-ui/react-accordion, faqLang(), FaqList(), FaqListProps, LINK_LABEL, FaqTeaser(), TEASER_ITEMS, AccordionContent (+9 more)

### Community 10 - "package.json"
Cohesion: 0.06
Nodes (33): name, private, type, version, autoprefixer, clsx, date-fns, embla-carousel-auto-scroll (+25 more)

### Community 11 - "sidebar.tsx"
Cohesion: 0.09
Nodes (32): @radix-ui/react-separator, @radix-ui/react-tooltip, DashboardSidebar(), Separator, Sidebar, SidebarContent, SidebarContext, SidebarFooter (+24 more)

### Community 12 - "context-menu.tsx"
Cohesion: 0.18
Nodes (10): @radix-ui/react-context-menu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut() (+2 more)

### Community 13 - "guides/index.ts"
Cohesion: 0.24
Nodes (13): howToBuy, offPlan, residencePermit, tapuGuide, dailyLife, europeanVsAsianSide, familyAreas, livingInIstanbul (+5 more)

### Community 14 - "Property"
Cohesion: 0.21
Nodes (9): AreaDetails(), AreaDetailsProps, InvestmentReturns(), InvestmentReturnsProps, PropertyOverview(), PropertyOverviewProps, SortableRowProps, MarkerLayerProps (+1 more)

### Community 15 - "Blogs.tsx"
Cohesion: 0.19
Nodes (12): Blogs, Blog, BlogCardMinimal(), BlogCardMinimalProps, Blog, BlogCategoryPicker(), GUIDES, mergeWithGuides() (+4 more)

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

### Community 20 - "carousel.tsx"
Cohesion: 0.17
Nodes (14): embla-carousel-react, Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext (+6 more)

### Community 21 - "Button"
Cohesion: 0.29
Nodes (12): ServiceCard(), ServicesCta(), ServicesCtaProps, Button, getServiceContent(), SERVICES, WHATSAPP_NUMBER, whatsappLink() (+4 more)

### Community 22 - "MapPicker.tsx"
Cohesion: 0.10
Nodes (27): leaflet, open-location-code, @radix-ui/react-tabs, react-leaflet, LanguageTabsProps, DEFAULT_CENTER, isFullPlusCode(), isValidPlusCode() (+19 more)

### Community 23 - "PropertiesMap.tsx"
Cohesion: 0.16
Nodes (12): @maplibre/maplibre-gl-leaflet, PropertiesMap, LoadingSpinner(), LoadingSpinnerProps, compactPrice(), FitBoundsProps, groupIcon(), MAP_STYLES (+4 more)

### Community 24 - "useProperties.ts"
Cohesion: 0.21
Nodes (14): FeaturedProperties(), TURKEY_FILTER, PropertyFilters(), PropertyFiltersProps, getDistrictsForCity(), getCityAliases(), normalizeLocationText(), propertyMatchesCity() (+6 more)

### Community 25 - "Form Components"
Cohesion: 0.19
Nodes (12): @radix-ui/react-label, react-hook-form, FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext (+4 more)

### Community 26 - "Links.tsx"
Cohesion: 0.27
Nodes (8): react-helmet-async, Links, Voi Logo (White/Light Variant, PNG), Voi Logo (White Variant, PNG), TikTokIcon(), TikTokIconProps, Links(), WhatsAppGlyph()

### Community 27 - "Project Setup Docs"
Cohesion: 0.17
Nodes (12): AreaDetails Component, Code Quality Guidelines, Google Analytics GA4 (G-ERQ8NMYJ6P), Google Tag Manager (GTM-T2QKMTMP), HTML Entry Point, InvestmentReturns Component, LoadingSpinner Component, PropertyOverview Component (+4 more)

### Community 28 - "Charts Data Visualization"
Cohesion: 0.23
Nodes (10): recharts, ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, getPayloadConfigFromPayload() (+2 more)

### Community 29 - "Dashboard.tsx"
Cohesion: 0.29
Nodes (6): BlogsManagement(), ContactSubmissions(), tabTitles, PartnersManagement(), TeamManagement(), TestimonialsManagement()

### Community 30 - "RestoreHiddenOptions.tsx"
Cohesion: 0.38
Nodes (6): DEFAULT_CATEGORY_LABELS, formatStatusValue(), formatTransactionValue(), HiddenDefaults, RestoreHiddenOptions(), RestoreHiddenOptionsProps

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
Cohesion: 0.14
Nodes (19): DeleteConfirmDialog(), RichTextEditor(), PopoverContent, getCityForDistrict(), AMENITY_ICON_OPTIONS, AMENITY_ICONS, CUSTOM_AMENITY_ICONS, DEFAULT_AMENITIES (+11 more)

### Community 37 - "Navigation Menu Component"
Cohesion: 0.25
Nodes (8): @radix-ui/react-navigation-menu, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 38 - "Partners.tsx"
Cohesion: 0.08
Nodes (29): Partners, MobileCard(), MobileCardProps, MobileCardRow(), MobileCardRowProps, ResponsiveTable(), ResponsiveTableProps, Testimonial (+21 more)

### Community 39 - "PropertyDetail.tsx"
Cohesion: 0.18
Nodes (11): dompurify, PropertyDetail, CustomCursor(), FAQItem, PropertyFAQ(), SidebarProvider, DEFAULT_FEATURES, getTransactionTypeLabel() (+3 more)

### Community 40 - "Build Scripts"
Cohesion: 0.25
Nodes (8): scripts, build, build:dev, dev, lint, prebuild, predev, preview

### Community 41 - "cn"
Cohesion: 0.07
Nodes (38): cmdk, @radix-ui/react-hover-card, @radix-ui/react-progress, react-resizable-panels, AlertDialogOverlay, Command, CommandDialogProps, CommandEmpty (+30 more)

### Community 42 - "PropertyCardMinimal.tsx"
Cohesion: 0.25
Nodes (7): OptimizedImage, OptimizedImageProps, constructionStatusTranslations, locationTranslations, PropertyCardMinimal(), PropertyCardMinimalProps, propertyTypeTranslations

### Community 43 - "Contact Email Function"
Cohesion: 0.43
Nodes (6): allowedOrigins, escapeHtml(), getCorsHeaders(), handler(), RESEND_API_KEY, validateInput()

### Community 44 - "Voi Home — Voice"
Cohesion: 0.33
Nodes (5): Arabic and Russian, Audiences, Mechanics, Principles, Voi Home — Voice

### Community 45 - "lucide-react"
Cohesion: 0.14
Nodes (17): lucide-react, BlogDetail, Footer(), Header(), MapSection(), NotFoundState(), NotFoundStateProps, absolute() (+9 more)

### Community 46 - "input-otp.tsx"
Cohesion: 0.33
Nodes (5): input-otp, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 47 - "CustomVideoPlayer.tsx"
Cohesion: 0.40
Nodes (3): @radix-ui/react-slider, CustomVideoPlayerProps, Slider

### Community 48 - "react-i18next"
Cohesion: 0.12
Nodes (17): react-i18next, AboutHero(), AboutHeroProps, FeatureRowProps, FounderProfileProps, ManifestoItem, ManifestoList(), ManifestoListProps (+9 more)

### Community 49 - "Properties.tsx"
Cohesion: 0.11
Nodes (23): gsap, @radix-ui/react-dialog, Properties, ShatterHero(), ButtonProps, Pagination(), PaginationContent, PaginationEllipsis() (+15 more)

### Community 52 - "react"
Cohesion: 0.11
Nodes (22): react, DeletableSelect(), DeletableSelectProps, MultiSelectCheckbox(), MultiSelectCheckboxProps, Props, State, FilterOption (+14 more)

### Community 53 - "Pill Picker Component"
Cohesion: 0.50
Nodes (4): pillClass(), PillOption, PillPicker(), PillPickerProps

### Community 54 - "Vite Build Config"
Cohesion: 0.50
Nodes (3): lovable-tagger, vite, @vitejs/plugin-react-swc

### Community 55 - "radio-group.tsx"
Cohesion: 0.50
Nodes (3): @radix-ui/react-radio-group, RadioGroup, RadioGroupItem

### Community 56 - "prerender.mjs"
Cohesion: 0.20
Nodes (13): CONCURRENCY, DIST, main(), worker(), MIME, outFile(), PIXEL, puppeteer (+5 more)

### Community 57 - "eslint.config.js"
Cohesion: 0.33
Nodes (5): @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint

### Community 58 - "dropdown-menu.tsx"
Cohesion: 0.18
Nodes (11): @radix-ui/react-dropdown-menu, LanguageSwitcherProps, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator (+3 more)

### Community 59 - "OurServices.tsx"
Cohesion: 0.47
Nodes (3): OurServices(), getBlogUrl(), ROUTES

### Community 60 - "indexnow.mjs"
Cohesion: 0.22
Nodes (9): changed, current, expectedSitemap, fileFor(), key, previous, removed, signature() (+1 more)

### Community 61 - "StatsOverlay.tsx"
Cohesion: 0.29
Nodes (7): Stat, StatBand(), StatBandProps, Stat, StatsOverlay(), StatsOverlayProps, skipCountUp()

### Community 66 - "avatar.tsx"
Cohesion: 0.40
Nodes (4): @radix-ui/react-avatar, Avatar, AvatarFallback, AvatarImage

### Community 67 - "Auth.tsx"
Cohesion: 0.08
Nodes (23): @supabase/supabase-js, zod, SitemapEntry, staticEntries, today, Auth, Voi Luxury Real Estate Logo (Auth Variant), DashboardSidebarProps (+15 more)

### Community 70 - "BlogsManagement.tsx"
Cohesion: 0.22
Nodes (16): AffectedProperty, DeleteConfirmDialogProps, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader() (+8 more)

### Community 71 - "client.ts"
Cohesion: 0.20
Nodes (10): sonner, ImageUpload(), ImageUploadProps, MultiImageUpload(), MultiImageUploadProps, SortableImageProps, FilterOption, FilterOptions (+2 more)

### Community 84 - "useCustomOptions.ts"
Cohesion: 0.22
Nodes (9): AffectedProperty, CATEGORY_CONFIGS, CategoryConfig, DEFAULT_OPTIONS, DeleteConfirmation, mapStorageKeyToCategory(), OptionsState, STORAGE_KEYS (+1 more)

### Community 85 - "drawer.tsx"
Cohesion: 0.22
Nodes (7): vaul, DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 89 - "scroll-area.tsx"
Cohesion: 0.50
Nodes (3): @radix-ui/react-scroll-area, ScrollArea, ScrollBar

## Knowledge Gaps
- **400 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+395 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 462 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **17 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `TestimonialsManagement.tsx`, `breadcrumb.tsx`, `hooks/use-toast.ts`, `Faq.tsx`, `sidebar.tsx`, `context-menu.tsx`, `carousel.tsx`, `Button`, `MapPicker.tsx`, `Form Components`, `Charts Data Visualization`, `Dashboard.tsx`, `class-variance-authority`, `PropertiesManagement.tsx`, `Navigation Menu Component`, `Partners.tsx`, `PropertyDetail.tsx`, `PropertyCardMinimal.tsx`, `input-otp.tsx`, `CustomVideoPlayer.tsx`, `react-i18next`, `Properties.tsx`, `react`, `radio-group.tsx`, `dropdown-menu.tsx`, `avatar.tsx`, `Auth.tsx`, `BlogsManagement.tsx`, `drawer.tsx`, `scroll-area.tsx`?**
  _High betweenness centrality (0.154) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `TestimonialsManagement.tsx`, `App.tsx`, `breadcrumb.tsx`, `Experience.tsx`, `hooks/use-toast.ts`, `Faq.tsx`, `package.json`, `sidebar.tsx`, `context-menu.tsx`, `Property`, `Blogs.tsx`, `carousel.tsx`, `MapPicker.tsx`, `PropertiesMap.tsx`, `useProperties.ts`, `Form Components`, `Charts Data Visualization`, `Dashboard.tsx`, `class-variance-authority`, `RichTextEditor.tsx`, `PropertiesManagement.tsx`, `Navigation Menu Component`, `Partners.tsx`, `PropertyDetail.tsx`, `cn`, `PropertyCardMinimal.tsx`, `lucide-react`, `input-otp.tsx`, `CustomVideoPlayer.tsx`, `react-i18next`, `Properties.tsx`, `radio-group.tsx`, `dropdown-menu.tsx`, `StatsOverlay.tsx`, `avatar.tsx`, `Auth.tsx`, `BlogsManagement.tsx`, `client.ts`, `StatementSection.tsx`, `YouTubeFacade.tsx`, `useCustomOptions.ts`, `drawer.tsx`, `scroll-area.tsx`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.112) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _400 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.02702702702702703 - nodes in this community are weakly interconnected._
- **Should `constants/property.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._
- **Should `App.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.09846153846153846 - nodes in this community are weakly interconnected._