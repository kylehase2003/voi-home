import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import OptimizedImage from "@/components/OptimizedImage";

interface Partner {
  id: string;
  name: string;
  logo_url: string | null;
  website_url: string | null;
}

const PartnersSlider = () => {
  const [partners, setPartners] = useState<Partner[]>([]);
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';
  
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { 
      loop: true,
      align: "start",
      dragFree: true,
      direction: isRtl ? 'rtl' : 'ltr',
    },
    [AutoScroll({ playOnInit: true, speed: 1, direction: isRtl ? 'backward' : 'forward' })]
  );

  // Reinitialize carousel when language changes
  useEffect(() => {
    if (emblaApi) {
      emblaApi.reInit();
    }
  }, [emblaApi, isRtl]);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    const { data, error } = await supabase
      .from("partners")
      .select("*")
      .eq("is_active", true)
      .order("display_order");

    if (error) {
      console.error("Error fetching partners:", error);
      return;
    }

    if (data) {
      setPartners(data);
    }
  };

  if (partners.length === 0) return null;

  return (
    <section className="py-8 md:py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12 max-w-xl mx-auto">
          <h2
            className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-4 text-foreground ${
              i18n.language === 'ar' ? 'font-arabic' : 'font-serif'
            }`}
          >
            {t('partners.title')}
          </h2>
          <p className="text-base text-muted-foreground leading-[1.7]">
            {t('partners.description')}
          </p>
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex gap-8 md:gap-12">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="flex-[0_0_180px] md:flex-[0_0_250px] min-w-0"
              >
                {partner.website_url ? (
                  <a
                    href={partner.website_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${partner.name} website`}
                    className="block h-32 md:h-40 flex items-center justify-center p-2 hover:opacity-80 transition-opacity"
                  >
                    {partner.logo_url ? (
                      <OptimizedImage
                        src={partner.logo_url}
                        alt={partner.name}
                        objectFit="contain"
                        className="grayscale hover:grayscale-0 transition-all duration-300"
                        containerClassName="max-h-full max-w-full h-24 w-32 !bg-transparent"
                      />
                    ) : (
                      <span className="text-sm font-medium text-foreground">
                        {partner.name}
                      </span>
                    )}
                  </a>
                ) : (
                  <div className="h-32 md:h-40 flex items-center justify-center p-2">
                    {partner.logo_url ? (
                      <OptimizedImage
                        src={partner.logo_url}
                        alt={partner.name}
                        objectFit="contain"
                        className="grayscale opacity-80"
                        containerClassName="max-h-full max-w-full h-24 w-32 !bg-transparent"
                      />
                    ) : (
                      <span className="text-sm font-medium text-foreground">
                        {partner.name}
                      </span>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSlider;
