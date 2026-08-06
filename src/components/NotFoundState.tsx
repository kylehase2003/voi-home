import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowLeft, LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface NotFoundStateProps {
  icon?: LucideIcon | "emoji";
  emoji?: string;
  titleKey: string;
  descriptionKey: string;
  primaryAction: {
    to: string;
    labelKey: string;
    icon?: LucideIcon;
    showBackArrow?: boolean;
  };
  secondaryAction?: {
    to: string;
    labelKey: string;
    icon?: LucideIcon;
  };
}

const NotFoundState = ({
  icon: IconComponent,
  emoji,
  titleKey,
  descriptionKey,
  primaryAction,
  secondaryAction,
}: NotFoundStateProps) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  return (
    <div className="flex-1 flex items-center justify-center bg-gradient-to-b from-primary/5 to-background px-4 py-8 pt-36 sm:pt-40 md:pt-44">
      <div className="text-center max-w-md mx-auto animate-fade-in">
        {/* Icon */}
        <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto rounded-full bg-gold/10 flex items-center justify-center mb-4 sm:mb-6">
          {IconComponent && IconComponent !== "emoji" ? (
            <IconComponent className="h-8 w-8 sm:h-10 sm:w-10 text-gold" />
          ) : (
            <span className="text-3xl sm:text-4xl">{emoji || "🔍"}</span>
          )}
        </div>

        {/* Title */}
        <h1
          className={`text-2xl sm:text-3xl md:text-4xl mb-2 sm:mb-3 text-foreground ${
            isRTL ? "font-arabic" : "font-serif"
          }`}
        >
          {t(titleKey)}
        </h1>

        {/* Description */}
        <p className="text-sm sm:text-base text-muted-foreground mb-6 sm:mb-8 px-4">
          {t(descriptionKey)}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center px-4">
          <Link to={primaryAction.to} className="w-full sm:w-auto">
            <Button className="w-full sm:w-auto bg-gold hover:bg-gold/90 text-primary px-6 gap-2">
              {primaryAction.showBackArrow && (
                <ArrowLeft className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
              )}
              {primaryAction.icon && !primaryAction.showBackArrow && (
                <primaryAction.icon className="h-4 w-4" />
              )}
              {t(primaryAction.labelKey)}
            </Button>
          </Link>
          {secondaryAction && (
            <Link to={secondaryAction.to} className="w-full sm:w-auto">
              <Button variant="outline" className="w-full sm:w-auto px-6 gap-2">
                {secondaryAction.icon && <secondaryAction.icon className="h-4 w-4" />}
                {t(secondaryAction.labelKey)}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotFoundState;
