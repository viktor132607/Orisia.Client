import { buildLanguageAlternates } from "../../lib/i18n";
import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { buildSocialMetadata } from "../../lib/seo";

const pageTitle = "Политика за бисквитки";
const pageDescription =
  "Политика за бисквитки на ОРИСИЯ — информация за локално съхранение, технически настройки и предпочитания в браузъра.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: buildLanguageAlternates("/cookies/"),
  ...buildSocialMetadata({
    path: "/cookies/",
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData
        path="/cookies/"
        name="Политика за бисквитки"
        description={pageDescription}
      />
      {children}
    </>
  );
}
