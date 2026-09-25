import type { MetadataRoute } from "next";
import { defaultFeedPosts } from "../components/homeFeedStore";
import { horotekaDances } from "../lib/horoteka";
import { locales, localizePath } from "../lib/i18n";
import { siteUrl } from "../lib/seo";

export const dynamic = "force-static";

const staticPaths = [
  "/",
  "/about/",
  "/calendar/",
  "/contact/",
  "/cookies/",
  "/events/",
  "/gallery/",
  "/horoteka/",
  "/news/",
  "/privacy/",
  "/terms/",
];

const detailPaths = [
  ...defaultFeedPosts
    .filter((post) => post.slug)
    .map((post) =>
      post.type === "event"
        ? `/events/${post.slug}/`
        : `/news/${post.slug}/`
    ),
  ...horotekaDances.map((dance) => `/horoteka/${dance.slug}/`),
];

function absolute(path: string) {
  return new URL(path, siteUrl).toString();
}

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = [...staticPaths, ...detailPaths];
  const localizedPaths = paths.flatMap((path) =>
    locales.map((locale) => localizePath(path, locale))
  );

  return [...paths, ...localizedPaths].map((path) => ({
    url: absolute(path),
    changeFrequency:
      path.includes("/news/") || path.includes("/events/")
        ? "weekly"
        : "monthly",
    priority:
      path === "/" || path === "/bg/" || path === "/en/"
        ? 1
        : path.includes("/news/") || path.includes("/events/")
          ? 0.8
          : 0.7,
  }));
}
