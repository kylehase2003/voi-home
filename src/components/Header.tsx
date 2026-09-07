import { Link, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Menu, Globe, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import logo from "@/assets/logo.png";

const GENERAL_SANS = "'General Sans', -apple-system, sans-serif";

// Site-wide primary nav. A full-width bar pinned to the top edge, not a
// floating pill - logo left, links center, language/CTA right.
const Header = () => {
  const { t, i18n } = useTranslation();
  const location = useLocation();

  const changeLanguage = (lng: string) => i18n.changeLanguage(lng);

  const navigation = [
    { name: t("nav.home"), href: "/" },
    { name: t("nav.properties"), href: "/properties" },
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
      <header className="fixed top-0 left-0 right-0 z-50">
        <div
          className="absolute inset-x-0 top-0 h-40 pointer-events-none backdrop-blur-[24px] backdrop-saturate-[140%] bg-gradient-to-b from-[rgba(29,27,24,0.6)] via-[rgba(29,27,24,0.28)] to-transparent"
          style={{
            WebkitMaskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
            maskImage: "linear-gradient(to bottom, black 0%, black 45%, transparent 100%)",
          }}
        />
        <div
          className="relative flex items-center h-20 px-6 lg:px-10"
          style={{ fontFamily: GENERAL_SANS }}
        >
          <Link to="/" className="flex items-center shrink-0">
            <img src={logo} alt="VOI" className="h-14 w-auto" />
          </Link>

          {/* Desktop links - absolutely centered on the header, independent
              of the logo/CTA widths on either side. */}
          <nav className="hidden xl:flex items-center gap-1 absolute left-1/2 -translate-x-1/2">
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
          </nav>

          {/* Language switcher + CTA */}
          <div className="hidden xl:flex items-center gap-4 ml-auto">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1.5 px-3 py-2 text-[13.5px] font-medium text-white/70 hover:text-white rounded-full hover:bg-white/10 transition-colors">
                  <Globe className="h-3.5 w-3.5" />
                  {languageMap[i18n.language] || "EN"}
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="z-[60] bg-[rgba(29,27,24,0.92)] backdrop-blur-2xl backdrop-saturate-150 border border-white/[0.15] text-white shadow-[0_8px_32px_rgba(0,0,0,0.3),inset_0_1px_0_rgba(255,255,255,0.1)] [&_[data-highlighted]]:bg-white/10 [&_[data-highlighted]]:text-white">
                <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("ar")}>العربية</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/contact">
              <Button
                size="sm"
                className="rounded-full bg-gold hover:bg-gold/90 text-white text-[13.5px] font-medium py-[11px] px-6"
              >
                {t("hero.bookConsultation")}
              </Button>
            </Link>
          </div>

          {/* Mobile hamburger */}
          <SheetTrigger asChild>
            <button
              className="xl:hidden ml-auto flex items-center justify-center h-10 w-10 text-white"
              aria-label="Open navigation menu"
            >
              <Menu size={22} />
            </button>
          </SheetTrigger>
        </div>
      </header>
      <SheetContent side="right" className="bg-[#1D1B18] border-l border-white/10 w-[85vw] sm:w-[400px] p-0 shadow-2xl">
        <SheetHeader className="sr-only">
          <SheetTitle>{t("nav.home")}</SheetTitle>
        </SheetHeader>
        <div className="flex flex-col h-full" style={{ fontFamily: GENERAL_SANS }}>
          <div className="px-6 pt-10 pb-6 border-b border-white/10">
            <img src={logo} alt="VOI" className="h-12 w-auto" />
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
              <Button className="w-full bg-gold hover:bg-gold/90 text-white py-5 text-base font-medium">
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
