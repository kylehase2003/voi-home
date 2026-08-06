import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy, ComponentType } from "react";
import { HelmetProvider } from "react-helmet-async";
import { AuthProvider } from "./contexts/AuthContext";
import ScrollToTop from "./components/ScrollToTop";
import MaintenanceCheck from "./components/MaintenanceCheck";
import Home from "./pages/Home";
import ContactPopup from "./components/ContactPopup";
import WhatsAppButton from "./components/WhatsAppButton";

// Retry wrapper for lazy imports to handle stale chunk errors after deployments
function lazyWithRetry(importFn: () => Promise<{ default: ComponentType<any> }>) {
  return lazy(() =>
    importFn().catch((error) => {
      // If chunk fails to load (stale hash after deploy), reload the page once
      const hasReloaded = sessionStorage.getItem('chunk_reload');
      if (!hasReloaded) {
        sessionStorage.setItem('chunk_reload', '1');
        window.location.reload();
        // Never-resolving promise so React doesn't render during reload
        return new Promise<{ default: ComponentType<any> }>(() => {});
      }
      sessionStorage.removeItem('chunk_reload');
      throw error;
    })
  );
}

// Lazy load non-critical routes to improve Time to Interactive
const Properties = lazyWithRetry(() => import("./pages/Properties"));
const PropertiesMap = lazyWithRetry(() => import("./pages/PropertiesMap"));
const PropertyDetail = lazyWithRetry(() => import("./pages/PropertyDetail"));
const About = lazyWithRetry(() => import("./pages/About"));
const Contact = lazyWithRetry(() => import("./pages/Contact"));
const Blogs = lazyWithRetry(() => import("./pages/Blogs"));
const BlogDetail = lazyWithRetry(() => import("./pages/BlogDetail"));
const Team = lazyWithRetry(() => import("./pages/Team"));
const Auth = lazyWithRetry(() => import("./pages/Auth"));
const PrivacyPolicy = lazyWithRetry(() => import("./pages/PrivacyPolicy"));
const TermsConditions = lazyWithRetry(() => import("./pages/TermsConditions"));
const BuyerGuide = lazyWithRetry(() => import("./pages/BuyerGuide"));
const ComingSoon = lazyWithRetry(() => import("./pages/ComingSoon"));
const Partners = lazyWithRetry(() => import("./pages/Partners"));
const Landing = lazyWithRetry(() => import("./pages/Landing"));
const NotFound = lazyWithRetry(() => import("./pages/NotFound"));

// Lazy load dashboard (includes heavy Leaflet library)
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const queryClient = new QueryClient();
const App = () => <QueryClientProvider client={queryClient}>
    <HelmetProvider>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ContactPopup />
          <WhatsAppButton />
          <ScrollToTop />
          <MaintenanceCheck>
            <Suspense fallback={<div className="min-h-screen flex items-center justify-center"><div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" /></div>}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/properties" element={<Properties />} />
                <Route path="/properties-map" element={<PropertiesMap />} />
                <Route path="/property/:slug" element={<PropertyDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/blogs" element={<Blogs />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/team" element={<Team />} />
                <Route path="/privacy" element={<PrivacyPolicy />} />
                <Route path="/terms" element={<TermsConditions />} />
                <Route path="/buyer-guide" element={<BuyerGuide />} />
                <Route path="/coming-soon" element={<ComingSoon />} />
                <Route path="/partners" element={<Partners />} />
                <Route path="/auth" element={<Auth />} />
                <Route path="/landing" element={<Landing />} />
                <Route path="/dashboard" element={<Dashboard />} />
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </MaintenanceCheck>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
    </HelmetProvider>
  </QueryClientProvider>;
export default App;