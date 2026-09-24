import { buildLanguageAlternates } from "../../lib/i18n";
import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { buildSocialMetadata, localSeoKeywords } from "../../lib/seo";

const pageTitle = "Хоротека — български хора в Русе";
const pageDescription =
  "Хоротека на ОРИСИЯ в Русе с информация за български хора, стъпки, ритми и фолклорни области — право, дунавско, еленино, пайдушко и още.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: localSeoKeywords,
  alternates: buildLanguageAlternates("/horoteka/"),
  ...buildSocialMetadata({
    path: "/horoteka/",
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function HorotekaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData
        path="/horoteka/"
        name="Хоротека"
        description={pageDescription}
      />
      {children}
    </>
  );
}
