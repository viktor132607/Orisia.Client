export type Locale = "bg" | "en";

export const locales: Locale[] = ["bg", "en"];

const publicRoots = new Set([
  "",
  "about",
  "calendar",
  "contact",
  "cookies",
  "events",
  "gallery",
  "horoteka",
  "news",
  "privacy",
  "terms",
]);

export function isLocale(value: string): value is Locale {
  return value === "bg" || value === "en";
}

export function getLocaleFromPathname(pathname: string): Locale | null {
  const match = pathname.match(/^\/(bg|en)(?:\/|$)/);
  return match && isLocale(match[1]) ? match[1] : null;
}

export function stripLocale(pathname: string) {
  const locale = getLocaleFromPathname(pathname);
  if (!locale) return pathname || "/";
  const stripped = pathname.replace(new RegExp(`^/${locale}(?=/|$)`), "");
  return stripped || "/";
}

export function isPublicPath(pathname: string) {
  const clean = stripLocale(pathname).split(/[?#]/, 1)[0];
  const segments = clean.split("/").filter(Boolean);
  if (segments.length === 0) return true;
  if (!publicRoots.has(segments[0])) return false;
  if (segments.length === 1) return true;
  return ["events", "news", "horoteka"].includes(segments[0]) && segments.length === 2;
}

export function localizePath(path: string, locale: Locale) {
  if (!path.startsWith("/")) return path;

  const hashIndex = path.indexOf("#");
  const queryIndex = path.indexOf("?");
  const cutCandidates = [hashIndex, queryIndex].filter((index) => index >= 0);
  const cut = cutCandidates.length ? Math.min(...cutCandidates) : path.length;
  const pathname = path.slice(0, cut);
  const suffix = path.slice(cut);
  const clean = stripLocale(pathname);

  if (clean === "/") return `/${locale}/${suffix}`;

  const normalized = clean.startsWith("/") ? clean : `/${clean}`;
  const withSlash = normalized.endsWith("/") ? normalized : `${normalized}/`;
  return `/${locale}${withSlash}${suffix}`;
}


export function buildLanguageAlternates(path: string) {
  return {
    canonical: path,
    languages: {
      bg: localizePath(path, "bg"),
      en: localizePath(path, "en"),
      "x-default": path,
    },
  };
}
