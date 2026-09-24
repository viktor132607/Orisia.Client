import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Събития",
  description:
    "Предстоящи участия, празници и фолклорни събития на ОРИСИЯ в Русе — дати, програма и информация за събитията.",
  alternates: {
    canonical: "/events/",
  },
};

export default function EventsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
