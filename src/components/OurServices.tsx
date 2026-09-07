import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, RefreshCw, Landmark, TrendingUp, Building2 } from "lucide-react";
import { getBlogUrl } from "@/constants/routes";
import RevealOnScroll from "@/components/RevealOnScroll";

const OurServices = () => {
  const { t, i18n } = useTranslation();

  const services = [{
    icon: RefreshCw,
    title: t("ourServices.item1.title"),
    slug: "reselling-property-in-turkey"
  }, {
    icon: Landmark,
    title: t("ourServices.item2.title"),
    slug: "turkish-citizenship-by-investment"
  }, {
    icon: TrendingUp,
    title: t("ourServices.item3.title"),
    slug: "investment-consultations-in-turkish-real-estate"
  }, {
    icon: Building2,
    title: t("ourServices.item4.title"),
    slug: "managing-a-turkish-property-portfolio"
  }];

  return (
    <section className="py-10 md:py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-14 max-w-xl mx-auto">
          <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
            {t("ourServices.title")}
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <RevealOnScroll key={service.slug} delay={index * 100} className="pt-6 border-t border-border">
                <Icon className="w-6 h-6 text-foreground mb-5" strokeWidth={1.5} />
                <h3 className={`text-lg mb-4 text-foreground ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                  {service.title}
                </h3>
                <Link
                  to={getBlogUrl(service.slug)}
                  className="group inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold/80 transition-colors"
                >
                  {t("homePage.blogsNews.readMore")}
                  <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                </Link>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
