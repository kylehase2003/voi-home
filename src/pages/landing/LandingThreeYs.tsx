import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { useLanding } from "./LandingContext";
import yCard from "@/assets/y-card.png";

const LandingThreeYs = () => {
  const { t, isRtl, scrollToForm } = useLanding();
  const header = useInView(0.2);
  const card1 = useInView(0.15);
  const card2 = useInView(0.15);
  const card3 = useInView(0.15);
  const cta = useInView(0.2);
  const font = isRtl ? "font-arabic" : "font-serif";

  return (
    <section className="py-20 md:py-28 bg-cream">
      <div className="container mx-auto px-5 sm:px-6 max-w-5xl">
        {/* Header */}
        <div ref={header.ref} className={`text-center mb-16 transition-all duration-700 ${header.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className={`text-2xl sm:text-3xl md:text-5xl text-foreground mb-4 md:mb-6 leading-tight ${font}`}>
            <span className="inline-block px-4 py-2">
              {t("whySectionTitle1")} <span className="text-gold font-bold italic">{t("whySectionTitle2")}</span>
              <br />
              {t("whySectionTitle3")} <span className="text-gold font-bold italic">{t("whySectionTitle4")}</span>
            </span>
          </h2>
          <p className={`text-base sm:text-lg md:text-xl text-foreground/80 max-w-xl mx-auto italic ${font}`}>
            {t("whySectionSubtitle1")} <span className="font-bold">{t("whySectionSubtitle2")}</span>{" "}
            {t("whySectionSubtitle3")} <span className="font-bold">{t("whySectionSubtitle4")}</span>{" "}
            {t("whySectionSubtitle5")} <span className="font-bold">{t("whySectionSubtitle6")}</span>
          </p>
        </div>

        {/* Y? Card */}
        <div ref={card1.ref} className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-12 justify-around transition-all duration-700 delay-150 ${card1.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <div className="flex flex-shrink-0 w-20 h-28 md:w-28 md:h-36 items-center justify-center">
            <img src={yCard} alt="Y Card" className="w-20 md:w-28 h-auto drop-shadow-lg -rotate-[25deg]" />
          </div>
          <div className="bg-primary rounded-2xl p-6 md:p-8 text-center border-gold border-4">
            <h3 className="text-gold text-2xl md:text-3xl font-bold mb-1">{t("why1Title")}</h3>
            <p className="text-gold/80 text-base md:text-lg italic mb-4">{t("why1Subtitle")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-4 text-primary-foreground text-sm md:text-base">
              <p>{t("why1Q1")} <strong>{t("why1Q1Bold")}</strong></p>
              <p>{t("why1Q2")} <strong>{t("why1Q2Bold")}</strong></p>
              <p>{t("why1Q3")} <strong>{t("why1Q3Bold")}</strong> {t("why1Q3End")}</p>
              <p><strong>{t("why1Q4Bold")}</strong> {t("why1Q4")} <strong>{t("why1Q4Bold2")}</strong></p>
            </div>
            <p className="text-gold italic text-sm md:text-base">
              {t("why1Bottom1")} <strong>{t("why1Bottom2")}</strong> {t("why1Bottom3")} <strong>{t("why1Bottom4")}</strong>
            </p>
          </div>
        </div>

        {/* Yields Card */}
        <div ref={card2.ref} className={`flex flex-col md:flex-row-reverse items-center gap-6 md:gap-10 mb-12 justify-around transition-all duration-700 delay-300 ${card2.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
          <div className="flex relative flex-shrink-0 w-20 h-28 md:w-28 md:h-36 items-center justify-center">
            <img src={yCard} alt="Y Card" className="absolute translate-x-8 md:translate-x-12 translate-y-3 md:translate-y-4 w-20 md:w-28 h-auto drop-shadow-lg rotate-[25deg]" />
            <img src={yCard} alt="Y Card" className="absolute w-20 md:w-28 h-auto drop-shadow-lg" />
          </div>
          <div className="bg-primary rounded-2xl p-6 md:p-8 text-center border-gold border-4">
            <h3 className="text-gold text-2xl md:text-3xl font-bold mb-1">{t("why2Title")}</h3>
            <p className="text-gold/80 text-base md:text-lg italic mb-4">{t("why2Subtitle")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-1 mb-4 text-primary-foreground text-sm md:text-base">
              <div>
                <p className="font-bold">{t("why2Col1Title")}</p>
                <p className="text-primary-foreground/80">{t("why2Col1Desc")}</p>
              </div>
              <div>
                <p className="font-bold">{t("why2Col2Title")}</p>
                <p className="text-primary-foreground/80">{t("why2Col2Desc")}</p>
              </div>
            </div>
            <p className="text-gold italic text-sm md:text-base">
              {t("why2Bottom1")} <strong>{t("why2Bottom2")}</strong> {t("why2Bottom3")} <strong>{t("why2Bottom4")}</strong> {t("why2Bottom5")}
            </p>
          </div>
        </div>

        {/* YOU Card */}
        <div ref={card3.ref} className={`flex flex-col md:flex-row items-center gap-6 md:gap-10 mb-16 justify-around transition-all duration-700 delay-[450ms] ${card3.isInView ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
          <div className="flex flex-shrink-0 w-20 h-28 md:w-28 md:h-36 items-center justify-center relative">
            <img src={yCard} alt="Y Card" className="absolute -translate-x-12 md:-translate-x-16 translate-y-6 md:translate-y-8 w-20 md:w-28 h-auto drop-shadow-lg -rotate-[50deg]" />
            <img src={yCard} alt="Y Card" className="absolute -translate-x-8 md:-translate-x-12 translate-y-3 md:translate-y-4 w-20 md:w-28 h-auto drop-shadow-lg -rotate-[25deg]" />
            <img src={yCard} alt="Y Card" className="absolute w-20 md:w-28 h-auto drop-shadow-lg" />
          </div>
          <div className="bg-primary rounded-2xl p-6 md:p-8 text-center border-gold border-4">
            <h3 className="text-gold text-2xl md:text-3xl font-bold mb-1">{t("why3Title")}</h3>
            <p className="text-gold/80 text-base md:text-lg italic mb-4">{t("why3Subtitle")}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 mb-4 text-primary-foreground text-sm md:text-base">
              <p><strong>{t("why3Item1Bold")}</strong> {t("why3Item1")}</p>
              <p><strong>{t("why3Item2Bold")}</strong> {t("why3Item2")}</p>
              <p><strong>{t("why3Item3Bold")}</strong> {t("why3Item3")}</p>
              <p><strong>{t("why3Item4Bold")}</strong> {t("why3Item4")}</p>
            </div>
            <p className="text-gold italic text-sm md:text-base">
              {t("why3Bottom1")} <strong>{t("why3Bottom2")}</strong> {t("why3Bottom3")} <strong>{t("why3Bottom4")}</strong>
            </p>
          </div>
        </div>

        {/* CTA */}
        <div ref={cta.ref} className={`text-center transition-all duration-700 delay-500 ${cta.isInView ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-primary text-gold hover:bg-primary/90 text-base md:text-lg px-10 py-6 rounded-lg border-2 border-gold uppercase tracking-wider font-bold"
          >
            {t("heroCta")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingThreeYs;
