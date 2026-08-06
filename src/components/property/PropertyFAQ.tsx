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
    <div className="mb-12 border border-border rounded-lg p-4 sm:p-8 bg-background">
      <h2 className={`text-2xl sm:text-3xl mb-6 text-primary ${font}`}>
        {t("propertyDetail.faqTitle")}
      </h2>
      <div className="space-y-3">
        {faqs.map((item, idx) => {
          const open = openIdx === idx;
          return (
            <div key={idx} className="border border-border rounded-lg overflow-hidden bg-muted/30">
              <button
                type="button"
                onClick={() => setOpenIdx(open ? null : idx)}
                className={`w-full flex items-center justify-between gap-4 px-4 sm:px-6 py-4 text-left font-semibold text-sm sm:text-base transition-colors hover:bg-muted/60 ${
                  open ? "bg-gold/20 text-primary" : "text-card-foreground"
                } ${isRtl ? "text-right" : "text-left"}`}
              >
                <span className={font}>{item.q}</span>
                <ChevronDown
                  className={`h-5 w-5 flex-shrink-0 transition-transform duration-300 ${open ? "rotate-180" : ""}`}
                />
              </button>
              <div
                className={`grid transition-all duration-300 ease-in-out ${
                  open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <p
                    className={`px-4 sm:px-6 pb-4 pt-1 text-sm sm:text-base leading-relaxed text-muted-foreground ${font} ${
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
    </div>
  );
};

export default PropertyFAQ;
