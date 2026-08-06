import { Button } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { useLanding } from "./LandingContext";
import stars5 from "@/assets/stars-5.webp";

const testimonials = [
  { name: "testimonial1Name", role: "testimonial1Role", text: "testimonial1Text" },
  { name: "testimonial2Name", role: "testimonial2Role", text: "testimonial2Text" },
  { name: "testimonial3Name", role: "testimonial3Role", text: "testimonial3Text" },
];

const LandingTestimonials = () => {
  const { t, isRtl, scrollToForm } = useLanding();
  const section = useInView(0.15);
  const font = isRtl ? "font-arabic" : "font-serif";

  return (
    <section className="py-20 md:py-28 bg-cream relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-5xl">
        <div
          ref={section.ref}
          className={`flex justify-center mb-14 transition-all duration-700 ${section.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <h2
            className={`text-xl sm:text-2xl md:text-3xl lg:text-5xl font-bold text-primary italic tracking-wide text-center ${font}`}
          >
            {t("testimonialsTitle1")}{" "}
            <span className="text-gold not-italic font-black">{t("testimonialsTitle1Bold")}</span>{" "}
            {t("testimonialsTitle2")}{" "}
            <span className="text-gold not-italic font-black">{t("testimonialsTitle2Bold")}</span>
          </h2>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-14 items-start transition-all duration-700 delay-200 ${section.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          {testimonials.map((item, idx) => (
            <div
              key={idx}
              className={`bg-primary rounded-2xl p-6 md:p-8 text-center flex flex-col items-center transition-all duration-500 h-54 mb-2 ${idx === 1 ? "md:mt-20" : ""}`}
              style={{ transitionDelay: `${200 + idx * 150}ms` }}
            >
              <h4 className={`text-primary-foreground font-bold text-lg ${font}`}>{t(item.name)}</h4>
              <p className="text-primary-foreground/70 text-sm mb-3">{t(item.role)}</p>
              <div className="flex justify-center mb-4">
                <img src={stars5} alt="5 stars" className="h-16 md:h-20 w-auto -my-6" />
              </div>
              <p className={`text-primary-foreground/90 text-sm leading-relaxed italic ${font}`}>{t(item.text)}</p>
            </div>
          ))}
        </div>

        <div
          className={`text-center mt-12 transition-all duration-700 delay-500 ${section.isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
        >
          <Button
            onClick={scrollToForm}
            className="bg-gold hover:bg-gold/90 text-primary font-bold text-lg px-10 py-6 rounded-md tracking-wide"
          >
            {t("testimonialsCta")}
          </Button>
        </div>
      </div>
    </section>
  );
};

export default LandingTestimonials;
