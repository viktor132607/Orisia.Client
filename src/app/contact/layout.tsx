import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";

const pageDescription =
  "Контакти с ОРИСИЯ в Русе — адрес: ул. Родина 80. Информация за участия, събития, партньорства и общи запитвания.";

export const metadata: Metadata = {
  title: "Контакти",
  description: pageDescription,
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
