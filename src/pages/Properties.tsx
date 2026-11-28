import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ArrowRight } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import { useFilterOptions } from "@/hooks/useFilterOptions";
import { PropertyFilters as Filters } from "@/types/property";
import PropertyCardMinimal from "@/components/property/PropertyCardMinimal";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import LoadingSpinner from "@/components/property/LoadingSpinner";
import QuickFilterBar from "@/components/property/QuickFilterBar";
import SEOHead from "@/components/SEOHead";
import RevealOnScroll from "@/components/RevealOnScroll";

const Properties = () => {
  const { t, i18n } = useTranslation();
  const [searchParams] = useSearchParams();

  // Initialize filters from URL params
  const countryParam = searchParams.get('country') || "";
  const cityParam = searchParams.get('city') || "";
  const districtParam = searchParams.get('district') || "";
  const propertyTypeParam = searchParams.get('property_type') || searchParams.get('propertyType') || "";
  const layoutParam = searchParams.get('layout') || "";
  const minPriceParam = searchParams.get('min_price') || "";
  const maxPriceParam = searchParams.get('max_price') || "";
  const benefitParam = searchParams.get('benefit') || "";

  const [isInitialized, setIsInitialized] = useState(false);

  // Default country to turkiye when no URL params so listings match the selected tab
  const effectiveCountry = countryParam || "turkiye";

  const initialFilters: Filters = {
    country: effectiveCountry,
    city: cityParam,
    region: effectiveCountry,
    district: districtParam,
    propertyType: propertyTypeParam,
    layout: layoutParam,
    transactionType: searchParams.get('transaction_type') || "",
    minPrice: minPriceParam,
    maxPrice: maxPriceParam,
    constructionStatus: "",
    benefit: benefitParam,
    benefits: benefitParam ? [benefitParam] : [],
    amenities: []
  };

  const [filters, setFilters] = useState<Filters>(initialFilters);

  // React to URL search param changes (e.g. navigating from header links)
  useEffect(() => {
    if (!isInitialized) return;

    const newBenefit = searchParams.get('benefit') || "";
    const newPropertyType = searchParams.get('property_type') || searchParams.get('propertyType') || "";
    const newCountry = searchParams.get('country') || "";
    const newCity = searchParams.get('city') || "";
    const newDistrict = searchParams.get('district') || "";
    const newLayout = searchParams.get('layout') || "";
    const newMinPrice = searchParams.get('min_price') || "";
    const newMaxPrice = searchParams.get('max_price') || "";
    const newTransactionType = searchParams.get('transaction_type') || "";

    // If no params at all, default to Türkiye (e.g. clicking "Properties" nav link)
    const hasAnyParam = Array.from(searchParams.entries()).length > 0;
    if (!hasAnyParam) {
      clearFilters();
      return;
    }

    setFilters({
      country: newCountry,
      city: newCity,
      region: newCountry,
      district: newDistrict,
      propertyType: newPropertyType,
      layout: newLayout,
      transactionType: newTransactionType,
      minPrice: newMinPrice,
      maxPrice: newMaxPrice,
      constructionStatus: "",
      benefit: newBenefit,
      benefits: newBenefit ? [newBenefit] : [],
      amenities: []
    });
  }, [searchParams, isInitialized]);

  // Mark as initialized after first render
  useEffect(() => {
    setIsInitialized(true);
  }, []);


  // Load filter options from dashboard and database
  const {
    filterOptions,
    loading: optionsLoading
  } = useFilterOptions(filters.region);

  // Fetch properties based on filters
  const {
    properties,
    loading: propertiesLoading
  } = useProperties(filters);

  // Show 8 homes (two rows of four), then 8 more each time "Load more" is pressed
  const BATCH = 8;
  const [visibleCount, setVisibleCount] = useState(BATCH);
  useEffect(() => {
    setVisibleCount(BATCH);
  }, [filters]);
  const visibleProperties = properties.slice(0, visibleCount);
  const [moreOpen, setMoreOpen] = useState(false);

  const handleQuickChange = (patch: Partial<Filters>) => setFilters((prev) => ({ ...prev, ...patch }));
  const activeMoreCount = [filters.propertyType, filters.transactionType, filters.constructionStatus].filter(Boolean).length
    + (filters.benefits?.length || 0) + (filters.amenities?.length || 0);

  const handleFilterChange = (key: keyof Filters, value: string | string[]) => {
    setFilters(prev => {
      const newFilters = {
        ...prev,
        [key]: value
      };

      // Clear city and district when country changes
      if (key === 'country') {
        newFilters.city = "";
        newFilters.district = "";
        newFilters.region = value === "all" ? "" : value as string;
      }

      // Clear district when city changes
      if (key === 'city') {
        newFilters.district = "";
      }

      return newFilters;
    });
  };

  const clearFilters = () => {
    setFilters({
      country: "turkiye",
      city: "",
      region: "turkiye",
      district: "",
      propertyType: "",
      layout: "",
      transactionType: "",
      minPrice: "",
      maxPrice: "",
      constructionStatus: "",
      benefit: "",
      benefits: [],
      amenities: []
    });
  };

  const loading = optionsLoading || propertiesLoading;

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Homes for Sale in Istanbul"
        description="A short, carefully chosen collection of apartments, villas and investment homes in Istanbul, each one personally visited and checked. Citizenship-eligible homes available."
        path="/properties"
        breadcrumbs={[{ name: "Properties", path: "/properties" }]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Homes for Sale in Istanbul, Türkiye",
          description: "A carefully chosen collection of homes in Istanbul, each one personally visited and checked.",
          url: "https://voi-home.com/properties",
          isPartOf: {
            "@type": "WebSite",
            name: "Voi Home",
            url: "https://voi-home.com",
          },
        }}
      />
      <Header />
      <main className="pt-24">
        <RevealOnScroll className="text-center max-w-2xl mx-auto px-6 pt-8 pb-2">
          <div className="text-xs font-medium uppercase tracking-[1.5px] mb-4 text-muted-foreground">
            {t("properties.title")}
          </div>
          <h1
            className={`whitespace-nowrap text-[clamp(22px,6.6vw,42px)] leading-[1.12] tracking-[-1px] md:tracking-[-1.2px] text-foreground ${
              i18n.language === "ar" ? "font-arabic" : "font-serif"
            }`}
          >
            {t("seo.h1.properties")}
          </h1>
        </RevealOnScroll>
        {/* Properties Listing Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            <QuickFilterBar
              filters={filters}
              onChange={handleQuickChange}
              onOpenMore={() => setMoreOpen(true)}
              activeMoreCount={activeMoreCount}
            />

            {/* Full filter list, opened from "More filters" */}
            <Sheet open={moreOpen} onOpenChange={setMoreOpen}>
              <SheetContent side={i18n.language === "ar" ? "right" : "left"} className="w-[320px] overflow-y-auto bg-background">
                <SheetHeader>
                  <SheetTitle>{t('properties.filters')}</SheetTitle>
                </SheetHeader>
                <div className="mt-6 pb-6">
                  <PropertyFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                    onClearFilters={clearFilters}
                    availableAmenities={filterOptions.amenities}
                    availablePropertyTypes={filterOptions.propertyTypes}
                    availableLayouts={filterOptions.layouts}
                    availableTransactionTypes={filterOptions.transactionTypes}
                    availableBenefits={filterOptions.benefits}
                    availableStatuses={filterOptions.statuses}
                  />
                </div>
              </SheetContent>
            </Sheet>

            {loading ? (
              <LoadingSpinner message={t('properties.loading')} />
            ) : properties.length === 0 ? (
              <div className="text-center py-12">
                <p className="mb-6 text-muted-foreground">
                  {t('properties.noProperties')}
                </p>
                <Button
                  variant="outline"
                  className="border-burgundy text-burgundy hover:bg-burgundy hover:text-white rounded-full"
                  onClick={clearFilters}
                >
                  {t('properties.viewAllProperties')}
                </Button>
              </div>
            ) : (
              <>
                <p className="mb-6 text-sm text-muted-foreground">
                  {t('properties.quick.showing', { shown: visibleProperties.length, total: properties.length })}
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
                  {visibleProperties.map((property, index) => (
                    <RevealOnScroll key={property.id} delay={(index % BATCH) * 40}>
                      <PropertyCardMinimal property={property} />
                    </RevealOnScroll>
                  ))}
                </div>
                {visibleCount < properties.length && (
                  <div className="mt-14 flex justify-center">
                    <Button
                      size="lg"
                      variant="outline"
                      className="group rounded-full border-foreground/20 px-8"
                      onClick={() => setVisibleCount((c) => c + BATCH)}
                    >
                      {t('properties.quick.loadMore')}
                      <ArrowRight className="ms-2 h-4 w-4 rotate-90 transition-transform group-hover:translate-y-0.5" />
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
