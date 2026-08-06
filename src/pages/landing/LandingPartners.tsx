import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { useLanding } from "./LandingContext";
import { supabase } from "@/integrations/supabase/client";

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
}

const PARTNERS_PER_PAGE_DESKTOP = 4;
const PARTNERS_PER_PAGE_MOBILE = 2;

const LandingPartners = () => {
  const { t, isRtl } = useLanding();
  const section = useInView(0.15);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [page, setPage] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [slidingOut, setSlidingOut] = useState(false);
  const [slideDirection, setSlideDirection] = useState<"left" | "right">("left");
  const font = isRtl ? "font-arabic" : "font-serif";
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const perPage = isMobile ? PARTNERS_PER_PAGE_MOBILE : PARTNERS_PER_PAGE_DESKTOP;

  useEffect(() => {
    const fetchPartners = async () => {
      const { data } = await supabase
        .from("partners")
        .select("id, name, logo_url, website_url")
        .eq("is_active", true)
        .order("display_order");
      if (data) setPartners(data);
    };
    fetchPartners();
  }, []);

  const totalPages = Math.ceil(partners.length / perPage);

  const animateTo = (nextPage: number, direction: "left" | "right") => {
    if (slidingOut) return;
    setSlideDirection(direction);
    setSlidingOut(true);
    setTimeout(() => {
      setPage(nextPage);
      setSlidingOut(false);
    }, 350);
  };

  const goNext = () => animateTo((page + 1) % totalPages, "left");
  const goPrev = () => animateTo((page - 1 + totalPages) % totalPages, "right");

  // Auto-advance every 4 seconds (pause on hover)
  useEffect(() => {
    if (totalPages <= 1 || isHovered) return;
    const interval = setInterval(goNext, 4000);
    return () => clearInterval(interval);
  }, [totalPages, isHovered, page, slidingOut]);

  const visible = partners.slice(page * perPage, (page + 1) * perPage);

  const slideClass = slidingOut
    ? slideDirection === "left"
      ? "translate-x-[-110%] opacity-0"
      : "translate-x-[110%] opacity-0"
    : "translate-x-0 opacity-100";

  return (
    <section
      ref={section.ref}
      className={`bg-cream transition-all duration-700 ${
        partners.length === 0 ? "py-0 h-0 overflow-hidden" : "py-16 md:py-20"
      } ${section.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
    >
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className={`text-2xl md:text-4xl lg:text-5xl font-black text-primary text-center tracking-wider mb-12 ${font}`}>
          {t("partnersTitle")}
        </h2>

        <div
          className="relative flex items-center"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          ref={containerRef}
        >
          <button
            onClick={goPrev}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/20 hover:bg-gold/40 flex items-center justify-center text-primary transition-colors z-10"
            aria-label="Previous partners"
          >
            <ChevronLeft className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
          </button>

          <div className="flex-1 overflow-hidden px-4 md:px-8">
            <div
              className={`grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-10 items-center justify-items-center transition-all duration-350 ease-in-out ${slideClass}`}
              style={{ transitionDuration: "350ms" }}
            >
              {visible.map((partner) => (
                <div key={partner.id} className="flex items-center justify-center h-24 md:h-32">
                  {partner.logo_url ? (
                    <a
                      href={partner.website_url || "#"}
                      target={partner.website_url ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="hover-scale"
                    >
                      <img src={partner.logo_url} alt={partner.name} className="max-h-20 md:max-h-28 w-auto object-contain" loading="lazy" />
                    </a>
                  ) : (
                    <span className={`text-primary font-bold text-lg ${font}`}>{partner.name}</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={goNext}
            className="flex-shrink-0 w-10 h-10 rounded-full bg-gold/20 hover:bg-gold/40 flex items-center justify-center text-primary transition-colors z-10"
            aria-label="Next partners"
          >
            <ChevronRight className={`w-5 h-5 ${isRtl ? "rotate-180" : ""}`} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default LandingPartners;
