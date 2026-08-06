import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { useLanding } from "./LandingContext";
import processFlowchart from "@/assets/process-flowchart.webp";
import processFlowchartAr from "@/assets/process-flowchart-ar.webp";

const LandingProcess = () => {
  const { t, isRtl, scrollToForm } = useLanding();
  const header = useInView(0.2);
  const flow = useInView(0.1);
  const font = isRtl ? "font-arabic" : "font-serif";

  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div ref={header.ref} className={`text-center mb-16 transition-all duration-700 ${header.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className={`text-3xl md:text-5xl text-primary-foreground mb-4 italic leading-tight ${font}`}>
            {t("processTitle1")} <span className="text-gold font-bold">{t("processTitle2")}</span>{" "}
            {t("processTitle3")} <span className="text-gold font-bold">{t("processTitle4")}</span>
          </h2>
          <p className={`text-lg md:text-xl text-primary-foreground/80 italic ${font}`}>
            {t("processSubtitle1")} <span className="text-gold font-bold uppercase">{t("processSubtitle2")}</span>
          </p>
        </div>

        <div ref={flow.ref} className={`flex flex-col items-center gap-8 transition-all duration-1000 delay-200 ${flow.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}`}>
          <img
            src={isRtl ? processFlowchartAr : processFlowchart}
            alt="Process flowchart showing steps from consultation to citizenship"
            className="w-full max-w-4xl mx-auto"
            loading="lazy"
            width={1000}
            height={1000}
          />
          <div className="my-6">
            <Button
              onClick={scrollToForm}
              size="lg"
              className="bg-destructive text-white hover:bg-destructive/90 text-base md:text-lg px-10 py-6 rounded-lg uppercase tracking-wider font-bold shadow-lg"
            >
              {t("processCtaBtn")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingProcess;
