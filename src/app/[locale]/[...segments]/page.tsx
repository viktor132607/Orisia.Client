import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AboutPage from "../../about/page";
import CalendarPage from "../../calendar/page";
import ContactPage from "../../contact/page";
import CookiesPage from "../../cookies/page";
import EventsPage from "../../events/page";
import GalleryPage from "../../gallery/page";
import HorotekaPage from "../../horoteka/page";
import NewsPage from "../../news/page";
import PrivacyPage from "../../privacy/page";
import TermsPage from "../../terms/page";
import DanceDetailClient from "../../horoteka/[slug]/DanceDetailClient";
import FeedDetailClient from "../../../components/FeedDetailClient";
import JsonLd from "../../../components/JsonLd";
import PublicPageStructuredData from "../../../components/PublicPageStructuredData";
import { eventResponseToFeedPost, postResponseToFeedPost } from "../../../components/homeFeedStore";
import { absoluteMediaUrl, type DanceResponse, type EventResponse, type PostResponse, safePublicGet } from "../../../lib/api";
import { isLocale, locales, localizePath, type Locale } from "../../../lib/i18n";
import { buildLocalizedMetadata, englishKeywords, getLocalizedSeo, localizedStaticPaths } from "../../../lib/localizedSeo";
import { buildSocialMetadata, localSeoKeywords } from "../../../lib/seo";
import { buildEventStructuredData, buildNewsArticleStructuredData } from "../../../lib/structuredData";

type Props = { params: Promise<{ locale: string; segments: string[] }> };
export const dynamicParams = false;

const routeComponents: Record<string, React.ComponentType> = {
  "/about/": AboutPage, "/calendar/": CalendarPage, "/contact/": ContactPage, "/cookies/": CookiesPage,
  "/events/": EventsPage, "/gallery/": GalleryPage, "/horoteka/": HorotekaPage, "/news/": NewsPage,
  "/privacy/": PrivacyPage, "/terms/": TermsPage,
};

const segmentsToPath = (segments: string[]) => `/${segments.join("/")}/`;

export async function generateStaticParams() {
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
  return locales.flatMap((locale) => [...localizedStaticPaths, ...detailPaths].map((path) => ({ locale, segments: path.split("/").filter(Boolean) })));
}

async function detailMetadata(locale: Locale, path: string): Promise<Metadata> {
  const canonical = localizePath(path, locale);
  const eventMatch = path.match(/^\/events\/([^/]+)\/$/);
  if (eventMatch) {
    const item = await safePublicGet<EventResponse | null>(`/events/${eventMatch[1]}`, null);
    if (!item) return {};
    const title = locale === "bg" ? item.titleBg : item.titleEn || item.titleBg;
    const description = locale === "bg" ? item.descriptionBg : item.descriptionEn || item.descriptionBg;
    return { title, description, alternates: { canonical, languages: { bg: localizePath(path, "bg"), en: localizePath(path, "en"), "x-default": path } }, ...buildSocialMetadata({ path: canonical, title, description, locale: locale === "bg" ? "bg_BG" : "en_GB" }) };
  }
  const newsMatch = path.match(/^\/news\/([^/]+)\/$/);
  if (newsMatch) {
    const item = await safePublicGet<PostResponse | null>(`/posts/${newsMatch[1]}`, null);
    if (!item) return {};
    const title = locale === "bg" ? item.seoTitleBg || item.titleBg : item.seoTitleEn || item.titleEn || item.titleBg;
    const description = locale === "bg" ? item.seoDescriptionBg || item.excerptBg || item.bodyBg : item.seoDescriptionEn || item.excerptEn || item.bodyEn || item.bodyBg;
    return { title, description, keywords: locale === "bg" ? [item.titleBg, ...localSeoKeywords] : [item.titleEn || item.titleBg, ...englishKeywords], alternates: { canonical, languages: { bg: localizePath(path, "bg"), en: localizePath(path, "en"), "x-default": path } }, ...buildSocialMetadata({ path: canonical, title, description, type: "article", publishedTime: item.publishedAt || item.createdOn, locale: locale === "bg" ? "bg_BG" : "en_GB" }) };
  }
  const danceMatch = path.match(/^\/horoteka\/([^/]+)\/$/);
  if (danceMatch) {
    const item = await safePublicGet<DanceResponse | null>(`/horoteka/${danceMatch[1]}`, null);
    if (!item) return {};
    const title = locale === "bg" ? item.titleBg : item.titleEn || item.titleBg;
    const description = locale === "bg" ? item.descriptionBg : item.descriptionEn || item.descriptionBg;
    return { title, description, alternates: { canonical, languages: { bg: localizePath(path, "bg"), en: localizePath(path, "en"), "x-default": path } }, ...buildSocialMetadata({ path: canonical, title, description, image: absoluteMediaUrl(item.thumbnailUrl), locale: locale === "bg" ? "bg_BG" : "en_GB" }) };
  }
  return {};
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, segments } = await params;
  if (!isLocale(locale)) return {};
  const path = segmentsToPath(segments);
  return getLocalizedSeo(locale, path) ? buildLocalizedMetadata(locale, path) : detailMetadata(locale, path);
}

