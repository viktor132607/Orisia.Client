import type { MetadataRoute } from "next";
import { type DanceResponse, type EventResponse, type PostResponse, safePublicGet } from "../lib/api";
import { locales, localizePath } from "../lib/i18n";
import { siteUrl } from "../lib/seo";

export const dynamic = "force-static";
const staticPaths = ["/","/about/","/calendar/","/contact/","/cookies/","/events/","/gallery/","/horoteka/","/news/","/privacy/","/terms/"];
const absolute = (path: string) => new URL(path, siteUrl).toString();

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, events, dances] = await Promise.all([
    safePublicGet<PostResponse[]>("/posts", []),
    safePublicGet<EventResponse[]>("/events", []),
    safePublicGet<DanceResponse[]>("/horoteka", []),
  ]);
  const detailPaths = [
    ...posts.map((item) => `/news/${item.slug}/`),
    ...events.map((item) => `/events/${item.slug}/`),
    ...dances.map((item) => `/horoteka/${item.slug}/`),
  ];
  const paths = [...staticPaths, ...detailPaths];
  const localized = paths.flatMap((path) => locales.map((locale) => localizePath(path, locale)));
  return [...paths, ...localized].map((path) => ({
    url: absolute(path),
    changeFrequency: path.includes("/news/") || path.includes("/events/") ? "weekly" : "monthly",
    priority: path === "/" || path === "/bg/" || path === "/en/" ? 1 : path.includes("/news/") || path.includes("/events/") ? 0.8 : 0.7,
  }));
}
