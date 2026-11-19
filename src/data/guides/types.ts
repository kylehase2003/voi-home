// In-depth guides that back the FAQ page. They live in code (not the blogs
// table) so they ship with the site, and are merged into the blog list and
// blog pages with the same shape as a `blogs` row.
export interface Guide {
  id: string;
  slug: string;
  category: "buying-guide" | "investment" | "market-update" | "lifestyle" | "news" | "tips";
  region: "turkey";
  published_at: string;
  created_at: string;
  featured_image: string;
  title: string;
  title_ar: string;
  excerpt: string;
  excerpt_ar: string;
  /** HTML body (sanitised with DOMPurify when rendered). */
  content: string;
  content_ar: string;
  tags: string[];
  tags_ar: string[];
}
