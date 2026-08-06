import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-villa.webp";
const PrivacyPolicy = () => {
  const {
    t
  } = useTranslation();
  return <div className="min-h-screen">
      <SEOHead
        title="Privacy Policy"
        description="How MR. Property collects, uses, and protects your personal data across our luxury real estate services in Istanbul, Bodrum, and Dubai."
        path="/privacy"
      />
      <Header />
      <main className="pt-24">
        
        
        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
          <div className="prose prose-lg max-w-none space-y-8">
            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('privacy.intro.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('privacy.intro.content')}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('privacy.collection.title')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t('privacy.collection.content')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t('privacy.collection.item1')}</li>
                <li>{t('privacy.collection.item2')}</li>
                <li>{t('privacy.collection.item3')}</li>
                <li>{t('privacy.collection.item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('privacy.usage.title')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t('privacy.usage.content')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t('privacy.usage.item1')}</li>
                <li>{t('privacy.usage.item2')}</li>
                <li>{t('privacy.usage.item3')}</li>
                <li>{t('privacy.usage.item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('privacy.protection.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('privacy.protection.content')}</p>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('privacy.rights.title')}</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">{t('privacy.rights.content')}</p>
              <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
                <li>{t('privacy.rights.item1')}</li>
                <li>{t('privacy.rights.item2')}</li>
                <li>{t('privacy.rights.item3')}</li>
                <li>{t('privacy.rights.item4')}</li>
              </ul>
            </section>

            <section>
              <h2 className="font-serif text-2xl text-primary mb-4">{t('privacy.contact.title')}</h2>
              <p className="text-muted-foreground leading-relaxed">{t('privacy.contact.content')}</p>
              <p className="text-muted-foreground mt-4">
                <strong>Email:</strong> <a href="mailto:info@mrpropertytr.com" className="text-gold hover:underline">info@mrpropertytr.com</a>
              </p>
            </section>

            <section>
              <p className="text-sm text-muted-foreground italic">{t('privacy.lastUpdated')}</p>
            </section>
          </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default PrivacyPolicy;