import { useTranslation } from "react-i18next";
import { Property } from "@/types/property";

interface AreaDetailsProps {
  property: Property;
}

const AreaDetails = ({ property }: AreaDetailsProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const hasData = property.area_population || property.area_sex_ratio_male || property.area_sex_ratio_female || property.area_class;
  if (!hasData) return null;

  return (
    <section className="py-8 md:py-10 border-t border-border">
      <h2 className={`text-xl md:text-2xl mb-6 text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}>
        {t("propertyDetail.areaDetails")}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border border-y border-border">
        <div className="text-center py-6 px-2">
          <p className="text-xs uppercase tracking-[1px] text-muted-foreground mb-2">{t("propertyDetail.population")}</p>
          <p className="text-2xl md:text-3xl font-serif text-foreground">{property.area_population || "-"}</p>
        </div>
        <div className="text-center py-6 px-2">
          <p className="text-xs uppercase tracking-[1px] text-muted-foreground mb-2">{t("propertyDetail.sexRatio")}</p>
          <p className="text-lg md:text-xl font-serif text-foreground">
            {property.area_sex_ratio_male ? `${property.area_sex_ratio_male}%` : "-"}{" "}
            <span className="text-sm text-muted-foreground">{t("propertyDetail.male")}</span>
            {" · "}
            {property.area_sex_ratio_female ? `${property.area_sex_ratio_female}%` : "-"}{" "}
            <span className="text-sm text-muted-foreground">{t("propertyDetail.female")}</span>
          </p>
        </div>
        <div className="text-center py-6 px-2">
          <p className="text-xs uppercase tracking-[1px] text-muted-foreground mb-2">{t("propertyDetail.class")}</p>
          <p className="text-2xl md:text-3xl font-serif text-foreground">{property.area_class || "-"}</p>
        </div>
      </div>
    </section>
  );
};

export default AreaDetails;
