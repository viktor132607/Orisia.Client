import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "За нас",
  description:
    "Научете повече за ОРИСИЯ — общност за български народни танци и фолклор в Русе, нашата мисия, лектори и място за репетиции.",
  alternates: {
    canonical: "/about/",
  },
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
