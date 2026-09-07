import { useTranslation } from "react-i18next";
import RevealOnScroll from "@/components/RevealOnScroll";

interface ManifestoItem {
  title: string;
  description: string;
}

interface ManifestoListProps {
  eyebrow?: string;
  title: string;
  items: ManifestoItem[];
}

// Large-scale numbered list, not an icon grid - each principle gets a full
// row of its own instead of being shrunk into a card.
const ManifestoList = ({ eyebrow, title, items }: ManifestoListProps) => {
  const { i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="py-16 md:py-28 bg-background">
      <div className="container mx-auto px-6">
        <RevealOnScroll className="max-w-xl mx-auto text-center mb-14 md:mb-20">
          {eyebrow && (
            <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">
              {eyebrow}
            </div>
          )}
          <h2
            className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground ${
              isRTL ? "font-arabic" : "font-serif"
            }`}
          >
            {title}
          </h2>
        </RevealOnScroll>

        <div className="max-w-4xl mx-auto border-t border-border">
          {items.map((item, i) => (
            <RevealOnScroll key={item.title} delay={i * 60}>
              <div className="grid grid-cols-[3rem_1fr] md:grid-cols-[6rem_1fr] gap-6 md:gap-10 py-8 md:py-10 border-b border-border items-baseline">
                <span className="text-3xl md:text-5xl font-serif text-foreground/15 tabular-nums leading-none">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3
                    className={`text-xl md:text-2xl mb-2 text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}
                  >
                    {item.title}
                  </h3>
                  <p className="text-muted-foreground leading-[1.7] max-w-2xl">{item.description}</p>
                </div>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ManifestoList;
