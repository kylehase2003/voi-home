import { useEffect, useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowRight, ArrowUpRight, Search } from "lucide-react";
import { COUNTRIES, TURKIYE_CITIES, getDistrictsForCity } from "@/constants/property";
import { useFilterOptions } from "@/hooks/useFilterOptions";
import heroDubai from "@/assets/hero-dubai-optimized.webp";
import heroIstanbul1 from "@/assets/hero-istanbul-1-optimized.webp";
import heroIstanbul2 from "@/assets/hero-istanbul-2-optimized.webp";
import heroIstanbul3 from "@/assets/hero-istanbul-3-optimized.webp";
import heroVilla from "@/assets/hero-villa.webp";
import apartmentModern from "@/assets/apartment-modern.jpg";
import penthouseView from "@/assets/penthouse-view.jpg";

const SATOSHI = "'Satoshi', 'General Sans', sans-serif";
const GENERAL_SANS = "'General Sans', -apple-system, sans-serif";

// Scattered final resting positions for each tile (percent of viewport, desktop).
// No rotation - the reference keeps every tile axis-aligned, just scattered by position.
const TILES = [
  { src: heroIstanbul1, top: "9%", left: "5%", w: 170, h: 135 },
  { src: apartmentModern, top: "5%", left: "80%", w: 155, h: 195 },
  { src: heroVilla, top: "42%", left: "2%", w: 190, h: 145 },
  { src: heroDubai, top: "50%", left: "84%", w: 165, h: 165 },
  { src: heroIstanbul2, top: "76%", left: "12%", w: 145, h: 185 },
  { src: penthouseView, top: "72%", left: "78%", w: 180, h: 135 },
  { src: heroIstanbul3, top: "22%", left: "20%", w: 135, h: 115 },
];

