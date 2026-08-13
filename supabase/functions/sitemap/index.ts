// Dynamic sitemap.xml served live from the database.
// Public endpoint (no auth). Includes all published blogs and non-draft properties.
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const BASE_URL = "https://voi-home.com";

const staticEntries = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/properties", changefreq: "daily", priority: "0.9" },
  { path: "/properties-map", changefreq: "daily", priority: "0.8" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/blogs", changefreq: "weekly", priority: "0.8" },
  { path: "/buyer-guide", changefreq: "monthly", priority: "0.7" },
  { path: "/team", changefreq: "monthly", priority: "0.6" },
  { path: "/partners", changefreq: "monthly", priority: "0.6" },
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "*",
      },
    });
  }

  const today = new Date().toISOString().slice(0, 10);
  const supabase = createClient(
    Deno.env.get("SUPABASE_URL")!,
    Deno.env.get("SUPABASE_ANON_KEY")!,
  );

  type Entry = { path: string; lastmod?: string; changefreq?: string; priority?: string };
  const entries: Entry[] = [...staticEntries];

  const { data: properties } = await supabase
    .from("properties")
    .select("slug, updated_at, status")
    .neq("status", "draft");
  for (const p of properties || []) {
    if (!p.slug) continue;
    entries.push({
      path: `/property/${p.slug}`,
      lastmod: p.updated_at ? String(p.updated_at).slice(0, 10) : today,
      changefreq: "weekly",
      priority: "0.7",
    });
  }

  const { data: blogs } = await supabase
    .from("blogs")
    .select("slug, updated_at, published")
    .eq("published", true);
  for (const b of blogs || []) {
    if (!b.slug) continue;
    entries.push({
      path: `/blog/${b.slug}`,
      lastmod: b.updated_at ? String(b.updated_at).slice(0, 10) : today,
      changefreq: "monthly",
      priority: "0.6",
    });
  }

  const urls = entries.map((e) =>
    [
      `  <url>`,
      `    <loc>${BASE_URL}${e.path}</loc>`,
      `    <lastmod>${e.lastmod || today}</lastmod>`,
      e.changefreq ? `    <changefreq>${e.changefreq}</changefreq>` : null,
      e.priority ? `    <priority>${e.priority}</priority>` : null,
      `  </url>`,
    ]
      .filter(Boolean)
      .join("\n"),
  );

  const xml = [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");

  return new Response(xml, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=600, s-maxage=600",
      "Access-Control-Allow-Origin": "*",
    },
  });
});
