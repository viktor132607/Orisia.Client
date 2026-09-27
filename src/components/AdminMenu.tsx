"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ArrowLeftStartOnRectangleIcon, ArrowTopRightOnSquareIcon, Bars3Icon,
  CalendarDaysIcon, ChatBubbleLeftRightIcon, CircleStackIcon, HomeIcon,
  NewspaperIcon, PhotoIcon, RectangleStackIcon, Squares2X2Icon,
  UserCircleIcon, UsersIcon, VideoCameraIcon, XMarkIcon,
} from "@heroicons/react/24/outline";
import { api } from "../lib/api";
import useLanguage from "./useLanguage";

const sections = [
  { href: "/admin/", bg: "Общ преглед", en: "Overview", icon: Squares2X2Icon, group: "overview" },
  { href: "/admin/home/", bg: "Публикации", en: "Posts", icon: NewspaperIcon, group: "content" },
  { href: "/admin/events/", bg: "Събития", en: "Events", icon: CalendarDaysIcon, group: "content" },
  { href: "/admin/groups/", bg: "Групи", en: "Groups", icon: UsersIcon, group: "content" },
  { href: "/admin/horoteka/", bg: "Хоротека", en: "Dance library", icon: VideoCameraIcon, group: "content" },
  { href: "/admin/gallery/", bg: "Галерия", en: "Gallery", icon: PhotoIcon, group: "content" },
  { href: "/admin/media/", bg: "Медия", en: "Media", icon: RectangleStackIcon, group: "content" },
  { href: "/admin/reviews/", bg: "Отзиви", en: "Reviews", icon: ChatBubbleLeftRightIcon, group: "requests" },
  { href: "/admin/messages/", bg: "Запитвания", en: "Inquiries", icon: ChatBubbleLeftRightIcon, group: "requests" },
  { href: "/admin/users/", bg: "Потребители", en: "Users", icon: UserCircleIcon, group: "settings" },
  { href: "/admin/database/", bg: "Архив на базата", en: "Database backup", icon: CircleStackIcon, group: "settings" },
] as const;

export default function AdminMenu() {
  const pathname = usePathname() ?? "/admin/";
  const router = useRouter();
  const isBg = useLanguage() === "bg";
  const [open, setOpen] = useState(false);
  const normalized = pathname.endsWith("/") ? pathname : `${pathname}/`;
  const current = normalized === "/account/" ? { bg: "Профил", en: "Profile" } : sections.find(section => section.href === normalized) ?? sections[0];

  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  async function logout() {
    try { await api.auth.logout(); }
    finally { router.replace("/adminlogin/"); }
  }

  const link = (section: (typeof sections)[number]) => {
    const Icon = section.icon;
    const active = normalized === section.href;
    return <Link key={section.href} href={section.href} aria-current={active ? "page" : undefined} className={`admin-side-link ${active ? "is-active" : ""}`} onClick={() => setOpen(false)}>
      <Icon className="h-[19px] w-[19px] shrink-0" aria-hidden="true" />
      <span>{isBg ? section.bg : section.en}</span>
    </Link>;
  };

  return <>
    {open && <button className="admin-sidebar-backdrop" type="button" aria-label={isBg ? "Затвори менюто" : "Close menu"} onClick={() => setOpen(false)} />}
    <aside className={`admin-sidebar ${open ? "is-open" : ""}`} aria-label={isBg ? "Админ навигация" : "Admin navigation"}>
      <Link href="/admin/" className="admin-sidebar-brand" onClick={() => setOpen(false)}>
        <span className="admin-brand-symbol">О</span>
        <span><strong>ОРИСИЯ</strong><small>{isBg ? "Администрация" : "Administration"}</small></span>
      </Link>
      <div className="admin-sidebar-scroll">
        <div className="admin-side-group"><span className="admin-side-label">{isBg ? "Работно пространство" : "Workspace"}</span>{sections.filter(x => x.group === "overview").map(link)}</div>
        <div className="admin-side-group"><span className="admin-side-label">{isBg ? "Съдържание" : "Content"}</span>{sections.filter(x => x.group === "content").map(link)}</div>
        <div className="admin-side-group"><span className="admin-side-label">{isBg ? "Комуникация" : "Communication"}</span>{sections.filter(x => x.group === "requests").map(link)}</div>
        <div className="admin-side-group"><span className="admin-side-label">{isBg ? "Система" : "System"}</span>{sections.filter(x => x.group === "settings").map(link)}</div>
      </div>
      <div className="admin-sidebar-bottom"><Link href="/" className="admin-side-link" onClick={() => setOpen(false)}><ArrowTopRightOnSquareIcon className="h-[19px] w-[19px]" />{isBg ? "Към сайта" : "View site"}</Link></div>
    </aside>
    <header className="admin-topbar">
      <button type="button" className="admin-menu-toggle" aria-label={open ? (isBg ? "Затвори менюто" : "Close menu") : (isBg ? "Отвори менюто" : "Open menu")} aria-expanded={open} onClick={() => setOpen(!open)}>{open ? <XMarkIcon className="h-5 w-5" /> : <Bars3Icon className="h-5 w-5" />}</button>
      <div className="admin-breadcrumb"><HomeIcon className="h-4 w-4" aria-hidden="true" /><span className="admin-breadcrumb-divider">/</span><span>{isBg ? current.bg : current.en}</span></div>
      <div className="admin-topbar-actions"><Link href="/" className="admin-topbar-site"><ArrowTopRightOnSquareIcon className="h-4 w-4" />{isBg ? "Публичен сайт" : "Public site"}</Link><Link href="/account/" className="admin-topbar-profile" aria-label={isBg ? "Профил" : "Profile"}><UserCircleIcon className="h-5 w-5" /> <span>{isBg ? "Профил" : "Profile"}</span></Link><button type="button" onClick={logout} className="admin-topbar-logout" aria-label={isBg ? "Изход" : "Logout"}><ArrowLeftStartOnRectangleIcon className="h-5 w-5" /></button></div>
    </header>
  </>;
}
