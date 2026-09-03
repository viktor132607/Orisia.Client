"use client";

import Link from "next/link";
import useLanguage from "./useLanguage";

export default function Footer() {
  const language = useLanguage();
  const isBg = language === "bg";
  const linkClass = "text-sm text-[#c9b8a8] transition hover:text-white";

  return (
    <footer className="border-t border-[#554b47] bg-[#1B191A] font-sans text-orisia-light">
      <div className="mx-auto grid w-full max-w-7xl gap-10 px-6 py-12 md:grid-cols-2 lg:grid-cols-[1.4fr_.8fr_.9fr_1.1fr] lg:px-8">
        <div>
          <Link href="/" className="inline-block" aria-label={isBg ? "ОРИСИЯ - Начало" : "ORISIA - Home"}>
            <img src="/orisia-logo.png" alt={isBg ? "ОРИСИЯ" : "ORISIA"} className="h-16 w-16 object-contain" />
          </Link>
          <p className="mt-4 max-w-sm text-sm leading-6 text-[#b9a184]">
            {isBg ? "Български фолклор, танц, традиция и общност с характер." : "Bulgarian folklore, dance, tradition and community with character."}
          </p>
          <a href="#" className="mt-5 grid h-10 w-10 place-items-center rounded-full border border-[#554b47] bg-[#262223] text-xl font-bold text-white transition hover:border-orisia-gold" aria-label="Facebook" title="Facebook">f</a>
        </div>

        <div>
          <strong className="mb-4 block text-sm font-bold text-orisia-light">{isBg ? "Страници" : "Pages"}</strong>
          <nav className="flex flex-col items-start gap-3" aria-label={isBg ? "Страници във футъра" : "Footer pages"}>
            <Link className={linkClass} href="/">{isBg ? "Начало" : "Home"}</Link>
            <Link className={linkClass} href="/news">{isBg ? "Новини" : "News"}</Link>
            <Link className={linkClass} href="/events">{isBg ? "Събития" : "Events"}</Link>
            <Link className={linkClass} href="/about">{isBg ? "За нас" : "About us"}</Link>
            <Link className={linkClass} href="/gallery">{isBg ? "Галерия" : "Gallery"}</Link>
            <Link className={linkClass} href="/horoteka">{isBg ? "Хоротека" : "Dance Library"}</Link>
            <Link className={linkClass} href="/contact">{isBg ? "Контакти" : "Contacts"}</Link>
          </nav>
        </div>

        <div>
          <strong className="mb-4 block text-sm font-bold text-orisia-light">{isBg ? "Информация" : "Information"}</strong>
          <nav className="flex flex-col items-start gap-3" aria-label={isBg ? "Правна информация" : "Legal information"}>
            <Link className={linkClass} href="/privacy">{isBg ? "Политика за поверителност" : "Privacy policy"}</Link>
            <Link className={linkClass} href="/terms">{isBg ? "Общи условия" : "Terms and conditions"}</Link>
            <Link className={linkClass} href="/cookies">{isBg ? "Бисквитки" : "Cookies"}</Link>
          </nav>
        </div>

        <div>
          <strong className="mb-4 block text-sm font-bold text-orisia-light">{isBg ? "Контакти" : "Contacts"}</strong>
          <div className="flex items-start gap-3 text-sm leading-6 text-[#c9b8a8]"><span aria-hidden="true">⌖</span><span>{isBg ? "гр. Русе, ул. Родина 80 (на гърба на боулинг залата), Русе, България, 7000" : "80 Rodina St. (behind the bowling hall), Ruse, Bulgaria, 7000"}</span></div>
          <Link href="/contact" className="mt-4 flex items-center gap-3 text-sm text-[#c9b8a8] transition hover:text-white"><span aria-hidden="true">✉</span><span>{isBg ? "Изпрати запитване" : "Send an inquiry"}</span></Link>
        </div>
      </div>

      <div className="mx-auto h-px w-[calc(100%_-_3rem)] max-w-7xl bg-[#554b47]" />
      <div className="mx-auto flex min-h-16 w-full max-w-7xl flex-col justify-center gap-2 px-6 py-4 text-xs text-[#9e8b7b] sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>{isBg ? "© 2026 ОРИСИЯ. Всички права запазени." : "© 2026 ORISIA. All rights reserved."}</span>
        <span>Site created by <a className="font-bold text-[#d9c7b4] hover:text-white hover:underline" href="https://viktor-iliev.site/portfolio/" target="_blank" rel="noreferrer">Viktor Iliev</a></span>
      </div>
    </footer>
  );
}
