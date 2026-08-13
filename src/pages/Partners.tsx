import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import RevealOnScroll from "@/components/RevealOnScroll";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getTranslatedContent } from "@/lib/i18n-content";

interface Partner {
  id: string;
  name: string;
  name_ar?: string | null;
  subtitle: string | null;
  subtitle_ar?: string | null;
  description: string;
  description_ar?: string | null;
  logo_url: string | null;
  website_url: string | null;
}

const Partners = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [partners, setPartners] = useState<Partner[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPartners();
  }, []);

  const fetchPartners = async () => {
    try {
      const { data, error } = await supabase
        .from("partners")
        .select("*")
        .eq("is_active", true)
        .order("display_order", { ascending: true });
      if (error) throw error;
      setPartners(data || []);
    } catch (error) {
      console.error("Error fetching partners:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <SEOHead
        title="Our Partners - Trusted Real Estate Developers"
        description="Explore MR. Property's trusted network of real estate developers and partners in Istanbul, Bodrum, and Dubai."
        path="/partners"
      />
      <Header />
      <main className="pt-24">
        <RevealOnScroll className="text-center max-w-xl mx-auto px-6 pb-4">
          <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">
            {t("partnersPage.title")}
          </div>
          <h1
            className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-4 text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}
          >
            {t("partners.description")}
          </h1>
        </RevealOnScroll>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {partners.map((partner, index) => (
                <RevealOnScroll key={partner.id} delay={index * 80}>
                  <Card className="h-full rounded-[20px] hover:shadow-xl transition-shadow">
                    <CardHeader>
                      {partner.logo_url && (
                        <div className="h-20 mb-4 flex items-center justify-center">
                          <img
                            src={partner.logo_url}
                            alt={getTranslatedContent(partner, "name", i18n.language)}
                            className="max-h-full max-w-full object-contain"
                          />
                        </div>
                      )}
                      <CardTitle className={`text-2xl mb-2 tracking-[-0.5px] ${isRTL ? "font-arabic" : "font-serif"}`}>
                        {getTranslatedContent(partner, "name", i18n.language)}
                      </CardTitle>
                      {partner.subtitle && (
                        <CardDescription className="text-base font-semibold text-foreground">
                          {getTranslatedContent(partner, "subtitle", i18n.language)}
                        </CardDescription>
                      )}
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground mb-4">{getTranslatedContent(partner, "description", i18n.language)}</p>
                      {partner.website_url && (
                        <Button
                          variant="link"
                          className="text-gold p-0 h-auto hover:no-underline group"
                          onClick={() => window.open(partner.website_url!, "_blank")}
                        >
                          {t("partnersPage.visitWebsite")}
                          <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                        </Button>
                      )}
                    </CardContent>
                  </Card>
                </RevealOnScroll>
              ))}

              <RevealOnScroll delay={partners.length * 80}>
                <Card className="h-full rounded-[20px] bg-primary text-primary-foreground">
                  <CardHeader>
                    <CardTitle className={`text-3xl mb-4 tracking-[-0.5px] ${isRTL ? "font-arabic" : "font-serif"}`}>
                      {t("partnersPage.cta.title")}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-primary-foreground/90 mb-6">{t("partnersPage.cta.description")}</p>
                    <Button className="bg-gold text-primary hover:bg-gold/90 w-full">{t("partnersPage.cta.button")}</Button>
                  </CardContent>
                </Card>
              </RevealOnScroll>
            </div>

            <RevealOnScroll className="bg-primary rounded-[20px] p-12 text-center text-white">
              <p className="text-primary-foreground/80 mb-2">{t("partnersPage.banner.subtitle")}</p>
              <h2
                className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-6 ${isRTL ? "font-arabic" : "font-serif"}`}
              >
                {t("partnersPage.banner.title")}
              </h2>
              <Button className="bg-gold text-primary hover:bg-gold/90 px-8">{t("partnersPage.banner.button")}</Button>
            </RevealOnScroll>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Partners;
