import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Quote } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { getTranslatedContent } from "@/lib/i18n-content";
import RevealOnScroll from "@/components/RevealOnScroll";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  text: string;
}

interface TestimonialBreakProps {
  backgroundImage: string;
}

const TestimonialBreak = ({ backgroundImage }: TestimonialBreakProps) => {
  const { t, i18n } = useTranslation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    supabase
      .from("testimonials")
      .select("*")
      .eq("is_active", true)
      .order("display_order", { ascending: true })
      .then(({ data }) => setTestimonials(data || []));
  }, []);

  if (testimonials.length === 0) return null;

  const current = testimonials[active];

  return (
    <div className="relative min-h-[85vh] flex items-center justify-center overflow-hidden mx-2 md:mx-3 my-3 rounded-[20px]">
      <img src={backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      <div className="absolute inset-0 bg-black/75" />
      <RevealOnScroll className="relative z-10 max-w-2xl px-6 py-20 text-center flex flex-col items-center">
        <Quote className="w-16 h-16 text-white/10 mb-6" fill="currentColor" />
        <p className={`text-xl md:text-3xl text-white leading-[1.4] tracking-[-0.3px] mb-6 min-h-[100px] ${i18n.language === "ar" ? "font-arabic" : "font-serif"}`}>
          {getTranslatedContent(current, "text", i18n.language)}
        </p>
        <div className="text-xs text-white/40 uppercase tracking-[1.5px] mb-7">
          {getTranslatedContent(current, "role", i18n.language) || current.role}
        </div>
        <div className="flex items-center justify-center gap-1.5">
          {testimonials.map((testimonial, i) => (
            <button
              key={testimonial.id}
              onClick={() => setActive(i)}
              className={`flex items-center rounded-full transition-all duration-500 ${
                i === active ? "bg-white/15 pr-4" : "hover:bg-white/[0.08]"
              } p-1`}
            >
              {testimonial.image_url ? (
                <img src={testimonial.image_url} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-transparent" style={i === active ? { borderColor: "rgba(255,255,255,0.3)" } : undefined} />
              ) : (
                <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-xs">
                  {testimonial.name?.[0]}
                </div>
              )}
              {i === active && <span className="ml-2 text-sm font-medium text-white whitespace-nowrap">{testimonial.name}</span>}
            </button>
          ))}
        </div>
      </RevealOnScroll>
    </div>
  );
};

export default TestimonialBreak;
