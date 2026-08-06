import { Home, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import apartmentImage from "@/assets/apartment-modern.jpg";
import aboutVideoThumb from "@/assets/about-vision-video.webp";
import YouTubeFacade from "@/components/YouTubeFacade";
const AboutCompany = () => {
  const {
    t,
    i18n
  } = useTranslation();
  return <section className="py-8 md:py-14 bg-[hsl(40,25%,92%)]">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left side - YouTube Video with Enhanced Styling */}
          <div className="relative flex justify-center">
            <div className="relative w-full max-w-2xl">
              {/* Decorative background accent */}
              <div className="absolute -inset-4 bg-gradient-to-br from-gold/10 to-primary/10 rounded-[2rem] blur-2xl" />
              
              {/* Video container with enhanced styling */}
              <div className="relative">
                {/* Border frame effect */}
                <div className="absolute -inset-[2px] bg-gradient-to-br from-gold/30 via-primary/20 to-gold/30 rounded-[1.75rem]" />
                
                {/* YouTube facade - loads player only on click */}
                <div className="relative aspect-video overflow-hidden rounded-[1.65rem] shadow-2xl ring-1 ring-black/5 bg-black">
                  <YouTubeFacade videoId="XlsrqagN3Kk" title="About MR. PROPERTY" fallbackThumbnail={aboutVideoThumb} />
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Content */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="text-gold font-medium tracking-wide">{t('aboutCompany.subtitle')}</p>
              <h2 className={`text-4xl md:text-5xl ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`} style={{
              color: "hsl(210, 50%, 20%)"
            }}>
                {t('aboutCompany.title')}
              </h2>
            </div>

            <p className="text-muted-foreground text-lg leading-relaxed whitespace-pre-line">
              {t('aboutCompany.description')}
            </p>

            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-foreground/80">{t('aboutCompany.point1')}</span>
              </div>
              <div className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-foreground/80">{t('aboutCompany.point2')}</span>
              </div>
              <div className="flex items-center gap-3">
                <ArrowRight className="w-5 h-5 text-gold flex-shrink-0" />
                <span className="text-foreground/80">{t('aboutCompany.point3')}</span>
              </div>
            </div>

            <Link to="/contact">
              <Button size="lg" className="mt-2 bg-primary text-primary-foreground hover:bg-primary/90 my-[24px]">
                <Home className="w-4 h-4 mr-2" />
                {t('aboutCompany.contactButton')}
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>;
};
export default AboutCompany;