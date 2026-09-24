import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Контакти",
  description:
    "Контакти с ОРИСИЯ в Русе — адрес: ул. Родина 80. Информация за участия, събития, партньорства и общи запитвания.",
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
