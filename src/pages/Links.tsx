import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight, Facebook, Globe, Home, Instagram, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import logo from "@/assets/logo-new.png";
import heroImage from "@/assets/photos/hero-skyline.webp";

const PHONE_DISPLAY = "+90 552 797 10 00";
const PHONE_TEL = "+905527971000";

// Link-in-bio page (voi-home.com/links) to share on social profiles.
// Standalone layout: no site header/footer, one column, thumb-sized buttons.
const Links = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const whatsapp = `https://api.whatsapp.com/send/?phone=${PHONE_TEL.replace("+", "")}&text=${encodeURIComponent(
    t("whatsapp.defaultMessage")
  )}&type=phone_number&app_absent=0`;

  const primary = [
    { label: t("links.whatsapp"), href: whatsapp, external: true, icon: WhatsAppGlyph },
    { label: `${t("links.call")} · ${PHONE_DISPLAY}`, href: `tel:${PHONE_TEL}`, external: true, icon: Phone },
    { label: t("links.properties"), href: "/properties", icon: Home },
    { label: t("links.map"), href: "/properties-map", icon: MapPin },
    { label: t("links.services"), href: "/services", icon: Globe },
    { label: t("links.journal"), href: "/blogs", icon: ArrowUpRight },
    { label: t("links.email"), href: "mailto:info@voi-home.com", external: true, icon: Mail },
  ];

  const socials = [
    { label: "Instagram", href: "https://www.instagram.com/voi.home/", icon: Instagram },
    { label: "TikTok", href: "https://www.tiktok.com/@voi_home", icon: TikTokIcon },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61576846872911", icon: Facebook },
    { label: "LinkedIn", href: "https://www.linkedin.com/company/voi-home", icon: Linkedin },
  ];

  const rowClass =
    "group flex items-center gap-4 w-full rounded-2xl bg-white/[0.07] hover:bg-white border border-white/10 hover:border-white px-5 py-4 text-white hover:text-black transition-all duration-300";

  return (
    <div dir={isRTL ? "rtl" : "ltr"} className={`relative min-h-screen bg-black text-white ${isRTL ? "font-arabic" : ""}`}>
      <SEOHead
        title="Voi Home | Links"
        description="Follow Voi Home and get in touch: WhatsApp, phone, Instagram, TikTok, properties and more."
        path="/links"
      />
      <Helmet>
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600&display=swap"
          rel="stylesheet"
        />
      </Helmet>

      <img src={heroImage} alt="" className="fixed inset-0 w-full h-full object-cover opacity-35" />
      <div className="fixed inset-0 bg-gradient-to-b from-black/40 via-black/80 to-black" />

      <main
        className="relative z-10 mx-auto max-w-md px-5 pt-14 pb-12 flex flex-col items-center"
        style={{ fontFamily: isRTL ? undefined : "'General Sans', -apple-system, sans-serif" }}
      >
        <Link to="/" aria-label="Voi Home">
          <img src={logo} alt="Voi Home" className="h-16 w-auto mb-5" />
        </Link>
        <h1 className={`text-[28px] leading-tight tracking-[-0.6px] text-center mb-2 ${isRTL ? "" : "font-serif"}`}>
          Voi Home
        </h1>
        <p className="text-sm text-white/65 text-center max-w-xs mb-6">{t("links.bio")}</p>

        <div className="flex gap-2 mb-8">
          {socials.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="w-11 h-11 rounded-full border border-white/20 bg-white/5 hover:bg-white hover:text-black flex items-center justify-center transition-colors"
            >
              <Icon className="w-[18px] h-[18px]" />
            </a>
          ))}
        </div>

        <ul className="w-full space-y-3">
          {primary.map(({ label, href, external, icon: Icon }) => {
            const inner = (
              <>
                <span className="w-9 h-9 shrink-0 rounded-full bg-white/10 group-hover:bg-black/5 flex items-center justify-center">
                  <Icon className="w-[18px] h-[18px]" />
                </span>
                <span className="flex-1 text-[15px] font-medium" dir="auto">{label}</span>
                <ArrowUpRight className="w-4 h-4 opacity-50 group-hover:opacity-100 rtl:-scale-x-100" />
              </>
            );
            return (
              <li key={href}>
                {external ? (
                  <a href={href} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className={rowClass}>
                    {inner}
                  </a>
                ) : (
                  <Link to={href} className={rowClass}>
                    {inner}
                  </Link>
                )}
              </li>
            );
          })}
        </ul>

        <a
          href="https://maps.app.goo.gl/aduv35z9XnK8S4J49"
          target="_blank"
          rel="noopener noreferrer"
          className="mt-8 text-xs text-white/50 hover:text-white transition-colors flex items-center gap-1.5"
        >
          <MapPin className="w-3.5 h-3.5" />
          {t("links.office")}
        </a>
        <p className="mt-2 text-xs text-white/35">voi-home.com</p>
      </main>
    </div>
  );
};

function WhatsAppGlyph({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} fill="currentColor" aria-hidden="true">
      <path d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.502 1.128 6.748 3.046 9.39L1.06 31.07l5.89-1.948A15.923 15.923 0 0016.004 32C24.826 32 32 24.826 32 16S24.826 0 16.004 0zm9.31 22.606c-.39 1.1-1.932 2.014-3.17 2.28-.848.18-1.956.324-5.684-1.222-4.772-1.978-7.838-6.816-8.076-7.132-.228-.316-1.918-2.554-1.918-4.872s1.214-3.456 1.644-3.928c.43-.472.94-.59 1.254-.59.312 0 .626.002.898.016.288.014.676-.11 1.058.806.39.94 1.33 3.258 1.448 3.494.118.236.196.512.04.826-.158.316-.236.512-.472.79-.236.276-.496.618-.71.828-.236.236-.482.492-.208.964.276.472 1.226 2.022 2.632 3.276 1.81 1.614 3.336 2.114 3.808 2.35.472.236.748.196 1.024-.118.276-.316 1.176-1.372 1.49-1.844.314-.472.628-.39 1.06-.236.432.158 2.748 1.296 3.22 1.532.472.236.786.354.904.55.118.196.118 1.14-.272 2.24z" />
    </svg>
  );
}

export default Links;
