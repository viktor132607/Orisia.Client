import type { Metadata } from "next";
import HomeGate from "../components/HomeGate";
import PublicPageStructuredData from "../components/PublicPageStructuredData";
import {
  defaultDescription,
  defaultTitle,
  localSeoKeywords,
} from "../lib/seo";

export const metadata: Metadata = {
  title: {
    absolute: defaultTitle,
  },
  description: defaultDescription,
  keywords: localSeoKeywords,
  alternates: {
    canonical: "/",
  },
};

export default function Page() {
  return (
    <>
      <PublicPageStructuredData
        path="/"
        name={defaultTitle}
        description={defaultDescription}
      />
      <HomeGate />
    </>
  );
}
