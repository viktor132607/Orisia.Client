import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";

const pageDescription =
  "Политика за поверителност на сайта на ОРИСИЯ — информация за обработването, съхранението и защитата на лични данни.";

export const metadata: Metadata = {
  title: "Политика за поверителност",
  description: pageDescription,
  alternates: {
    canonical: "/privacy/",
  },
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
