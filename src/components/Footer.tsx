"use client";

import Link from "next/link";
import useLanguage, { useLocalizedPath } from "./useLanguage";

export default function Footer() {
  const isBg = useLanguage() === "bg";
  const href = useLocalizedPath();
  const linkClass = "text-[13px] leading-5 text-[#c9b8a8] transition hover:text-white";

  return (
    <footer className="border-t border-[#554b47] bg-[#1B191A] font-sans text-orisia-light">
      <div className="mx-auto grid w-full max-w-7xl gap-7 px-6 py-7 md:grid-cols-[1.1fr_1.35fr_1fr] lg:px-8">
        <div>
          <Link href={href("/")} className="inline-block" aria-label={isBg ? "ОРИСИЯ - Начало" : "ORISIA - Home"}>
            <img src="/orisia-logo.jpg" alt={isBg ? "ОРИСИЯ" : "ORISIA"} className="h-12 w-12 object-contain" width={48} height={48} loading="lazy" decoding="async" />
          </Link>
          <p className="mt-3 max-w-xs text-[13px] leading-5 text-[#b9a184]">
            {isBg ? "Даскало за фолклор „ОРИСИЯ“ — Русе" : "ORISIA Folklore School — Ruse"}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-[1.35fr_.9fr]">
          <div>
            <strong className="mb-3 block text-xs font-bold text-orisia-light">{isBg ? "Страници" : "Pages"}</strong>
            <nav className="grid grid-cols-2 gap-x-5 gap-y-2" aria-label={isBg ? "Страници във футъра" : "Footer pages"}>
              <Link className={linkClass} href={href("/")}>{isBg ? "Начало" : "Home"}</Link>
              <Link className={linkClass} href={href("/news/")}>{isBg ? "Новини" : "News"}</Link>
              <Link className={linkClass} href={href("/events/")}>{isBg ? "Събития" : "Events"}</Link>
              <Link className={linkClass} href={href("/calendar/")}>{isBg ? "Календар" : "Calendar"}</Link>
              <Link className={linkClass} href={href("/groups/")}>{isBg ? "Групи" : "Groups"}</Link>
              <Link className={linkClass} href={href("/gallery/")}>{isBg ? "Галерия" : "Gallery"}</Link>
              <Link className={linkClass} href={href("/horoteka/")}>{isBg ? "Хоротека" : "Dance Library"}</Link>
              <Link className={linkClass} href={href("/about/")}>{isBg ? "За нас" : "About us"}</Link>
              <Link className={linkClass} href={href("/contact/")}>{isBg ? "Контакти" : "Contacts"}</Link>
            </nav>
          </div>

          <div>
            <strong className="mb-3 block text-xs font-bold text-orisia-light">{isBg ? "Информация" : "Information"}</strong>
            <nav className="grid gap-2" aria-label={isBg ? "Правна информация" : "Legal information"}>
              <Link className={linkClass} href={href("/privacy/")}>{isBg ? "Поверителност" : "Privacy"}</Link>
              <Link className={linkClass} href={href("/terms/")}>{isBg ? "Общи условия" : "Terms"}</Link>
              <Link className={linkClass} href={href("/cookies/")}>{isBg ? "Бисквитки" : "Cookies"}</Link>
            </nav>
          </div>
        </div>

        <div>
          <strong className="mb-3 block text-xs font-bold text-orisia-light">{isBg ? "Контакти" : "Contacts"}</strong>
          <div className="flex items-start gap-2 text-[13px] leading-5 text-[#c9b8a8]"><span aria-hidden="true">⌖</span><span>{isBg ? "гр. Русе, ул. Родина 80, Русе 7000" : "80 Rodina St., Ruse 7000"}</span></div>
          <Link href={href("/contact/")} className="mt-3 flex items-center gap-2 text-[13px] text-[#c9b8a8] transition hover:text-white"><span aria-hidden="true">✉</span><span>{isBg ? "Изпрати запитване" : "Send an inquiry"}</span></Link>
        </div>
      </div>

      <div className="mx-auto h-px w-[calc(100%_-_3rem)] max-w-7xl bg-[#554b47]" />
      <div className="mx-auto flex min-h-12 w-full max-w-7xl flex-col justify-center gap-1 px-6 py-3 text-[11px] text-[#9e8b7b] sm:flex-row sm:items-center sm:justify-between lg:px-8">
        <span>{isBg ? "© 2026 ОРИСИЯ. Всички права запазени." : "© 2026 ORISIA. All rights reserved."}</span>
        <span>Site created by <a className="font-bold text-[#d9c7b4] hover:text-white hover:underline" href="https://viktor-iliev.site/portfolio/" target="_blank" rel="noreferrer">Viktor Iliev</a></span>
      </div>
    </footer>
  );
}
