import { useTranslation } from "react-i18next";

export const BUDGET_OPTIONS = [
  "under_100k",
  "100k_200k",
  "200k_350k",
  "350k_plus",
] as const;

export type BudgetValue = (typeof BUDGET_OPTIONS)[number] | "";

interface FormExtrasProps {
  budget: BudgetValue;
  onBudgetChange: (value: BudgetValue) => void;
  kvkk: boolean;
  onKvkkChange: (value: boolean) => void;
  budgetError?: string;
  kvkkError?: string;
  variant?: "light" | "dark" | "glass";
}

const FormExtras = ({
  budget,
  onBudgetChange,
  kvkk,
  onKvkkChange,
  budgetError,
  kvkkError,
  variant = "light",
}: FormExtrasProps) => {
  const { t } = useTranslation();

  const selectClass =
    variant === "dark"
      ? "w-full h-10 rounded-md px-3 py-2 text-sm bg-primary-foreground/10 border border-primary-foreground/20 text-primary-foreground focus:border-gold focus:outline-none"
      : variant === "glass"
      ? "w-full px-6 py-4 rounded-2xl bg-white/10 border border-white/20 text-white placeholder:text-white/70 focus:outline-none focus:border-[hsl(var(--gold))] focus:bg-white/15 backdrop-blur-sm"
      : "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";

  const optionClass = variant === "dark" || variant === "glass" ? "bg-primary text-primary-foreground" : "";

  const labelColor =
    variant === "dark" || variant === "glass" ? "text-primary-foreground/90" : "text-foreground";
  const linkColor = variant === "dark" || variant === "glass" ? "text-gold underline" : "text-primary underline";
  const errorColor = variant === "dark" || variant === "glass" ? "text-gold" : "text-destructive";

  return (
    <>
      <div>
        <select
          value={budget}
          onChange={(e) => onBudgetChange(e.target.value as BudgetValue)}
          className={selectClass}
          aria-label={t("formFields.budgetLabel")}
          required
        >
          <option value="" disabled className={optionClass}>
            {t("formFields.budgetPlaceholder")}
          </option>
          {BUDGET_OPTIONS.map((key) => (
            <option key={key} value={key} className={optionClass}>
              {t(`formFields.budgetOptions.${key}`)}
            </option>
          ))}
        </select>
        {budgetError && <p className={`${errorColor} text-xs mt-1`}>{budgetError}</p>}
      </div>

      <div>
        <label className={`flex items-start gap-2 text-sm ${labelColor} cursor-pointer`}>
          <input
            type="checkbox"
            checked={kvkk}
            onChange={(e) => onKvkkChange(e.target.checked)}
            className="mt-1 h-4 w-4 accent-gold flex-shrink-0"
            required
          />
          <span>
            {t("formFields.kvkkConsent")}{" "}
            <a
              href="/privacy-policy"
              target="_blank"
              rel="noopener noreferrer"
              className={linkColor}
            >
              {t("formFields.kvkkLink")}
            </a>
          </span>
        </label>
        {kvkkError && <p className={`${errorColor} text-xs mt-1`}>{kvkkError}</p>}
      </div>
    </>
  );
};

export default FormExtras;
