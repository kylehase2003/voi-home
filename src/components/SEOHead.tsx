import { Helmet } from "react-helmet-async";

export const SITE_URL = "https://voi-home.com";
/** The business entity declared once in index.html; page schema links to it by @id. */
export const ORG_ID = `${SITE_URL}/#organization`;
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

export interface Crumb {
  name: string;
  path: string;
}

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  /** One schema.org object or several; each is rendered as its own script. */
  jsonLd?: Record<string, unknown> | Record<string, unknown>[];
  /** Trail after "Home", e.g. [{ name: "Services", path: "/services" }]. */
  breadcrumbs?: Crumb[];
}

const absolute = (url: string) => (url.startsWith("http") ? url : `${SITE_URL}${url.startsWith("/") ? "" : "/"}${url}`);

const SEOHead = ({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  jsonLd,
  breadcrumbs,
}: SEOHeadProps) => {
  const canonicalUrl = `${SITE_URL}${path}`;
  const fullTitle = title.includes("Voi Home") ? title : `${title} | Voi Home`;
  const image = absolute(ogImage);

  const blocks = jsonLd ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd]) : [];
  if (breadcrumbs?.length) {
    blocks.push({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [{ name: "Home", path: "/" }, ...breadcrumbs].map((c, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: c.name,
        item: `${SITE_URL}${c.path}`,
      })),
    });
  }

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonicalUrl} />
      {noindex && <meta name="robots" content="noindex, nofollow" />}

      {/* Open Graph */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* JSON-LD */}
      {blocks.map((b, i) => (
        <script key={i} type="application/ld+json">
          {JSON.stringify(b)}
        </script>
      ))}
    </Helmet>
  );
};

export default SEOHead;
