import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { buildSocialMetadata } from "../../lib/seo";

const pageTitle = "Общи условия";
const pageDescription =
  "Общи условия за използване на сайта на ОРИСИЯ, публикуваното съдържание, събитията и външните услуги.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/terms/",
  },
  ...buildSocialMetadata({
    path: "/terms/",
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData
        path="/terms/"
        name="Общи условия"
        description={pageDescription}
      />
      {children}
    </>
  );
}
