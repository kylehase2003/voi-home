import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import type { Municipality } from "@/data/municipalities";

interface PhotoScrollerProps {
  items: Municipality[];
}

// Scrollable strip of municipality photos. Visitors swipe / trackpad-scroll
// it, or drag it with the mouse; on desktop, arrow buttons page through it.
// Each card is labelled with its municipality and opens that guide on the blog.
const PhotoScroller = ({ items }: PhotoScrollerProps) => {
  const { t, i18n } = useTranslation();
  const lang = (["en", "ar", "ru"].includes(i18n.language) ? i18n.language : "en") as "en" | "ar" | "ru";
  const isRTL = lang === "ar";

  const trackRef = useRef<HTMLDivElement | null>(null);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);

  const updateArrows = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    setCanPrev(el.scrollLeft > 4);
    setCanNext(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    updateArrows();
    window.addEventListener("resize", updateArrows);
    return () => window.removeEventListener("resize", updateArrows);
  }, [updateArrows, items.length]);

  // Page by roughly one viewport of cards, leaving the last one peeking.
  const scrollByPage = (dir: 1 | -1) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollBy({ left: dir * Math.max(el.clientWidth * 0.8, 280), behavior: "smooth" });
  };

  // Mouse drag-to-scroll on desktop. Touch devices use native scrolling.
  const drag = useRef({ active: false, startX: 0, startScroll: 0, moved: false });
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse" || !trackRef.current) return;
    drag.current = { active: true, startX: e.clientX, startScroll: trackRef.current.scrollLeft, moved: false };
    trackRef.current.style.scrollSnapType = "none";
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const d = drag.current;
    if (!d.active || !trackRef.current) return;
    const dx = e.clientX - d.startX;
    if (Math.abs(dx) > 5) d.moved = true;
    trackRef.current.scrollLeft = d.startScroll - dx;
  };
  const endDrag = () => {
    if (!drag.current.active) return;
    drag.current.active = false;
    const el = trackRef.current;
    if (!el) return;
    // Re-enable snapping and settle on the nearest card.
    const card = el.firstElementChild as HTMLElement | null;
    const step = card ? card.offsetWidth + 16 : 0;
    el.style.scrollSnapType = "";
    if (step) el.scrollTo({ left: Math.round(el.scrollLeft / step) * step, behavior: "smooth" });
  };
  // Swallow the click that ends a drag so it doesn't open a card.
  const onClickCapture = (e: React.MouseEvent) => {
    if (drag.current.moved) {
      e.preventDefault();
      e.stopPropagation();
      drag.current.moved = false;
    }
  };

  const arrowBtn =
    "hidden md:flex h-11 w-11 rounded-full border border-foreground/15 items-center justify-center text-foreground transition-all hover:bg-foreground hover:text-background disabled:opacity-30 disabled:pointer-events-none";

  return (
    <section className="py-8 md:py-10">
      <div className="container mx-auto px-4 mb-6 md:mb-8 flex items-end justify-between gap-6">
        <div className={isRTL ? "text-right" : ""}>
          <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-3">
            {t("home.municipalities.tag")}
          </div>
          <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}>
            {t("home.municipalities.title")}
          </h2>
        </div>
        <div className="flex gap-2 shrink-0" dir="ltr">
          <button type="button" onClick={() => scrollByPage(-1)} disabled={!canPrev} aria-label="Previous" className={arrowBtn}>
            <ArrowLeft className="h-5 w-5" />
          </button>
          <button type="button" onClick={() => scrollByPage(1)} disabled={!canNext} aria-label="Next" className={arrowBtn}>
            <ArrowRight className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        dir="ltr"
        onScroll={updateArrows}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerLeave={endDrag}
        onClickCapture={onClickCapture}
        className="flex gap-4 overflow-x-auto snap-x snap-mandatory overscroll-x-contain px-4 md:px-[max(1rem,calc((100vw-1400px)/2+2rem))] pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden md:cursor-grab md:active:cursor-grabbing select-none"
      >
        {items.map((item) => (
          <Link
            key={item.blogSlug}
            to={`/blog/${item.blogSlug}`}
            draggable={false}
            className="group relative block w-[72vw] sm:w-[300px] md:w-[320px] h-[360px] md:h-[420px] rounded-2xl overflow-hidden shrink-0 snap-start"
          >
            <img
              src={item.image}
              alt={item.name[lang]}
              loading="lazy"
              draggable={false}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div
              dir={isRTL ? "rtl" : "ltr"}
              className="absolute inset-x-0 bottom-0 p-5 flex items-end justify-between gap-3 text-white"
            >
              <div>
                <div className="text-[11px] uppercase tracking-[1.5px] text-white/70 mb-1">
                  {t("home.municipalities.cardLabel")}
                </div>
                <div className={`text-2xl leading-tight ${isRTL ? "font-arabic" : "font-serif"}`}>
                  {item.name[lang]}
                </div>
              </div>
              <span className="w-10 h-10 shrink-0 rounded-full bg-white/15 backdrop-blur flex items-center justify-center transition-colors group-hover:bg-white group-hover:text-black">
                <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" />
              </span>
            </div>
          </Link>
        ))}
        {/* End spacer so the last card can snap fully into view with matching gutter. */}
        <div className="shrink-0 w-px" aria-hidden="true" />
      </div>
    </section>
  );
};

export default PhotoScroller;
