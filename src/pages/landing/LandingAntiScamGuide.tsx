import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { useLanding } from "./LandingContext";
import guidePage1 from "@/assets/guide-page1.webp";
import guidePage2 from "@/assets/guide-page2.webp";
import guidePage3 from "@/assets/guide-page3.webp";

const LandingAntiScamGuide = () => {
  const { t, scrollToForm } = useLanding();
  const header = useInView(0.15);
  const content = useInView(0.15);

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div ref={header.ref} className={`text-center mb-12 transition-all duration-700 ${header.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground italic leading-tight">
            {t("guideTitle1")} <span className="text-gold">{t("guideTitle1Bold")}</span> {t("guideTitle2")}
          </h2>
          <h3 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-primary-foreground italic mt-2">
            {t("guideTitle3")} <span className="text-gold">{t("guideTitle3Bold")}</span>
          </h3>
          <p className="text-base sm:text-lg md:text-xl text-primary-foreground/80 italic mt-3 md:mt-4">
            {t("guideSubtitle1")} <span className="text-gold underline font-semibold">{t("guideSubtitle1Bold")}</span> {t("guideSubtitle1End")}
          </p>
        </div>

        <div ref={content.ref} className={`flex flex-col md:flex-row items-center gap-10 md:gap-16 transition-all duration-700 delay-200 ${content.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex-1 flex justify-center">
            <div className="relative w-[280px] h-[350px] sm:w-[320px] sm:h-[400px] md:w-[360px] md:h-[480px]">
              <img src={guidePage2} alt="Anti-Scam Guide - Simple Filter" className="absolute top-0 left-0 w-[70%] rounded-lg shadow-2xl rotate-[-6deg] z-10" loading="lazy" />
              <img src={guidePage3} alt="Anti-Scam Guide - What Buyers Get Wrong" className="absolute top-6 left-[10%] w-[70%] rounded-lg shadow-2xl rotate-[-2deg] z-20" loading="lazy" />
              <img src={guidePage1} alt="Anti-Scam Guide Cover" className="absolute top-12 left-[22%] w-[70%] rounded-lg shadow-2xl rotate-[3deg] z-30" loading="lazy" />
            </div>
          </div>
          <div className="flex-1 space-y-6 text-center md:text-start">
            <p className="text-base sm:text-xl md:text-2xl text-primary-foreground/90 italic leading-relaxed">
              {t("guideDesc1")} <strong className="text-gold">{t("guideDesc1Bold")}</strong>
            </p>
            <p className="text-base sm:text-xl md:text-2xl text-primary-foreground/90 italic leading-relaxed">
              {t("guideDesc2")} <strong className="text-gold">{t("guideDesc2Bold")}</strong>
            </p>
            <div className="pt-4">
              <Button onClick={scrollToForm} className="bg-gold hover:bg-gold/90 text-primary font-bold text-lg px-8 py-6 rounded-md tracking-wide">
                {t("guideCta")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingAntiScamGuide;
