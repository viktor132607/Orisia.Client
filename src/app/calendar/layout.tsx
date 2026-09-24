import { buildLanguageAlternates } from "../../lib/i18n";
import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { buildSocialMetadata, localSeoKeywords } from "../../lib/seo";

const pageTitle = "Календар на ОРИСИЯ — Русе";
const pageDescription =
  "Календар на ОРИСИЯ в Русе с предстоящи репетиции, участия и фолклорни вечери.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: localSeoKeywords,
  alternates: buildLanguageAlternates("/calendar/"),
  ...buildSocialMetadata({
    path: "/calendar/",
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData
        path="/calendar/"
        name="Календар"
        description={pageDescription}
      />
      {children}
    </>
  );
}
