// Tells Bing (and through it ChatGPT search, Copilot, DuckDuckGo, Yandex...)
// which pages changed in this deploy, using the IndexNow protocol.
//
// Compares each page in dist/ with the previous deploy (checked out into
// .previous-build by the workflow) using a content signature - title, meta
// description, links and visible text - because raw HTML differs on every
// build. Submits only new or changed pages, plus pages that disappeared.
//
// Runs after the deploy is published. It waits until the live site serves
// this build's sitemap, then submits. It never fails the deploy.
// INDEXNOW_DRY_RUN=1 prints what it would submit without sending anything.

import { existsSync, readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const SITE = "https://voi-home.com";
const HOST = "voi-home.com";
const DIST = "dist";
const PREV = ".previous-build";
const DRY = !!process.env.INDEXNOW_DRY_RUN;

const key = readdirSync(DIST).find((f) => /^[0-9a-f]{32}\.txt$/.test(f))?.replace(".txt", "");
if (!key) {
  console.log("::warning::IndexNow key file not found in dist/; skipping.");
  process.exit(0);
}

const urlsOf = (dir) => {
  const file = join(dir, "sitemap.xml");
  if (!existsSync(file)) return [];
  return [...readFileSync(file, "utf8").matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
};
const fileFor = (dir, url) => {
  const path = new URL(url).pathname.replace(/\/+$/, "");
  return path === "" ? join(dir, "index.html") : join(dir, `${path.slice(1)}.html`);
};
const signature = (dir, url) => {
  const file = fileFor(dir, url);
  if (!existsSync(file)) return null;
  const html = readFileSync(file, "utf8");
  const title = html.match(/<title>([^<]*)<\/title>/)?.[1] ?? "";
  const desc = html.match(/<meta name="description" content="([^"]*)"/)?.[1] ?? "";
  const body = html.split('<div id="root">')[1] ?? "";
  const links = [...body.matchAll(/href="([^"]+)"/g)].map((m) => m[1]).sort().join("|");
  const text = body
    .replace(/<script[\s\S]*?<\/script>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return `${title}|${desc}|${links}|${text}`;
};

const current = urlsOf(DIST);
const previous = urlsOf(PREV);
const firstRun = previous.length === 0;
const changed = current.filter((u) => firstRun || signature(DIST, u) !== signature(PREV, u));
const removed = previous.filter((u) => !current.includes(u));
const urlList = [...new Set([...changed, ...removed])];

console.log(`IndexNow: ${changed.length} new/changed, ${removed.length} removed${firstRun ? " (first run: submitting all)" : ""}.`);
urlList.forEach((u) => console.log(`  ${u}`));
if (!urlList.length) process.exit(0);
if (DRY) {
  console.log("Dry run: nothing submitted.");
  process.exit(0);
}

// Wait for the host to serve this build (it can lag a few minutes).
const expectedSitemap = readFileSync(join(DIST, "sitemap.xml"), "utf8").trim();
const deadline = Date.now() + 15 * 60 * 1000;
for (;;) {
  try {
    const [sitemap, keyFile] = await Promise.all([
      fetch(`${SITE}/sitemap.xml`, { cache: "no-store" }).then((r) => r.text()),
      fetch(`${SITE}/${key}.txt`, { cache: "no-store" }).then((r) => r.text()),
    ]);
    if (sitemap.trim() === expectedSitemap && keyFile.trim() === key) break;
  } catch {
    /* retry */
  }
  if (Date.now() > deadline) {
    console.log("::warning::Live site did not serve this build within 15 minutes; IndexNow skipped.");
    process.exit(0);
  }
  await new Promise((r) => setTimeout(r, 20000));
}

const res = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: HOST, key, keyLocation: `${SITE}/${key}.txt`, urlList }),
});
if (res.status === 200 || res.status === 202) {
  console.log(`IndexNow accepted ${urlList.length} URL(s) (HTTP ${res.status}).`);
} else {
  console.log(`::warning::IndexNow returned HTTP ${res.status}: ${await res.text()}`);
}
