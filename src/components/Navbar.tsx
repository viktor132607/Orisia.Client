"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import SitePreferences from "./SitePreferences";
import { getLocaleFromPathname, localizePath, stripLocale } from "../lib/i18n";

const AUTH_KEY = "orisia-dev-auth";
const LOGO_SRC = "/orisia-logo.jpg";

type AuthRole = "guest" | "user" | "admin";

function getRole(value: string | null): AuthRole {
  if (value === "admin") return "admin";
  if (value === "logged-in" || value === "user") return "user";
  return "guest";
}

export default function Navbar() {
  const pathname = usePathname() ?? "/";
  const routeLocale = getLocaleFromPathname(pathname);
  const isBg = (routeLocale ?? "bg") === "bg";
  const [role, setRole] = useState<AuthRole>("guest");
  const [open, setOpen] = useState(false);

  const href = (path: string) => routeLocale ? localizePath(path, routeLocale) : path;
  const plainPath = stripLocale(pathname);
  const closeMenu = () => setOpen(false);

  useEffect(() => {
    const readRole = () => setRole(getRole(window.localStorage.getItem(AUTH_KEY)));
    const onAuth = (event: Event) => {
      const detail = (event as CustomEvent<{ role?: AuthRole; loggedIn?: boolean; isAdmin?: boolean }>).detail;
      if (detail?.role) setRole(detail.role);
      else if (detail?.isAdmin) setRole("admin");
      else setRole(detail?.loggedIn ? "user" : "guest");
    };
    const onStorage = (event: StorageEvent) => { if (event.key === AUTH_KEY) readRole(); };
    readRole();
    window.addEventListener("orisia-auth-change", onAuth);
    window.addEventListener("storage", onStorage);
    return () => {
      window.removeEventListener("orisia-auth-change", onAuth);
      window.removeEventListener("storage", onStorage);
    };
  }, []);

  const logout = () => {
    window.localStorage.setItem(AUTH_KEY, "logged-out");
    setRole("guest");
    setOpen(false);
    window.dispatchEvent(new CustomEvent("orisia-auth-change", { detail: { role: "guest", loggedIn: false, isAdmin: false } }));
  };

  const text = isBg ? {
    home: "Начало", news: "Новини", events: "Събития", calendar: "Календар", groups: "Групи",
    gallery: "Галерия", horoteka: "Хоротека", about: "За нас", contact: "Контакти",
    admin: "Админ", profile: "Профил", login: "Вход", logout: "Изход", menu: "Меню",
  } : {
    home: "Home", news: "News", events: "Events", calendar: "Calendar", groups: "Groups",
    gallery: "Gallery", horoteka: "Dance library", about: "About us", contact: "Contacts",
    admin: "Admin", profile: "Profile", login: "Login", logout: "Logout", menu: "Menu",
  };

  const nav = [
    { href: "/", label: text.home },
    { href: "/news/", label: text.news },
    {
      href: "/events/",
      label: text.events,
      children: [
        { href: "/events/", label: text.events },
        { href: "/calendar/", label: text.calendar },
        { href: "/groups/", label: text.groups },
      ],
    },
    { href: "/horoteka/", label: text.horoteka },
    { href: "/gallery/", label: text.gallery },
    { href: "/about/", label: text.about },
    { href: "/contact/", label: text.contact },
  ];

  const active = (item: (typeof nav)[number]) => {
    if (item.children) return item.children.some((child) => plainPath === child.href || plainPath.startsWith(child.href));
    return plainPath === item.href || (item.href !== "/" && plainPath.startsWith(item.href));
  };

  return (
    <header className="sticky top-0 z-[9999] border-b border-[#6d4c34] bg-orisia-ink font-sans text-white shadow-[0_5px_20px_rgba(75,46,27,.18)]">
      <div className="mx-auto flex h-[84px] max-w-[1460px] items-center justify-between gap-5 px-6 max-[640px]:h-[70px] max-[640px]:px-4">
        <Link href={href("/")} onClick={closeMenu} className="flex min-w-0 shrink-0 items-center gap-3.5 max-[640px]:gap-2.5" aria-label={isBg ? "ОРИСИЯ — начало" : "ORISIA — home"}>
          <img src={LOGO_SRC} alt="" width={62} height={62} className="h-[62px] w-[62px] rounded-full border-2 border-orisia-line bg-white object-cover max-[640px]:h-[50px] max-[640px]:w-[50px]" />
          <span className="flex flex-col font-serif text-[19px] font-bold uppercase leading-[1.04] tracking-[.055em] text-orisia-light max-[640px]:text-[14px]">
            <span>ОРИСИЯ</span>
            <span className="text-[11px] tracking-[.1em] text-[#d8c1aa] max-[640px]:text-[9px]">{isBg ? "Даскало за фолклор" : "Folklore school"}</span>
          </span>
        </Link>

        <nav className="flex h-full items-center gap-6 max-[1180px]:gap-4 max-[1030px]:hidden" aria-label={isBg ? "Основна навигация" : "Main navigation"}>
          {nav.map((item) => (
            <div key={item.href} className="group relative flex h-full items-center">
              <Link
                href={href(item.href)}
                aria-current={active(item) ? "page" : undefined}
                className={`relative flex h-full items-center whitespace-nowrap text-[12px] font-semibold uppercase tracking-[.095em] transition-colors hover:text-[#e8c79f] after:absolute after:bottom-[19px] after:left-0 after:h-[2px] after:w-full after:bg-orisia-gold after:transition-opacity ${active(item) ? "text-[#e8c79f] after:opacity-100" : "text-orisia-light after:opacity-0 group-hover:after:opacity-100"}`}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="invisible absolute left-[-16px] top-[calc(100%-3px)] min-w-[220px] border-t-2 border-orisia-gold bg-[#2a2421] py-2 opacity-0 shadow-xl transition-opacity group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                  {item.children.map((child) => (
                    <Link key={child.href} href={href(child.href)} className="block px-4 py-2.5 text-[13px] text-orisia-light transition hover:bg-[#3a302b] hover:text-white">
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2.5">
          <SitePreferences />
          {role === "admin" && <Link href="/admin/" className="hidden text-[11px] font-bold uppercase tracking-[.08em] text-orisia-light hover:text-[#e8c79f] xl:inline-flex">{text.admin}</Link>}
          {role !== "guest" && <Link href="/account/" className="hidden text-[11px] font-bold uppercase tracking-[.08em] text-orisia-light hover:text-[#e8c79f] xl:inline-flex">{text.profile}</Link>}
          {role === "guest" ? (
            <Link href="/login/" className="hidden rounded-xl bg-orisia-goldDark px-4 py-2.5 text-[11px] font-bold uppercase tracking-[.08em] text-white transition hover:bg-[#a96b38] sm:inline-flex">{text.login}</Link>
          ) : (
            <button type="button" onClick={logout} className="hidden rounded-xl bg-orisia-goldDark px-4 py-2.5 text-[11px] font-bold uppercase tracking-[.08em] text-white transition hover:bg-[#a96b38] sm:inline-flex">{text.logout}</button>
          )}
          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="hidden h-9 w-10 flex-col items-center justify-center gap-[5px] border border-white/55 max-[1030px]:flex"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={text.menu}
          >
            <span className="h-[2px] w-5 bg-orisia-light" />
            <span className="h-[2px] w-5 bg-orisia-light" />
            <span className="h-[2px] w-5 bg-orisia-light" />
          </button>
        </div>
      </div>

      {open && (
        <nav id="mobile-navigation" className="hidden border-t border-white/15 bg-[#2a2421] px-4 pb-4 max-[1030px]:block" aria-label={text.menu}>
          {nav.map((item) => (
            <div key={item.href}>
              <Link href={href(item.href)} onClick={closeMenu} className={`block border-b border-white/15 py-3 text-[14px] font-semibold uppercase tracking-[.08em] ${active(item) ? "text-[#e8c79f]" : "text-white"}`}>
                {item.label}
              </Link>
              {item.children?.map((child) => (
                <Link key={child.href} href={href(child.href)} onClick={closeMenu} className="block border-b border-white/10 py-2.5 pl-5 text-[13px] text-orisia-light">
                  {child.label}
                </Link>
              ))}
            </div>
          ))}
          <div className="mt-4 flex flex-wrap gap-3">
            {role === "admin" && <Link href="/admin/" onClick={closeMenu} className="rounded-xl border border-orisia-line px-4 py-2.5 text-xs font-bold uppercase">{text.admin}</Link>}
            {role !== "guest" && <Link href="/account/" onClick={closeMenu} className="rounded-xl border border-orisia-line px-4 py-2.5 text-xs font-bold uppercase">{text.profile}</Link>}
            {role === "guest"
              ? <Link href="/login/" onClick={closeMenu} className="rounded-xl bg-orisia-goldDark px-4 py-2.5 text-xs font-bold uppercase text-white">{text.login}</Link>
              : <button type="button" onClick={logout} className="rounded-xl bg-orisia-goldDark px-4 py-2.5 text-xs font-bold uppercase text-white">{text.logout}</button>}
          </div>
        </nav>
      )}
    </header>
  );
}
