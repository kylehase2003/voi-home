import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/whatsapp";

interface ServicesCtaProps {
  /** Pre-filled WhatsApp text; defaults to the site's general message. */
  whatsappText?: string;
}

// Closing banner for the services pages, using the client's mock-up copy.
const ServicesCta = ({ whatsappText }: ServicesCtaProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <section className="px-4 md:px-6 pb-14 md:pb-20">
      <div className="max-w-6xl mx-auto rounded-[28px] bg-burgundy text-[#E6E2DA] px-6 py-12 md:px-14 md:py-16 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
        <div className="max-w-xl">
          <h2 className={`text-3xl md:text-[42px] leading-[1.1] tracking-[-1px] mb-3 ${isRTL ? "font-arabic" : "font-serif"}`}>
            {t("servicesPage.ctaTitle")}
          </h2>
          <p className="text-[#E6E2DA]/75 leading-[1.7]">{t("servicesPage.ctaText")}</p>
        </div>
        <div className="flex flex-wrap items-center gap-3 shrink-0">
          <Link to="/contact">
            <Button className="rounded-full bg-[#E6E2DA] text-burgundy hover:bg-white px-7 h-12 text-[15px]">
              {t("hero.bookConsultation")}
              <ArrowRight className="ml-2 h-4 w-4 rtl:rotate-180" />
            </Button>
          </Link>
          <a href={whatsappLink(whatsappText ?? t("whatsapp.defaultMessage"))} target="_blank" rel="noopener noreferrer">
            <Button
              variant="outline"
              className="rounded-full border-[#E6E2DA]/35 bg-transparent text-[#E6E2DA] hover:bg-[#E6E2DA]/10 hover:text-[#E6E2DA] px-7 h-12 text-[15px]"
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              {t("servicesPage.whatsapp")}
            </Button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default ServicesCta;
