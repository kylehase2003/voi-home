import logo from "@/assets/logo.png";
import heroImage from "@/assets/hero-villa.webp";

const ComingSoon = () => {
  return (
    <div className="min-h-screen relative flex items-center justify-center overflow-hidden">
      {/* Background Image with Green Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center animate-fade-in"
        style={{
          backgroundImage: `url(${heroImage})`,
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/80 via-teal-800/70 to-green-900/80" />
        
        {/* Animated floating shapes */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-gold/20 rounded-full blur-xl animate-[float_6s_ease-in-out_infinite]" />
        <div className="absolute top-40 right-20 w-32 h-32 bg-emerald-400/20 rounded-full blur-2xl animate-[float_8s_ease-in-out_infinite]" style={{ animationDelay: '1s' }} />
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-teal-300/20 rounded-full blur-xl animate-[float_7s_ease-in-out_infinite]" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-40 right-1/3 w-16 h-16 bg-gold/30 rounded-full blur-lg animate-[float_5s_ease-in-out_infinite]" style={{ animationDelay: '0.5s' }} />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
          <img 
            src={logo} 
            alt="MR. PROPERTY" 
            width={160}
            height={160}
            fetchPriority="high"
            className="h-32 md:h-40 w-auto mx-auto mb-8 animate-[scale-in_0.8s_ease-out] hover:scale-110 transition-transform duration-300"
          />
        </div>
        
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl tracking-[-1.5px] mb-6 animate-fade-in" style={{ animationDelay: '0.4s' }}>
          Something is in the making, <span className="text-gold animate-[shimmer_3s_ease-in-out_infinite] inline-block">YOU'LL LOVE IT!</span>
        </h1>
        
        <p className="text-lg md:text-xl text-white/90 mb-12 leading-relaxed max-w-3xl mx-auto animate-fade-in" style={{ animationDelay: '0.6s' }}>
          From premium listings to expert property guidance, Mr. Property will soon be your go-to destination for buying, selling, and investing in real estate in TURKEY AND DUBAI!
        </p>

        {/* Animated dots */}
        <div className="flex justify-center gap-2 mb-12 animate-fade-in" style={{ animationDelay: '0.8s' }}>
          <div className="w-3 h-3 rounded-full bg-gold animate-[pulse_1.5s_ease-in-out_infinite]" />
          <div className="w-3 h-3 rounded-full bg-gold animate-[pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.2s' }} />
          <div className="w-3 h-3 rounded-full bg-gold animate-[pulse_1.5s_ease-in-out_infinite]" style={{ animationDelay: '0.4s' }} />
        </div>

        <div className="animate-fade-in" style={{ animationDelay: '1s' }}>
          <a 
            href="mailto:info@voi-home.com"
            className="inline-block px-8 py-3 bg-gold text-primary rounded-md hover:bg-gold/90 transition-all duration-300 hover:scale-110 hover:shadow-[0_0_30px_rgba(212,175,55,0.5)] font-medium"
          >
            Contact us
          </a>
        </div>

        {/* Animated border accent */}
        <div className="mt-16 flex justify-center gap-4 animate-fade-in" style={{ animationDelay: '1.2s' }}>
          <div className="h-1 w-16 bg-gradient-to-r from-transparent via-gold to-transparent animate-[shimmer_2s_ease-in-out_infinite]" />
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
