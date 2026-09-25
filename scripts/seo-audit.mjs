import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, URL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://orisia-client-zgwt.onrender.com").replace(/\/$/, "");

const failures = [];

function assert(condition, message) {
  if (!condition) failures.push(message);
}

function read(relativePath) {
  const fullPath = path.join(out, relativePath);
  assert(fs.existsSync(fullPath), `Missing export file: ${relativePath}`);
  return fs.existsSync(fullPath) ? fs.readFileSync(fullPath, "utf8") : "";
}

function htmlFileForPathname(pathname) {
  if (pathname === "/") return "index.html";
  const clean = pathname.replace(/^\//, "").replace(/\/$/, "");
  return path.join(clean, "index.html");
}

function hasAlternate(html, language) {
  const links = html.match(/<link[^>]*>/gi) ?? [];
  return links.some(
    (link) =>
      /rel=["']alternate["']/i.test(link) &&
      new RegExp(`hreflang=["']${language}["']`, "i").test(link)
  );
}

function assertCommonSeo(html, pathname) {
  assert(/<link[^>]+rel=["']canonical["']/i.test(html), `${pathname}: missing canonical`);
  assert(html.includes(`${siteUrl}${pathname}`), `${pathname}: canonical/metadata does not reference expected live URL`);
  assert(/property=["']og:title["']/i.test(html), `${pathname}: missing og:title`);
  assert(/name=["']twitter:card["']/i.test(html), `${pathname}: missing twitter:card`);
}

const robots = read("robots.txt");
assert(robots.includes(`Sitemap: ${siteUrl}/sitemap.xml`), "robots.txt: incorrect sitemap URL");
for (const blocked of ["/admin/", "/account/", "/login/", "/register/"]) {
  assert(robots.includes(`Disallow: ${blocked}`), `robots.txt: missing disallow for ${blocked}`);
}

const sitemap = read("sitemap.xml");
const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]);
assert(urls.length > 0, "sitemap.xml: no URLs");

for (const forbidden of ["/admin/", "/account/", "/login/", "/register/"]) {
  assert(!urls.some((url) => new URL(url).pathname.startsWith(forbidden)), `sitemap.xml: private route leaked: ${forbidden}`);
}

for (const url of urls) {
  const parsed = new URL(url);
  assert(parsed.origin === siteUrl, `sitemap.xml: unexpected origin ${parsed.origin}`);
  const pathname = parsed.pathname.endsWith("/") ? parsed.pathname : `${parsed.pathname}/`;
  const relativeFile = htmlFileForPathname(pathname);
  const html = read(relativeFile);
  assertCommonSeo(html, pathname);
}

for (const locale of ["bg", "en"]) {
  const pathname = `/${locale}/`;
  const html = read(`${locale}/index.html`);
  assert(hasAlternate(html, "bg"), `${pathname}: missing bg hreflang`);
  assert(hasAlternate(html, "en"), `${pathname}: missing en hreflang`);
  assert(hasAlternate(html, "x-default"), `${pathname}: missing x-default hreflang`);
  assert(
    new RegExp(`<html\\s+lang=["']${locale}["']`, "i").test(html),
    `${pathname}: incorrect <html lang> for localized page`
  );
}

const home = read("index.html");
assert(home.includes('"@type":"PerformingGroup"'), "Homepage: missing PerformingGroup JSON-LD");
assert(home.includes('"@type":"WebSite"'), "Homepage: missing WebSite JSON-LD");
assert(hasAlternate(home, "bg"), "Homepage: missing bg hreflang");
assert(hasAlternate(home, "en"), "Homepage: missing en hreflang");
assert(hasAlternate(home, "x-default"), "Homepage: missing x-default hreflang");

const eventHtml = read("events/3-godini-orisia/index.html");
assert(eventHtml.includes('"@type":"Event"'), "Event detail: missing Event JSON-LD");
assert(eventHtml.includes('"location"'), "Event detail: missing Event location");

const newsHtml = read("news/septemvriiski-grafik/index.html");
assert(
  newsHtml.includes('"@type":"NewsArticle"') || newsHtml.includes('property="og:type" content="article"'),
  "News detail: missing article semantics"
);

for (const privatePage of ["login/index.html", "register/index.html", "account/index.html", "admin/index.html"]) {
  const html = read(privatePage);
  assert(/name=["']robots["'][^>]+noindex/i.test(html) || /content=["'][^"']*noindex/i.test(html), `${privatePage}: missing noindex`);
}

const notFound = read("404.html");
assert(/content=["'][^"']*noindex/i.test(notFound), "404.html: missing noindex");

if (failures.length) {
  process.stderr.write("\nSEO audit failed:\n");
  for (const failure of failures) process.stderr.write(`- ${failure}\n`);
  process.exit(1);
}

process.stdout.write(`SEO audit passed: ${urls.length} sitemap URLs verified against static export.\n`);
