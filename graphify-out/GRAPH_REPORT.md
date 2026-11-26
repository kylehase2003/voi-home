# Graph Report - voi home website  (2026-11-25)

## Corpus Check
- 237 files · ~136,836 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 13 file(s) not represented in the graph (top: (none) 5, .css 2, .lock 1)

## Summary
- 1189 nodes · 2854 edges · 77 communities (57 shown, 20 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 8 edges (avg confidence: 0.82)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `acdf056e`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- PropertiesManagement.tsx
- dependencies
- constants/property.ts
- App.tsx
- Partners.tsx
- react-router-dom
- hooks/use-toast.ts
- breadcrumb.tsx
- sonner.tsx
- FaqList.tsx
- package.json
- sidebar.tsx
- drawer.tsx
- guides/index.ts
- ErrorBoundary.tsx
- BlogDetail.tsx
- TypeScript App Config
- Dev Tool Dependencies
- Shadcn UI Config
- TypeScript Node Config
- react
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
- Property
- Navigation Menu Component
- PropertyCard.tsx
- RestoreHiddenOptions.tsx
- Build Scripts
- cn
- avatar.tsx
- Contact Email Function
- Voi Home — Voice
- lucide-react
- input-otp.tsx
- progress.tsx
- RevealOnScroll.tsx
- Properties.tsx
- CLAUDE.md
- Pill Picker Component
- Vite Build Config
- hover-card.tsx
- prerender.mjs
- eslint.config.js
- dropdown-menu.tsx
- indexnow.mjs
- Hero Villa - Luxury Modern Villa with Infinity Pool at Sunset
- Lead Webhook Integration
- OG Preview Function
- Dashboard.tsx
- Sitemap Edge Function
- config.ts
- OurServices.tsx
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
- `InvestmentReturnsProps` --references--> `Property`  [EXTRACTED]
  src/components/property/InvestmentReturns.tsx → src/types/property.ts
- `PropertyCardMinimalProps` --references--> `Property`  [EXTRACTED]
  src/components/property/PropertyCardMinimal.tsx → src/types/property.ts
- `PropertyCardProps` --references--> `Property`  [EXTRACTED]
  src/components/property/PropertyCard.tsx → src/types/property.ts

## Import Cycles
- None detected.

## Communities (77 total, 20 thin omitted)

### Community 0 - "PropertiesManagement.tsx"
Cohesion: 0.05
Nodes (91): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, @radix-ui/react-select, sonner, DeletableSelect(), DeletableSelectProps, AffectedProperty (+83 more)

### Community 1 - "dependencies"
Cohesion: 0.03
Nodes (74): dependencies, class-variance-authority, clsx, cmdk, date-fns, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities (+66 more)

### Community 2 - "constants/property.ts"
Cohesion: 0.11
Nodes (17): ALANYA_DISTRICTS, ANKARA_DISTRICTS, ANTALYA_DISTRICTS, BENEFIT_OPTIONS, BODRUM_DISTRICTS, BURSA_DISTRICTS, CONSTRUCTION_STATUSES, DEFAULT_FEATURES (+9 more)

### Community 3 - "App.tsx"
Cohesion: 0.10
Nodes (17): @tanstack/react-query, About, App(), ComingSoon, Faq, NotFound, PrivacyPolicy, queryClient (+9 more)

### Community 4 - "Partners.tsx"
Cohesion: 0.27
Nodes (9): Partners, Team, Card, CardContent, CardDescription, CardHeader, CardTitle, Partner (+1 more)

### Community 5 - "react-router-dom"
Cohesion: 0.15
Nodes (14): react-router-dom, PartnerLogo, PartnerStrip(), PhotoScroller(), PhotoScrollerProps, ProcessSteps(), ProcessStepsProps, Step (+6 more)

### Community 6 - "hooks/use-toast.ts"
Cohesion: 0.11
Nodes (27): @radix-ui/react-toast, Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle (+19 more)

### Community 7 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (8): @radix-ui/react-slot, Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

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

### Community 12 - "drawer.tsx"
Cohesion: 0.22
Nodes (7): vaul, DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 13 - "guides/index.ts"
Cohesion: 0.11
Nodes (13): howToBuy, offPlan, residencePermit, tapuGuide, dailyLife, europeanVsAsianSide, familyAreas, livingInIstanbul (+5 more)

### Community 14 - "ErrorBoundary.tsx"
Cohesion: 0.22
Nodes (3): ErrorBoundary, Props, State

### Community 15 - "BlogDetail.tsx"
Cohesion: 0.15
Nodes (16): dompurify, BlogDetail, Blogs, Blog, BlogCategoryPicker(), ORG_ID, SITE_URL, findGuide() (+8 more)

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

### Community 20 - "react"
Cohesion: 0.06
Nodes (37): embla-carousel-react, @radix-ui/react-slider, react, PropertyDetail, CustomCursor(), CustomVideoPlayerProps, Stat, StatBand() (+29 more)

### Community 21 - "Button"
Cohesion: 0.14
Nodes (24): lucide-react, ServiceCard(), ServiceCardProps, ServicesCta(), ServicesCtaProps, SERVICES_AR, SERVICES_EN, CONTENT (+16 more)

### Community 22 - "MapPicker.tsx"
Cohesion: 0.10
Nodes (27): leaflet, open-location-code, @radix-ui/react-tabs, react-leaflet, LanguageTabsProps, DEFAULT_CENTER, isFullPlusCode(), isValidPlusCode() (+19 more)

### Community 23 - "PropertiesMap.tsx"
Cohesion: 0.16
Nodes (12): @maplibre/maplibre-gl-leaflet, PropertiesMap, LoadingSpinner(), LoadingSpinnerProps, compactPrice(), FitBoundsProps, groupIcon(), MAP_STYLES (+4 more)

### Community 24 - "useProperties.ts"
Cohesion: 0.15
Nodes (19): @radix-ui/react-checkbox, FeaturedProperties(), TURKEY_FILTER, FilterOption, PropertyFilters(), PropertyFiltersProps, Checkbox, COUNTRIES (+11 more)

### Community 25 - "Form Components"
Cohesion: 0.19
Nodes (12): @radix-ui/react-label, react-hook-form, FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext (+4 more)

### Community 26 - "Links.tsx"
Cohesion: 0.19
Nodes (12): react-helmet-async, Links, Voi Logo (White/Light Variant, PNG), Voi Logo (White Variant, PNG), TikTokIcon(), TikTokIconProps, absolute(), Crumb (+4 more)

### Community 27 - "Project Setup Docs"
Cohesion: 0.17
Nodes (8): Code Quality Guidelines, Google Analytics GA4 (G-ERQ8NMYJ6P), Google Tag Manager (GTM-T2QKMTMP), HTML Entry Point, Voi Home Logo — Apple Touch Icon, Voi Home Favicon 16x16, Supabase Cloud Backend, Voi Home Setup Checklist

### Community 28 - "Charts Data Visualization"
Cohesion: 0.23
Nodes (10): recharts, ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, getPayloadConfigFromPayload() (+2 more)

### Community 29 - "command.tsx"
Cohesion: 0.17
Nodes (10): cmdk, Command, CommandDialogProps, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList (+2 more)

### Community 30 - "sheet.tsx"
Cohesion: 0.14
Nodes (14): class-variance-authority, @radix-ui/react-dialog, Alert, AlertDescription, AlertTitle, alertVariants, SheetContent, SheetContentProps (+6 more)

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
Cohesion: 0.31
Nodes (7): @radix-ui/react-toggle, @radix-ui/react-toggle-group, ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 35 - "RichTextEditor.tsx"
Cohesion: 0.29
Nodes (6): @tiptap/extension-color, @tiptap/extension-text-style, @tiptap/react, @tiptap/starter-kit, colors, RichTextEditorProps

### Community 36 - "Property"
Cohesion: 0.13
Nodes (16): AreaDetails(), AreaDetailsProps, PropertyOverview(), PropertyOverviewProps, AffectedProperty, CATEGORY_CONFIGS, CategoryConfig, DEFAULT_OPTIONS (+8 more)

### Community 37 - "Navigation Menu Component"
Cohesion: 0.25
Nodes (8): @radix-ui/react-navigation-menu, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 38 - "PropertyCard.tsx"
Cohesion: 0.10
Nodes (21): Blog, BlogCardMinimal(), BlogCardMinimalProps, Testimonial, TestimonialBreak(), TestimonialBreakProps, OptimizedImage, OptimizedImageProps (+13 more)

### Community 39 - "RestoreHiddenOptions.tsx"
Cohesion: 0.38
Nodes (6): DEFAULT_CATEGORY_LABELS, formatStatusValue(), formatTransactionValue(), HiddenDefaults, RestoreHiddenOptions(), RestoreHiddenOptionsProps

### Community 40 - "Build Scripts"
Cohesion: 0.25
Nodes (8): scripts, build, build:dev, dev, lint, prebuild, predev, preview

### Community 41 - "cn"
Cohesion: 0.08
Nodes (38): @radix-ui/react-context-menu, @radix-ui/react-menubar, @radix-ui/react-radio-group, @radix-ui/react-scroll-area, react-resizable-panels, AlertDialogOverlay, CardFooter, ContextMenuCheckboxItem (+30 more)

### Community 42 - "avatar.tsx"
Cohesion: 0.40
Nodes (4): @radix-ui/react-avatar, Avatar, AvatarFallback, AvatarImage

### Community 43 - "Contact Email Function"
Cohesion: 0.43
Nodes (6): allowedOrigins, escapeHtml(), getCorsHeaders(), handler(), RESEND_API_KEY, validateInput()

### Community 44 - "Voi Home — Voice"
Cohesion: 0.33
Nodes (5): Arabic and Russian, Audiences, Mechanics, Principles, Voi Home — Voice

### Community 45 - "lucide-react"
Cohesion: 0.22
Nodes (7): react-i18next, Contact, Footer(), Header(), MapSection(), NotFoundState(), NotFoundStateProps

### Community 46 - "input-otp.tsx"
Cohesion: 0.33
Nodes (5): input-otp, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 48 - "RevealOnScroll.tsx"
Cohesion: 0.12
Nodes (16): AboutHero(), AboutHeroProps, FeatureRowProps, FounderProfileProps, ManifestoItem, ManifestoList(), ManifestoListProps, StoryScroll() (+8 more)

### Community 49 - "Properties.tsx"
Cohesion: 0.16
Nodes (16): gsap, Properties, ShatterHero(), ButtonProps, Pagination(), PaginationContent, PaginationEllipsis(), PaginationItem (+8 more)

### Community 53 - "Pill Picker Component"
Cohesion: 0.50
Nodes (4): pillClass(), PillOption, PillPicker(), PillPickerProps

### Community 54 - "Vite Build Config"
Cohesion: 0.50
Nodes (3): lovable-tagger, vite, @vitejs/plugin-react-swc

### Community 56 - "prerender.mjs"
Cohesion: 0.20
Nodes (13): CONCURRENCY, DIST, main(), worker(), MIME, outFile(), PIXEL, puppeteer (+5 more)

### Community 57 - "eslint.config.js"
Cohesion: 0.33
Nodes (5): @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint

### Community 58 - "dropdown-menu.tsx"
Cohesion: 0.18
Nodes (11): @radix-ui/react-dropdown-menu, LanguageSwitcherProps, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator (+3 more)

### Community 60 - "indexnow.mjs"
Cohesion: 0.22
Nodes (9): changed, current, expectedSitemap, fileFor(), key, previous, removed, signature() (+1 more)

### Community 67 - "Dashboard.tsx"
Cohesion: 0.07
Nodes (30): @supabase/supabase-js, zod, SitemapEntry, staticEntries, today, Auth, Dashboard, Voi Luxury Real Estate Logo (Auth Variant) (+22 more)

### Community 70 - "OurServices.tsx"
Cohesion: 0.47
Nodes (3): OurServices(), getBlogUrl(), ROUTES

## Knowledge Gaps
- **32 isolated node(s):** `autoprefixer`, `embla-carousel-auto-scroll`, `eslint`, `@hookform/resolvers`, `mapbox-gl` (+27 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 472 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `cn()` connect `cn` to `PropertiesManagement.tsx`, `Partners.tsx`, `hooks/use-toast.ts`, `breadcrumb.tsx`, `FaqList.tsx`, `sidebar.tsx`, `drawer.tsx`, `react`, `MapPicker.tsx`, `useProperties.ts`, `Form Components`, `Charts Data Visualization`, `command.tsx`, `sheet.tsx`, `class-variance-authority`, `Navigation Menu Component`, `PropertyCard.tsx`, `avatar.tsx`, `input-otp.tsx`, `progress.tsx`, `RevealOnScroll.tsx`, `Properties.tsx`, `hover-card.tsx`, `dropdown-menu.tsx`, `Dashboard.tsx`?**
  _High betweenness centrality (0.155) - this node is a cross-community bridge._
- **What connects `autoprefixer`, `embla-carousel-auto-scroll`, `eslint` to the rest of the system?**
  _32 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `PropertiesManagement.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05142857142857143 - nodes in this community are weakly interconnected._
- **Why does `react` connect `react` to `PropertiesManagement.tsx`, `App.tsx`, `Partners.tsx`, `react-router-dom`, `hooks/use-toast.ts`, `breadcrumb.tsx`, `FaqList.tsx`, `package.json`, `sidebar.tsx`, `drawer.tsx`, `ErrorBoundary.tsx`, `BlogDetail.tsx`, `MapPicker.tsx`, `PropertiesMap.tsx`, `useProperties.ts`, `Form Components`, `Charts Data Visualization`, `command.tsx`, `sheet.tsx`, `class-variance-authority`, `RichTextEditor.tsx`, `Property`, `Navigation Menu Component`, `PropertyCard.tsx`, `cn`, `avatar.tsx`, `lucide-react`, `input-otp.tsx`, `progress.tsx`, `RevealOnScroll.tsx`, `Properties.tsx`, `hover-card.tsx`, `dropdown-menu.tsx`, `Dashboard.tsx`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.02702702702702703 - nodes in this community are weakly interconnected._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.146) - this node is a cross-community bridge._
- **Should `constants/property.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._