import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MapSection from "@/components/MapSection";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import heroImage from "@/assets/hero-villa.webp";
import { supabase } from "@/integrations/supabase/client";
import { triggerLeadWebhook } from "@/lib/leadWebhook";
import { z } from "zod";
import SEOHead from "@/components/SEOHead";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FormExtras, { BUDGET_OPTIONS, type BudgetValue } from "@/components/FormExtras";
const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z
    .string()
    .trim()
    .max(20, "Phone must be less than 20 characters")
    .optional()
    .refine((val) => !val || isValidPhoneNumber(val), { message: "Invalid phone number" }),
  message: z
    .string()
    .trim()
    .max(2000, "Message must be less than 2000 characters")
    .optional()
    .or(z.literal("")),
  budget: z.enum(BUDGET_OPTIONS, { errorMap: () => ({ message: "budgetRequired" }) }),
  kvkkConsent: z.literal(true, { errorMap: () => ({ message: "kvkkRequired" }) }),
});
const Contact = () => {
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    budget: "" as BudgetValue,
    kvkkConsent: false,
  });
  const [errors, setErrors] = useState<{
    [key: string]: string;
  }>({});
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: {
        [key: string]: string;
      } = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) {
          fieldErrors[err.path[0].toString()] = err.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }
    setIsSubmitting(true);
    try {
      const budgetLabel = t(`formFields.budgetOptions.${result.data.budget}`);
      const messageWithBudget = `[${t("formFields.budgetLabel")}: ${budgetLabel}]${result.data.message ? `\n\n${result.data.message}` : ""}`;

      // Save to database
      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: result.data.name,
          email: result.data.email,
          phone: result.data.phone || null,
          message: messageWithBudget,
        },
      ]);
      if (error) throw error;

      // Trigger n8n webhook
      await triggerLeadWebhook({
        name: result.data.name,
        email: result.data.email,
        phone: result.data.phone || "",
        message: result.data.message,
        budget: result.data.budget,
        budgetLabel,
        kvkkConsent: true,
        source: "contact-page",
      });

      // Send email notification
      try {
        await supabase.functions.invoke("send-contact-email", {
          body: {
            name: result.data.name,
            email: result.data.email,
            phone: result.data.phone || null,
            message: messageWithBudget,
          },
        });
      } catch (emailError) {
        console.error("Failed to send email notification:", emailError);
      }
      toast({
        title: t("contactPage.successTitle"),
        description: t("contactPage.successMessage"),
      });
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        budget: "",
        kvkkConsent: false,
      });
    } catch (error) {
      toast({
        title: t("contactPage.errorTitle"),
        description: t("contactPage.errorMessage"),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactInfo = [
    {
      icon: Phone,
      title: t("contactPage.phone"),
      details: ["\u202A+90 552 797 10 00\u202C"],
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
        description="Contact MR. Property for luxury real estate consultancy in Istanbul, Bodrum, and Dubai. Call +90 545 120 22 37 or fill out our form for personalized assistance."
        path="/contact"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "MR. Property",
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
        <h1 className="sr-only">{t("seo.h1.contact")}</h1>
        <MapSection />

        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
              <div>
                <h2 className={`text-4xl mb-6 text-primary ${i18n.language === "ar" ? "font-arabic" : "font-serif"}`}>
                  {t("contactPage.formTitle")}
                </h2>
                <p className="text-muted-foreground mb-8 leading-relaxed">{t("contactPage.formSubtitle")}</p>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Input
                      placeholder={t("contactPage.namePlaceholder")}
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          name: e.target.value,
                        })
                      }
                      className="bg-background"
                      maxLength={100}
                    />
                    {errors.name && <p className="text-destructive text-sm mt-1">{errors.name}</p>}
                  </div>
                  <div>
                    <Input
                      type="email"
                      placeholder={t("contactPage.emailPlaceholder")}
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          email: e.target.value,
                        })
                      }
                      className="bg-background"
                      maxLength={255}
                    />
                    {errors.email && <p className="text-destructive text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div>
                    <PhoneInput
                      international
                      defaultCountry="US"
                      placeholder={t("contactPage.phonePlaceholder")}
                      value={formData.phone}
                      onChange={(value) =>
                        setFormData({
                          ...formData,
                          phone: value || "",
                        })
                      }
                      className="phone-input-custom flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
                    />
                    {errors.phone && <p className="text-destructive text-sm mt-1">{errors.phone}</p>}
                  </div>
                  <div>
                    <Textarea
                      placeholder={t("contactPage.messagePlaceholder")}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          message: e.target.value,
                        })
                      }
                      rows={6}
                      className="bg-background"
                      maxLength={2000}
                    />
                    {errors.message && <p className="text-destructive text-sm mt-1">{errors.message}</p>}
                  </div>
                  <FormExtras
                    variant="light"
                    budget={formData.budget}
                    onBudgetChange={(v) => setFormData({ ...formData, budget: v })}
                    kvkk={formData.kvkkConsent}
                    onKvkkChange={(v) => setFormData({ ...formData, kvkkConsent: v })}
                    budgetError={errors.budget ? t(`formFields.${errors.budget}`) : undefined}
                    kvkkError={errors.kvkkConsent ? t(`formFields.${errors.kvkkConsent}`) : undefined}
                  />
                  <Button
                    type="submit"
                    className="w-full bg-gold hover:bg-gold/90 text-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? t("contactPage.sending") : t("contactPage.sendButton")}
                  </Button>
                </form>
              </div>

              <div className="space-y-6">
                <h2 className={`text-4xl mb-6 text-primary ${i18n.language === "ar" ? "font-arabic" : "font-serif"}`}>
                  {t("contactPage.infoTitle")}
                </h2>
                {contactInfo.map((info, index) => (
                  <Card key={index} className="bg-card">
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
                ))}
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};
export default Contact;
