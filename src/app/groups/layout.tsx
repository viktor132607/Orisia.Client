import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Групи и график | ОРИСИЯ",
  description: "Танцови групи на ОРИСИЯ, седмичен график и часове за репетиции.",
};

export default function GroupsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
