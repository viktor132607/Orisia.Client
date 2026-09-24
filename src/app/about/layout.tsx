import type { Metadata } from "next";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";

const pageDescription =
  "Научете повече за ОРИСИЯ — общност за български народни танци и фолклор в Русе, нашата мисия, лектори и място за репетиции.";

export const metadata: Metadata = {
  title: "За нас",
  description: pageDescription,
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PublicPageStructuredData path="/about/" name="За нас" description={pageDescription} />
      {children}
    </>
  );
}
