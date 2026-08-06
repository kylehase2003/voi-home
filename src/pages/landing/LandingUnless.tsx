import { useInView } from "@/hooks/useInView";
import { useLanding } from "./LandingContext";
import stickyNoteQuestions from "@/assets/sticky-note-questions.webp";
import stickyNoteQuestionsAr from "@/assets/sticky-note-questions-ar.webp";

const LandingUnless = () => {
  const { t, isRtl } = useLanding();
  const section = useInView(0.15);
  const line1 = useInView(0.3);
  const line2 = useInView(0.3);
  const line3 = useInView(0.3);
  const line4 = useInView(0.3);
  const font = isRtl ? "font-arabic" : "font-serif";

  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-primary" />
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="flex flex-col md:flex-row items-start gap-8 md:gap-16">
          <div
            ref={section.ref}
            className={`flex-shrink-0 w-full md:w-[420px] transition-all duration-700 ${section.isInView ? "opacity-100 translate-x-0 rotate-0" : "opacity-0 -translate-x-12 -rotate-3"}`}
          >
            <img
              src={isRtl ? stickyNoteQuestionsAr : stickyNoteQuestions}
              alt="Haven't hit the button? Still have questions?"
              className="w-full max-w-[420px] drop-shadow-xl"
              loading="lazy"
            />
          </div>

          <div
            className={`flex-1 flex flex-col justify-center gap-6 md:gap-8 pt-4 md:pt-12 ${isRtl ? "items-start" : "items-end md:items-center"}`}
          >
            {[
              { ref: line1, view: line1.isInView, delay: "delay-100", content: t("unlessLine1") },
              {
                ref: line2,
                view: line2.isInView,
                delay: "delay-200",
                content: (
                  <>
                    {t("unlessLine2")} <span className="text-gold">{t("unlessLine2Bold")}</span> {t("unlessLine2End")}
                  </>
                ),
              },
              {
                ref: line3,
                view: line3.isInView,
                delay: "delay-300",
                content: (
                  <>
                    {t("unlessLine3")} <span className="text-gold">{t("unlessLine3Bold")}</span>
                  </>
                ),
                extra: isRtl ? "" : "md:self-end",
              },
              { ref: line4, view: line4.isInView, delay: "delay-[400ms]", content: t("unlessLine4") },
            ].map((item, idx) => (
              <div
                key={idx}
                ref={item.ref.ref}
                className={`transition-all duration-600 ${item.delay} ${item.extra || ""} ${item.view ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}
              >
                <p className={`text-lg sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground tracking-wide ${font}`}>
                  {item.content}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingUnless;
