"use client";

import Link from "next/link";
import useLanguage from "./useLanguage";

export default function Footer() {
  const language = useLanguage();
  const isBg = language === "bg";
  const linkClass = "text-sm text-[#765f4b] transition hover:text-orisia-goldDark dark:text-[#b9a184] dark:hover:text-orisia-light";

  return (
    <footer className="border-t border-[#d5c4ae] bg-[#f6efe4] font-sans text-orisia-brown dark:border-[#4a3d34] dark:bg-[#0f0906] dark:text-orisia-light">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.9fr_1.1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-block" aria-label={isBg ? "ОРИСИЯ - Начало" : "ORISIA - Home"}>
            <img src="/orisia-logo.svg" alt={isBg ? "ОРИСИЯ" : "ORISIA"} className="h-16 w-16 rounded object-cover" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#765f4b] dark:text-[#a58d71]">
            {isBg ? "Български фолклор, танц, традиция и общност с характер." : "Bulgarian folklore, dance, tradition and community with character."}
          </p>
          <a href="#" className="mt-5 grid h-10 w-10 place-items-center rounded-full bg-black text-xl font-bold text-white" aria-label="Facebook" title="Facebook">f</a>
        </div>

        <div>
          <strong className="mb-4 block text-sm font-bold text-[#3f2b1d] dark:text-orisia-light">{isBg ? "Страници" : "Pages"}</strong>
          <nav className="flex flex-col items-start gap-3" aria-label={isBg ? "Страници във футъра" : "Footer pages"}>
            <Link className={linkClass} href="/">{isBg ? "Начало" : "Home"}</Link>
            <Link className={linkClass} href="/about">{isBg ? "За нас" : "About us"}</Link>
            <Link className={linkClass} href="/gallery">{isBg ? "Галерия" : "Gallery"}</Link>
            <Link className={linkClass} href="/horoteka">{isBg ? "Хоротека" : "Dance Library"}</Link>
            <Link className={linkClass} href="/contact">{isBg ? "Контакти" : "Contacts"}</Link>
          </nav>
        </div>

        <div>
          <strong className="mb-4 block text-sm font-bold text-[#3f2b1d] dark:text-orisia-light">{isBg ? "Информация" : "Information"}</strong>
          <div className="flex flex-col gap-3">
            <span className={linkClass}>{isBg ? "Политика за поверителност" : "Privacy policy"}</span>
            <span className={linkClass}>{isBg ? "Общи условия" : "Terms and conditions"}</span>
            <span className={linkClass}>{isBg ? "Бисквитки" : "Cookies"}</span>
          </div>
        </div>

        <div>
          <strong className="mb-4 block text-sm font-bold text-[#3f2b1d] dark:text-orisia-light">{isBg ? "Контакти" : "Contacts"}</strong>
          <div className="flex items-start gap-3 text-sm leading-6 text-[#765f4b] dark:text-[#b9a184]"><span aria-hidden="true">⌖</span><span>{isBg ? "гр. Русе, ул. Родина 80, 7000" : "80 Rodina St., Ruse, Bulgaria, 7000"}</span></div>
          <Link href="/contact" className="mt-4 flex items-center gap-3 text-sm text-[#765f4b] transition hover:text-orisia-goldDark dark:text-[#b9a184] dark:hover:text-orisia-light"><span aria-hidden="true">✉</span><span>{isBg ? "Изпрати запитване" : "Send an inquiry"}</span></Link>
        </div>
      </div>

      <div className="mx-auto h-px w-[calc(100%-3rem)] max-w-7xl bg-[#d5c4ae] dark:bg-[#4a3d34]" />
      <div className="mx-auto flex min-h-16 w-full max-w-7xl flex-col justify-center gap-2 px-6 py-4 text-xs text-[#7b6857] sm:flex-row sm:items-center sm:justify-between lg:px-8 dark:text-[#8f7b66]">
        <span>{isBg ? "© 2026 ОРИСИЯ. Всички права запазени." : "© 2026 ORISIA. All rights reserved."}</span>
        <span>Site created by <a className="font-bold text-[#4c3929] hover:underline dark:text-[#c9b08f]" href="https://viktor-iliev.site/portfolio/" target="_blank" rel="noreferrer">Viktor Iliev</a></span>
      </div>
    </footer>
  );
}
