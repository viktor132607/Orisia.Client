import type { Metadata } from "next";
import HomeGate from "../components/HomeGate";
import PublicPageStructuredData from "../components/PublicPageStructuredData";
import {
  buildSocialMetadata,
  defaultDescription,
  defaultTitle,
  localSeoKeywords,
  siteUrl,
} from "../lib/seo";

export function generateMetadata(): Metadata {
  return {
  title: {
    absolute: defaultTitle,
  },
  description: defaultDescription,
  keywords: localSeoKeywords,
  alternates: {
    canonical: "/",
    languages: {
      bg: "/bg/",
      en: "/en/",
      "x-default": "/",
    },
  },
  ...buildSocialMetadata({
    path: "/",
    title: defaultTitle,
    description: defaultDescription,
  }),
  };
}

export default function Page() {
  return (
    <>
      <link rel="alternate" hrefLang="bg" href={new URL("/bg/", siteUrl).toString()} />
      <link rel="alternate" hrefLang="en" href={new URL("/en/", siteUrl).toString()} />
      <link rel="alternate" hrefLang="x-default" href={new URL("/", siteUrl).toString()} />
      <PublicPageStructuredData
        path="/"
        name={defaultTitle}
        description={defaultDescription}
      />
      <HomeGate />
    </>
  );
}
