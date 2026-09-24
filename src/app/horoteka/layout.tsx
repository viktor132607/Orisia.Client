import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { localSeoKeywords } from "../../lib/seo";

const pageDescription =
  "Хоротека на ОРИСИЯ в Русе с информация за български хора, стъпки, ритми и фолклорни области — право, дунавско, еленино, пайдушко и още.";

export const metadata: Metadata = {
  title: "Хоротека — български хора в Русе",
  description: pageDescription,
  keywords: localSeoKeywords,
  alternates: {
    canonical: "/horoteka/",
  },
};

export default function HorotekaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData path="/horoteka/" name="Хоротека" description={pageDescription} />
      {children}
    </>
  );
}
