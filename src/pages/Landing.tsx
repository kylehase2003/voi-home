import { useState, useEffect, useCallback, useMemo } from "react";
import { translations } from "./landing/translations";
import { LandingProvider } from "./landing/LandingContext";
import type { LandingLang } from "./landing/types";
import LandingLanguageSwitcher from "./landing/LandingLanguageSwitcher";
import LandingHero from "./landing/LandingHero";
import LandingThreeYs from "./landing/LandingThreeYs";
import LandingProcess from "./landing/LandingProcess";
import LandingUnless from "./landing/LandingUnless";
import LandingCompanion from "./landing/LandingCompanion";
import LandingAntiScamGuide from "./landing/LandingAntiScamGuide";
import LandingGuideComparison from "./landing/LandingGuideComparison";
import LandingStatistics from "./landing/LandingStatistics";
import LandingTestimonials from "./landing/LandingTestimonials";
import LandingPartners from "./landing/LandingPartners";
import LandingFAQ from "./landing/LandingFAQ";

const Landing = () => {
  const [lang, setLang] = useState<LandingLang>("en");
  const isRtl = lang === "ar";

  const t = useCallback(
    (key: string) => translations[lang][key] || key,
    [lang]
  );

  const scrollToForm = useCallback(() => {
    window.dispatchEvent(new CustomEvent("open-contact-popup"));
  }, []);

  // Sync document lang/dir for Arabic font CSS rules
  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = isRtl ? "rtl" : "ltr";
    document.documentElement.style.overflowY = "scroll";
    return () => {
      const saved = localStorage.getItem("preferredLanguage") || "en";
      document.documentElement.lang = saved;
      document.documentElement.dir = saved === "ar" ? "rtl" : "ltr";
      document.documentElement.style.overflowY = "";
    };
  }, [lang, isRtl]);

  const ctx = useMemo(
    () => ({ t, isRtl, scrollToForm, lang }),
    [t, isRtl, scrollToForm, lang]
  );

  return (
    <LandingProvider value={ctx}>
      <div dir={isRtl ? "rtl" : "ltr"} className={`min-h-screen bg-background ${isRtl ? "font-arabic" : ""}`}>
        <LandingLanguageSwitcher lang={lang} setLang={setLang} />
        <LandingHero />
        <LandingThreeYs />
        <LandingProcess />
        <LandingUnless />
        <LandingCompanion />
        <LandingAntiScamGuide />
        <LandingGuideComparison />
        <LandingStatistics />
        <LandingTestimonials />
        <LandingPartners />
        <LandingFAQ />
      </div>
    </LandingProvider>
  );
};

export default Landing;
