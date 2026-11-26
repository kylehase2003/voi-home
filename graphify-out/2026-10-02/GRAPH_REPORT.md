# Graph Report - voi home website  (2026-10-02)

## Corpus Check
- 211 files · ~264,979 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1049 nodes · 2541 edges · 75 communities (56 shown, 15 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `f792cc5f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- PropertiesManagement.tsx
- Frontend Dependencies
- constants/property.ts
- react
- BlogDetail.tsx
- react-i18next
- Toast Notification System
- cn
- App.tsx
- Footer.tsx
- package.json
- sidebar.tsx
- PropertiesMap.tsx
- radio-group.tsx
- PropertyMap.tsx
- PropertyCard.tsx
- TypeScript App Config
- Dev Tool Dependencies
- Shadcn UI Config
- TypeScript Node Config
- PropertyDetail.tsx
- lucide-react
- MapPicker.tsx
- useProperties.ts
- drawer.tsx
- Form Components
- command.tsx
- Project Setup Docs
- Charts Data Visualization
- Property
- ErrorBoundary.tsx
- Database Type Definitions
- Contact Reply Email Function
- TypeScript Root Config
- class-variance-authority
- RichTextEditor.tsx
- useCustomOptions.ts
- Navigation Menu Component
- Breadcrumb Navigation
- input-otp.tsx
- Build Scripts
- RestoreHiddenOptions.tsx
- PropertyCardMinimal.tsx
- Contact Email Function
- Voi Home — Voice
- dropdown-menu.tsx
- avatar.tsx
- generate-sitemap.ts
- About.tsx
- accordion.tsx
- CLAUDE.md
- scroll-area.tsx
- OurServices.tsx
- Pill Picker Component
- Vite Build Config
- resizable.tsx
- hover-card.tsx
- eslint.config.js
- progress.tsx
- Hero Villa - Luxury Modern Villa with Infinity Pool at Sunset
- Lead Webhook Integration
- OG Preview Function
- Sitemap Edge Function
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
2. `react` - 97 edges
3. `lucide-react` - 65 edges
4. `react-i18next` - 58 edges
5. `Button` - 37 edges
6. `react-router-dom` - 29 edges
7. `RevealOnScroll()` - 24 edges
8. `supabase` - 23 edges
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
- `PropertyCardProps` --references--> `Property`  [EXTRACTED]
  src/components/property/PropertyCard.tsx → src/types/property.ts

## Import Cycles
- None detected.

## Communities (75 total, 15 thin omitted)

### Community 0 - "PropertiesManagement.tsx"
Cohesion: 0.06
Nodes (82): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, sonner, DeletableSelect(), DeletableSelectProps, AffectedProperty, DeleteConfirmDialog() (+74 more)

### Community 1 - "Frontend Dependencies"
Cohesion: 0.03
Nodes (72): dependencies, class-variance-authority, clsx, cmdk, date-fns, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities (+64 more)

### Community 2 - "constants/property.ts"
Cohesion: 0.11
Nodes (16): ALANYA_DISTRICTS, ANKARA_DISTRICTS, ANTALYA_DISTRICTS, BENEFIT_OPTIONS, BODRUM_DISTRICTS, BURSA_DISTRICTS, CONSTRUCTION_STATUSES, FETHIYE_DISTRICTS (+8 more)

### Community 3 - "react"
Cohesion: 0.08
Nodes (29): @radix-ui/react-slider, react, CustomVideoPlayerProps, MobileCard(), MobileCardProps, MobileCardRow(), MobileCardRowProps, ResponsiveTable() (+21 more)

### Community 4 - "BlogDetail.tsx"
Cohesion: 0.24
Nodes (7): dompurify, BlogDetail, NotFound, Header(), NotFoundState(), NotFoundStateProps, Blog

### Community 5 - "react-i18next"
Cohesion: 0.09
Nodes (22): react-i18next, react-router-dom, Blog, BlogCategoryPicker(), FeatureRowProps, FounderProfileProps, PhotoScroller(), PhotoScrollerProps (+14 more)

### Community 6 - "Toast Notification System"
Cohesion: 0.11
Nodes (27): @radix-ui/react-toast, Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle (+19 more)

### Community 7 - "cn"
Cohesion: 0.10
Nodes (31): @radix-ui/react-context-menu, AlertDialogOverlay, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator (+23 more)

### Community 8 - "App.tsx"
Cohesion: 0.10
Nodes (15): i18next, next-themes, @tanstack/react-query, App(), Auth, ComingSoon, Partners, Properties (+7 more)

### Community 9 - "Footer.tsx"
Cohesion: 0.10
Nodes (16): react-helmet-async, Blogs, Contact, PrivacyPolicy, Team, TermsConditions, Voi Logo (White/Light Variant, PNG), Voi Logo (White Variant, PNG) (+8 more)

### Community 10 - "package.json"
Cohesion: 0.06
Nodes (32): name, private, type, version, autoprefixer, clsx, date-fns, embla-carousel-auto-scroll (+24 more)

### Community 11 - "sidebar.tsx"
Cohesion: 0.06
Nodes (48): @radix-ui/react-separator, @radix-ui/react-tooltip, Dashboard, Voi Luxury Real Estate Logo (Auth Variant), CustomCursor(), DashboardSidebar(), DashboardSidebarProps, Separator (+40 more)

### Community 12 - "PropertiesMap.tsx"
Cohesion: 0.29
Nodes (5): PropertiesMap, LoadingSpinner(), LoadingSpinnerProps, FitBoundsProps, goldIcon

### Community 13 - "radio-group.tsx"
Cohesion: 0.50
Nodes (3): @radix-ui/react-radio-group, RadioGroup, RadioGroupItem

### Community 14 - "PropertyMap.tsx"
Cohesion: 0.22
Nodes (13): react-leaflet, isValidCoordinate(), MapPositionSyncProps, matchesExpectedRegion(), normalizeLocationKey(), parseCoordinate(), parseCoordinatesFromUrl(), ParsedCoordinates (+5 more)

### Community 15 - "PropertyCard.tsx"
Cohesion: 0.12
Nodes (17): Blog, BlogCardMinimal(), BlogCardMinimalProps, Testimonial, TestimonialBreak(), TestimonialBreakProps, OptimizedImage, OptimizedImageProps (+9 more)

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
Nodes (21): embla-carousel-react, PropertyDetail, FAQItem, PropertyFAQ(), Carousel, CarouselApi, CarouselContent, CarouselContext (+13 more)

### Community 21 - "lucide-react"
Cohesion: 0.17
Nodes (18): lucide-react, ButtonProps, Pagination(), PaginationContent, PaginationEllipsis(), PaginationItem, PaginationLink(), PaginationLinkProps (+10 more)

### Community 22 - "MapPicker.tsx"
Cohesion: 0.15
Nodes (17): leaflet, open-location-code, @radix-ui/react-tabs, LanguageTabsProps, DEFAULT_CENTER, isFullPlusCode(), isValidPlusCode(), MapPicker() (+9 more)

### Community 23 - "useProperties.ts"
Cohesion: 0.29
Nodes (10): PropertyFilters(), PropertyFiltersProps, getDistrictsForCity(), getCityAliases(), normalizeLocationText(), propertyMatchesCity(), FloorPlan, NearbyPlace (+2 more)

### Community 24 - "drawer.tsx"
Cohesion: 0.22
Nodes (7): vaul, DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 25 - "Form Components"
Cohesion: 0.19
Nodes (12): @radix-ui/react-label, react-hook-form, FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext (+4 more)

### Community 26 - "command.tsx"
Cohesion: 0.15
Nodes (11): cmdk, @radix-ui/react-dialog, Command, CommandDialogProps, CommandEmpty, CommandGroup, CommandInput, CommandItem (+3 more)

### Community 27 - "Project Setup Docs"
Cohesion: 0.17
Nodes (12): AreaDetails Component, Code Quality Guidelines, Google Analytics GA4 (G-ERQ8NMYJ6P), Google Tag Manager (GTM-T2QKMTMP), HTML Entry Point, InvestmentReturns Component, LoadingSpinner Component, PropertyOverview Component (+4 more)

### Community 28 - "Charts Data Visualization"
Cohesion: 0.23
Nodes (10): recharts, ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, getPayloadConfigFromPayload() (+2 more)

### Community 29 - "Property"
Cohesion: 0.24
Nodes (8): AreaDetails(), AreaDetailsProps, InvestmentReturns(), InvestmentReturnsProps, PropertyOverview(), PropertyOverviewProps, SortableRowProps, Property

### Community 30 - "ErrorBoundary.tsx"
Cohesion: 0.22
Nodes (3): ErrorBoundary, Props, State

### Community 31 - "Database Type Definitions"
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

### Community 36 - "useCustomOptions.ts"
Cohesion: 0.22
Nodes (9): AffectedProperty, CATEGORY_CONFIGS, CategoryConfig, DEFAULT_OPTIONS, DeleteConfirmation, mapStorageKeyToCategory(), OptionsState, STORAGE_KEYS (+1 more)

### Community 37 - "Navigation Menu Component"
Cohesion: 0.25
Nodes (8): @radix-ui/react-navigation-menu, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 38 - "Breadcrumb Navigation"
Cohesion: 0.22
Nodes (8): @radix-ui/react-slot, Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 39 - "input-otp.tsx"
Cohesion: 0.33
Nodes (5): input-otp, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 40 - "Build Scripts"
Cohesion: 0.25
Nodes (8): scripts, build, build:dev, dev, lint, prebuild, predev, preview

### Community 41 - "RestoreHiddenOptions.tsx"
Cohesion: 0.38
Nodes (6): DEFAULT_CATEGORY_LABELS, formatStatusValue(), formatTransactionValue(), HiddenDefaults, RestoreHiddenOptions(), RestoreHiddenOptionsProps

### Community 42 - "PropertyCardMinimal.tsx"
Cohesion: 0.14
Nodes (14): gsap, PropertyScrollShowcase(), FeaturedProperties(), TURKEY_FILTER, constructionStatusTranslations, locationTranslations, PropertyCardMinimal(), PropertyCardMinimalProps (+6 more)

### Community 43 - "Contact Email Function"
Cohesion: 0.43
Nodes (6): allowedOrigins, escapeHtml(), getCorsHeaders(), handler(), RESEND_API_KEY, validateInput()

### Community 44 - "Voi Home — Voice"
Cohesion: 0.33
Nodes (5): Arabic and Russian, Audiences, Mechanics, Principles, Voi Home — Voice

### Community 45 - "dropdown-menu.tsx"
Cohesion: 0.16
Nodes (12): @radix-ui/react-dropdown-menu, LanguageSwitcher(), LanguageSwitcherProps, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem (+4 more)

### Community 46 - "avatar.tsx"
Cohesion: 0.40
Nodes (4): @radix-ui/react-avatar, Avatar, AvatarFallback, AvatarImage

### Community 47 - "generate-sitemap.ts"
Cohesion: 0.29
Nodes (4): @supabase/supabase-js, SitemapEntry, staticEntries, today

### Community 48 - "About.tsx"
Cohesion: 0.11
Nodes (16): About, AboutHero(), AboutHeroProps, ManifestoItem, ManifestoList(), ManifestoListProps, Stat, StatBand() (+8 more)

### Community 49 - "accordion.tsx"
Cohesion: 0.40
Nodes (4): @radix-ui/react-accordion, AccordionContent, AccordionItem, AccordionTrigger

### Community 51 - "scroll-area.tsx"
Cohesion: 0.50
Nodes (3): @radix-ui/react-scroll-area, ScrollArea, ScrollBar

### Community 52 - "OurServices.tsx"
Cohesion: 0.47
Nodes (3): OurServices(), getBlogUrl(), ROUTES

### Community 53 - "Pill Picker Component"
Cohesion: 0.50
Nodes (4): pillClass(), PillOption, PillPicker(), PillPickerProps

### Community 54 - "Vite Build Config"
Cohesion: 0.50
Nodes (3): lovable-tagger, vite, @vitejs/plugin-react-swc

### Community 55 - "resizable.tsx"
Cohesion: 0.50
Nodes (3): react-resizable-panels, ResizableHandle(), ResizablePanelGroup()

### Community 57 - "eslint.config.js"
Cohesion: 0.33
Nodes (5): @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint

## Knowledge Gaps
- **369 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+364 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 429 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **15 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `PropertiesManagement.tsx`, `react`, `react-i18next`, `Toast Notification System`, `sidebar.tsx`, `radio-group.tsx`, `PropertyCard.tsx`, `PropertyDetail.tsx`, `lucide-react`, `MapPicker.tsx`, `drawer.tsx`, `Form Components`, `command.tsx`, `Charts Data Visualization`, `class-variance-authority`, `RichTextEditor.tsx`, `Navigation Menu Component`, `Breadcrumb Navigation`, `input-otp.tsx`, `dropdown-menu.tsx`, `avatar.tsx`, `accordion.tsx`, `scroll-area.tsx`, `resizable.tsx`, `hover-card.tsx`, `progress.tsx`?**
  _High betweenness centrality (0.164) - this node is a cross-community bridge._
- **Why does `react` connect `react` to `PropertiesManagement.tsx`, `BlogDetail.tsx`, `react-i18next`, `Toast Notification System`, `cn`, `App.tsx`, `Footer.tsx`, `package.json`, `sidebar.tsx`, `PropertiesMap.tsx`, `radio-group.tsx`, `PropertyMap.tsx`, `PropertyCard.tsx`, `PropertyDetail.tsx`, `lucide-react`, `MapPicker.tsx`, `useProperties.ts`, `drawer.tsx`, `Form Components`, `command.tsx`, `Charts Data Visualization`, `Property`, `ErrorBoundary.tsx`, `class-variance-authority`, `RichTextEditor.tsx`, `useCustomOptions.ts`, `Navigation Menu Component`, `Breadcrumb Navigation`, `input-otp.tsx`, `PropertyCardMinimal.tsx`, `dropdown-menu.tsx`, `avatar.tsx`, `About.tsx`, `accordion.tsx`, `scroll-area.tsx`, `hover-card.tsx`, `progress.tsx`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Frontend Dependencies` to `package.json`?**
  _High betweenness centrality (0.120) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _369 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `PropertiesManagement.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.058797524314765696 - nodes in this community are weakly interconnected._
- **Should `Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.027777777777777776 - nodes in this community are weakly interconnected._
- **Should `constants/property.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.1111111111111111 - nodes in this community are weakly interconnected._