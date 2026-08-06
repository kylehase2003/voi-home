import { useRef, useEffect, useCallback, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { useLanding } from "./LandingContext";
import companionEmailFrame from "@/assets/companion-email-frame.png";
import companionNotification from "@/assets/companion-notification.png";
import companionNotificationAr from "@/assets/companion-notification-ar.png";

const LandingCompanion = () => {
  const { t, isRtl } = useLanding();
  const section = useInView(0.15);
  const email = useInView(0.15);
  const font = isRtl ? "font-arabic" : "font-serif";
  const scrollRef = useRef<HTMLDivElement>(null);
  const hasTeased = useRef(false);
  const [scrollThumb, setScrollThumb] = useState({ height: 48, top: 0 });

  const updateScrollbar = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;

    const { scrollTop, scrollHeight, clientHeight } = el;
    const minThumbHeight = 36;

    if (scrollHeight <= clientHeight) {
      setScrollThumb({ height: clientHeight, top: 0 });
      return;
    }

    const nextHeight = Math.max((clientHeight / scrollHeight) * clientHeight, minThumbHeight);
    const maxThumbTop = clientHeight - nextHeight;
    const nextTop = (scrollTop / (scrollHeight - clientHeight)) * maxThumbTop;

    setScrollThumb({ height: nextHeight, top: nextTop });
  }, []);

  // Auto-scroll tease: when section enters view, nudge scroll down then back up
  useEffect(() => {
    if (!email.isInView || hasTeased.current || !scrollRef.current) return;
    hasTeased.current = true;
    const el = scrollRef.current;
    const distance = 60;
    const duration = 800;

    const startTimer = window.setTimeout(() => {
      el.scrollTo({ top: distance, behavior: "smooth" });
      const returnTimer = window.setTimeout(() => {
        el.scrollTo({ top: 0, behavior: "smooth" });
      }, duration);

      return () => window.clearTimeout(returnTimer);
    }, 600);

    return () => window.clearTimeout(startTimer);
  }, [email.isInView]);

  useEffect(() => {
    const frame = window.requestAnimationFrame(updateScrollbar);
    window.addEventListener("resize", updateScrollbar);

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("resize", updateScrollbar);
    };
  }, [updateScrollbar, isRtl]);

  return (
    <section className="py-14 md:py-28 bg-primary relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-4xl relative z-10">
        <div
          ref={section.ref}
          className={`text-center mb-12 transition-all duration-700 ${section.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <p className={`text-gold font-bold tracking-[0.3em] uppercase text-sm sm:text-lg md:text-xl mb-4 md:mb-6 ${font}`}>
            {t("companionLabel")}
          </p>
          <div className="inline-block border-gold/60 rounded-lg px-6 py-2 mb-4 border-0">
            <h2 className={`text-xl sm:text-2xl md:text-4xl lg:text-5xl font-bold text-gold tracking-wider ${font}`}>
              {t("companionTitle")}
            </h2>
          </div>
          <p className={`text-primary-foreground font-bold tracking-[0.2em] uppercase text-sm md:text-base ${font}`}>
            {t("companionSubtitle")}
          </p>
        </div>

        <div
          ref={email.ref}
          className={`flex flex-col items-center transition-all duration-700 delay-200 ${email.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {/* Laptop frame with notification overlapping top edge */}
          <div className="relative w-full max-w-3xl mt-12">
            <img
              src={isRtl ? companionNotificationAr : companionNotification}
              alt={isRtl ? "إشعار بريد خالد محمود" : "Harvey Specter email notification"}
              className={`absolute left-1/2 -translate-x-1/2 -top-16 md:-top-28 w-48 sm:w-56 md:w-full md:max-w-xs z-10 rounded-lg`}
              loading="lazy"
            />
            <img src={companionEmailFrame} alt="Email client frame" className="w-full rounded-xl" loading="lazy" />

            {/* Scrollable email text overlaid inside the laptop screen */}
            <div
              ref={scrollRef}
              className={`companion-email-scroll absolute top-[18%] left-[10%] w-[78%] h-[75%] overflow-y-scroll rounded-lg bg-transparent px-3 sm:px-4 md:px-8 py-4 md:py-6 ${isRtl ? "text-right" : "text-left"}`}
              dir={isRtl ? "rtl" : "ltr"}
              style={{ scrollbarWidth: "none" }}
              onScroll={updateScrollbar}
            >
              {/* Email body */}
              <div className={`space-y-3 text-sm md:text-base text-foreground/90 leading-relaxed ${font}`}>
                {isRtl ? (
                  <>
                    <p>سأكون <span className="text-gold font-bold">صريحًا.</span></p>
                    <p>قبل العمل مع <span className="text-gold font-bold">MR.PROPERTY</span></p>
                    <p>كان الاستثمار العقاري معقدا.</p>
                    <p>ليس لأن المعلومات قليلة،</p>
                    <p>بل لأنها <span className="text-gold font-bold">كثيرة جدًا.</span></p>
                    <p>الجميع <span className="text-gold font-bold">واثق.</span></p>
                    <p>كل مشروع <span className="text-gold font-bold">"فرصة لا تتكرر".</span></p>
                    <p>وكل قرار يبدو <span className="text-gold font-bold">مستعجلًا.</span></p>
                    <p>وهنا يبدأ <span className="text-gold font-bold">الندم.</span></p>
                    <p>ما تغيّر لم يكن الوصول لعقارات أفضل.</p>
                    <p>بل <span className="text-gold font-bold underline">فهم ما يهم فعلًا.</span></p>
                    <div className="h-4" />
                    <p>العقار لعبة طويلة.</p>
                    <p>الفرص السريعة <span className="text-gold font-bold">لا نهائية.</span></p>
                    <p>القرارات الجيدة <span className="text-gold font-bold">هادئة.</span></p>
                    <p>MR.PROPERTY أزال الضجيج.</p>
                    <p>لم يعد <span className="text-gold font-bold">الضغط</span> موجودا.</p>
                    <p>هدفهم ليس <span className="text-gold font-bold">إقناعك.</span></p>
                    <p>بل توفير <span className="text-gold font-bold">الوضوح الكامل…</span></p>
                    <p>وضوح يجعلك متمكنًا، لا متحمسًا.</p>
                    <p>هم يعملون مع من يفكر على <span className="text-gold font-bold">المدى الطويل.</span></p>
                    <p>من يهتم بالقيمة، لا بالضجة.</p>
                    <p>من لا يريد أن يخمّن اليوم</p>
                    <p>ويندم <span className="text-gold font-bold">غدًا.</span></p>
                    <p>في العقار،</p>
                    <p>المعلومة متاحة للجميع.</p>
                    <p>لكن <span className="text-gold font-bold">فهم السوق الحقيقي</span> نادر.</p>
                    <p>ولهذا وُجدت MR.PROPERTY.</p>
                    <div className="h-4" />
                    <p>مع تحياتي،</p>
                    <div className="h-2" />
                    <p className="font-bold text-lg">خالد محمود</p>
                  </>
                ) : (
                  <>
                    <p>I'll be <span className="text-gold font-bold">HONEST.</span></p>
                    <p>Before working with <span className="text-gold font-bold">MR.PROPERTY</span>, real estate felt confusing.</p>
                    <p>Not because there wasn't information, there was too much of it.</p>
                    <p>Everyone sounded <span className="text-gold font-bold">CONFIDENT.</span></p>
                    <p>Every project looked like "THE BEST <span className="text-gold font-bold">OPPORTUNITY.</span>"</p>
                    <p>And every decision felt rushed, like <span className="text-gold font-bold">HESITATION</span> meant missing out.</p>
                    <p>That's usually where <span className="text-gold font-bold">REGRET</span> start.</p>
                    <p>What changed wasn't access to better listings.</p>
                    <p>It was finally understanding{" "}<span className="text-gold font-bold underline">WHAT ACTUALLY MATTERS.</span></p>
                    <div className="h-4" />
                    <p>Real estate is a long game.</p>
                    <p>Quick <span className="text-gold font-bold">WINS</span> are loud.</p>
                    <p>Good decisions are <span className="text-gold font-bold">QUIET.</span></p>
                    <p>Working with MR.PROPERTY stripped away the noise.</p>
                    <p>No <span className="text-gold font-bold">PRESSURE.</span></p>
                    <p>No <span className="text-gold font-bold">PERSUATION.</span></p>
                    <p>Just <span className="text-gold font-bold">CLARITY</span>, the kind that makes you feel calm instead of excited.</p>
                    <p>They work with people who think <span className="text-gold font-bold">LONG-TERM.</span></p>
                    <p>Who care about relevance, not hype.</p>
                    <p>Who don't want to guess today and <span className="text-gold font-bold">REGRET</span> it later.</p>
                    <p>In real estate, information is common.</p>
                    <p><span className="text-gold font-bold">UNDERSTANDING</span> isn't.</p>
                    <p>That's what this way of thinking is built on.</p>
                    <p>And that's why MR.PROPERTY exists.</p>
                    <div className="h-4" />
                    <p>Best regards,</p>
                    <div className="h-2" />
                    <p className="font-bold text-lg">HARVEY SPECTER</p>
                  </>
                )}
              </div>
            </div>

            <div
              aria-hidden="true"
              className={`pointer-events-none absolute top-[18%] ${isRtl ? "left-[12.5%]" : "right-[12.5%]"} h-[75%] w-[3px] rounded-full bg-gold/20`}
            >
              <div
                className="absolute inset-x-0 rounded-full bg-gold/70 transition-transform duration-150 ease-out"
                style={{
                  height: `${scrollThumb.height}px`,
                  transform: `translateY(${scrollThumb.top}px)`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LandingCompanion;
