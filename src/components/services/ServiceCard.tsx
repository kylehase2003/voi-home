import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { getServiceContent, type ServiceDef } from "@/data/services";
import { whatsappLink } from "@/lib/whatsapp";

interface ServiceCardProps {
  service: ServiceDef;
  /** Compact variant for the "other services" row: no description or ask button. */
  compact?: boolean;
}

// Service card from the client's services mock-up: photo, round icon badge
// overlapping the photo, title, one-line description, then "Learn more"
// (opens the service page) and "Ask about this" (WhatsApp, pre-filled).
const ServiceCard = ({ service, compact = false }: ServiceCardProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const content = getServiceContent(service.slug, i18n.language);
  const Icon = service.icon;
  const href = `/services/${service.slug}`;

  return (
    <article className="group h-full flex flex-col rounded-2xl bg-card border border-border/70 overflow-hidden transition-shadow duration-300 hover:shadow-[0_18px_40px_-18px_rgba(0,0,0,0.25)]">
      <Link to={href} className="block">
        <div className={`relative overflow-hidden bg-muted ${compact ? "aspect-[4/3]" : "aspect-[16/11]"}`}>
          <img
            src={service.image}
            alt={content.name}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
        </div>
      </Link>

      <div className={`relative flex-1 flex flex-col ${compact ? "px-5 pb-5 pt-9" : "px-6 pb-6 pt-11"}`}>
        {/* Icon badge overlapping the photo edge */}
        <span
          className={`absolute -top-7 ${isRTL ? "right-6" : "left-6"} h-14 w-14 rounded-full bg-card border border-border/70 shadow-[0_6px_18px_-6px_rgba(0,0,0,0.25)] flex items-center justify-center text-evergreen`}
          aria-hidden="true"
        >
          <Icon className="h-6 w-6" strokeWidth={1.5} />
        </span>

        <Link to={href}>
          <h3
            className={`${compact ? "text-xl" : "text-[22px] md:text-2xl"} leading-[1.15] tracking-[-0.4px] text-foreground mb-2 ${
              isRTL ? "font-arabic" : "font-serif"
            }`}
          >
            {content.name}
          </h3>
        </Link>
        {!compact && <p className="text-[15px] leading-[1.6] text-muted-foreground mb-6">{content.short}</p>}

        <div className={`mt-auto flex items-center justify-between gap-2 ${compact ? "pt-2" : ""}`}>
          <Link
            to={href}
            className="group/more inline-flex items-center gap-1.5 whitespace-nowrap text-sm font-medium text-foreground underline-offset-[6px] decoration-foreground/30 hover:underline"
          >
            {t("servicesPage.learnMore")}
            <ArrowRight className="h-4 w-4 transition-transform group-hover/more:translate-x-0.5 rtl:rotate-180 rtl:group-hover/more:-translate-x-0.5" />
          </Link>
          {!compact && (
            <a
              href={whatsappLink(t("servicesPage.askMessage", { service: content.name }))}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-evergreen/40 px-3 py-1.5 text-[12.5px] font-medium text-evergreen hover:bg-evergreen hover:text-white hover:border-evergreen transition-colors"
            >
              {t("servicesPage.askAbout")}
              <ArrowUpRight className="h-3.5 w-3.5 rtl:-scale-x-100" />
            </a>
          )}
        </div>
      </div>
    </article>
  );
};

export default ServiceCard;
