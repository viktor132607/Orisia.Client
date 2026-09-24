import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { buildSocialMetadata, localSeoKeywords } from "../../lib/seo";

const pageTitle = "Фолклорни събития в Русе";
const pageDescription =
  "Предстоящи участия, празници и фолклорни събития на ОРИСИЯ в Русе — дати, програма и информация за събитията.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: localSeoKeywords,
  alternates: {
    canonical: "/events/",
  },
  ...buildSocialMetadata({
    path: "/events/",
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData
        path="/events/"
        name="Събития"
        description={pageDescription}
      />
      {children}
    </>
  );
}
