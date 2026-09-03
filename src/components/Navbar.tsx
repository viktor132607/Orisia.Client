"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SitePreferences from "./SitePreferences";

const AUTH_KEY = "orisia-dev-auth";
const LANGUAGE_KEY = "orisia-language";

type Language = "bg" | "en";
type AuthRole = "guest" | "user" | "admin";

const labels = {
  bg: { home: "Начало", calendar: "Календар", gallery: "Галерия", horoteka: "Хоротека", about: "За ОРИСИЯ", contacts: "Контакти", admin: "Админ", profile: "Профил", logout: "Изход", login: "Вход" },
  en: { home: "Home", calendar: "Calendar", gallery: "Gallery", horoteka: "Dance Library", about: "About ORISIA", contacts: "Contacts", admin: "Admin", profile: "Profile", logout: "Logout", login: "Login" },
};

function getRole(value: string | null): AuthRole {
  if (value === "admin") return "admin";
  if (value === "logged-in" || value === "user") return "user";
  return "guest";
}

export default function Navbar() {
  const [role, setRole] = useState<AuthRole>("guest");
  const [language, setLanguage] = useState<Language>("bg");

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
    window.dispatchEvent(new CustomEvent("orisia-auth-change", { detail: { role: "guest", loggedIn: false, isAdmin: false } }));
  };

  const text = labels[language];
  const loggedIn = role !== "guest";
  const isAdmin = role === "admin";
  const isBg = language === "bg";
  const navLink = "flex-none font-sans text-[10px] font-black uppercase tracking-[.08em] text-orisia-light transition hover:text-white lg:text-[12px]";

  return (
    <header className="fixed inset-x-0 top-0 z-[9999] h-20 border-b border-[#554b47] bg-orisia-ink text-orisia-light shadow-sm">
      <div className="mx-auto flex h-full w-full items-center gap-3 px-3 sm:px-4 lg:gap-6 lg:px-6">
        <Link href="/" className="flex-none leading-none" aria-label={isBg ? "ОРИСИЯ - Начало" : "ORISIA - Home"}>
          <img className="h-11 w-11 rounded object-cover sm:h-12 sm:w-12 lg:h-[54px] lg:w-[54px]" src="/orisia-logo.svg" alt={isBg ? "Лого на ОРИСИЯ" : "ORISIA logo"} />
        </Link>

        <nav className="scrollbar-none flex min-w-0 flex-1 items-center justify-start gap-3 overflow-x-auto whitespace-nowrap px-1 lg:justify-center lg:gap-5" aria-label={isBg ? "Основна навигация" : "Main navigation"}>
          <Link className={navLink} href="/">{text.home}</Link>
          <Link className={navLink} href="/calendar">{text.calendar}</Link>
          <Link className={navLink} href="/gallery">{text.gallery}</Link>
          <Link className={navLink} href="/horoteka">{text.horoteka}</Link>
          <Link className={navLink} href="/about">{text.about}</Link>
          <Link className={navLink} href="/contact">{text.contacts}</Link>
          {isAdmin && <Link className={navLink} href="/admin">{text.admin}</Link>}
        </nav>

        <div className="grid w-[196px] flex-none grid-cols-[70px_60px_56px] items-center gap-1.5 whitespace-nowrap sm:w-[230px] sm:grid-cols-[82px_72px_64px] lg:w-[300px] lg:grid-cols-[90px_96px_96px] lg:gap-2">
          <SitePreferences />
          <span className="flex w-full items-center justify-center">
            {loggedIn ? <Link href="/account" className="flex min-h-9 w-full items-center justify-center px-1 font-sans text-[9px] font-extrabold uppercase tracking-[.06em] text-orisia-light hover:text-white sm:text-[10px] lg:text-[12px]">{text.profile}</Link> : null}
          </span>
          <span className="flex w-full items-center justify-center">
            {loggedIn ? (
              <Link href="/" className="flex min-h-9 w-full items-center justify-center rounded-sm border border-[#9b693d] bg-[#8e5b32] px-1 font-sans text-[9px] font-black uppercase tracking-[.06em] text-white transition hover:bg-[#a96b38] sm:text-[10px] lg:text-[12px]" onClick={logout}>{text.logout}</Link>
            ) : (
              <Link href="/login" className="flex min-h-9 w-full items-center justify-center rounded-sm border border-[#9b693d] bg-[#8e5b32] px-1 font-sans text-[9px] font-black uppercase tracking-[.06em] text-white transition hover:bg-[#a96b38] sm:text-[10px] lg:text-[12px]">{text.login}</Link>
            )}
          </span>
        </div>
      </div>
    </header>
  );
}
