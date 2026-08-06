// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://REPLACE_WITH_VOI_HOME_DOMAIN.com";
const SUPABASE_URL = "REPLACE_WITH_NEW_SUPABASE_URL";
const SUPABASE_ANON_KEY = "REPLACE_WITH_NEW_SUPABASE_ANON_KEY";

interface SitemapEntry {
  path: string;
  lastmod?: string;
  changefreq?: "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";
  priority?: string;
}

const today = new Date().toISOString().slice(0, 10);

const staticEntries: SitemapEntry[] = [
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

async function fetchDynamicEntries(): Promise<SitemapEntry[]> {
  try {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
    const entries: SitemapEntry[] = [];

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

    return entries;
  } catch (err) {
    console.warn("sitemap: dynamic fetch failed, using static entries only", err);
    return [];
  }
}

function generateSitemap(entries: SitemapEntry[]) {
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
  return [
    `<?xml version="1.0" encoding="UTF-8"?>`,
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ...urls,
    `</urlset>`,
    ``,
  ].join("\n");
}

(async () => {
  const dynamic = await fetchDynamicEntries();
  const entries = [...staticEntries, ...dynamic];
  writeFileSync(resolve("public/sitemap.xml"), generateSitemap(entries));
  console.log(`sitemap.xml written (${entries.length} entries)`);
})();
