import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Globe, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

const GENERAL_SANS = "'General Sans', -apple-system, sans-serif";

// Site-wide primary nav. Permanent/non-collapsing floating pill (no
// scroll-triggered condensing) - the hamburger and CTA are separate floating
// elements on the right, not packed into the logo pill.
const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.properties"), href: "/properties" },
    { name: t("nav.propertiesMap"), href: "/properties-map" },
    { name: t("nav.turkishCitizenship"), href: "/properties?benefit=Citizenship+Eligible" },
    { name: t("nav.buyerGuide"), href: "/buyer-guide" },
    { name: t("nav.blogs"), href: "/blogs" },
    { name: t("nav.about"), href: "/about" },
  ];

  const isActivePath = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    if (href.includes("?")) return location.pathname + location.search === href;
    if (href !== "/" && location.pathname === href) return true;
    return false;
  };

  const languageMap: Record<string, string> = { en: "EN", ar: "AR" };

  return (
    <Sheet>
      <nav
        className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center rounded-full border pl-6 pr-6 lg:pr-2 py-2 bg-[rgba(29,27,24,0.55)] border-white/[0.12] backdrop-blur-[32px] backdrop-saturate-[140%] shadow-[0_8px_32px_rgba(0,0,0,0.15)] max-w-[95vw]"
        style={{ fontFamily: GENERAL_SANS }}
      >
        <Link to="/" className="flex items-center shrink-0 lg:mr-6">
          <img src={logo} alt="VOI" className="h-6 w-auto" />
        </Link>

        {/* Desktop links */}
        <div className="hidden lg:flex items-center gap-1 mr-2">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className={`px-3.5 py-2 text-[13.5px] font-medium tracking-[-0.1px] rounded-full whitespace-nowrap transition-colors ${
                isActivePath(item.href) ? "text-white bg-white/15" : "text-white/70 hover:text-white hover:bg-white/10"
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        <div className="hidden lg:flex items-center shrink-0">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="flex items-center gap-1.5 px-3 py-2 text-[13.5px] font-medium text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                <Globe className="h-3.5 w-3.5" />
                {languageMap[i18n.language] || "EN"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="bg-card z-[60]">
              <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
              <DropdownMenuItem onClick={() => changeLanguage("ar")}>العربية</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>

      {/* CTA - separate floating pill on the right, not packed into the logo/links pill */}
      <Link
        to="/contact"
        className="hidden lg:block fixed top-5 right-5 z-50"
        style={{ fontFamily: GENERAL_SANS }}
      >
        <Button
          size="sm"
          className="rounded-full bg-gold hover:bg-gold/90 text-white text-[13.5px] font-medium py-[11px] px-6 shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
        >
          {t("hero.bookConsultation")}
        </Button>
      </Link>

      {/* Mobile hamburger - separate floating button on the right */}
      <SheetTrigger asChild>
        <button
          className="lg:hidden fixed top-5 right-5 z-50 flex items-center justify-center h-11 w-11 rounded-full border text-white bg-[rgba(29,27,24,0.55)] border-white/[0.12] backdrop-blur-[32px] backdrop-saturate-[140%] shadow-[0_8px_32px_rgba(0,0,0,0.15)]"
          aria-label="Open navigation menu"
        >
          <Menu size={20} />
        </button>
      </SheetTrigger>
      <SheetContent side="right" className="bg-[#1D1B18] border-l border-white/10 w-[85vw] sm:w-[400px] p-0 shadow-2xl">
        <SheetHeader className="sr-only">
          <SheetTitle>{t("nav.home")}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full" style={{ fontFamily: GENERAL_SANS }}>
          <div className="px-6 pt-10 pb-6 border-b border-white/10">
            <img src={logo} alt="VOI" className="h-8 w-auto" />
          </div>

          <nav className="flex-1 px-6 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`block text-lg py-3 px-4 rounded-xl transition-colors ${
                  isActivePath(item.href) ? "text-gold bg-white/10" : "text-white/80 hover:text-white hover:bg-white/5"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="px-6 pb-6 space-y-5 border-t border-white/10 pt-5">
            <div>
              <p className="text-white/50 text-xs uppercase tracking-[0.2em] mb-3">{t("nav.language")}</p>
              <div className="flex gap-2">
                {(["en", "ar"] as const).map((lng) => (
                  <button
                    key={lng}
                    onClick={() => changeLanguage(lng)}
                    className={`flex-1 px-3 py-2.5 text-sm font-semibold rounded-lg transition-all ${
                      i18n.language === lng ? "bg-gold text-white" : "border border-white/15 text-white/70"
                    }`}
                  >
                    {lng.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <Link to="/contact">
              <Button className="w-full bg-gold hover:bg-gold/90 text-white py-5 text-base font-medium rounded-lg">
                <HomeIcon className="mr-2 h-5 w-5" />
                {t("nav.contactUs")}
              </Button>
            </Link>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Header;
