import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика за поверителност",
  description:
    "Политика за поверителност на сайта на ОРИСИЯ — информация за обработването, съхранението и защитата на лични данни.",
  alternates: {
    canonical: "/privacy/",
  },
};

export default function PrivacyLayout({ children }: { children: React.ReactNode }) {
  return children;
}
