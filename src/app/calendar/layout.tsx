import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Календар",
  description:
    "Календар на ОРИСИЯ с предстоящи репетиции, участия и фолклорни вечери в Русе.",
  alternates: {
    canonical: "/calendar/",
  },
};

export default function CalendarLayout({ children }: { children: React.ReactNode }) {
  return children;
}
