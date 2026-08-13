import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import PillPicker from "./PillPicker";

const MARKETS = [
  { label: "Istanbul", to: "/properties?country=turkiye&city=istanbul" },
  { label: "Bodrum", to: "/properties?country=turkiye&city=bodrum" },
  { label: "Dubai", to: "/properties?country=dubai" },
  { label: "Apartments", to: "/properties?property_type=Apartment" },
  { label: "Villas", to: "/properties?property_type=Villa" },
  { label: "Penthouses", to: "/properties?property_type=Penthouse" },
  { label: "Commercial", to: "/properties?property_type=Commercial" },
];

const MarketsPicker = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="py-20 md:py-28 px-6">
      <RevealOnScroll className="max-w-xl mx-auto text-center mb-12">
        <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">
          {t("hero.eyebrow")}
        </div>
        <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-4 text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}>
          {t("footer.propertyTypes")} &amp; {t("nav.properties")}
        </h2>
        <p className="text-base text-muted-foreground leading-[1.7]">{t("hero.subtitle")}</p>
      </RevealOnScroll>
      <RevealOnScroll delay={100} className="max-w-3xl mx-auto mb-10">
        <PillPicker options={MARKETS.map((m) => ({ label: m.label, to: m.to }))} />
      </RevealOnScroll>
      <RevealOnScroll delay={150} className="flex justify-center">
        <Link
          to="/properties"
          className="group inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 transition-colors"
        >
          {t("hero.exploreProperties")}
          <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </Link>
      </RevealOnScroll>
    </section>
  );
};

export default MarketsPicker;
