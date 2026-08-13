import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SEOHead from "@/components/SEOHead";
import RevealOnScroll from "@/components/RevealOnScroll";
import { useTranslation } from "react-i18next";

const TermsConditions = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const sections = [
    { title: t("terms.acceptance.title"), body: <p className="text-muted-foreground leading-[1.7]">{t("terms.acceptance.content")}</p> },
    {
      title: t("terms.services.title"),
      body: (
        <>
          <p className="text-muted-foreground leading-[1.7] mb-4">{t("terms.services.content")}</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>{t("terms.services.item1")}</li>
            <li>{t("terms.services.item2")}</li>
            <li>{t("terms.services.item3")}</li>
            <li>{t("terms.services.item4")}</li>
          </ul>
        </>
      ),
    },
    {
      title: t("terms.userResponsibilities.title"),
      body: (
        <>
          <p className="text-muted-foreground leading-[1.7] mb-4">{t("terms.userResponsibilities.content")}</p>
          <ul className="list-disc list-inside space-y-2 text-muted-foreground ml-4">
            <li>{t("terms.userResponsibilities.item1")}</li>
            <li>{t("terms.userResponsibilities.item2")}</li>
            <li>{t("terms.userResponsibilities.item3")}</li>
          </ul>
        </>
      ),
    },
    { title: t("terms.intellectual.title"), body: <p className="text-muted-foreground leading-[1.7]">{t("terms.intellectual.content")}</p> },
    { title: t("terms.limitation.title"), body: <p className="text-muted-foreground leading-[1.7]">{t("terms.limitation.content")}</p> },
    { title: t("terms.modifications.title"), body: <p className="text-muted-foreground leading-[1.7]">{t("terms.modifications.content")}</p> },
    { title: t("terms.governing.title"), body: <p className="text-muted-foreground leading-[1.7]">{t("terms.governing.content")}</p> },
    {
      title: t("terms.contact.title"),
      body: (
        <>
          <p className="text-muted-foreground leading-[1.7]">{t("terms.contact.content")}</p>
          <p className="text-muted-foreground mt-4">
            <strong>Email:</strong> <a href="mailto:info@voi-home.com" className="text-gold hover:underline">info@voi-home.com</a>
          </p>
        </>
      ),
    },
  ];

  return (
    <div className="min-h-screen">
      <SEOHead
        title="Terms & Conditions"
        description="Terms and conditions governing the use of MR. Property's website and luxury real estate consultancy services in Istanbul, Bodrum, and Dubai."
        path="/terms"
      />
      <Header />
      <main className="pt-24">
        <RevealOnScroll className="text-center max-w-xl mx-auto px-6 pt-8 pb-2">
          <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">{t("terms.title")}</div>
          <h1 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}>
            {t("terms.title")}
          </h1>
        </RevealOnScroll>

        <section className="py-16">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="prose prose-lg max-w-none space-y-8">
              {sections.map((s, i) => (
                <RevealOnScroll key={i} delay={Math.min(i * 60, 300)}>
                  <section>
                    <h2 className={`text-2xl tracking-[-0.5px] text-foreground mb-4 ${isRTL ? "font-arabic" : "font-serif"}`}>{s.title}</h2>
                    {s.body}
                  </section>
                </RevealOnScroll>
              ))}
              <RevealOnScroll>
                <section>
                  <p className="text-sm text-muted-foreground italic">{t("terms.lastUpdated")}</p>
                </section>
              </RevealOnScroll>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default TermsConditions;
