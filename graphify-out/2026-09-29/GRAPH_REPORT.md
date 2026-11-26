# Graph Report - voi home website  (2026-09-29)

## Corpus Check
- 208 files · ~304,230 words
- Verdict: corpus is large enough that graph structure adds value.

## Summary
- 1083 nodes · 2570 edges · 85 communities (61 shown, 20 thin omitted)
- Extraction: 99% EXTRACTED · 1% INFERRED · 0% AMBIGUOUS · INFERRED: 25 edges (avg confidence: 0.85)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `c5e2960d`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- PropertiesManagement.tsx
- Frontend Dependencies
- constants/property.ts
- Dashboard.tsx
- Experience.tsx
- react-i18next
- Toast Notification System
- cn
- Team.tsx
- App.tsx
- package.json
- sidebar.tsx
- Property
- utils.ts
- lucide-react
- button.tsx
- TypeScript App Config
- Dev Tool Dependencies
- Shadcn UI Config
- TypeScript Node Config
- Carousel Component
- Calendar and Pagination
- MapPicker.tsx
- useProperties.ts
- Partners.tsx
- Form Components
- command.tsx
- Project Setup Docs
- Charts Data Visualization
- useCustomOptions.ts
- drawer.tsx
- Database Type Definitions
- Contact Reply Email Function
- TypeScript Root Config
- Toggle Components
- RichTextEditor.tsx
- react
- Navigation Menu Component
- Breadcrumb Navigation
- input-otp.tsx
- Build Scripts
- Sitemap Generation
- Hidden Options Management
- Contact Email Function
- ESLint Configuration
- PropertyDetail
- ErrorBoundary.tsx
- routes.ts
- Internationalization Config
- Accordion Component
- CLAUDE.md
- Blog Content Images
- Marketing Mockup Assets
- Pill Picker Component
- Vite Build Config
- Theme Toast Provider
- Buyer Guide Photos
- Buyer Guide Step Images
- Email Marketing Assets
- Brand Logo Assets
- Property Process Flowcharts
- StatBand.tsx
- Lead Webhook Integration
- OG Preview Function
- Investment Guide Pages
- Sitemap Edge Function
- Dubai Property Images
- Investment Chart Images
- Apartment Interior Images
- Favicon Assets
- Crawler Configuration
- Social OG Assets
- Aspect Ratio Component
- Collapsible Component
- Tailwind Configuration
- Placeholder Image
- Project README
- Founder Photo
- Blank Location Image
- Rating Star Graphic
- Decorative Branding Graphic

## God Nodes (most connected - your core abstractions)
1. `cn()` - 237 edges
2. `react` - 97 edges
3. `lucide-react` - 65 edges
4. `react-i18next` - 55 edges
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
- `OG Social Share Image (Mr. Property Brand — Outdated)` --semantically_similar_to--> `About Vision Video Thumbnail (Istanbul Aerial, MR. Logo)`  [INFERRED] [semantically similar]
  public/og-image.jpg → src/assets/about-vision-video.webp
- `Voi Home Setup Checklist` --conceptually_related_to--> `Code Quality Guidelines`  [INFERRED]
  TODO.md → CODE_QUALITY.md
- `HTML Entry Point` --references--> `Supabase Cloud Backend`  [EXTRACTED]
  index.html → TODO.md

## Import Cycles
- None detected.

## Hyperedges (group relationships)
- **Anti-Scam Investing Guide Istanbul 2026 Document Pages** — src_assets_guide_page1, src_assets_guide_page2, src_assets_guide_page3 [EXTRACTED 0.98]
- **Blog Article Hero Images (JPG and WebP pairs)** — public_blog_dubai_market_jpg, public_blog_dubai_market_webp, public_blog_investment_guide_jpg, public_blog_investment_guide_webp, public_blog_luxury_apartments_jpg, public_blog_luxury_apartments_webp [INFERRED 0.90]
- **Companion Email and Notification UI Asset Set** — src_assets_companion_email_body, src_assets_companion_email_frame, src_assets_companion_notification, src_assets_companion_notification_ar [INFERRED 0.93]
- **Buyer Journey Steps 1-4 Visual Sequence** — src_assets_buyer_guide_step1, src_assets_buyer_guide_step2, src_assets_buyer_guide_step3, src_assets_buyer_guide_step4 [INFERRED 0.97]

