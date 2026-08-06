import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { useLanding } from "./LandingContext";
import newspaperMockup from "@/assets/newspaper-mockup.webp";
import newspaperMockupAr from "@/assets/newspaper-mockup-ar.webp";
import newspaperStatistics from "@/assets/newspaper-statistics.webp";
import newspaperStatisticsAr from "@/assets/newspaper-statistics-ar.webp";

const LandingStatistics = () => {
  const { t, isRtl, scrollToForm } = useLanding();
  const section = useInView(0.15);
  const font = isRtl ? "font-arabic" : "font-serif";

  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        <div ref={section.ref} className={`text-center mb-12 transition-all duration-700 ${section.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className={`text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-bold text-primary-foreground tracking-wider leading-tight ${font}`}>
            {t("statsTitle1")} <span className="text-gold">{t("statsTitle1Bold")}</span>
          </h2>
          <p className={`text-base sm:text-xl md:text-2xl text-primary-foreground/80 tracking-[0.15em] mt-3 md:mt-4 ${font}`}>
            {t("statsSubtitle")}
          </p>
        </div>

        <div className={`flex justify-center mb-16 transition-all duration-700 delay-200 ${section.isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <img src={isRtl ? newspaperMockupAr : newspaperMockup} alt="Turkey's Market Statistics Newspaper" className="w-full max-w-lg drop-shadow-2xl rounded-sm" loading="lazy" />
        </div>

        <div className={`text-center mb-12 transition-all duration-700 delay-300 ${section.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h3 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground tracking-wider ${font}`}>
            {t("statsHowTitle")} <span className="text-gold font-black">{t("statsHowBold")}</span>?
          </h3>
        </div>

        <div className={`flex justify-center mb-12 transition-all duration-700 delay-400 ${section.isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
          <img src={isRtl ? newspaperStatisticsAr : newspaperStatistics} alt="Istanbul Market Statistics" className="w-full max-w-3xl drop-shadow-2xl rounded-sm" loading="lazy" />
        </div>

        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${section.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <Button onClick={scrollToForm} className="bg-destructive hover:bg-destructive/90 text-white font-bold text-lg px-10 py-6 rounded-md tracking-wide">
            {t("processCtaBtn")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingStatistics;
