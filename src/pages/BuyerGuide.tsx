import { useState } from "react";
import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { triggerLeadWebhook } from "@/lib/leadWebhook";
import { z } from "zod";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import SEOHead from "@/components/SEOHead";
import FormExtras, { BUDGET_OPTIONS, type BudgetValue } from "@/components/FormExtras";
import step1Image from "@/assets/buyer-guide-step1.webp";
import step2Image from "@/assets/buyer-guide-step2.webp";
import step3Image from "@/assets/buyer-guide-step3.webp";
import step4Image from "@/assets/buyer-guide-step4.webp";
import OptimizedImage from "@/components/OptimizedImage";
import RevealOnScroll from "@/components/RevealOnScroll";
const BuyerGuide = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const { toast } = useToast();
  const [locationFilter, setLocationFilter] = useState<string>("turkey");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", budget: "" as BudgetValue, kvkkConsent: false });
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});

  const formSchema = z.object({
    name: z.string().trim().min(1, "Name is required").max(100),
    email: z.string().trim().email("Invalid email address").max(255),
    phone: z
      .string()
      .trim()
      .max(20)
      .optional()
      .or(z.literal(""))
      .refine((val) => !val || isValidPhoneNumber(val), { message: "Invalid phone number" }),
    message: z.string().trim().max(1000).optional().or(z.literal("")),
    budget: z.enum(BUDGET_OPTIONS, { errorMap: () => ({ message: "budgetRequired" }) }),
    kvkkConsent: z.literal(true, { errorMap: () => ({ message: "kvkkRequired" }) }),
  });

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormErrors({});

    const result = formSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setFormErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    try {
      const budgetLabel = t(`formFields.budgetOptions.${result.data.budget}`);
      const messageWithBudget = `[${t("formFields.budgetLabel")}: ${budgetLabel}]${result.data.message ? `\n\n${result.data.message}` : ""}`;

      const { error } = await supabase.from("contact_submissions").insert([{
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || null,
        message: messageWithBudget,
      }]);
      if (error) throw error;

      await triggerLeadWebhook({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || "",
        message: result.data.message,
        budget: result.data.budget,
        budgetLabel,
        kvkkConsent: true,
        source: "buyer-guide",
      });

      try {
        await supabase.functions.invoke("send-contact-email", {
          body: {
            name: result.data.name,
            email: result.data.email,
            phone: result.data.phone || undefined,
            message: messageWithBudget,
          },
        });
      } catch {
        // Don't block on email failure
      }

      toast({
        title: t("contactPage.successTitle"),
        description: t("contactPage.successMessage"),
      });
      setFormData({ name: "", email: "", phone: "", message: "", budget: "", kvkkConsent: false });
    } catch {
      toast({
        title: t("contactPage.errorTitle"),
        description: t("contactPage.errorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const dubaiSteps = [{
    number: "01",
    title: t("buyerGuidePage.dubai.step1.title"),
    description: t("buyerGuidePage.dubai.step1.description"),
    fullDescription: t("buyerGuidePage.dubai.step1.fullDescription"),
    imagePosition: "right" as const
  }, {
    number: "02",
    title: t("buyerGuidePage.dubai.step2.title"),
    description: t("buyerGuidePage.dubai.step2.description"),
    fullDescription: t("buyerGuidePage.dubai.step2.fullDescription"),
    imagePosition: "left" as const
  }, {
    number: "03",
    title: t("buyerGuidePage.dubai.step3.title"),
    description: t("buyerGuidePage.dubai.step3.description"),
    fullDescription: t("buyerGuidePage.dubai.step3.fullDescription"),
    imagePosition: "right" as const
  }, {
    number: "04",
    title: t("buyerGuidePage.dubai.step4.title"),
    description: t("buyerGuidePage.dubai.step4.description"),
    fullDescription: t("buyerGuidePage.dubai.step4.fullDescription"),
    imagePosition: "left" as const
  }];
  const turkeySteps = [{
    number: "01",
    title: t("buyerGuidePage.turkey.step1.title"),
    description: t("buyerGuidePage.turkey.step1.description"),
    fullDescription: t("buyerGuidePage.turkey.step1.fullDescription"),
    imagePosition: "right" as const
  }, {
    number: "02",
    title: t("buyerGuidePage.turkey.step2.title"),
    description: t("buyerGuidePage.turkey.step2.description"),
    fullDescription: t("buyerGuidePage.turkey.step2.fullDescription"),
    imagePosition: "left" as const
  }, {
    number: "03",
    title: t("buyerGuidePage.turkey.step3.title"),
    description: t("buyerGuidePage.turkey.step3.description"),
    fullDescription: t("buyerGuidePage.turkey.step3.fullDescription"),
    imagePosition: "right" as const
  }, {
    number: "04",
    title: t("buyerGuidePage.turkey.step4.title"),
    description: t("buyerGuidePage.turkey.step4.description"),
    fullDescription: t("buyerGuidePage.turkey.step4.fullDescription"),
    imagePosition: "left" as const
  }];
  const steps = locationFilter === "dubai" ? dubaiSteps : turkeySteps;
  return <div className={`min-h-screen transition-colors duration-500 ${locationFilter === "dubai" ? "bg-[hsl(0,0%,11%)]" : "bg-background"}`}>
      <SEOHead
        title="Buyer's Guide - How to Buy Property in Turkey & Dubai"
        description="Step-by-step guide to buying property in Türkiye & Dubai as a foreigner. Turkish citizenship by investment, legal process & expert tips."
        path="/buyer-guide"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "Can foreigners buy property in Turkey?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Yes. Since 2012, citizens of 183 countries can purchase property in Turkey. According to Turkey's Land Registry, over 35,000 properties were sold to foreign nationals in 2023."
              }
            },
            {
              "@type": "Question",
              "name": "How do I get Turkish citizenship through real estate?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Foreign investors who purchase property worth a minimum of $400,000 USD in Turkey are eligible to apply for Turkish citizenship by investment."
              }
            },
            {
              "@type": "Question",
              "name": "What are the best areas to invest in Istanbul real estate?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Top investment areas in Istanbul include Beşiktaş, Şişli, Sarıyer, Beylikdüzü, and Başakşehir — offering strong rental yields and capital appreciation."
              }
            }
          ]
        }}
      />
      <Header />
      <main className="pt-24">
        {/* Steps Section */}
        <section className={`py-16 transition-colors duration-500 ${locationFilter === "dubai" ? "bg-[hsl(0,0%,11%)]" : "bg-background"}`}>
          <div className="container mx-auto px-4">
            {/* Filter Tabs */}
            <div className="mb-8 flex justify-center gap-2.5">
              <button
                type="button"
                onClick={() => setLocationFilter("turkey")}
                className={`px-6 py-3 rounded-full border text-[15px] transition-all duration-300 ${
                  locationFilter === "turkey"
                    ? "bg-gold text-primary border-gold"
                    : locationFilter === "dubai"
                      ? "bg-[hsl(0,0%,15%)] border-white/20 text-white hover:bg-[hsl(0,0%,20%)]"
                      : "border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                }`}
              >
                {t("buyerGuidePage.buttonTurkey")}
              </button>
              <button
                type="button"
                onClick={() => setLocationFilter("dubai")}
                className={`px-6 py-3 rounded-full border text-[15px] transition-all duration-300 ${
                  locationFilter === "dubai"
                    ? "bg-gold text-primary border-gold"
                    : "border-border text-foreground hover:bg-primary hover:text-primary-foreground hover:border-primary"
                }`}
              >
                {t("buyerGuidePage.buttonDubai")}
              </button>
            </div>

          <RevealOnScroll className="text-center mb-16 max-w-xl mx-auto">
            <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-4 transition-colors duration-500 ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'} ${locationFilter === "dubai" ? "text-white" : "text-foreground"}`}>
              {t("buyerGuidePage.mainTitle")}
            </h2>
            <p className={`text-base leading-[1.7] transition-colors duration-500 ${locationFilter === "dubai" ? "text-white/80" : "text-muted-foreground"}`}>
              {t("buyerGuidePage.mainSubtitle")}
            </p>
          </RevealOnScroll>

          {steps.map((step, index) => <RevealOnScroll key={step.number} delay={index * 80} className={`flex flex-col ${step.imagePosition === "right" ? "lg:flex-row" : "lg:flex-row-reverse"} gap-8 lg:gap-16 items-center mb-20 last:mb-0 group`}>
              <div className="flex-1">
                <div className={`p-8 md:p-10 rounded-[20px] shadow-luxury hover:shadow-xl transition-all duration-500 ${locationFilter === "dubai" ? "bg-[hsl(0,0%,15%)] border border-white/10" : "bg-card border border-border"}`}>
                  <div className="flex items-center gap-6 mb-6">
                    <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gradient-gold text-gold font-bold font-serif text-2xl">
                      {step.number}
                    </div>
                  </div>
                  <h3 className={`text-2xl md:text-3xl tracking-[-0.5px] mb-5 transition-colors duration-500 ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'} ${locationFilter === "dubai" ? "text-white" : "text-foreground"}`}>{step.title}</h3>
                  <p className={`mb-4 leading-[1.7] text-base transition-colors duration-500 ${locationFilter === "dubai" ? "text-white/70" : "text-muted-foreground"}`}>
                    {step.description}
                  </p>
                  <p className={`leading-[1.7] transition-colors duration-500 ${locationFilter === "dubai" ? "text-white/70" : "text-muted-foreground"}`}>{step.fullDescription}</p>
                </div>
              </div>

              <div className="flex-1">
                <div className="aspect-[4/3] rounded-[20px] overflow-hidden shadow-luxury group-hover:shadow-xl transition-smooth">
                  <OptimizedImage src={[step1Image, step2Image, step3Image, step4Image][index]} alt={step.title} className="group-hover:scale-105 transition-smooth" containerClassName="w-full h-full" />
                </div>
              </div>
            </RevealOnScroll>)}
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-20 md:py-32 gradient-hero mx-2 md:mx-3 my-3 rounded-[20px] overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <RevealOnScroll className="bg-white/5 backdrop-blur-sm rounded-[20px] p-8 md:p-12 lg:p-16 border border-white/10 shadow-luxury">
              <div className="text-center mb-10">
                <div className="text-xs font-medium uppercase tracking-[1.5px] text-gold mb-4">{t("buyerGuidePage.ctaTitle")}</div>
                <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-white mb-4 ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                  {locationFilter === "dubai" ? t("buyerGuidePage.ctaTitleDubai") : locationFilter === "turkey" ? t("buyerGuidePage.ctaTitleTurkey") : t("buyerGuidePage.ctaTitle")}
                </h2>
                <p className="text-white/70">
                  {locationFilter === "dubai" ? t("buyerGuidePage.ctaSubtitleDubai") : locationFilter === "turkey" ? t("buyerGuidePage.ctaSubtitleTurkey") : ""}
                </p>
              </div>

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder={t("contactPage.namePlaceholder")}
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:border-[hsl(var(--gold))] focus:bg-white/15 transition-smooth backdrop-blur-sm"
                      maxLength={100}
                    />
                    {formErrors.name && <p className="text-gold text-xs mt-1">{formErrors.name}</p>}
                  </div>
                  <div className="flex-1">
                    <input
                      type="email"
                      placeholder={t("contactPage.emailPlaceholder")}
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:border-[hsl(var(--gold))] focus:bg-white/15 transition-smooth backdrop-blur-sm"
                      maxLength={255}
                    />
                    {formErrors.email && <p className="text-gold text-xs mt-1">{formErrors.email}</p>}
                  </div>
                </div>

                <div>
                  <PhoneInput
                    international
                    defaultCountry="US"
                    placeholder={t("contactPage.phonePlaceholder")}
                    value={formData.phone}
                    onChange={(value) => setFormData({ ...formData, phone: value || "" })}
                    className="phone-input-custom w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus-within:border-[hsl(var(--gold))] focus-within:bg-white/15 transition-smooth backdrop-blur-sm"
                  />
                  {formErrors.phone && <p className="text-gold text-xs mt-1">{formErrors.phone}</p>}
                </div>

                <div>
                  <textarea
                    placeholder={t("contactPage.messagePlaceholder")}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:border-[hsl(var(--gold))] focus:bg-white/15 transition-smooth backdrop-blur-sm resize-none"
                    maxLength={1000}
                  />
                  {formErrors.message && <p className="text-gold text-xs mt-1">{formErrors.message}</p>}
                </div>

                <FormExtras
                  variant="glass"
                  budget={formData.budget}
                  onBudgetChange={(v) => setFormData({ ...formData, budget: v })}
                  kvkk={formData.kvkkConsent}
                  onKvkkChange={(v) => setFormData({ ...formData, kvkkConsent: v })}
                  budgetError={formErrors.budget ? t(`formFields.${formErrors.budget}`) : undefined}
                  kvkkError={formErrors.kvkkConsent ? t(`formFields.${formErrors.kvkkConsent}`) : undefined}
                />


                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full sm:w-auto px-10 py-4 bg-[hsl(var(--gold))] text-[hsl(var(--olive))] rounded-2xl hover:bg-[hsl(var(--gold))]/90 transition-smooth font-semibold text-lg shadow-lg hover:shadow-xl hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? t("contactPage.sending") : t("buyerGuidePage.submitButton")}
                </button>
              </form>
            </RevealOnScroll>
          </div>
        </div>
      </section>
      </main>
      <Footer />
    </div>;
};
export default BuyerGuide;