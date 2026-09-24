import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { buildSocialMetadata } from "../../lib/seo";

const pageTitle = "Политика за поверителност";
const pageDescription =
  "Политика за поверителност на сайта на ОРИСИЯ — информация за обработването, съхранението и защитата на лични данни.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/privacy/",
  },
  ...buildSocialMetadata({
    path: "/privacy/",
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData
        path="/privacy/"
        name="Политика за поверителност"
        description={pageDescription}
      />
      {children}
    </>
  );
}
