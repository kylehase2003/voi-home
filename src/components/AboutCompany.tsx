import { Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import aboutVideoThumb from "@/assets/about-vision-video.webp";
import YouTubeFacade from "@/components/YouTubeFacade";
import FeatureRow from "@/components/editorial/FeatureRow";

const AboutCompany = () => {
  const { t } = useTranslation();

  return (
    <FeatureRow
      tag={t("aboutCompany.subtitle")}
      title={t("aboutCompany.title")}
      description={t("aboutCompany.description")}
      mediaAspectClassName="aspect-video"
      media={
        <YouTubeFacade videoId="XlsrqagN3Kk" title="About MR. PROPERTY" fallbackThumbnail={aboutVideoThumb} />
      }
      extra={
        <>
          <div className="space-y-3 mb-7">
            <div className="flex items-center gap-3">
              <ArrowRight className="w-5 h-5 text-gold flex-shrink-0" />
              <span className="text-foreground/80">{t("aboutCompany.point1")}</span>
            </div>
            <div className="flex items-center gap-3">
              <ArrowRight className="w-5 h-5 text-gold flex-shrink-0" />
              <span className="text-foreground/80">{t("aboutCompany.point2")}</span>
            </div>
            <div className="flex items-center gap-3">
              <ArrowRight className="w-5 h-5 text-gold flex-shrink-0" />
              <span className="text-foreground/80">{t("aboutCompany.point3")}</span>
            </div>
          </div>
          <Link to="/contact">
            <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
              <Home className="w-4 h-4 mr-2" />
              {t("aboutCompany.contactButton")}
            </Button>
          </Link>
        </>
      }
    />
  );
};

export default AboutCompany;
