import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Хоротека",
  description:
    "Хоротека на ОРИСИЯ с информация за български хора, стъпки, ритми и фолклорни области — право, дунавско, еленино, пайдушко и още.",
};

export default function HorotekaLayout({ children }: { children: React.ReactNode }) {
  return children;
}
