import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useTranslation } from "react-i18next";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { getTranslatedContent, getTranslatedTags } from "@/lib/i18n-content";
import OptimizedImage from "@/components/OptimizedImage";
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
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState<string>("all");
  const getTranslatedCategory = (category: string) => {
    // Try with blogs.category namespace first
    const translationKey = `blogs.category.${category.toLowerCase()}`;
    const translated = t(translationKey);
    if (translated !== translationKey) return translated;

    // Fallback to original category
    return category;
  };
  const getTranslatedTag = (tag: string) => {
    // Try with blogs.category namespace first
    const translationKey = `blogs.category.${tag.toLowerCase()}`;
    const translated = t(translationKey);
    if (translated !== translationKey) return translated;

    // Fallback to original tag
    return tag;
  };
  useEffect(() => {
    fetchBlogs();
  }, []);
  useEffect(() => {
    filterBlogs();
  }, [blogs, locationFilter]);
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
    let filtered = [...blogs];

    // Filter by region using the region column
    // Blogs with no region (empty string) only appear in "View All"
    if (locationFilter !== "all") {
      filtered = filtered.filter(blog => 
        blog.region === locationFilter || blog.region === 'both'
      );
    } else {
      // When "View All" is selected, prioritize Türkiye blogs first, then Dubai
      filtered.sort((a, b) => {
        const regionOrder = (region: string | null) => {
          if (region === 'turkey' || region === 'both') return 0; // Türkiye first
          if (region === 'dubai') return 1; // Dubai second
          return 2; // Others last
        };
        return regionOrder(a.region) - regionOrder(b.region);
      });
    }
    setFilteredBlogs(filtered);
  };
  return <div className={`min-h-screen flex flex-col transition-colors duration-500 ${locationFilter === "dubai" ? "bg-[hsl(0,0%,11%)]" : "bg-background"}`}>
      <SEOHead
        title="Real Estate Blog - Market Insights & Investment Tips"
        description="Read expert articles on Istanbul, Bodrum & Dubai real estate markets. Property investment guides, Turkish citizenship updates, and luxury market trends."
        path="/blogs"
      />
      <Header />
      <main className="pt-24 flex-1">
        <RevealOnScroll className="text-center max-w-xl mx-auto px-6 pt-8 pb-2">
          <div className={`text-xs font-medium uppercase tracking-[1.5px] mb-4 transition-colors duration-500 ${locationFilter === "dubai" ? "text-white/60" : "text-muted-foreground"}`}>
            {t("blogs.title")}
          </div>
          <h1
            className={`text-3xl md:text-[42px] leading-[1.12] tracking-[-1.2px] transition-colors duration-500 ${i18n.language === "ar" ? "font-arabic" : "font-serif"} ${locationFilter === "dubai" ? "text-white" : "text-foreground"}`}
          >
            {t("blogs.subtitle")}
          </h1>
        </RevealOnScroll>

        <section className={`py-16 transition-colors duration-500 ${locationFilter === "dubai" ? "bg-[hsl(0,0%,11%)]" : "bg-background"}`}>
          <div className="container mx-auto px-4">
            {/* Filter Section */}
            <div className="mb-8 flex justify-center gap-4">
              <Button variant={locationFilter === "all" ? "default" : "outline"} onClick={() => setLocationFilter("all")} className={locationFilter === "all" ? "bg-gold hover:bg-gold/90 text-primary" : locationFilter === "dubai" ? "bg-[hsl(0,0%,15%)] border-white/20 text-white hover:bg-[hsl(0,0%,20%)] hover:text-white" : ""}>
                {t("blogs.filterAll")}
              </Button>
              <Button variant={locationFilter === "turkey" ? "default" : "outline"} onClick={() => setLocationFilter("turkey")} className={locationFilter === "turkey" ? "bg-gold hover:bg-gold/90 text-primary" : locationFilter === "dubai" ? "bg-[hsl(0,0%,15%)] border-white/20 text-white hover:bg-[hsl(0,0%,20%)] hover:text-white" : ""}>
                {t("blogs.filterTurkey")}
              </Button>
              <Button variant={locationFilter === "dubai" ? "default" : "outline"} onClick={() => setLocationFilter("dubai")} className={locationFilter === "dubai" ? "bg-gold hover:bg-gold/90 text-primary" : ""}>
                {t("blogs.filterDubai")}
              </Button>
            </div>

            {loading ? <div className={`text-center transition-colors duration-500 ${locationFilter === "dubai" ? "text-white/70" : "text-muted-foreground"}`}>
                {t("blogs.loading")}
              </div> : filteredBlogs.length === 0 ? <div className={`text-center max-w-2xl mx-auto transition-colors duration-500 ${locationFilter === "dubai" ? "text-white/70" : "text-muted-foreground"}`}>
                {t("blogs.noPostsForLocation")}
              </div> : <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredBlogs.map((blog, index) => (
                  <RevealOnScroll key={blog.id} delay={(index % 6) * 60}>
                  <Link to={`/blog/${blog.slug}`} className="block group">
                    <Card className={`overflow-hidden rounded-[20px] hover:shadow-lg transition-all duration-500 h-full ${locationFilter === "dubai" ? "bg-[hsl(0,0%,15%)] border-white/10" : "bg-card"}`}>
                      {blog.featured_image && <div className="aspect-video w-full overflow-hidden">
                          <OptimizedImage src={blog.featured_image} alt={blog.title} className="group-hover:scale-105 transition-transform duration-500" containerClassName="w-full h-full" />
                        </div>}
                      <CardHeader>
                        {blog.category && <Badge variant="secondary" className="w-fit mb-2 font-normal">
                            {getTranslatedCategory(blog.category)}
                          </Badge>}
                        <CardTitle className={`text-xl line-clamp-2 transition-colors duration-500 pb-1 group-hover:text-gold ${i18n.language === "ar" ? "font-arabic" : "font-serif"} ${locationFilter === "dubai" ? "text-white" : "text-foreground"}`}>
                          {getTranslatedContent(blog, "title", i18n.language)}
                        </CardTitle>
                        {blog.created_at && <CardDescription className={`transition-colors duration-500 ${locationFilter === "dubai" ? "text-white/80" : ""}`}>
                            {new Date(blog.created_at).toLocaleDateString()}
                          </CardDescription>}
                      </CardHeader>
                      <CardContent>
                        <p className={`line-clamp-3 mb-4 transition-colors duration-500 ${locationFilter === "dubai" ? "text-white/70" : "text-muted-foreground"}`}>
                          {getTranslatedContent(blog, "excerpt", i18n.language)}
                        </p>
                        {getTranslatedTags(blog, i18n.language).length > 0 && <div className="flex flex-wrap gap-1 mb-4">
                            {getTranslatedTags(blog, i18n.language).slice(0, 3).map(tag => <Badge key={tag} variant="outline" className={`text-xs font-thin bg-secondary text-secondary-foreground ${i18n.language === "ar" ? "pb-1" : ""}`}>
                                  {getTranslatedTag(tag)}
                                </Badge>)}
                          </div>}
                        <span className="text-gold group-hover:underline font-medium">
                          {t("blogs.readMore")}
                          <span className="sr-only"> {t("blogs.readMoreAbout")} {getTranslatedContent(blog, "title", i18n.language)}</span>
                        </span>
                      </CardContent>
                    </Card>
                  </Link>
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