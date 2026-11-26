# Graph Report - voi home website  (2026-11-10)

## Corpus Check
- 215 files · ~268,166 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1075 nodes · 2565 edges · 78 communities (59 shown, 15 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 7 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `39013951`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- BlogsManagement.tsx
- dependencies
- constants/property.ts
- App.tsx
- breadcrumb.tsx
- button.tsx
- Toast Notification System
- cn
- sonner.tsx
- generate-sitemap.ts
- package.json
- sidebar.tsx
- PartnersManagement.tsx
- react
- PropertiesManagement.tsx
- lucide-react
- TypeScript App Config
- Dev Tool Dependencies
- Shadcn UI Config
- TypeScript Node Config
- PropertyDetail.tsx
- Services.tsx
- MapPicker.tsx
- PropertyCard.tsx
- drawer.tsx
- Form Components
- command.tsx
- Project Setup Docs
- Charts Data Visualization
- BlogDetail.tsx
- RestoreHiddenOptions.tsx
- types.ts
- Contact Reply Email Function
- TypeScript Root Config
- class-variance-authority
- RichTextEditor.tsx
- PropertyMap.tsx
- Navigation Menu Component
- select.tsx
- ErrorBoundary
- Build Scripts
- input-otp.tsx
- alert.tsx
- Contact Email Function
- Voi Home — Voice
- utils.ts
- PropertyFilters.tsx
- ContactSubmissions.tsx
- react-i18next
- Properties.tsx
- CLAUDE.md
- radio-group.tsx
- SEOHead.tsx
- Pill Picker Component
- Vite Build Config
- PropertiesMap.tsx
- Property
- eslint.config.js
- sheet.tsx
- accordion.tsx
- Hero Villa - Luxury Modern Villa with Infinity Pool at Sunset
- Lead Webhook Integration
- OG Preview Function
- avatar.tsx
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
2. `react` - 98 edges
3. `lucide-react` - 68 edges
4. `react-i18next` - 62 edges
5. `Button` - 36 edges
6. `react-router-dom` - 33 edges
7. `supabase` - 24 edges
8. `RevealOnScroll()` - 20 edges
9. `Property` - 18 edges
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
- `CategoryConfig` --references--> `Property`  [EXTRACTED]
  src/hooks/useCustomOptions.ts → src/types/property.ts

## Import Cycles
- None detected.

## Communities (78 total, 15 thin omitted)

### Community 0 - "BlogsManagement.tsx"
Cohesion: 0.13
Nodes (22): LanguageTabs(), DialogContent, DialogDescription, DialogHeader(), DialogTitle, Label, labelVariants, Switch (+14 more)

### Community 1 - "dependencies"
Cohesion: 0.03
Nodes (74): dependencies, class-variance-authority, clsx, cmdk, date-fns, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities (+66 more)

### Community 2 - "constants/property.ts"
Cohesion: 0.11
Nodes (17): ALANYA_DISTRICTS, ANKARA_DISTRICTS, ANTALYA_DISTRICTS, BENEFIT_OPTIONS, BODRUM_DISTRICTS, BURSA_DISTRICTS, CONSTRUCTION_STATUSES, DEFAULT_FEATURES (+9 more)

### Community 3 - "App.tsx"
Cohesion: 0.10
Nodes (16): @tanstack/react-query, Auth, Blogs, ComingSoon, Contact, Dashboard, NotFound, Partners (+8 more)

### Community 4 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (8): @radix-ui/react-slot, Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 5 - "button.tsx"
Cohesion: 0.13
Nodes (18): react-router-dom, Blog, PhotoScrollerProps, PropertyScrollShowcase(), Props, State, FeaturedProperties(), TURKEY_FILTER (+10 more)

### Community 6 - "Toast Notification System"
Cohesion: 0.11
Nodes (27): @radix-ui/react-toast, Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle (+19 more)

### Community 7 - "cn"
Cohesion: 0.09
Nodes (36): @radix-ui/react-context-menu, @radix-ui/react-dropdown-menu, AlertDialogOverlay, CardFooter, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel (+28 more)

### Community 8 - "sonner.tsx"
Cohesion: 0.50
Nodes (3): next-themes, Toaster(), ToasterProps

### Community 9 - "generate-sitemap.ts"
Cohesion: 0.29
Nodes (4): @supabase/supabase-js, SitemapEntry, staticEntries, today

### Community 10 - "package.json"
Cohesion: 0.07
Nodes (29): name, private, type, version, autoprefixer, date-fns, embla-carousel-auto-scroll, eslint (+21 more)

### Community 11 - "sidebar.tsx"
Cohesion: 0.07
Nodes (48): @radix-ui/react-separator, Voi Luxury Real Estate Logo (Auth Variant), DashboardSidebar(), DashboardSidebarProps, MaintenanceCheck(), MaintenanceCheckProps, Separator, Sidebar (+40 more)

### Community 12 - "PartnersManagement.tsx"
Cohesion: 0.17
Nodes (12): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, ImageUpload(), ImageUploadProps, MultiImageUpload(), MultiImageUploadProps, SortableImageProps (+4 more)

### Community 13 - "react"
Cohesion: 0.07
Nodes (17): @radix-ui/react-slider, react, CustomCursor(), CustomVideoPlayerProps, PartnerLogo, Stat, StatBand(), StatBandProps (+9 more)

### Community 14 - "PropertiesManagement.tsx"
Cohesion: 0.08
Nodes (34): sonner, DeleteConfirmDialog(), MobileCard(), MobileCardProps, MobileCardRow(), MobileCardRowProps, ResponsiveTable(), ResponsiveTableProps (+26 more)

### Community 15 - "lucide-react"
Cohesion: 0.19
Nodes (15): lucide-react, Team, LanguageSwitcher(), LanguageSwitcherProps, SEOHead(), Card, CardContent, CardDescription (+7 more)

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
Cohesion: 0.12
Nodes (21): dompurify, embla-carousel-react, PropertyDetail, FAQItem, PropertyFAQ(), Carousel, CarouselApi, CarouselContent (+13 more)

### Community 21 - "Services.tsx"
Cohesion: 0.28
Nodes (7): Services, ProcessSteps(), ProcessStepsProps, Step, SERVICE_KEYS, Services(), whatsappLink()

### Community 22 - "MapPicker.tsx"
Cohesion: 0.11
Nodes (21): leaflet, open-location-code, @radix-ui/react-popover, @radix-ui/react-tabs, LanguageTabsProps, DEFAULT_CENTER, isFullPlusCode(), isValidPlusCode() (+13 more)

### Community 23 - "PropertyCard.tsx"
Cohesion: 0.15
Nodes (12): OptimizedImage, OptimizedImageProps, constructionStatusTranslations, locationTranslations, PropertyCardProps, propertyTypeTranslations, statusTranslations, constructionStatusTranslations (+4 more)

### Community 24 - "drawer.tsx"
Cohesion: 0.22
Nodes (7): vaul, DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

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

### Community 29 - "BlogDetail.tsx"
Cohesion: 0.15
Nodes (12): BlogDetail, Blog, BlogCardMinimal(), BlogCardMinimalProps, Testimonial, TestimonialBreak(), TestimonialBreakProps, PropertyCard() (+4 more)

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

### Community 36 - "PropertyMap.tsx"
Cohesion: 0.22
Nodes (13): react-leaflet, isValidCoordinate(), MapPositionSyncProps, matchesExpectedRegion(), normalizeLocationKey(), parseCoordinate(), parseCoordinatesFromUrl(), ParsedCoordinates (+5 more)

### Community 37 - "Navigation Menu Component"
Cohesion: 0.25
Nodes (8): @radix-ui/react-navigation-menu, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 38 - "select.tsx"
Cohesion: 0.19
Nodes (11): @radix-ui/react-select, DeletableSelect(), DeletableSelectProps, Input, SelectContent, SelectItem, SelectLabel, SelectScrollDownButton (+3 more)

### Community 40 - "Build Scripts"
Cohesion: 0.25
Nodes (8): scripts, build, build:dev, dev, lint, prebuild, predev, preview

### Community 41 - "input-otp.tsx"
Cohesion: 0.33
Nodes (5): input-otp, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 42 - "alert.tsx"
Cohesion: 0.50
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 43 - "Contact Email Function"
Cohesion: 0.43
Nodes (6): allowedOrigins, escapeHtml(), getCorsHeaders(), handler(), RESEND_API_KEY, validateInput()

### Community 44 - "Voi Home — Voice"
Cohesion: 0.33
Nodes (5): Arabic and Russian, Audiences, Mechanics, Principles, Voi Home — Voice

### Community 45 - "utils.ts"
Cohesion: 0.09
Nodes (15): clsx, @radix-ui/react-hover-card, @radix-ui/react-progress, @radix-ui/react-scroll-area, @radix-ui/react-tooltip, react-resizable-panels, tailwind-merge, HoverCardContent (+7 more)

### Community 46 - "PropertyFilters.tsx"
Cohesion: 0.19
Nodes (15): @radix-ui/react-checkbox, FilterOption, PropertyFilters(), PropertyFiltersProps, Checkbox, COUNTRIES, getDistrictsForCity(), TURKIYE_CITIES (+7 more)

### Community 47 - "ContactSubmissions.tsx"
Cohesion: 0.18
Nodes (15): react-day-picker, AffectedProperty, DeleteConfirmDialogProps, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter() (+7 more)

### Community 48 - "react-i18next"
Cohesion: 0.09
Nodes (23): react-i18next, About, AboutHero(), AboutHeroProps, FeatureRowProps, FounderProfileProps, ManifestoItem, ManifestoList() (+15 more)

### Community 49 - "Properties.tsx"
Cohesion: 0.21
Nodes (12): Properties, LoadingSpinner(), LoadingSpinnerProps, ButtonProps, Pagination(), PaginationContent, PaginationEllipsis(), PaginationItem (+4 more)

### Community 51 - "radio-group.tsx"
Cohesion: 0.50
Nodes (3): @radix-ui/react-radio-group, RadioGroup, RadioGroupItem

### Community 52 - "SEOHead.tsx"
Cohesion: 0.23
Nodes (9): react-helmet-async, Links, Voi Logo (White/Light Variant, PNG), Voi Logo (White Variant, PNG), TikTokIcon(), TikTokIconProps, SEOHeadProps, Links() (+1 more)

### Community 53 - "Pill Picker Component"
Cohesion: 0.50
Nodes (4): pillClass(), PillOption, PillPicker(), PillPickerProps

### Community 54 - "Vite Build Config"
Cohesion: 0.50
Nodes (3): lovable-tagger, vite, @vitejs/plugin-react-swc

### Community 55 - "PropertiesMap.tsx"
Cohesion: 0.18
Nodes (11): @maplibre/maplibre-gl-leaflet, PropertiesMap, compactPrice(), FitBoundsProps, groupIcon(), MAP_STYLES, MapStyle, MarkerLayer() (+3 more)

### Community 56 - "Property"
Cohesion: 0.24
Nodes (8): AreaDetails(), AreaDetailsProps, InvestmentReturns(), InvestmentReturnsProps, PropertyOverview(), PropertyOverviewProps, SortableRowProps, Property

### Community 57 - "eslint.config.js"
Cohesion: 0.33
Nodes (5): @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint

### Community 60 - "sheet.tsx"
Cohesion: 0.22
Nodes (9): @radix-ui/react-dialog, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle (+1 more)

### Community 61 - "accordion.tsx"
Cohesion: 0.40
Nodes (4): @radix-ui/react-accordion, AccordionContent, AccordionItem, AccordionTrigger

### Community 66 - "avatar.tsx"
Cohesion: 0.40
Nodes (4): @radix-ui/react-avatar, Avatar, AvatarFallback, AvatarImage

## Knowledge Gaps
- **376 isolated node(s):** `TextareaProps`, `Blog`, `SortableRowProps`, `SortableRowProps`, `TeamMember` (+371 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 447 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `BlogsManagement.tsx`, `App.tsx`, `breadcrumb.tsx`, `button.tsx`, `Toast Notification System`, `cn`, `package.json`, `sidebar.tsx`, `PartnersManagement.tsx`, `PropertiesManagement.tsx`, `lucide-react`, `PropertyDetail.tsx`, `MapPicker.tsx`, `PropertyCard.tsx`, `drawer.tsx`, `Form Components`, `command.tsx`, `Charts Data Visualization`, `BlogDetail.tsx`, `class-variance-authority`, `RichTextEditor.tsx`, `PropertyMap.tsx`, `Navigation Menu Component`, `select.tsx`, `input-otp.tsx`, `alert.tsx`, `utils.ts`, `PropertyFilters.tsx`, `ContactSubmissions.tsx`, `react-i18next`, `Properties.tsx`, `radio-group.tsx`, `PropertiesMap.tsx`, `Property`, `sheet.tsx`, `accordion.tsx`, `avatar.tsx`?**
  _High betweenness centrality (0.179) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `BlogsManagement.tsx`, `breadcrumb.tsx`, `button.tsx`, `Toast Notification System`, `sidebar.tsx`, `react`, `PropertiesManagement.tsx`, `lucide-react`, `PropertyDetail.tsx`, `MapPicker.tsx`, `PropertyCard.tsx`, `drawer.tsx`, `Form Components`, `command.tsx`, `Charts Data Visualization`, `class-variance-authority`, `Navigation Menu Component`, `select.tsx`, `input-otp.tsx`, `alert.tsx`, `utils.ts`, `PropertyFilters.tsx`, `ContactSubmissions.tsx`, `react-i18next`, `Properties.tsx`, `radio-group.tsx`, `sheet.tsx`, `accordion.tsx`, `avatar.tsx`?**
  _High betweenness centrality (0.132) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.131) - this node is a cross-community bridge._
- **What connects `TextareaProps`, `Blog`, `SortableRowProps` to the rest of the system?**
  _376 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `BlogsManagement.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.13015873015873017 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.02702702702702703 - nodes in this community are weakly interconnected._
- **Should `constants/property.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._