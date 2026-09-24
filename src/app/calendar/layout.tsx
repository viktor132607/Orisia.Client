import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { localSeoKeywords } from "../../lib/seo";

const pageDescription =
  "Календар на ОРИСИЯ в Русе с предстоящи репетиции, участия и фолклорни вечери.";

export const metadata: Metadata = {
  title: "Календар на ОРИСИЯ — Русе",
  description: pageDescription,
  keywords: localSeoKeywords,
  alternates: {
    canonical: "/calendar/",
  },
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData path="/calendar/" name="Календар" description={pageDescription} />
      {children}
    </>
  );
}
