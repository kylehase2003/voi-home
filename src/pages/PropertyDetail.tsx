import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFoundState from "@/components/NotFoundState";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { MapPin, Bed, Bath, Maximize, Home, CheckCircle2, Plane, Building, ShoppingBag, GraduationCap, Hospital, Utensils, Train, Bus, Church, Trees, Dumbbell, Landmark, ShieldCheck, Fuel, Pill, Coffee, X, UtensilsCrossed, Waves, Store, ParkingCircle, Building2, School, Milestone } from "lucide-react";
import { useProperty } from "@/hooks/useProperties";
import { getTransactionTypeLabel, DEFAULT_FEATURES } from "@/constants/property";
import { useIsMobile } from "@/hooks/use-mobile";
import PropertyMap from "@/components/PropertyMap";
import LoadingSpinner from "@/components/property/LoadingSpinner";
import PropertyOverview from "@/components/property/PropertyOverview";
import AreaDetails from "@/components/property/AreaDetails";
import InvestmentReturns from "@/components/property/InvestmentReturns";
import PropertyCardMinimal from "@/components/property/PropertyCardMinimal";
import apartmentImage from "@/assets/apartment-modern.jpg";
import { getTranslatedContent } from "@/lib/i18n-content";
import OptimizedImage from "@/components/OptimizedImage";
import RevealOnScroll from "@/components/RevealOnScroll";
import SEOHead from "@/components/SEOHead";
import PropertyFAQ from "@/components/property/PropertyFAQ";
import { supabase } from "@/integrations/supabase/client";
import type { Property } from "@/types/property";

