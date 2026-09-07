import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import founderPhoto from "@/assets/hero-villa.webp";
import buildingDetail from "@/assets/hero-building.jpg";
import heroIstanbul1 from "@/assets/hero-istanbul-1-optimized.webp";
import SEOHead from "@/components/SEOHead";
import RevealOnScroll from "@/components/RevealOnScroll";
import AboutHero from "@/components/editorial/AboutHero";
import StoryScroll from "@/components/editorial/StoryScroll";
import StatBand from "@/components/editorial/StatBand";
import ManifestoList from "@/components/editorial/ManifestoList";
import FounderProfile from "@/components/editorial/FounderProfile";

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const principles = [
    { title: t("aboutPage.principles.item1.title"), description: t("aboutPage.principles.item1.description") },
    { title: t("aboutPage.principles.item2.title"), description: t("aboutPage.principles.item2.description") },
    { title: t("aboutPage.principles.item3.title"), description: t("aboutPage.principles.item3.description") },
    { title: t("aboutPage.principles.item4.title"), description: t("aboutPage.principles.item4.description") },
    { title: t("aboutPage.principles.item5.title"), description: t("aboutPage.principles.item5.description") },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="About Us - Luxury Real Estate Consultancy"
        description="Voi Home's expert team delivers luxury real estate consultancy in Istanbul and Bodrum, Türkiye, with personalized, detail-first service."
        path="/about"
      />
      <Header />
      <main className="pt-24">
        <h1 className="sr-only">{t("seo.h1.about")}</h1>

        <AboutHero
          eyebrow={t("aboutPage.hero.title")}
          title={t("aboutPage.philosophy.title")}
          lead="We check the things that decide whether a property is actually worth owning - the paperwork, the building, the neighborhood - before we ever recommend it to you."
          image={heroIstanbul1}
        />

        <StoryScroll
          image={buildingDetail}
          imageAlt="Close-up of a building facade in Istanbul"
          tagline={t("aboutPage.story.tagline")}
          paragraphs={[
            t("aboutPage.story.paragraph1"),
            t("aboutPage.story.paragraph2"),
            t("aboutPage.story.paragraph3"),
          ]}
          closingLine={t("aboutPage.story.closingLine1")}
          ctaLabel={t("aboutPage.story.closingLine2")}
          ctaHref="https://api.whatsapp.com/send/?phone=905527971000&text=Hi%2C+I%27m+interested+in+your+properties.+I%27d+like+to+know+more%21&type=phone_number&app_absent=0"
        />

        <StatBand
          stats={[
            { value: 150, prefix: "+", label: t("aboutPage.stats.propertiesSold") },
            { value: 120, prefix: "+", label: t("aboutPage.stats.foreignInvestment") },
            { value: 10, prefix: "+", label: t("aboutPage.stats.priceGrowth") },
          ]}
        />

        {/* Mission & Vision - stacked, asymmetric statements rather than a
            mirrored two-column split. Each one runs the full width and is
            offset against the other, so they read as two distinct beats
            instead of a matched pair. */}
        <section className="py-16 md:py-28 bg-background">
          <div className="container mx-auto px-6 space-y-16 md:space-y-24">
            <RevealOnScroll className="max-w-3xl">
              <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-5">
                {t("aboutPage.missionVision.mission.title")}
              </div>
              <p className={`text-3xl md:text-5xl leading-[1.25] tracking-[-1px] text-foreground mb-6 ${isRTL ? "font-arabic" : "font-serif"}`}>
                {t("aboutPage.missionVision.mission.tagline")}
              </p>
              <p className="text-muted-foreground leading-[1.7] max-w-lg">
                {t("aboutPage.missionVision.mission.description")}
              </p>
            </RevealOnScroll>

            <div className="border-t border-border" />

            <RevealOnScroll delay={100} className="max-w-3xl ml-auto text-right rtl:text-left">
              <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-5">
                {t("aboutPage.missionVision.vision.title")}
              </div>
              <p className={`text-3xl md:text-5xl leading-[1.25] tracking-[-1px] text-foreground mb-6 ${isRTL ? "font-arabic" : "font-serif"}`}>
                {t("aboutPage.missionVision.vision.tagline")}
              </p>
              <p className="text-muted-foreground leading-[1.7] max-w-lg ml-auto">
                {t("aboutPage.missionVision.vision.description")}
              </p>
            </RevealOnScroll>
          </div>
        </section>

        <ManifestoList
          eyebrow={t("aboutPage.philosophy.label")}
          title={t("aboutPage.principles.title")}
          items={principles}
        />

        <FounderProfile
          image={founderPhoto}
          imageAlt="Voi Home"
          quote="Add a short introduction from your founder here - a few lines on their experience, philosophy, and what clients can expect when working with them."
          name="Founder Name"
          role="Title, Voi Home"
        />

        <section className="py-20 md:py-28 bg-primary text-primary-foreground text-center">
          <div className="container mx-auto px-6">
            <RevealOnScroll>
              <h2 className={`text-3xl md:text-5xl mb-8 max-w-2xl mx-auto ${isRTL ? "font-arabic" : "font-serif"}`}>
                Every detail we check is one less thing you have to worry about.
              </h2>
              <Link to="/contact">
                <Button size="lg" className="bg-white text-primary hover:bg-white/90">
                  {t("aboutCompany.contactButton")}
                </Button>
              </Link>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
