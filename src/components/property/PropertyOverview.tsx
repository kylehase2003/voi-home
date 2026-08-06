import { Building, Maximize, Home } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Property } from "@/types/property";

interface PropertyOverviewProps {
  property: Property;
}

const PropertyOverview = ({ property }: PropertyOverviewProps) => {
  const { t } = useTranslation();

  const hasData = property.blocks || property.floors || property.area_sqm || property.down_payment_percentage || property.installments_count || property.rental_yield;
  if (!hasData) return null;

  return (
    <section className="mb-12 bg-card border border-border rounded-lg p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-serif mb-6 text-foreground">{t('propertyDetail.propertyOverview')}</h2>
      <div className="rounded-lg bg-primary-foreground">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Project Layout */}
          <div className="rounded-lg p-6 text-center bg-primary">
            <Building className="h-8 w-8 mx-auto mb-3 text-gold" />
            <h3 className="text-sm font-semibold text-primary-foreground mb-3">{t('propertyDetail.projectLayout')}</h3>
            <div className="flex items-center justify-center gap-4 text-primary-foreground">
              <div>
                <p className="text-2xl font-bold text-gold">{property.blocks || '-'}</p>
                <p className="text-xs">{t('propertyDetail.blocks')}</p>
              </div>
              <span className="text-gold">|</span>
              <div>
                <p className="text-2xl font-bold text-gold">{property.floors || '-'}</p>
                <p className="text-xs">{t('propertyDetail.floors')}</p>
              </div>
            </div>
          </div>
          
          {/* Area */}
          <div className="rounded-lg p-6 text-center bg-primary">
            <Maximize className="h-8 w-8 mx-auto mb-3 text-gold" />
            <h3 className="text-sm font-semibold text-primary-foreground mb-3">{t('propertyDetail.area')}</h3>
            <p className="text-2xl font-bold text-gold">
              {property.area_sqm ? property.area_sqm.toLocaleString() : '-'} m²
            </p>
          </div>
          
          {/* Payment Method */}
          <div className="rounded-lg p-6 text-center bg-primary">
            <div className="h-8 w-8 mx-auto mb-3 flex items-center justify-center">
              <div className="w-8 h-6 border-2 border-gold rounded flex items-center justify-center">
                <div className="w-3 h-3 bg-gold rounded-full"></div>
              </div>
            </div>
            <h3 className="text-sm font-semibold text-primary-foreground mb-3">{t('propertyDetail.paymentMethod')}</h3>
            <div className="flex items-center justify-center gap-2 text-primary-foreground">
              <div>
                <p className="text-2xl font-bold text-gold">{property.down_payment_percentage ? `${property.down_payment_percentage}%` : '-'}</p>
                <p className="text-xs">{t('propertyDetail.downPayment')}</p>
              </div>
              <span className="text-gold">|</span>
              <div>
                <p className="text-2xl font-bold text-gold">
                  {property.installments_count ? property.installments_count : '-'}
                </p>
                <p className="text-xs">{t('propertyDetail.installments')}</p>
              </div>
            </div>
          </div>
          
          {/* Rental Yield */}
          <div className="rounded-lg p-6 text-center bg-primary">
            <Home className="h-8 w-8 mx-auto mb-3 text-gold" />
            <h3 className="text-sm font-semibold text-primary-foreground mb-3">{t('propertyDetail.rentalYield')}</h3>
            <p className="text-2xl font-bold text-gold">{property.rental_yield ? `${property.rental_yield}%` : '-'}</p>
            <p className="text-xs text-primary-foreground">{t('propertyDetail.annually')}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PropertyOverview;
