import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Галерия",
  description:
    "Галерия на ОРИСИЯ със снимки и моменти от народни танци, репетиции, сценични участия, събори и фолклорни вечери.",
  alternates: {
    canonical: "/gallery/",
  },
};

export default function GalleryLayout({ children }: { children: React.ReactNode }) {
  return children;
}
