import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { buildSocialMetadata } from "../../lib/seo";

const pageTitle = "Новини";
const pageDescription =
  "Последни новини от ОРИСИЯ — участия, отчети, снимки, публикации, групови новини и промени в графика.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/news/",
  },
  ...buildSocialMetadata({
    path: "/news/",
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData
        path="/news/"
        name="Новини"
        description={pageDescription}
      />
      {children}
    </>
  );
}
