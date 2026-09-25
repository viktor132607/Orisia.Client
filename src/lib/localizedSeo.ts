import type { Metadata } from "next";
import { type Locale, localizePath } from "./i18n";
import { buildSocialMetadata, localSeoKeywords } from "./seo";

export type SeoContent = {
  title: string;
  description: string;
  keywords?: string[];
  type?: "website" | "article";
  publishedTime?: string;
  image?: string;
};

export const englishKeywords = [
  "Bulgarian folk dances Ruse",
  "Bulgarian folklore Ruse",
  "horo Ruse",
  "folk dance club Ruse",
  "folklore events Ruse",
];

const staticSeo: Record<string, Record<Locale, SeoContent>> = {
  "/": {
    bg: { title: "ОРИСИЯ | Български народни танци и фолклор в Русе", description: "ОРИСИЯ в Русе — български народни танци, фолклор, хора, репетиции, участия и събития.", keywords: localSeoKeywords },
    en: { title: "ORISIA | Bulgarian folk dances and folklore in Ruse", description: "ORISIA in Ruse — Bulgarian folk dances, folklore, rehearsals, performances and events.", keywords: englishKeywords },
  },
  "/about/": {
    bg: { title: "За нас — народни танци в Русе", description: "Научете повече за ОРИСИЯ — общност за български народни танци и фолклор в Русе.", keywords: localSeoKeywords },
    en: { title: "About ORISIA — Bulgarian folk dances in Ruse", description: "Learn more about ORISIA, our Bulgarian folk dance community in Ruse.", keywords: englishKeywords },
  },
  "/news/": { bg: { title: "Новини", description: "Последни новини от ОРИСИЯ." }, en: { title: "News", description: "Latest ORISIA news." } },
  "/events/": { bg: { title: "Фолклорни събития в Русе", description: "Предстоящи участия и фолклорни събития на ОРИСИЯ.", keywords: localSeoKeywords }, en: { title: "Folklore events in Ruse", description: "Upcoming ORISIA performances and folklore events.", keywords: englishKeywords } },
  "/calendar/": { bg: { title: "Календар на ОРИСИЯ — Русе", description: "Календар с репетиции, участия и събития." }, en: { title: "ORISIA calendar — Ruse", description: "Calendar with rehearsals, performances and events." } },
  "/gallery/": { bg: { title: "Галерия", description: "Галерия на ОРИСИЯ." }, en: { title: "Gallery", description: "ORISIA gallery." } },
  "/horoteka/": { bg: { title: "Хоротека — български хора в Русе", description: "Хоротека с български хора, ритми и области." }, en: { title: "Dance Library — Bulgarian horo dances in Ruse", description: "Dance library with Bulgarian horo dances and rhythms." } },
  "/contact/": { bg: { title: "Контакти — ОРИСИЯ Русе", description: "Контакти с ОРИСИЯ в Русе." }, en: { title: "Contact ORISIA — Ruse", description: "Contact ORISIA in Ruse." } },
  "/privacy/": { bg: { title: "Политика за поверителност", description: "Политика за поверителност на ОРИСИЯ." }, en: { title: "Privacy Policy", description: "ORISIA Privacy Policy." } },
  "/terms/": { bg: { title: "Общи условия", description: "Общи условия за сайта на ОРИСИЯ." }, en: { title: "Terms and Conditions", description: "ORISIA website terms and conditions." } },
  "/cookies/": { bg: { title: "Политика за бисквитки", description: "Политика за бисквитки на ОРИСИЯ." }, en: { title: "Cookie Policy", description: "ORISIA Cookie Policy." } },
};

export const localizedStaticPaths = Object.keys(staticSeo).filter((path) => path !== "/");

export function getLocalizedSeo(locale: Locale, path: string): SeoContent | null {
  return staticSeo[path]?.[locale] ?? null;
}

export function buildLocalizedMetadata(locale: Locale, path: string): Metadata {
  const seo = getLocalizedSeo(locale, path);
  if (!seo) return {};
  const canonical = localizePath(path, locale);
  const brand = locale === "bg" ? "ОРИСИЯ" : "ORISIA";
  const absoluteTitle = path === "/" ? seo.title : `${seo.title} | ${brand}`;
  return {
    title: { absolute: absoluteTitle },
    description: seo.description,
    ...(seo.keywords ? { keywords: seo.keywords } : {}),
    alternates: { canonical, languages: { bg: localizePath(path, "bg"), en: localizePath(path, "en"), "x-default": path } },
    other: { "content-language": locale },
    ...buildSocialMetadata({ path: canonical, title: absoluteTitle, description: seo.description, image: seo.image, type: seo.type, publishedTime: seo.publishedTime, locale: locale === "bg" ? "bg_BG" : "en_GB", socialSiteName: brand }),
  };
}