## Communities (85 total, 20 thin omitted)

### Community 0 - "PropertiesManagement.tsx"
Cohesion: 0.05
Nodes (87): @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities, sonner, Hero Building - Modern Dark Facade Apartment Exterior, Luxury Penthouse Terrace Photo – City Skyline at Dusk, DeletableSelect(), DeletableSelectProps (+79 more)

### Community 1 - "Frontend Dependencies"
Cohesion: 0.03
Nodes (72): dependencies, class-variance-authority, clsx, cmdk, date-fns, @dnd-kit/core, @dnd-kit/sortable, @dnd-kit/utilities (+64 more)

### Community 2 - "constants/property.ts"
Cohesion: 0.11
Nodes (17): ALANYA_DISTRICTS, ANKARA_DISTRICTS, ANTALYA_DISTRICTS, BENEFIT_OPTIONS, BODRUM_DISTRICTS, BURSA_DISTRICTS, CONSTRUCTION_STATUSES, DEFAULT_FEATURES (+9 more)

### Community 3 - "Dashboard.tsx"
Cohesion: 0.06
Nodes (45): @radix-ui/react-checkbox, zod, Auth, Dashboard, Voi Luxury Real Estate Logo (Auth Variant), MobileCard(), MobileCardProps, MobileCardRow() (+37 more)

### Community 4 - "Experience.tsx"
Cohesion: 0.14
Nodes (14): Hero Dubai - Dubai Skyline Aerial at Sunset with Burj Khalifa, Hero Istanbul 1 - Luxury Residential Complex Render with Pool and Terraces, Hero Istanbul 2 - High-Rise Complex with Elevated Walkway and Landscaped Gardens, Hero Istanbul 3 - Aerial View of Villa with Pool and Garden, PhotoScroller(), PhotoScrollerProps, ProcessSteps(), ProcessStepsProps (+6 more)

### Community 5 - "react-i18next"
Cohesion: 0.14
Nodes (15): react-i18next, AboutHero(), AboutHeroProps, FeatureRowProps, FounderProfile(), FounderProfileProps, ManifestoItem, ManifestoList() (+7 more)

### Community 6 - "Toast Notification System"
Cohesion: 0.11
Nodes (27): @radix-ui/react-toast, Toast, ToastAction, ToastActionElement, ToastClose, ToastDescription, ToastProps, ToastTitle (+19 more)

### Community 7 - "cn"
Cohesion: 0.09
Nodes (36): @radix-ui/react-context-menu, @radix-ui/react-dropdown-menu, @radix-ui/react-menubar, AlertDialogOverlay, ContextMenuCheckboxItem, ContextMenuContent, ContextMenuItem, ContextMenuLabel (+28 more)

### Community 8 - "Team.tsx"
Cohesion: 0.14
Nodes (11): react-helmet-async, Contact, PrivacyPolicy, Team, TermsConditions, Header(), MapSection(), SEOHead() (+3 more)

### Community 9 - "App.tsx"
Cohesion: 0.11
Nodes (17): react-router-dom, @tanstack/react-query, About, Blogs, ComingSoon, PropertyDetail, queryClient, Hero Villa - Luxury Modern Villa with Infinity Pool at Sunset (+9 more)

### Community 10 - "package.json"
Cohesion: 0.07
Nodes (28): name, private, type, version, autoprefixer, date-fns, embla-carousel-auto-scroll, eslint (+20 more)

### Community 11 - "sidebar.tsx"
Cohesion: 0.09
Nodes (31): DashboardSidebar(), DashboardSidebarProps, Separator, Sidebar, SidebarContent, SidebarContext, SidebarFooter, SidebarGroup (+23 more)

### Community 12 - "Property"
Cohesion: 0.21
Nodes (9): AreaDetails(), AreaDetailsProps, InvestmentReturns(), InvestmentReturnsProps, PropertyCardMinimalProps, PropertyOverview(), PropertyOverviewProps, SortableRowProps (+1 more)

### Community 13 - "utils.ts"
Cohesion: 0.09
Nodes (16): clsx, @radix-ui/react-avatar, @radix-ui/react-hover-card, @radix-ui/react-progress, @radix-ui/react-scroll-area, react-resizable-panels, tailwind-merge, Avatar (+8 more)

