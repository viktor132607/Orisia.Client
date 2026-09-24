import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";

const pageDescription =
  "Общи условия за използване на сайта на ОРИСИЯ, публикуваното съдържание, събитията и външните услуги.";

export const metadata: Metadata = {
  title: "Общи условия",
  description: pageDescription,
  alternates: {
    canonical: "/terms/",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData path="/terms/" name="Общи условия" description={pageDescription} />
      {children}
    </>
  );
}
