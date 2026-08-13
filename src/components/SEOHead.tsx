import { Helmet } from "react-helmet-async";

const SITE_URL = "https://voi-home.com";
const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.jpg`;

interface SEOHeadProps {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  ogType?: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

const SEOHead = ({
  title,
  description,
  path,
  ogImage = DEFAULT_OG_IMAGE,
  ogType = "website",
  noindex = false,
  jsonLd,
}: SEOHeadProps) => {
  const canonicalUrl = `${SITE_URL}${path}`;
  const fullTitle = title.includes("MR. Property") ? title : `${title} | MR. Property`;

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
      <meta property="og:image" content={ogImage} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD */}
      {jsonLd && (
        <script type="application/ld+json">{JSON.stringify(jsonLd)}</script>
      )}
    </Helmet>
  );
};

export default SEOHead;
