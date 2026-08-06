import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { getTranslatedContent } from "@/lib/i18n-content";
import OptimizedImage from "@/components/OptimizedImage";
import RevealOnScroll from "@/components/RevealOnScroll";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  image_url: string | null;
  rating: number;
  text: string;
}

const Testimonials = () => {
  const { t, i18n } = useTranslation();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const toggleExpanded = (id: string) => {
    setExpandedIds(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const fetchTestimonials = async () => {
    try {
      const { data, error } = await supabase
        .from('testimonials')
        .select('*')
        .eq('is_active', true)
        .order('display_order', { ascending: true })
        .limit(2);

      if (error) throw error;
      setTestimonials(data || []);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || testimonials.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-14 bg-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-3 mb-10 md:mb-14">
            <p className="text-gold font-medium tracking-wider uppercase text-sm">{t('homePage.testimonials.label')}</p>
            <h2 className={`text-4xl md:text-5xl lg:text-[3.5rem] leading-[1.1] text-foreground ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
              {t('homePage.testimonials.heading')}
            </h2>
            <div className="w-16 h-1 bg-gold mx-auto" />
          </div>

          {/* Testimonial Cards */}
          <div className="grid md:grid-cols-2 gap-6 md:gap-8">
            {testimonials.map((testimonial, index) => {
              const text = getTranslatedContent(testimonial, 'text', i18n.language);
              const isExpanded = expandedIds.has(testimonial.id);
              const isLong = text.length > 90;

              return (
                <RevealOnScroll key={testimonial.id} delay={index * 120}>
                  <Card className="relative h-full bg-card border border-border/50 rounded-2xl shadow-luxury hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden">
                    <Quote className="absolute -top-2 right-6 w-20 h-20 text-gold/10 fill-gold/10 pointer-events-none" />
                    <CardContent className="p-8 md:p-9 relative">
                      <div className="flex gap-0.5 mb-5">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star
                            key={i}
                            className="h-4 w-4 fill-gold text-gold"
                          />
                        ))}
                      </div>

                      <p className={`font-serif text-lg md:text-xl leading-relaxed text-foreground mb-6 ${!isExpanded && isLong ? 'line-clamp-2' : ''}`}>
                        "{text}"
                      </p>
                      {isLong && (
                        <button
                          type="button"
                          onClick={() => toggleExpanded(testimonial.id)}
                          className="-mt-3 mb-6 block text-gold text-sm font-medium hover:underline"
                        >
                          {isExpanded ? t('homePage.testimonials.readLess') : t('homePage.testimonials.readMore')}
                        </button>
                      )}

                      <div className="flex items-center gap-3 pt-6 border-t border-border/50">
                        <div className="flex-shrink-0">
                          {testimonial.image_url ? (
                            <OptimizedImage
                              src={testimonial.image_url}
                              alt={testimonial.name}
                              containerClassName="w-12 h-12 rounded-full ring-2 ring-gold/20"
                            />
                          ) : (
                            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold/20 to-primary/20 flex items-center justify-center ring-2 ring-gold/20">
                              <span className="text-lg font-serif font-semibold text-foreground">
                                {testimonial.name.charAt(0)}
                              </span>
                            </div>
                          )}
                        </div>

                        <div className="flex-1 min-w-0">
                          <h3 className="text-base font-semibold text-foreground">
                            {testimonial.name}
                          </h3>
                          <p className="text-sm text-muted-foreground">
                            {getTranslatedContent(testimonial, 'role', i18n.language)}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
