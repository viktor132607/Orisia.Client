import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";

const pageDescription =
  "Последни новини от ОРИСИЯ — участия, отчети, снимки, публикации, групови новини и промени в графика.";

export const metadata: Metadata = {
  title: "Новини",
  description: pageDescription,
  alternates: {
    canonical: "/news/",
  },
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData path="/news/" name="Новини" description={pageDescription} />
      {children}
    </>
  );
}
