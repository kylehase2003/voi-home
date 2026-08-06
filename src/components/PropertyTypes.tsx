import { Shield, TrendingUp, Percent, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

const PropertyTypes = () => {
  const { t, i18n } = useTranslation();
  
  const types = [
    {
      icon: Shield,
      title: t("propertyByRequirement.citizenshipEligible.title"),
      subtitle: t("propertyByRequirement.citizenshipEligible.subtitle"),
      description: t("propertyByRequirement.citizenshipEligible.description"),
      benefit: "Citizenship Eligible",
    },
    {
      icon: TrendingUp,
      title: t("propertyByRequirement.highROI.title"),
      subtitle: t("propertyByRequirement.highROI.subtitle"),
      description: t("propertyByRequirement.highROI.description"),
      benefit: "High ROI",
    },
    {
      icon: Percent,
      title: t("propertyByRequirement.rentalYields.title"),
      subtitle: t("propertyByRequirement.rentalYields.subtitle"),
      description: t("propertyByRequirement.rentalYields.description"),
      benefit: "Rental Yields",
    },
    {
      icon: Heart,
      title: t("propertyByRequirement.lifestyle.title"),
      subtitle: t("propertyByRequirement.lifestyle.subtitle"),
      description: t("propertyByRequirement.lifestyle.description"),
      benefit: "Lifestyle",
    },
  ];

  return (
    <section className="py-8 md:py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className={`text-3xl md:text-5xl mb-3 md:mb-4 text-primary ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{t("propertyByRequirement.title")}</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">{t("propertyByRequirement.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8 items-stretch">
          {types.map((type, index) => (
            <Link key={index} to={`/properties?benefit=${encodeURIComponent(type.benefit)}`} onClick={() => window.scrollTo({ top: 0, behavior: "auto" })} className="h-full">
              <Card
                className="group hover:shadow-luxury transition-all duration-500 cursor-pointer border-2 hover:border-gold bg-card animate-fade-in-scale hover:scale-110 hover:-translate-y-3 relative overflow-hidden h-full"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <CardContent className="p-4 md:p-8 text-center relative z-10 h-full flex flex-col">
                  <div className="w-14 h-14 md:w-20 md:h-20 mx-auto mb-4 md:mb-6 rounded-full bg-gold/10 flex items-center justify-center group-hover:bg-gold/20 transition-all duration-500 group-hover:rotate-12 group-hover:scale-110">
                    <type.icon className="h-7 w-7 md:h-10 md:w-10 text-gold group-hover:scale-125 transition-transform duration-300" />
                  </div>
                  <h3 className={`text-lg md:text-2xl mb-2 text-card-foreground group-hover:text-gold transition-colors duration-300 ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                    {type.title}
                  </h3>
                  <p className="text-gold text-xs md:text-sm mb-2 font-medium group-hover:scale-110 transition-transform duration-300 inline-block">
                    {type.subtitle}
                  </p>
                  <p className="text-muted-foreground text-xs md:text-sm mt-auto">{type.description}</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PropertyTypes;
