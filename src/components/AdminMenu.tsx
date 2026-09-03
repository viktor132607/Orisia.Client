"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useLanguage from "./useLanguage";

export default function AdminMenu() {
  const pathname = usePathname();
  const language = useLanguage();
  const isBg = language === "bg";
  const sections = [
    { href: "/admin", label: isBg ? "Табло" : "Dashboard", exact: true }, { href: "/admin/events", label: isBg ? "Събития" : "Events" }, { href: "/admin/horoteka", label: isBg ? "Хоротека" : "Dance Library" }, { href: "/admin/gallery", label: isBg ? "Галерия" : "Gallery" }, { href: "/admin/messages", label: isBg ? "Запитвания" : "Inquiries" }, { href: "/admin/users", label: isBg ? "Потребители" : "Users" }, { href: "/admin/home", label: isBg ? "Начална страница" : "Homepage" },
  ];

  return (
    <div className="sticky top-20 z-40 border-b border-orisia-line bg-[#e4d2b8] dark:border-[#574333] dark:bg-[#160d08]">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-2 px-4 py-3 sm:px-6 lg:flex-row lg:items-center lg:px-8">
        <span className="flex-none font-sans text-[10px] font-black uppercase tracking-[.18em] text-orisia-goldDark dark:text-[#d1a15e]">{isBg ? "АДМИН ПАНЕЛ" : "ADMIN PANEL"}</span>
        <nav className="scrollbar-none flex min-w-0 flex-1 gap-2 overflow-x-auto whitespace-nowrap lg:justify-end" aria-label={isBg ? "Административни раздели" : "Admin sections"}>
          {sections.map((section) => {
            const active = section.exact ? pathname === section.href : pathname.startsWith(section.href);
            return <Link key={section.href} href={section.href} className={`flex-none border px-3 py-2 font-sans text-[11px] font-bold uppercase tracking-wide transition ${active ? "border-orisia-goldDark bg-orisia-gold text-white" : "border-transparent text-[#5f4532] hover:border-orisia-line dark:text-[#c8ad83] dark:hover:border-[#604a39]"}`}>{section.label}</Link>;
          })}
        </nav>
      </div>
    </div>
  );
}
