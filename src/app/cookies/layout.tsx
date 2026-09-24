import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";

const pageDescription =
  "Политика за бисквитки на ОРИСИЯ — информация за локално съхранение, технически настройки и предпочитания в браузъра.";

export const metadata: Metadata = {
  title: "Политика за бисквитки",
  description: pageDescription,
  alternates: {
    canonical: "/cookies/",
  },
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
