import { useTranslation } from "react-i18next";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import AboutCompany from "@/components/AboutCompany";
import OurServices from "@/components/OurServices";
import PropertyTypes from "@/components/PropertyTypes";
import FeaturedProperties from "@/components/FeaturedProperties";
import StatsSection from "@/components/StatsSection";
import Testimonials from "@/components/Testimonials";
import BlogPreview from "@/components/BlogPreview";
import PartnersSlider from "@/components/PartnersSlider";
import SEOHead from "@/components/SEOHead";
import RevealOnScroll from "@/components/RevealOnScroll";

const Home = () => {
  const { t } = useTranslation();
  return (
    <div className="min-h-screen">
      <SEOHead
        title="Luxury Property in Istanbul, Bodrum & Dubai"
        description="MR. Property offers curated luxury homes, villas, and investment properties in Istanbul, Bodrum & Dubai. Turkish citizenship eligibility available. Contact us."
        path="/"
      />
      <Header />
      <main>
        <h1 className="sr-only">{t("seo.h1.home")}</h1>
        <HeroSection />
        <RevealOnScroll><StatsSection /></RevealOnScroll>
        <RevealOnScroll delay={80}><FeaturedProperties /></RevealOnScroll>
        <RevealOnScroll delay={80}><PartnersSlider /></RevealOnScroll>
        <RevealOnScroll delay={80}><PropertyTypes /></RevealOnScroll>
        <RevealOnScroll delay={80}><AboutCompany /></RevealOnScroll>
        <RevealOnScroll delay={80}><OurServices /></RevealOnScroll>
        <RevealOnScroll delay={80}><Testimonials /></RevealOnScroll>
        <RevealOnScroll delay={80}><BlogPreview /></RevealOnScroll>
      </main>
      <Footer />
    </div>
  );
};

export default Home;
