# Graph Report - voi home website  (2026-10-02)

## Corpus Check
- 211 files · ~264,979 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1047 nodes · 2536 edges · 83 communities (63 shown, 16 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS · INFERRED: 5 edges (avg confidence: 0.81)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `e3ece825`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- PropertiesManagement.tsx
- Frontend Dependencies
- constants/property.ts
- MaintenanceSettings.tsx
- button.tsx
- react-i18next
- Toast Notification System
- cn
- App.tsx
- lucide-react
- package.json
- sidebar.tsx
- react
- utils.ts
- PropertyMap.tsx
- PropertyDetail.tsx
- TypeScript App Config
- Dev Tool Dependencies
- Shadcn UI Config
- TypeScript Node Config
- carousel.tsx
- pagination.tsx
- MapPicker.tsx
- PropertyFilters.tsx
- context-menu.tsx
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
- Experience.tsx
- Contact Email Function
- Voi Home — Voice
- dropdown-menu.tsx
- avatar.tsx
- generate-sitemap.ts
- TeamSection.tsx
- accordion.tsx
- CLAUDE.md
- scroll-area.tsx
- routes.ts
- Pill Picker Component
- Vite Build Config
- Auth.tsx
- sheet.tsx
- eslint.config.js
- ResponsiveTable.tsx
- CustomVideoPlayer.tsx
- alert.tsx
- sonner.tsx
- Hero Villa - Luxury Modern Villa with Infinity Pool at Sunset
- Lead Webhook Integration
- OG Preview Function
- StatBand.tsx
- StatsOverlay.tsx
- Sitemap Edge Function
- config.ts
- PropertyDetail
- useFilterOptions.ts
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
7. `RevealOnScroll()` - 23 edges
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

## Communities (83 total, 16 thin omitted)

### Community 0 - "PropertiesManagement.tsx"
Cohesion: 0.07
Nodes (69): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, sonner, DeletableSelect(), DeletableSelectProps, AffectedProperty, DeleteConfirmDialog() (+61 more)

### Community 1 - "Frontend Dependencies"
Cohesion: 0.03
Nodes (72): dependencies, class-variance-authority, clsx, cmdk, date-fns, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities (+64 more)

### Community 2 - "constants/property.ts"
Cohesion: 0.11
Nodes (17): ALANYA_DISTRICTS, ANKARA_DISTRICTS, ANTALYA_DISTRICTS, BENEFIT_OPTIONS, BODRUM_DISTRICTS, BURSA_DISTRICTS, CONSTRUCTION_STATUSES, DEFAULT_FEATURES (+9 more)

### Community 3 - "MaintenanceSettings.tsx"
Cohesion: 0.26
Nodes (10): Card, CardDescription, CardFooter, CardHeader, CardTitle, DashboardOverview(), DashboardOverviewProps, LOCALE_MAP (+2 more)

### Community 4 - "button.tsx"
Cohesion: 0.20
Nodes (10): dompurify, react-router-dom, BlogDetail, Blog, StoryScroll(), StoryScrollProps, NotFoundState(), NotFoundStateProps (+2 more)

### Community 5 - "react-i18next"
Cohesion: 0.10
Nodes (19): react-i18next, AboutHero(), AboutHeroProps, FeatureRowProps, FounderProfileProps, ManifestoItem, ManifestoList(), ManifestoListProps (+11 more)

### Community 6 - "Toast Notification System"
Cohesion: 0.11
Nodes (27): @radix-ui/react-toast, Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle (+19 more)

### Community 7 - "cn"
Cohesion: 0.10
Nodes (28): vaul, AlertDialogOverlay, DialogFooter(), DialogOverlay, DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader() (+20 more)

### Community 8 - "App.tsx"
Cohesion: 0.11
Nodes (14): @tanstack/react-query, About, App(), ComingSoon, Contact, NotFound, Partners, PrivacyPolicy (+6 more)

### Community 9 - "lucide-react"
Cohesion: 0.14
Nodes (17): lucide-react, Blogs, Properties, Voi Logo (White/Light Variant, PNG), Voi Logo (White Variant, PNG), Footer(), Header(), TikTokIcon() (+9 more)

### Community 10 - "package.json"
Cohesion: 0.07
Nodes (27): name, private, type, version, autoprefixer, date-fns, embla-carousel-auto-scroll, eslint (+19 more)

### Community 11 - "sidebar.tsx"
Cohesion: 0.06
Nodes (48): @radix-ui/react-separator, @radix-ui/react-tooltip, Dashboard, DashboardSidebar(), DashboardSidebarProps, MaintenanceCheck(), MaintenanceCheckProps, Separator (+40 more)

### Community 12 - "react"
Cohesion: 0.21
Nodes (5): react, CustomCursor(), MapSection(), YouTubeFacadeProps, useIsMobile()

### Community 13 - "utils.ts"
Cohesion: 0.11
Nodes (13): clsx, @radix-ui/react-hover-card, @radix-ui/react-progress, @radix-ui/react-radio-group, react-resizable-panels, tailwind-merge, HoverCardContent, Progress (+5 more)

### Community 14 - "PropertyMap.tsx"
Cohesion: 0.22
Nodes (13): react-leaflet, isValidCoordinate(), MapPositionSyncProps, matchesExpectedRegion(), normalizeLocationKey(), parseCoordinate(), parseCoordinatesFromUrl(), ParsedCoordinates (+5 more)

### Community 15 - "PropertyDetail.tsx"
Cohesion: 0.08
Nodes (26): PropertiesMap, Blog, BlogCardMinimal(), BlogCardMinimalProps, OptimizedImage, OptimizedImageProps, LoadingSpinner(), LoadingSpinnerProps (+18 more)

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

### Community 21 - "pagination.tsx"
Cohesion: 0.15
Nodes (13): react-day-picker, ButtonProps, buttonVariants, Calendar(), CalendarProps, Pagination(), PaginationContent, PaginationEllipsis() (+5 more)

### Community 22 - "MapPicker.tsx"
Cohesion: 0.15
Nodes (17): leaflet, open-location-code, @radix-ui/react-tabs, LanguageTabsProps, DEFAULT_CENTER, isFullPlusCode(), isValidPlusCode(), MapPicker() (+9 more)

### Community 23 - "PropertyFilters.tsx"
Cohesion: 0.23
Nodes (13): FilterOption, PropertyFilters(), PropertyFiltersProps, COUNTRIES, getDistrictsForCity(), TURKIYE_CITIES, getCityAliases(), normalizeLocationText() (+5 more)

### Community 24 - "context-menu.tsx"
Cohesion: 0.18
Nodes (10): @radix-ui/react-context-menu, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator, ContextMenuShortcut() (+2 more)

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

### Community 29 - "Property"
Cohesion: 0.19
Nodes (10): AreaDetails(), AreaDetailsProps, InvestmentReturns(), InvestmentReturnsProps, PropertyCardMinimalProps, PropertyOverview(), PropertyOverviewProps, CategoryConfig (+2 more)

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
Cohesion: 0.18
Nodes (10): @radix-ui/react-popover, @tiptap/extension-color, @tiptap/extension-text-style, @tiptap/react, @tiptap/starter-kit, MultiSelectCheckbox(), MultiSelectCheckboxProps, colors (+2 more)

### Community 36 - "useCustomOptions.ts"
Cohesion: 0.25
Nodes (8): AffectedProperty, CATEGORY_CONFIGS, DEFAULT_OPTIONS, DeleteConfirmation, mapStorageKeyToCategory(), OptionsState, STORAGE_KEYS, useCustomOptions()

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

### Community 42 - "Experience.tsx"
Cohesion: 0.14
Nodes (16): gsap, react-helmet-async, BlogCategoryPicker(), PhotoScroller(), PhotoScrollerProps, PropertyScrollShowcase(), StatementSection(), StatementSectionProps (+8 more)

### Community 43 - "Contact Email Function"
Cohesion: 0.43
Nodes (6): allowedOrigins, escapeHtml(), getCorsHeaders(), handler(), RESEND_API_KEY, validateInput()

### Community 44 - "Voi Home — Voice"
Cohesion: 0.33
Nodes (5): Arabic and Russian, Audiences, Mechanics, Principles, Voi Home — Voice

### Community 45 - "dropdown-menu.tsx"
Cohesion: 0.18
Nodes (11): @radix-ui/react-dropdown-menu, LanguageSwitcherProps, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem, DropdownMenuSeparator (+3 more)

### Community 46 - "avatar.tsx"
Cohesion: 0.40
Nodes (4): @radix-ui/react-avatar, Avatar, AvatarFallback, AvatarImage

### Community 47 - "generate-sitemap.ts"
Cohesion: 0.29
Nodes (4): @supabase/supabase-js, SitemapEntry, staticEntries, today

### Community 48 - "TeamSection.tsx"
Cohesion: 0.36
Nodes (5): TeamSection(), TeamSectionProps, TEAM, TeamLang, TeamMember

### Community 49 - "accordion.tsx"
Cohesion: 0.40
Nodes (4): @radix-ui/react-accordion, AccordionContent, AccordionItem, AccordionTrigger

### Community 51 - "scroll-area.tsx"
Cohesion: 0.50
Nodes (3): @radix-ui/react-scroll-area, ScrollArea, ScrollBar

### Community 52 - "routes.ts"
Cohesion: 0.40
Nodes (3): OurServices(), getBlogUrl(), ROUTES

### Community 53 - "Pill Picker Component"
Cohesion: 0.50
Nodes (4): pillClass(), PillOption, PillPicker(), PillPickerProps

### Community 54 - "Vite Build Config"
Cohesion: 0.50
Nodes (3): lovable-tagger, vite, @vitejs/plugin-react-swc

### Community 55 - "Auth.tsx"
Cohesion: 0.25
Nodes (7): @radix-ui/react-checkbox, zod, Auth, Voi Luxury Real Estate Logo (Auth Variant), LanguageSwitcher(), Checkbox, authSchema

### Community 56 - "sheet.tsx"
Cohesion: 0.29
Nodes (7): @radix-ui/react-dialog, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetOverlay, sheetVariants

### Community 57 - "eslint.config.js"
Cohesion: 0.33
Nodes (5): @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint

### Community 58 - "ResponsiveTable.tsx"
Cohesion: 0.29
Nodes (6): MobileCard(), MobileCardProps, MobileCardRow(), MobileCardRowProps, ResponsiveTable(), ResponsiveTableProps

### Community 59 - "CustomVideoPlayer.tsx"
Cohesion: 0.40
Nodes (3): @radix-ui/react-slider, CustomVideoPlayerProps, Slider

### Community 60 - "alert.tsx"
Cohesion: 0.50
Nodes (4): Alert, AlertDescription, AlertTitle, alertVariants

### Community 61 - "sonner.tsx"
Cohesion: 0.50
Nodes (3): next-themes, Toaster(), ToasterProps

### Community 66 - "StatBand.tsx"
Cohesion: 0.50
Nodes (3): Stat, StatBand(), StatBandProps

### Community 70 - "PropertyDetail"
Cohesion: 0.67
Nodes (3): getTransactionTypeLabel(), useProperty(), PropertyDetail()

## Knowledge Gaps
- **369 isolated node(s):** `DeletableSelectProps`, `AffectedProperty`, `DeleteConfirmDialogProps`, `ImageUploadProps`, `MultiImageUploadProps` (+364 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 429 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **16 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `PropertiesManagement.tsx`, `MaintenanceSettings.tsx`, `button.tsx`, `react-i18next`, `Toast Notification System`, `cn`, `App.tsx`, `lucide-react`, `package.json`, `sidebar.tsx`, `utils.ts`, `PropertyMap.tsx`, `PropertyDetail.tsx`, `carousel.tsx`, `pagination.tsx`, `MapPicker.tsx`, `PropertyFilters.tsx`, `context-menu.tsx`, `Form Components`, `command.tsx`, `Charts Data Visualization`, `Property`, `ErrorBoundary.tsx`, `class-variance-authority`, `RichTextEditor.tsx`, `useCustomOptions.ts`, `Navigation Menu Component`, `Breadcrumb Navigation`, `input-otp.tsx`, `Experience.tsx`, `dropdown-menu.tsx`, `avatar.tsx`, `accordion.tsx`, `scroll-area.tsx`, `Auth.tsx`, `sheet.tsx`, `ResponsiveTable.tsx`, `CustomVideoPlayer.tsx`, `alert.tsx`, `StatBand.tsx`, `StatsOverlay.tsx`, `useFilterOptions.ts`?**
  _High betweenness centrality (0.174) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `PropertiesManagement.tsx`, `MaintenanceSettings.tsx`, `button.tsx`, `react-i18next`, `Toast Notification System`, `lucide-react`, `sidebar.tsx`, `utils.ts`, `PropertyDetail.tsx`, `carousel.tsx`, `pagination.tsx`, `MapPicker.tsx`, `context-menu.tsx`, `Form Components`, `command.tsx`, `Charts Data Visualization`, `class-variance-authority`, `RichTextEditor.tsx`, `Navigation Menu Component`, `Breadcrumb Navigation`, `input-otp.tsx`, `dropdown-menu.tsx`, `avatar.tsx`, `accordion.tsx`, `scroll-area.tsx`, `Auth.tsx`, `sheet.tsx`, `CustomVideoPlayer.tsx`, `alert.tsx`?**
  _High betweenness centrality (0.170) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Frontend Dependencies` to `package.json`?**
  _High betweenness centrality (0.150) - this node is a cross-community bridge._
- **What connects `DeletableSelectProps`, `AffectedProperty`, `DeleteConfirmDialogProps` to the rest of the system?**
  _369 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `PropertiesManagement.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.06951754385964912 - nodes in this community are weakly interconnected._
- **Should `Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.027777777777777776 - nodes in this community are weakly interconnected._
- **Should `constants/property.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._