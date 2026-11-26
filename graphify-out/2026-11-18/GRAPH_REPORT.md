# Graph Report - voi home website  (2026-11-14)

## Corpus Check
- 223 files · ~276,061 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1106 nodes · 2691 edges · 85 communities (63 shown, 18 thin omitted)
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
- react-i18next
- Toast Notification System
- cn
- sonner.tsx
- generate-sitemap.ts
- package.json
- sidebar.tsx
- client.ts
- CustomVideoPlayer.tsx
- PropertiesManagement.tsx
- Auth.tsx
- TypeScript App Config
- Dev Tool Dependencies
- Shadcn UI Config
- TypeScript Node Config
- PropertyDetail.tsx
- react-router-dom
- MapPicker.tsx
- PropertyCard.tsx
- drawer.tsx
- Form Components
- command.tsx
- Project Setup Docs
- Charts Data Visualization
- Blogs.tsx
- RestoreHiddenOptions.tsx
- types.ts
- Contact Reply Email Function
- TypeScript Root Config
- class-variance-authority
- RichTextEditor.tsx
- lucide-react
- Navigation Menu Component
- utils.ts
- ErrorBoundary
- Build Scripts
- input-otp.tsx
- services/index.ts
- Contact Email Function
- Voi Home — Voice
- scroll-area.tsx
- useProperties.ts
- ContactSubmissions.tsx
- RevealOnScroll.tsx
- Properties.tsx
- CLAUDE.md
- radio-group.tsx
- Footer.tsx
- Pill Picker Component
- Vite Build Config
- PropertiesMap.tsx
- Property
- eslint.config.js
- dropdown-menu.tsx
- react
- sheet.tsx
- accordion.tsx
- Hero Villa - Luxury Modern Villa with Infinity Pool at Sunset
- Lead Webhook Integration
- OG Preview Function
- avatar.tsx
- OurServices.tsx
- Sitemap Edge Function
- config.ts
- resizable.tsx
- progress.tsx
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

## God Nodes (most connected - your core abstractions)
1. `cn()` - 237 edges
2. `react` - 98 edges
3. `lucide-react` - 72 edges
4. `react-i18next` - 65 edges
5. `Button` - 38 edges
6. `react-router-dom` - 36 edges
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
- `PropertyCardProps` --references--> `Property`  [EXTRACTED]
  src/components/property/PropertyCard.tsx → src/types/property.ts

## Import Cycles
- None detected.

## Communities (85 total, 18 thin omitted)

### Community 0 - "BlogsManagement.tsx"
Cohesion: 0.15
Nodes (27): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, sonner, LanguageTabs(), DialogContent, DialogHeader(), DialogTitle (+19 more)

### Community 1 - "dependencies"
Cohesion: 0.03
Nodes (74): dependencies, class-variance-authority, clsx, cmdk, date-fns, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities (+66 more)

### Community 2 - "constants/property.ts"
Cohesion: 0.11
Nodes (17): ALANYA_DISTRICTS, ANKARA_DISTRICTS, ANTALYA_DISTRICTS, BENEFIT_OPTIONS, BODRUM_DISTRICTS, BURSA_DISTRICTS, CONSTRUCTION_STATUSES, DEFAULT_FEATURES (+9 more)

### Community 3 - "App.tsx"
Cohesion: 0.12
Nodes (13): @tanstack/react-query, Auth, BlogDetail, ComingSoon, Dashboard, NotFound, Partners, PropertyDetail (+5 more)

### Community 4 - "breadcrumb.tsx"
Cohesion: 0.22
Nodes (8): @radix-ui/react-slot, Breadcrumb, BreadcrumbEllipsis(), BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator()

### Community 5 - "react-i18next"
Cohesion: 0.12
Nodes (18): react-i18next, Blog, BlogCategoryPicker(), PartnerLogo, PartnerStrip(), PhotoScroller(), PhotoScrollerProps, ProcessSteps() (+10 more)

