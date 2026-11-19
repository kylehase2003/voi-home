import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RevealOnScroll from "@/components/RevealOnScroll";
import ServiceCard from "@/components/services/ServiceCard";
import ServicesCta from "@/components/services/ServicesCta";
import FaqTeaser from "@/components/faq/FaqTeaser";
import { Button } from "@/components/ui/button";
import { SERVICES } from "@/data/services";
import { whatsappLink } from "@/lib/whatsapp";
import heroImage from "@/assets/photos/fallback-blog.webp";

// Services overview: hero, then the eight core services as a 4 x 2 card grid
// (client's mock-up). Each card opens its own page at /services/<slug>.
const Services = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const serif = isRTL ? "font-arabic" : "font-serif";

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "font-arabic" : ""}`}>
      <SEOHead
        title="Real Estate Services in Istanbul | Voi Home"
        description="Property sales, rentals, investment advisory, property management, after-sales support, citizenship assistance, interior design and sales office setup in Istanbul."
        path="/services"
      />
      <Header />
      <main className="pt-24">
        {/* Hero: headline and intro side by side, then a full-width landscape photo. */}
        <section className="px-6 pt-14 md:pt-20">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll className="grid md:grid-cols-[1.4fr_1fr] gap-6 md:gap-16 md:items-end mb-10 md:mb-14">
              <div>
                <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-5">
                  {t("servicesPage.eyebrow")}
                </div>
                <h1 className={`text-4xl md:text-[56px] leading-[1.05] tracking-[-1.5px] text-foreground ${serif}`}>
                  {t("servicesPage.title")}
                </h1>
              </div>
              <div>
                <p className="text-base md:text-lg text-muted-foreground leading-[1.7] mb-7">{t("servicesPage.lead")}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link to="/contact">
                    <Button className="rounded-full bg-burgundy text-white hover:bg-burgundy/90 px-6 h-12 text-[15px]">
                      {t("hero.bookConsultation")}
                      <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                    </Button>
                  </Link>
                  <a href={whatsappLink(t("whatsapp.defaultMessage"))} target="_blank" rel="noopener noreferrer">
                    <Button
                      variant="outline"
                      className="rounded-full border-foreground/20 bg-transparent hover:bg-foreground hover:text-background px-6 h-12 text-[15px]"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {t("servicesPage.whatsapp")}
                    </Button>
                  </a>
                </div>
              </div>
            </RevealOnScroll>
            <RevealOnScroll delay={120}>
              <div className="rounded-[28px] overflow-hidden aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9]">
                <img src={heroImage} alt="" className="w-full h-full object-cover" />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* The eight services */}
        <section className="px-6 py-14 md:py-20" aria-labelledby="services-grid-title">
          <div className="max-w-6xl mx-auto">
            <h2 id="services-grid-title" className="sr-only">
              {t("servicesPage.eyebrow")}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-8">
              {SERVICES.map((service, i) => (
                <RevealOnScroll key={service.slug} delay={(i % 4) * 80} className="h-full">
                  <ServiceCard service={service} />
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>

        <FaqTeaser />

        <ServicesCta />
      </main>
      <Footer />
    </div>
  );
};

export default Services;
