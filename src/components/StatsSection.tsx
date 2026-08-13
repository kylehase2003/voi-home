import { useTranslation } from "react-i18next";
import StatsOverlay from "@/components/editorial/StatsOverlay";
import penthouseView from "@/assets/penthouse-view.jpg";

const StatsSection = () => {
  const { t } = useTranslation();

  return (
    <StatsOverlay
      image={penthouseView}
      title={t("stats.title")}
      description={t("homePage.featuredProperties.exploreOpportunities")}
      stats={[
        { value: 1.69, decimals: 2, suffix: "M+", label: t("homePage.stats.propertiesSold") },
        { value: 364905, decimals: 0, suffix: "", label: t("homePage.stats.foreignInvestment") },
        { value: 29.0, decimals: 1, suffix: "%", label: t("homePage.stats.priceGrowth") },
      ]}
    />
  );
};

export default StatsSection;
