import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Filter } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import { useFilterOptions } from "@/hooks/useFilterOptions";
import { PropertyFilters as Filters } from "@/types/property";
import { PropertyCard } from "@/components/property/PropertyCard";
import { PropertyFilters } from "@/components/property/PropertyFilters";
import LoadingSpinner from "@/components/property/LoadingSpinner";
import SEOHead from "@/components/SEOHead";
import RevealOnScroll from "@/components/RevealOnScroll";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";

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

  // Determine initial location filter from URL params
  const getInitialLocationFilter = () => {
    if (countryParam === 'turkiye' || countryParam.toLowerCase().includes('turkey')) {
      return 'turkey';
    } else if (countryParam === 'dubai') {
      return 'dubai';
    }
    return 'turkey';
  };

  const [locationFilter, setLocationFilter] = useState<string>(getInitialLocationFilter);
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

    // Update location tab
    if (newCountry === 'turkiye' || newCountry.toLowerCase().includes('turkey')) {
      setLocationFilter('turkey');
    } else if (newCountry === 'dubai') {
      setLocationFilter('dubai');
    } else {
      setLocationFilter('all');
    }
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

  // Sync location filter with country filter - only after initialization
  // This prevents clearing URL params on initial load
  useEffect(() => {
    if (!isInitialized) return;

    if (locationFilter === "turkey") {
      setFilters(prev => ({
        ...prev,
        country: "turkiye",
        region: "turkiye"
      }));
    } else if (locationFilter === "dubai") {
      setFilters(prev => ({
        ...prev,
        country: "dubai",
        city: "",
        region: "dubai"
      }));
    } else if (locationFilter === "all") {
      setFilters(prev => ({
        ...prev,
        country: "",
        city: "",
        region: "",
        district: ""
      }));
    }
  }, [locationFilter, isInitialized]);

  // Fetch properties based on filters
  const {
    properties,
    loading: propertiesLoading
  } = useProperties(filters);

  // Pagination
  const PAGE_SIZE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [filters, locationFilter]);
  const totalPages = Math.max(1, Math.ceil(properties.length / PAGE_SIZE));
  const paginatedProperties = properties.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );
  const goToPage = (page: number) => {
    const clamped = Math.min(Math.max(1, page), totalPages);
    setCurrentPage(clamped);
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };
  const getPageNumbers = (): (number | "ellipsis")[] => {
    if (totalPages <= 7) return Array.from({ length: totalPages }, (_, i) => i + 1);
    const pages: (number | "ellipsis")[] = [1];
    if (currentPage > 3) pages.push("ellipsis");
    const start = Math.max(2, currentPage - 1);
    const end = Math.min(totalPages - 1, currentPage + 1);
    for (let i = start; i <= end; i++) pages.push(i);
    if (currentPage < totalPages - 2) pages.push("ellipsis");
    pages.push(totalPages);
    return pages;
  };

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
        
        // Update location filter tabs
        if (value === 'turkiye') {
          setLocationFilter('turkey');
        } else if (value === 'dubai') {
          setLocationFilter('dubai');
        } else {
          setLocationFilter('all');
        }
      }

      // Clear district when city changes
      if (key === 'city') {
        newFilters.district = "";
      }

      return newFilters;
    });
  };

  const clearFilters = () => {
    setLocationFilter("turkey");
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
  const isDubaiTheme = locationFilter === "dubai";

  return (
    <div className={`min-h-screen transition-colors duration-500 ${isDubaiTheme ? "bg-[hsl(0,0%,11%)]" : "bg-background"}`}>
      <SEOHead
        title="Luxury Properties in Istanbul & Dubai"
        description="Browse luxury apartments, villas & investment properties in Istanbul, Bodrum & Dubai. Filter by location, type, budget. Turkish citizenship eligible."
        path="/properties"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Luxury Properties in Istanbul, Bodrum & Dubai",
          description: "Curated luxury homes, villas, and investment properties across Türkiye and Dubai.",
          url: "https://voi-home.com/properties",
          isPartOf: {
            "@type": "WebSite",
            name: "MR. Property",
            url: "https://voi-home.com",
          },
        }}
      />
      <Header />
      <main className="pt-24">
        <RevealOnScroll className="text-center max-w-2xl mx-auto px-6 pt-8 pb-2">
          <div className={`text-xs font-medium uppercase tracking-[1.5px] mb-4 transition-colors duration-500 ${isDubaiTheme ? "text-white/60" : "text-muted-foreground"}`}>
            {t("properties.title")}
          </div>
          <h1
            className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] transition-colors duration-500 ${i18n.language === "ar" ? "font-arabic" : "font-serif"} ${isDubaiTheme ? "text-white" : "text-foreground"}`}
          >
            {t("seo.h1.properties")}
          </h1>
        </RevealOnScroll>
        {/* Properties Listing Section */}
        <section className={`py-12 transition-colors duration-500 ${isDubaiTheme ? "bg-[hsl(0,0%,11%)]" : "bg-background"}`}>
          <div className="container mx-auto px-4">
            {/* Location Filter Tabs */}
            <div className="mb-8 flex justify-center gap-4 flex-wrap">
              <Button 
                variant={locationFilter === "all" ? "default" : "outline"} 
                onClick={() => setLocationFilter("all")} 
                className={locationFilter === "all" ? "bg-gold hover:bg-gold/90 text-primary" : isDubaiTheme ? "bg-[hsl(0,0%,15%)] border-white/20 text-white hover:bg-[hsl(0,0%,20%)] hover:text-white" : ""}
              >
                {t('properties.viewAll')}
              </Button>
              {filterOptions.regions.some(r => r.value.toLowerCase().includes('turkey') || r.value.toLowerCase().includes('turkiye')) && (
                <Button 
                  variant={locationFilter === "turkey" ? "default" : "outline"} 
                  onClick={() => setLocationFilter("turkey")} 
                  className={locationFilter === "turkey" ? "bg-gold hover:bg-gold/90 text-primary" : isDubaiTheme ? "bg-[hsl(0,0%,15%)] border-white/20 text-white hover:bg-[hsl(0,0%,20%)] hover:text-white" : ""}
                >
                  {t('properties.turkey')}
                </Button>
              )}
              {filterOptions.regions.some(r => r.value.toLowerCase().includes('dubai')) && (
                <Button 
                  variant={locationFilter === "dubai" ? "default" : "outline"} 
                  onClick={() => setLocationFilter("dubai")} 
                  className={locationFilter === "dubai" ? "bg-gold hover:bg-gold/90 text-primary" : isDubaiTheme ? "bg-[hsl(0,0%,15%)] border-white/20 text-white hover:bg-[hsl(0,0%,20%)] hover:text-white" : ""}
                >
                  {t('properties.dubai')}
                </Button>
              )}
            </div>

            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Filter className="mr-2 h-4 w-4" />
                    {t('properties.filters')}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className={`w-[300px] overflow-y-auto transition-colors duration-500 ${isDubaiTheme ? "bg-[hsl(0,0%,11%)]" : "bg-background"}`}>
                  <SheetHeader>
                    <SheetTitle className={`transition-colors duration-500 ${isDubaiTheme ? "text-white" : ""}`}>
                      {t('properties.filters')}
                    </SheetTitle>
                  </SheetHeader>
                  <div className="mt-6 pb-6">
                    <PropertyFilters 
                      filters={filters} 
                      onFilterChange={handleFilterChange} 
                      onClearFilters={clearFilters} 
                      locationFilter={locationFilter} 
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
            </div>

            <div className="flex gap-8">
              {/* Desktop Sidebar Filters */}
              <aside className="hidden lg:block w-64 space-y-6 flex-shrink-0 max-h-[calc(100vh-12rem)] overflow-y-auto sticky top-28">
                <div className={`p-6 rounded-lg shadow transition-colors duration-500 ${isDubaiTheme ? "bg-[hsl(0,0%,15%)] border border-white/10" : "bg-card"}`}>
                  <h2 className={`text-xl mb-4 transition-colors duration-500 ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'} ${isDubaiTheme ? "text-white" : "text-card-foreground"}`}>
                    {t('properties.filters')}
                  </h2>
                  <PropertyFilters 
                    filters={filters} 
                    onFilterChange={handleFilterChange} 
                    onClearFilters={clearFilters} 
                    locationFilter={locationFilter} 
                    availableAmenities={filterOptions.amenities} 
                    availablePropertyTypes={filterOptions.propertyTypes} 
                    availableLayouts={filterOptions.layouts} 
                    availableTransactionTypes={filterOptions.transactionTypes} 
                    availableBenefits={filterOptions.benefits} 
                    availableStatuses={filterOptions.statuses} 
                  />
                </div>
              </aside>

              {/* Properties Grid */}
              <div className="flex-1 min-w-0">
                {loading ? (
                  <LoadingSpinner message={t('properties.loading')} isDarkTheme={isDubaiTheme} />
                ) : properties.length === 0 ? (
                  <div className="text-center py-12">
                    <p className={`mb-6 transition-colors duration-500 ${isDubaiTheme ? "text-white/70" : "text-muted-foreground"}`}>
                      {t('properties.noProperties')}
                    </p>
                    <Button 
                      variant="outline" 
                      className={`border-gold text-gold hover:bg-gold hover:text-primary ${isDubaiTheme ? "bg-[hsl(220,15%,18%)]" : ""}`} 
                      onClick={clearFilters}
                    >
                      {t('properties.viewAllProperties')}
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
                      {paginatedProperties.map((property, index) => (
                        <RevealOnScroll key={property.id} delay={(index % PAGE_SIZE) * 40}>
                          <PropertyCard property={property} isDubaiTheme={isDubaiTheme} />
                        </RevealOnScroll>
                      ))}
                    </div>
                    {totalPages > 1 && (
                      <Pagination className="mt-10">
                        <PaginationContent className={`flex-wrap justify-center ${isDubaiTheme ? "text-white" : ""}`}>
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => { e.preventDefault(); goToPage(currentPage - 1); }}
                              aria-disabled={currentPage === 1}
                              className={`${currentPage === 1 ? "pointer-events-none opacity-50" : ""} ${isDubaiTheme ? "text-white hover:bg-white/10 hover:text-white" : ""}`}
                            />
                          </PaginationItem>
                          {getPageNumbers().map((p, idx) =>
                            p === "ellipsis" ? (
                              <PaginationItem key={`e-${idx}`}>
                                <PaginationEllipsis />
                              </PaginationItem>
                            ) : (
                              <PaginationItem key={p}>
                                <PaginationLink
                                  href="#"
                                  isActive={p === currentPage}
                                  onClick={(e) => { e.preventDefault(); goToPage(p); }}
                                  className={
                                    isDubaiTheme
                                      ? p === currentPage
                                        ? "bg-gold text-primary border-gold hover:bg-gold/90 hover:text-primary"
                                        : "bg-transparent border-white/20 text-white hover:bg-white/10 hover:text-white"
                                      : p === currentPage
                                        ? "bg-gold text-primary border-gold hover:bg-gold/90 hover:text-primary"
                                        : ""
                                  }
                                >
                                  {p}
                                </PaginationLink>
                              </PaginationItem>
                            )
                          )}
                          <PaginationItem>
                            <PaginationNext
                              href="#"
                              onClick={(e) => { e.preventDefault(); goToPage(currentPage + 1); }}
                              aria-disabled={currentPage === totalPages}
                              className={`${currentPage === totalPages ? "pointer-events-none opacity-50" : ""} ${isDubaiTheme ? "text-white hover:bg-white/10 hover:text-white" : ""}`}
                            />
                          </PaginationItem>
                        </PaginationContent>
                      </Pagination>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Properties;
