"use client";

import { useEffect, useState } from "react";

const COOKIE_KEY = "orisia-cookie-consent";
const LANGUAGE_KEY = "orisia-language";
const ENTERED_KEY = "orisia-site-entered";
type Language = "bg" | "en";

const copy = {
  bg: { title: "Бисквитки", text: "Използваме задължителни бисквитки за основната работа на сайта и, при съгласие, допълнителни бисквитки за бъдещи статистики и подобрения.", necessary: "Само задължителни", accept: "Приемам всички" },
  en: { title: "Cookies", text: "We use necessary cookies for the core operation of the site and, with your consent, additional cookies for future analytics and improvements.", necessary: "Necessary only", accept: "Accept all" },
};

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState<Language>("bg");

  useEffect(() => {
    const hasConsent = Boolean(window.localStorage.getItem(COOKIE_KEY));
    const hasEntered = window.localStorage.getItem(ENTERED_KEY) === "true";
    setLanguage(window.localStorage.getItem(LANGUAGE_KEY) === "en" ? "en" : "bg");
    setVisible(!hasConsent && hasEntered && document.documentElement.dataset.gates === "open");

    const handleLanguage = (event: Event) => {
      const detail = (event as CustomEvent<{ language?: Language }>).detail;
      if (detail?.language) setLanguage(detail.language);
    };
    const handleGates = (event: Event) => {
      if (window.localStorage.getItem(COOKIE_KEY)) return;
      setVisible(Boolean((event as CustomEvent<{ open?: boolean }>).detail?.open));
    };
    window.addEventListener("orisia-language-change", handleLanguage);
    window.addEventListener("orisia-gates-change", handleGates);
    return () => {
      window.removeEventListener("orisia-language-change", handleLanguage);
      window.removeEventListener("orisia-gates-change", handleGates);
    };
  }, []);

  const saveConsent = (value: "necessary" | "all") => {
    window.localStorage.setItem(COOKIE_KEY, value);
    setVisible(false);
  };

  if (!visible) return null;
  const text = copy[language];

  return (
    <aside className="fixed bottom-4 left-1/2 z-[9000] flex w-[calc(100%-2rem)] max-w-6xl -translate-x-1/2 flex-col gap-5 border border-orisia-line bg-orisia-paper p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between dark:border-[#76502c] dark:bg-[#21140c]" role="dialog" aria-live="polite" aria-label={text.title}>
      <div className="max-w-3xl">
        <strong className="text-lg text-orisia-brown dark:text-[#efd2a0]">{text.title}</strong>
        <p className="mt-1 font-sans text-xs leading-5 text-[#765f4b] dark:text-[#b19873]">{text.text}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="min-h-10 border border-orisia-line bg-transparent px-4 font-sans text-[11px] font-black uppercase tracking-wide text-orisia-brown dark:border-[#79532f] dark:text-orisia-light" onClick={() => saveConsent("necessary")}>{text.necessary}</button>
        <button type="button" className="min-h-10 border border-orisia-goldDark bg-orisia-gold px-4 font-sans text-[11px] font-black uppercase tracking-wide text-white hover:bg-orisia-goldDark" onClick={() => saveConsent("all")}>{text.accept}</button>
      </div>
    </aside>
  );
}
