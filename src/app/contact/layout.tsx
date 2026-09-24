import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { localSeoKeywords } from "../../lib/seo";

const pageDescription =
  "Контакти с ОРИСИЯ в Русе — ул. Родина 80, Русе 7000, България. Информация за участия, събития, партньорства и общи запитвания.";

export const metadata: Metadata = {
  title: "Контакти — ОРИСИЯ Русе",
  description: pageDescription,
  keywords: localSeoKeywords,
  alternates: {
    canonical: "/contact/",
  },
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData path="/contact/" name="Контакти" description={pageDescription} />
      {children}
    </>
  );
}
