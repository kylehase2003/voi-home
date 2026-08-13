import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import RevealOnScroll from "@/components/RevealOnScroll";

interface FeatureRowProps {
  tag: string;
  title: string;
  description: string;
  image: string;
  reversed?: boolean;
  extra?: ReactNode;
}

const FeatureRow = ({ tag, title, description, image, reversed, extra }: FeatureRowProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="grid md:grid-cols-2 gap-0 items-center min-h-[70vh] bg-background">
      <RevealOnScroll
        className={`max-w-[480px] px-6 md:px-14 py-16 md:py-20 ${reversed ? "md:order-2" : "md:order-1"} ${
          reversed ? "md:ml-auto" : "md:mr-auto"
        }`}
      >
        <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">{tag}</div>
        <h2
          className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-5 text-foreground ${
            isRTL ? "font-arabic" : "font-serif"
          }`}
        >
          {title}
        </h2>
        <p className="text-base text-muted-foreground leading-[1.7] mb-7">{description}</p>
        {extra}
      </RevealOnScroll>
      <RevealOnScroll
        delay={100}
        className={`relative rounded-[20px] overflow-hidden aspect-[4/5] max-h-[70vh] m-5 bg-muted ${
          reversed ? "md:order-1 mr-auto" : "md:order-2 ml-auto"
        }`}
      >
        <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover" />
      </RevealOnScroll>
    </section>
  );
};

export default FeatureRow;
