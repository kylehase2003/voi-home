import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Home, Search } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFoundState from "@/components/NotFoundState";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      <NotFoundState
        icon={Search}
        titleKey="notFound.title"
        descriptionKey="notFound.description"
        primaryAction={{
          to: "/",
          labelKey: "notFound.backHome",
          icon: Home,
        }}
        secondaryAction={{
          to: "/properties",
          labelKey: "notFound.browseProperties",
          icon: Search,
        }}
      />
      <Footer />
    </div>
  );
};

export default NotFound;
