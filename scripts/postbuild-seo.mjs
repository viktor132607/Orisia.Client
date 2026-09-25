import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const out = path.join(root, "out");
const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://orisia-client-zgwt.onrender.com").replace(/\/$/, "");

function walkHtml(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walkHtml(full) : entry.name.endsWith(".html") ? [full] : [];
  });
}

function updateHtmlLang(file, locale) {
  let html = fs.readFileSync(file, "utf8");
  html = html.replace(/<html\s+lang=["'][^"']*["']/i, `<html lang="${locale}"`);
  fs.writeFileSync(file, html);
}

const homeFile = path.join(out, "index.html");
if (!fs.existsSync(homeFile)) {
  process.stderr.write("postbuild-seo: out/index.html is missing\n");
  process.exit(1);
}

let home = fs.readFileSync(homeFile, "utf8");
if (!/hreflang=["']bg["']/i.test(home)) {
  const alternates = [
    `<link rel="alternate" hreflang="bg" href="${siteUrl}/bg/"/>`,
    `<link rel="alternate" hreflang="en" href="${siteUrl}/en/"/>`,
    `<link rel="alternate" hreflang="x-default" href="${siteUrl}/"/>`,
  ].join("");
  home = home.replace("</head>", `${alternates}</head>`);
}
fs.writeFileSync(homeFile, home);

for (const locale of ["bg", "en"]) {
  for (const file of walkHtml(path.join(out, locale))) {
    updateHtmlLang(file, locale);
  }
}

process.stdout.write("postbuild-seo: normalized homepage hreflang and localized html lang attributes.\n");
