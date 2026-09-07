import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useTranslation } from "react-i18next";
import RevealOnScroll from "@/components/RevealOnScroll";
import SEOHead from "@/components/SEOHead";

const Contact = () => {
  const { t, i18n } = useTranslation();
  const contactInfo = [
    {
      icon: Phone,
      title: t("contactPage.phone"),
      details: ["‪+90 552 797 10 00‬"],
    },
    {
      icon: Mail,
      title: t("contactPage.email"),
      details: ["info@voi-home.com"],
    },
    {
      icon: MapPin,
      title: t("contactPage.office"),
      details: ["Maltepe, Teyyareci Sami Sk. No:8006, 34010 Zeytinburnu/İstanbul"],
    },
    {
      icon: Clock,
      title: t("contactPage.workingHours"),
      details: ["24/7"],
    },
  ];
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Contact Us - Get Expert Real Estate Advice"
        description="Contact Voi Home for luxury real estate consultancy in Istanbul and Bodrum, Türkiye. Call +90 545 120 22 37 or fill out our form for personalized assistance."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "Voi Home",
          image: "https://voi-home.com/og-image.jpg",
          url: "https://voi-home.com/contact",
          telephone: "+90 545 120 22 37",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Zeytinburnu",
            addressRegion: "İstanbul",
            addressCountry: "TR",
          },
          openingHoursSpecification: {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
            opens: "00:00",
            closes: "23:59",
          },
        }}
      />
      <Header />
      <main className="pt-24">
        <RevealOnScroll className="text-center max-w-xl mx-auto px-6 pb-10">
          <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">
            {t("contactPage.title")}
          </div>
          <h1
            className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground ${i18n.language === "ar" ? "font-arabic" : "font-serif"}`}
          >
            {t("contact.subtitle")}
          </h1>
        </RevealOnScroll>

        <div className="rounded-[20px] overflow-hidden mx-2 md:mx-3 my-3">
          <MapSection />
        </div>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-2xl mx-auto space-y-6">
              <h2
                className={`text-2xl md:text-3xl tracking-[-0.5px] mb-4 text-foreground text-center ${i18n.language === "ar" ? "font-arabic" : "font-serif"}`}
              >
                {t("contactPage.infoTitle")}
              </h2>
              {contactInfo.map((info, index) => (
                <RevealOnScroll key={index} delay={index * 80}>
                  <Card className="bg-card rounded-[20px]">
                    <CardContent className="p-6 flex gap-4">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
                        <info.icon className="h-6 w-6 text-gold" />
                      </div>
                      <div>
                        <h3 className="font-semibold mb-2 text-card-foreground">{info.title}</h3>
                        {info.details.map((detail, idx) => (
                          <p key={idx} className="text-sm text-muted-foreground">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </RevealOnScroll>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Contact;
