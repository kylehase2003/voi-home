import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building2 } from "lucide-react";
import { Property } from "@/types/property";
import apartmentImage from "@/assets/apartment-modern.jpg";
import { useTranslation } from "react-i18next";
import { getTranslatedContent } from "@/lib/i18n-content";
import OptimizedImage from "@/components/OptimizedImage";
interface PropertyCardProps {
  property: Property;
  featured?: boolean;
  animationDelay?: number;
  isDubaiTheme?: boolean;
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
const locationTranslations: Record<string, Record<string, string>> = {
  en: {
    dubai: "Dubai",
    turkey: "Turkey",
    "business bay": "Business Bay",
    "dubai marina": "Dubai Marina",
    "arabian ranches": "Arabian Ranches",
    jlt: "JLT",
    "downtown dubai": "Downtown Dubai",
    "palm jumeirah": "Palm Jumeirah",
    istanbul: "Istanbul",
    bodrum: "Bodrum",
  },
  ar: {
    dubai: "دبي",
    turkey: "تركيا",
    "business bay": "بزنس باي",
    "dubai marina": "دبي مارينا",
    "arabian ranches": "المرابع العربية",
    jlt: "أبراج بحيرات جميرا",
    "downtown dubai": "وسط دبي",
    "palm jumeirah": "نخلة جميرا",
    istanbul: "إسطنبول",
    bodrum: "بودروم",
  },
  ru: {
    dubai: "Дубай",
    turkey: "Турция",
    "business bay": "Бизнес Бэй",
    "dubai marina": "Дубай Марина",
    "arabian ranches": "Арабиан Ранчес",
    jlt: "JLT",
    "downtown dubai": "Даунтаун Дубай",
    "palm jumeirah": "Пальма Джумейра",
    istanbul: "Стамбул",
    bodrum: "Бодрум",
  },
};
const statusTranslations: Record<string, Record<string, string>> = {
  en: {
    available: "Available",
    sold: "Sold",
    reserved: "Reserved",
    "under offer": "Under Offer",
    ready: "Ready",
    "under construction": "Under Construction",
    "under_construction": "Under Construction",
    rented: "Rented",
  },
  ar: {
    available: "متاح",
    sold: "مباع",
    reserved: "محجوز",
    "under offer": "تحت العرض",
    ready: "جاهز",
    "under construction": "قيد الإنشاء",
    "under_construction": "قيد الإنشاء",
    rented: "مؤجر",
  },
  ru: {
    available: "Доступно",
    sold: "Продано",
    reserved: "Забронировано",
    "under offer": "На рассмотрении",
    ready: "Готово",
    "under construction": "Строится",
    "under_construction": "Строится",
    rented: "Сдано",
  },
};
const constructionStatusTranslations: Record<string, Record<string, string>> = {
  en: {
    ready: "Ready",
    "ready to move": "Ready to Move",
    "under construction": "Under Construction",
    "under_construction": "Under Construction",
    "off plan": "Off Plan",
    "off_plan": "Off Plan",
  },
  ar: {
    ready: "جاهز",
    "ready to move": "جاهز للسكن",
    "under construction": "قيد الإنشاء",
    "under_construction": "قيد الإنشاء",
    "off plan": "على الخارطة",
    "off_plan": "على الخارطة",
  },
  ru: {
    ready: "Готово",
    "ready to move": "Готово к заселению",
    "under construction": "Строится",
    "under_construction": "Строится",
    "off plan": "На стадии проекта",
    "off_plan": "На стадии проекта",
  },
};
export const PropertyCard = ({
  property,
  featured = false,
  animationDelay = 0,
  isDubaiTheme = false,
}: PropertyCardProps) => {
  const { i18n, t } = useTranslation();
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
  const getTranslatedStatus = (status: string) => {
    const lang = i18n.language;
    const key = status.toLowerCase().replace(/_/g, " ");
    return statusTranslations[lang]?.[key] || statusTranslations["en"]?.[key] || status.replace(/_/g, " ");
  };
  const getTranslatedConstructionStatus = (status: string) => {
    const lang = i18n.language;
    // Normalize the key: lowercase, replace both dashes and underscores with spaces, and keep underscore version
    const normalizedKey = status.toLowerCase().replace(/-/g, " ");
    const underscoreKey = status.toLowerCase();
    return constructionStatusTranslations[lang]?.[normalizedKey] || 
           constructionStatusTranslations[lang]?.[underscoreKey] ||
           constructionStatusTranslations["en"]?.[normalizedKey] || 
           constructionStatusTranslations["en"]?.[underscoreKey] ||
           status;
  };
  const mainImage = property.images && property.images[0] ? property.images[0] : apartmentImage;
  return (
    <Link to={`/property/${property.slug}`} className="h-full">
      <Card
        className={`group overflow-hidden hover:shadow-2xl transition-all duration-500 rounded-3xl h-full flex flex-col ${isDubaiTheme ? "bg-[hsl(0,0%,15%)] border-white/10" : "bg-card border-border/50"} ${featured ? "md:hover:-translate-y-2 animate-fade-in" : "md:hover:-translate-y-1"}`}
        style={
          featured
            ? {
                animationDelay: `${animationDelay}s`,
              }
            : undefined
        }
      >
        {/* Image with badges */}
        <div className={`relative ${featured ? "h-56 md:h-80" : "h-48 md:h-64"} overflow-hidden rounded-t-3xl`}>
          <OptimizedImage
            src={mainImage}
            alt={property.title}
            className="group-hover:scale-110 transition-all duration-700"
            containerClassName="w-full h-full"
          />

          {/* Property type badge - top left */}
          {property.property_type && (
            <div className="absolute top-2 left-2 md:top-4 md:left-4 max-w-[55%]">
              <Badge className="bg-gold text-primary hover:text-white px-2 py-1 md:px-4 md:py-2 text-[10px] md:text-sm rounded-lg shadow-lg transition-colors duration-300 line-clamp-1">
                {getTranslatedPropertyType(property.property_type)}
              </Badge>
            </div>
          )}

          {/* Price badge - top right */}
          <div className="absolute top-2 right-2 md:top-4 md:right-4">
            <Badge className="bg-olive text-white px-2 py-1 md:px-5 md:py-2 text-[11px] md:text-base rounded-lg shadow-lg">
              ${property.price.toLocaleString()}
            </Badge>
          </div>

          {/* Construction Status badge - bottom right */}
          {property.construction_status && (
            <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4">
              <Badge className="bg-[#941300] text-[#000000] font-bold px-2 py-1 md:px-4 md:py-2 text-[10px] md:text-sm rounded-lg shadow-lg">
                {getTranslatedConstructionStatus(property.construction_status)}
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-0 flex flex-col flex-1">
          {/* Installments */}
          {property.installments_count && (
            <div className={`border-b ${isDubaiTheme ? "border-white/10" : "border-border/30"}`}>
              <div className="px-3 md:px-5 py-2 md:py-[12px]">
                <p
                  className={`text-xs md:text-xl font-bold flex items-center justify-between transition-colors duration-500 ${isDubaiTheme ? "text-white" : "text-foreground"}`}
                >
                  <span className="font-normal text-[#a9abae]">{t("properties.installments")}:</span>
                  <span className="font-normal text-[#a9abae]">
                    {property.installments_count} {t("properties.month")}
                  </span>
                </p>
              </div>
            </div>
          )}

          {/* Title and description */}
          <div className="px-3 md:px-5 pt-3 md:pt-5 pb-2 md:pb-3 flex-1">
            <h3
              className={`text-base md:text-2xl font-bold mb-2 md:mb-3 group-hover:text-gold transition-colors duration-500 line-clamp-1 pb-1 ${i18n.language === "ar" ? "font-arabic" : ""} ${isDubaiTheme ? "text-white" : "text-foreground"}`}
            >
              {getTranslatedContent(property, "title", i18n.language)}
            </h3>

            {property.description && (
              <p
                className={`text-xs md:text-sm leading-relaxed line-clamp-2 md:line-clamp-3 mb-3 md:mb-4 transition-colors duration-500 ${isDubaiTheme ? "text-white/70" : "text-muted-foreground"}`}
              >
                {getTranslatedContent(property, "description", i18n.language)}
              </p>
            )}
          </div>

          {/* Footer - Location and Status */}
          <div
            className={`px-3 md:px-5 pb-3 md:pb-5 pt-2 flex items-center justify-between gap-2 text-xs md:text-sm border-t transition-colors duration-500 ${isDubaiTheme ? "text-white/80 border-white/10" : "text-muted-foreground border-border/30"}`}
          >
            <div className="flex items-center gap-1 md:gap-2 min-w-0">
              <MapPin className="h-3 w-3 md:h-4 md:w-4 shrink-0" />
              <span className="line-clamp-1">{property.district ? getTranslatedLocation(property.district) : getTranslatedLocation(property.location)}</span>
            </div>

            {property.status && <span className="capitalize whitespace-nowrap">• {getTranslatedStatus(property.status)}</span>}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};
