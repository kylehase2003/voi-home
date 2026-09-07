import { useEffect, useRef, useState } from "react";

interface Stat {
  value: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

interface StatBandProps {
  stats: Stat[];
}

// A plain, light number band - no photo, no overlay. The counters are the
// only thing moving; everything else about the section stays quiet.
const StatBand = ({ stats }: StatBandProps) => {
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
      { threshold: 0.4 },
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
    <section ref={ref} className="bg-background border-y border-border">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 sm:grid-cols-3 divide-y sm:divide-y-0 sm:divide-x divide-border">
          {stats.map((stat, i) => (
            <div key={i} className="text-center py-10 sm:py-16">
              <div className="text-4xl md:text-6xl font-serif tracking-[-1.5px] text-foreground mb-2">
                {stat.prefix}
                {counts[i].toFixed(stat.decimals ?? 0)}
                {stat.suffix}
              </div>
              <div className="text-xs md:text-sm uppercase tracking-[1.5px] text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatBand;
