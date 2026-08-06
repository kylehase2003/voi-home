import { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
const StatsSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState([0, 0, 0]);
  const sectionRef = useRef<HTMLElement>(null);
  const {
    t,
    i18n
  } = useTranslation();
  const stats = [{
    value: 1.69,
    decimals: 2,
    suffix: "M+",
    label: t('homePage.stats.propertiesSold')
  }, {
    value: 364905,
    decimals: 0,
    suffix: "",
    label: t('homePage.stats.foreignInvestment')
  }, {
    value: 29.0,
    decimals: 1,
    suffix: "%",
    label: t('homePage.stats.priceGrowth')
  }];
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        setIsVisible(true);
      }
    }, {
      threshold: 0.3
    });
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    if (!isVisible) return;
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;
    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;
      setCounts(stats.map(stat => stat.value * progress));
      if (currentStep >= steps) {
        setCounts(stats.map(stat => stat.value));
        clearInterval(timer);
      }
    }, stepDuration);
    return () => clearInterval(timer);
  }, [isVisible]);
  return <section ref={sectionRef} className="py-8 md:py-10 lg:py-12 bg-background">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="rounded-2xl md:rounded-3xl p-6 sm:p-8 md:p-10 lg:p-12 relative overflow-hidden shadow-luxury bg-olive">
          <div className="relative z-10">
            <h2 className={`text-xl sm:text-2xl md:text-3xl lg:text-4xl text-center mb-8 sm:mb-10 md:mb-12 text-white leading-tight font-normal tracking-wide ${i18n.language === 'ar' ? 'font-arabic' : 'font-sans'}`}>
              {t('stats.title').split(/(NUMBERS)/i).map((part, index) => /numbers/i.test(part) ? <span key={index} className="text-gold font-semibold">{part}</span> : <span key={index}>{part}</span>)}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-4 md:gap-8 lg:gap-12">
              {stats.map((stat, index) => <div key={index} className="text-center animate-fade-in" style={{
              animationDelay: `${index * 0.15}s`
            }}>
                  <div className="transition-all duration-300 py-3 sm:py-0">
                    <h3 className="text-4xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-sans mb-2 sm:mb-3 text-gold leading-none tracking-tight font-normal">
                      {counts[index].toLocaleString(undefined, { minimumFractionDigits: stat.decimals, maximumFractionDigits: stat.decimals })}
                      {stat.suffix}
                    </h3>

                    <p className="text-xs sm:text-sm md:text-base text-white/95 max-w-[280px] sm:max-w-none mx-auto leading-relaxed font-light px-2">
                      {stat.label}
                    </p>
                  </div>
                </div>)}
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default StatsSection;