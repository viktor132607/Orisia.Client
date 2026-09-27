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

  const isBg = language === "bg";
  const buttonClass = "grid h-9 place-items-center border border-[#5f5550] bg-[#262223] text-orisia-light transition hover:border-orisia-gold hover:bg-[#322d2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orisia-gold";

  return (
    <div className="flex w-11 flex-none items-center" aria-label={isBg ? "Настройки на сайта" : "Site settings"}>
      <button type="button" className={`${buttonClass} min-w-11 rounded-full px-3 font-sans text-[11px] font-extrabold tracking-wide`} onClick={toggleLanguage} aria-label={isBg ? "Смени на английски" : "Switch to Bulgarian"}>
        {language.toUpperCase()}
      </button>
    </div>
  );
}