### Community 14 - "lucide-react"
Cohesion: 0.16
Nodes (13): dompurify, lucide-react, BlogDetail, NotFound, Footer(), TikTokIcon(), TikTokIconProps, NotFoundState() (+5 more)

### Community 15 - "button.tsx"
Cohesion: 0.14
Nodes (19): gsap, Properties, PropertiesMap, PropertyScrollShowcase(), FeaturedProperties(), TURKEY_FILTER, LoadingSpinner(), LoadingSpinnerProps (+11 more)

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

### Community 20 - "Carousel Component"
Cohesion: 0.17
Nodes (14): embla-carousel-react, Carousel, CarouselApi, CarouselContent, CarouselContext, CarouselContextProps, CarouselItem, CarouselNext (+6 more)

### Community 21 - "Calendar and Pagination"
Cohesion: 0.15
Nodes (13): react-day-picker, ButtonProps, buttonVariants, Calendar(), CalendarProps, Pagination(), PaginationContent, PaginationEllipsis() (+5 more)

### Community 22 - "MapPicker.tsx"
Cohesion: 0.10
Nodes (26): leaflet, open-location-code, @radix-ui/react-tabs, react-leaflet, DEFAULT_CENTER, isFullPlusCode(), isValidPlusCode(), MapPicker() (+18 more)

### Community 23 - "useProperties.ts"
Cohesion: 0.29
Nodes (10): PropertyFilters(), PropertyFiltersProps, getDistrictsForCity(), getCityAliases(), normalizeLocationText(), propertyMatchesCity(), FloorPlan, NearbyPlace (+2 more)

### Community 24 - "Partners.tsx"
Cohesion: 0.11
Nodes (18): Partners, Testimonial, TestimonialBreak(), TestimonialBreakProps, OptimizedImage, OptimizedImageProps, constructionStatusTranslations, locationTranslations (+10 more)

### Community 25 - "Form Components"
Cohesion: 0.19
Nodes (12): @radix-ui/react-label, react-hook-form, FormControl, FormDescription, FormFieldContext, FormFieldContextValue, FormItem, FormItemContext (+4 more)

### Community 26 - "command.tsx"
Cohesion: 0.11
Nodes (17): cmdk, @radix-ui/react-dialog, Command, CommandDialogProps, CommandEmpty, CommandGroup, CommandInput, CommandItem (+9 more)

### Community 27 - "Project Setup Docs"
Cohesion: 0.17
Nodes (12): AreaDetails Component, Code Quality Guidelines, Google Analytics GA4 (G-ERQ8NMYJ6P), Google Tag Manager (GTM-T2QKMTMP), HTML Entry Point, InvestmentReturns Component, LoadingSpinner Component, PropertyOverview Component (+4 more)

### Community 28 - "Charts Data Visualization"
Cohesion: 0.23
Nodes (10): recharts, ChartConfig, ChartContainer, ChartContext, ChartContextProps, ChartLegendContent, ChartTooltipContent, getPayloadConfigFromPayload() (+2 more)

### Community 29 - "useCustomOptions.ts"
Cohesion: 0.22
Nodes (9): AffectedProperty, CATEGORY_CONFIGS, CategoryConfig, DEFAULT_OPTIONS, DeleteConfirmation, mapStorageKeyToCategory(), OptionsState, STORAGE_KEYS (+1 more)

### Community 30 - "drawer.tsx"
Cohesion: 0.22
Nodes (7): vaul, DrawerContent, DrawerDescription, DrawerFooter(), DrawerHeader(), DrawerOverlay, DrawerTitle

### Community 31 - "Database Type Definitions"
Cohesion: 0.18
Nodes (10): CompositeTypes, Constants, Database, DatabaseWithoutInternals, DefaultSchema, Enums, Json, Tables (+2 more)

### Community 32 - "Contact Reply Email Function"
Cohesion: 0.24
Nodes (10): allowedOrigins, escapeHtml(), getCorsHeaders(), handler(), RequestBody, RESEND_API_KEY, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY (+2 more)

### Community 33 - "TypeScript Root Config"
Cohesion: 0.18
Nodes (10): compilerOptions, allowJs, noImplicitAny, noUnusedLocals, noUnusedParameters, paths, skipLibCheck, strictNullChecks (+2 more)