### Community 6 - "Toast Notification System"
Cohesion: 0.11
Nodes (27): @radix-ui/react-toast, Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle (+19 more)

### Community 7 - "cn"
Cohesion: 0.10
Nodes (31): @radix-ui/react-context-menu, AlertDialogOverlay, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel, ContextMenuRadioItem, ContextMenuSeparator (+23 more)

### Community 8 - "sonner.tsx"
Cohesion: 0.50
Nodes (3): next-themes, Toaster(), ToasterProps

### Community 9 - "generate-sitemap.ts"
Cohesion: 0.29
Nodes (4): @supabase/supabase-js, SitemapEntry, staticEntries, today

### Community 10 - "package.json"
Cohesion: 0.06
Nodes (32): name, private, type, version, autoprefixer, clsx, date-fns, embla-carousel-auto-scroll (+24 more)

### Community 11 - "sidebar.tsx"
Cohesion: 0.05
Nodes (55): @radix-ui/react-separator, @radix-ui/react-tooltip, Voi Luxury Real Estate Logo (Auth Variant), CustomCursor(), DashboardSidebar(), DashboardSidebarProps, MaintenanceCheck(), MaintenanceCheckProps (+47 more)

### Community 12 - "client.ts"
Cohesion: 0.21
Nodes (9): ImageUpload(), ImageUploadProps, MultiImageUpload(), MultiImageUploadProps, SortableImageProps, FilterOption, FilterOptions, supabase (+1 more)

### Community 13 - "CustomVideoPlayer.tsx"
Cohesion: 0.40
Nodes (3): @radix-ui/react-slider, CustomVideoPlayerProps, Slider

### Community 14 - "PropertiesManagement.tsx"
Cohesion: 0.10
Nodes (28): DeletableSelect(), DeleteConfirmDialog(), RichTextEditor(), getCityForDistrict(), AffectedProperty, CATEGORY_CONFIGS, CategoryConfig, DEFAULT_OPTIONS (+20 more)

### Community 15 - "Auth.tsx"
Cohesion: 0.14
Nodes (19): zod, MobileCard(), MobileCardProps, MobileCardRow(), MobileCardRowProps, ResponsiveTable(), ResponsiveTableProps, Alert (+11 more)

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

### Community 21 - "react-router-dom"
Cohesion: 0.27
Nodes (13): react-router-dom, ServiceCard(), ServicesCta(), ServicesCtaProps, findService(), getServiceContent(), SERVICES, WHATSAPP_NUMBER (+5 more)

### Community 22 - "MapPicker.tsx"
Cohesion: 0.11
Nodes (25): leaflet, open-location-code, @radix-ui/react-tabs, DEFAULT_CENTER, isFullPlusCode(), isValidPlusCode(), MapPicker(), MapPickerProps (+17 more)

### Community 23 - "PropertyCard.tsx"
Cohesion: 0.10
Nodes (19): Testimonial, TestimonialBreak(), TestimonialBreakProps, OptimizedImage, OptimizedImageProps, constructionStatusTranslations, locationTranslations, PropertyCard() (+11 more)

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

### Community 29 - "Blogs.tsx"
Cohesion: 0.29
Nodes (5): Blogs, Blog, BlogCardMinimal(), BlogCardMinimalProps, Blog

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
Cohesion: 0.18
Nodes (10): @radix-ui/react-popover, @tiptap/extension-color, @tiptap/extension-text-style, @tiptap/react, @tiptap/starter-kit, MultiSelectCheckbox(), MultiSelectCheckboxProps, colors (+2 more)

### Community 36 - "lucide-react"
Cohesion: 0.25
Nodes (9): lucide-react, Props, State, Header(), NotFoundState(), NotFoundStateProps, Button, Blog (+1 more)

### Community 37 - "Navigation Menu Component"
Cohesion: 0.25
Nodes (8): @radix-ui/react-navigation-menu, NavigationMenu, NavigationMenuContent, NavigationMenuIndicator, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle, NavigationMenuViewport

