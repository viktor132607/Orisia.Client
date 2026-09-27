"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { api } from "../lib/api";
import useLanguage from "./useLanguage";

const sections = [
  { href: "/admin/", bg: "Табло", en: "Dashboard", exact: true },
  { href: "/admin/home/", bg: "Публикации", en: "Posts" },
  { href: "/admin/events/", bg: "Събития", en: "Events" },
  { href: "/admin/groups/", bg: "Групи", en: "Groups" },
  { href: "/admin/horoteka/", bg: "Хоротека", en: "Dance Library" },
  { href: "/admin/gallery/", bg: "Галерия", en: "Gallery" },
  { href: "/admin/media/", bg: "Медия", en: "Media" },
  { href: "/admin/reviews/", bg: "Отзиви", en: "Reviews" },
  { href: "/admin/messages/", bg: "Запитвания", en: "Inquiries" },
  { href: "/admin/users/", bg: "Потребители", en: "Users" },
  { href: "/admin/database/", bg: "Архив на базата", en: "Database backup" },
];

export default function AdminMenu() {
  const pathname = usePathname() ?? "/admin/";
  const router = useRouter();
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const isBg = useLanguage() === "bg";

  async function logout() {
    try {
      await api.auth.logout();
    } finally {
      router.replace("/adminlogin/");
    }
  }

  return (
    <div className="sticky top-20 z-40 border-b border-orisia-line bg-[#e4d2b8]">
      <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-3 lg:flex-row lg:items-center">
        <span className="font-sans text-[10px] font-black uppercase tracking-[.18em] text-orisia-goldDark">{isBg ? "АДМИН ПАНЕЛ" : "ADMIN PANEL"}</span>
        <nav className="flex flex-1 items-center gap-2 overflow-x-auto lg:justify-end" aria-label={isBg ? "Администрация" : "Administration"}>
          {sections.map((section) => {
            const active = section.exact ? normalized === section.href : normalized.startsWith(section.href);
            return <Link key={section.href} href={section.href} className={`flex-none border px-3 py-2 font-sans text-[11px] font-bold uppercase ${active ? "border-orisia-goldDark bg-orisia-gold text-white" : "border-transparent text-[#5f4532]"}`}>{isBg ? section.bg : section.en}</Link>;
          })}
          <Link href="/account/" className="flex-none border border-transparent px-3 py-2 font-sans text-[11px] font-bold uppercase text-[#5f4532]">{isBg ? "Профил" : "Profile"}</Link>
          <button type="button" onClick={logout} className="flex-none border border-orisia-goldDark px-3 py-2 font-sans text-[11px] font-bold uppercase text-orisia-goldDark">{isBg ? "Изход" : "Logout"}</button>
        </nav>
      </div>
    </div>
  );
}
