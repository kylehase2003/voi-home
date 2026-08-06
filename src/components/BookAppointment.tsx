import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { triggerLeadWebhook } from "@/lib/leadWebhook";
import { z } from "zod";
import locationImage from "@/assets/location-image.webp";
import FormExtras, { BUDGET_OPTIONS, type BudgetValue } from "@/components/FormExtras";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().max(1000, "Message must be less than 1000 characters").optional().or(z.literal("")),
  budget: z.enum(BUDGET_OPTIONS, { errorMap: () => ({ message: "budgetRequired" }) }),
  kvkkConsent: z.literal(true, { errorMap: () => ({ message: "kvkkRequired" }) }),
});

const BookAppointment = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    budget: "" as BudgetValue,
    kvkkConsent: false,
  });
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const { toast } = useToast();
  const { t } = useTranslation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    // Validate form data
    const result = contactSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: { [key: string]: string } = {};
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

      const { error } = await supabase.from("contact_submissions").insert([
        {
          name: result.data.name,
          email: result.data.email,
          message: messageWithBudget,
        },
      ]);

      if (error) throw error;

      await triggerLeadWebhook({
        name: result.data.name,
        email: result.data.email,
        message: result.data.message,
        budget: result.data.budget,
        budgetLabel,
        kvkkConsent: true,
        source: "book-appointment",
      });

      toast({
        title: t('bookAppointment.successTitle'),
        description: t('bookAppointment.successDescription'),
      });

      setFormData({ name: "", email: "", message: "", budget: "", kvkkConsent: false });
    } catch (error) {
      toast({
        title: t('bookAppointment.errorTitle'),
        description: t('bookAppointment.errorDescription'),
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="relative py-20 bg-primary text-primary-foreground overflow-hidden">
      {/* World map background image */}
      <div className="absolute right-0 top-0 bottom-0 w-1/2 opacity-30 pointer-events-none">
        <img src={locationImage} alt="World map" className="w-full h-full object-contain" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl">
          <p className="text-gold font-medium tracking-wide mb-2">{t('bookAppointment.subtitle')}</p>
          <h2 className="text-3xl md:text-2xl font-serif mb-8">
            {t('bookAppointment.title')}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <Input
                  placeholder={t('bookAppointment.namePlaceholder')}
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-gold"
                  maxLength={100}
                />
                {errors.name && <p className="text-gold text-sm mt-1">{errors.name}</p>}
              </div>
              <div>
                <Input
                  type="email"
                  placeholder={t('bookAppointment.emailPlaceholder')}
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-gold"
                  maxLength={255}
                />
                {errors.email && <p className="text-gold text-sm mt-1">{errors.email}</p>}
              </div>
            </div>

            <div>
              <Textarea
                placeholder={t('bookAppointment.messagePlaceholder')}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="bg-primary-foreground/10 border-primary-foreground/20 text-primary-foreground placeholder:text-primary-foreground/60 focus:border-gold min-h-[150px] resize-none"
                maxLength={1000}
              />
              {errors.message && <p className="text-gold text-sm mt-1">{errors.message}</p>}
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
              variant="outline"
              size="lg"
              className="bg-transparent border-2 border-gold text-gold hover:bg-gold hover:text-primary transition-all duration-300"
            >
              {isSubmitting ? t('bookAppointment.submittingButton') : t('bookAppointment.submitButton')}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default BookAppointment;
