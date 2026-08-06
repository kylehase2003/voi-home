import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { RefreshCw, Landmark, TrendingUp, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
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
        <div className="text-center mb-10 md:mb-14">
          <h2 className={`text-4xl md:text-5xl lg:text-6xl text-[hsl(var(--olive))] mb-4 ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
            {t("ourServices.title")}
          </h2>
          <div className="w-16 h-1 bg-[hsl(var(--gold))] mx-auto" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <RevealOnScroll key={service.slug} delay={index * 100} className="h-full">
                <div className="h-full flex flex-col items-center text-center p-8 rounded-2xl shadow-luxury hover:shadow-xl transition-shadow duration-500 bg-[hsl(var(--card))] border border-[hsl(var(--border))]">
                  <div className="w-14 h-14 rounded-full bg-[hsl(var(--gold))]/10 flex items-center justify-center mb-5">
                    <Icon className="w-7 h-7 text-[hsl(var(--gold))]" />
                  </div>
                  <h3 className={`text-lg mb-6 flex-1 text-[hsl(var(--olive))] ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                    {service.title}
                  </h3>
                  <Link to={getBlogUrl(service.slug)}>
                    <Button variant="outline" className="border-2 border-gold text-gold hover:bg-gold hover:text-primary">
                      {t("homePage.blogsNews.readMore")}
                    </Button>
                  </Link>
                </div>
              </RevealOnScroll>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default OurServices;