export default async function LocalizedPublicPage({ params }: Props) {
  const { locale, segments } = await params;
  if (!isLocale(locale)) notFound();
  const path = segmentsToPath(segments);
  const localizedPath = localizePath(path, locale);
  const StaticComponent = routeComponents[path];

  if (StaticComponent) {
    const seo = getLocalizedSeo(locale, path);
    if (!seo) notFound();
    return <div lang={locale}><PublicPageStructuredData path={localizedPath} name={seo.title} description={seo.description} language={locale} homePath={`/${locale}/`} /><StaticComponent /></div>;
  }

  const eventMatch = path.match(/^\/events\/([^/]+)\/$/);
  if (eventMatch) {
    const item = await safePublicGet<EventResponse | null>(`/events/${eventMatch[1]}`, null);
    if (!item) notFound();
    const name = locale === "bg" ? item.titleBg : item.titleEn || item.titleBg;
    const description = locale === "bg" ? item.descriptionBg : item.descriptionEn || item.descriptionBg;
    return <div lang={locale}><PublicPageStructuredData path={localizedPath} name={name} description={description} language={locale} homePath={`/${locale}/`} /><JsonLd id={`localized-event-${item.id}`} data={buildEventStructuredData({ path: localizedPath, name, description, startDate: item.startAt })} /><FeedDetailClient post={eventResponseToFeedPost(item)} kind="event" /></div>;
  }

  const newsMatch = path.match(/^\/news\/([^/]+)\/$/);
  if (newsMatch) {
    const item = await safePublicGet<PostResponse | null>(`/posts/${newsMatch[1]}`, null);
    if (!item) notFound();
    const headline = locale === "bg" ? item.titleBg : item.titleEn || item.titleBg;
    const description = locale === "bg" ? item.excerptBg || item.bodyBg : item.excerptEn || item.bodyEn || item.bodyBg;
    return <div lang={locale}><PublicPageStructuredData path={localizedPath} name={headline} description={description} language={locale} homePath={`/${locale}/`} /><JsonLd id={`localized-news-${item.id}`} data={buildNewsArticleStructuredData({ path: localizedPath, headline, description, datePublished: item.publishedAt || item.createdOn })} /><FeedDetailClient post={postResponseToFeedPost(item)} kind="news" /></div>;
  }

  const danceMatch = path.match(/^\/horoteka\/([^/]+)\/$/);
  if (danceMatch) {
    const item = await safePublicGet<DanceResponse | null>(`/horoteka/${danceMatch[1]}`, null);
    if (!item) notFound();
    const name = locale === "bg" ? item.titleBg : item.titleEn || item.titleBg;
    const description = locale === "bg" ? item.descriptionBg : item.descriptionEn || item.descriptionBg;
    return <div lang={locale}><PublicPageStructuredData path={localizedPath} name={name} description={description} language={locale} homePath={`/${locale}/`} /><DanceDetailClient dance={item} /></div>;
  }

  notFound();
}
