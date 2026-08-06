import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { useProperties } from "@/hooks/useProperties";
import { PropertyCard } from "@/components/property/PropertyCard";
const FeaturedProperties = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const {
    properties,
    loading
  } = useProperties(undefined, true);
  if (loading) {
    return <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <p className="text-muted-foreground">{t('homePage.featuredProperties.loadingProperties')}</p>
          </div>
        </div>
      </section>;
  }
  if (properties.length === 0) {
    return <section className="py-24 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
          <h2 className={`text-4xl md:text-5xl mb-4 text-primary ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
              {t('homePage.featuredProperties.discoverHomes')}
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              {t('homePage.featuredProperties.noProperties')}
            </p>
          </div>
        </div>
      </section>;
  }
  return <section className="py-8 md:py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <h2 className={`text-3xl md:text-5xl mb-3 md:mb-4 text-primary ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
            {t('homePage.featuredProperties.ourListings')}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t('homePage.featuredProperties.exploreOpportunities')}
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8 mb-8 md:mb-12">
          {properties.map((property, index) => <PropertyCard key={property.id} property={property} featured animationDelay={index * 0.2} />)}
        </div>

        <div className="text-center">
          <Link to="/properties">
            <Button variant="outline" size="lg" className="border-2 border-gold text-gold hover:bg-gold hover:text-primary">
              {t('homePage.featuredProperties.viewAllProperties')}
            </Button>
          </Link>
        </div>
      </div>
    </section>;
};
export default FeaturedProperties;