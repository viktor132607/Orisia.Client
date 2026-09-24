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
import { getDefaultFeedPost } from "../../../components/homeFeedStore";
import { getHorotekaDance } from "../../../lib/horoteka";
import { isLocale, locales, localizePath } from "../../../lib/i18n";
import {
  buildLocalizedMetadata,
  getLocalizedSeo,
  localizedDetailPaths,
  localizedStaticPaths,
} from "../../../lib/localizedSeo";
import {
  buildEventStructuredData,
  buildNewsArticleStructuredData,
  buildVideoObjectStructuredData,
} from "../../../lib/structuredData";

type Props = {
  params: Promise<{ locale: string; segments: string[] }>;
};

export const dynamicParams = false;

const routeComponents: Record<string, React.ComponentType> = {
  "/about/": AboutPage,
  "/calendar/": CalendarPage,
  "/contact/": ContactPage,
  "/cookies/": CookiesPage,
  "/events/": EventsPage,
  "/gallery/": GalleryPage,
  "/horoteka/": HorotekaPage,
  "/news/": NewsPage,
  "/privacy/": PrivacyPage,
  "/terms/": TermsPage,
};

function segmentsToPath(segments: string[]) {
  return `/${segments.join("/")}/`;
}

export function generateStaticParams() {
  const paths = [...localizedStaticPaths, ...localizedDetailPaths];
  return locales.flatMap((locale) =>
    paths.map((path) => ({
      locale,
      segments: path.split("/").filter(Boolean),
    }))
  );
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, segments } = await params;
  if (!isLocale(locale)) return {};
  return buildLocalizedMetadata(locale, segmentsToPath(segments));
}

export default async function LocalizedPublicPage({ params }: Props) {
  const { locale, segments } = await params;
  if (!isLocale(locale)) notFound();

  const path = segmentsToPath(segments);
  const seo = getLocalizedSeo(locale, path);
  if (!seo) notFound();

  const localizedPath = localizePath(path, locale);
  const StaticComponent = routeComponents[path];

  if (StaticComponent) {
    return (
      <div lang={locale}>
        <PublicPageStructuredData
          path={localizedPath}
          name={seo.title}
          description={seo.description}
          language={locale}
          homePath={`/${locale}/`}
        />
        <StaticComponent />
      </div>
    );
  }

  const eventMatch = path.match(/^\/events\/([^/]+)\/$/);
  if (eventMatch) {
    const post = getDefaultFeedPost(eventMatch[1]);
    if (!post || post.type !== "event") notFound();
    const name = locale === "bg" ? post.titleBg : post.titleEn || post.titleBg;
    const description = locale === "bg" ? post.bodyBg : post.bodyEn || post.bodyBg;
    return (
      <div lang={locale}>
        <PublicPageStructuredData path={localizedPath} name={name} description={description} language={locale} homePath={`/${locale}/`} />
        <JsonLd
          id={`localized-event-${post.id}-structured-data`}
          data={buildEventStructuredData({ path: localizedPath, name, description, startDate: post.date, image: post.image })}
        />
        <FeedDetailClient post={post} kind="event" />
      </div>
    );
  }

  const newsMatch = path.match(/^\/news\/([^/]+)\/$/);
  if (newsMatch) {
    const post = getDefaultFeedPost(newsMatch[1]);
    if (!post || post.type === "event") notFound();
    const headline = locale === "bg" ? post.titleBg : post.titleEn || post.titleBg;
    const description = locale === "bg" ? post.bodyBg : post.bodyEn || post.bodyBg;
    return (
      <div lang={locale}>
        <PublicPageStructuredData path={localizedPath} name={headline} description={description} language={locale} homePath={`/${locale}/`} />
        <JsonLd
          id={`localized-news-${post.id}-structured-data`}
          data={buildNewsArticleStructuredData({ path: localizedPath, headline, description, datePublished: post.date, image: post.image })}
        />
        <FeedDetailClient post={post} kind="news" />
      </div>
    );
  }

  const danceMatch = path.match(/^\/horoteka\/([^/]+)\/$/);
  if (danceMatch) {
    const dance = getHorotekaDance(danceMatch[1]);
    if (!dance) notFound();
    const name = locale === "bg" ? dance.titleBg : dance.titleEn;
    const description = locale === "bg" ? dance.descriptionBg : dance.descriptionEn;
    const videoData = dance.video
      ? buildVideoObjectStructuredData({ name: `${name} — ORISIA`, description, ...dance.video })
      : null;
    return (
      <div lang={locale}>
        <PublicPageStructuredData path={localizedPath} name={name} description={description} language={locale} homePath={`/${locale}/`} />
        {videoData && <JsonLd id={`localized-${dance.slug}-video-structured-data`} data={videoData} />}
        <DanceDetailClient dance={dance} />
      </div>
    );
  }

  notFound();
}
