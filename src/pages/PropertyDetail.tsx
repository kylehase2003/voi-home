import { useParams, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFoundState from "@/components/NotFoundState";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import { MapPin, Bed, Bath, Maximize, Calendar, Home, Heart, CheckCircle2, Plane, Building, ShoppingBag, GraduationCap, Hospital, Utensils, Train, Bus, Church, Trees, Dumbbell, Landmark, ShieldCheck, Fuel, Pill, Coffee, X, ChevronLeft, ChevronRight, UtensilsCrossed, Waves, Store, ParkingCircle, Building2, School, Milestone, Flame, Film, Baby, Sparkles } from "lucide-react";
import { useProperty } from "@/hooks/useProperties";
import { getTransactionTypeLabel, DEFAULT_FEATURES } from "@/constants/property";
import { useIsMobile } from "@/hooks/use-mobile";
import PropertyMap from "@/components/PropertyMap";
import LoadingSpinner from "@/components/property/LoadingSpinner";
import PropertyOverview from "@/components/property/PropertyOverview";
import AreaDetails from "@/components/property/AreaDetails";
import InvestmentReturns from "@/components/property/InvestmentReturns";
import apartmentImage from "@/assets/apartment-modern.jpg";
import { getTranslatedContent } from "@/lib/i18n-content";
import OptimizedImage from "@/components/OptimizedImage";
import RevealOnScroll from "@/components/RevealOnScroll";
import SEOHead from "@/components/SEOHead";
import PropertyFAQ from "@/components/property/PropertyFAQ";
import { supabase } from "@/integrations/supabase/client";
const PropertyDetail = () => {
  const {
    slug
  } = useParams();
  const {
    property,
    loading
  } = useProperty(slug);
  const {
    t,
    i18n
  } = useTranslation();
  const isMobile = useIsMobile();
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [selectedFloorPlan, setSelectedFloorPlan] = useState<{ image_url: string; title: string } | null>(null);
  const [carouselApi, setCarouselApi] = useState<CarouselApi>();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [suggested, setSuggested] = useState<any[]>([]);
  const allImages = property && Array.isArray(property.images) && property.images.length > 0 ? property.images : [apartmentImage];
  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
  };
  const closeLightbox = () => {
    setSelectedImageIndex(null);
  };
  const goToPrevious = () => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  };
  const goToNext = () => {
    if (selectedImageIndex !== null && selectedImageIndex < allImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  };

  // Carousel slide tracking
  useEffect(() => {
    if (!carouselApi) return;
    
    const onSelect = () => {
      setCurrentSlide(carouselApi.selectedScrollSnap());
    };
    
    carouselApi.on('select', onSelect);
    onSelect(); // Set initial slide
    
    return () => {
      carouselApi.off('select', onSelect);
    };
  }, [carouselApi]);

  // Navigate to specific slide
  const goToSlide = (index: number) => {
    carouselApi?.scrollTo(index);
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowLeft') {
        goToPrevious();
      } else if (e.key === 'ArrowRight') {
        goToNext();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, allImages.length]);

  // Suggested properties
  useEffect(() => {
    if (!property?.id) return;
    let cancelled = false;
    (async () => {
      const { data } = await supabase
        .from('properties')
        .select('id, slug, title, title_ar, description, description_ar, images, price, region, location')
        .neq('id', property.id)
        .neq('status', 'draft')
        .order('created_at', { ascending: false })
        .limit(4);
      if (!cancelled) setSuggested(data || []);
    })();
    return () => { cancelled = true; };
  }, [property?.id]);
  if (loading) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1 flex items-center justify-center">
          <LoadingSpinner message="Loading property details..." />
        </div>
        <Footer />
      </div>;
  }
  if (!property) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <NotFoundState
          icon={Home}
          titleKey="propertyDetail.notFound"
          descriptionKey="propertyDetail.notFoundDescription"
          primaryAction={{
            to: "/properties",
            labelKey: "propertyDetail.viewAllProperties",
          }}
          secondaryAction={{
            to: "/",
            labelKey: "nav.home",
          }}
        />
        <Footer />
      </div>;
  }
  const mainImage = Array.isArray(property.images) && property.images.length > 0 ? property.images[0] : apartmentImage;
  const getTranslatedTransactionType = () => {
    if (property.transaction_type === 'sale') return t('propertyDetail.forSale');
    if (property.transaction_type === 'rent') return t('propertyDetail.forRent');
    return getTransactionTypeLabel(property.transaction_type);
  };
  const statusText = getTranslatedTransactionType();
  const propertyTypeTranslations: Record<string, Record<string, string>> = {
    en: {
      apartment: "Apartment",
      villa: "Villa",
      penthouse: "Penthouse",
      commercial: "Commercial",
      studio: "Studio",
      townhouse: "Townhouse",
      land: "Land",
      duplex: "Duplex",
      loft: "Loft",
      office: "Office",
      shop: "Shop",
      "hotel-apartment": "Hotel Apartment"
    },
    ar: {
      apartment: "شقة",
      villa: "فيلا",
      penthouse: "بنتهاوس",
      commercial: "تجاري",
      studio: "استوديو",
      townhouse: "تاون هاوس",
      land: "أرض",
      duplex: "دوبلكس",
      loft: "لوفت",
      office: "مكتب",
      shop: "محل",
      "hotel-apartment": "شقة فندقية"
    }
  };
  const getTranslatedPropertyType = (type: string) => {
    const lang = i18n.language;
    const key = type.toLowerCase();
    return propertyTypeTranslations[lang]?.[key] || propertyTypeTranslations['en']?.[key] || type;
  };
  const getTranslatedTitleDeed = (titleDeed: string) => {
    const key = titleDeed.toLowerCase().replace(/\s+/g, '');
    const translationKey = `propertyDetail.titleDeedValues.${key}`;
    const translated = t(translationKey);
    return translated !== translationKey ? translated : titleDeed;
  };
  const getTranslatedBenefit = (benefit: string) => {
    const keyMap: Record<string, string> = {
      'citizenship eligible': 'citizenshipEligible',
      'citizenshipeligible': 'citizenshipEligible',
      'high roi': 'highROI',
      'highroi': 'highROI',
      'rental yields': 'rentalYields',
      'rentalyields': 'rentalYields',
      'lifestyle': 'lifestyle',
      'investment opportunity': 'investmentOpportunity',
      'investmentopportunity': 'investmentOpportunity'
    };
    const normalizedBenefit = benefit.toLowerCase();
    const key = keyMap[normalizedBenefit] || normalizedBenefit.replace(/\s+/g, '');
    const translationKey = `propertyDetail.benefitValues.${key}`;
    const translated = t(translationKey);
    return translated !== translationKey ? translated : benefit;
  };
  const getTranslatedAmenity = (amenity: string) => {
    const keyMap: Record<string, string> = {
      'gym': 'gym',
      'garden': 'garden',
      'pool': 'pool',
      'swimming pool': 'swimmingPool',
      'swimmingpool': 'swimmingPool',
      'parking': 'parking',
      'security': 'security',
      '24h security': '24hSecurity',
      '24hsecurity': '24hSecurity',
      '24/7 security': '24hSecurity',
      'elevator': 'elevator',
      'balcony': 'balcony',
      'terrace': 'terrace',
      'air conditioning': 'airConditioning',
      'airconditioning': 'airConditioning',
      'central heating': 'centralHeating',
      'centralheating': 'centralHeating',
      'internet': 'internet',
      'wifi': 'wifi',
      'cable tv': 'cableTV',
      'cabletv': 'cableTV',
      'laundry': 'laundry',
      'storage': 'storage',
      'playground': 'playground',
      'spa': 'spa',
      'sauna': 'sauna',
      'concierge': 'concierge',
      'concierge service': 'conciergeService',
      'doorman': 'doorman',
      'rooftop': 'rooftop',
      'sea view': 'seaView',
      'seaview': 'seaView',
      'city view': 'cityView',
      'cityview': 'cityView',
      'mountain view': 'mountainView',
      'mountainview': 'mountainView',
      'marina view': 'marinaView',
      'marinaview': 'marinaView',
      'fireplace': 'fireplace',
      'pets allowed': 'petsAllowed',
      'petsallowed': 'petsAllowed',
      'furnished': 'furnished',
      'unfurnished': 'unfurnished',
      'maid room': 'maidRoom',
      'maidroom': 'maidRoom',
      'study room': 'studyRoom',
      'studyroom': 'studyRoom',
      'private pool': 'privatePool',
      'privatepool': 'privatePool',
      'jacuzzi': 'jacuzzi',
      'bbq area': 'bbqArea',
      'bbqarea': 'bbqArea',
      'tennis': 'tennis',
      'tennis court': 'tennis',
      'basketball': 'basketball',
      'basketball court': 'basketball',
      'jogging track': 'joggingTrack',
      'joggingtrack': 'joggingTrack',
      'kids pool': 'kidsPool',
      'kidspool': 'kidsPool',
      'kids area': 'kidsArea',
      'kidsarea': 'kidsArea',
      'cinema': 'cinema',
      'restaurant': 'restaurant',
      'cafe': 'cafe',
      'supermarket': 'supermarket',
      'pharmacy': 'pharmacy',
      'mosque': 'mosque',
      'school': 'school',
      'hospital': 'hospital'
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
    const icons: Record<string, any> = {
      School: School,
      ShoppingBag: ShoppingBag,
      UtensilsCrossed: UtensilsCrossed,
      Hospital: Hospital,
      Trees: Trees,
      Waves: Waves,
      Train: Train,
      Plane: Plane,
      Church: Church,
      Dumbbell: Dumbbell,
      Pill: Pill,
      Landmark: Landmark,
      Store: Store,
      Fuel: Fuel,
      ShieldCheck: ShieldCheck,
      Coffee: Coffee,
      GraduationCap: GraduationCap,
      ParkingCircle: ParkingCircle,
      Heart: Heart,
      Building2: Building2,
      Milestone: Milestone
    };
    return icons[iconName] || Building2;
  };
  const getAmenityIcon = (amenityName: string) => {
    const icons: Record<string, any> = {
      'Swimming Pool': Waves,
      'Gym': Dumbbell,
      '24/7 Security': ShieldCheck,
      'Parking': ParkingCircle,
      'Concierge Service': Coffee,
      'Marina View': Waves,
      'Garden': Trees,
      'Playground': Baby,
      'Pool': Waves,
      'Spa': Sparkles,
      'Sauna': Flame,
      'Kids Area': Baby,
      'BBQ Area': UtensilsCrossed,
      'Cinema': Film
    };
    return icons[amenityName] || Sparkles;
  };
  
  // Translate nearby place names
  const getTranslatedPlaceName = (name: string) => {
    const keyMap: Record<string, string> = {
      'liv hospital': 'livHospital',
      'belgard forest': 'belgardForest',
      'belgrad forest': 'belgradForest',
      'tem highway': 'temHighway',
      'metro': 'metro',
      'metro station': 'metroStation',
      'istinye university': 'istinyeUniversity',
      'vadi istanbul mall': 'vadiIstanbulMall',
      'airport': 'airport',
      'istanbul airport': 'istanbulAirport',
      'bus stop': 'busStop',
      'schools': 'schools',
      'hospitals': 'hospitals',
      'grocery stores': 'groceryStores',
      'shopping mall': 'shoppingMall',
      'beach': 'beach',
      'park': 'park',
      'mosque': 'mosque',
      'restaurant': 'restaurant',
      'gym': 'gym',
      'pharmacy': 'pharmacy',
      'bank': 'bank',
      'atm': 'atm',
      'gas station': 'gasStation',
      'highway': 'highway',
      'e80': 'e80',
      'university': 'university',
      'vialand theme park': 'vialandThemePark',
      'taksim square': 'taksimSquare',
      'grand bazaar': 'grandBazaar',
      'eyupsultan mosque': 'eyupsultanMosque',
      'e5 and tem highway': 'e5AndTemHighway',
      'golden horn': 'goldenHorn',
      'bosphorus': 'bosphorus',
      'old city': 'oldCity',
      'galata tower': 'galataTower',
      'sultanahmet mosque': 'sultanahmetMosque',
      'topkapi palace': 'topkapiPalace',
      'hagia sophia': 'hagiaSophia',
      'dolmabahce palace': 'dolmabahcePalace',
      'spice market': 'spiceMarket',
      'istiklal street': 'istiklalStreet'
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
  
  // Translate nearby place distances
  const getTranslatedDistance = (distance: string) => {
    const keyMap: Record<string, string> = {
      'immediate access': 'immediateAccess',
      'direct private access': 'directPrivateAccess',
      'connectivity': 'connectivity',
      'connecivity': 'connectivity', // Handle typo
      'walking distance': 'walkingDistance',
      'nearby': 'nearby',
      'easy access': 'easyAccess'
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
  const translatedTitle = getTranslatedContent(property, 'title', i18n.language);
  const translatedDesc = getTranslatedContent(property, 'description', i18n.language) || `${translatedTitle} - Luxury property in ${property.location}. ${property.bedrooms ? property.bedrooms + ' bedrooms, ' : ''}${property.bathrooms ? property.bathrooms + ' bathrooms. ' : ''}Price: $${property.price.toLocaleString()}.`;
  return <div className="min-h-screen">
      <SEOHead
        title={translatedTitle}
        description={translatedDesc}
        path={`/property/${property.slug}`}
        ogImage={mainImage}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "RealEstateListing",
          "name": translatedTitle,
          "description": translatedDesc,
          "url": `https://voi-home.com/property/${property.slug}`,
          "image": mainImage,
          "price": property.price,
          "priceCurrency": "USD",
          ...(property.location && { "address": { "@type": "PostalAddress", "addressLocality": property.location } }),
        }}
      />
      <Header />
      {/* Hero Section */}
      

      <main className="pt-32 pb-12 bg-background">
        <section className="py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                {/* Image Gallery - Swipable Carousel */}
                <Carousel className="w-full mb-4" setApi={setCarouselApi}>
                  <CarouselContent>
                    {allImages.map((img, idx) => (
                      <CarouselItem key={idx}>
                        <div 
                          className={`relative ${isMobile ? 'h-[400px]' : 'h-[500px]'} rounded-lg overflow-hidden cursor-pointer group`}
                          onClick={() => openLightbox(idx)}
                        >
                          <OptimizedImage 
                            src={img} 
                            alt={`${property.title} ${idx + 1}`} 
                            priority={idx === 0}
                            className="group-hover:scale-105 transition-transform duration-300"
                            containerClassName="w-full h-full"
                          />
                          {idx === 0 && (
                            <Badge className="absolute top-4 left-4 bg-gold text-primary">
                              {statusText}
                            </Badge>
                          )}
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 flex items-center justify-center">
                            <Maximize className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white h-12 w-12" />
                          </div>
                          {/* Image Counter */}
                          <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded-full text-sm font-medium">
                            {idx + 1} / {allImages.length}
                          </div>
                        </div>
                      </CarouselItem>
                    ))}
                  </CarouselContent>
                  <CarouselPrevious className="left-2" />
                  <CarouselNext className="right-2" />
                </Carousel>

                {/* Thumbnail Gallery */}
                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2 mb-6 scrollbar-thin scrollbar-thumb-gold/50 scrollbar-track-transparent">
                    {allImages.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => goToSlide(idx)}
                        className={`relative flex-shrink-0 w-20 h-16 rounded-md overflow-hidden transition-all duration-200 ${
                          currentSlide === idx 
                            ? 'ring-2 ring-gold ring-offset-2 ring-offset-background' 
                            : 'opacity-70 hover:opacity-100'
                        }`}
                      >
                        <img 
                          src={img} 
                          alt={`Thumbnail ${idx + 1}`}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      </button>
                    ))}
                  </div>
                )}

                {/* Image Lightbox */}
                <Dialog open={selectedImageIndex !== null} onOpenChange={open => !open && closeLightbox()}>
                  <DialogContent className="max-w-6xl w-[90vw] max-h-[85vh] p-0 bg-black/95 border-none rounded-lg overflow-hidden">
                    <div className="relative w-full h-full flex items-center justify-center p-8">
                      {/* Close Button */}
                      <button onClick={closeLightbox} className="absolute top-4 right-4 z-50 p-3 bg-black/60 hover:bg-black/80 rounded-full transition-colors">
                        <X className="h-6 w-6 text-white" />
                      </button>

                      {selectedImageIndex !== null && (
                        <LightboxCarousel
                          images={allImages}
                          startIndex={selectedImageIndex}
                          title={property.title}
                        />
                      )}
                    </div>
                  </DialogContent>
                </Dialog>


                {/* Property Title, Description and Location Section */}
                <div className="bg-background border border-border rounded-[20px] py-4 sm:py-8 px-4 sm:px-6 mb-8">
                  <div className="flex flex-col lg:flex-row justify-between gap-6">
                    {/* Left Side - Property ID, Title and Description */}
                    <div className="flex-1">
                      {property.property_id && <h2 className="text-2xl sm:text-4xl font-bold text-foreground mb-2">
                          {property.property_id}
                        </h2>}
                      <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-4">
                        {getTranslatedContent(property, 'title', i18n.language)}
                      </h3>
                      {property.description && <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                          {getTranslatedContent(property, 'description', i18n.language)}
                        </p>}
                    </div>
                    
                    {/* Right Side - Location */}
                    <div className="flex-col lg:min-w-[180px] gap-3 flex items-center justify-center pt-4 lg:pt-0 border-t lg:border-t-0 border-border">
                      <h3 className="text-2xl sm:text-3xl font-bold text-foreground">{t('propertyDetail.location')}</h3>
                      <div className="h-px w-16 bg-gold"></div>
                      <p className="text-lg sm:text-xl font-semibold text-foreground text-center">
                        {property.district ? property.district : property.location}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Property Overview Section */}
                <RevealOnScroll><PropertyOverview property={property} /></RevealOnScroll>

                {/* Area details Section */}
                <RevealOnScroll><AreaDetails property={property} /></RevealOnScroll>

                {/* Investment Returns Section - The Numbers That Matter */}
                <RevealOnScroll><InvestmentReturns property={property} /></RevealOnScroll>

              {/* Area Details */}
              {(property.completion_date || property.plot_ratio || property.clear_height) && <RevealOnScroll><div className="mb-12 bg-card border border-border rounded-[20px] p-4 sm:p-8">
                    <h3 className={`text-2xl sm:text-3xl tracking-[-0.5px] mb-6 text-foreground ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{t('propertyDetail.areaDetailsSection')}</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                      {property.completion_date && <div>
                          <p className="text-sm text-muted-foreground mb-1">{t('propertyDetail.completion')}</p>
                          <p className="font-semibold text-card-foreground">{property.completion_date}</p>
                        </div>}
                      {property.plot_ratio && <div>
                          <p className="text-sm text-muted-foreground mb-1">{t('propertyDetail.plotRatio')}</p>
                          <p className="font-semibold text-card-foreground">{property.plot_ratio}</p>
                        </div>}
                      {property.clear_height && <div>
                          <p className="text-sm text-muted-foreground mb-1">{t('propertyDetail.clearHeight')}</p>
                          <p className="font-semibold text-card-foreground">{property.clear_height}</p>
                        </div>}
                    </div>
                  </div></RevealOnScroll>}


                {/* Payment Plans */}
                {property.payment_plans && property.payment_plans.length > 0 && <RevealOnScroll><div className="mb-12 bg-card border border-border rounded-[20px] p-4 sm:p-8">
                    <h3 className={`text-2xl sm:text-3xl tracking-[-0.5px] mb-6 text-foreground ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{t('propertyDetail.apartmentThatMatters')}</h3>
                    <div className="bg-primary/90 rounded-lg overflow-hidden">
                      <div className="grid grid-cols-2 gap-px bg-background/10">
                        <div className="bg-primary/80 p-4">
                          <p className="text-sm text-primary-foreground/80">{t('propertyDetail.item')}</p>
                        </div>
                        <div className="bg-primary/80 p-4">
                          <p className="text-sm text-primary-foreground/80">{t('propertyDetail.price')}</p>
                        </div>
                        {property.payment_plans.map((plan, idx) => <>
                            <div key={`period-${idx}`} className="bg-primary/60 p-4">
                              <p className="text-primary-foreground font-medium">{plan.period}</p>
                            </div>
                            <div key={`amount-${idx}`} className="bg-primary/60 p-4">
                              <p className="text-primary-foreground font-semibold">${plan.amount.toLocaleString()}</p>
                            </div>
                          </>)}
                      </div>
                    </div>
                  </div></RevealOnScroll>}

                {/* Apartment Types and Prices Section */}
                {Array.isArray(property.floor_plans) && property.floor_plans.length > 0}

                {property.long_description && <RevealOnScroll><div className="mb-12 bg-card border border-border rounded-[20px] p-4 sm:p-8">
                  <h2 className={`text-2xl sm:text-3xl tracking-[-0.5px] mb-6 text-foreground ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{t('propertyDetail.propertyInformation')}</h2>
                  <div className="text-muted-foreground leading-relaxed prose prose-sm max-w-none [&>h1]:text-foreground [&>h2]:text-foreground [&>h3]:text-foreground [&>p]:text-muted-foreground [&>ul]:text-muted-foreground [&>ol]:text-muted-foreground" dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(getTranslatedContent(property, 'long_description', i18n.language))
                }} />
                </div></RevealOnScroll>}

                <RevealOnScroll><div className="mb-12 bg-card border border-border rounded-[20px] p-4 sm:p-8">
                  <h2 className={`text-2xl sm:text-3xl tracking-[-0.5px] mb-6 text-foreground ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{t('propertyDetail.amenities')}</h2>
                  <div className="flex flex-wrap gap-2.5">
                    {features.map((feature, index) => {
                    const AmenityIcon = getAmenityIcon(feature);
                    return <div key={index} className="flex items-center gap-2 pl-3 pr-4 py-2.5 text-primary-foreground rounded-full bg-primary">
                          <AmenityIcon className="h-4 w-4 text-gold flex-shrink-0" />
                          <span className="text-sm">{getTranslatedAmenity(feature)}</span>
                        </div>;
                  })}
                  </div>
                </div></RevealOnScroll>

                {/* Location - Nearby Places Grid */}
                {property.nearby_places && property.nearby_places.length > 0 && <RevealOnScroll><div className="mb-12 bg-card border border-border rounded-[20px] p-4 sm:p-8">
                    <h2 className={`text-2xl sm:text-3xl tracking-[-0.5px] mb-6 text-foreground ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{t('propertyDetail.nearbyPlaces')}</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-4">
                      {property.nearby_places.map((place, idx) => {
                    const Icon = getIconForPlace(place.icon);
                    return <div key={idx} className="flex flex-col items-center justify-center p-8 text-primary-foreground rounded-[20px] text-center min-h-[160px] bg-primary">
                            <Icon className="h-12 w-12 mb-4 text-gold" strokeWidth={1.5} />
                            <p className="font-semibold text-lg mb-2">{getTranslatedPlaceName(place.name)}</p>
                            <p className="text-sm text-primary-foreground/90">{getTranslatedDistance(place.distance)}</p>
                          </div>;
                  })}
                    </div>
                  </div></RevealOnScroll>}

                {/* Why This Property */}
                {property.why_this_property && <RevealOnScroll><section className="bg-card border border-border rounded-[20px] p-4 sm:p-8 mb-12">
                    <h2 className={`text-2xl sm:text-3xl tracking-[-0.5px] mb-6 text-foreground ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{t('propertyDetail.whyThisProperty')}</h2>
                    <div 
                      className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
                      dangerouslySetInnerHTML={{ 
                        __html: DOMPurify.sanitize(getTranslatedContent(property, 'why_this_property', i18n.language)) 
                      }}
                    />
                  </section></RevealOnScroll>}

                {/* Floor Plans */}
                {property.floor_plans && property.floor_plans.length > 0 && <RevealOnScroll><div className="mb-12 bg-card border border-border rounded-[20px] p-4 sm:p-8">
                    <h2 className={`text-2xl sm:text-3xl tracking-[-0.5px] mb-6 text-foreground ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{t('propertyDetail.apartmentTypesAndPrices')}</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {property.floor_plans.map((plan, idx) => {
                        // Format price display with $ sign and range
                        const priceMin = plan.subtitle;
                        const priceMax = (plan as { price_max?: string }).price_max;
                        const priceDisplay = priceMax ? `$${priceMin} - $${priceMax}` : `$${priceMin}`;
                        
                        // Format area display with m² and range
                        const areaMin = plan.area;
                        const areaMax = (plan as { area_max?: string }).area_max;
                        const areaDisplay = areaMax ? `${areaMin} - ${areaMax} m²` : `${areaMin} m²`;
                        
                        return (
                          <div 
                            key={idx} 
                            className="bg-primary/90 rounded-lg overflow-hidden cursor-pointer hover:ring-2 hover:ring-gold transition-all group"
                            onClick={() => setSelectedFloorPlan({ image_url: plan.image_url, title: plan.title })}
                          >
                            <div className="relative overflow-hidden h-48">
                              <OptimizedImage 
                                src={plan.image_url} 
                                alt={plan.title} 
                                className="transition-transform duration-300 group-hover:scale-105"
                                containerClassName="w-full h-full"
                              />
                              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                                <Maximize className="h-8 w-8 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                              </div>
                            </div>
                            <div className="p-4 text-primary-foreground">
                              <p className="font-semibold text-lg">{plan.title}</p>
                              <p className="text-sm text-primary-foreground/80">{priceDisplay}</p>
                              <p className="text-sm mt-2">{areaDisplay}</p>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div></RevealOnScroll>}

                {/* Floor Plan Popup */}
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
                        <img
                          src={selectedFloorPlan.image_url}
                          alt={selectedFloorPlan.title}
                          className="w-full max-h-[80vh] object-contain rounded-lg"
                        />
                      )}
                    </div>
                  </DialogContent>
                </Dialog>

                {/* Map Section */}
                <RevealOnScroll><div className="mb-12 border border-border rounded-[20px] p-4 sm:p-8 bg-primary">
                  <h2 className={`text-2xl sm:text-3xl tracking-[-0.5px] mb-6 text-primary-foreground ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{t('propertyDetail.map')}</h2>
                  <div className="bg-primary/90 rounded-lg overflow-hidden">
                    <PropertyMap mapEmbedUrl={property.map_embed_url || undefined} mapLinkUrl={property.map_link_url || undefined} location={property.location} region={property.region} latitude={property.latitude} longitude={property.longitude} />
                  </div>
                </div></RevealOnScroll>

                {/* FAQ Section */}
                <RevealOnScroll>
                  <PropertyFAQ />
                </RevealOnScroll>
              </div>

              <div className="lg:col-span-1 order-first lg:order-last">
                <div className="lg:sticky lg:top-36 bg-muted/30 rounded-[20px] shadow-lg p-4 sm:p-8 mb-8 lg:mb-0">
                  <p className="text-sm text-muted-foreground mb-2">{t('propertyDetail.startingFrom')}</p>
                  <p className={`text-3xl sm:text-4xl mb-6 sm:mb-8 text-primary ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>${property.price.toLocaleString()}</p>

                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{t('propertyDetail.propertyType')}</span>
                      <span className="font-medium text-card-foreground">{getTranslatedPropertyType(property.property_type)}</span>
                    </div>
                    
                    {property.benefit && <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{t('propertyDetail.benefit')}</span>
                        <span className="font-medium text-card-foreground">
                          {(() => {
                        // Get only the first benefit
                        const firstBenefit = property.benefit.split(',')[0].trim();
                        // Check if database has language-specific translation
                        const langField = i18n.language === 'ar' ? 'benefit_ar' : null;
                        const dbTranslation = langField ? (property as any)[langField] : null;
                        if (dbTranslation && dbTranslation.trim() !== '') {
                          // Get only the first benefit from translated field too
                          return dbTranslation.split(',')[0].trim();
                        }
                        // Fallback to i18n translations for standard benefit values
                        return getTranslatedBenefit(firstBenefit);
                      })()}
                        </span>
                      </div>}
                    
                    {property.delivery_date && <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{t('propertyDetail.deliveryDate')}</span>
                        <span className="font-medium text-card-foreground">{property.delivery_date}</span>
                      </div>}
                    
                    {property.title_deed && <div className="flex justify-between items-center text-sm">
                        <span className="text-muted-foreground">{t('propertyDetail.titleDeed')}</span>
                        <span className="font-medium text-card-foreground">{getTranslatedTitleDeed(property.title_deed)}</span>
                      </div>}
                    
                    <div className="flex justify-between items-center text-sm">
                      <span className="text-muted-foreground">{t('propertyDetail.status')}</span>
                      <Badge className="bg-gold text-primary">{property.construction_status || statusText}</Badge>
                    </div>
                  </div>

                  <Button asChild className="w-full bg-gold hover:bg-gold/90 text-primary font-semibold py-6">
                    <a href={`https://wa.me/905527971000?text=${encodeURIComponent(`${t('propertyDetail.whatsappInquiry', { title: getTranslatedContent(property, 'title', i18n.language) })}\n${window.location.href}`)}`} target="_blank" rel="noopener noreferrer">
                      {t('propertyDetail.wantToKnowMore')}
                    </a>
                  </Button>

                  {suggested.length > 0 && (
                    <div className="mt-8 pt-6 border-t border-border">
                      <h3 className={`text-lg mb-4 text-primary ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                        {t('propertyDetail.suggestedProperties')}
                      </h3>
                      <ul className="space-y-4">
                        {suggested.map((p) => {
                          const title = getTranslatedContent(p, 'title', i18n.language);
                          const img = Array.isArray(p.images) && p.images.length > 0 ? p.images[0] : apartmentImage;
                          return (
                            <li key={p.id}>
                              <Link
                                to={`/property/${p.slug}`}
                                className="flex gap-3 group items-start"
                              >
                                <img
                                  src={img}
                                  alt={title}
                                  loading="lazy"
                                  className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                                />
                                <div className="min-w-0">
                                  <p className="text-sm text-foreground line-clamp-2 group-hover:text-gold transition-smooth">
                                    {title}
                                  </p>
                                  {(() => {
                                    const desc = getTranslatedContent(p, 'description', i18n.language);
                                    return desc ? (
                                      <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                                        {desc}
                                      </p>
                                    ) : null;
                                  })()}
                                  {typeof p.price === 'number' && (
                                    <p className="text-xs text-muted-foreground mt-1">
                                      ${p.price.toLocaleString()}
                                    </p>
                                  )}
                                </div>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
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
      <Carousel
        className="w-full"
        opts={{ startIndex, loop: true }}
        setApi={setApi}
      >
        <CarouselContent>
          {images.map((img, idx) => (
            <CarouselItem key={idx} className="flex items-center justify-center">
              <img
                src={img}
                alt={`${title} - Image ${idx + 1}`}
                className="max-h-[70vh] max-w-full object-contain rounded-lg select-none"
                draggable={false}
              />
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