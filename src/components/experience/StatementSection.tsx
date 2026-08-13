import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

interface StatementSectionProps {
  tag: string;
  lines: string[];
}

const StatementSection = ({ tag, lines }: StatementSectionProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const ref = useRef<HTMLDivElement | null>(null);
  const [visible, setVisible] = useState(false);

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
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="py-24 md:py-40 px-6 text-center max-w-4xl mx-auto">
      <div className="text-xs font-medium uppercase tracking-[2px] text-muted-foreground mb-10">{tag}</div>
      {lines.map((line, i) => (
        <p
          key={i}
          className={`text-3xl sm:text-4xl md:text-6xl leading-[1.08] tracking-[-1.5px] md:tracking-[-3px] text-foreground transition-all ${
            isRTL ? "font-arabic" : "font-serif"
          }`}
          style={{
            transitionDuration: "900ms",
            transitionDelay: `${i * 150}ms`,
            transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
            opacity: visible ? 1 : 0,
            filter: visible ? "blur(0)" : "blur(8px)",
            transform: visible ? "translateY(0)" : "translateY(30%)",
          }}
        >
          {line}
        </p>
      ))}
    </div>
  );
};

export default StatementSection;
