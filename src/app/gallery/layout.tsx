import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { buildSocialMetadata } from "../../lib/seo";

const pageTitle = "Галерия";
const pageDescription =
  "Галерия на ОРИСИЯ със снимки и моменти от народни танци, репетиции, сценични участия, събори и фолклорни вечери.";

export const metadata: Metadata = {
  title: pageTitle,
  description: pageDescription,
  alternates: {
    canonical: "/gallery/",
  },
  ...buildSocialMetadata({
    path: "/gallery/",
    title: pageTitle,
    description: pageDescription,
  }),
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData
        path="/gallery/"
        name="Галерия"
        description={pageDescription}
      />
      {children}
    </>
  );
}
