"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import {
  getLocaleFromPathname,
  localizePath,
  type Locale,
} from "../lib/i18n";

export type Language = Locale;
export const LANGUAGE_KEY = "orisia-language";

export default function useLanguage() {
  const pathname = usePathname();
  const routeLocale = getLocaleFromPathname(pathname ?? "/");
  const [language, setLanguage] = useState<Language>("bg");

  useEffect(() => {
    const readLanguage = () => {
      setLanguage(window.localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "bg");
    };

    const handleLanguage = (event: Event) => {
      const detail = (event as CustomEvent<{ language?: Language }>).detail;
      if (detail?.language) setLanguage(detail.language);
      else readLanguage();
    };

    const handleStorage = (event: StorageEvent) => {
      if (event.key === LANGUAGE_KEY) readLanguage();
    };

    if (routeLocale) {
      setLanguage(routeLocale);
      window.localStorage.setItem(LANGUAGE_KEY, routeLocale);
      document.documentElement.lang = routeLocale;
    } else {
      readLanguage();
    }

    window.addEventListener("orisia-language-change", handleLanguage);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("orisia-language-change", handleLanguage);
      window.removeEventListener("storage", handleStorage);
    };
  }, [routeLocale]);

  return routeLocale ?? language;
}

export function useLocalizedPath() {
  const pathname = usePathname();
  const locale = getLocaleFromPathname(pathname ?? "/");

  return (path: string) => (locale ? localizePath(path, locale) : path);
}
