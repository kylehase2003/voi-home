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
import heroIstanbul1 from "@/assets/hero-istanbul-1-optimized.webp";
import heroIstanbul2 from "@/assets/hero-istanbul-2-optimized.webp";
import heroIstanbul3 from "@/assets/hero-istanbul-3-optimized.webp";
import heroVilla from "@/assets/hero-villa.webp";
import apartmentModern from "@/assets/apartment-modern.jpg";
import penthouseView from "@/assets/penthouse-view.jpg";

const Experience = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className={`min-h-screen bg-background ${isRTL ? "font-arabic" : ""}`}>
      <SEOHead
        title="Luxury Real Estate in Istanbul & Bodrum, Türkiye"
        description="Voi Home offers curated luxury homes, villas, and investment properties in Istanbul and Bodrum, every detail checked before it reaches you. Turkish citizenship eligibility available. Contact us."
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
          headline="That's not all we do."
          subheadline="Finding the property is the easy part. Here's how we support you before, during, and after the deal."
          rows={[
            {
              tag: t("ourServices.item3.title"),
              title: "We evaluate every opportunity before you commit.",
              description:
                "Rental yield, projected appreciation, title status, developer track record — every listing we bring you has already been checked against the fundamentals that actually decide whether an investment performs.",
              image: apartmentModern,
            },
            {
              reversed: true,
              tag: t("ourServices.item1.title"),
              title: "When it's time to sell, we handle the whole process.",
              description:
                "From pricing it correctly for the current market to marketing it to the right buyers, our team manages the resale from listing to closing so you don't have to.",
              image: heroVilla,
            },
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

        <BlogCategoryPicker />

        <PhotoScroller images={[heroIstanbul1, heroIstanbul3, heroVilla, apartmentModern, penthouseView, heroIstanbul2]} />

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
