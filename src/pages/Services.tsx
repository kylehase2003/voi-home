import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RevealOnScroll from "@/components/RevealOnScroll";
import ProcessSteps from "@/components/editorial/ProcessSteps";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/photos/fallback-blog.webp";
import processLivingRoom from "@/assets/photos/process-living-room.webp";
import tileInterior from "@/assets/photos/tile-interior-lounge.webp";
import tileVilla from "@/assets/photos/tile-villa-garden.webp";

const SERVICE_KEYS = ["search", "investment", "citizenship", "legal", "resale", "care"] as const;

// WhatsApp deep link, optionally pre-filled with the service being asked about.
const whatsappLink = (text: string) =>
  `https://api.whatsapp.com/send/?phone=905527971000&text=${encodeURIComponent(text)}&type=phone_number&app_absent=0`;

const Services = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const serif = isRTL ? "font-arabic" : "font-serif";

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "font-arabic" : ""}`}>
      <SEOHead
        title="Services: Buying, Investment & Citizenship in Türkiye"
        description="Home search, investment counsel, Turkish citizenship guidance, legal paperwork, resale and property care: everything Voi Home handles for clients buying in Istanbul and Bodrum."
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
                    <Button className="rounded-full bg-foreground text-background hover:bg-foreground/85 px-6 h-12 text-[15px]">
                      {t("hero.bookConsultation")}
                      <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                    </Button>
                  </Link>
                  <a href={whatsappLink(t("whatsapp.defaultMessage"))} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline" className="rounded-full border-foreground/20 bg-transparent hover:bg-foreground hover:text-background px-6 h-12 text-[15px]">
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

        <section className="py-14 md:py-20 px-6">
          <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-border rounded-2xl overflow-hidden border border-border">
            {SERVICE_KEYS.map((key, i) => (
              <RevealOnScroll key={key} delay={(i % 3) * 100} className="bg-background p-7 md:p-9 flex flex-col">
                <div className="text-sm text-muted-foreground mb-8 tabular-nums">0{i + 1}</div>
                <h2 className={`text-2xl md:text-[28px] leading-[1.15] tracking-[-0.6px] text-foreground mb-3 ${serif}`}>
                  {t(`servicesPage.items.${key}.title`)}
                </h2>
                <p className="text-[15px] leading-[1.7] text-muted-foreground mb-5">
                  {t(`servicesPage.items.${key}.description`)}
                </p>
                <ul className="mt-auto space-y-2 text-sm text-foreground/80">
                  {(t(`servicesPage.items.${key}.points`, { returnObjects: true }) as string[]).map((p) => (
                    <li key={p} className="flex gap-2">
                      <span className="mt-[9px] h-px w-3 bg-foreground/40 shrink-0" />
                      {p}
                    </li>
                  ))}
                </ul>
                <a
                  href={whatsappLink(t("servicesPage.askMessage", { service: t(`servicesPage.items.${key}.title`) }))}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group/cta mt-7 inline-flex items-center gap-2 self-start rounded-full border border-foreground/15 px-4 py-2 text-sm font-medium text-foreground hover:bg-foreground hover:text-background hover:border-foreground transition-colors"
                >
                  {t("servicesPage.askAbout")}
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover/cta:-translate-y-0.5 group-hover/cta:translate-x-0.5 rtl:-scale-x-100" />
                </a>
              </RevealOnScroll>
            ))}
          </div>
        </section>

        <section className="px-6 pb-14 md:pb-20">
          <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-4">
            <img src={tileInterior} alt="" className="w-full h-64 md:h-96 object-cover rounded-2xl" loading="lazy" />
            <img src={tileVilla} alt="" className="w-full h-64 md:h-96 object-cover rounded-2xl" loading="lazy" />
          </div>
        </section>

        <ProcessSteps
          tag={t("home.process.tag")}
          title={t("home.process.title")}
          description={t("home.process.description")}
          image={processLivingRoom}
          steps={[
            { num: "01", title: t("home.process.step1.title"), desc: t("home.process.step1.desc") },
            { num: "02", title: t("home.process.step2.title"), desc: t("home.process.step2.desc") },
            { num: "03", title: t("home.process.step3.title"), desc: t("home.process.step3.desc") },
            { num: "04", title: t("home.process.step4.title"), desc: t("home.process.step4.desc") },
          ]}
        />

        <section className="py-16 md:py-20 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-4">
            <h2 className={`text-3xl md:text-5xl mb-5 ${serif}`}>{t("servicesPage.ctaTitle")}</h2>
            <p className="max-w-xl mx-auto text-primary-foreground/70 mb-8">{t("servicesPage.ctaText")}</p>
            <div className="flex flex-wrap items-center justify-center gap-3">
              <Link to="/contact">
                <Button className="rounded-full bg-primary-foreground text-primary hover:bg-primary-foreground/90 px-7 py-6 text-base">
                  {t("hero.bookConsultation")}
                  <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
                </Button>
              </Link>
              <a href={whatsappLink(t("whatsapp.defaultMessage"))} target="_blank" rel="noopener noreferrer">
                <Button variant="outline" className="rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground px-7 py-6 text-base">
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {t("servicesPage.whatsapp")}
                </Button>
              </a>
              <Link to="/properties">
                <Button variant="ghost" className="rounded-full text-primary-foreground/80 hover:bg-primary-foreground/10 hover:text-primary-foreground px-5 py-6 text-base">
                  {t("hero.exploreProperties")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Services;
