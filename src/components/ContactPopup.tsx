import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { triggerLeadWebhook } from "@/lib/leadWebhook";
import { z } from "zod";
import PhoneInput, { isValidPhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import FormExtras, { BUDGET_OPTIONS, type BudgetValue } from "@/components/FormExtras";

const contactSchema = z.object({
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

const POPUP_DELAY_MS = 5000;
const POPUP_DISMISSED_KEY = "contact_popup_dismissed";

const ContactPopup = () => {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", phone: "", message: "", budget: "" as BudgetValue, kvkkConsent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const { toast } = useToast();
  const { t, i18n } = useTranslation();
  const location = useLocation();

  useEffect(() => {
    // Don't show on dashboard pages
    if (location.pathname.startsWith("/dashboard")) return;

    const dismissed = sessionStorage.getItem(POPUP_DISMISSED_KEY);
    if (dismissed) return;

    const timer = setTimeout(() => {
      setOpen(true);
    }, POPUP_DELAY_MS);

    return () => clearTimeout(timer);
  }, [location.pathname]);

  // Listen for custom event to open popup programmatically
  useEffect(() => {
    const handler = () => setOpen(true);
    window.addEventListener("open-contact-popup", handler);
    return () => window.removeEventListener("open-contact-popup", handler);
  }, []);

  const handleClose = () => {
    setOpen(false);
    sessionStorage.setItem(POPUP_DISMISSED_KEY, "true");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0].toString()] = err.message;
      });
      setErrors(fieldErrors);
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
        source: "contact-popup",
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
      handleClose();
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

  return (
    <Dialog open={open} onOpenChange={(val) => { if (!val) handleClose(); }}>
      <DialogContent className={`sm:max-w-[600px] w-[calc(100%-2rem)] max-w-[calc(100%-2rem)] sm:w-full rounded-2xl sm:rounded-lg bg-primary border-primary-foreground/20 text-primary-foreground p-0 gap-0 overflow-hidden [&>button]:text-primary-foreground [&>button]:hover:text-gold ${i18n.language === 'ar' ? 'font-arabic' : ''}`} dir={i18n.language === 'ar' ? 'rtl' : 'ltr'}>
        <DialogTitle className="sr-only">{t("contactPopup.title")}</DialogTitle>
        <DialogDescription className="sr-only">{t("contactPopup.description")}</DialogDescription>

        <div className="p-8 md:p-10">
          <p className="text-gold font-medium tracking-widest text-sm mb-3 uppercase">
            {t("contactPopup.subtitle")}
          </p>
          <h2 className={`text-3xl md:text-4xl mb-3 ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
            {t("contactPopup.title")}
          </h2>
          <p className="text-primary-foreground/70 mb-8 text-sm">
            {t("contactPopup.description")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Input
                  placeholder={t("bookAppointment.namePlaceholder")}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold"
                  maxLength={100}
                />
                {errors.name && <p className="text-gold text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder={t("bookAppointment.emailPlaceholder")}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold"
                  maxLength={255}
                />
                {errors.email && <p className="text-gold text-xs mt-1">{errors.email}</p>}
            </div>
            </div>

            <div>
              <PhoneInput
                international
                defaultCountry="US"
                placeholder={t("bookAppointment.phonePlaceholder")}
                value={formData.phone}
                onChange={(value) => setFormData({ ...formData, phone: value || "" })}
                className="phone-input-custom flex h-10 w-full rounded-md border border-primary-foreground/20 bg-primary-foreground/10 px-3 py-2 text-sm text-primary-foreground focus-within:border-gold"
              />
              {errors.phone && <p className="text-gold text-xs mt-1">{errors.phone}</p>}
            </div>

            <div>
              <Textarea
                placeholder={t("bookAppointment.messagePlaceholder")}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/50 focus:border-gold min-h-[140px] resize-none"
                maxLength={1000}
              />
              {errors.message && <p className="text-gold text-xs mt-1">{errors.message}</p>}
            </div>

            <FormExtras
              variant="dark"
              budget={formData.budget}
              onBudgetChange={(v) => setFormData({ ...formData, budget: v })}
              kvkk={formData.kvkkConsent}
              onKvkkChange={(v) => setFormData({ ...formData, kvkkConsent: v })}
              budgetError={errors.budget ? t(`formFields.${errors.budget}`) : undefined}
              kvkkError={errors.kvkkConsent ? t(`formFields.${errors.kvkkConsent}`) : undefined}
            />


            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gold hover:bg-gold/90 text-primary font-semibold px-8"
            >
              {isSubmitting ? t("contactPage.sending") : t("bookAppointment.submitButton")}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactPopup;
