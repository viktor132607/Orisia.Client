import type { Metadata } from "next";

const FALLBACK_SITE_URL = "https://orisia-client-zgwt.onrender.com";

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
export const defaultSocialImage = "/orisia-logo.jpg";
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

export function buildSocialMetadata({
  path,
  title,
  description,
  image,
  type = "website",
  publishedTime,
}: {
  path: string;
  title: string;
  description: string;
  image?: string;
  type?: "website" | "article";
  publishedTime?: string;
}): Pick<Metadata, "openGraph" | "twitter"> {
  const socialImage = image || defaultSocialImage;

  const openGraph: NonNullable<Metadata["openGraph"]> =
    type === "article"
      ? {
          type: "article",
          locale: "bg_BG",
          url: path,
          siteName,
          title,
          description,
          ...(publishedTime ? { publishedTime } : {}),
          images: [{ url: socialImage, alt: title }],
        }
      : {
          type: "website",
          locale: "bg_BG",
          url: path,
          siteName,
          title,
          description,
          images: [{ url: socialImage, alt: title }],
        };

  return {
    openGraph,
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [socialImage],
    },
  };
}

export const defaultMetadata: Metadata = {
  metadataBase: siteUrl,
  applicationName: siteName,
  title: {
    default: defaultTitle,
    template: `%s | ${siteName}`,
  },
  description: defaultDescription,
  keywords: localSeoKeywords,
  ...buildSocialMetadata({
    path: "/",
    title: defaultTitle,
    description: defaultDescription,
  }),
  icons: {
    icon: "/orisia-logo.jpg",
    shortcut: "/orisia-logo.jpg",
    apple: "/orisia-logo.jpg",
  },
};
