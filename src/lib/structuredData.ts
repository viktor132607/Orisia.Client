import { defaultDescription, siteName, siteUrl } from "./seo";

const organizationId = new URL("/#organization", siteUrl).toString();
const websiteId = new URL("/#website", siteUrl).toString();

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

function normalizeUrl(value: string) {
  return value.startsWith("http://") || value.startsWith("https://")
    ? value
    : absoluteUrl(value);
}

const ruseAddress = {
  "@type": "PostalAddress",
  streetAddress: "ул. Родина 80",
  addressLocality: "Русе",
  postalCode: "7000",
  addressCountry: "BG",
};

export const organizationStructuredData = {
  "@context": "https://schema.org",
  "@type": "PerformingGroup",
  "@id": organizationId,
  name: siteName,
  url: absoluteUrl("/"),
  logo: absoluteUrl("/orisia-logo.jpg"),
  image: absoluteUrl("/orisia-logo.jpg"),
  description: defaultDescription,
  address: ruseAddress,
  location: {
    "@type": "Place",
    name: "ОРИСИЯ — Русе",
    address: ruseAddress,
  },
  areaServed: {
    "@type": "City",
    name: "Русе",
  },
  knowsAbout: [
    "Български народни танци",
    "Български фолклор",
    "Хора",
  ],
};

export const websiteStructuredData = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: absoluteUrl("/"),
  name: siteName,
  description: defaultDescription,
  inLanguage: ["bg", "en"],
  publisher: {
    "@id": organizationId,
  },
};

export function buildWebPageStructuredData({
  path,
  name,
  description,
  language = "bg",
}: {
  path: string;
  name: string;
  description: string;
  language?: "bg" | "en";
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: language,
    isPartOf: {
      "@id": websiteId,
    },
    about: {
      "@id": organizationId,
    },
    breadcrumb: {
      "@id": `${url}#breadcrumb`,
    },
  };
}

export function buildBreadcrumbStructuredData({
  path,
  name,
  homePath = "/",
}: {
  path: string;
  name: string;
  homePath?: string;
}) {
  const url = absoluteUrl(path);
  const isHome = path === homePath;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: isHome
      ? [
          {
            "@type": "ListItem",
            position: 1,
            name: siteName,
            item: absoluteUrl(homePath),
          },
        ]
      : [
          {
            "@type": "ListItem",
            position: 1,
            name: siteName,
            item: absoluteUrl(homePath),
          },
          {
            "@type": "ListItem",
            position: 2,
            name,
            item: url,
          },
        ],
  };
}

export function buildSectionItemBreadcrumbStructuredData({
  sectionPath,
  sectionName,
  path,
  name,
}: {
  sectionPath: string;
  sectionName: string;
  path: string;
  name: string;
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": `${url}#breadcrumb`,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: siteName,
        item: absoluteUrl("/"),
      },
      {
        "@type": "ListItem",
        position: 2,
        name: sectionName,
        item: absoluteUrl(sectionPath),
      },
      {
        "@type": "ListItem",
        position: 3,
        name,
        item: url,
      },
    ],
  };
}

export function buildHorotekaDanceBreadcrumbStructuredData({
  path,
  name,
}: {
  path: string;
  name: string;
}) {
  return buildSectionItemBreadcrumbStructuredData({
    sectionPath: "/horoteka/",
    sectionName: "Хоротека",
    path,
    name,
  });
}

export function buildVideoObjectStructuredData({
  name,
  description,
  thumbnailUrl,
  uploadDate,
  contentUrl,
  embedUrl,
  duration,
}: {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  contentUrl?: string;
  embedUrl?: string;
  duration?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "VideoObject",
    name,
    description,
    thumbnailUrl: [normalizeUrl(thumbnailUrl)],
    uploadDate,
    ...(contentUrl ? { contentUrl: normalizeUrl(contentUrl) } : {}),
    ...(embedUrl ? { embedUrl: normalizeUrl(embedUrl) } : {}),
    ...(duration ? { duration } : {}),
    publisher: {
      "@id": organizationId,
    },
  };
}

export function buildNewsArticleStructuredData({
  path,
  headline,
  description,
  datePublished,
  image,
}: {
  path: string;
  headline: string;
  description: string;
  datePublished: string;
  image?: string;
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "NewsArticle",
    "@id": `${url}#article`,
    headline,
    description,
    datePublished,
    mainEntityOfPage: url,
    ...(image ? { image: [normalizeUrl(image)] } : {}),
    author: {
      "@id": organizationId,
    },
    publisher: {
      "@id": organizationId,
    },
  };
}

export function buildEventStructuredData({
  name,
  description,
  startDate,
  image,
  path = "/events/",
}: {
  name: string;
  description: string;
  startDate: string;
  image?: string;
  path?: string;
}) {
  const imageUrl = image ? normalizeUrl(image) : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate,
    eventStatus: "https://schema.org/EventScheduled",
    url: absoluteUrl(path),
    ...(imageUrl ? { image: [imageUrl] } : {}),
    organizer: {
      "@id": organizationId,
    },
  };
}
