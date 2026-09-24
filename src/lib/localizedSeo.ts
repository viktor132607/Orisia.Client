import type { Metadata } from "next";
import { getDefaultFeedPost, defaultFeedPosts } from "../components/homeFeedStore";
import { getHorotekaDance, horotekaDances } from "./horoteka";
import { type Locale, localizePath } from "./i18n";
import { buildSocialMetadata, localSeoKeywords } from "./seo";

type SeoContent = {
  title: string;
  description: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  image?: string;
};

const englishKeywords = [
  "Bulgarian folk dances Ruse",
  "Bulgarian folklore Ruse",
  "horo Ruse",
  "folk dance club Ruse",
  "folklore events Ruse",
];

const staticSeo: Record<string, Record<Locale, SeoContent>> = {
  "/": {
    bg: {
      title: "ОРИСИЯ | Български народни танци и фолклор в Русе",
      description: "ОРИСИЯ в Русе — български народни танци, фолклор, хора, репетиции, участия и събития, които пазят българската традиция жива.",
      keywords: localSeoKeywords,
    },
    en: {
      title: "ORISIA | Bulgarian folk dances and folklore in Ruse",
      description: "ORISIA in Ruse — Bulgarian folk dances, folklore, rehearsals, performances and events that keep Bulgarian traditions alive.",
      keywords: englishKeywords,
    },
  },
  "/about/": {
    bg: { title: "За нас — народни танци в Русе", description: "Научете повече за ОРИСИЯ — общност за български народни танци и фолклор в Русе, нашата мисия, лектори и място за репетиции.", keywords: localSeoKeywords },
    en: { title: "About ORISIA — Bulgarian folk dances in Ruse", description: "Learn more about ORISIA, our Bulgarian folk dance community in Ruse, our mission, instructors and rehearsal location.", keywords: englishKeywords },
  },
  "/news/": {
    bg: { title: "Новини", description: "Последни новини от ОРИСИЯ — участия, отчети, снимки, публикации, групови новини и промени в графика." },
    en: { title: "News", description: "Latest ORISIA news — performances, reports, photos, posts, group updates and schedule changes." },
  },
  "/events/": {
    bg: { title: "Фолклорни събития в Русе", description: "Предстоящи участия, празници и фолклорни събития на ОРИСИЯ в Русе — дати, програма и информация за събитията.", keywords: localSeoKeywords },
    en: { title: "Folklore events in Ruse", description: "Upcoming ORISIA performances, celebrations and folklore events in Ruse, with dates and event information.", keywords: englishKeywords },
  },
  "/calendar/": {
    bg: { title: "Календар на ОРИСИЯ — Русе", description: "Календар на ОРИСИЯ в Русе с предстоящи репетиции, участия и фолклорни вечери.", keywords: localSeoKeywords },
    en: { title: "ORISIA calendar — Ruse", description: "ORISIA calendar in Ruse with upcoming rehearsals, performances and folklore evenings.", keywords: englishKeywords },
  },
  "/gallery/": {
    bg: { title: "Галерия", description: "Галерия на ОРИСИЯ със снимки и моменти от народни танци, репетиции, сценични участия, събори и фолклорни вечери." },
    en: { title: "Gallery", description: "ORISIA gallery with moments from Bulgarian folk dances, rehearsals, stage performances, gatherings and folklore evenings." },
  },
  "/horoteka/": {
    bg: { title: "Хоротека — български хора в Русе", description: "Хоротека на ОРИСИЯ в Русе с информация за български хора, стъпки, ритми и фолклорни области.", keywords: localSeoKeywords },
    en: { title: "Dance Library — Bulgarian horo dances in Ruse", description: "ORISIA dance library in Ruse with information about Bulgarian horo dances, rhythms and folklore regions.", keywords: englishKeywords },
  },
  "/contact/": {
    bg: { title: "Контакти — ОРИСИЯ Русе", description: "Контакти с ОРИСИЯ в Русе — ул. Родина 80, Русе 7000, България. Информация за участия, събития, партньорства и общи запитвания.", keywords: localSeoKeywords },
    en: { title: "Contact ORISIA — Ruse", description: "Contact ORISIA in Ruse at 80 Rodina St. for performances, events, partnerships and general inquiries.", keywords: englishKeywords },
  },
  "/privacy/": {
    bg: { title: "Политика за поверителност", description: "Политика за поверителност на сайта на ОРИСИЯ — информация за обработването, съхранението и защитата на лични данни." },
    en: { title: "Privacy Policy", description: "ORISIA Privacy Policy with information about the processing, storage and protection of personal data." },
  },
  "/terms/": {
    bg: { title: "Общи условия", description: "Общи условия за използване на сайта на ОРИСИЯ, публикуваното съдържание, събитията и външните услуги." },
    en: { title: "Terms and Conditions", description: "Terms and conditions for using the ORISIA website, its published content, events and external services." },
  },
  "/cookies/": {
    bg: { title: "Политика за бисквитки", description: "Политика за бисквитки на ОРИСИЯ — информация за локално съхранение, технически настройки и предпочитания в браузъра." },
    en: { title: "Cookie Policy", description: "ORISIA Cookie Policy with information about browser storage, technical settings and preferences." },
  },
};

