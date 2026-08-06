import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useLanding } from "./LandingContext";
import heroDubai from "@/assets/hero-dubai-optimized.webp";
import heroIstanbul1 from "@/assets/hero-istanbul-1-optimized.webp";
import heroVilla from "@/assets/hero-villa.webp";
import videoThumb from "@/assets/about-vision-video.webp";

const heroImages = [heroDubai, heroIstanbul1, heroVilla];

const LandingHero = () => {
  const { t, isRtl, scrollToForm } = useLanding();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [videoPlaying, setVideoPlaying] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {heroImages.map((image, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentImageIndex ? "opacity-100" : "opacity-0"}`}
        >
          <img
            src={image}
            alt=""
            className="absolute inset-0 w-full h-full object-cover"
            loading={index === 0 ? "eager" : "lazy"}
            fetchPriority={index === 0 ? "high" : "low"}
            width={1920}
            height={1080}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/85 via-primary/70 to-primary/90" />
        </div>
      ))}

      <div className="relative z-10 container mx-auto px-4 text-center max-w-5xl">
        <div className="pt-16 sm:pt-0">
          <h1
            className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl text-primary-foreground mb-3 md:mb-4 leading-tight animate-fade-in ${isRtl ? "font-arabic" : "font-serif"}`}
          >
            <span className="block">
              {t("heroTitle1")} <span className="text-gold font-bold uppercase">{t("heroRisk")}</span>{" "}
              {t("heroTitle2")}
            </span>
            <span className="block">
              {t("heroTitle2b")} <span className="text-gold font-bold uppercase">{t("heroMarket")}</span>{" "}
              {t("heroTitle3")} <span className="text-gold font-bold uppercase">{t("heroAdvice")}</span>
            </span>
          </h1>

          <p
            className="text-base sm:text-xl md:text-2xl lg:text-3xl text-primary-foreground/90 mb-6 md:mb-10 max-w-3xl mx-auto animate-fade-in"
            style={{ animationDelay: "0.2s", animationFillMode: "both" }}
          >
            {t("heroSubtitle1")} <span className="text-gold font-bold uppercase">{t("heroClarity")}</span>{" "}
            {t("heroSubtitle2")} <span className="text-gold font-bold uppercase">{t("heroThreeYs")}</span>{" "}
            {t("heroSubtitle3")}
          </p>

          <div
            className="max-w-2xl mx-auto mb-6 md:mb-10 rounded-xl overflow-hidden shadow-luxury border-2 border-gold/30 animate-fade-in"
            style={{ animationDelay: "0.4s", animationFillMode: "both" }}
          >
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              {videoPlaying ? (
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube-nocookie.com/embed/XlsrqagN3Kk?autoplay=1&rel=0&modestbranding=1"
                  title="The Three Y's"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <button
                  onClick={() => setVideoPlaying(true)}
                  className="absolute inset-0 w-full h-full cursor-pointer group"
                  aria-label="Play video: The Three Y's"
                >
                  <img
                    src={videoThumb}
                    alt="The Three Y's"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-primary/40 group-hover:bg-primary/50 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold/90 backdrop-blur-sm flex items-center justify-center group-hover:bg-gold group-hover:scale-110 transition-all duration-300 shadow-[0_0_40px_rgba(212,175,55,0.4)]">
                      <Play className="w-9 h-9 md:w-11 md:h-11 text-white ml-1 drop-shadow-lg" fill="white" />
                    </div>
                  </div>
                </button>
              )}
            </div>
          </div>

          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-gold text-white hover:bg-gold/90 text-base md:text-lg px-10 py-6 rounded-lg shadow-luxury hover:scale-105 transition-all duration-300 uppercase tracking-wider font-bold animate-fade-in"
            style={{ animationDelay: "0.6s", animationFillMode: "both" }}
          >
            {t("heroCta")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingHero;
