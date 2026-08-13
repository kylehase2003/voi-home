import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import RevealOnScroll from "@/components/RevealOnScroll";

interface Stat {
  value: number;
  decimals?: number;
  suffix?: string;
  label: string;
}

interface StatsOverlayProps {
  image: string;
  title: string;
  description: string;
  stats: Stat[];
}

const StatsOverlay = ({ image, title, description, stats }: StatsOverlayProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [visible, setVisible] = useState(false);
  const [counts, setCounts] = useState(stats.map(() => 0));
  const ref = useRef<HTMLDivElement | null>(null);

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
    const duration = 1400;
    const start = performance.now();
    let frame: number;
    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      setCounts(stats.map((s) => s.value * progress));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [visible, stats]);

  return (
    <div ref={ref} className="relative min-h-[100vh] flex items-center justify-center overflow-hidden">
      <img src={image} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 40%" }} />
      <div className="absolute inset-0 bg-black/50" />
      <div className="relative z-10 w-full px-6 md:px-14 py-24 flex flex-col items-center text-center">
        <RevealOnScroll className="max-w-[540px] mb-16">
          <h2 className={`text-3xl md:text-5xl leading-[1.08] tracking-[-2px] text-white mb-4 ${isRTL ? "font-arabic" : "font-serif"}`}>
            {title}
          </h2>
          <p className="text-base text-white/70 leading-[1.65]">{description}</p>
        </RevealOnScroll>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 w-full max-w-3xl pt-10 border-t border-white/15">
          {stats.map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl md:text-5xl font-medium tracking-[-2px] text-white mb-1">
                {counts[i].toFixed(stat.decimals ?? 0)}
                {stat.suffix}
              </div>
              <div className="text-[13px] text-white/55">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsOverlay;