### Community 34 - "Toggle Components"
Cohesion: 0.29
Nodes (8): class-variance-authority, @radix-ui/react-toggle, @radix-ui/react-toggle-group, ToggleGroup, ToggleGroupContext, ToggleGroupItem, Toggle, toggleVariants

### Community 35 - "RichTextEditor.tsx"
Cohesion: 0.22
Nodes (8): @radix-ui/react-popover, @tiptap/extension-color, @tiptap/extension-text-style, @tiptap/react, @tiptap/starter-kit, colors, RichTextEditorProps, PopoverContent

### Community 36 - "react"
Cohesion: 0.14
Nodes (10): @radix-ui/react-radio-group, @radix-ui/react-slider, react, CustomCursor(), CustomVideoPlayerProps, RadioGroup, RadioGroupItem, SidebarProvider (+2 more)

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

### Community 41 - "Sitemap Generation"
Cohesion: 0.29
Nodes (4): @supabase/supabase-js, SitemapEntry, staticEntries, today

### Community 42 - "Hidden Options Management"
Cohesion: 0.38
Nodes (6): DEFAULT_CATEGORY_LABELS, formatStatusValue(), formatTransactionValue(), HiddenDefaults, RestoreHiddenOptions(), RestoreHiddenOptionsProps

### Community 43 - "Contact Email Function"
Cohesion: 0.43
Nodes (6): allowedOrigins, escapeHtml(), getCorsHeaders(), handler(), RESEND_API_KEY, validateInput()

### Community 44 - "ESLint Configuration"
Cohesion: 0.33
Nodes (5): @eslint/js, eslint-plugin-react-hooks, eslint-plugin-react-refresh, globals, typescript-eslint

### Community 45 - "PropertyDetail"
Cohesion: 0.67
Nodes (3): getTransactionTypeLabel(), useProperty(), PropertyDetail()

### Community 46 - "ErrorBoundary.tsx"
Cohesion: 0.22
Nodes (3): ErrorBoundary, Props, State

### Community 47 - "routes.ts"
Cohesion: 0.40
Nodes (3): OurServices(), getBlogUrl(), ROUTES

### Community 49 - "Accordion Component"
Cohesion: 0.40
Nodes (4): @radix-ui/react-accordion, AccordionContent, AccordionItem, AccordionTrigger

### Community 51 - "Blog Content Images"
Cohesion: 0.50
Nodes (5): Anti-Scam Investing Guide Mockup (Istanbul 2026), Modern Apartment Interior Photo (City Skyline View), Blog: Dubai Marina Skyline at Sunset Photo, Blog: Investment Analysis Charts and Calculator Photo, Blog: Luxury Apartment Interior with City View Photo

### Community 52 - "Marketing Mockup Assets"
Cohesion: 0.60
Nodes (5): MR Property Map Pin Icon, NYT-Style Newspaper Mockup – Turkey Property Market (English), NYT-Style Newspaper Mockup – Turkey Property Market (Arabic), NYT-Style Istanbul Property Statistics Page (English), NYT-Style Istanbul Property Statistics Page (Arabic)

### Community 53 - "Pill Picker Component"
Cohesion: 0.50
Nodes (4): pillClass(), PillOption, PillPicker(), PillPickerProps

### Community 54 - "Vite Build Config"
Cohesion: 0.50
Nodes (3): lovable-tagger, vite, @vitejs/plugin-react-swc

### Community 55 - "Theme Toast Provider"
Cohesion: 0.50
Nodes (3): next-themes, Toaster(), ToasterProps

### Community 57 - "Buyer Guide Photos"
Cohesion: 0.50
Nodes (4): Buyer Guide: Real Estate Agents Consulting Clients Photo, Buyer Guide: House Keys Handover Photo, Buyer Guide: House For Sale Listing Photo, Buyer Guide: Couple Browsing Property Listings on Tablet

### Community 58 - "Buyer Guide Step Images"
Cohesion: 0.50
Nodes (4): Buyer Guide Step 1 - Property Key Handover, Buyer Guide Step 2 - Contract Signing, Buyer Guide Step 3 - Turkish Passport Citizenship, Buyer Guide Step 4 - Investment Analysis Charts

### Community 59 - "Email Marketing Assets"
Cohesion: 0.50
Nodes (4): Companion Email Body - Harvey Specter Real Estate Testimonial, Companion Email Frame - macOS Mail Client UI Shell, Companion Notification English - Harvey Specter Email Alert, Companion Notification Arabic - Khalid Mahmoud Email Alert

