"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SitePreferences from "./SitePreferences";

const AUTH_KEY = "orisia-dev-auth";
const LANGUAGE_KEY = "orisia-language";

type Language = "bg" | "en";
type AuthRole = "guest" | "user" | "admin";

const labels = {
  bg: {
    home: "Начало",
    calendar: "Календар",
    gallery: "Галерия",
    horoteka: "Хоротека",
    about: "За ОРИСИЯ",
    contacts: "Контакти",
    admin: "Админ",
    profile: "Профил",
    logout: "Изход",
    login: "Вход",
  },
  en: {
    home: "Home",
    calendar: "Calendar",
    gallery: "Gallery",
    horoteka: "Dance Library",
    about: "About ORISIA",
    contacts: "Contacts",
    admin: "Admin",
    profile: "Profile",
    logout: "Logout",
    login: "Login",
  },
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
    const readVariant = () => {
      setRole(getRole(window.localStorage.getItem(AUTH_KEY)));
    };

    const handleVariantChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ role?: AuthRole; loggedIn?: boolean; isAdmin?: boolean }>;
      if (customEvent.detail?.role) setRole(customEvent.detail.role);
      else if (customEvent.detail?.isAdmin) setRole("admin");
      else setRole(customEvent.detail?.loggedIn ? "user" : "guest");
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

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="brand">{isBg ? "ОРИСИЯ" : "ORISIA"}</Link>
        <div className="nav-right">
          <nav className="nav-links" aria-label={isBg ? "Основна навигация" : "Main navigation"}>
            <Link href="/">{text.home}</Link>
            <Link href="/calendar">{text.calendar}</Link>
            <Link href="/gallery">{text.gallery}</Link>
            <Link href="/horoteka">{text.horoteka}</Link>
            <Link href="/about">{text.about}</Link>
            <Link href="/contact">{text.contacts}</Link>
            {isAdmin && <Link href="/admin" className="login-link">{text.admin}</Link>}
            {loggedIn ? (
              <>
                <Link href="/account">{text.profile}</Link>
                <Link href="/" className="login-link" onClick={logout}>{text.logout}</Link>
              </>
            ) : (
              <Link href="/login" className="login-link">{text.login}</Link>
            )}
          </nav>
          <SitePreferences />
        </div>
      </div>
    </header>
  );
}
