import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Общи условия",
  description:
    "Общи условия за използване на сайта на ОРИСИЯ, публикуваното съдържание, събитията и външните услуги.",
  alternates: {
    canonical: "/terms/",
  },
};

export default function TermsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
