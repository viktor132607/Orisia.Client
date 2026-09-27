"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import {
  getLocaleFromPathname,
  isPublicPath,
  localizePath,
  stripLocale,
  type Locale,
} from "../lib/i18n";

const LANGUAGE_KEY = "orisia-language";

type Language = Locale;

function applyLanguage(language: Language) {
  document.documentElement.lang = language;
}

export default function SitePreferences() {
  const pathname = usePathname();
  const router = useRouter();
  const currentPathname = pathname ?? "/";
  const routeLocale = getLocaleFromPathname(currentPathname);
  const [language, setLanguage] = useState<Language>(routeLocale ?? "bg");

  useEffect(() => {
    const savedLanguage = routeLocale ?? (window.localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "bg");
    setLanguage(savedLanguage);
    window.localStorage.setItem(LANGUAGE_KEY, savedLanguage);
    applyLanguage(savedLanguage);
  }, [routeLocale]);

  const toggleLanguage = () => {
    const nextLanguage: Language = language === "bg" ? "en" : "bg";
    setLanguage(nextLanguage);
    window.localStorage.setItem(LANGUAGE_KEY, nextLanguage);
    applyLanguage(nextLanguage);
    window.dispatchEvent(new CustomEvent("orisia-language-change", { detail: { language: nextLanguage } }));

    if (isPublicPath(currentPathname)) {
      router.push(localizePath(stripLocale(currentPathname), nextLanguage));
    }
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="flex h-9 min-w-10 items-center justify-center px-2 font-sans text-xs font-bold tracking-[.08em] text-orisia-light transition-colors hover:text-[#e8c79f] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
      aria-label={language === "bg" ? "Switch to English" : "Превключи на български"}
    >
      {language === "bg" ? "EN" : "BG"}
    </button>
  );
}
