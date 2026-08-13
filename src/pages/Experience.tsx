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
import FeatureRow from "@/components/editorial/FeatureRow";
import StatsOverlay from "@/components/editorial/StatsOverlay";
import TestimonialBreak from "@/components/editorial/TestimonialBreak";
import StatementSection from "@/components/editorial/StatementSection";
import ProcessSteps from "@/components/editorial/ProcessSteps";
import MarketsPicker from "@/components/editorial/MarketsPicker";
import PhotoScroller from "@/components/editorial/PhotoScroller";
import heroIstanbul1 from "@/assets/hero-istanbul-1-optimized.webp";
import heroIstanbul2 from "@/assets/hero-istanbul-2-optimized.webp";
import heroIstanbul3 from "@/assets/hero-istanbul-3-optimized.webp";
import heroDubai from "@/assets/hero-dubai-optimized.webp";
import heroVilla from "@/assets/hero-villa.webp";
import apartmentModern from "@/assets/apartment-modern.jpg";
import penthouseView from "@/assets/penthouse-view.jpg";

const Experience = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "font-arabic" : ""}`}>
      <SEOHead
        title="The Voi Home Experience"
        description="A closer look at how Voi Home finds, evaluates, and manages luxury real estate investments across Turkey and Dubai."
        path="/experience"
        noindex
      />
      <Helmet>
        {/* Satoshi + General Sans: free fonts from Fontshare, used only on this page */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&f[]=satoshi@500&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <Header />
      <ShatterHero />

      <main>
        <FeatureRow
          tag={t("ourServices.item3.title")}
          title="We evaluate every opportunity before you commit."
          description="Rental yield, projected appreciation, title status, developer track record — every listing we bring you has already been checked against the fundamentals that actually decide whether an investment performs."
          image={apartmentModern}
        />
        <FeatureRow
          reversed
          tag={t("ourServices.item1.title")}
          title="When it's time to sell, we handle the whole process."
          description="From pricing it correctly for the current market to marketing it to the right buyers, our team manages the resale from listing to closing so you don't have to."
          image={heroVilla}
        />

        <StatsOverlay
          image={heroDubai}
          title="Real numbers from a market that keeps moving."
          description="Turkey and Dubai remain two of the most active real estate markets for foreign investors — here's what that's looked like recently."
          stats={[
            { value: 1.69, decimals: 2, suffix: "M+", label: t("homePage.stats.propertiesSold") },
            { value: 364905, decimals: 0, suffix: "", label: t("homePage.stats.foreignInvestment") },
            { value: 29.0, decimals: 1, suffix: "%", label: t("homePage.stats.priceGrowth") },
          ]}
        />

        <RevealOnScroll>
          <FeaturedProperties />
        </RevealOnScroll>

        <TestimonialBreak backgroundImage={heroIstanbul3} />

        <StatementSection
          tag="Why Voi Home"
          lines={["Every market has a right time to buy.", "We make sure you don't miss it."]}
        />

        <ProcessSteps
          tag="How it works"
          title="From first search to the keys in your hand."
          description="Buying property abroad has more steps than buying at home. We handle the parts that usually slow people down."
          image={heroIstanbul2}
          steps={[
            { num: "01", title: "We search", desc: "Matched to your budget and goals" },
            { num: "02", title: "We verify", desc: "Title, permits, developer standing" },
            { num: "03", title: "We close", desc: "Paperwork and transfer, handled" },
            { num: "04", title: "We support", desc: "Ongoing, after you own it" },
          ]}
        />

        <MarketsPicker />

        <PhotoScroller images={[heroIstanbul1, heroDubai, heroVilla, apartmentModern, penthouseView, heroIstanbul2]} />

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
