import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";

const pageDescription =
  "Галерия на ОРИСИЯ със снимки и моменти от народни танци, репетиции, сценични участия, събори и фолклорни вечери.";

export const metadata: Metadata = {
  title: "Галерия",
  description: pageDescription,
  alternates: {
    canonical: "/gallery/",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData path="/gallery/" name="Галерия" description={pageDescription} />
      {children}
    </>
  );
}
