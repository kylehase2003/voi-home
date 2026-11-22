// Build-time prerendering for crawlers (Google, Bing, ChatGPT, Claude,
// Perplexity...). Most AI crawlers don't run JavaScript, so a Vite SPA shows
// them an empty <div id="root">. This script opens every URL from
// dist/sitemap.xml in headless Chrome, waits for the page to finish, and saves
// the rendered HTML as a static file. Visitors still get the normal app:
// main.tsx uses createRoot, which simply replaces the snapshot.
//
// Output (no trailing slashes, matching the site's canonical URLs):
//   /            -> dist/index.html
//   /about       -> dist/about.html
//   /blog/x      -> dist/blog/x.html
//   dist/spa-shell.html  clean copy of the built index.html (app-only routes, 404s)
//   dist/.htaccess       serves the snapshots on Hostinger (see writeHtaccess)
//
// Puppeteer is deliberately NOT a project dependency (Hostinger installs deps
// on every build and would download Chrome). Install it elsewhere and point
// PRERENDER_DEPS at that folder's node_modules:
//   npm install --prefix /tmp/prerender-deps puppeteer@24
//   PRERENDER_DEPS=/tmp/prerender-deps/node_modules node scripts/prerender.mjs
//
// Quality gate: if any page looks broken (spinner, error, 404, almost no text,
// no canonical tag) the script exits non-zero and nothing should be published.

import { createServer } from "node:http";
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, extname, join, resolve } from "node:path";

const DIST = resolve(process.env.PRERENDER_DIST || "dist");
const SITE = "https://voi-home.com";
const CONCURRENCY = Number(process.env.PRERENDER_CONCURRENCY || 4);
const MIN_TEXT = 400;

const require = createRequire(process.env.PRERENDER_DEPS ? join(process.env.PRERENDER_DEPS, "x.js") : import.meta.url);
const puppeteer = require("puppeteer");

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".json": "application/json",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".xml": "application/xml",
  ".txt": "text/plain",
  ".mp4": "video/mp4",
};

// Transparent 1x1 PNG: keeps <img src> in the markup without downloading images.
const PIXEL = Buffer.from("iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=", "base64");

function routesFromSitemap() {
  const xml = readFileSync(join(DIST, "sitemap.xml"), "utf8");
  const paths = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => new URL(m[1]).pathname.replace(/\/+$/, "") || "/");
  return [...new Set(paths)];
}

function outFile(route) {
  return route === "/" ? join(DIST, "index.html") : join(DIST, `${route.slice(1)}.html`);
}

// Static server over dist/. Every non-file path returns the clean shell, so a
// snapshot never starts from an already-snapshotted page.
function startServer(shell) {
  const server = createServer((req, res) => {
    const path = decodeURIComponent(new URL(req.url, "http://x").pathname);
    const file = join(DIST, path);
    if (path !== "/" && file.startsWith(DIST) && existsSync(file) && extname(file)) {
      res.writeHead(200, { "Content-Type": MIME[extname(file).toLowerCase()] || "application/octet-stream" });
      res.end(readFileSync(file));
      return;
    }
    res.writeHead(200, { "Content-Type": MIME[".html"] });
    res.end(shell);
  });
  return new Promise((ok) => server.listen(0, "127.0.0.1", () => ok(server)));
}

async function snapshot(browser, origin, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 900 });
  await page.setExtraHTTPHeaders({ "Accept-Language": "en" });
  await page.evaluateOnNewDocument(() => {
    // Helmet writes head tags on requestAnimationFrame, which is paused in
    // background tabs; a timer-based rAF keeps every tab moving.
    window.requestAnimationFrame = (cb) => setTimeout(() => cb(performance.now()), 16);
    window.cancelAnimationFrame = (id) => clearTimeout(id);
    window.__PRERENDER__ = true;
    try {
      localStorage.setItem("preferredLanguage", "en");
    } catch {
      /* ignore */
    }
  });
  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const url = new URL(req.url());
    if (req.resourceType() === "image" && url.host !== new URL(origin).host) {
      return req.respond({ status: 200, contentType: "image/png", body: PIXEL });
    }
    const allowed =
      url.origin === origin ||
      url.hostname.endsWith(".supabase.co") ||
      url.hostname === "fonts.googleapis.com" ||
      url.hostname === "fonts.gstatic.com";
    // Analytics, pixels, video and map tiles are blocked so runs never count as visits.
    return allowed ? req.continue() : req.abort();
  });

  await page.goto(origin + route, { waitUntil: "networkidle0", timeout: 60000 });
  // Scroll through so scroll-reveal and lazy sections render.
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 80));
    }
    window.scrollTo(0, 0);
  });
  await page.waitForNetworkIdle({ idleTime: 500, timeout: 30000 }).catch(() => {});
  await page.waitForFunction(() => !document.querySelector(".animate-spin"), { timeout: 20000 }).catch(() => {});
  await page.waitForSelector('link[rel="canonical"][data-rh]', { timeout: 20000 }).catch(() => {});

  const result = await page.evaluate(() => {
    const head = document.head;
    // Drop the static defaults from index.html that Helmet replaced for this
    // page (description, og:*, twitter:*, canonical), so each tag appears once.
    for (const tag of head.querySelectorAll("[data-rh]")) {
      const key = tag.getAttribute("name")
        ? `meta[name="${tag.getAttribute("name")}"]`
        : tag.getAttribute("property")
          ? `meta[property="${tag.getAttribute("property")}"]`
          : tag.getAttribute("rel") === "canonical"
            ? 'link[rel="canonical"]'
            : null;
      if (key) head.querySelectorAll(`${key}:not([data-rh])`).forEach((el) => el.remove());
    }
    // Scripts that third-party tags injected at runtime are not wanted in the snapshot.
    document.querySelectorAll('script[src*="googletagmanager"], iframe[src*="googletagmanager"]').forEach((el) => el.remove());
    const root = document.getElementById("root");
    return {
      html: "<!doctype html>\n" + document.documentElement.outerHTML,
      text: (root?.innerText || "").replace(/\s+/g, " ").trim(),
      title: document.title,
      canonical: !!head.querySelector('link[rel="canonical"][data-rh]'),
      spinner: !!document.querySelector(".animate-spin"),
    };
  });
  await page.close();

  const problems = [];
  if (result.spinner) problems.push("still loading (spinner)");
  if (result.text.length < MIN_TEXT) problems.push(`only ${result.text.length} characters of text`);
  if (/something went wrong/i.test(result.text)) problems.push("error boundary shown");
  if (!result.canonical) problems.push("no canonical tag (Helmet did not run or page is a 404)");
  if (/\b404\b|not found/i.test(result.title)) problems.push(`looks like a 404 (title: ${result.title})`);
  return { ...result, problems };
}

