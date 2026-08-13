import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Property } from "@/types/property";

interface InvestmentReturnsProps {
  property: Property;
}

const InvestmentReturns = ({ property }: InvestmentReturnsProps) => {
  const { t } = useTranslation();
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
    <section ref={ref} className="mb-12 bg-card border border-border rounded-[20px] p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl tracking-[-0.5px] font-serif mb-6 text-foreground">
        {t("propertyDetail.numbersThatMatter")}
      </h2>
      <div className="rounded-[20px] p-4 sm:p-8 bg-primary">
        <div className="flex flex-col sm:flex-row items-center justify-around text-center gap-6 sm:gap-0">
          <div className="flex-1 w-full sm:w-auto">
            <p className="text-sm text-primary-foreground/80 mb-3">{labels[0]}</p>
            <p className="text-3xl sm:text-4xl font-bold tracking-[-1px] text-gold">
              {values[0] ? `${counts[0].toFixed(1)}%` : "-"}
            </p>
          </div>
          <div className="hidden sm:block h-24 w-px bg-gold mx-6" />
          <div className="sm:hidden w-full h-px bg-gold/30" />

          <div className="flex-1 w-full sm:w-auto">
            <p className="text-sm text-primary-foreground/80 mb-3">{labels[1]}</p>
            <p className="text-3xl sm:text-4xl font-bold tracking-[-1px] text-gold">
              {values[1] ? `${counts[1].toFixed(1)}%` : "-"}
            </p>
          </div>
          <div className="hidden sm:block h-24 w-px bg-gold mx-6" />
          <div className="sm:hidden w-full h-px bg-gold/30" />

          <div className="flex-1 w-full sm:w-auto">
            <p className="text-sm text-primary-foreground/80 mb-3">{labels[2]}</p>
            <p className="text-3xl sm:text-4xl font-bold tracking-[-1px] text-gold">
              {values[2] ? `${counts[2].toFixed(1)}%` : "-"}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentReturns;
