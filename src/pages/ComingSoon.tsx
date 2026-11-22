import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight, Facebook, Instagram, Linkedin, Mail, MessageCircle } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { whatsappLink } from "@/lib/whatsapp";
import logo from "@/assets/logo-horizontal.png";
import heroImage from "@/assets/photos/hero-skyline.webp";

const SOCIALS = [
  { href: "https://www.instagram.com/voi.home/", label: "Instagram", Icon: Instagram },
  { href: "https://www.linkedin.com/company/voi-home", label: "LinkedIn", Icon: Linkedin },
  { href: "https://www.facebook.com/profile.php?id=61576846872911", label: "Facebook", Icon: Facebook },
];

// Shown to every visitor while maintenance mode is on (admin > Maintenance).
// Signed-in admins see the full site. `data-coming-soon` tells the
// prerenderer this page is intentional, not a broken render.
const ComingSoon = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const serif = isRTL ? "font-arabic" : "font-serif";

  return (
    <div
      data-coming-soon="true"
      dir={isRTL ? "rtl" : "ltr"}
      className={`relative min-h-[100svh] overflow-hidden bg-[#0d0d0c] text-[#E6E2DA] ${isRTL ? "font-arabic" : ""}`}
    >
      <SEOHead
        title="Voi Home | Luxury Real Estate in Istanbul, opening soon"
        description="Voi Home is a boutique real estate advisory in Istanbul. Our new website is opening soon. Call or message us on WhatsApp at +90 552 797 10 00."
        path="/"
      />

      {/* Photo with a slow drift, darkened towards the text */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-105 animate-[coming-soon-drift_24s_ease-in-out_infinite_alternate] motion-reduce:animate-none"
        style={{ backgroundImage: `url(${heroImage})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-r from-burgundy/40 via-transparent to-transparent rtl:bg-gradient-to-l" aria-hidden="true" />

      <div className="relative z-10 flex min-h-[100svh] flex-col px-6 py-6 md:px-12 md:py-10">
        <header className="flex items-center justify-between">
          <img src={logo} alt="Voi Home" className="h-9 md:h-11 w-auto" />
          <LanguageSwitcher />
        </header>

        <main className="flex flex-1 items-end pb-6 md:pb-10">
          <div className="max-w-3xl">
            <div className="mb-6 flex items-center gap-3 text-xs font-medium uppercase tracking-[2px] text-[#E6E2DA]/70">
              <span className="h-px w-8 bg-[#E6E2DA]/50" />
              {t("comingSoon.eyebrow")}
            </div>
            <h1 className={`text-[44px] leading-[1.02] tracking-[-1.5px] md:text-[80px] md:tracking-[-2.5px] ${serif}`}>
              {t("comingSoon.titleStart")}{" "}
              <span className="text-[#E6E2DA]/60">{t("comingSoon.titleAccent")}</span>
            </h1>
            <p className="mt-6 max-w-xl text-base leading-[1.7] text-[#E6E2DA]/75 md:text-lg">{t("comingSoon.subtitle")}</p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <a
                href={whatsappLink(t("whatsapp.defaultMessage"))}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-12 items-center gap-2 rounded-full bg-burgundy px-6 text-[15px] font-medium text-white transition-colors hover:bg-burgundy/85"
              >
                <MessageCircle className="h-4 w-4" />
                {t("comingSoon.whatsapp")}
              </a>
              <a
                href="mailto:info@voi-home.com"
                className="inline-flex h-12 items-center gap-2 rounded-full border border-[#E6E2DA]/35 px-6 text-[15px] font-medium text-[#E6E2DA] transition-colors hover:bg-[#E6E2DA]/10"
              >
                <Mail className="h-4 w-4" />
                info@voi-home.com
              </a>
            </div>
          </div>
        </main>

        <footer className="flex flex-col-reverse gap-5 border-t border-[#E6E2DA]/15 pt-5 text-sm text-[#E6E2DA]/60 md:flex-row md:items-center md:justify-between">
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            <span>© {new Date().getFullYear()} Voi Home</span>
            <a href="tel:+905527971000" className="hover:text-[#E6E2DA] transition-colors" dir="ltr">
              +90 552 797 10 00
            </a>
            <Link to="/auth" className="group inline-flex items-center gap-1 hover:text-[#E6E2DA] transition-colors">
              {t("comingSoon.teamLogin")}
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 rtl:rotate-180" />
            </Link>
          </div>
          <div className="flex items-center gap-2">
            {SOCIALS.map(({ href, label, Icon }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#E6E2DA]/20 text-[#E6E2DA]/80 transition-colors hover:border-[#E6E2DA]/60 hover:text-[#E6E2DA]"
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ComingSoon;
