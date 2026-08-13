// Serves pre-rendered HTML with dynamic og:* tags for social media crawlers.
// Path formats supported:
//   /og-preview/property/:slug
//   /og-preview/blog/:slug
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const SITE_URL = "https://voi-home.com";
const DEFAULT_OG = `${SITE_URL}/og-image.jpg`;

const escapeHtml = (s: string) =>
  String(s ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

function truncate(s: string, n = 160) {
  const clean = (s || "").replace(/<[^>]+>/g, "").replace(/\s+/g, " ").trim();
  return clean.length > n ? clean.slice(0, n - 1) + "…" : clean;
}

function renderHtml(opts: {
  title: string;
  description: string;
  url: string;
  image: string;
  type: "article" | "website" | "product";
}) {
  const { title, description, url, image, type } = opts;
  const t = escapeHtml(title);
  const d = escapeHtml(description);
  const u = escapeHtml(url);
  const img = escapeHtml(image);
  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8" />
<title>${t}</title>
<meta name="description" content="${d}" />
<link rel="canonical" href="${u}" />
<meta property="og:type" content="${type}" />
<meta property="og:url" content="${u}" />
<meta property="og:title" content="${t}" />
<meta property="og:description" content="${d}" />
<meta property="og:image" content="${img}" />
<meta property="og:image:width" content="1200" />
<meta property="og:image:height" content="630" />
<meta name="twitter:card" content="summary_large_image" />
<meta name="twitter:title" content="${t}" />
<meta name="twitter:description" content="${d}" />
<meta name="twitter:image" content="${img}" />
<meta http-equiv="refresh" content="0; url=${u}" />
</head>
<body><p><a href="${u}">${t}</a></p></body>
</html>`;
}

Deno.serve(async (req) => {
  const url = new URL(req.url);
  // strip function base: /og-preview/...
  const parts = url.pathname.split("/").filter(Boolean);
  // parts: ["og-preview", "property"|"blog", slug]
  const kindIdx = parts.indexOf("og-preview");
  const kind = parts[kindIdx + 1];
  const slug = parts[kindIdx + 2];

  const headers = {
    "Content-Type": "text/html; charset=utf-8",
    "Cache-Control": "public, max-age=300, s-maxage=600",
    "Access-Control-Allow-Origin": "*",
  };

  if (!kind || !slug || (kind !== "property" && kind !== "blog")) {
    return new Response(
      renderHtml({
        title: "MR. Property — Premium Real Estate in Türkiye & Dubai",
        description: "Discover premium properties for sale and investment.",
        url: SITE_URL,
        image: DEFAULT_OG,
        type: "website",
      }),
      { headers },
    );
  }

  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
  );

  if (kind === "property") {
    const { data } = await supabase
      .from("properties")
      .select("title, description, images, slug, status")
      .eq("slug", slug)
      .neq("status", "draft")
      .maybeSingle();

    const canonical = `${SITE_URL}/property/${slug}`;
    if (!data) {
      return new Response(
        renderHtml({
          title: "Property — MR. Property",
          description: "Explore premium properties on MR. Property.",
          url: canonical,
          image: DEFAULT_OG,
          type: "website",
        }),
        { headers },
      );
    }
    const image =
      Array.isArray(data.images) && data.images.length > 0
        ? String(data.images[0])
        : DEFAULT_OG;
    return new Response(
      renderHtml({
        title: `${data.title} | MR. Property`,
        description: truncate(data.description || `View ${data.title} on MR. Property.`),
        url: canonical,
        image,
        type: "product",
      }),
      { headers },
    );
  }

  // blog
  const { data } = await supabase
    .from("blogs")
    .select("title, excerpt, featured_image, slug, published")
    .eq("slug", slug)
    .eq("published", true)
    .maybeSingle();

  const canonical = `${SITE_URL}/blog/${slug}`;
  if (!data) {
    return new Response(
      renderHtml({
        title: "Blog — MR. Property",
        description: "Insights on real estate in Türkiye and Dubai.",
        url: canonical,
        image: DEFAULT_OG,
        type: "website",
      }),
      { headers },
    );
  }
  return new Response(
    renderHtml({
      title: `${data.title} | MR. Property`,
      description: truncate(data.excerpt || `Read "${data.title}" on the MR. Property blog.`),
      url: canonical,
      image: data.featured_image || DEFAULT_OG,
      type: "article",
    }),
    { headers },
  );
});
