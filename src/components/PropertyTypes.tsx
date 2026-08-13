import { useTranslation } from "react-i18next";
import RevealOnScroll from "@/components/RevealOnScroll";
import PillPicker from "@/components/editorial/PillPicker";

const PropertyTypes = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const types = [
    { label: t("propertyByRequirement.citizenshipEligible.title"), benefit: "Citizenship Eligible" },
    { label: t("propertyByRequirement.highROI.title"), benefit: "High ROI" },
    { label: t("propertyByRequirement.rentalYields.title"), benefit: "Rental Yields" },
    { label: t("propertyByRequirement.lifestyle.title"), benefit: "Lifestyle" },
  ];

  return (
    <section className="py-16 md:py-24 px-6">
      <RevealOnScroll className="max-w-xl mx-auto text-center mb-10">
        <h2
          className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-4 text-foreground ${
            isRTL ? "font-arabic" : "font-serif"
          }`}
        >
          {t("propertyByRequirement.title")}
        </h2>
        <p className="text-base text-muted-foreground leading-[1.7]">{t("propertyByRequirement.subtitle")}</p>
      </RevealOnScroll>
      <RevealOnScroll delay={100} className="max-w-3xl mx-auto">
        <PillPicker
          options={types.map((type) => ({
            label: type.label,
            to: `/properties?benefit=${encodeURIComponent(type.benefit)}`,
          }))}
        />
      </RevealOnScroll>
    </section>
  );
};

export default PropertyTypes;
