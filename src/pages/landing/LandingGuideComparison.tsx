import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { useLanding } from "./LandingContext";

const XIcon = () => (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
    <path d="M6 18L18 6M6 6l12 12" />
  </svg>
);

const CheckIcon = () => (
  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" strokeWidth={3} viewBox="0 0 24 24">
    <path d="M5 13l4 4L19 7" />
  </svg>
);

const LandingGuideComparison = () => {
  const { t, scrollToForm } = useLanding();
  const section = useInView(0.15);

  return (
    <section className="py-20 bg-cream relative overflow-hidden">
      <div ref={section.ref} className={`max-w-5xl mx-auto px-4 sm:px-6 transition-all duration-700 ${section.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-destructive mb-6 tracking-wide">{t("guideWithout")}</h3>
            <div className="bg-gold/40 rounded-2xl p-6 md:p-8 space-y-5">
              {["guideWithout1", "guideWithout2", "guideWithout3"].map((key) => (
                <div key={key} className="flex items-center gap-3 text-start">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-destructive flex items-center justify-center"><XIcon /></span>
                  <span className="text-primary font-semibold text-base md:text-lg">{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="text-center">
            <h3 className="text-2xl md:text-3xl font-bold text-green-600 mb-6 tracking-wide">{t("guideWith")}</h3>
            <div className="bg-gold/40 rounded-2xl p-6 md:p-8 space-y-5">
              {["guideWith1", "guideWith2", "guideWith3"].map((key) => (
                <div key={key} className="flex items-center gap-3 text-start">
                  <span className="flex-shrink-0 w-7 h-7 rounded-full bg-green-600 flex items-center justify-center"><CheckIcon /></span>
                  <span className="text-primary font-semibold text-base md:text-lg">{t(key)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-center mt-12">
          <Button onClick={scrollToForm} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold text-lg px-10 py-6 rounded-md tracking-wide border-2 border-gold/30">
            {t("guideComparisonCta")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingGuideComparison;
