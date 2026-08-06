import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, Globe, Mail, Phone, Facebook, Instagram, Linkedin, Home as HomeIcon, Shield } from "lucide-react";
import { useTranslation } from "react-i18next";
import logo from "@/assets/logo-new.png";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    t,
    i18n
  } = useTranslation();
  const location = useLocation();
  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };
  const navigation = [{
    name: t("nav.home"),
    href: "/"
  }, {
    name: t("nav.properties"),
    href: "/properties"
  }, {
    name: t("nav.propertiesMap"),
    href: "/properties-map"
  }, {
    name: t("nav.turkishCitizenship"),
    href: "/properties?benefit=Citizenship+Eligible"
  }, {
    name: t("nav.buyerGuide"),
    href: "/buyer-guide"
  }, {
    name: t("nav.blogs"),
    href: "/blogs"
  }, {
    name: t("nav.about"),
    href: "/about"
  }];
  const isActivePath = (href: string) => {
    if (href === "/" && location.pathname === "/") return true;
    // Handle links with query params (e.g. /properties?benefit=Citizenship+Eligible)
    if (href.includes("?")) {
      return location.pathname + location.search === href;
    }
    // Don't mark plain /properties as active if a query-param link matches
    const fullUrl = location.pathname + location.search;
    const queryNavItem = navigation.find(n => n.href.includes("?") && fullUrl === n.href);
    if (queryNavItem && href !== queryNavItem.href) return false;
    if (href !== "/" && location.pathname === href) return true;
    if (href !== "/" && location.pathname.startsWith(href + "/")) return true;
    return false;
  };
  const languageMap: {
    [key: string]: string;
  } = {
    en: "EN",
    ar: "AR",
    ru: "RU"
  };
  return <header className="fixed top-0 left-0 right-0 z-50 bg-primary backdrop-blur-sm animate-slide-up p-1">
      {/* Top Info Bar */}
      <div className="bg-primary/90 border-b border-gold/20">
        <div className="container mx-auto px-4 py-2">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-6 animate-slide-in-left">
              <a href="mailto:info@mrpropertytr.com" className="flex items-center gap-2 text-primary-foreground/80 hover:text-gold transition-all duration-300 hover:scale-110" aria-label="Email us at info@mrpropertytr.com">
                <Mail size={14} />
                <span className="hidden sm:inline">info@mrpropertytr.com</span>
              </a>
              <a href="tel:+905545707580" className="flex items-center gap-2 text-primary-foreground/80 hover:text-gold transition-all duration-300 hover:scale-110">
                <Phone size={14} />
                <span dir="ltr">+90 554 570 75 80</span>
              </a>
            </div>
            <div className="flex items-center gap-4 animate-slide-in-right">
              <a href="https://www.facebook.com/people/Mr-Property/61579018416430/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-gold transition-all duration-300 hover:scale-125 hover:rotate-12" aria-label="Facebook">
                <Facebook size={16} />
              </a>
              <a href="https://www.linkedin.com/company/mrpropertytr/" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-gold transition-all duration-300 hover:scale-125 hover:rotate-12" aria-label="LinkedIn">
                <Linkedin size={16} />
              </a>
              <a href="https://www.instagram.com/mrpropertytr" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-gold transition-all duration-300 hover:scale-125 hover:rotate-12" aria-label="Instagram">
                <Instagram size={16} />
              </a>
              <a href="https://www.tiktok.com/@mrpropertytr" target="_blank" rel="noopener noreferrer" className="text-primary-foreground/80 hover:text-gold transition-all duration-300 hover:scale-125 hover:rotate-12" aria-label="TikTok">
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a href="mailto:info@mrpropertytr.com" className="text-primary-foreground/80 hover:text-gold transition-all duration-300 hover:scale-125 hover:rotate-12" aria-label="Email">
                <Mail size={16} />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center transition-all duration-300 hover:scale-110 hover:rotate-2" onClick={() => window.scrollTo({
          top: 0,
          behavior: "smooth"
        })}>
            <img src={logo} alt="MR. Property" className="h-12 w-auto py-1 pl-1" width={164} height={48} />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center flex-1 gap-10">
            {navigation.map(item => <Link key={item.name} to={item.href} className={`relative hover:text-gold transition-all duration-300 text-base font-medium after:content-[''] after:absolute after:w-full after:scale-x-0 after:h-0.5 after:bottom-0 after:left-0 after:bg-gold after:origin-bottom-right after:transition-transform after:duration-300 hover:after:scale-x-100 hover:after:origin-bottom-left pb-1 hover:scale-110 ${isActivePath(item.href) ? "text-gold after:scale-x-100" : "text-primary-foreground"}`}>
                {item.name}
              </Link>)}
          </div>

          <div className="hidden lg:flex items-center gap-x-4 ">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="text-primary-foreground hover:text-gold hover:bg-gold/10 transition-all duration-300 hover:scale-110">
                  <Globe className="mr-2 h-4 w-4" />
                  {languageMap[i18n.language] || "EN"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-card z-[60]">
                <DropdownMenuItem onClick={() => changeLanguage("en")}>English</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("ar")}>العربية</DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage("ru")}>Русский</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            <Link to="/contact">
              <Button size="sm" className="bg-gold text-white hover:bg-gold/90 transition-all duration-300 hover:scale-110 hover:shadow-lg">
                <HomeIcon className="mr-2 h-4 w-4" />
                {t("nav.contactUs")}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <button className="lg:hidden text-primary-foreground" aria-label="Open navigation menu">
                <Menu size={24} />
              </button>
            </SheetTrigger>
            <SheetContent side="right" className="bg-primary/95 backdrop-blur-xl border-l border-gold/20 w-[85vw] sm:w-[400px] p-0 shadow-2xl">
              <SheetHeader className="sr-only">
                <SheetTitle>{t("nav.home")}</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full">
                {/* Logo Section */}
                <div className="px-6 pt-10 pb-6 border-b border-gold/10">
                  <img src={logo} alt="MR. Property - Real Estate Consultancy" className="h-14 w-auto animate-fade-in" width={218} height={64} />
                </div>

                {/* Navigation Links */}
                <nav className="flex-1 px-6 py-6 space-y-1 overflow-y-auto">
                  {navigation.map((item, index) => <Link key={item.name} to={item.href} className={`block text-lg transition-all duration-300 py-3 px-4 rounded-xl group relative overflow-hidden ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'} ${isActivePath(item.href) ? "text-gold bg-gold/10" : "text-primary-foreground hover:text-gold hover:bg-gold/5 hover:translate-x-1"}`} onClick={() => setIsOpen(false)} style={{
                  animation: `fade-in 0.4s ease-out ${index * 0.05}s both`
                }}>
                      {isActivePath(item.href) && <span className={`absolute ${i18n.language === 'ar' ? 'right-0' : 'left-0'} top-2 bottom-2 w-1 bg-gold rounded-full`} />}
                      <span className="relative z-10">{item.name}</span>
                    </Link>)}
                </nav>

                {/* Language & Contact Section */}
                <div className="px-6 pb-6 space-y-5 border-t border-gold/10 pt-5 bg-gradient-to-b from-transparent to-primary/30">
                  <div className="animate-fade-in" style={{
                  animationDelay: '0.4s',
                  animationFillMode: 'both'
                }}>
                    <p className={`text-primary-foreground/70 text-xs uppercase tracking-[0.2em] mb-3 ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{t("nav.language")}</p>
                    <div className="flex gap-2">
                      {(["en", "ar", "ru"] as const).map((lng) => (
                        <button
                          key={lng}
                          onClick={() => { changeLanguage(lng); setIsOpen(false); }}
                          className={`flex-1 px-3 py-2.5 text-sm font-semibold rounded-lg transition-all duration-300 outline-none focus-visible:ring-2 focus-visible:ring-gold/50 ${i18n.language === lng ? "bg-gold text-primary shadow-lg shadow-gold/20" : "border border-primary-foreground/15 text-primary-foreground/70 hover:border-gold/40 hover:text-gold hover:bg-gold/5"}`}
                        >
                          {lng.toUpperCase()}
                        </button>
                      ))}
                    </div>
                  </div>

                  <Link to="/contact" onClick={() => setIsOpen(false)} className="block animate-fade-in" style={{
                  animationDelay: '0.5s',
                  animationFillMode: 'both'
                }}>
                    <Button className="w-full bg-gold text-primary hover:bg-gold/90 py-5 text-base font-medium rounded-lg shadow-xl shadow-gold/30 hover:shadow-2xl hover:shadow-gold/40 hover:scale-[1.02] transition-all duration-300">
                      <HomeIcon className="mr-2 h-5 w-5" />
                      {t("nav.contactUs")}
                    </Button>
                  </Link>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
    </header>;
};
export default Header;