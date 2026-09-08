import { Building, Maximize, Home, Wallet } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Property } from "@/types/property";

interface PropertyOverviewProps {
  property: Property;
}

const PropertyOverview = ({ property }: PropertyOverviewProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const items = [
    (property.blocks || property.floors) && {
      icon: Building,
      label: t("propertyDetail.projectLayout"),
      value: `${property.blocks || "-"} ${t("propertyDetail.blocks")} · ${property.floors || "-"} ${t("propertyDetail.floors")}`,
    },
    property.area_sqm && {
      icon: Maximize,
      label: t("propertyDetail.area"),
      value: `${property.area_sqm.toLocaleString()} m²`,
    },
    (property.down_payment_percentage || property.installments_count) && {
      icon: Wallet,
      label: t("propertyDetail.paymentMethod"),
      value: `${property.down_payment_percentage ? `${property.down_payment_percentage}%` : "-"} ${t("propertyDetail.downPayment")} · ${property.installments_count || "-"} ${t("propertyDetail.installments")}`,
    },
    property.rental_yield && {
      icon: Home,
      label: t("propertyDetail.rentalYield"),
      value: `${property.rental_yield}% ${t("propertyDetail.annually")}`,
    },
  ].filter(Boolean) as { icon: typeof Building; label: string; value: string }[];

  if (items.length === 0) return null;

  return (
    <section className="py-8 md:py-10 border-t border-border">
      <h2 className={`text-xl md:text-2xl mb-6 text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}>
        {t("propertyDetail.propertyOverview")}
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 gap-x-4">
        {items.map((item, i) => (
          <div key={i} className="text-center px-2">
            <item.icon className="h-5 w-5 mx-auto mb-3 text-muted-foreground" strokeWidth={1.5} />
            <p className="text-xs uppercase tracking-[1px] text-muted-foreground mb-2">{item.label}</p>
            <p className="text-sm md:text-base font-medium text-foreground">{item.value}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PropertyOverview;
