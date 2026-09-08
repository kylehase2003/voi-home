import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Property } from "@/types/property";

interface InvestmentReturnsProps {
  property: Property;
}

const InvestmentReturns = ({ property }: InvestmentReturnsProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  const values = [
    property.investment_return_1y ?? null,
    property.investment_return_3y ?? null,
    property.investment_return_5y ?? null,
  ];
  const [counts, setCounts] = useState(values.map(() => 0));

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible) return;
    const duration = 1200;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCounts(values.map((v) => (v ?? 0) * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const hasData = property.investment_return_1y || property.investment_return_3y || property.investment_return_5y;
  if (!hasData) return null;

  const labels = [t("propertyDetail.year1"), t("propertyDetail.years3"), t("propertyDetail.years5")];

  return (
    <section ref={ref} className="py-8 md:py-10 border-t border-border">
      <h2 className={`text-xl md:text-2xl mb-6 text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}>
        {t("propertyDetail.numbersThatMatter")}
      </h2>
      <div className="grid grid-cols-3 divide-x divide-border border-y border-border">
        {values.map((value, i) => (
          <div key={i} className="text-center py-6 px-2">
            <p className="text-xs uppercase tracking-[1px] text-muted-foreground mb-2">{labels[i]}</p>
            <p className="text-2xl md:text-4xl font-serif tracking-[-1px] text-foreground">
              {value ? `${counts[i].toFixed(1)}%` : "-"}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default InvestmentReturns;
