import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";

interface PartnerLogo {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
}

// Slim strip of partner logos for the homepage. Reads the same active
// partners the /partners page shows (managed from the dashboard) and scrolls
// them as a slow greyscale marquee. Renders nothing if there are no partners.
const PartnerStrip = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [partners, setPartners] = useState<PartnerLogo[]>([]);

  useEffect(() => {
    let mounted = true;
    supabase
      .from("partners")
      .select("id, name, logo_url, website_url")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .then(({ data, error }) => {
        if (error) console.error("Error fetching partners:", error);
        if (mounted && data) setPartners(data);
      });
    return () => {
      mounted = false;
    };
  }, []);

  if (partners.length === 0) return null;

  // Repeat the set until the strip is wide enough to loop without a gap,
  // then double it for the seamless -50% marquee.
  const base: PartnerLogo[] = [];
  while (base.length < 8) base.push(...partners);
  const strip = [...base, ...base];

  return (
    <section className="py-10 md:py-14 border-y border-border/60 bg-background overflow-hidden">
      <div className="container mx-auto px-4 mb-6 md:mb-8 flex items-center justify-between gap-4">
        <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground">
          {t("home.partners.tag")}
        </div>
        <Link
          to="/partners"
          className={`text-sm text-foreground/70 hover:text-foreground underline-offset-4 hover:underline transition-colors ${isRTL ? "font-arabic" : ""}`}
        >
          {t("home.partners.viewAll")}
        </Link>
      </div>
      <div
        dir="ltr"
        className="relative [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
      >
        <div className="flex items-center gap-14 md:gap-20 w-max animate-[marquee_45s_linear_infinite] motion-reduce:animate-none hover:[animation-play-state:paused]">
          {strip.map((p, i) => (
            <Link
              key={`${p.id}-${i}`}
              to="/partners"
              aria-hidden={i >= base.length ? true : undefined}
              tabIndex={i >= base.length ? -1 : undefined}
              className="shrink-0 h-12 md:h-14 flex items-center opacity-60 grayscale hover:opacity-100 hover:grayscale-0 transition-all duration-300"
            >
              {p.logo_url ? (
                <img src={p.logo_url} alt={p.name} loading="lazy" className="h-full w-auto max-w-[160px] object-contain" />
              ) : (
                <span className="font-serif text-xl md:text-2xl text-foreground whitespace-nowrap">{p.name}</span>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PartnerStrip;
