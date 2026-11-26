# Graph Report - voi home website  (2026-11-19)

## Corpus Check
- 232 files · ~295,437 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1145 nodes · 2802 edges · 71 communities (53 shown, 14 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `30be541d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- PropertiesManagement.tsx
- dependencies
- constants/property.ts
- App.tsx
- breadcrumb.tsx
- react-router-dom
- Auth.tsx
- menubar.tsx
- sonner.tsx
- FaqList.tsx
- package.json
- sidebar.tsx
- Dashboard.tsx
- guides/index.ts
- PropertyCard.tsx
- react-i18next
- TypeScript App Config
- Dev Tool Dependencies
- Shadcn UI Config
- TypeScript Node Config
- carousel.tsx
- button.tsx
- MapPicker.tsx
- PropertyDetail.tsx
- PropertyFilters.tsx
- Form Components
- command.tsx
- Project Setup Docs
- Charts Data Visualization
- ShatterHero.tsx
- RestoreHiddenOptions.tsx
- types.ts
- Contact Reply Email Function
- TypeScript Root Config
- class-variance-authority
- RichTextEditor.tsx
- drawer.tsx
- Navigation Menu Component
- react
- Build Scripts
- cn
- Contact Email Function
- Voi Home — Voice
- RevealOnScroll.tsx
- Properties.tsx
- CLAUDE.md
- lucide-react
- Pill Picker Component
- Vite Build Config
- eslint.config.js
- dropdown-menu.tsx
- sheet.tsx
- Hero Villa - Luxury Modern Villa with Infinity Pool at Sunset
- Lead Webhook Integration
- OG Preview Function
- avatar.tsx
- routes.ts
- Sitemap Edge Function
- config.ts
- Favicon Assets
- Crawler Configuration
- OG Social Share Image (Mr. Property Brand — Outdated)
- Aspect Ratio Component
- Collapsible Component
- Tailwind Configuration
- Placeholder Image
- Project README

## God Nodes (most connected - your core abstractions)
1. `cn()` - 237 edges
2. `react` - 99 edges
3. `lucide-react` - 75 edges
4. `react-i18next` - 68 edges
5. `react-router-dom` - 38 edges
6. `Button` - 38 edges
7. `RevealOnScroll()` - 29 edges
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
- `PropertyCard()` --calls--> `getTranslatedContent()`  [EXTRACTED]
  src/components/property/PropertyCard.tsx → src/lib/i18n-content.ts

## Import Cycles
- None detected.

## Communities (71 total, 14 thin omitted)

### Community 0 - "PropertiesManagement.tsx"
Cohesion: 0.05
Nodes (86): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, sonner, DeletableSelect(), DeletableSelectProps, AffectedProperty, DeleteConfirmDialog() (+78 more)

### Community 1 - "dependencies"
Cohesion: 0.03
Nodes (74): dependencies, class-variance-authority, clsx, cmdk, date-fns, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities (+66 more)

### Community 2 - "constants/property.ts"
Cohesion: 0.11
Nodes (17): ALANYA_DISTRICTS, ANKARA_DISTRICTS, ANTALYA_DISTRICTS, BENEFIT_OPTIONS, BODRUM_DISTRICTS, BURSA_DISTRICTS, CONSTRUCTION_STATUSES, DEFAULT_FEATURES (+9 more)

### Community 3 - "App.tsx"
Cohesion: 0.09
Nodes (22): react-helmet-async, @tanstack/react-query, About, ComingSoon, Contact, Faq, Links, NotFound (+14 more)

### Community 4 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (8): @radix-ui/react-slot, Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 5 - "react-router-dom"
Cohesion: 0.14
Nodes (17): react-router-dom, PartnerLogo, PartnerStrip(), PhotoScroller(), PhotoScrollerProps, PropertyScrollShowcase(), FeaturedProperties(), TURKEY_FILTER (+9 more)

### Community 6 - "Auth.tsx"
Cohesion: 0.06
Nodes (47): @radix-ui/react-checkbox, @radix-ui/react-toast, zod, Auth, Voi Luxury Real Estate Logo (Auth Variant), MobileCard(), MobileCardProps, MobileCardRow() (+39 more)

### Community 7 - "menubar.tsx"
Cohesion: 0.15
Nodes (12): @radix-ui/react-menubar, Menubar, MenubarCheckboxItem, MenubarContent, MenubarItem, MenubarLabel, MenubarRadioItem, MenubarSeparator (+4 more)

### Community 8 - "sonner.tsx"
Cohesion: 0.50
Nodes (3): next-themes, Toaster(), ToasterProps

### Community 9 - "FaqList.tsx"
Cohesion: 0.14
Nodes (17): @radix-ui/react-accordion, faqLang(), FaqList(), FaqListProps, LINK_LABEL, FaqTeaser(), TEASER_ITEMS, AccordionContent (+9 more)

### Community 10 - "package.json"
Cohesion: 0.06
Nodes (32): name, private, type, version, autoprefixer, clsx, date-fns, embla-carousel-auto-scroll (+24 more)

### Community 11 - "sidebar.tsx"
Cohesion: 0.10
Nodes (30): DashboardSidebar(), Separator, Sidebar, SidebarContent, SidebarContext, SidebarFooter, SidebarGroup, SidebarGroupAction (+22 more)

### Community 12 - "Dashboard.tsx"
Cohesion: 0.08
Nodes (28): @supabase/supabase-js, SitemapEntry, staticEntries, today, Dashboard, DashboardSidebarProps, MaintenanceCheck(), MaintenanceCheckProps (+20 more)

### Community 13 - "guides/index.ts"
Cohesion: 0.24
Nodes (13): howToBuy, offPlan, residencePermit, tapuGuide, dailyLife, europeanVsAsianSide, familyAreas, livingInIstanbul (+5 more)

### Community 14 - "PropertyCard.tsx"
Cohesion: 0.12
Nodes (16): AreaDetails(), AreaDetailsProps, InvestmentReturns(), InvestmentReturnsProps, constructionStatusTranslations, locationTranslations, PropertyCard(), PropertyCardProps (+8 more)

### Community 15 - "react-i18next"
Cohesion: 0.22
Nodes (11): react-i18next, Blogs, Blog, BlogCardMinimal(), BlogCardMinimalProps, Blog, BlogCategoryPicker(), GUIDES (+3 more)

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

### Community 21 - "button.tsx"
Cohesion: 0.12
Nodes (25): CustomVideoPlayerProps, ServiceCard(), ServiceCardProps, ServicesCta(), ServicesCtaProps, Button, SERVICES_AR, SERVICES_EN (+17 more)

### Community 22 - "MapPicker.tsx"
Cohesion: 0.10
Nodes (27): leaflet, open-location-code, @radix-ui/react-tabs, react-leaflet, LanguageTabsProps, DEFAULT_CENTER, isFullPlusCode(), isValidPlusCode() (+19 more)

### Community 23 - "PropertyDetail.tsx"
Cohesion: 0.08
Nodes (26): @maplibre/maplibre-gl-leaflet, PropertiesMap, PropertyDetail, Testimonial, TestimonialBreak(), TestimonialBreakProps, OptimizedImage, OptimizedImageProps (+18 more)

### Community 24 - "PropertyFilters.tsx"
Cohesion: 0.27
Nodes (11): FilterOption, PropertyFilters(), PropertyFiltersProps, getDistrictsForCity(), getCityAliases(), normalizeLocationText(), propertyMatchesCity(), FloorPlan (+3 more)

### Community 25 - "Form Components"
Cohesion: 0.19
Nodes (12): @radix-ui/react-label, react-hook-form, FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext (+4 more)

### Community 26 - "command.tsx"
Cohesion: 0.17
Nodes (10): cmdk, Command, CommandDialogProps, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList (+2 more)

### Community 27 - "Project Setup Docs"
Cohesion: 0.17
Nodes (12): AreaDetails Component, Code Quality Guidelines, Google Analytics GA4 (G-ERQ8NMYJ6P), Google Tag Manager (GTM-T2QKMTMP), HTML Entry Point, InvestmentReturns Component, LoadingSpinner Component, PropertyOverview Component (+4 more)

### Community 28 - "Charts Data Visualization"
Cohesion: 0.23
Nodes (10): recharts, ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, getPayloadConfigFromPayload() (+2 more)

### Community 29 - "ShatterHero.tsx"
Cohesion: 0.18
Nodes (9): gsap, ShatterHero(), TILES, COUNTRIES, TURKIYE_CITIES, FilterOption, FilterOptions, useFilterOptions() (+1 more)

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
Cohesion: 0.22
Nodes (8): @radix-ui/react-popover, @tiptap/extension-color, @tiptap/extension-text-style, @tiptap/react, @tiptap/starter-kit, colors, RichTextEditorProps, PopoverContent

### Community 36 - "drawer.tsx"
Cohesion: 0.22
Nodes (7): vaul, DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 37 - "Navigation Menu Component"
Cohesion: 0.25
Nodes (8): @radix-ui/react-navigation-menu, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 39 - "react"
Cohesion: 0.05
Nodes (20): @radix-ui/react-hover-card, @radix-ui/react-progress, @radix-ui/react-slider, react, CustomCursor(), Stat, StatBand(), StatBandProps (+12 more)

### Community 40 - "Build Scripts"
Cohesion: 0.25
Nodes (8): scripts, build, build:dev, dev, lint, prebuild, predev, preview

### Community 41 - "cn"
Cohesion: 0.08
Nodes (34): input-otp, @radix-ui/react-context-menu, @radix-ui/react-radio-group, @radix-ui/react-scroll-area, react-resizable-panels, AlertDialogOverlay, ContextMenuCheckboxItem, ContextMenuContent (+26 more)

### Community 43 - "Contact Email Function"
Cohesion: 0.43
Nodes (6): allowedOrigins, escapeHtml(), getCorsHeaders(), handler(), RESEND_API_KEY, validateInput()

### Community 44 - "Voi Home — Voice"
Cohesion: 0.33
Nodes (5): Arabic and Russian, Audiences, Mechanics, Principles, Voi Home — Voice

### Community 48 - "RevealOnScroll.tsx"
Cohesion: 0.09
Nodes (22): AboutHero(), AboutHeroProps, FeatureRowProps, FounderProfileProps, ManifestoItem, ManifestoList(), ManifestoListProps, ProcessSteps() (+14 more)

### Community 49 - "Properties.tsx"
Cohesion: 0.21
Nodes (12): Properties, LoadingSpinner(), LoadingSpinnerProps, ButtonProps, Pagination(), PaginationContent, PaginationEllipsis(), PaginationItem (+4 more)

### Community 52 - "lucide-react"
Cohesion: 0.18
Nodes (13): dompurify, lucide-react, BlogDetail, Footer(), Header(), NotFoundState(), NotFoundStateProps, SEOHead() (+5 more)

### Community 53 - "Pill Picker Component"
Cohesion: 0.50
Nodes (4): pillClass(), PillOption, PillPicker(), PillPickerProps

### Community 54 - "Vite Build Config"
Cohesion: 0.50
Nodes (3): lovable-tagger, vite, @vitejs/plugin-react-swc

### Community 57 - "eslint.config.js"
Cohesion: 0.33
Nodes (5): @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint

### Community 58 - "dropdown-menu.tsx"
Cohesion: 0.16
Nodes (12): @radix-ui/react-dropdown-menu, LanguageSwitcher(), LanguageSwitcherProps, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem (+4 more)

### Community 60 - "sheet.tsx"
Cohesion: 0.22
Nodes (9): @radix-ui/react-dialog, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle (+1 more)

### Community 66 - "avatar.tsx"
Cohesion: 0.40
Nodes (4): @radix-ui/react-avatar, Avatar, AvatarFallback, AvatarImage

### Community 67 - "routes.ts"
Cohesion: 0.40
Nodes (3): OurServices(), getBlogUrl(), ROUTES

## Knowledge Gaps
- **386 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+381 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 449 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **14 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `PropertiesManagement.tsx`, `App.tsx`, `breadcrumb.tsx`, `react-router-dom`, `Auth.tsx`, `menubar.tsx`, `FaqList.tsx`, `package.json`, `sidebar.tsx`, `Dashboard.tsx`, `PropertyCard.tsx`, `react-i18next`, `carousel.tsx`, `button.tsx`, `MapPicker.tsx`, `PropertyDetail.tsx`, `PropertyFilters.tsx`, `Form Components`, `command.tsx`, `Charts Data Visualization`, `ShatterHero.tsx`, `class-variance-authority`, `RichTextEditor.tsx`, `drawer.tsx`, `Navigation Menu Component`, `cn`, `RevealOnScroll.tsx`, `Properties.tsx`, `lucide-react`, `dropdown-menu.tsx`, `sheet.tsx`, `avatar.tsx`?**
  _High betweenness centrality (0.168) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `PropertiesManagement.tsx`, `breadcrumb.tsx`, `Auth.tsx`, `menubar.tsx`, `FaqList.tsx`, `sidebar.tsx`, `Dashboard.tsx`, `carousel.tsx`, `button.tsx`, `MapPicker.tsx`, `PropertyDetail.tsx`, `Form Components`, `command.tsx`, `Charts Data Visualization`, `class-variance-authority`, `RichTextEditor.tsx`, `drawer.tsx`, `Navigation Menu Component`, `react`, `RevealOnScroll.tsx`, `Properties.tsx`, `lucide-react`, `dropdown-menu.tsx`, `sheet.tsx`, `avatar.tsx`?**
  _High betweenness centrality (0.147) - this node is a cross-community bridge._
- **Why does `lucide-react` connect `lucide-react` to `PropertiesManagement.tsx`, `App.tsx`, `breadcrumb.tsx`, `react-router-dom`, `Auth.tsx`, `menubar.tsx`, `FaqList.tsx`, `package.json`, `sidebar.tsx`, `Dashboard.tsx`, `PropertyCard.tsx`, `react-i18next`, `carousel.tsx`, `button.tsx`, `MapPicker.tsx`, `PropertyDetail.tsx`, `command.tsx`, `ShatterHero.tsx`, `RestoreHiddenOptions.tsx`, `RichTextEditor.tsx`, `Navigation Menu Component`, `react`, `cn`, `RevealOnScroll.tsx`, `Properties.tsx`, `dropdown-menu.tsx`, `sheet.tsx`?**
  _High betweenness centrality (0.118) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _386 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `PropertiesManagement.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05388961321164711 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.02702702702702703 - nodes in this community are weakly interconnected._
- **Should `constants/property.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._