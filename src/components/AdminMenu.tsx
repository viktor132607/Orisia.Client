"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const sections = [
  { href: "/admin", label: "Табло", exact: true },
  { href: "/admin/events", label: "Събития" },
  { href: "/admin/horoteka", label: "Хоротека" },
  { href: "/admin/gallery", label: "Галерия" },
  { href: "/admin/messages", label: "Запитвания" },
  { href: "/admin/users", label: "Потребители" },
  { href: "/admin/home", label: "Начална страница" },
];

export default function AdminMenu() {
  const pathname = usePathname();

  return (
    <div className="admin-menu-shell">
      <div className="container admin-menu-inner">
        <span className="admin-menu-title">АДМИН ПАНЕЛ</span>
        <nav className="admin-menu" aria-label="Административни раздели">
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
