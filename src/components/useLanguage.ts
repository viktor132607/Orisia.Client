"use client";

import { useEffect, useState } from "react";

export type Language = "bg" | "en";
export const LANGUAGE_KEY = "orisia-language";

export default function useLanguage() {
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

    readLanguage();
    window.addEventListener("orisia-language-change", handleLanguage);
    window.addEventListener("storage", handleStorage);

    return () => {
      window.removeEventListener("orisia-language-change", handleLanguage);
      window.removeEventListener("storage", handleStorage);
    };
  }, []);

  return language;
}
