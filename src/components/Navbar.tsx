"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SitePreferences from "./SitePreferences";

const AUTH_KEY = "orisia-dev-auth";
const LANGUAGE_KEY = "orisia-language";
const LOGO_SRC = "/orisia-logo.png?v=20260904-2";

type Language = "bg" | "en";
type AuthRole = "guest" | "user" | "admin";

const labels = {
  bg: { home: "Начало", news: "Новини", events: "Събития", calendar: "Календар", gallery: "Галерия", horoteka: "Хоротека", about: "За ОРИСИЯ", contacts: "Контакти", admin: "Админ", profile: "Профил", logout: "Изход", login: "Вход", menu: "Меню", close: "Затвори менюто" },
  en: { home: "Home", news: "News", events: "Events", calendar: "Calendar", gallery: "Gallery", horoteka: "Dance Library", about: "About ORISIA", contacts: "Contacts", admin: "Admin", profile: "Profile", logout: "Logout", login: "Login", menu: "Menu", close: "Close menu" },
};

function getRole(value: string | null): AuthRole {
  if (value === "admin") return "admin";
  if (value === "logged-in" || value === "user") return "user";
  return "guest";
}

export default function Navbar() {
  const [role, setRole] = useState<AuthRole>("guest");
  const [language, setLanguage] = useState<Language>("bg");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const readVariant = () => setRole(getRole(window.localStorage.getItem(AUTH_KEY)));
    const handleVariantChange = (event: Event) => {
      const detail = (event as CustomEvent<{ role?: AuthRole; loggedIn?: boolean; isAdmin?: boolean }>).detail;
      if (detail?.role) setRole(detail.role);
      else if (detail?.isAdmin) setRole("admin");
      else setRole(detail?.loggedIn ? "user" : "guest");
    };
    const handleStorage = (event: StorageEvent) => {
      if (event.key === AUTH_KEY) readVariant();
      if (event.key === LANGUAGE_KEY) setLanguage(event.newValue === "en" ? "en" : "bg");
    };
    const handleLanguage = (event: Event) => {
      const detail = (event as CustomEvent<{ language?: Language }>).detail;
      if (detail?.language) setLanguage(detail.language);
    };

    readVariant();
    setLanguage(window.localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "bg");
    window.addEventListener("orisia-auth-change", handleVariantChange);
    window.addEventListener("orisia-language-change", handleLanguage);
    window.addEventListener("storage", handleStorage);
    return () => {
      window.removeEventListener("orisia-auth-change", handleVariantChange);
      window.removeEventListener("orisia-language-change", handleLanguage);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  const logout = () => {
    window.localStorage.setItem(AUTH_KEY, "logged-out");
    setRole("guest");
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent("orisia-auth-change", { detail: { role: "guest", loggedIn: false, isAdmin: false } }));
  };

  const text = labels[language];
  const loggedIn = role !== "guest";
  const isAdmin = role === "admin";
  const isBg = language === "bg";
  const navLink = "inline-flex h-12 flex-none items-center justify-center px-2.5 font-sans text-[10px] font-black uppercase tracking-[.08em] text-orisia-light transition hover:text-white 2xl:px-3 2xl:text-[12px]";
  const mobileLink = "flex min-h-14 items-center border-b border-[#403a38] px-7 font-sans text-[15px] font-black uppercase tracking-[.08em] text-orisia-light transition hover:bg-[#272324] hover:text-white";

  const navItems = [
    { href: "/", label: text.home },
    { href: "/news", label: text.news },
    { href: "/events", label: text.events },
    { href: "/calendar", label: text.calendar },
    { href: "/gallery", label: text.gallery },
    { href: "/horoteka", label: text.horoteka },
    { href: "/about", label: text.about },
    { href: "/contact", label: text.contacts },
  ];

  if (isAdmin) navItems.push({ href: "/admin", label: text.admin });

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] h-20 border-b border-[#554b47] bg-[#1B191A] text-orisia-light shadow-sm">
      <div className="relative mx-auto flex h-full w-full items-center px-3 sm:px-4 lg:px-6">
        <Link href="/" className="flex-none leading-none xl:hidden" aria-label={isBg ? "ОРИСИЯ - Начало" : "ORISIA - Home"} onClick={() => setMenuOpen(false)}>
          <img className="h-12 w-12 object-contain sm:h-[54px] sm:w-[54px]" src={LOGO_SRC} alt={isBg ? "Лого на ОРИСИЯ" : "ORISIA logo"} />
        </Link>

        <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-4 whitespace-nowrap xl:flex 2xl:gap-6">
          <Link href="/" className="flex-none leading-none" aria-label={isBg ? "ОРИСИЯ - Начало" : "ORISIA - Home"}>
            <img className="h-[54px] w-[54px] object-contain" src={LOGO_SRC} alt={isBg ? "Лого на ОРИСИЯ" : "ORISIA logo"} />
          </Link>

          <nav className="flex items-center justify-center gap-1 whitespace-nowrap 2xl:gap-2" aria-label={isBg ? "Основна навигация" : "Main navigation"}>
            {navItems.map((item) => <Link key={item.href} className={navLink} href={item.href}>{item.label}</Link>)}
          </nav>
        </div>

        <div className="ml-auto hidden w-[300px] flex-none grid-cols-[90px_96px_96px] items-center gap-2 whitespace-nowrap pl-6 xl:grid">
          <SitePreferences />
          <span className="flex w-full items-center justify-center">
            {loggedIn ? <Link href="/account" className="flex min-h-11 w-full items-center justify-center px-2 font-sans text-[10px] font-extrabold uppercase tracking-[.06em] text-orisia-light hover:text-white 2xl:text-[12px]">{text.profile}</Link> : null}
          </span>
          <span className="flex w-full items-center justify-center">
            {loggedIn ? (
              <Link href="/" className="flex min-h-11 w-full items-center justify-center rounded-sm border border-[#9b693d] bg-[#8e5b32] px-2 font-sans text-[10px] font-black uppercase tracking-[.06em] text-white transition hover:bg-[#a96b38] 2xl:text-[12px]" onClick={logout}>{text.logout}</Link>
            ) : (
              <Link href="/login" className="flex min-h-11 w-full items-center justify-center rounded-sm border border-[#9b693d] bg-[#8e5b32] px-2 font-sans text-[10px] font-black uppercase tracking-[.06em] text-white transition hover:bg-[#a96b38] 2xl:text-[12px]">{text.login}</Link>
            )}
          </span>
        </div>

        <div className="ml-auto flex items-center gap-2 xl:hidden">
          <SitePreferences />
          <button
            type="button"
            className="grid h-11 w-11 flex-none place-items-center rounded-full border border-[#5f5550] bg-[#262223] text-orisia-light transition hover:border-orisia-gold hover:bg-[#322d2e]"
            onClick={() => setMenuOpen((current) => !current)}
            aria-label={menuOpen ? text.close : text.menu}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? (
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true"><path d="M5 5l14 14M19 5 5 19" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            ) : (
              <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M4 12h16M4 18h16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" /></svg>
            )}
          </button>
        </div>
      </div>

      <div className={`${menuOpen ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} fixed inset-x-0 bottom-0 top-20 z-[9998] bg-black/55 transition-opacity xl:hidden`} onClick={() => setMenuOpen(false)} aria-hidden={!menuOpen} />

      <aside
        id="mobile-navigation"
        className={`${menuOpen ? "translate-x-0" : "translate-x-full"} fixed bottom-0 right-0 top-20 z-[9999] flex w-[min(88vw,360px)] flex-col border-l border-[#554b47] bg-[#1B191A] shadow-2xl transition-transform duration-300 xl:hidden`}
        aria-label={text.menu}
      >
        <nav className="min-h-0 flex-1 overflow-y-auto" aria-label={isBg ? "Мобилна навигация" : "Mobile navigation"}>
          {navItems.map((item) => <Link key={item.href} className={mobileLink} href={item.href} onClick={() => setMenuOpen(false)}>{item.label}</Link>)}
        </nav>

        <div className="border-t border-[#554b47] p-5">
          {loggedIn ? (
            <div className="grid gap-3">
              <Link href="/account" className="flex min-h-12 items-center justify-center rounded-sm border border-[#5f5550] px-4 font-sans text-xs font-black uppercase tracking-[.08em] text-orisia-light" onClick={() => setMenuOpen(false)}>{text.profile}</Link>
              <Link href="/" className="flex min-h-12 items-center justify-center rounded-sm border border-[#9b693d] bg-[#8e5b32] px-4 font-sans text-xs font-black uppercase tracking-[.08em] text-white" onClick={logout}>{text.logout}</Link>
            </div>
          ) : (
            <Link href="/login" className="flex min-h-12 items-center justify-center rounded-sm border border-[#9b693d] bg-[#8e5b32] px-4 font-sans text-xs font-black uppercase tracking-[.08em] text-white" onClick={() => setMenuOpen(false)}>{text.login}</Link>
          )}
        </div>
      </aside>
    </header>
  );
}
