import { buildLanguageAlternates } from "../../lib/i18n";
import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { buildSocialMetadata, localSeoKeywords } from "../../lib/seo";

const pageTitle = "Групи и график — ОРИСИЯ Русе";
const pageDescription =
  "Танцови групи на ОРИСИЯ в Русе със седмичен график, часове и място за репетиции.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  keywords: localSeoKeywords,
  alternates: buildLanguageAlternates("/groups/"),
  ...buildSocialMetadata({
    path: "/groups/",
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function GroupsLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData
        path="/groups/"
        name="Групи и график"
        description={pageDescription}
      />
      {children}
    </>
  );
}