const ShatterHero = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const isRTL = i18n.language === "ar";

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const pinRef = useRef<HTMLDivElement | null>(null);
  const heroImgRef = useRef<HTMLDivElement | null>(null);
  const wordsRef = useRef<HTMLSpanElement[]>([]);
  const tileRefs = useRef<(HTMLDivElement | null)[]>([]);
  const filterRef = useRef<HTMLDivElement | null>(null);
  const statementRef = useRef<HTMLDivElement | null>(null);

  // Property filter - same fields/behavior as the homepage hero's search dock.
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [district, setDistrict] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [layout, setLayout] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const { filterOptions } = useFilterOptions(country);
  const [availableDistricts, setAvailableDistricts] = useState<string[]>([]);
  const [customCities, setCustomCities] = useState<string[]>([]);

  useEffect(() => {
    const storedCustomCities = JSON.parse(localStorage.getItem("property_custom_cities") || "[]");
    setCustomCities(storedCustomCities);
  }, []);

  useEffect(() => {
    setCity("");
    setDistrict("");
    setAvailableDistricts([]);
  }, [country]);

  useEffect(() => {
    setDistrict("");
    if (country === "dubai") {
      const defaultDistricts = [...getDistrictsForCity("dubai", "")];
      const customDistricts = JSON.parse(localStorage.getItem("property_custom_districts") || "[]");
      setAvailableDistricts([...defaultDistricts, ...customDistricts]);
    } else if (country === "turkiye" && city) {
      const defaultDistricts = [...getDistrictsForCity("turkiye", city)];
      const customDistricts = JSON.parse(localStorage.getItem("property_custom_districts") || "[]");
      setAvailableDistricts([...defaultDistricts, ...customDistricts]);
    } else {
      setAvailableDistricts([]);
    }
  }, [country, city]);

  const getCityOptions = () => {
    const predefinedCities = TURKIYE_CITIES.map((c) => ({ value: c.value, label: c.label }));
    const customCityOptions = customCities.map((c) => ({ value: c.toLowerCase().replace(/\s+/g, "-"), label: c }));
    return [...predefinedCities, ...customCityOptions];
  };

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

  const filterFieldClass =
    "h-auto border-0 bg-transparent px-0 py-0 text-sm font-medium text-white shadow-none ring-offset-0 focus:ring-0 focus:ring-offset-0 [&>span]:line-clamp-1 [&_svg]:text-white/60 [&_svg]:opacity-100";
  const filterLabelClass = "block text-[10px] font-semibold uppercase tracking-wider text-white/55 mb-1";

  const renderFilterFields = () => (
    <>
      <div className="flex-1 min-w-0 px-5 py-3">
        <label className={filterLabelClass}>{t("hero.selectCountry")}</label>
        <Select value={country} onValueChange={setCountry}>
          <SelectTrigger className={filterFieldClass} aria-label={t("hero.selectCountry")}>
            <SelectValue placeholder={t("hero.selectCountry")} />
          </SelectTrigger>
          <SelectContent className="z-[60] bg-background">
            {COUNTRIES.map((c) => (
              <SelectItem key={c.value} value={c.value}>
                {c.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {country === "turkiye" ? (
        <div className="flex-1 min-w-0 px-5 py-3">
          <label className={filterLabelClass}>{t("hero.selectCity")}</label>
          <Select value={city} onValueChange={setCity}>
            <SelectTrigger className={filterFieldClass} aria-label={t("hero.selectCity")}>
              <SelectValue placeholder={t("hero.selectCity")} />
            </SelectTrigger>
            <SelectContent className="z-[60] bg-background max-h-[300px]">
              {getCityOptions().map((c) => (
                <SelectItem key={c.value} value={c.value}>
                  {c.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      ) : (
        <div className="flex-1 min-w-0 px-5 py-3">
          <label className={filterLabelClass}>{t("hero.selectDistrict")}</label>
          <Select
            value={district}
            onValueChange={setDistrict}
            disabled={!country || (country === "turkiye" && !city) || availableDistricts.length === 0}
          >
            <SelectTrigger className={filterFieldClass} aria-label={t("hero.selectDistrict")}>
              <SelectValue placeholder={t("hero.selectDistrict")} />
            </SelectTrigger>
            <SelectContent className="z-[60] bg-background max-h-[300px]">
              {availableDistricts.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      {country === "turkiye" && (
        <div className="flex-1 min-w-0 px-5 py-3">
          <label className={filterLabelClass}>{t("hero.selectDistrict")}</label>
          <Select value={district} onValueChange={setDistrict} disabled={!city || availableDistricts.length === 0}>
            <SelectTrigger className={filterFieldClass} aria-label={t("hero.selectDistrict")}>
              <SelectValue placeholder={t("hero.selectDistrict")} />
            </SelectTrigger>
            <SelectContent className="z-[60] bg-background max-h-[300px]">
              {availableDistricts.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      )}

      <div className="flex-1 min-w-0 px-5 py-3">
        <label className={filterLabelClass}>{t("hero.selectPropertyType")}</label>
        <Select value={propertyType} onValueChange={setPropertyType}>
          <SelectTrigger className={filterFieldClass} aria-label={t("hero.selectPropertyType")}>
            <SelectValue placeholder={t("hero.selectPropertyType")} />
          </SelectTrigger>
          <SelectContent className="z-[60] bg-background">
            {filterOptions.propertyTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                {type.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-1 min-w-0 px-5 py-3">
        <label className={filterLabelClass}>{t("hero.selectLayout")}</label>
        <Select value={layout} onValueChange={setLayout}>
          <SelectTrigger className={filterFieldClass} aria-label={t("hero.selectLayout")}>
            <SelectValue placeholder={t("hero.selectLayout")} />
          </SelectTrigger>
          <SelectContent className="z-[60] bg-background">
            {filterOptions.layouts.map((l) => (
              <SelectItem key={l.value} value={l.value}>
                {l.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-[1.4] min-w-0 px-5 py-3">
        <label className={filterLabelClass}>
          {t("hero.minPrice")} / {t("hero.maxPrice")}
        </label>
        <div className="flex items-center gap-2">
          <Input
            type="number"
            placeholder={t("hero.minPrice")}
            aria-label={t("hero.minPrice")}
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            className="h-auto border-0 bg-transparent px-0 py-0 text-sm font-medium text-white placeholder:text-white/40 shadow-none ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-w-0"
            step="10000"
            min="0"
          />
          <span className="text-white/40">–</span>
          <Input
            type="number"
            placeholder={t("hero.maxPrice")}
            aria-label={t("hero.maxPrice")}
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="h-auto border-0 bg-transparent px-0 py-0 text-sm font-medium text-white placeholder:text-white/40 shadow-none ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 min-w-0"
            step="10000"
            min="0"
          />
        </div>
      </div>

      <div className="flex items-center justify-center p-3">
        <Button
          onClick={handleSearch}
          size="icon"
          aria-label={t("hero.search")}
          className="group h-11 w-11 rounded-full bg-gold hover:bg-gold/90 text-white shrink-0 transition-all duration-300 hover:scale-105"
        >
          <Search className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
        </Button>
      </div>
    </>
  );

  useEffect(() => {
    let ctx: { revert: () => void } | undefined;
    let mounted = true;

    (async () => {
      const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);
      if (!mounted || !wrapperRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        // Word-mask reveal on load, independent of scroll.
        const words = wordsRef.current.filter(Boolean);
        gsap.set(words, { yPercent: 110 });
        gsap.to(words, { yPercent: 0, duration: 1, stagger: 0.035, ease: "power4.out", delay: 0.2 });

        // Scatter tiles are hidden below md, and only make sense once there's
        // room to lay them out - so the scroll-scrub effect is desktop-only.
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          const tiles = tileRefs.current.filter(Boolean) as HTMLDivElement[];
          gsap.set(tiles, { scale: 0.3, opacity: 0 });
          gsap.set(filterRef.current, { scale: 0.3, opacity: 0 });
          gsap.set(statementRef.current, { opacity: 0, y: 30, filter: "blur(8px)" });

          // No `pin` here - .hero-pin uses CSS position:sticky for that, so
          // ScrollTrigger only has to drive the scrubbed transforms.
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
          });

          // Tween durations/positions are chosen so the whole timeline sums to
          // exactly 1 - each position below IS the scroll-progress fraction
          // (0-1) at which that beat starts. Keeps the "when does X happen"
          // math legible instead of fighting stagger overflow every edit.
          tl.to(heroImgRef.current, { scale: 0.86, opacity: 0, duration: 0.25, ease: "power1.in" }, 0)
            .to(tiles, { scale: 1, opacity: 1, duration: 0.25, stagger: 0.015, ease: "power2.out" }, 0.12)
            .to(
              statementRef.current,
              { opacity: 1, y: 0, filter: "blur(0px)", duration: 0.2, ease: "power2.out" },
              0.68,
            )
            .to(filterRef.current, { scale: 1, opacity: 1, duration: 0.2, ease: "power2.out" }, 0.82);
        });
      }, wrapperRef);
    })();

    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, []);

  const titleLines = t("hero.title").split("\n");
  let wordIndex = 0;

  return (
    <div ref={wrapperRef} className="relative h-auto md:h-[300vh]">

      <div ref={pinRef} className="sticky top-0 h-screen w-full overflow-hidden bg-background">
        {/* Hero image + headline + badge, animated together as one unit as you scroll */}
        <div ref={heroImgRef} className="absolute inset-0">
          <img src={heroDubai} alt="" className="absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "center 30%" }} />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to top, rgba(29,27,24,0.82) 0%, rgba(29,27,24,0.35) 40%, rgba(29,27,24,0.1) 70%, rgba(29,27,24,0.02) 100%)",
            }}
          />

        {/* Headline, bottom-left anchored. top-28 keeps it clear of the fixed
            mobile nav when the text block is tall enough to grow upward. */}
        <div
          className={`absolute inset-x-0 top-28 bottom-0 md:top-auto z-10 flex flex-col justify-end overflow-y-auto px-6 md:px-14 pb-16 md:pb-20 max-w-[1100px] ${
            isRTL ? "font-arabic text-right ml-auto" : ""
          }`}
        >
          <h1
            className="text-4xl sm:text-5xl md:text-7xl text-white leading-[1.04] tracking-[-1px] md:tracking-[-2.5px] mb-5"
            style={{ fontFamily: isRTL ? undefined : SATOSHI, fontWeight: 500 }}
          >
            {titleLines.map((line, li) => (
              <span key={li}>
                {li > 0 && <br />}
                {line.split(" ").map((word, wi) => {
                  const idx = wordIndex++;
                  return (
                    <span key={wi} className="inline-block overflow-hidden align-top mr-[0.28em] pb-[6px]">
                      <span
                        ref={(el) => {
                          if (el) wordsRef.current[idx] = el;
                        }}
                        className="inline-block"
                      >
                        {word}
                      </span>
                    </span>
                  );
                })}
              </span>
            ))}
          </h1>
          <p
            className="text-[17px] leading-[1.65] text-white/70 max-w-[440px] mb-9"
            style={{ fontFamily: GENERAL_SANS }}
          >
            {t("hero.subtitle")}
          </p>
          <div className="flex flex-wrap items-center gap-5">
            <Button
              onClick={() => navigate("/properties")}
              className="group bg-white hover:bg-[#F2EDE7] text-[#1D1B18] px-9 py-4 h-auto text-[15px] rounded-full transition-all duration-300"
              style={{ fontFamily: GENERAL_SANS, fontWeight: 500 }}
            >
              {t("hero.exploreProperties")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
            </Button>
            <Link
              to="/contact"
              className="text-[14px] font-medium text-white/65 hover:text-white transition-colors"
              style={{ fontFamily: GENERAL_SANS }}
            >
              {t("hero.bookConsultation")} →
            </Link>
          </div>
        </div>

        {/* Rotating badge, bottom-right */}
        <a
          href="/contact"
          onClick={(e) => {
            e.preventDefault();
            navigate("/contact");
          }}
          className="absolute bottom-8 right-6 md:right-14 z-10 w-[100px] h-[100px] md:w-[120px] md:h-[120px] hidden sm:block opacity-70 hover:opacity-100 transition-opacity"
        >
          <svg viewBox="0 0 100 100" className="w-full h-full animate-[spin_12s_linear_infinite]">
            <defs>
              <path id="voiSpinPath" d="M 50,50 m -30,0 a 30,30 0 1,1 60,0 a 30,30 0 1,1 -60,0" fill="none" />
            </defs>
            <text
              fontSize="5.2"
              fill="rgba(255,255,255,0.85)"
              style={{ fontFamily: GENERAL_SANS, fontWeight: 500 }}
              className="uppercase"
              letterSpacing="3.5"
            >
              <textPath href="#voiSpinPath" startOffset="0%">
                LUXURY REAL ESTATE • INVEST WITH VOI • LUXURY REAL ESTATE • INVEST WITH VOI •
              </textPath>
            </text>
          </svg>
          <ArrowUpRight className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-6 w-6 text-white pointer-events-none" />
        </a>
        </div>

        {/* Scatter tiles */}
        {TILES.map((tile, i) => (
          <div
            key={i}
            ref={(el) => (tileRefs.current[i] = el)}
            className="absolute rounded-[14px] overflow-hidden hidden md:block"
            style={{
              top: tile.top,
              left: tile.left,
              width: tile.w,
              height: tile.h,
              boxShadow: "0 4px 20px rgba(29,27,24,0.1)",
            }}
          >
            <img src={tile.src} alt="" className="w-full h-full object-cover" />
          </div>
        ))}

        {/* Statement + property filter - desktop only, revealed on scroll alongside the scatter tiles */}
        <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center gap-7 w-[min(90vw,900px)]">
          <div
            ref={statementRef}
            className="text-center text-2xl lg:text-[32px] leading-[1.25] tracking-[-0.5px] text-foreground font-serif"
          >
            Every market has a right time to buy.
            <br />
            We make sure you don&apos;t miss it.
          </div>
          <div
            ref={filterRef}
            className="flex items-stretch divide-x divide-white/[0.12] bg-[rgba(29,27,24,0.78)] backdrop-blur-2xl backdrop-saturate-150 rounded-2xl border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden w-full"
            style={{ fontFamily: GENERAL_SANS }}
          >
            {renderFilterFields()}
          </div>
        </div>
      </div>

      {/* Property filter - mobile only, normal document flow so it's never
          clipped, overlapping the photo's bottom edge like a docked panel */}
      <div
        className="md:hidden relative z-20 -mt-20 mx-6 mb-8 bg-[rgba(29,27,24,0.45)] backdrop-blur-2xl backdrop-saturate-150 rounded-2xl border border-white/[0.15] shadow-[0_8px_32px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.1)] flex flex-col divide-y divide-white/[0.12] overflow-hidden"
        style={{ fontFamily: GENERAL_SANS }}
      >
        {renderFilterFields()}
      </div>
    </div>
  );
};

export default ShatterHero;
