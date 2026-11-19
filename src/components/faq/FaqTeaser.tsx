import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import RevealOnScroll from "@/components/RevealOnScroll";
import FaqList from "@/components/faq/FaqList";
import { FAQ_SECTIONS, FAQ_TEASER_NUMBERS } from "@/data/faq";

const TEASER_ITEMS = FAQ_SECTIONS.flatMap((s) => s.items).filter((i) => FAQ_TEASER_NUMBERS.includes(i.n));

// A few questions from the FAQ with a small burgundy "Read more" to the full
// /faq page (the client's request: 3-4 questions, then read more).
const FaqTeaser = () => {
  const { t, i18n } = useTranslation();
  const serif = i18n.language === "ar" ? "font-arabic" : "font-serif";

  return (
    <section className="px-6 pb-14 md:pb-20">
      <div className="max-w-6xl mx-auto grid md:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] gap-6 md:gap-16">
        <RevealOnScroll>
          <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">
            {t("faqPage.eyebrow")}
          </div>
          <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground mb-6 ${serif}`}>
            {t("faqPage.teaserTitle")}
          </h2>
          <Link
            to="/faq"
            className="hidden md:inline-flex items-center gap-2 rounded-full bg-burgundy px-5 h-10 text-sm font-medium text-white transition-colors hover:bg-burgundy/90"
          >
            {t("faqPage.readMore")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </RevealOnScroll>
        <RevealOnScroll delay={80}>
          <FaqList items={TEASER_ITEMS} numbered={false} />
          <Link
            to="/faq"
            className="md:hidden mt-6 inline-flex items-center gap-2 rounded-full bg-burgundy px-5 h-10 text-sm font-medium text-white transition-colors hover:bg-burgundy/90"
          >
            {t("faqPage.readMore")}
            <ArrowRight className="h-4 w-4 rtl:rotate-180" />
          </Link>
        </RevealOnScroll>
      </div>
    </section>
  );
};

export default FaqTeaser;