export const localizedStaticPaths = Object.keys(staticSeo).filter((path) => path !== "/");

export const localizedDetailPaths = [
  ...defaultFeedPosts.filter((post) => post.slug).map((post) => post.type === "event" ? `/events/${post.slug}/` : `/news/${post.slug}/`),
  ...horotekaDances.map((dance) => `/horoteka/${dance.slug}/`),
];

export function getLocalizedSeo(locale: Locale, path: string): SeoContent | null {
  const staticEntry = staticSeo[path]?.[locale];
  if (staticEntry) return staticEntry;

  const eventMatch = path.match(/^\/events\/([^/]+)\/$/);
  if (eventMatch) {
    const post = getDefaultFeedPost(eventMatch[1]);
    if (!post || post.type !== "event") return null;
    return {
      title: locale === "bg" ? post.titleBg : post.titleEn || post.titleBg,
      description: locale === "bg" ? post.bodyBg : post.bodyEn || post.bodyBg,
      keywords: locale === "bg" ? [post.titleBg, ...localSeoKeywords] : [post.titleEn || post.titleBg, ...englishKeywords],
      image: post.image,
    };
  }

  const newsMatch = path.match(/^\/news\/([^/]+)\/$/);
  if (newsMatch) {
    const post = getDefaultFeedPost(newsMatch[1]);
    if (!post || post.type === "event") return null;
    return {
      title: locale === "bg" ? post.titleBg : post.titleEn || post.titleBg,
      description: locale === "bg" ? post.bodyBg : post.bodyEn || post.bodyBg,
      keywords: locale === "bg" ? [post.titleBg, ...localSeoKeywords] : [post.titleEn || post.titleBg, ...englishKeywords],
      type: "article",
      publishedTime: post.date,
      image: post.image,
    };
  }

  const danceMatch = path.match(/^\/horoteka\/([^/]+)\/$/);
  if (danceMatch) {
    const dance = getHorotekaDance(danceMatch[1]);
    if (!dance) return null;
    const danceTitle = locale === "bg" ? dance.titleBg : dance.titleEn;
    const region = locale === "bg" ? dance.regionBg : dance.regionEn;
    return {
      title: locale === "bg" ? `${danceTitle} — ритъм ${dance.rhythm} и информация` : `${danceTitle} — rhythm ${dance.rhythm} and information`,
      description: locale === "bg"
        ? `${danceTitle} — ${region}, ритъм ${dance.rhythm}. Информация за хорото в Хоротеката на ОРИСИЯ в Русе.`
        : `${danceTitle} — ${region}, rhythm ${dance.rhythm}. Information from the ORISIA dance library in Ruse.`,
      keywords: locale === "bg" ? [danceTitle, `${danceTitle} Русе`, ...localSeoKeywords] : [danceTitle, `${danceTitle} Ruse`, ...englishKeywords],
      image: dance.video?.thumbnailUrl,
    };
  }

  return null;
}

export function buildLocalizedMetadata(locale: Locale, path: string): Metadata {
  const seo = getLocalizedSeo(locale, path);
  if (!seo) return {};

  const canonical = localizePath(path, locale);
  const bgPath = localizePath(path, "bg");
  const enPath = localizePath(path, "en");
  const brand = locale === "bg" ? "ОРИСИЯ" : "ORISIA";
  const absoluteTitle = path === "/" ? seo.title : `${seo.title} | ${brand}`;

  return {
    title: { absolute: absoluteTitle },
    description: seo.description,
    ...(seo.keywords ? { keywords: seo.keywords } : {}),
    alternates: {
      canonical,
      languages: {
        bg: bgPath,
        en: enPath,
        "x-default": path,
      },
    },
    other: {
      "content-language": locale,
    },
    ...buildSocialMetadata({
      path: canonical,
      title: absoluteTitle,
      description: seo.description,
      image: seo.image,
      type: seo.type,
      publishedTime: seo.publishedTime,
      locale: locale === "bg" ? "bg_BG" : "en_GB",
      socialSiteName: brand,
    }),
  };
}
