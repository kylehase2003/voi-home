import { useTranslation } from "react-i18next";
import { Property } from "@/types/property";

interface AreaDetailsProps {
  property: Property;
}

const AreaDetails = ({ property }: AreaDetailsProps) => {
  const { t } = useTranslation();

  const hasData = property.area_population || property.area_sex_ratio_male || property.area_sex_ratio_female || property.area_class;
  if (!hasData) return null;

  return (
    <section className="mb-12 bg-card border border-border rounded-[20px] p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl tracking-[-0.5px] font-serif mb-6 text-foreground">{t('propertyDetail.areaDetails')}</h2>
      <div className="rounded-[20px] p-4 sm:p-8 bg-primary">
        <div className="flex flex-col md:flex-row items-center justify-around text-center gap-6 md:gap-0">
          {/* Population */}
          <div className="flex-1 w-full md:w-auto">
            <p className="text-sm text-primary-foreground/80 mb-3">{t('propertyDetail.population')}</p>
            <p className="text-3xl sm:text-4xl font-bold text-gold">{property.area_population || '-'}</p>
          </div>
          <div className="hidden md:block h-24 w-px bg-gold mx-6"></div>
          <div className="md:hidden w-full h-px bg-gold/30"></div>
          
          {/* Sex Ratio */}
          <div className="flex-1 w-full md:w-auto">
            <p className="text-sm text-primary-foreground/80 mb-3">{t('propertyDetail.sexRatio')}</p>
            <div className="flex items-center justify-center gap-4">
              <p className="text-xl sm:text-2xl font-bold text-gold">
                {property.area_sex_ratio_male ? `${property.area_sex_ratio_male}%` : '-'} <span className="text-base sm:text-lg text-primary-foreground/80">{t('propertyDetail.male')}</span>
              </p>
              <span className="text-gold">|</span>
              <p className="text-xl sm:text-2xl font-bold text-gold">
                {property.area_sex_ratio_female ? `${property.area_sex_ratio_female}%` : '-'} <span className="text-base sm:text-lg text-primary-foreground/80">{t('propertyDetail.female')}</span>
              </p>
            </div>
          </div>
          <div className="hidden md:block h-24 w-px bg-gold mx-6"></div>
          <div className="md:hidden w-full h-px bg-gold/30"></div>
          
          {/* Class */}
          <div className="flex-1 w-full md:w-auto">
            <p className="text-sm text-primary-foreground/80 mb-3">{t('propertyDetail.class')}</p>
            <p className="text-3xl sm:text-4xl font-bold text-gold">{property.area_class || '-'}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AreaDetails;