const PropertyDetail = () => {
  const { slug } = useParams();
  const { property, loading } = useProperty(slug);
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const isMobile = useIsMobile();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<{ image_url: string; title: string } | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [suggested, setSuggested] = useState<Property[]>([]);
  const allImages = property && Array.isArray(property.images) && property.images.length > 0 ? property.images : [apartmentImage];

  const openLightbox = (index: number) => setSelectedImageIndex(index);
  const closeLightbox = () => setSelectedImageIndex(null);
  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) setSelectedImageIndex(selectedImageIndex - 1);
  };
  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < allImages.length - 1) setSelectedImageIndex(selectedImageIndex + 1);
  };

  useEffect(() => {
    if (!carouselApi) return;
    const onSelect = () => setCurrentSlide(carouselApi.selectedScrollSnap());
    carouselApi.on("select", onSelect);
    onSelect();
    return () => {
      carouselApi.off("select", onSelect);
    };
  }, [carouselApi]);

  const goToSlide = (index: number) => carouselApi?.scrollTo(index);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === "Escape") closeLightbox();
      else if (e.key === "ArrowLeft") goToPrevious();
      else if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedImageIndex, allImages.length]);

  useEffect(() => {
    if (!property?.id) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from("properties")
        .select("*")
        .neq("id", property.id)
        .neq("status", "draft")
        .order("created_at", { ascending: false })
        .limit(3);
      if (!cancelled) setSuggested((data as Property[]) || []);
    })();
    return () => {
      cancelled = true;
    };
  }, [property?.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner message="Loading property details..." />
        </div>
        <Footer />
      </div>
    );
  }

  if (!property) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <NotFoundState
          icon={Home}
          titleKey="propertyDetail.notFound"
          descriptionKey="propertyDetail.notFoundDescription"
          primaryAction={{ to: "/properties", labelKey: "propertyDetail.viewAllProperties" }}
          secondaryAction={{ to: "/", labelKey: "nav.home" }}
        />
        <Footer />
      </div>
    );
  }

  const mainImage = Array.isArray(property.images) && property.images.length > 0 ? property.images[0] : apartmentImage;
  const font = isRTL ? "font-arabic" : "font-serif";

  const getTranslatedTransactionType = () => {
    if (property.transaction_type === "sale") return t("propertyDetail.forSale");
    if (property.transaction_type === "rent") return t("propertyDetail.forRent");
    return getTransactionTypeLabel(property.transaction_type);
  };
  const statusText = getTranslatedTransactionType();

  const propertyTypeTranslations: Record<string, Record<string, string>> = {
    en: {
      apartment: "Apartment", villa: "Villa", penthouse: "Penthouse", commercial: "Commercial",
      studio: "Studio", townhouse: "Townhouse", land: "Land", duplex: "Duplex", loft: "Loft",
      office: "Office", shop: "Shop", "hotel-apartment": "Hotel Apartment",
    },
    ar: {
      apartment: "شقة", villa: "فيلا", penthouse: "بنتهاوس", commercial: "تجاري", studio: "استوديو",
      townhouse: "تاون هاوس", land: "أرض", duplex: "دوبلكس", loft: "لوفت", office: "مكتب",
      shop: "محل", "hotel-apartment": "شقة فندقية",
    },
  };
  const getTranslatedPropertyType = (type: string) => {
    const lang = i18n.language;
    const key = type.toLowerCase();
    return propertyTypeTranslations[lang]?.[key] || propertyTypeTranslations["en"]?.[key] || type;
  };

  const getTranslatedTitleDeed = (titleDeed: string) => {
    const key = titleDeed.toLowerCase().replace(/\s+/g, "");
    const translationKey = `propertyDetail.titleDeedValues.${key}`;
    const translated = t(translationKey);
    return translated !== translationKey ? translated : titleDeed;
  };

  const getTranslatedBenefit = (benefit: string) => {
    const keyMap: Record<string, string> = {
      "citizenship eligible": "citizenshipEligible", citizenshipeligible: "citizenshipEligible",
      "high roi": "highROI", highroi: "highROI", "rental yields": "rentalYields",
      rentalyields: "rentalYields", lifestyle: "lifestyle",
      "investment opportunity": "investmentOpportunity", investmentopportunity: "investmentOpportunity",
    };
    const normalizedBenefit = benefit.toLowerCase();
    const key = keyMap[normalizedBenefit] || normalizedBenefit.replace(/\s+/g, "");
    const translationKey = `propertyDetail.benefitValues.${key}`;
    const translated = t(translationKey);
    return translated !== translationKey ? translated : benefit;
  };

  const getTranslatedAmenity = (amenity: string) => {
    const keyMap: Record<string, string> = {
      gym: "gym", garden: "garden", pool: "pool", "swimming pool": "swimmingPool", swimmingpool: "swimmingPool",
      parking: "parking", security: "security", "24h security": "24hSecurity", "24hsecurity": "24hSecurity",
      "24/7 security": "24hSecurity", elevator: "elevator", balcony: "balcony", terrace: "terrace",
      "air conditioning": "airConditioning", airconditioning: "airConditioning", "central heating": "centralHeating",
      centralheating: "centralHeating", internet: "internet", wifi: "wifi", "cable tv": "cableTV", cabletv: "cableTV",
      laundry: "laundry", storage: "storage", playground: "playground", spa: "spa", sauna: "sauna",
      concierge: "concierge", "concierge service": "conciergeService", doorman: "doorman", rooftop: "rooftop",
      "sea view": "seaView", seaview: "seaView", "city view": "cityView", cityview: "cityView",
      "mountain view": "mountainView", mountainview: "mountainView", "marina view": "marinaView",
      marinaview: "marinaView", fireplace: "fireplace", "pets allowed": "petsAllowed", petsallowed: "petsAllowed",
      furnished: "furnished", unfurnished: "unfurnished", "maid room": "maidRoom", maidroom: "maidRoom",
      "study room": "studyRoom", studyroom: "studyRoom", "private pool": "privatePool", privatepool: "privatePool",
      jacuzzi: "jacuzzi", "bbq area": "bbqArea", bbqarea: "bbqArea", tennis: "tennis", "tennis court": "tennis",
      basketball: "basketball", "basketball court": "basketball", "jogging track": "joggingTrack",
      joggingtrack: "joggingTrack", "kids pool": "kidsPool", kidspool: "kidsPool", "kids area": "kidsArea",
      kidsarea: "kidsArea", cinema: "cinema", restaurant: "restaurant", cafe: "cafe", supermarket: "supermarket",
      pharmacy: "pharmacy", mosque: "mosque", school: "school", hospital: "hospital",
    };
    const normalizedAmenity = amenity.toLowerCase();
    const key = keyMap[normalizedAmenity];
    if (key) {
      const translationKey = `propertyDetail.amenityValues.${key}`;
      const translated = t(translationKey);
      return translated !== translationKey ? translated : amenity;
    }
    return amenity;
  };

  const features = Array.isArray(property.features) && property.features.length > 0 ? property.features : [...DEFAULT_FEATURES];

  const getIconForPlace = (iconName: string) => {
    const icons: Record<string, typeof Building2> = {
      School, ShoppingBag, UtensilsCrossed, Hospital, Trees, Waves, Train, Plane, Church, Dumbbell,
      Pill, Landmark, Store, Fuel, ShieldCheck, Coffee, GraduationCap, ParkingCircle, Building2, Milestone,
    };
    return icons[iconName] || Building2;
  };

  const getTranslatedPlaceName = (name: string) => {
    const keyMap: Record<string, string> = {
      "liv hospital": "livHospital", "belgard forest": "belgardForest", "belgrad forest": "belgradForest",
      "tem highway": "temHighway", metro: "metro", "metro station": "metroStation",
      "istinye university": "istinyeUniversity", "vadi istanbul mall": "vadiIstanbulMall", airport: "airport",
      "istanbul airport": "istanbulAirport", "bus stop": "busStop", schools: "schools", hospitals: "hospitals",
      "grocery stores": "groceryStores", "shopping mall": "shoppingMall", beach: "beach", park: "park",
      mosque: "mosque", restaurant: "restaurant", gym: "gym", pharmacy: "pharmacy", bank: "bank", atm: "atm",
      "gas station": "gasStation", highway: "highway", e80: "e80", university: "university",
      "vialand theme park": "vialandThemePark", "taksim square": "taksimSquare", "grand bazaar": "grandBazaar",
      "eyupsultan mosque": "eyupsultanMosque", "e5 and tem highway": "e5AndTemHighway", "golden horn": "goldenHorn",
      bosphorus: "bosphorus", "old city": "oldCity", "galata tower": "galataTower",
      "sultanahmet mosque": "sultanahmetMosque", "topkapi palace": "topkapiPalace", "hagia sophia": "hagiaSophia",
      "dolmabahce palace": "dolmabahcePalace", "spice market": "spiceMarket", "istiklal street": "istiklalStreet",
    };
    const normalizedName = name.toLowerCase().trim();
    const key = keyMap[normalizedName];
    if (key) {
      const translationKey = `propertyDetail.nearbyPlaceNames.${key}`;
      const translated = t(translationKey);
      return translated !== translationKey ? translated : name;
    }
    return name;
  };

  const getTranslatedDistance = (distance: string) => {
    const keyMap: Record<string, string> = {
      "immediate access": "immediateAccess", "direct private access": "directPrivateAccess",
      connectivity: "connectivity", connecivity: "connectivity", "walking distance": "walkingDistance",
      nearby: "nearby", "easy access": "easyAccess",
    };
    const normalizedDistance = distance.toLowerCase().trim();
    const key = keyMap[normalizedDistance];
    if (key) {
      const translationKey = `propertyDetail.nearbyPlaceDistances.${key}`;
      const translated = t(translationKey);
      return translated !== translationKey ? translated : distance;
    }
    return distance;
  };

  const translatedTitle = getTranslatedContent(property, "title", i18n.language);
  const translatedDesc =
    getTranslatedContent(property, "description", i18n.language) ||
    `${translatedTitle} - Luxury property in ${property.location}. ${property.bedrooms ? property.bedrooms + " bedrooms, " : ""}${property.bathrooms ? property.bathrooms + " bathrooms. " : ""}Price: $${property.price.toLocaleString()}.`;

  const specs = [
    property.bedrooms ? `${property.bedrooms} Bed` : null,
    property.bathrooms ? `${property.bathrooms} Bath` : null,
    property.area_sqm ? `${property.area_sqm.toLocaleString()} m²` : null,
  ].filter(Boolean);

  return (
    <div className="min-h-screen">
      <SEOHead
        title={translatedTitle}
        description={translatedDesc}
        path={`/property/${property.slug}`}
        ogImage={mainImage}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          name: translatedTitle,
          description: translatedDesc,
          url: `https://voi-home.com/property/${property.slug}`,
          image: mainImage,
          price: property.price,
          priceCurrency: "USD",
          ...(property.location && { address: { "@type": "PostalAddress", addressLocality: property.location } }),
        }}
      />
      <Header />

      <main className="pt-24 md:pt-28 pb-16 md:pb-24 bg-background">
        <div className="container mx-auto px-4 md:px-6">
          {/* Gallery */}
          <div className="mb-10 md:mb-14">
            <Carousel className="w-full" setApi={setCarouselApi}>
              <CarouselContent>
                {allImages.map((img, idx) => (
                  <CarouselItem key={idx}>
                    <div
                      className={`relative ${isMobile ? "h-[320px]" : "h-[560px]"} rounded-[20px] md:rounded-[28px] overflow-hidden cursor-pointer group`}
                      onClick={() => openLightbox(idx)}
                    >
                      <OptimizedImage
                        src={img}
                        alt={`${property.title} ${idx + 1}`}
                        priority={idx === 0}
                        className="group-hover:scale-[1.02] transition-transform duration-500"
                        containerClassName="w-full h-full"
                      />
                      {idx === 0 && (
                        <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-medium uppercase tracking-[1px]">
                          {statusText}
                        </div>
                      )}
                      <div className="absolute bottom-4 right-4 px-3 py-1 rounded-full bg-black/40 backdrop-blur-md text-white text-xs font-medium">
                        {idx + 1} / {allImages.length}
                      </div>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="left-3" />
              <CarouselNext className="right-3" />
            </Carousel>

            {allImages.length > 1 && (
              <div className="flex gap-2 overflow-x-auto pt-3">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => goToSlide(idx)}
                    className={`relative flex-shrink-0 w-20 h-16 rounded-lg overflow-hidden transition-opacity duration-200 ${
                      currentSlide === idx ? "opacity-100 ring-1 ring-foreground" : "opacity-50 hover:opacity-80"
                    }`}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" loading="lazy" />
                  </button>
                ))}
              </div>
            )}

            <Dialog open={selectedImageIndex !== null} onOpenChange={(open) => !open && closeLightbox()}>
              <DialogContent className="max-w-6xl w-[90vw] max-h-[85vh] p-0 bg-black/95 border-none rounded-lg overflow-hidden">
                <div className="relative w-full h-full flex items-center justify-center p-8">
                  <button onClick={closeLightbox} className="absolute top-4 right-4 z-50 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-colors">
                    <X className="h-6 w-6 text-white" />
                  </button>
                  {selectedImageIndex !== null && (
                    <LightboxCarousel images={allImages} startIndex={selectedImageIndex} title={property.title} />
                  )}
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16">
            <div className="lg:col-span-2">
              {/* Title / location / specs / description */}
              <div className="mb-4">
                <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-3">
                  <MapPin className="h-3.5 w-3.5" />
                  {property.district || property.location}
                </div>
                {property.property_id && (
                  <p className="text-xs text-muted-foreground mb-2">{property.property_id}</p>
                )}
                <h1 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-6 text-foreground ${font}`}>
                  {translatedTitle}
                </h1>

                {specs.length > 0 && (
                  <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-muted-foreground border-t border-b border-border py-4 mb-6">
                    {property.bedrooms ? (
                      <span className="flex items-center gap-1.5"><Bed className="h-4 w-4" />{property.bedrooms} Bed</span>
                    ) : null}
                    {property.bathrooms ? (
                      <span className="flex items-center gap-1.5"><Bath className="h-4 w-4" />{property.bathrooms} Bath</span>
                    ) : null}
                    {property.area_sqm ? (
                      <span className="flex items-center gap-1.5"><Maximize className="h-4 w-4" />{property.area_sqm.toLocaleString()} m²</span>
                    ) : null}
                  </div>
                )}

                {property.description && (
                  <p className="text-base text-muted-foreground leading-[1.7]">
                    {getTranslatedContent(property, "description", i18n.language)}
                  </p>
                )}
              </div>

              <RevealOnScroll><PropertyOverview property={property} /></RevealOnScroll>
              <RevealOnScroll><AreaDetails property={property} /></RevealOnScroll>
              <RevealOnScroll><InvestmentReturns property={property} /></RevealOnScroll>

              {(property.completion_date || property.plot_ratio || property.clear_height) && (
                <RevealOnScroll>
                  <section className="py-8 md:py-10 border-t border-border">
                    <h2 className={`text-xl md:text-2xl mb-6 text-foreground ${font}`}>{t("propertyDetail.areaDetailsSection")}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                      {property.completion_date && (
                        <div>
                          <p className="text-xs uppercase tracking-[1px] text-muted-foreground mb-2">{t("propertyDetail.completion")}</p>
                          <p className="text-foreground font-medium">{property.completion_date}</p>
                        </div>
                      )}
                      {property.plot_ratio && (
                        <div>
                          <p className="text-xs uppercase tracking-[1px] text-muted-foreground mb-2">{t("propertyDetail.plotRatio")}</p>
                          <p className="text-foreground font-medium">{property.plot_ratio}</p>
                        </div>
                      )}
                      {property.clear_height && (
                        <div>
                          <p className="text-xs uppercase tracking-[1px] text-muted-foreground mb-2">{t("propertyDetail.clearHeight")}</p>
                          <p className="text-foreground font-medium">{property.clear_height}</p>
                        </div>
                      )}
                    </div>
                  </section>
                </RevealOnScroll>
              )}

              {property.payment_plans && property.payment_plans.length > 0 && (
                <RevealOnScroll>
                  <section className="py-8 md:py-10 border-t border-border">
                    <h2 className={`text-xl md:text-2xl mb-6 text-foreground ${font}`}>{t("propertyDetail.apartmentThatMatters")}</h2>
                    <div className="border-t border-border">
                      {property.payment_plans.map((plan, idx) => (
                        <div key={idx} className="flex items-center justify-between py-3 border-b border-border text-sm">
                          <span className="text-muted-foreground">{plan.period}</span>
                          <span className="font-medium text-foreground">${plan.amount.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                </RevealOnScroll>
              )}

              {property.long_description && (
                <RevealOnScroll>
                  <section className="py-8 md:py-10 border-t border-border">
                    <h2 className={`text-xl md:text-2xl mb-6 text-foreground ${font}`}>{t("propertyDetail.propertyInformation")}</h2>
                    <div
                      className="text-muted-foreground leading-relaxed prose prose-sm max-w-none [&>h1]:text-foreground [&>h2]:text-foreground [&>h3]:text-foreground [&>p]:text-muted-foreground [&>ul]:text-muted-foreground [&>ol]:text-muted-foreground"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getTranslatedContent(property, "long_description", i18n.language)) }}
                    />
                  </section>
                </RevealOnScroll>
              )}

              <RevealOnScroll>
                <section className="py-8 md:py-10 border-t border-border">
                  <h2 className={`text-xl md:text-2xl mb-6 text-foreground ${font}`}>{t("propertyDetail.amenities")}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-6 gap-y-4">
                    {features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2.5 text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-muted-foreground flex-shrink-0" strokeWidth={1.5} />
                        <span>{getTranslatedAmenity(feature)}</span>
                      </div>
                    ))}
                  </div>
                </section>
              </RevealOnScroll>

              {property.nearby_places && property.nearby_places.length > 0 && (
                <RevealOnScroll>
                  <section className="py-8 md:py-10 border-t border-border">
                    <h2 className={`text-xl md:text-2xl mb-6 text-foreground ${font}`}>{t("propertyDetail.nearbyPlaces")}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-6 gap-y-8">
                      {property.nearby_places.map((place, idx) => {
                        const Icon = getIconForPlace(place.icon);
                        return (
                          <div key={idx} className="flex items-start gap-3">
                            <Icon className="h-5 w-5 text-muted-foreground flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                            <div>
                              <p className="text-sm font-medium text-foreground">{getTranslatedPlaceName(place.name)}</p>
                              <p className="text-xs text-muted-foreground">{getTranslatedDistance(place.distance)}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </RevealOnScroll>
              )}

              {property.why_this_property && (
                <RevealOnScroll>
                  <section className="py-8 md:py-10 border-t border-border">
                    <h2 className={`text-xl md:text-2xl mb-6 text-foreground ${font}`}>{t("propertyDetail.whyThisProperty")}</h2>
                    <div
                      className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(getTranslatedContent(property, "why_this_property", i18n.language)) }}
                    />
                  </section>
                </RevealOnScroll>
              )}

              {property.floor_plans && property.floor_plans.length > 0 && (
                <RevealOnScroll>
                  <section className="py-8 md:py-10 border-t border-border">
                    <h2 className={`text-xl md:text-2xl mb-6 text-foreground ${font}`}>{t("propertyDetail.apartmentTypesAndPrices")}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                      {property.floor_plans.map((plan, idx) => {
                        const priceMin = plan.subtitle;
                        const priceMax = (plan as { price_max?: string }).price_max;
                        const priceDisplay = priceMax ? `$${priceMin} - $${priceMax}` : `$${priceMin}`;
                        const areaMin = plan.area;
                        const areaMax = (plan as { area_max?: string }).area_max;
                        const areaDisplay = areaMax ? `${areaMin} - ${areaMax} m²` : `${areaMin} m²`;
                        return (
                          <div key={idx} className="cursor-pointer group" onClick={() => setSelectedFloorPlan({ image_url: plan.image_url, title: plan.title })}>
                            <div className="relative overflow-hidden rounded-2xl aspect-[4/3] bg-muted mb-3">
                              <OptimizedImage
                                src={plan.image_url}
                                alt={plan.title}
                                className="transition-transform duration-500 group-hover:scale-105"
                                containerClassName="w-full h-full"
                              />
                            </div>
                            <p className={`text-base text-foreground ${font}`}>{plan.title}</p>
                            <p className="text-sm text-muted-foreground">{priceDisplay} · {areaDisplay}</p>
                          </div>
                        );
                      })}
                    </div>
                  </section>
                </RevealOnScroll>
              )}

              <Dialog open={!!selectedFloorPlan} onOpenChange={(open) => !open && setSelectedFloorPlan(null)}>
                <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
                  <div className="relative">
                    <button
                      onClick={() => setSelectedFloorPlan(null)}
                      className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/70 text-white rounded-full p-2 transition-colors"
                    >
                      <X className="h-6 w-6" />
                    </button>
                    {selectedFloorPlan && (
                      <img src={selectedFloorPlan.image_url} alt={selectedFloorPlan.title} className="w-full max-h-[80vh] object-contain rounded-lg" />
                    )}
                  </div>
                </DialogContent>
              </Dialog>

              <RevealOnScroll>
                <section className="py-8 md:py-10 border-t border-border">
                  <h2 className={`text-xl md:text-2xl mb-6 text-foreground ${font}`}>{t("propertyDetail.map")}</h2>
                  <div className="rounded-[20px] overflow-hidden border border-border">
                    <PropertyMap
                      mapEmbedUrl={property.map_embed_url || undefined}
                      mapLinkUrl={property.map_link_url || undefined}
                      location={property.location}
                      region={property.region}
                      latitude={property.latitude}
                      longitude={property.longitude}
                    />
                  </div>
                </section>
              </RevealOnScroll>

              <RevealOnScroll><PropertyFAQ /></RevealOnScroll>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1 order-first lg:order-last">
              <div className="lg:sticky lg:top-28 border border-border rounded-[20px] p-6 md:p-8">
                <p className="text-xs uppercase tracking-[1px] text-muted-foreground mb-2">{t("propertyDetail.startingFrom")}</p>
                <p className={`text-3xl md:text-4xl mb-6 text-foreground ${font}`}>${property.price.toLocaleString()}</p>

                <div className="space-y-3 mb-8 text-sm">
                  <div className="flex justify-between items-center border-t border-border pt-3">
                    <span className="text-muted-foreground">{t("propertyDetail.propertyType")}</span>
                    <span className="font-medium text-foreground">{getTranslatedPropertyType(property.property_type)}</span>
                  </div>

                  {property.benefit && (
                    <div className="flex justify-between items-center border-t border-border pt-3">
                      <span className="text-muted-foreground">{t("propertyDetail.benefit")}</span>
                      <span className="font-medium text-foreground">
                        {(() => {
                          const firstBenefit = property.benefit.split(",")[0].trim();
                          const langField = i18n.language === "ar" ? "benefit_ar" : null;
                          const dbTranslation = langField ? property[langField as "benefit_ar"] : null;
                          if (dbTranslation && dbTranslation.trim() !== "") return dbTranslation.split(",")[0].trim();
                          return getTranslatedBenefit(firstBenefit);
                        })()}
                      </span>
                    </div>
                  )}

                  {property.delivery_date && (
                    <div className="flex justify-between items-center border-t border-border pt-3">
                      <span className="text-muted-foreground">{t("propertyDetail.deliveryDate")}</span>
                      <span className="font-medium text-foreground">{property.delivery_date}</span>
                    </div>
                  )}

                  {property.title_deed && (
                    <div className="flex justify-between items-center border-t border-border pt-3">
                      <span className="text-muted-foreground">{t("propertyDetail.titleDeed")}</span>
                      <span className="font-medium text-foreground">{getTranslatedTitleDeed(property.title_deed)}</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center border-t border-b border-border py-3">
                    <span className="text-muted-foreground">{t("propertyDetail.status")}</span>
                    <span className="font-medium text-foreground">{property.construction_status || statusText}</span>
                  </div>
                </div>

                <Button asChild className="w-full bg-gold hover:bg-gold/90 text-white font-semibold py-6">
                  <a
                    href={`https://wa.me/905527971000?text=${encodeURIComponent(`${t("propertyDetail.whatsappInquiry", { title: translatedTitle })}\n${window.location.href}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {t("propertyDetail.wantToKnowMore")}
                  </a>
                </Button>
              </div>
            </div>
          </div>

          {/* Similar properties */}
          {suggested.length > 0 && (
            <RevealOnScroll>
              <section className="mt-20 md:mt-28 pt-16 border-t border-border">
                <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-10 md:mb-12 text-foreground ${font}`}>
                  {t("propertyDetail.suggestedProperties")}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-10">
                  {suggested.map((p) => (
                    <PropertyCardMinimal key={p.id} property={p} />
                  ))}
                </div>
              </section>
            </RevealOnScroll>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

const LightboxCarousel = ({ images, startIndex, title }: { images: string[]; startIndex: number; title: string }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(startIndex);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setCurrent(api.selectedScrollSnap());
    api.on("select", onSelect);
    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <>
      <Carousel className="w-full" opts={{ startIndex, loop: true }} setApi={setApi}>
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx} className="flex items-center justify-center">
              <img src={img} alt={`${title} - Image ${idx + 1}`} className="max-h-[70vh] max-w-full object-contain rounded-lg select-none" draggable={false} />
            </CarouselItem>
          ))}
        </CarouselContent>
        {images.length > 1 && (
          <>
            <CarouselPrevious className="left-2 bg-black/60 hover:bg-black/80 text-white border-none" />
            <CarouselNext className="right-2 bg-black/60 hover:bg-black/80 text-white border-none" />
          </>
        )}
      </Carousel>
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded-full text-sm font-medium">
        {current + 1} / {images.length}
      </div>
    </>
  );
};

export default PropertyDetail;
