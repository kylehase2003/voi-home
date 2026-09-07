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
import PropertyCardMinimal from "@/components/property/PropertyCardMinimal";
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

  // Pagination
  const PAGE_SIZE = 12;
  const [currentPage, setCurrentPage] = useState(1);
  useEffect(() => {
    setCurrentPage(1);
  }, [filters]);
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
        title="Luxury Properties in Istanbul & Bodrum"
        description="Browse luxury apartments, villas & investment properties in Istanbul and Bodrum, every one personally vetted. Filter by location, type, budget. Turkish citizenship eligible."
        path="/properties"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Luxury Properties in Istanbul & Bodrum, Türkiye",
          description: "Curated luxury homes, villas, and investment properties across Türkiye, chosen for the details that matter.",
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
            className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground ${
              i18n.language === "ar" ? "font-arabic" : "font-serif"
            }`}
          >
            {t("seo.h1.properties")}
          </h1>
        </RevealOnScroll>
        {/* Properties Listing Section */}
        <section className="py-12 bg-background">
          <div className="container mx-auto px-4">
            {/* Mobile Filter Button */}
            <div className="lg:hidden mb-6">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" className="w-full rounded-full">
                    <Filter className="mr-2 h-4 w-4" />
                    {t('properties.filters')}
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[300px] overflow-y-auto bg-background">
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
            </div>

            <div className="flex gap-10">
              {/* Desktop Sidebar Filters */}
              <aside className="hidden lg:block w-64 space-y-6 flex-shrink-0 max-h-[calc(100vh-12rem)] overflow-y-auto sticky top-28">
                <div className="pr-2">
                  <h2
                    className={`text-xs font-medium uppercase tracking-[1.5px] mb-5 text-muted-foreground ${
                      i18n.language === 'ar' ? 'font-arabic' : ''
                    }`}
                  >
                    {t('properties.filters')}
                  </h2>
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
              </aside>

              {/* Properties Grid */}
              <div className="flex-1 min-w-0">
                {loading ? (
                  <LoadingSpinner message={t('properties.loading')} />
                ) : properties.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="mb-6 text-muted-foreground">
                      {t('properties.noProperties')}
                    </p>
                    <Button
                      variant="outline"
                      className="border-gold text-gold hover:bg-gold hover:text-white rounded-full"
                      onClick={clearFilters}
                    >
                      {t('properties.viewAllProperties')}
                    </Button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-x-6 gap-y-10">
                      {paginatedProperties.map((property, index) => (
                        <RevealOnScroll key={property.id} delay={(index % PAGE_SIZE) * 40}>
                          <PropertyCardMinimal property={property} />
                        </RevealOnScroll>
                      ))}
                    </div>
                    {totalPages > 1 && (
                      <Pagination className="mt-12">
                        <PaginationContent className="flex-wrap justify-center">
                          <PaginationItem>
                            <PaginationPrevious
                              href="#"
                              onClick={(e) => { e.preventDefault(); goToPage(currentPage - 1); }}
                              aria-disabled={currentPage === 1}
                              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
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
                                  className={p === currentPage ? "bg-gold text-white border-gold hover:bg-gold/90 hover:text-white" : ""}
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
                              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
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
