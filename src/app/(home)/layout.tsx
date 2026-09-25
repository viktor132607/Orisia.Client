import type { Metadata } from "next";
import {
  buildSocialMetadata,
  defaultDescription,
  defaultTitle,
  localSeoKeywords,
} from "../../lib/seo";

export const metadata: Metadata = {
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

export default function HomeLayout({ children }: { children: React.ReactNode }) {
  return children;
}
