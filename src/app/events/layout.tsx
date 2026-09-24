import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";

const pageDescription =
  "Предстоящи участия, празници и фолклорни събития на ОРИСИЯ в Русе — дати, програма и информация за събитията.";

export const metadata: Metadata = {
  title: "Събития",
  description: pageDescription,
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
