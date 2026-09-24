import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Новини",
  description:
    "Последни новини от ОРИСИЯ — участия, отчети, снимки, публикации, групови новини и промени в графика.",
};

export default function NewsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
