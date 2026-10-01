import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Button } from "@/components/ui/button";
import SEOHead from "@/components/SEOHead";
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import ShatterHero from "@/components/ShatterHero";
import FeaturedProperties from "@/components/FeaturedProperties";
import RevealOnScroll from "@/components/RevealOnScroll";
import ServicesRows from "@/components/editorial/ServicesRows";
import TestimonialBreak from "@/components/editorial/TestimonialBreak";
import StatementSection from "@/components/editorial/StatementSection";
import ProcessSteps from "@/components/editorial/ProcessSteps";
import BlogCategoryPicker from "@/components/editorial/BlogCategoryPicker";
import PropertyScrollShowcase from "@/components/editorial/PropertyScrollShowcase";
import PhotoScroller from "@/components/editorial/PhotoScroller";
import serviceKitchen from "@/assets/photos/service-kitchen.webp";
import serviceTower from "@/assets/photos/service-tower.webp";
import testimonialBosphorus from "@/assets/photos/testimonial-bosphorus.webp";
import processLivingRoom from "@/assets/photos/process-living-room.webp";
import scrollerSkylineTower from "@/assets/photos/scroller-skyline-tower.webp";
import scrollerBosphorusFerry from "@/assets/photos/scroller-bosphorus-ferry.webp";
import scrollerHillsideHomes from "@/assets/photos/scroller-hillside-homes.webp";
import scrollerBosphorusBridge from "@/assets/photos/scroller-bosphorus-bridge.webp";
import scrollerPeraFacades from "@/assets/photos/scroller-pera-facades.webp";
import scrollerTurret from "@/assets/photos/scroller-turret.webp";

const Experience = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "font-arabic" : ""}`}>
      <SEOHead
        title="Boutique Real Estate in Istanbul & Bodrum, Türkiye"
        description="Voi Home is a boutique real estate firm in Istanbul and Bodrum. A few carefully chosen homes, each checked down to the title deed, with personal guidance on investment and Turkish citizenship."
        path="/"
      />
      <Helmet>
        {/* Satoshi + General Sans: free fonts from Fontshare, used for this page's editorial typography */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&f[]=satoshi@500&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Header />
      <ShatterHero />
      <PropertyScrollShowcase />

      <main>
        <ServicesRows
          headline={t("home.services.headline")}
          subheadline={t("home.services.subheadline")}
          rows={[
            {
              tag: t("ourServices.item3.title"),
              title: t("home.services.row1.title"),
              description: t("home.services.row1.description"),
              image: serviceKitchen,
            },
            {
              reversed: true,
              tag: t("ourServices.item1.title"),
              title: t("home.services.row2.title"),
              description: t("home.services.row2.description"),
              image: serviceTower,
            },
          ]}
        />

        <RevealOnScroll>
          <FeaturedProperties />
        </RevealOnScroll>

        <TestimonialBreak backgroundImage={testimonialBosphorus} />

        <StatementSection
          tag={t("home.why.tag")}
          lines={[t("home.why.line1"), t("home.why.line2")]}
        />

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

        <BlogCategoryPicker />

        <PhotoScroller images={[scrollerSkylineTower, scrollerBosphorusFerry, scrollerHillsideHomes, scrollerBosphorusBridge, scrollerPeraFacades, scrollerTurret]} />

        <RevealOnScroll>
          <section className="py-20 md:py-28 bg-primary text-primary-foreground text-center">
            <div className="container mx-auto px-4">
              <h2 className={`text-3xl md:text-5xl mb-6 ${isRTL ? "" : "font-serif"}`}>
                {t("experience.ctaTitle")}
              </h2>
              <p className="max-w-xl mx-auto text-primary-foreground/70 mb-8">{t("hero.subtitle")}</p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Link to="/properties">
                  <Button className="bg-gold hover:bg-gold/90 text-white px-7 py-6 text-base rounded-full">
                    {t("hero.exploreProperties")}
                  </Button>
                </Link>
                <Link to="/contact">
                  <Button
                    variant="outline"
                    className="px-7 py-6 text-base rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                  >
                    {t("hero.bookConsultation")}
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        </RevealOnScroll>
      </main>

      <Footer />
    </div>
  );
};

export default Experience;
