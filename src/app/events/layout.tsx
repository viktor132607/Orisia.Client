import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { localSeoKeywords } from "../../lib/seo";

const pageDescription =
  "Предстоящи участия, празници и фолклорни събития на ОРИСИЯ в Русе — дати, програма и информация за събитията.";

export const metadata: Metadata = {
  title: "Фолклорни събития в Русе",
  description: pageDescription,
  keywords: localSeoKeywords,
  alternates: {
    canonical: "/events/",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData path="/events/" name="Събития" description={pageDescription} />
      {children}
    </>
  );
}
