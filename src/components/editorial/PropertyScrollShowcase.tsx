import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { useProperties } from "@/hooks/useProperties";
import { PropertyCard } from "@/components/property/PropertyCard";

const GENERAL_SANS = "'General Sans', -apple-system, sans-serif";

// Pinned, scroll-scrubbed property reveal. The first card is already on
// screen when the section arrives (no wait-for-scroll fade-in); scrolling
// brings in side annotations (desktop only), then crossfades into the next
// property. Every crossfade is reversible except the last property, which
// stays on screen once revealed instead of fading away.
// Same pin+scrub pattern as ShatterHero: CSS sticky for the pin, GSAP only
// drives the scrubbed tweens.
const PropertyScrollShowcase = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const { properties, loading } = useProperties();
  const featured = properties.slice(0, 3);

  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const leftRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rightRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Heading reveal is intentionally decoupled from the pinned scroll-scrub
  // timeline below - it just fades/blurs in once as soon as it enters the
  // viewport (same pattern as StatementSection) and never reverses, instead
  // of depending on ScrollTrigger's pixel math lining up with the pin.
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const el = headingRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHeadingVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (featured.length === 0) return;

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
        const mm = gsap.matchMedia();

        mm.add("(min-width: 768px)", () => {
          const cards = cardRefs.current.filter(Boolean) as HTMLDivElement[];
          const lefts = leftRefs.current.filter(Boolean) as HTMLDivElement[];
          const rights = rightRefs.current.filter(Boolean) as HTMLDivElement[];
          if (cards.length === 0) return;

          // First card is already visible on arrival; the rest start hidden.
          gsap.set(cards[0], { opacity: 1, y: 0, scale: 1 });
          if (cards.length > 1) gsap.set(cards.slice(1), { opacity: 0, y: 40, scale: 0.97 });
          gsap.set(lefts, { opacity: 0, x: -24 });
          gsap.set(rights, { opacity: 0, x: 24 });

          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: wrapperRef.current,
              start: "top top",
              end: "bottom bottom",
              scrub: 0.6,
            },
          });

          // Each property gets an in/hold/out beat; positions are fractions
          // (0-1) of total scroll progress so the sequence stays legible on
          // edit. The card fade-in is skipped for index 0 (already visible),
          // but its side texts still animate in on scroll like the rest.
          const step = 1 / cards.length;
          cards.forEach((card, i) => {
            const start = i * step;
            if (i > 0) {
              tl.to(card, { opacity: 1, y: 0, scale: 1, duration: step * 0.35, ease: "power2.out" }, start + step * 0.05);
            }
            if (lefts[i]) tl.to(lefts[i], { opacity: 1, x: 0, duration: step * 0.3, ease: "power2.out" }, start + step * 0.15);
            if (rights[i]) tl.to(rights[i], { opacity: 1, x: 0, duration: step * 0.3, ease: "power2.out" }, start + step * 0.15);

            if (i < cards.length - 1) {
              tl.to(card, { opacity: 0, y: -40, scale: 0.97, duration: step * 0.35, ease: "power2.in" }, start + step * 0.65);
              if (lefts[i]) tl.to(lefts[i], { opacity: 0, x: -24, duration: step * 0.3, ease: "power2.in" }, start + step * 0.65);
              if (rights[i]) tl.to(rights[i], { opacity: 0, x: 24, duration: step * 0.3, ease: "power2.in" }, start + step * 0.65);
            }
          });
          // The last property has no "out" beat above - it stays fully
          // visible once revealed, instead of fading away like the rest.
        });
      }, wrapperRef);
    })();

    return () => {
      mounted = false;
      ctx?.revert();
    };
  }, [featured.length]);

  if (loading || featured.length === 0) return null;

  return (
    <div ref={wrapperRef} className={`relative bg-background ${featured.length > 1 ? "md:h-[320vh]" : ""}`}>
      <div className="relative md:sticky md:top-0 md:h-screen w-full flex flex-col items-center justify-center px-6 py-20 md:py-0 overflow-hidden">
        <div className="text-center mb-10 md:mb-12 max-w-xl" style={{ fontFamily: GENERAL_SANS }}>
          <div
            ref={headingRef}
            style={{
              transitionProperty: "opacity, filter, transform",
              transitionDuration: "900ms",
              transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)",
              opacity: headingVisible ? 1 : 0,
              filter: headingVisible ? "blur(0)" : "blur(8px)",
              transform: headingVisible ? "translateY(0)" : "translateY(30%)",
            }}
          >
            <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">
              {t("hero.eyebrow")}
            </div>
            <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-4 text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}>
              Homes worth stopping to scroll for.
            </h2>
          </div>
          <Link
            to="/properties"
            className="group inline-flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 transition-colors"
          >
            {t("hero.exploreProperties")}
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </div>

        <div className="w-full md:grid md:grid-cols-[1fr_24rem_1fr] md:items-center md:gap-8 md:max-w-4xl md:mx-auto">
          {/* Left annotation column - desktop only */}
          <div className="hidden md:block relative h-[460px]">
            {featured.map((property, i) => (
              <div
                key={property.id}
                ref={(el) => (leftRefs.current[i] = el)}
                className="absolute inset-0 flex flex-col justify-center items-end text-right"
              >
                <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-3">
                  {property.property_type}
                </div>
                <div className={`text-2xl lg:text-3xl leading-[1.15] tracking-[-1px] text-foreground max-w-[220px] ${isRTL ? "font-arabic" : "font-serif"}`}>
                  {property.district || property.location}
                </div>
              </div>
            ))}
          </div>

          {/* Card stack - center */}
          <div className="relative w-full max-w-sm mx-auto">
            <div className="flex flex-col gap-6 md:block md:relative md:h-[460px]">
              {featured.map((property, i) => (
                <div
                  key={property.id}
                  ref={(el) => (cardRefs.current[i] = el)}
                  className="md:absolute md:inset-0"
                >
                  <PropertyCard property={property} featured />
                </div>
              ))}
            </div>
          </div>

          {/* Right annotation column - desktop only */}
          <div className="hidden md:block relative h-[460px]">
            {featured.map((property, i) => (
              <div
                key={property.id}
                ref={(el) => (rightRefs.current[i] = el)}
                className="absolute inset-0 flex flex-col justify-center items-start text-left"
              >
                <div className="text-3xl lg:text-4xl font-medium tracking-[-1px] text-foreground mb-3">
                  ${property.price.toLocaleString()}
                </div>
                <div className="text-sm text-muted-foreground max-w-[200px]">
                  {[
                    property.bedrooms ? `${property.bedrooms} Bed` : null,
                    property.bathrooms ? `${property.bathrooms} Bath` : null,
                    property.area_sqm ? `${property.area_sqm} m²` : null,
                  ]
                    .filter(Boolean)
                    .join(" · ")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyScrollShowcase;
