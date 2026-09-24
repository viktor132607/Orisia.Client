import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://orisia-client.onrender.com";

function resolveSiteUrl() {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL?.trim();

  try {
    return new URL(configuredUrl || FALLBACK_SITE_URL);
  } catch {
    return new URL(FALLBACK_SITE_URL);
  }
}

export const siteUrl = resolveSiteUrl();

export const siteName = "ОРИСИЯ";
export const localSeoKeywords = [
  "народни танци Русе",
  "български народни танци Русе",
  "хоро Русе",
  "народни хора Русе",
  "фолклор Русе",
  "български фолклор Русе",
  "танцов клуб Русе",
  "фолклорни събития Русе",
];

export const defaultTitle = "ОРИСИЯ | Български народни танци и фолклор в Русе";
export const defaultDescription =
  "ОРИСИЯ в Русе — български народни танци, фолклор, хора, репетиции, участия и събития, които пазят българската традиция жива.";

export const defaultMetadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: siteName,
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: localSeoKeywords,
  openGraph: {
    type: "website",
    locale: "bg_BG",
    url: siteUrl,
    siteName,
    title: defaultTitle,
    description: defaultDescription,
    images: [
      {
        url: "/orisia-logo.jpg",
        alt: "ОРИСИЯ",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/orisia-logo.jpg"],
  },
  icons: {
    icon: "/orisia-logo.jpg",
    shortcut: "/orisia-logo.jpg",
    apple: "/orisia-logo.jpg",
  },
};