### Community 38 - "utils.ts"
Cohesion: 0.20
Nodes (12): DeletableSelectProps, FilterOption, PropertyFilters(), TILES, Checkbox, Input, SelectContent, SelectItem (+4 more)

### Community 40 - "Build Scripts"
Cohesion: 0.25
Nodes (8): scripts, build, build:dev, dev, lint, prebuild, predev, preview

### Community 41 - "input-otp.tsx"
Cohesion: 0.33
Nodes (5): input-otp, InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot

### Community 42 - "services/index.ts"
Cohesion: 0.22
Nodes (11): ServiceCardProps, SERVICES_AR, SERVICES_EN, CONTENT, ServiceCategory, ServiceContent, ServiceDef, serviceLang (+3 more)

### Community 43 - "Contact Email Function"
Cohesion: 0.43
Nodes (6): allowedOrigins, escapeHtml(), getCorsHeaders(), handler(), RESEND_API_KEY, validateInput()

### Community 44 - "Voi Home — Voice"
Cohesion: 0.33
Nodes (5): Arabic and Russian, Audiences, Mechanics, Principles, Voi Home — Voice

### Community 45 - "scroll-area.tsx"
Cohesion: 0.50
Nodes (3): @radix-ui/react-scroll-area, ScrollArea, ScrollBar

### Community 46 - "useProperties.ts"
Cohesion: 0.25
Nodes (12): FeaturedProperties(), TURKEY_FILTER, PropertyFiltersProps, getCityAliases(), normalizeLocationText(), propertyMatchesCity(), useProperties(), PropertiesMap() (+4 more)

### Community 47 - "ContactSubmissions.tsx"
Cohesion: 0.22
Nodes (14): AffectedProperty, DeleteConfirmDialogProps, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter(), AlertDialogHeader() (+6 more)

### Community 48 - "RevealOnScroll.tsx"
Cohesion: 0.08
Nodes (22): About, AboutHero(), AboutHeroProps, FeatureRowProps, FounderProfileProps, ManifestoItem, ManifestoList(), ManifestoListProps (+14 more)

### Community 49 - "Properties.tsx"
Cohesion: 0.19
Nodes (14): gsap, Properties, ShatterHero(), ButtonProps, Pagination(), PaginationContent, PaginationEllipsis(), PaginationItem (+6 more)

### Community 51 - "radio-group.tsx"
Cohesion: 0.50
Nodes (3): @radix-ui/react-radio-group, RadioGroup, RadioGroupItem

### Community 52 - "Footer.tsx"
Cohesion: 0.11
Nodes (17): react-helmet-async, Contact, Links, PrivacyPolicy, Team, TermsConditions, Voi Logo (White/Light Variant, PNG), Voi Logo (White Variant, PNG) (+9 more)

### Community 53 - "Pill Picker Component"
Cohesion: 0.50
Nodes (4): pillClass(), PillOption, PillPicker(), PillPickerProps

### Community 54 - "Vite Build Config"
Cohesion: 0.50
Nodes (3): lovable-tagger, vite, @vitejs/plugin-react-swc

### Community 55 - "PropertiesMap.tsx"
Cohesion: 0.15
Nodes (13): @maplibre/maplibre-gl-leaflet, react-leaflet, PropertiesMap, LoadingSpinner(), LoadingSpinnerProps, compactPrice(), FitBoundsProps, groupIcon() (+5 more)

### Community 56 - "Property"
Cohesion: 0.21
Nodes (9): AreaDetails(), AreaDetailsProps, InvestmentReturns(), InvestmentReturnsProps, PropertyOverview(), PropertyOverviewProps, SortableRowProps, MarkerLayerProps (+1 more)

### Community 57 - "eslint.config.js"
Cohesion: 0.33
Nodes (5): @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint

