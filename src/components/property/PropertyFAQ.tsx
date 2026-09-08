import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronDown } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

const PropertyFAQ = () => {
  const { t, i18n } = useTranslation();
  const [openIdx, setOpenIdx] = useState<number | null>(0);
  const isRtl = i18n.language === "ar";
  const font = isRtl ? "font-arabic" : "font-serif";

  const faqs = (t("propertyDetail.faqs", { returnObjects: true }) as FAQItem[]) || [];

  return (
    <section className="py-8 md:py-10 border-t border-border">
      <h2 className={`text-xl md:text-2xl mb-6 text-foreground ${font}`}>
        {t("propertyDetail.faqTitle")}
      </h2>
      <div className="border-t border-border">
        {faqs.map((item, idx) => {
          const open = openIdx === idx;
          return (
            <div key={idx} className="border-b border-border">
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : idx)}
                className={`w-full flex items-center justify-between gap-4 py-5 text-sm sm:text-base transition-colors text-foreground ${
                  isRtl ? "text-right" : "text-left"
                }`}
              >
                <span className={font}>{item.q}</span>
                <ChevronDown
                  className={`h-4 w-4 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p
                    className={`pb-5 text-sm sm:text-base leading-relaxed text-muted-foreground ${font} ${
                      isRtl ? "text-right" : "text-left"
                    }`}
                  >
                    {item.a}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default PropertyFAQ;
