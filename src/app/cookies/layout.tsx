import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Политика за бисквитки",
  description:
    "Политика за бисквитки на ОРИСИЯ — информация за локално съхранение, технически настройки и предпочитания в браузъра.",
  alternates: {
    canonical: "/cookies/",
  },
};

export default function CookiesLayout({ children }: { children: React.ReactNode }) {
  return children;
}
