"use client";

import { useEffect, useState } from "react";

const THEME_KEY = "orisia-theme";
const LANGUAGE_KEY = "orisia-language";

type Theme = "dark" | "light";
type Language = "bg" | "en";

function applyLanguage(language: Language) {
  document.documentElement.lang = language;
  document.title = language === "bg" ? "ОРИСИЯ" : "ORISIA";
  const description = document.querySelector('meta[name="description"]');
  if (description) {
    description.setAttribute(
      "content",
      language === "bg"
        ? "ОРИСИЯ — български фолклор, танц и традиция"
        : "ORISIA — Bulgarian folklore, dance and tradition"
    );
  }
}

function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.dataset.theme = theme;
  root.classList.toggle("dark", theme === "dark");
}

export default function SitePreferences() {
  const [theme, setTheme] = useState<Theme>("dark");
  const [language, setLanguage] = useState<Language>("bg");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_KEY) === "light" ? "light" : "dark";
    const savedLanguage = window.localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "bg";
    setTheme(savedTheme);
    setLanguage(savedLanguage);
    applyTheme(savedTheme);
    applyLanguage(savedLanguage);
  }, []);

  const toggleTheme = () => {
    const nextTheme: Theme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
    window.dispatchEvent(new CustomEvent("orisia-theme-change", { detail: { theme: nextTheme } }));
  };

  const toggleLanguage = () => {
    const nextLanguage: Language = language === "bg" ? "en" : "bg";
    setLanguage(nextLanguage);
    window.localStorage.setItem(LANGUAGE_KEY, nextLanguage);
    applyLanguage(nextLanguage);
    window.dispatchEvent(new CustomEvent("orisia-language-change", { detail: { language: nextLanguage } }));
  };

  const isBg = language === "bg";
  const isLight = theme === "light";
  const buttonClass = "grid h-9 place-items-center border border-[#5f5550] bg-[#262223] text-orisia-light transition hover:border-orisia-gold hover:bg-[#322d2e] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orisia-gold";

  return (
    <div className="flex w-[90px] flex-none items-center gap-2" aria-label={isBg ? "Настройки на сайта" : "Site settings"}>
      <button type="button" className={`${buttonClass} min-w-11 rounded-full px-3 font-sans text-[11px] font-extrabold tracking-wide`} onClick={toggleLanguage} aria-label={isBg ? "Смени на английски" : "Switch to Bulgarian"}>
        {language.toUpperCase()}
      </button>
      <button type="button" className={`${buttonClass} w-9 rounded-full`} onClick={toggleTheme} aria-label={isBg ? "Смени темата" : "Toggle theme"} aria-pressed={isLight}>
        {isLight ? (
          <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" aria-hidden="true">
            <circle cx="12" cy="12" r="4" fill="currentColor" />
            <path d="M12 2v2M12 20v2M4.93 4.93l1.42 1.42M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.42-1.42M17.66 6.34l1.41-1.41" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        ) : (
          <svg className="h-[17px] w-[17px]" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M20 15.2A8.5 8.5 0 0 1 8.8 4 8.5 8.5 0 1 0 20 15.2Z" fill="currentColor" />
          </svg>
        )}
      </button>
    </div>
  );
}
