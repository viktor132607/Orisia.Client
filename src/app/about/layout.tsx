import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { buildSocialMetadata, localSeoKeywords } from "../../lib/seo";

const pageTitle = "За нас — народни танци в Русе";
const pageDescription =
  "Научете повече за ОРИСИЯ — общност за български народни танци и фолклор в Русе, нашата мисия, лектори и място за репетиции.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: localSeoKeywords,
  alternates: {
    canonical: "/about/",
  },
  ...buildSocialMetadata({
    path: "/about/",
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData
        path="/about/"
        name="За нас"
        description={pageDescription}
      />
      {children}
    </>
  );
}
