import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import heroIstanbul1 from "@/assets/hero-istanbul-1-optimized.webp";
import { COUNTRIES, TURKIYE_CITIES, getDistrictsForCity } from "@/constants/property";
import { useFilterOptions } from "@/hooks/useFilterOptions";

// Shared styling that strips the default boxed look off form controls so they
// read as segments of one continuous dock rather than six separate inputs.
const fieldTriggerClass =
  "h-auto border-0 bg-transparent px-0 py-0 text-sm font-medium text-foreground shadow-none ring-offset-0 focus:ring-0 focus:ring-offset-0 [&>span]:line-clamp-1";
const fieldLabelClass = "block text-[10px] font-semibold uppercase tracking-wider text-muted-foreground mb-1";

const HeroSection = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();

  // Filter state
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [layout, setLayout] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Use the same filter options hook as the Properties page
  const { filterOptions } = useFilterOptions(country);

  // Local state for districts (based on country/city selection)
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [customCities, setCustomCities] = useState<string[]>([]);

  // Load custom cities from localStorage
  useEffect(() => {
    const storedCustomCities = JSON.parse(localStorage.getItem('property_custom_cities') || '[]');
    setCustomCities(storedCustomCities);
  }, []);

  // Reset city and district when country changes
  useEffect(() => {
    setCity("");
    setDistrict("");
    setAvailableDistricts([]);
  }, [country]);

  // Load districts when city changes (or country for Dubai)
  useEffect(() => {
    setDistrict("");

    if (country === 'dubai') {
      const defaultDistricts = [...getDistrictsForCity('dubai', '')];
      const customDistricts = JSON.parse(localStorage.getItem('property_custom_districts') || '[]');
      setAvailableDistricts([...defaultDistricts, ...customDistricts]);
    } else if (country === 'turkiye' && city) {
      const defaultDistricts = [...getDistrictsForCity('turkiye', city)];
      const customDistricts = JSON.parse(localStorage.getItem('property_custom_districts') || '[]');
      setAvailableDistricts([...defaultDistricts, ...customDistricts]);
    } else {
      setAvailableDistricts([]);
    }
  }, [country, city]);

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (country) params.append("country", country);
    if (city) params.append("city", city);
    if (district) params.append("district", district);
    if (propertyType) params.append("property_type", propertyType);
    if (layout) params.append("layout", layout);
    if (minPrice) params.append("min_price", minPrice);
    if (maxPrice) params.append("max_price", maxPrice);
    navigate(`/properties?${params.toString()}`);
  };

  // Get city options for Turkey (predefined + custom)
  const getCityOptions = () => {
    const predefinedCities = TURKIYE_CITIES.map(c => ({ value: c.value, label: c.label }));
    const customCityOptions = customCities.map(c => ({ value: c.toLowerCase().replace(/\s+/g, '-'), label: c }));
    return [...predefinedCities, ...customCityOptions];
  };

  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollToNext = () => {
    const next = sectionRef.current?.nextElementSibling;
    next?.scrollIntoView({ behavior: "smooth" });
  };

  const isRTL = i18n.language === "ar";
  const titleLines = t("hero.title").split("\n");
  const stagger = (step: number) => ({ animationDelay: `${0.15 + step * 0.14}s` });

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[95vh] flex items-center pt-56 pb-28 md:pt-36 md:pb-32"
    >
      {/* Background layer - clipped separately so the Ken Burns zoom never leaks past the section */}
      <div className="absolute inset-0 overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover animate-kenburns [animation-fill-mode:both] motion-reduce:animate-none"
          src="/video/hero-background.mp4"
          poster={heroIstanbul1}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
        />
        {/* Asymmetric cinematic grade: darkest behind the copy, clearer toward the far edge */}
        <div
          className={`absolute inset-0 ${
            isRTL
              ? "bg-gradient-to-l from-black/92 via-black/55 to-black/25"
              : "bg-gradient-to-r from-black/92 via-black/55 to-black/25"
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/40" />
        {/* Filmic grain for texture/depth */}
        <div
          className="absolute inset-0 opacity-[0.05] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <div className={`max-w-3xl ${isRTL ? "mr-0 ml-auto text-right" : "ml-0 text-left"}`}>
          {/* Eyebrow */}
          <div
            style={stagger(0)}
            className="mb-4 md:mb-6 flex items-center gap-3 animate-fade-in [animation-fill-mode:both]"
          >
            <span className="h-px w-8 md:w-10 bg-gold" />
            <span className="text-[11px] md:text-xs font-semibold uppercase tracking-[0.25em] text-primary-foreground/80">
              {t("hero.eyebrow")}
            </span>
          </div>

          {/* Headline */}
          <div role="heading" aria-level={2} className={isRTL ? "font-arabic" : ""}>
            {titleLines.map((line, i) => (
              <span
                key={i}
                style={stagger(i + 1)}
                className={`block text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-primary-foreground leading-[1.05] tracking-tight animate-slide-up [animation-fill-mode:both] ${
                  isRTL ? "" : i === 0 ? "font-serif font-bold" : "font-sans italic font-normal text-primary-foreground/90"
                }`}
              >
                {line}
              </span>
            ))}
          </div>

          {/* Subtitle */}
          <p
            style={stagger(titleLines.length + 1)}
            className="mt-5 md:mt-6 max-w-xl text-base md:text-lg text-primary-foreground/70 leading-relaxed animate-fade-in [animation-fill-mode:both]"
          >
            {t("hero.subtitle")}
          </p>

          {/* CTAs */}
          <div
            style={stagger(titleLines.length + 2)}
            className={`mt-8 md:mt-10 flex flex-wrap items-center gap-4 animate-fade-in [animation-fill-mode:both] ${isRTL ? "justify-end" : "justify-start"}`}
          >
            <Button
              onClick={() => navigate("/properties")}
              className="group bg-gold hover:bg-gold/90 text-white px-7 py-6 text-base rounded-full transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_34px_-10px_hsl(var(--gold)/0.6)]"
            >
              {t("hero.exploreProperties")}
              <ArrowRight
                className={`h-4 w-4 transition-transform duration-300 ${
                  isRTL ? "mr-2 rotate-180 group-hover:-translate-x-1" : "ml-2 group-hover:translate-x-1"
                }`}
              />
            </Button>
            <Button
              onClick={() => navigate("/contact")}
              variant="outline"
              className="px-7 py-6 text-base rounded-full border-primary-foreground/30 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:border-primary-foreground/50 transition-all duration-300 hover:-translate-y-0.5"
            >
              {t("hero.bookConsultation")}
            </Button>
          </div>
        </div>

        {/* Floating search dock - overlaps into the next section on desktop for a layered, modern feel */}
        <div
          style={stagger(titleLines.length + 3)}
          className="relative z-20 mt-12 md:mt-16 md:-mb-20 animate-fade-in-scale [animation-fill-mode:both]"
        >
          <div className="bg-card rounded-2xl shadow-2xl border border-black/5 flex flex-col md:flex-row md:items-stretch divide-y md:divide-y-0 divide-border md:divide-x overflow-hidden">
            {/* Country */}
            <div className="flex-1 min-w-0 px-5 py-3 md:py-4">
              <label className={fieldLabelClass}>{t("hero.selectCountry")}</label>
              <Select value={country} onValueChange={setCountry}>
                <SelectTrigger className={fieldTriggerClass} aria-label={t("hero.selectCountry")}>
                  <SelectValue placeholder={t("hero.selectCountry")} />
                </SelectTrigger>
                <SelectContent className="z-[60] bg-background">
                  {COUNTRIES.map(c => (
                    <SelectItem key={c.value} value={c.value}>
                      {c.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* City Select - Only show for Turkey */}
            {country === 'turkiye' ? (
              <div className="flex-1 min-w-0 px-5 py-3 md:py-4">
                <label className={fieldLabelClass}>{t("hero.selectCity")}</label>
                <Select value={city} onValueChange={setCity}>
                  <SelectTrigger className={fieldTriggerClass} aria-label={t("hero.selectCity")}>
                    <SelectValue placeholder={t("hero.selectCity")} />
                  </SelectTrigger>
                  <SelectContent className="z-[60] bg-background max-h-[300px]">
                    {getCityOptions().map(c => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ) : (
              /* District Select - Show when country is Dubai or when Turkey city is selected */
              <div className="flex-1 min-w-0 px-5 py-3 md:py-4">
                <label className={fieldLabelClass}>{t("hero.selectDistrict")}</label>
                <Select
                  value={district}
                  onValueChange={setDistrict}
                  disabled={!country || (country === 'turkiye' && !city) || availableDistricts.length === 0}
                >
                  <SelectTrigger className={fieldTriggerClass} aria-label={t("hero.selectDistrict")}>
                    <SelectValue placeholder={t("hero.selectDistrict")} />
                  </SelectTrigger>
                  <SelectContent className="z-[60] bg-background max-h-[300px]">
                    {availableDistricts.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* District Select for Turkey (when city is selected) */}
            {country === 'turkiye' && (
              <div className="flex-1 min-w-0 px-5 py-3 md:py-4">
                <label className={fieldLabelClass}>{t("hero.selectDistrict")}</label>
                <Select
                  value={district}
                  onValueChange={setDistrict}
                  disabled={!city || availableDistricts.length === 0}
                >
                  <SelectTrigger className={fieldTriggerClass} aria-label={t("hero.selectDistrict")}>
                    <SelectValue placeholder={t("hero.selectDistrict")} />
                  </SelectTrigger>
                  <SelectContent className="z-[60] bg-background max-h-[300px]">
                    {availableDistricts.map(option => (
                      <SelectItem key={option} value={option}>
                        {option}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            <div className="flex-1 min-w-0 px-5 py-3 md:py-4">
              <label className={fieldLabelClass}>{t("hero.selectPropertyType")}</label>
              <Select value={propertyType} onValueChange={setPropertyType}>
                <SelectTrigger className={fieldTriggerClass} aria-label={t("hero.selectPropertyType")}>
                  <SelectValue placeholder={t("hero.selectPropertyType")} />
                </SelectTrigger>
                <SelectContent className="z-[60] bg-background">
                  {filterOptions.propertyTypes.map(type => (
                    <SelectItem key={type.value} value={type.value}>
                      {type.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-1 min-w-0 px-5 py-3 md:py-4">
              <label className={fieldLabelClass}>{t("hero.selectLayout")}</label>
              <Select value={layout} onValueChange={setLayout}>
                <SelectTrigger className={fieldTriggerClass} aria-label={t("hero.selectLayout")}>
                  <SelectValue placeholder={t("hero.selectLayout")} />
                </SelectTrigger>
                <SelectContent className="z-[60] bg-background">
                  {filterOptions.layouts.map(l => (
                    <SelectItem key={l.value} value={l.value}>
                      {l.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex-[1.4] min-w-0 px-5 py-3 md:py-4">
              <label className={fieldLabelClass}>
                {t("hero.minPrice")} / {t("hero.maxPrice")}
              </label>
              <div className="flex items-center gap-2">
                <Input
                  type="number"
                  placeholder={t("hero.minPrice")}
                  aria-label={t("hero.minPrice")}
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  className="h-auto border-0 bg-transparent px-0 py-0 text-sm font-medium shadow-none ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-w-0"
                  step="10000"
                  min="0"
                />
                <span className="text-muted-foreground/50">–</span>
                <Input
                  type="number"
                  placeholder={t("hero.maxPrice")}
                  aria-label={t("hero.maxPrice")}
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  className="h-auto border-0 bg-transparent px-0 py-0 text-sm font-medium shadow-none ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-w-0"
                  step="10000"
                  min="0"
                />
              </div>
            </div>

            {/* Submit */}
            <div className="flex items-center justify-center p-3 md:p-4 bg-primary/[0.02]">
              <Button
                onClick={handleSearch}
                size="icon"
                aria-label={t("hero.search")}
                className="group h-12 w-12 md:h-14 md:w-14 rounded-full bg-gold hover:bg-gold/90 text-white shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-[0_10px_30px_-8px_hsl(var(--gold)/0.6)]"
              >
                <Search className="h-5 w-5 transition-transform duration-300 group-hover:scale-110" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical scroll cue, right edge */}
      <button
        type="button"
        onClick={scrollToNext}
        aria-label={t("hero.scroll")}
        style={stagger(titleLines.length + 4)}
        className="absolute bottom-24 md:bottom-auto md:top-1/2 md:-translate-y-1/2 right-4 md:right-6 z-10 hidden lg:flex flex-col items-center gap-3 animate-fade-in [animation-fill-mode:both] text-primary-foreground/60 hover:text-gold transition-colors duration-300"
      >
        <span className="w-1 h-1.5 rounded-full bg-current animate-[scrollMouse_2s_ease-in-out_infinite] motion-reduce:animate-none" />
        <span className="text-[10px] uppercase tracking-[0.3em] [writing-mode:vertical-rl]">
          {t("hero.scroll")}
        </span>
        <span className="h-10 w-px bg-current/40" />
      </button>
    </section>
  );
};

export default HeroSection;
