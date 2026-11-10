import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import PropertyCardMinimal from "@/components/property/PropertyCardMinimal";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Button } from "@/components/ui/button";

const GENERAL_SANS = "'General Sans', -apple-system, sans-serif";

// Showcase of the first few properties, all side by side in a single row.
// Desktop shows them as a grid; on smaller screens the row scrolls
// horizontally (snap) so they still sit in one line instead of stacking.
const PropertyScrollShowcase = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { properties, loading } = useProperties();
  const featured = properties.slice(0, 3);

  if (loading || featured.length === 0) return null;

  return (
    <section className="bg-background py-14 md:py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-12 max-w-xl mx-auto" style={{ fontFamily: GENERAL_SANS }}>
          <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">
            {t("hero.eyebrow")}
          </div>
          <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}>
            {t("home.showcase.title")}
          </h2>
        </div>

        <div className="-mx-4 px-4 flex gap-5 overflow-x-auto snap-x snap-mandatory pb-2 md:mx-0 md:px-0 md:grid md:grid-cols-3 md:gap-8 md:overflow-visible">
          {featured.map((property, i) => (
            <RevealOnScroll
              key={property.id}
              delay={i * 120}
              className="snap-start shrink-0 w-[78%] sm:w-[45%] md:w-auto"
            >
              <PropertyCardMinimal property={property} />
            </RevealOnScroll>
          ))}
        </div>

        <div className="text-center mt-8 md:mt-10">
          <Link to="/properties">
            <Button className="rounded-full bg-foreground hover:bg-foreground/85 text-background px-7">
              {t("hero.exploreProperties")}
              <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PropertyScrollShowcase;
