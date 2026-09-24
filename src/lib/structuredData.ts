import { defaultDescription, siteName, siteUrl } from "./seo";

const organizationId = new URL("/#organization", siteUrl).toString();
const websiteId = new URL("/#website", siteUrl).toString();

function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
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
}: {
  path: string;
  name: string;
  description: string;
}) {
  const url = absoluteUrl(path);

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name,
    description,
    inLanguage: "bg",
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
}: {
  path: string;
  name: string;
}) {
  const url = absoluteUrl(path);
  const isHome = path === "/";

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
            item: absoluteUrl("/"),
          },
        ]
      : [
          {
            "@type": "ListItem",
            position: 1,
            name: siteName,
            item: absoluteUrl("/"),
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

export function buildEventStructuredData({
  name,
  description,
  startDate,
  image,
}: {
  name: string;
  description: string;
  startDate: string;
  image?: string;
}) {
  const imageUrl = image
    ? image.startsWith("http://") || image.startsWith("https://")
      ? image
      : absoluteUrl(image)
    : undefined;

  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name,
    description,
    startDate,
    eventStatus: "https://schema.org/EventScheduled",
    url: absoluteUrl("/events/"),
    ...(imageUrl ? { image: [imageUrl] } : {}),
    organizer: {
      "@id": organizationId,
    },
  };
}
