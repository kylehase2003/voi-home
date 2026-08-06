import { Link } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Award, Target, Users, TrendingUp, Play, Compass, Search } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import heroImage from "@/assets/hero-villa.webp";
import visionVideo from "@/assets/about-vision-video.webp";
import founderPhoto from "@/assets/founder-samer.webp";
import SEOHead from "@/components/SEOHead";
import RevealOnScroll from "@/components/RevealOnScroll";
import OurServices from "@/components/OurServices";
const About = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const statsRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({
    properties: 0,
    investment: 0,
    growth: 0
  });
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [heroVisible, setHeroVisible] = useState(false);
  const [welcomeVisible, setWelcomeVisible] = useState(false);
  const welcomeRef = useRef<HTMLDivElement>(null);
  const handleVideoClick = () => {
    setIsVideoOpen(true);
  };

  // Hero animation on mount
  useEffect(() => {
    const timer = setTimeout(() => setHeroVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Stats observer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !isVisible) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.3
    });
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    return () => observer.disconnect();
  }, [isVisible]);

  // Welcome section observer
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setWelcomeVisible(true);
      }
    }, {
      threshold: 0.2
    });
    if (welcomeRef.current) {
      observer.observe(welcomeRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // Animated counter
  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;
    const targets = {
      properties: 150,
      investment: 120,
      growth: 10
    };
    let step = 0;
    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCounts({
        properties: Math.floor(targets.properties * progress),
        investment: Math.floor(targets.investment * progress),
        growth: parseFloat((targets.growth * progress).toFixed(2))
      });
      if (step >= steps) {
        setCounts(targets);
        clearInterval(timer);
      }
    }, interval);
    return () => clearInterval(timer);
  }, [isVisible]);
  const principles = [{
    icon: Target,
    title: t("aboutPage.principles.item1.title"),
    description: t("aboutPage.principles.item1.description")
  }, {
    icon: Award,
    title: t("aboutPage.principles.item2.title"),
    description: t("aboutPage.principles.item2.description")
  }, {
    icon: Search,
    title: t("aboutPage.principles.item3.title"),
    description: t("aboutPage.principles.item3.description")
  }, {
    icon: Users,
    title: t("aboutPage.principles.item4.title"),
    description: t("aboutPage.principles.item4.description")
  }, {
    icon: TrendingUp,
    title: t("aboutPage.principles.item5.title"),
    description: t("aboutPage.principles.item5.description")
  }];
  return <div className="min-h-screen">
      <SEOHead
        title="About Us - Luxury Real Estate Consultancy"
        description="MR. Property's expert team delivers luxury real estate consultancy in Istanbul, Bodrum & Dubai with personalized service."
        path="/about"
      />
      <Header />
      <main className="pt-24">
        <h1 className="sr-only">{t("seo.h1.about")}</h1>
        {/* Hero Section */}
        

        {/* Vision & Stats Section */}
        <section className="bg-[hsl(var(--cream))] py-[8px]">
          <div className="container mx-auto px-4">
            <div className="pt-[70px] mb-16">
              <div className={`bg-card border border-border/50 rounded-2xl md:rounded-3xl shadow-luxury p-8 md:p-12 lg:p-14 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
                  <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                    <p className="text-[hsl(var(--gold))] text-sm tracking-widest uppercase mb-4">{t("aboutPage.philosophy.label")}</p>
                    <h2 className={`text-4xl text-[hsl(var(--olive))] md:text-5xl ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                      {t("aboutPage.philosophy.title")}
                    </h2>
                  </div>
                  <div ref={statsRef} className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border/60">
                    {[{
                    value: `+${counts.properties.toLocaleString()}`,
                    label: t("aboutPage.stats.propertiesSold")
                  }, {
                    value: `+$${counts.investment}M`,
                    label: t("aboutPage.stats.foreignInvestment")
                  }, {
                    value: `+${counts.growth}`,
                    label: t("aboutPage.stats.priceGrowth")
                  }].map((stat, index) => <div key={index} className={`text-center py-4 sm:py-0 first:pt-0 sm:px-4 first:sm:pl-0 last:sm:pr-0 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{
                    transitionDelay: `${index * 150}ms`
                  }}>
                        <p className={`text-3xl sm:text-4xl md:text-5xl text-[hsl(var(--olive))] mb-2 ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                          {stat.value}
                        </p>
                        <p className="text-xs sm:text-sm text-muted-foreground">{stat.label}</p>
                      </div>)}
                  </div>
                </div>
              </div>
            </div>

            {/* Story & Video Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-10">
              {/* Left - Story text */}
              <div className={`space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <h2 className={`text-3xl md:text-4xl text-[hsl(var(--olive))] ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                  {t("aboutPage.story.title")}
                </h2>
                <p className={`text-lg md:text-xl text-[hsl(var(--gold))] whitespace-pre-line leading-snug ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                  {t("aboutPage.story.tagline")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("aboutPage.story.paragraph1")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("aboutPage.story.paragraph2")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("aboutPage.story.paragraph3")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("aboutPage.story.closingLine1")}
                </p>
                <a
                  href="https://api.whatsapp.com/send/?phone=905545707580&text=Hi%2C+I%27m+interested+in+your+properties.+I%27d+like+to+know+more%21&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button size="lg" className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90">
                    {t("aboutPage.story.closingLine2")}
                  </Button>
                </a>
              </div>

              {/* Right - Smaller video */}
              <div onClick={handleVideoClick} className={`relative rounded-2xl overflow-hidden shadow-luxury group cursor-pointer w-full max-w-2xl mx-auto lg:mx-0 lg:ml-auto transition-all duration-700 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`} style={{
              transitionDelay: '400ms'
            }}>
                <img src={visionVideo} alt="Luxury Property Video" className="w-full aspect-video object-cover transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-smooth flex items-center justify-center">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-smooth animate-pulse">
                    <Play className="w-7 h-7 md:w-8 md:h-8 text-[hsl(var(--olive))] ml-1" fill="currentColor" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Welcome Section */}


        {/* Mission & Vision Section */}
        <section className="py-10 md:py-14 bg-[hsl(var(--cream))]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
              <RevealOnScroll className="bg-card border border-border/50 rounded-2xl shadow-luxury p-8 md:p-10 space-y-4 h-full">
                <div className="w-14 h-14 rounded-full bg-[hsl(var(--gold))]/10 flex items-center justify-center">
                  <Target className="w-7 h-7 text-[hsl(var(--gold))]" />
                </div>
                <h3 className={`text-2xl md:text-3xl text-[hsl(var(--olive))] ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                  {t("aboutPage.missionVision.mission.title")}
                </h3>
                <p className={`text-lg text-[hsl(var(--gold))] ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                  {t("aboutPage.missionVision.mission.tagline")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("aboutPage.missionVision.mission.description")}
                </p>
              </RevealOnScroll>

              <RevealOnScroll delay={150} className="bg-card border border-border/50 rounded-2xl shadow-luxury p-8 md:p-10 space-y-4 h-full">
                <div className="w-14 h-14 rounded-full bg-[hsl(var(--gold))]/10 flex items-center justify-center">
                  <Compass className="w-7 h-7 text-[hsl(var(--gold))]" />
                </div>
                <h3 className={`text-2xl md:text-3xl text-[hsl(var(--olive))] ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                  {t("aboutPage.missionVision.vision.title")}
                </h3>
                <p className={`text-lg text-[hsl(var(--gold))] ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                  {t("aboutPage.missionVision.vision.tagline")}
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  {t("aboutPage.missionVision.vision.description")}
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        <OurServices />

        {/* Founder Section */}
        <section className="py-10 md:py-14 bg-[hsl(var(--cream))]">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center max-w-6xl mx-auto">
              <RevealOnScroll className="order-2 lg:order-1">
                <div className="rounded-2xl overflow-hidden shadow-luxury aspect-[4/3]">
                  <img
                    src={founderPhoto}
                    alt="Samer Al Helwani, Founder of MR. PROPERTY"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    decoding="async"
                  />
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={150} className="order-1 lg:order-2 space-y-4">
                <h2 className={`text-3xl md:text-4xl text-[hsl(var(--olive))] ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                  {t("aboutPage.founder.title")}
                </h2>
                <div className="w-16 h-1 bg-[hsl(var(--gold))]" />
                <p className="text-muted-foreground leading-relaxed">
                  {t("aboutPage.founder.description")}
                </p>
              </RevealOnScroll>
            </div>
          </div>
        </section>

        {/* Principles Section */}
        <section className="py-10 md:py-14 bg-background pt-0">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className={`text-4xl md:text-5xl lg:text-6xl mb-8 text-[hsl(var(--olive))] ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                {t("aboutPage.principles.title")}
              </h2>
              <div className="w-16 h-1 bg-[hsl(var(--gold))] mx-auto" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6 max-w-7xl mx-auto">
              {principles.map((principle, index) => {
                const Icon = principle.icon;
                return (
                  <RevealOnScroll key={principle.title} delay={index * 100} className="p-6 rounded-2xl shadow-luxury hover:shadow-xl transition-shadow duration-500 bg-[hsl(var(--card))] border border-[hsl(var(--border))] h-full">
                    <div className="w-14 h-14 rounded-full bg-[hsl(var(--gold))]/10 flex items-center justify-center mb-5">
                      <Icon className="w-7 h-7 text-[hsl(var(--gold))]" />
                    </div>
                    <h3 className={`text-xl mb-3 text-[hsl(var(--olive))] ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                      {principle.title}
                    </h3>
                    <p className="leading-relaxed text-sm text-[hsl(var(--muted-foreground))]">
                      {principle.description}
                    </p>
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
      
      {/* Video Modal */}
      <Dialog open={isVideoOpen} onOpenChange={setIsVideoOpen}>
        <DialogContent className="max-w-4xl w-full p-0 overflow-hidden bg-black border-0">
          <div className="relative w-full" style={{
          paddingBottom: '56.25%'
        }}>
            <iframe className="absolute top-0 left-0 w-full h-full" src="https://www.youtube-nocookie.com/embed/XlsrqagN3Kk?autoplay=1" title="Property Vision Video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        </DialogContent>
      </Dialog>
    </div>;
};
export default About;