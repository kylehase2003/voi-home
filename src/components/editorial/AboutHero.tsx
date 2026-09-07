import { useTranslation } from "react-i18next";
import RevealOnScroll from "@/components/RevealOnScroll";

interface AboutHeroProps {
  eyebrow: string;
  title: string;
  lead: string;
  image: string;
  imageAlt?: string;
}

// Split, typographic hero for the About page - deliberately not the
// photo-with-stats-overlay pattern used elsewhere on the site. Text carries
// the weight; the image is a quiet companion, not the headline.
const AboutHero = ({ eyebrow, title, lead, image, imageAlt = "" }: AboutHeroProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="bg-background">
      <div className="container mx-auto px-6 pt-16 pb-10 md:pt-24 md:pb-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-center">
          <RevealOnScroll className="order-2 md:order-1">
            <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-5">
              {eyebrow}
            </div>
            <h1
              className={`text-4xl md:text-[56px] leading-[1.05] tracking-[-1.5px] text-foreground mb-6 ${
                isRTL ? "font-arabic" : "font-serif"
              }`}
            >
              {title}
            </h1>
            <p className="text-base md:text-lg text-muted-foreground leading-[1.7] max-w-md">
              {lead}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={120} className="order-1 md:order-2">
            <div className="relative rounded-[28px] overflow-hidden aspect-[4/5] md:aspect-[3/4]">
              <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
};

export default AboutHero;
