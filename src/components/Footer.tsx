import { Link } from "react-router-dom";
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";
import { TikTokIcon } from "@/components/icons/TikTokIcon";
import logo from "@/assets/logo-new.png";

const Footer = () => {
  const { t, i18n } = useTranslation();

  return (
    <footer className="bg-primary text-primary-foreground pt-10 pb-6">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-8">
          <div className="lg:col-span-2">
            <img src={logo} alt="MR. Property" className="h-14 w-auto mb-4" width={66} height={56} />
            <p className="text-sm text-primary-foreground/80 leading-relaxed mb-4">{t("footer.description")}</p>

            <div className="flex gap-1">
              <a
                href="https://www.facebook.com/profile.php?id=61576846872911&locale=sv_SE"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-gold flex items-center justify-center transition-smooth"
                aria-label="Visit our Facebook page"
              >
                <Facebook size={18} />
              </a>
              <a
                href="https://www.instagram.com/voi.home/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-gold flex items-center justify-center transition-smooth"
                aria-label="Follow us on Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="https://www.tiktok.com/@voi_home"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-gold flex items-center justify-center transition-smooth"
                aria-label="Follow us on TikTok"
              >
                <TikTokIcon className="w-4 h-4" />
              </a>
              <a
                href="https://www.linkedin.com/company/voi-home"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-gold flex items-center justify-center transition-smooth"
                aria-label="Connect with us on LinkedIn"
              >
                <Linkedin size={18} />
              </a>
              <a
                href="tel:+905527971000"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-gold flex items-center justify-center transition-smooth"
                aria-label="Call us at +90 552 797 10 00"
              >
                <Phone size={16} />
              </a>
              <a
                href="mailto:info@voi-home.com"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-gold flex items-center justify-center transition-smooth"
                aria-label="Email us at info@voi-home.com"
              >
                <Mail size={16} />
              </a>
              <a
                href="https://maps.app.goo.gl/aduv35z9XnK8S4J49"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-primary-foreground/10 hover:bg-gold flex items-center justify-center transition-smooth"
                aria-label="View our location on Google Maps"
              >
                <MapPin size={16} />
              </a>
            </div>
          </div>

          <div>
            <h3 className={`text-lg mb-3 ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{t("footer.quickLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/properties"
                  className="text-sm text-primary-foreground/80 hover:text-gold transition-smooth cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("footer.browseProperties")}
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-sm text-primary-foreground/80 hover:text-gold transition-smooth cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("footer.aboutUs")}
                </Link>
              </li>
              <li>
                <Link
                  to="/partners"
                  className="text-sm text-primary-foreground/80 hover:text-gold transition-smooth cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("footer.ourPartners")}
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-primary-foreground/80 hover:text-gold transition-smooth cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("nav.contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`text-lg mb-3 ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{t("footer.importantLinks")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/buyer-guide"
                  className="text-sm text-primary-foreground/80 hover:text-gold transition-smooth cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("footer.buyerGuide")}
                </Link>
              </li>
              <li>
                <Link
                  to="/team"
                  className="text-sm text-primary-foreground/80 hover:text-gold transition-smooth cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("footer.ourTeam")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className={`text-lg mb-3 ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>{t("footer.propertyTypes")}</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/properties?propertyType=Apartment"
                  onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
                  className="text-sm text-primary-foreground/80 hover:text-gold transition-smooth cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("footer.apartments")}
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?propertyType=Villa"
                  onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
                  className="text-sm text-primary-foreground/80 hover:text-gold transition-smooth cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("footer.villas")}
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?propertyType=Penthouse"
                  onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
                  className="text-sm text-primary-foreground/80 hover:text-gold transition-smooth cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("footer.penthouses")}
                </Link>
              </li>
              <li>
                <Link
                  to="/properties?propertyType=Commercial"
                  onClick={() => window.scrollTo({ top: 0, behavior: "auto" })}
                  className="text-sm text-primary-foreground/80 hover:text-gold transition-smooth cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
                >
                  {t("footer.commercial")}
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-5 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-primary-foreground/60">© 2025 {t("footer.rights")}</p>
          <div className="flex flex-wrap gap-6 text-sm text-primary-foreground/60 justify-center md:justify-end">
            <Link
              to="/privacy"
              className="hover:text-gold transition-smooth cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
            >
              {t("footer.privacyPolicy")}
            </Link>
            <Link
              to="/terms"
              className="hover:text-gold transition-smooth cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
            >
              {t("footer.termsConditions")}
            </Link>
            <Link
              to="/auth"
              className="hover:text-gold transition-smooth cursor-pointer relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[1px] after:bg-gold hover:after:w-full after:transition-all after:duration-300"
            >
              {t("footer.admin")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
