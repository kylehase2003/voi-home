import { useTranslation } from "react-i18next";
import { Property } from "@/types/property";

interface InvestmentReturnsProps {
  property: Property;
}

const InvestmentReturns = ({ property }: InvestmentReturnsProps) => {
  const { t } = useTranslation();

  const hasData = property.investment_return_1y || property.investment_return_3y || property.investment_return_5y;
  if (!hasData) return null;

  return (
    <section className="mb-12 bg-card border border-border rounded-lg p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-serif mb-6 text-foreground">{t('propertyDetail.numbersThatMatter')}</h2>
      <div className="rounded-lg p-4 sm:p-8 bg-primary">
        <div className="flex flex-col sm:flex-row items-center justify-around text-center gap-6 sm:gap-0">
          {/* 1 Year */}
          <div className="flex-1 w-full sm:w-auto">
            <p className="text-sm text-primary-foreground/80 mb-3">{t('propertyDetail.year1')}</p>
            <p className="text-3xl sm:text-4xl font-bold text-gold">{property.investment_return_1y ? `${property.investment_return_1y}%` : '-'}</p>
          </div>
          <div className="hidden sm:block h-24 w-px bg-gold mx-6"></div>
          <div className="sm:hidden w-full h-px bg-gold/30"></div>
          
          {/* 3 Years */}
          <div className="flex-1 w-full sm:w-auto">
            <p className="text-sm text-primary-foreground/80 mb-3">{t('propertyDetail.years3')}</p>
            <p className="text-3xl sm:text-4xl font-bold text-gold">{property.investment_return_3y ? `${property.investment_return_3y}%` : '-'}</p>
          </div>
          <div className="hidden sm:block h-24 w-px bg-gold mx-6"></div>
          <div className="sm:hidden w-full h-px bg-gold/30"></div>
          
          {/* 5 Years */}
          <div className="flex-1 w-full sm:w-auto">
            <p className="text-sm text-primary-foreground/80 mb-3">{t('propertyDetail.years5')}</p>
            <p className="text-3xl sm:text-4xl font-bold text-gold">{property.investment_return_5y ? `${property.investment_return_5y}%` : '-'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentReturns;
