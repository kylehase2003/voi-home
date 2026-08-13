import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-villa.webp";
const TermsConditions = () => {
  const {
    t
  } = useTranslation();
  return <div className="min-h-screen">
      <SEOHead
        title="Terms & Conditions"
        description="Terms and conditions governing the use of MR. Property's website and luxury real estate consultancy services in Istanbul, Bodrum, and Dubai."
        path="/terms"
      />
      <Header />
      <main className="pt-24">
        
        
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('terms.acceptance.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('terms.acceptance.content')}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('terms.services.title')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t('terms.services.content')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t('terms.services.item1')}</li>
                <li>{t('terms.services.item2')}</li>
                <li>{t('terms.services.item3')}</li>
                <li>{t('terms.services.item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('terms.userResponsibilities.title')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t('terms.userResponsibilities.content')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t('terms.userResponsibilities.item1')}</li>
                <li>{t('terms.userResponsibilities.item2')}</li>
                <li>{t('terms.userResponsibilities.item3')}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('terms.intellectual.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('terms.intellectual.content')}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('terms.limitation.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('terms.limitation.content')}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('terms.modifications.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('terms.modifications.content')}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('terms.governing.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('terms.governing.content')}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('terms.contact.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('terms.contact.content')}</p>
              <p className="text-muted-foreground mt-4">
                <strong>Email:</strong> <a href="mailto:info@voi-home.com" className="text-gold hover:underline">info@voi-home.com</a>
              </p>
            </section>

            <section>
              <p className="text-sm text-muted-foreground italic">{t('terms.lastUpdated')}</p>
            </section>
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default TermsConditions;