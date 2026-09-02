"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import SitePreferences from "./SitePreferences";

const AUTH_KEY = "orisia-dev-auth";
const LANGUAGE_KEY = "orisia-language";

type Language = "bg" | "en";

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

export default function Navbar() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [language, setLanguage] = useState<Language>("bg");

  useEffect(() => {
    const readVariant = () => {
      setLoggedIn(window.localStorage.getItem(AUTH_KEY) === "logged-in");
    };

    const handleVariantChange = (event: Event) => {
      const customEvent = event as CustomEvent<{ loggedIn?: boolean }>;
      setLoggedIn(Boolean(customEvent.detail?.loggedIn));
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
    setLoggedIn(false);
    window.dispatchEvent(new CustomEvent("orisia-auth-change", { detail: { loggedIn: false } }));
  };

  const text = labels[language];

  return (
    <header className="navbar">
      <div className="container nav-inner">
        <Link href="/" className="brand">ОРИСИЯ</Link>
        <div className="nav-right">
          <nav className="nav-links" aria-label="Основна навигация">
            <Link href="/">{text.home}</Link>
            <Link href="/calendar">{text.calendar}</Link>
            <Link href="/gallery">{text.gallery}</Link>
            <Link href="/horoteka">{text.horoteka}</Link>
            <Link href="/about">{text.about}</Link>
            <Link href="/contact">{text.contacts}</Link>
            <Link href="/admin" className="login-link">{text.admin}</Link>
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
