// Runs before `vite dev` and `vite build` (predev/prebuild hooks); writes public/sitemap.xml.
import { writeFileSync } from "fs";
import { resolve } from "path";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://voi-home.com";
const SUPABASE_URL = "https://pypvkelapzcmsaetjbbb.supabase.co";
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB5cHZrZWxhcHpjbXNhZXRqYmJiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODYwMzgzODUsImV4cCI6MjEwMTYxNDM4NX0._m5iIE7D8HQNv4VsMA3-jNK3jYhCYxWuH8mysSZewuk";

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
  { path: "/services", changefreq: "monthly", priority: "0.8" },
  // Service pages - keep in sync with src/data/services/index.ts
  ...[
    "property-sales",
    "property-rentals",
    "investment-advisory",
    "property-management",
    "after-sales-support",
    "citizenship-assistance",
    "interior-design",
    "project-sales-office-setup",
  ].map((slug): SitemapEntry => ({ path: `/services/${slug}`, changefreq: "monthly", priority: "0.7" })),
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/contact", changefreq: "monthly", priority: "0.8" },
  { path: "/blogs", changefreq: "weekly", priority: "0.8" },
  { path: "/faq", changefreq: "monthly", priority: "0.8" },
  // FAQ guides (in code, not the blogs table) - keep in sync with src/data/guides/index.ts (GUIDES)
  ...[
    "turkish-residence-permit-through-property",
    "living-in-istanbul-as-a-foreigner",
    "property-taxes-and-costs-in-turkey",
    "how-to-buy-property-in-turkey-as-a-foreigner",
    "european-vs-asian-side-istanbul",
    "investing-in-istanbul-real-estate",
    "tapu-title-deed-turkey-explained",
    "best-areas-in-istanbul-for-families",
    "how-to-calculate-rental-yield",
    "buying-off-plan-property-in-istanbul",
    "daily-life-in-istanbul",
    "renting-out-your-property-in-turkey",
  ].map((slug): SitemapEntry => ({ path: `/blog/${slug}`, changefreq: "monthly", priority: "0.7" })),
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
