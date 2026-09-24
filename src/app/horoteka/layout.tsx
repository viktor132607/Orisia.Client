import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";

const pageDescription =
  "Хоротека на ОРИСИЯ с информация за български хора, стъпки, ритми и фолклорни области — право, дунавско, еленино, пайдушко и още.";

export const metadata: Metadata = {
  title: "Хоротека",
  description: pageDescription,
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