### Community 58 - "dropdown-menu.tsx"
Cohesion: 0.16
Nodes (12): @radix-ui/react-dropdown-menu, LanguageSwitcher(), LanguageSwitcherProps, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuRadioItem (+4 more)

### Community 59 - "react"
Cohesion: 0.31
Nodes (5): react, LanguageTabsProps, Badge(), BadgeProps, badgeVariants

### Community 60 - "sheet.tsx"
Cohesion: 0.22
Nodes (9): @radix-ui/react-dialog, SheetContent, SheetContentProps, SheetDescription, SheetFooter(), SheetHeader(), SheetOverlay, SheetTitle (+1 more)

### Community 61 - "accordion.tsx"
Cohesion: 0.40
Nodes (4): @radix-ui/react-accordion, AccordionContent, AccordionItem, AccordionTrigger

### Community 66 - "avatar.tsx"
Cohesion: 0.21
Nodes (6): @radix-ui/react-avatar, @radix-ui/react-hover-card, Avatar, AvatarFallback, AvatarImage, HoverCardContent

### Community 67 - "OurServices.tsx"
Cohesion: 0.47
Nodes (3): OurServices(), getBlogUrl(), ROUTES

### Community 70 - "resizable.tsx"
Cohesion: 0.50
Nodes (3): react-resizable-panels, ResizableHandle(), ResizablePanelGroup()

## Knowledge Gaps
- **382 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+377 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 446 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **18 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `react` connect `react` to `BlogsManagement.tsx`, `App.tsx`, `breadcrumb.tsx`, `react-i18next`, `Toast Notification System`, `cn`, `package.json`, `sidebar.tsx`, `client.ts`, `CustomVideoPlayer.tsx`, `PropertiesManagement.tsx`, `Auth.tsx`, `PropertyDetail.tsx`, `MapPicker.tsx`, `PropertyCard.tsx`, `drawer.tsx`, `Form Components`, `command.tsx`, `Charts Data Visualization`, `Blogs.tsx`, `class-variance-authority`, `RichTextEditor.tsx`, `lucide-react`, `Navigation Menu Component`, `utils.ts`, `input-otp.tsx`, `scroll-area.tsx`, `useProperties.ts`, `ContactSubmissions.tsx`, `RevealOnScroll.tsx`, `Properties.tsx`, `radio-group.tsx`, `Footer.tsx`, `PropertiesMap.tsx`, `Property`, `dropdown-menu.tsx`, `sheet.tsx`, `accordion.tsx`, `avatar.tsx`, `progress.tsx`, `StatementSection.tsx`, `YouTubeFacade.tsx`?**
  _High betweenness centrality (0.178) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `BlogsManagement.tsx`, `breadcrumb.tsx`, `Toast Notification System`, `sidebar.tsx`, `CustomVideoPlayer.tsx`, `PropertiesManagement.tsx`, `Auth.tsx`, `PropertyDetail.tsx`, `MapPicker.tsx`, `PropertyCard.tsx`, `drawer.tsx`, `Form Components`, `command.tsx`, `Charts Data Visualization`, `class-variance-authority`, `RichTextEditor.tsx`, `lucide-react`, `Navigation Menu Component`, `utils.ts`, `input-otp.tsx`, `scroll-area.tsx`, `ContactSubmissions.tsx`, `RevealOnScroll.tsx`, `Properties.tsx`, `radio-group.tsx`, `dropdown-menu.tsx`, `react`, `sheet.tsx`, `accordion.tsx`, `avatar.tsx`, `resizable.tsx`, `progress.tsx`?**
  _High betweenness centrality (0.152) - this node is a cross-community bridge._
- **Why does `dependencies` connect `dependencies` to `package.json`?**
  _High betweenness centrality (0.117) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _382 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `BlogsManagement.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.14615384615384616 - nodes in this community are weakly interconnected._
- **Should `dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.02702702702702703 - nodes in this community are weakly interconnected._
- **Should `constants/property.ts` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._