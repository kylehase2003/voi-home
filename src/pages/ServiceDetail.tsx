import { Link, Navigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ChevronRight, Compass, Eye, Handshake, Info, MessageCircle, Repeat, Users } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead, { ORG_ID, SITE_URL } from "@/components/SEOHead";
import RevealOnScroll from "@/components/RevealOnScroll";
import ServiceCard from "@/components/services/ServiceCard";
import ServicesCta from "@/components/services/ServicesCta";
import { Button } from "@/components/ui/button";
import { SERVICES, findService, getServiceContent } from "@/data/services";
import { whatsappLink } from "@/lib/whatsapp";

// One template for all eight service pages (per the client's brief):
// hero with title, tagline, intro, image and calls to action; "What we offer"
// with every sub-service; design styles (interior design only); the scope
// note where the brief requires one; Why Voi; other services; closing CTA.
const WHY_KEYS = ["knowledge", "transparency", "coordination", "tailored", "continuity"] as const;
const WHY_ICONS = { knowledge: Compass, transparency: Eye, coordination: Handshake, tailored: Users, continuity: Repeat };

const ServiceDetail = () => {
  const { slug } = useParams();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const serif = isRTL ? "font-arabic" : "font-serif";

  const service = findService(slug);
  if (!service) return <Navigate to="/services" replace />;

  const content = getServiceContent(service.slug, i18n.language);
  const enName = getServiceContent(service.slug, "en").name;
  const index = SERVICES.findIndex((s) => s.slug === service.slug);
  const number = String(index + 1).padStart(2, "0");
  const others = SERVICES.filter((s) => s.slug !== service.slug);
  const askText = t("servicesPage.askMessage", { service: content.name });

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "font-arabic" : ""}`}>
      <SEOHead
        title={`${enName} in Istanbul | Voi Home`}
        description={content.seoDescription}
        path={`/services/${service.slug}`}
        ogImage={service.image}
        breadcrumbs={[
          { name: "Services", path: "/services" },
          { name: enName, path: `/services/${service.slug}` },
        ]}
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Service",
          name: enName,
          serviceType: enName,
          description: getServiceContent(service.slug, "en").intro,
          url: `${SITE_URL}/services/${service.slug}`,
          provider: { "@id": ORG_ID },
          areaServed: { "@type": "City", name: "Istanbul" },
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: enName,
            itemListElement: getServiceContent(service.slug, "en").sections.map((sec) => ({
              "@type": "Offer",
              itemOffered: { "@type": "Service", name: sec.title, description: sec.items.join("; ") },
            })),
          },
        }}
      />
      <Header />
      <main className="pt-24">
        {/* Hero */}
        <section className="px-6 pt-10 md:pt-14">
          <div className="max-w-6xl mx-auto">
            <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-sm text-muted-foreground mb-8 md:mb-10">
              <Link to="/services" className="hover:text-foreground transition-colors">
                {t("servicesPage.breadcrumb")}
              </Link>
              <ChevronRight className="h-3.5 w-3.5 rtl:rotate-180" />
              <span className="text-foreground truncate">{content.name}</span>
            </nav>

            <RevealOnScroll className="grid md:grid-cols-[1.3fr_1fr] gap-6 md:gap-16 md:items-end mb-10 md:mb-14">
              <div>
                <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-5">
                  <span className="tabular-nums">
                    {t("servicesPage.serviceNumber", { num: number })}
                  </span>
                  <span className="h-px w-6 bg-foreground/25" />
                  <span>{t(`servicesPage.categories.${service.category}`)}</span>
                </div>
                <h1 className={`text-4xl md:text-[56px] leading-[1.05] tracking-[-1.5px] text-foreground mb-4 ${serif}`}>
                  {content.name}
                </h1>
                <p className={`text-xl md:text-2xl leading-[1.3] text-foreground/70 ${serif}`}>{content.tagline}</p>
              </div>
              <div>
                <p className="text-base md:text-lg text-muted-foreground leading-[1.7] mb-7">{content.intro}</p>
                <div className="flex flex-wrap items-center gap-3">
                  <Link to="/contact">
                    <Button className="rounded-full bg-burgundy text-white hover:bg-burgundy/90 px-6 h-12 text-[15px]">
                      {t("hero.bookConsultation")}
                      <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                    </Button>
                  </Link>
                  <a href={whatsappLink(askText)} target="_blank" rel="noopener noreferrer">
                    <Button
                      className="rounded-full bg-evergreen text-white hover:bg-evergreen/90 px-6 h-12 text-[15px]"
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      {t("servicesPage.askAbout")}
                    </Button>
                  </a>
                </div>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={120}>
              <div className="rounded-[28px] overflow-hidden aspect-[4/3] sm:aspect-[16/9] md:aspect-[21/9] bg-muted">
                <img src={service.image} alt={content.name} className="w-full h-full object-cover" />
              </div>
            </RevealOnScroll>
          </div>
        </section>

        {/* What we offer */}
        <section className="px-6 py-14 md:py-20">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll className="max-w-2xl mb-10 md:mb-12">
              <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">
                {t("servicesPage.whatWeOfferTag")}
              </div>
              <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground ${serif}`}>
                {t("servicesPage.whatWeOffer")}
              </h2>
            </RevealOnScroll>

            <div
              className={`grid grid-cols-1 md:grid-cols-2 ${
                content.sections.length > 2 ? "lg:grid-cols-3" : ""
              } gap-px bg-border rounded-2xl overflow-hidden border border-border`}
            >
              {content.sections.map((section, i) => (
                <RevealOnScroll key={section.title} delay={(i % 3) * 80} className="bg-background p-7 md:p-9">
                  <div className="text-sm text-muted-foreground tabular-nums mb-6">{String(i + 1).padStart(2, "0")}</div>
                  <h3 className={`text-[22px] md:text-2xl leading-[1.2] tracking-[-0.4px] text-foreground mb-5 ${serif}`}>
                    {section.title}
                  </h3>
                  <ul className="space-y-2.5">
                    {section.items.map((item) => (
                      <li key={item} className="flex gap-3 text-[15px] leading-[1.6] text-foreground/80">
                        <span className="mt-[11px] h-px w-3 bg-evergreen/60 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </RevealOnScroll>
              ))}
              {/* Fill the last row so the grid lines stay complete on desktop. */}
              {content.sections.length > 2 &&
                Array.from({ length: (3 - (content.sections.length % 3)) % 3 }).map((_, i) => (
                  <div key={`fill-${i}`} className="hidden lg:block bg-background" aria-hidden="true" />
                ))}
            </div>

            {content.note && (
              <RevealOnScroll className="mt-6 flex gap-3 rounded-2xl bg-muted/60 px-5 py-4 text-sm leading-[1.6] text-muted-foreground">
                <Info className="h-4 w-4 shrink-0 mt-0.5" />
                <p>{content.note}</p>
              </RevealOnScroll>
            )}
          </div>
        </section>

        {/* Design styles - interior design only */}
        {content.styles && (
          <section className="px-6 pb-14 md:pb-20">
            <div className="max-w-6xl mx-auto">
              <RevealOnScroll className="grid md:grid-cols-[1.3fr_1fr] gap-4 md:gap-16 md:items-end mb-10 md:mb-12">
                <div>
                  <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">
                    {t("servicesPage.stylesTag")}
                  </div>
                  <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground ${serif}`}>
                    {t("servicesPage.stylesTitle")}
                  </h2>
                </div>
                <p className="text-base text-muted-foreground leading-[1.7]">{t("servicesPage.stylesLead")}</p>
              </RevealOnScroll>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {content.styles.map((style, i) => (
                  <RevealOnScroll
                    key={style.name}
                    delay={(i % 4) * 70}
                    className="rounded-2xl border border-border/70 bg-card p-6 flex flex-col"
                  >
                    <div className="text-sm text-muted-foreground tabular-nums mb-8">{String(i + 1).padStart(2, "0")}</div>
                    <h3 className={`text-xl leading-tight text-foreground mb-2 ${serif}`}>{style.name}</h3>
                    <p className="text-sm leading-[1.6] text-muted-foreground">{style.description}</p>
                  </RevealOnScroll>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Why Voi */}
        <section className="px-6 py-14 md:py-20 bg-evergreen text-[#E6E2DA]">
          <div className="max-w-6xl mx-auto">
            <RevealOnScroll className="max-w-2xl mb-10 md:mb-12">
              <div className="text-xs font-medium uppercase tracking-[1.5px] text-[#E6E2DA]/60 mb-4">
                {t("servicesPage.why.tag")}
              </div>
              <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-[#E6E2DA] ${serif}`}>
                {t("servicesPage.why.title")}
              </h2>
            </RevealOnScroll>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-6">
              {WHY_KEYS.map((key, i) => {
                const Icon = WHY_ICONS[key];
                return (
                  <RevealOnScroll key={key} delay={i * 70}>
                    <span className="h-11 w-11 rounded-full border border-[#E6E2DA]/25 flex items-center justify-center mb-5">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </span>
                    <h3 className="text-base font-semibold text-[#E6E2DA] mb-2">{t(`servicesPage.why.${key}.title`)}</h3>
                    <p className="text-sm leading-[1.6] text-[#E6E2DA]/70">{t(`servicesPage.why.${key}.text`)}</p>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>
        </section>

        {/* Other services */}
        <section className="py-14 md:py-20">
          <div className="max-w-6xl mx-auto px-6 mb-8 flex items-end justify-between gap-4">
            <h2 className={`text-2xl md:text-[32px] leading-[1.15] tracking-[-0.8px] text-foreground ${serif}`}>
              {t("servicesPage.otherServices")}
            </h2>
            <Link
              to="/services"
              className="shrink-0 text-sm font-medium text-foreground/70 hover:text-foreground underline-offset-4 hover:underline"
            >
              {t("servicesPage.allServices")}
            </Link>
          </div>
          <div className="max-w-6xl mx-auto px-6">
            <div className="-mx-6 px-6 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {others.map((s) => (
                <div key={s.slug} className="snap-start shrink-0 w-[240px] md:w-[260px]">
                  <ServiceCard service={s} compact />
                </div>
              ))}
            </div>
          </div>
        </section>

        <ServicesCta whatsappText={askText} />
      </main>
      <Footer />
    </div>
  );
};

export default ServiceDetail;
