import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import BlogCardMinimal from "@/components/BlogCardMinimal";
import SEOHead from "@/components/SEOHead";
import RevealOnScroll from "@/components/RevealOnScroll";
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
  tags: string[] | null;
  tags_ar: string[] | null;
  region: string | null;
}
const Blogs = () => {
  const {
    t,
    i18n
  } = useTranslation();
  const [searchParams] = useSearchParams();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [categoryFilter, setCategoryFilter] = useState<string>(searchParams.get("category") || "all");
  const getTranslatedCategory = (category: string) => {
    // Try with blogs.category namespace first
    const translationKey = `blogs.category.${category.toLowerCase()}`;
    const translated = t(translationKey);
    if (translated !== translationKey) return translated;

    // Fallback to original category
    return category;
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  useEffect(() => {
    filterBlogs();
  }, [blogs, categoryFilter]);
  const fetchBlogs = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from("blogs").select("id, title, title_ar, excerpt, excerpt_ar, featured_image, category, published_at, created_at, slug, tags, tags_ar, region").eq("published", true).order("published_at", {
        ascending: false
      });
      if (error) throw error;
      const blogsData = (data || []).map(blog => ({
        ...blog,
        tags: Array.isArray(blog.tags) ? blog.tags as string[] : [],
        tags_ar: Array.isArray(blog.tags_ar) ? blog.tags_ar as string[] : [],
        region: blog.region || '',
      })) as Blog[];
      setBlogs(blogsData);
      setFilteredBlogs(blogsData);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    } finally {
      setLoading(false);
    }
  };
  const filterBlogs = () => {
    const filtered = categoryFilter === "all"
      ? [...blogs]
      : blogs.filter(blog => blog.category === categoryFilter);
    setFilteredBlogs(filtered);
  };

  return <div className="min-h-screen flex flex-col bg-background">
      <SEOHead
        title="Real Estate Blog - Market Insights & Investment Tips"
        description="Read expert articles on the Istanbul and Bodrum real estate markets. Property investment guides, Turkish citizenship updates, and the details that matter before you buy."
        path="/blogs"
      />
      <Header />
      <main className="pt-24 flex-1">
        <RevealOnScroll className="text-center max-w-xl mx-auto px-6 pt-8 pb-2">
          <div className="text-xs font-medium uppercase tracking-[1.5px] mb-4 text-muted-foreground">
            {t("blogs.title")}
          </div>
          <h1 className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] text-foreground ${i18n.language === "ar" ? "font-arabic" : "font-serif"}`}>
            {t("blogs.subtitle")}
          </h1>
        </RevealOnScroll>

        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            {/* Category filter */}
            {categoryFilter !== "all" && (
              <RevealOnScroll className="mb-12 flex justify-center">
                <button
                  type="button"
                  onClick={() => setCategoryFilter("all")}
                  className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  {t(`blogs.category.${categoryFilter}`)} ×
                </button>
              </RevealOnScroll>
            )}

            {loading ? <div className="text-center text-muted-foreground">
                {t("blogs.loading")}
              </div> : filteredBlogs.length === 0 ? <div className="text-center max-w-2xl mx-auto text-muted-foreground">
                {t("blogs.noPosts")}
              </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12">
                {filteredBlogs.map((blog, index) => (
                  <RevealOnScroll key={blog.id} delay={(index % 6) * 60}>
                    <BlogCardMinimal
                      blog={blog}
                      category={blog.category ? getTranslatedCategory(blog.category) : undefined}
                    />
                  </RevealOnScroll>
                ))}
              </div>}
          </div>
        </section>
      </main>
      <Footer />
    </div>;
};
export default Blogs;