function writeHtaccess() {
  const htaccess = `# Generated by scripts/prerender.mjs - serves prerendered snapshots.
# /about is answered from about.html (no redirect, no trailing slash).
DirectorySlash Off
Options -MultiViews

<IfModule mod_rewrite.c>
  RewriteEngine On
  RewriteBase /

  # Trailing slash -> canonical URL without it (but keep "/").
  RewriteCond %{REQUEST_FILENAME} !-f
  RewriteRule ^(.+)/$ /$1 [R=301,L]

  # A prerendered snapshot exists for this URL.
  RewriteCond %{REQUEST_FILENAME}.html -f
  RewriteRule ^(.+)$ $1.html [L]

  # Real files (assets, sitemap.xml, robots.txt, llms.txt...).
  RewriteCond %{REQUEST_FILENAME} -f
  RewriteRule ^ - [L]

  # App-only pages that are never prerendered: serve the app with 200.
  RewriteRule ^(dashboard|auth|coming-soon|links|experience)(/.*)?$ spa-shell.html [L]
</IfModule>

# Anything else is not a page on this site: the app renders its "not found"
# page, and crawlers get a real 404 status instead of a soft 404.
ErrorDocument 404 /spa-shell.html

<IfModule mod_headers.c>
  <FilesMatch "\\.html$">
    Header set Cache-Control "no-cache"
  </FilesMatch>
  <If "%{REQUEST_URI} =~ m#^/assets/#">
    Header set Cache-Control "public, max-age=31536000, immutable"
  </If>
</IfModule>
`;
  writeFileSync(join(DIST, ".htaccess"), htaccess);
}

async function main() {
  const indexPath = join(DIST, "index.html");
  const shellPath = join(DIST, "spa-shell.html");
  // Keep a clean shell even if this script runs twice on the same dist/.
  if (!existsSync(shellPath)) writeFileSync(shellPath, readFileSync(indexPath));
  const shell = readFileSync(shellPath, "utf8");
  if (!shell.includes('<div id="root"></div>')) throw new Error("dist/index.html is not a clean build; run `npm run build` first.");

  const routes = routesFromSitemap();
  if (!routes.some((r) => r.startsWith("/property/")) || !routes.some((r) => r.startsWith("/blog/"))) {
    throw new Error("sitemap has no /property/ or /blog/ URLs - the database was probably unreachable at build time.");
  }

  const server = await startServer(shell);
  const origin = `http://127.0.0.1:${server.address().port}`;
  const browser = await puppeteer.launch({
    headless: true,
    args: [
      "--no-sandbox",
      "--disable-background-timer-throttling",
      "--disable-renderer-backgrounding",
      "--disable-backgrounding-occluded-windows",
    ],
  });

  const failures = [];
  const outputs = new Map();
  const queue = [...routes];
  let done = 0;
  async function worker() {
    while (queue.length) {
      const route = queue.shift();
      let snap;
      for (let attempt = 1; attempt <= 2; attempt++) {
        try {
          snap = await snapshot(browser, origin, route);
          if (!snap.problems.length) break;
        } catch (err) {
          snap = { problems: [String(err.message || err)] };
        }
      }
      done++;
      if (snap.problems.length) {
        failures.push(`${route}: ${snap.problems.join("; ")}`);
        console.log(`  ✗ [${done}/${routes.length}] ${route} - ${snap.problems.join("; ")}`);
      } else {
        outputs.set(route, snap.html.replaceAll(origin, SITE));
        console.log(`  ✓ [${done}/${routes.length}] ${route} (${snap.text.length} chars)`);
      }
    }
  }
  console.log(`Prerendering ${routes.length} pages...`);
  await Promise.all(Array.from({ length: CONCURRENCY }, worker));
  await browser.close();
  server.close();

  if (failures.length) {
    console.error(`\nPrerender failed for ${failures.length} page(s); nothing written:\n  ${failures.join("\n  ")}`);
    process.exit(1);
  }
  for (const [route, html] of outputs) {
    const file = outFile(route);
    mkdirSync(dirname(file), { recursive: true });
    writeFileSync(file, html);
  }
  writeHtaccess();
  console.log(`\nWrote ${outputs.size} snapshots, spa-shell.html and .htaccess to ${DIST}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