### Community 60 - "Brand Logo Assets"
Cohesion: 0.50
Nodes (4): Voi Luxury Real Estate Logo (Auth Variant, Dark), Voi Logo (White/Light Variant, PNG), Voi Logo (White Variant, PNG), Voi Logo (White Variant, WebP)

### Community 61 - "Property Process Flowcharts"
Cohesion: 0.67
Nodes (4): Property Purchase Process Flowchart (English), Property Purchase Process Flowchart (Arabic), Sticky Note CTA – Buyer Hesitation Prompt (English), Sticky Note CTA – Buyer Hesitation Prompt (Arabic)

### Community 62 - "StatBand.tsx"
Cohesion: 0.24
Nodes (4): Stat, StatBand(), StatBandProps, YouTubeFacadeProps

### Community 67 - "Investment Guide Pages"
Cohesion: 0.67
Nodes (3): Guide Page 1 - Anti-Scam Investing Guide Istanbul 2026 Cover, Guide Page 2 - Simple Filter Decision Flowchart (Page 12), Guide Page 3 - What Most Buyers Get Wrong (Page 5)

## Ambiguous Edges - Review These
- `Hero Dubai - Dubai Skyline Aerial at Sunset with Burj Khalifa` → `Hero Istanbul 1 - Luxury Residential Complex Render with Pool and Terraces`  [AMBIGUOUS]
  src/assets/hero-istanbul-1-optimized.webp · relation: conceptually_related_to

## Knowledge Gaps
- **387 isolated node(s):** `$schema`, `style`, `rsc`, `tsx`, `config` (+382 more)
  These have ≤1 connection - possible missing edges or undocumented components. (Counts symbols only; 444 node(s) total have ≤1 connection when file, concept and rationale nodes are included.)
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **What is the exact relationship between `Hero Dubai - Dubai Skyline Aerial at Sunset with Burj Khalifa` and `Hero Istanbul 1 - Luxury Residential Complex Render with Pool and Terraces`?**
  _Edge tagged AMBIGUOUS (relation: conceptually_related_to) - confidence is low._
- **Why does `react` connect `react` to `PropertiesManagement.tsx`, `Dashboard.tsx`, `Experience.tsx`, `react-i18next`, `Toast Notification System`, `cn`, `Team.tsx`, `App.tsx`, `package.json`, `sidebar.tsx`, `Property`, `utils.ts`, `lucide-react`, `button.tsx`, `Carousel Component`, `Calendar and Pagination`, `MapPicker.tsx`, `useProperties.ts`, `Partners.tsx`, `Form Components`, `command.tsx`, `Charts Data Visualization`, `useCustomOptions.ts`, `drawer.tsx`, `Toggle Components`, `RichTextEditor.tsx`, `Navigation Menu Component`, `Breadcrumb Navigation`, `input-otp.tsx`, `ErrorBoundary.tsx`, `Accordion Component`, `StatBand.tsx`?**
  _High betweenness centrality (0.163) - this node is a cross-community bridge._
- **Why does `cn()` connect `cn` to `PropertiesManagement.tsx`, `Dashboard.tsx`, `react-i18next`, `Toast Notification System`, `Team.tsx`, `sidebar.tsx`, `utils.ts`, `button.tsx`, `Carousel Component`, `Calendar and Pagination`, `MapPicker.tsx`, `Partners.tsx`, `Form Components`, `command.tsx`, `Charts Data Visualization`, `drawer.tsx`, `Toggle Components`, `RichTextEditor.tsx`, `react`, `Navigation Menu Component`, `Breadcrumb Navigation`, `input-otp.tsx`, `Accordion Component`?**
  _High betweenness centrality (0.162) - this node is a cross-community bridge._
- **Why does `dependencies` connect `Frontend Dependencies` to `package.json`?**
  _High betweenness centrality (0.114) - this node is a cross-community bridge._
- **What connects `$schema`, `style`, `rsc` to the rest of the system?**
  _387 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `PropertiesManagement.tsx` be split into smaller, more focused modules?**
  _Cohesion score 0.05067064083457526 - nodes in this community are weakly interconnected._
- **Should `Frontend Dependencies` be split into smaller, more focused modules?**
  _Cohesion score 0.027777777777777776 - nodes in this community are weakly interconnected._