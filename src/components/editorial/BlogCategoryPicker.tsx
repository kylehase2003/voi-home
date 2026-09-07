import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { ArrowRight } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import RevealOnScroll from "@/components/RevealOnScroll";
import BlogCardMinimal from "@/components/BlogCardMinimal";

interface Blog {
  id: string;
  title: string;
  title_ar: string | null;
  excerpt: string;
  excerpt_ar: string | null;
  featured_image: string | null;
  category: string | null;
  published_at: string | null;
  created_at: string | null;
  slug: string;
}

const BlogCategoryPicker = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const [posts, setPosts] = useState<Blog[]>([]);

  useEffect(() => {
    let mounted = true;
    (async () => {
      const { data, error } = await supabase
        .from("blogs")
        .select("id, title, title_ar, excerpt, excerpt_ar, featured_image, category, published_at, created_at, slug")
        .eq("published", true)
        .order("published_at", { ascending: false })
        .limit(3);
      if (!error && data && mounted) setPosts(data as Blog[]);
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const getTranslatedCategory = (category: string) => {
    const key = `blogs.category.${category.toLowerCase()}`;
    const translated = t(key);
    return translated !== key ? translated : category;
  };

  return (
    <section className="py-20 md:py-28 px-6">
      <RevealOnScroll className="max-w-xl mx-auto text-center mb-12">
        <div className="text-xs font-medium uppercase tracking-[1.5px] text-muted-foreground mb-4">
          {t("blogs.title")}
        </div>
        <h2 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] mb-4 text-foreground ${isRTL ? "font-arabic" : "font-serif"}`}>
          {t("blogs.subtitle")}
        </h2>
        <p className="text-base text-muted-foreground leading-[1.7]">
          Guides, market analysis, and the details worth knowing before you buy property in Türkiye.
        </p>
      </RevealOnScroll>

      {posts.length > 0 && (
        <RevealOnScroll delay={80} className="max-w-6xl mx-auto mb-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-x-6 gap-y-10">
            {posts.map((post) => (
              <BlogCardMinimal
                key={post.id}
                blog={post}
                category={post.category ? getTranslatedCategory(post.category) : undefined}
              />
            ))}
          </div>
        </RevealOnScroll>
      )}

      <RevealOnScroll delay={100} className="flex justify-center">
        <Link to="/blogs">
          <Button size="lg" className="group rounded-full bg-gold hover:bg-gold/90 text-white">
            {t("blogs.viewAll")}
            <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Button>
        </Link>
      </RevealOnScroll>
    </section>
  );
};

export default BlogCategoryPicker;
