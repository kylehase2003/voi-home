import { useTranslation } from "react-i18next";
import RevealOnScroll from "@/components/RevealOnScroll";
import { Button } from "@/components/ui/button";

interface StoryScrollProps {
  image: string;
  imageAlt?: string;
  tagline: string;
  paragraphs: string[];
  closingLine: string;
  ctaLabel: string;
  ctaHref: string;
}

// Magazine-style feature spread: the image stays pinned while the story
// text runs past it. Distinct from a side-by-side media+text row - this
// reads like an editorial profile, not a marketing block.
const StoryScroll = ({ image, imageAlt = "", tagline, paragraphs, closingLine, ctaLabel, ctaHref }: StoryScrollProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="bg-background">
      <div className="container mx-auto px-6 py-16 md:py-28">
        <div className="grid grid-cols-1 md:grid-cols-[0.85fr_1.15fr] gap-10 md:gap-20">
          <div className="md:sticky md:top-28 self-start">
            <RevealOnScroll className="rounded-[24px] overflow-hidden aspect-[4/5]">
              <img src={image} alt={imageAlt} className="w-full h-full object-cover" />
            </RevealOnScroll>
          </div>

          <div>
            <RevealOnScroll>
              <p
                className={`text-2xl md:text-3xl leading-[1.35] tracking-[-0.5px] text-foreground italic mb-10 whitespace-pre-line ${
                  isRTL ? "font-arabic" : "font-serif"
                }`}
              >
                {tagline}
              </p>
            </RevealOnScroll>

            <div className="space-y-6 max-w-xl">
              {paragraphs.map((p, i) => (
                <RevealOnScroll key={i} delay={i * 80}>
                  <p className="text-base md:text-lg text-muted-foreground leading-[1.8]">{p}</p>
                </RevealOnScroll>
              ))}
            </div>

            <RevealOnScroll delay={paragraphs.length * 80} className="mt-10">
              <p className={`text-lg md:text-xl text-foreground mb-6 ${isRTL ? "font-arabic" : "font-serif"}`}>
                {closingLine}
              </p>
              <a href={ctaHref} target="_blank" rel="noopener noreferrer">
                <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  {ctaLabel}
                </Button>
              </a>
            </RevealOnScroll>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StoryScroll;
