import { useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useLanding } from "./LandingContext";

const faqItems = [
  { q: "faqQ1", a: "faqA1" },
  { q: "faqQ2", a: "faqA2" },
  { q: "faqQ3", a: "faqA3" },
];

const LandingFAQ = () => {
  const { t, isRtl } = useLanding();
  const section = useInView(0.15);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const font = isRtl ? "font-arabic" : "font-serif";

  return (
    <section className="py-20 md:py-28 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-3xl">
        <div ref={section.ref} className={`transition-all duration-700 ${section.isInView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="text-center mb-12">
            <h2 className={`text-2xl md:text-3xl lg:text-4xl font-black text-primary-foreground leading-tight tracking-wide ${font}`}>
              {t("faqTitle1")}
              <br />
              {t("faqTitle2")} <span className="text-gold">{t("faqTitle2Bold")}</span> {t("faqTitle3")}
            </h2>
          </div>

          <div className="space-y-4">
            {faqItems.map((item, idx) => (
              <div key={idx}>
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className={`w-full text-center px-6 py-4 rounded-lg font-semibold text-base md:text-lg transition-all duration-300 ${
                    openFaq === idx ? 'bg-gold text-primary' : 'bg-gold/70 text-primary hover:bg-gold/90'
                  } ${font}`}
                >
                  {t(item.q)}
                </button>
                <div className={`overflow-hidden transition-all duration-500 ${openFaq === idx ? 'max-h-96 opacity-100 mt-3' : 'max-h-0 opacity-0'}`}>
                  <div className={`bg-primary-foreground/10 backdrop-blur-sm rounded-lg p-5 md:p-6 text-center ${font}`}>
                    {t(item.a).split('\n').map((line, i) => (
                      <p key={i} className="text-primary-foreground text-sm md:text-base leading-relaxed mb-2 last:mb-0">
                        {line}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingFAQ;
