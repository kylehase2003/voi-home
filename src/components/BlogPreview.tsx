import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useTranslation } from "react-i18next";
import { getTranslatedContent } from "@/lib/i18n-content";
import OptimizedImage from "@/components/OptimizedImage";

interface Blog {
  id: string;
  title: string;
  title_ar?: string | null;
  excerpt: string;
  excerpt_ar?: string | null;
  featured_image: string | null;
  category: string | null;
  published_at: string | null;
  slug: string;
}

const BlogPreview = () => {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentBlogs();
  }, []);

  const fetchRecentBlogs = async () => {
    try {
      const { data, error } = await supabase
        .from("blogs")
        .select(
          "id, title, title_ar, excerpt, excerpt_ar, featured_image, category, published_at, slug",
        )
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(3);

      if (error) throw error;
      setBlogs(data || []);
    } catch (error) {
      // Error handled silently - component returns null if no blogs
    } finally {
      setLoading(false);
    }
  };

  if (loading || blogs.length === 0) {
    return null;
  }

  return (
    <section className="py-8 md:py-14 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10 md:mb-16 max-w-xl mx-auto">
          <h2
            className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-4 text-foreground ${i18n.language === "ar" ? "font-arabic" : "font-serif"}`}
          >
            {t("homePage.blogsNews.title")}
          </h2>
          <p className="text-base text-muted-foreground leading-[1.7]">{t("homePage.blogsNews.subtitle")}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-8">
          {blogs.map((blog, index) => (
            <Link
              key={blog.id}
              to={`/blog/${blog.slug}`}
              className="block"
            >
              <Card
                className="group overflow-hidden hover:shadow-luxury transition-all duration-500 bg-card animate-fade-in-scale md:hover:-translate-y-3 md:hover:scale-105 relative h-full"
                style={{ animationDelay: `${index * 0.15}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-gold/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0" />
                {blog.featured_image && (
                  <div className="aspect-video w-full overflow-hidden">
                    <OptimizedImage
                      src={blog.featured_image}
                      alt={blog.title}
                      className="group-hover:scale-105 transition-all duration-700"
                      containerClassName="w-full h-full"
                    />
                  </div>
                )}
                <CardHeader className="relative z-10 p-4 md:p-6">
                  <div className="flex items-center justify-between gap-2 mb-2 flex-wrap">
                    {blog.category && (
                      <Badge variant="secondary" className="text-xs group-hover:scale-110 transition-transform duration-300">
                        {blog.category}
                      </Badge>
                    )}
                    {blog.published_at && (
                      <span className="text-xs text-muted-foreground flex items-center gap-1 whitespace-nowrap">
                        <Calendar className="h-3 w-3" />
                        {new Date(blog.published_at).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <CardTitle
                    className={`text-base md:text-xl line-clamp-2 group-hover:text-gold transition-colors duration-300 pb-1 ${i18n.language === "ar" ? "font-arabic" : "font-serif"}`}
                  >
                    {getTranslatedContent(blog, "title", i18n.language)}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 p-4 pt-0 md:p-6 md:pt-0">
                  <p className="text-sm text-muted-foreground line-clamp-2 md:line-clamp-3 mb-3 md:mb-4">
                    {getTranslatedContent(blog, "excerpt", i18n.language)}
                  </p>
                  <span className="inline-flex items-center text-sm text-gold font-medium group-hover:translate-x-2 transition-transform duration-300 whitespace-nowrap">
                    {t("homePage.blogsNews.readMore")}
                    <span className="sr-only"> {t("blogs.readMoreAbout")} {getTranslatedContent(blog, "title", i18n.language)}</span>
                    <ArrowRight className="ml-2 h-4 w-4 ltr:ml-2 rtl:mr-2 rtl:rotate-180 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link to="/blogs">
            <Button
              variant="outline"
              size="lg"
              className="border-2 border-gold text-gold hover:bg-gold hover:text-primary"
            >
              {t("homePage.blogsNews.viewAllArticles")}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreview;
