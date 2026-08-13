import { Link } from "react-router-dom";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Target, Users, TrendingUp, Play, Compass, Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import visionVideo from "@/assets/about-vision-video.webp";
import founderPhoto from "@/assets/founder-samer.webp";
import locationImage from "@/assets/location-image.webp";
import SEOHead from "@/components/SEOHead";
import RevealOnScroll from "@/components/RevealOnScroll";
import OurServices from "@/components/OurServices";
import StatsOverlay from "@/components/editorial/StatsOverlay";
import FeatureRow from "@/components/editorial/FeatureRow";

const About = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [isVideoOpen, setIsVideoOpen] = useState(false);

  const principles = [
    { icon: Target, title: t("aboutPage.principles.item1.title"), description: t("aboutPage.principles.item1.description") },
    { icon: Award, title: t("aboutPage.principles.item2.title"), description: t("aboutPage.principles.item2.description") },
    { icon: Search, title: t("aboutPage.principles.item3.title"), description: t("aboutPage.principles.item3.description") },
    { icon: Users, title: t("aboutPage.principles.item4.title"), description: t("aboutPage.principles.item4.description") },
    { icon: TrendingUp, title: t("aboutPage.principles.item5.title"), description: t("aboutPage.principles.item5.description") },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="About Us - Luxury Real Estate Consultancy"
        description="MR. Property's expert team delivers luxury real estate consultancy in Istanbul, Bodrum & Dubai with personalized service."
        path="/about"
      />
      <Header />
      <main className="pt-24">
        <h1 className="sr-only">{t("seo.h1.about")}</h1>

        {/* Philosophy + track-record stats */}
        <StatsOverlay
          image={locationImage}
          eyebrow={t("aboutPage.philosophy.label")}
          title={t("aboutPage.philosophy.title")}
          stats={[
            { value: 150, prefix: "+", label: t("aboutPage.stats.propertiesSold") },
            { value: 120, prefix: "+", label: t("aboutPage.stats.foreignInvestment") },
            { value: 10, prefix: "+", label: t("aboutPage.stats.priceGrowth") },
          ]}
        />

        {/* Story & Video */}
        <section className="bg-background">
          <div className="container mx-auto px-4 py-16 md:py-24">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <RevealOnScroll className="space-y-4">
                <h2
                  className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}
                >
                  {t("aboutPage.story.title")}
                </h2>
                <p
                  className={`text-lg md:text-xl text-gold whitespace-pre-line leading-snug ${isRTL ? "font-arabic" : "font-serif"}`}
                >
                  {t("aboutPage.story.tagline")}
                </p>
                <p className="text-muted-foreground leading-[1.7]">{t("aboutPage.story.paragraph1")}</p>
                <p className="text-muted-foreground leading-[1.7]">{t("aboutPage.story.paragraph2")}</p>
                <p className="text-muted-foreground leading-[1.7]">{t("aboutPage.story.paragraph3")}</p>
                <p className="text-muted-foreground leading-[1.7]">{t("aboutPage.story.closingLine1")}</p>
                <a
                  href="https://api.whatsapp.com/send/?phone=905527971000&text=Hi%2C+I%27m+interested+in+your+properties.+I%27d+like+to+know+more%21&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    {t("aboutPage.story.closingLine2")}
                  </Button>
                </a>
              </RevealOnScroll>

              <RevealOnScroll
                delay={100}
                className="w-full max-w-2xl mx-auto lg:mx-0 lg:ml-auto"
              >
                <div
                  onClick={() => setIsVideoOpen(true)}
                  className="relative rounded-[20px] overflow-hidden shadow-luxury group cursor-pointer"
                >
                  <img
                    src={visionVideo}
                    alt="Luxury Property Video"
                    className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-smooth flex items-center justify-center">
                    <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-smooth animate-pulse">
                      <Play className="w-7 h-7 md:w-8 md:h-8 text-primary ml-1" fill="currentColor" />
                    </div>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Mission & Vision */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <RevealOnScroll className="bg-card border border-border/50 rounded-[20px] shadow-luxury p-8 md:p-10 space-y-4 h-full">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                  <Target className="w-7 h-7 text-gold" />
                </div>
                <h3 className={`text-2xl md:text-3xl tracking-[-0.5px] text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}>
                  {t("aboutPage.missionVision.mission.title")}
                </h3>
                <p className={`text-lg text-gold ${isRTL ? "font-arabic" : "font-serif"}`}>
                  {t("aboutPage.missionVision.mission.tagline")}
                </p>
                <p className="text-muted-foreground leading-[1.7]">{t("aboutPage.missionVision.mission.description")}</p>
              </RevealOnScroll>

              <RevealOnScroll delay={150} className="bg-card border border-border/50 rounded-[20px] shadow-luxury p-8 md:p-10 space-y-4 h-full">
                <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center">
                  <Compass className="w-7 h-7 text-gold" />
                </div>
                <h3 className={`text-2xl md:text-3xl tracking-[-0.5px] text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}>
                  {t("aboutPage.missionVision.vision.title")}
                </h3>
                <p className={`text-lg text-gold ${isRTL ? "font-arabic" : "font-serif"}`}>
                  {t("aboutPage.missionVision.vision.tagline")}
                </p>
                <p className="text-muted-foreground leading-[1.7]">{t("aboutPage.missionVision.vision.description")}</p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <OurServices />

        {/* Founder */}
        <FeatureRow
          reversed
          title={t("aboutPage.founder.title")}
          description={t("aboutPage.founder.description")}
          image={founderPhoto}
        />

        {/* Principles */}
        <section className="py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4">
            <RevealOnScroll className="text-center mb-16 max-w-xl mx-auto">
              <h2
                className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}
              >
                {t("aboutPage.principles.title")}
              </h2>
            </RevealOnScroll>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <RevealOnScroll
                    key={principle.title}
                    delay={index * 100}
                    className="p-6 rounded-[20px] shadow-luxury hover:shadow-xl transition-shadow duration-500 bg-card border border-border h-full"
                  >
                    <div className="w-14 h-14 rounded-full bg-gold/10 flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className={`text-xl mb-3 text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}>{principle.title}</h3>
                    <p className="leading-[1.7] text-sm text-muted-foreground">{principle.description}</p>
                  </RevealOnScroll>
                );
              })}
            </div>

            <div className="text-center mt-12">
              <Link to="/contact">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {t("aboutCompany.contactButton")}
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />

      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black border-0">
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full"
              src="https://www.youtube-nocookie.com/embed/XlsrqagN3Kk?autoplay=1"
              title="Property Vision Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default About;
