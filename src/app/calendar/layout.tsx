import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";

const pageDescription =
  "Календар на ОРИСИЯ с предстоящи репетиции, участия и фолклорни вечери в Русе.";

export const metadata: Metadata = {
  title: "Календар",
  description: pageDescription,
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
