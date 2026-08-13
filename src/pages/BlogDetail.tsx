import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import DOMPurify from "dompurify";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NotFoundState from "@/components/NotFoundState";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-villa.webp";
import { useTranslation } from "react-i18next";
import { getTranslatedContent } from "@/lib/i18n-content";
import SEOHead from "@/components/SEOHead";
interface Blog {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  featured_image: string | null;
  category: string | null;
  published_at: string | null;
  slug: string;
  title_ar?: string | null;
}
const BlogDetail = () => {
  const {
    slug
  } = useParams<{
    slug: string;
  }>();
  const {
    i18n,
    t
  } = useTranslation();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [featured, setFeatured] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    if (slug) {
      fetchBlog();
    }
  }, [slug]);
  const fetchBlog = async () => {
    try {
      const {
        data,
        error
      } = await supabase.from('blogs').select('*').eq('slug', slug).eq('published', true).maybeSingle();
      if (error) throw error;
      setBlog(data);
      if (data) {
        const { data: others } = await supabase
          .from('blogs')
          .select('*')
          .eq('published', true)
          .neq('id', data.id)
          .order('published_at', { ascending: false })
          .limit(4);
        setFeatured((others as Blog[]) || []);
      }
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <div className="min-h-screen">
        <Header />
        <div className="container mx-auto px-4 py-24">
          <p className="text-center text-muted-foreground">{t('blogs.loading')}</p>
        </div>
        <Footer />
      </div>;
  }
  if (!blog) {
    return <div className="min-h-screen flex flex-col">
        <Header />
        <NotFoundState
          icon="emoji"
          emoji="📄"
          titleKey="blogs.notFound"
          descriptionKey="blogs.notFoundMessage"
          primaryAction={{
            to: "/blogs",
            labelKey: "blogs.backToBlogs",
            showBackArrow: true,
          }}
          secondaryAction={{
            to: "/",
            labelKey: "blogs.home",
          }}
        />
        <Footer />
      </div>;
  }
  const blogTitle = getTranslatedContent(blog, 'title', i18n.language);
  const blogExcerpt = getTranslatedContent(blog, 'excerpt', i18n.language);
  return <div className="min-h-screen">
      <SEOHead
        title={blogTitle}
        description={blogExcerpt || `Read "${blogTitle}" on the MR. Property blog.`}
        path={`/blog/${blog.slug}`}
        ogImage={blog.featured_image || undefined}
        ogType="article"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "Article",
          headline: blogTitle,
          image: blog.featured_image ? [blog.featured_image] : undefined,
          datePublished: blog.published_at || undefined,
          dateModified: blog.published_at || undefined,
          description: blogExcerpt || undefined,
          author: { "@type": "Organization", name: "MR. Property" },
          publisher: {
            "@type": "Organization",
            name: "MR. Property",
            logo: { "@type": "ImageObject", url: "https://voi-home.com/favicon.webp" },
          },
          mainEntityOfPage: `https://voi-home.com/blog/${blog.slug}`,
        }}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[40vh] flex items-center justify-center mt-28">
        <div className="absolute inset-0 bg-cover bg-center" style={{
        backgroundImage: `url(${blog.featured_image || heroImage})`
      }}>
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 container mx-auto px-4 text-center">
          <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl text-primary-foreground mb-6 animate-fade-in px-4 ${i18n.language === 'ar' ? 'font-arabic leading-relaxed' : 'font-serif leading-tight'}`}>
            {getTranslatedContent(blog, 'title', i18n.language)}
          </h1>
          <div className="flex items-center justify-center gap-2 text-primary-foreground/80 px-4 py-2 md:px-6 md:py-3 border border-primary-foreground/30 rounded-full max-w-[90%] mx-auto backdrop-blur-sm text-xs md:text-sm">
            <Link to="/" className="hover:text-gold transition-smooth whitespace-nowrap">{t('blogs.home')}</Link>
            <span>/</span>
            <Link to="/blogs" className="hover:text-gold transition-smooth whitespace-nowrap">{t('nav.blogs')}</Link>
            <span>/</span>
            <span className="text-gold truncate max-w-[150px] sm:max-w-[250px] md:max-w-[350px] lg:max-w-[450px]">{getTranslatedContent(blog, 'title', i18n.language)}</span>
          </div>
        </div>
      </section>

      {/* Blog Content */}
      <main className="py-16 bg-background">
        <div className="container mx-auto px-4 max-w-7xl grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-10">
          {/* Sticky Sidebar */}
          <aside className="lg:order-first order-last">
            <div className="lg:sticky lg:top-36 bg-muted/30 rounded-lg shadow-lg p-6 space-y-6">
              {/* CTA */}
              <div>
                <h3 className={`text-2xl mb-1 text-primary ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                  {t('blogs.sidebarCtaTitle')}
                </h3>
                <p className="text-muted-foreground mb-4 text-base">
                  {t('blogs.sidebarCtaSubtitle')}
                </p>
                <Link to="/contact">
                  <Button className="w-full bg-gold text-primary hover:bg-gold/90 font-medium">
                    {t('blogs.sidebarCtaButton')}
                  </Button>
                </Link>
              </div>

              {/* Featured Blogs */}
              {featured.length > 0 && (
                <div className="pt-6 border-t border-border">
                  <h3 className={`text-lg mb-4 text-primary ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                    {t('blogs.featuredBlogs')}
                  </h3>
                  <ul className="space-y-4">
                    {featured.map((b) => (
                      <li key={b.id}>
                        <Link
                          to={`/blog/${b.slug}`}
                          className="flex gap-3 group items-start"
                        >
                          {b.featured_image && (
                            <img
                              src={b.featured_image}
                              alt={getTranslatedContent(b, 'title', i18n.language)}
                              loading="lazy"
                              className="w-16 h-16 rounded-md object-cover flex-shrink-0"
                            />
                          )}
                          <div className="min-w-0">
                            <p className="text-sm text-foreground line-clamp-2 group-hover:text-gold transition-smooth">
                              {getTranslatedContent(b, 'title', i18n.language)}
                            </p>
                            {b.published_at && (
                              <p className="text-xs text-muted-foreground mt-1">
                                {new Date(b.published_at).toLocaleDateString(
                                  i18n.language === 'ar' ? 'ar-SA' : 'en-US',
                                  { year: 'numeric', month: 'short', day: 'numeric' }
                                )}
                              </p>
                            )}
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </aside>


          <article className="min-w-0">
            <div className="mb-8">
              <Link to="/blogs">
                <Button variant="ghost" className="mb-6 text-secondary-foreground">
                  <ArrowLeft className={`h-4 w-4 ${i18n.language === 'ar' ? 'rotate-180 ml-2' : 'mr-2'}`} />
                  {t('blogs.backToAllArticles')}
                </Button>
              </Link>

              <div className="flex flex-wrap items-center gap-3 mb-6">
                {blog.category && <Badge variant="secondary">{t(`blogs.category.${blog.category}`, {
                  defaultValue: blog.category
                })}</Badge>}
                {blog.published_at && <span className="text-sm text-muted-foreground flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(blog.published_at).toLocaleDateString(i18n.language === 'ar' ? 'ar-SA' : 'en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                  </span>}
              </div>

              <h1 className={`text-3xl sm:text-4xl md:text-5xl mb-6 text-primary animate-fade-in leading-tight ${i18n.language === 'ar' ? 'font-arabic' : 'font-serif'}`}>
                {getTranslatedContent(blog, 'title', i18n.language)}
              </h1>

              {blog.excerpt && <p className="text-lg md:text-xl text-muted-foreground mb-8 animate-fade-in leading-relaxed">
                  {getTranslatedContent(blog, 'excerpt', i18n.language)}
                </p>}
            </div>

            {blog.featured_image && <div className="mb-12 rounded-lg overflow-hidden animate-fade-in" style={{
            animationDelay: '0.2s'
          }}>
                <img src={blog.featured_image} alt={getTranslatedContent(blog, 'title', i18n.language)} className="w-full h-auto object-cover" />
              </div>}

            <div className="prose prose-lg max-w-none animate-fade-in" style={{
            animationDelay: '0.3s'
          }} dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(getTranslatedContent(blog, 'content', i18n.language))
          }} />
          </article>
        </div>
      </main>


      <Footer />
    </div>;
};
export default BlogDetail;