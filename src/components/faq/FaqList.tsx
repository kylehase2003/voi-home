import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { FaqItem } from "@/data/faq";

export const faqLang = (lng: string): "en" | "ar" => (lng === "ar" ? "ar" : "en");

const LINK_LABEL = { guide: "faqPage.readGuide", service: "faqPage.viewService", contact: "faqPage.contactUs" } as const;

interface FaqListProps {
  items: FaqItem[];
  /** Show the brief's question numbers before each question. */
  numbered?: boolean;
}

// Accordion of FAQ questions. Each answer ends with a link to the in-depth
// guide (or service page) that covers the question.
const FaqList = ({ items, numbered = true }: FaqListProps) => {
  const { t, i18n } = useTranslation();
  const lng = faqLang(i18n.language);

  return (
    <Accordion type="multiple" className="border-t border-border">
      {items.map((item) => (
        <AccordionItem key={item.n} value={String(item.n)} className="border-border">
          <AccordionTrigger className="gap-4 py-5 text-start text-[16px] md:text-[17px] leading-[1.45] font-medium text-foreground hover:no-underline hover:text-evergreen [&>svg]:text-muted-foreground">
            <span className="flex gap-4">
              {numbered && (
                <span className="w-6 shrink-0 pt-px text-sm font-normal tabular-nums text-muted-foreground">
                  {item.n}.
                </span>
              )}
              <span>{item.q[lng]}</span>
            </span>
          </AccordionTrigger>
          <AccordionContent className={`pb-6 ${numbered ? "ps-10" : ""}`}>
            <p className="text-[15px] leading-[1.7] text-muted-foreground mb-4 max-w-2xl">{item.a[lng]}</p>
            <Link
              to={item.link.href}
              className="group/link inline-flex items-center gap-1.5 text-sm font-medium text-burgundy underline-offset-[6px] decoration-burgundy/40 hover:underline"
            >
              {t(LINK_LABEL[item.link.kind])}
              <ArrowRight className="h-4 w-4 transition-transform group-hover/link:translate-x-0.5 rtl:rotate-180 rtl:group-hover/link:-translate-x-0.5" />
            </Link>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default FaqList;
