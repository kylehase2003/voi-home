import { useLocation } from "react-router-dom";

const WhatsAppButton = () => {
  const location = useLocation();

  // Hide on single property pages
  if (location.pathname.startsWith("/property/")) {
    return null;
  }

  return (
    <a
      href="https://api.whatsapp.com/send/?phone=905527971000&text=Hi%2C+I%27m+interested+in+your+properties.+I%27d+like+to+know+more%21&type=phone_number&app_absent=0"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 group"
    >
      <div className="relative flex items-center justify-center w-[60px] h-[60px] rounded-full bg-[#25D366] shadow-[0_4px_15px_rgba(37,211,102,0.4)] hover:shadow-[0_6px_25px_rgba(37,211,102,0.6)] hover:scale-110 transition-all duration-300">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" className="w-8 h-8 fill-white">
          <path d="M16.004 0h-.008C7.174 0 .002 7.174.002 16c0 3.502 1.128 6.748 3.046 9.39L1.06 31.07l5.89-1.948A15.923 15.923 0 0016.004 32C24.826 32 32 24.826 32 16S24.826 0 16.004 0zm9.31 22.606c-.39 1.1-1.932 2.014-3.17 2.28-.848.18-1.956.324-5.684-1.222-4.772-1.978-7.838-6.816-8.076-7.132-.228-.316-1.918-2.554-1.918-4.872s1.214-3.456 1.644-3.928c.43-.472.94-.59 1.254-.59.312 0 .626.002.898.016.288.014.676-.11 1.058.806.39.94 1.33 3.258 1.448 3.494.118.236.196.512.04.826-.158.316-.236.512-.472.79-.236.276-.496.618-.71.828-.236.236-.482.492-.208.964.276.472 1.226 2.022 2.632 3.276 1.81 1.614 3.336 2.114 3.808 2.35.472.236.748.196 1.024-.118.276-.316 1.176-1.372 1.49-1.844.314-.472.628-.39 1.06-.236.432.158 2.748 1.296 3.22 1.532.472.236.786.354.904.55.118.196.118 1.14-.272 2.24z" />
        </svg>
      </div>
    </a>
  );
};

export default WhatsAppButton;
