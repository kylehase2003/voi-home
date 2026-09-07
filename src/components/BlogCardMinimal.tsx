import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getTranslatedContent } from "@/lib/i18n-content";
import OptimizedImage from "@/components/OptimizedImage";

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

interface BlogCardMinimalProps {
  blog: Blog;
  category?: string;
}

// Editorial, minimal alternative to the boxed/shadowed blog Card - a quiet
// category pill on the photo, then a plain typographic caption (date,
// serif title, excerpt, a text "read more" link), matching
// PropertyCardMinimal's language instead of a generic blog-template look.
const BlogCardMinimal = ({ blog, category }: BlogCardMinimalProps) => {
  const { i18n, t } = useTranslation();
  const isRTL = i18n.language === "ar";
  const dateLabel = blog.created_at
    ? new Date(blog.created_at).toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" })
    : null;

  return (
    <Link to={`/blog/${blog.slug}`} className="group block">
      <div className="relative overflow-hidden rounded-2xl aspect-video bg-muted mb-5">
        {blog.featured_image && (
          <OptimizedImage
            src={blog.featured_image}
            alt={blog.title}
            className="transition-transform duration-700 group-hover:scale-105"
            containerClassName="w-full h-full"
          />
        )}
        {category && (
          <div className="absolute top-4 left-4 px-3 py-1.5 rounded-full bg-black/40 backdrop-blur-md text-white text-[11px] font-medium uppercase tracking-[1px]">
            {category}
          </div>
        )}
      </div>

      <div className={isRTL ? "font-arabic" : ""}>
        {dateLabel && (
          <div className="text-xs font-medium uppercase tracking-[1.5px] mb-3 text-muted-foreground">
            {dateLabel}
          </div>
        )}
        <h3 className="font-serif text-lg md:text-xl text-foreground leading-snug line-clamp-2 mb-2 group-hover:text-gold transition-colors">
          {getTranslatedContent(blog, "title", i18n.language)}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed line-clamp-2 mb-4">
          {getTranslatedContent(blog, "excerpt", i18n.language)}
        </p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-gold">
          {t("blogs.readMore")}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
};

export default BlogCardMinimal;
