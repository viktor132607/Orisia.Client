"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import useLanguage from "./useLanguage";

export default function AdminMenu() {
  const pathname = usePathname();
  const language = useLanguage();
  const isBg = language === "bg";
  const sections = [
    { href: "/admin", label: isBg ? "Табло" : "Dashboard", exact: true },
    { href: "/admin/events", label: isBg ? "Събития" : "Events" },
    { href: "/admin/horoteka", label: isBg ? "Хоротека" : "Dance Library" },
    { href: "/admin/gallery", label: isBg ? "Галерия" : "Gallery" },
    { href: "/admin/messages", label: isBg ? "Запитвания" : "Inquiries" },
    { href: "/admin/users", label: isBg ? "Потребители" : "Users" },
    { href: "/admin/home", label: isBg ? "Начална страница" : "Homepage" },
  ];

  return (
    <div className="admin-menu-shell">
      <div className="container admin-menu-inner">
        <span className="admin-menu-title">{isBg ? "АДМИН ПАНЕЛ" : "ADMIN PANEL"}</span>
        <nav className="admin-menu" aria-label={isBg ? "Административни раздели" : "Admin sections"}>
          {sections.map((section) => {
            const active = section.exact ? pathname === section.href : pathname.startsWith(section.href);
            return (
              <Link key={section.href} href={section.href} className={active ? "admin-menu-link active" : "admin-menu-link"}>
                {section.label}
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
