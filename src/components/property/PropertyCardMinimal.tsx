import { Link } from "react-router-dom";
import { MapPin, ArrowUpRight } from "lucide-react";
import { Property } from "@/types/property";
import apartmentImage from "@/assets/apartment-modern.jpg";
import { useTranslation } from "react-i18next";
import { getTranslatedContent } from "@/lib/i18n-content";
import OptimizedImage from "@/components/OptimizedImage";

interface PropertyCardMinimalProps {
  property: Property;
  animationDelay?: number;
}

const propertyTypeTranslations: Record<string, Record<string, string>> = {
  en: {
    apartment: "Apartment", villa: "Villa", penthouse: "Penthouse",
    commercial: "Commercial", studio: "Studio", townhouse: "Townhouse",
    land: "Land", office: "Office", "villas and apartments": "Villas and Apartments",
  },
  ar: {
    apartment: "شقة", villa: "فيلا", penthouse: "بنتهاوس",
    commercial: "تجاري", studio: "استوديو", townhouse: "تاون هاوس",
    land: "أرض", office: "مكتب", "villas and apartments": "فلل وشقق",
  },
  ru: {
    apartment: "Квартира", villa: "Вилла", penthouse: "Пентхаус",
    commercial: "Коммерческая", studio: "Студия", townhouse: "Таунхаус",
    land: "Земля", office: "Офис", "villas and apartments": "Виллы и квартиры",
  },
};

const constructionStatusTranslations: Record<string, Record<string, string>> = {
  en: {
    ready: "Ready", "ready to move": "Ready", "under construction": "Under Construction",
    "under_construction": "Under Construction", "off plan": "Off Plan", "off_plan": "Off Plan",
  },
  ar: {
    ready: "جاهز", "ready to move": "جاهز", "under construction": "قيد الإنشاء",
    "under_construction": "قيد الإنشاء", "off plan": "على الخارطة", "off_plan": "على الخارطة",
  },
  ru: {
    ready: "Готово", "ready to move": "Готово", "under construction": "Строится",
    "under_construction": "Строится", "off plan": "На стадии проекта", "off_plan": "На стадии проекта",
  },
};

const locationTranslations: Record<string, Record<string, string>> = {
  en: {
    turkey: "Turkey", "business bay": "Business Bay",
    "arabian ranches": "Arabian Ranches", jlt: "JLT",
    "palm jumeirah": "Palm Jumeirah",
    istanbul: "Istanbul", bodrum: "Bodrum",
  },
  ar: {
    turkey: "تركيا", "business bay": "بزنس باي",
    "arabian ranches": "المرابع العربية", jlt: "أبراج بحيرات جميرا",
    "palm jumeirah": "نخلة جميرا",
    istanbul: "إسطنبول", bodrum: "بودروم",
  },
  ru: {
    turkey: "Турция", "business bay": "Бизнес Бэй",
    "arabian ranches": "Арабиан Ранчес", jlt: "JLT",
    "palm jumeirah": "Пальма Джумейра",
    istanbul: "Стамбул", bodrum: "Бодрум",
  },
};

// Editorial, minimal alternative to PropertyCard - no colored badges on the
// image, no heavy shadowed card shell. Two quiet pills on the photo (type +
// construction status), then a plain typographic caption below it
// (title/price, location/specs), matching the rest of the site's
// serif-heading, generous-whitespace language instead of a generic
// real-estate-template look.
const PropertyCardMinimal = ({ property, animationDelay = 0 }: PropertyCardMinimalProps) => {
  const { i18n } = useTranslation();

  const getTranslatedPropertyType = (type: string) => {
    const lang = i18n.language;
    const translateOne = (raw: string) => {
      const key = raw.trim().toLowerCase();
      if (!key) return "";
      return propertyTypeTranslations[lang]?.[key] || propertyTypeTranslations["en"]?.[key] || raw.trim();
    };
    return type.split(",").map(translateOne).filter(Boolean).join(", ");
  };

  const getTranslatedLocation = (location: string) => {
    const lang = i18n.language;
    const key = location.toLowerCase();
    return locationTranslations[lang]?.[key] || locationTranslations["en"]?.[key] || location;
  };

  const getTranslatedConstructionStatus = (status: string) => {
    const lang = i18n.language;
    const key = status.toLowerCase().replace(/-/g, " ");
    return constructionStatusTranslations[lang]?.[key] || constructionStatusTranslations["en"]?.[key] || status;
  };

  const mainImage = property.images && property.images[0] ? property.images[0] : apartmentImage;
  const isRTL = i18n.language === "ar";

  return (
    <Link
      to={`/property/${property.slug}`}
      className="group block animate-fade-in"
      style={{ animationDelay: `${animationDelay}s` }}
    >
      <div className="relative overflow-hidden rounded-2xl aspect-[4/5] bg-muted mb-5">
        <OptimizedImage
          src={mainImage}
          alt={property.title}
          className="transition-transform duration-700 group-hover:scale-105"
          containerClassName="w-full h-full"
        />

        {property.property_type && (
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-medium uppercase tracking-[1px]">
            {getTranslatedPropertyType(property.property_type)}
          </div>
        )}

        {property.construction_status && (
          <div className="absolute top-4 right-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-medium uppercase tracking-[1px]">
            {getTranslatedConstructionStatus(property.construction_status)}
          </div>
        )}

        <div className="absolute bottom-4 right-4 h-9 w-9 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300">
          <ArrowUpRight className="h-4 w-4 text-primary" />
        </div>
      </div>

      <div className={`flex items-start justify-between gap-4 ${isRTL ? "font-arabic" : ""}`}>
        <div className="min-w-0">
          <h3 className="font-serif text-lg md:text-xl text-foreground leading-tight line-clamp-1 group-hover:text-gold transition-colors">
            {getTranslatedContent(property, "title", i18n.language)}
          </h3>
          <div className="flex items-center gap-1.5 mt-2 text-sm text-muted-foreground">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="line-clamp-1">
              {getTranslatedLocation(property.district || property.location)}
            </span>
          </div>
        </div>
        <div className="text-right shrink-0">
          <div className="font-serif text-lg md:text-xl text-foreground">${property.price.toLocaleString()}</div>
          {(property.bedrooms || property.bathrooms) && (
            <div className="text-sm text-muted-foreground mt-2">
              {[
                property.bedrooms ? `${property.bedrooms} Bed` : null,
                property.bathrooms ? `${property.bathrooms} Bath` : null,
              ]
                .filter(Boolean)
                .join(" · ")}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default PropertyCardMinimal;
