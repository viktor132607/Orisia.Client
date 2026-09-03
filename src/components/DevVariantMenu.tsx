"use client";

import { useEffect, useState } from "react";
import useLanguage from "./useLanguage";

const AUTH_KEY = "orisia-dev-auth";
type AuthRole = "guest" | "user" | "admin";

function readRole(value: string | null): AuthRole {
  if (value === "admin") return "admin";
  if (value === "logged-in" || value === "user") return "user";
  return "guest";
}

function setAuthVariant(role: AuthRole) {
  const storageValue = role === "guest" ? "logged-out" : role;
  window.localStorage.setItem(AUTH_KEY, storageValue);
  window.dispatchEvent(new CustomEvent("orisia-auth-change", { detail: { role, loggedIn: role !== "guest", isAdmin: role === "admin" } }));
}

export default function DevVariantMenu() {
  const [open, setOpen] = useState(true);
  const [role, setRole] = useState<AuthRole>("guest");
  const language = useLanguage();
  const isBg = language === "bg";

  useEffect(() => {
    setRole(readRole(window.localStorage.getItem(AUTH_KEY)));
    if (window.matchMedia("(max-width: 760px)").matches) setOpen(false);
  }, []);

  const changeVariant = (next: AuthRole) => {
    setRole(next);
    setAuthVariant(next);
  };

  const status = role === "admin" ? (isBg ? "Администратор" : "Administrator") : role === "user" ? (isBg ? "Логнат потребител" : "Logged-in user") : (isBg ? "Гост / излогнат" : "Guest / logged out");
  const optionClass = "w-full rounded-sm border border-[#704823] px-3 py-2 text-left font-sans text-xs font-bold text-[#e6c998] transition hover:bg-[#3d2516]";

  return (
    <div className="fixed left-0 top-24 z-[60] flex items-start">
      <aside className={`overflow-hidden border-y border-r border-[#704823] bg-[#24140c] text-[#e8d4ad] shadow-soft transition-all duration-300 ${open ? "w-[270px] p-5 opacity-100" : "w-0 border-0 p-0 opacity-0"}`} aria-hidden={!open}>
        <div className="border-b border-[#704823] pb-4">
          <span className="font-sans text-[10px] font-black tracking-[.2em] text-[#d2a25e]">DEV MENU</span>
          <strong className="mt-1 block text-xl">{isBg ? "Вариант на сайта" : "Site variant"}</strong>
        </div>
        <div className="py-4">
          <span className="font-sans text-[10px] font-black uppercase tracking-[.18em] text-[#b98549]">{isBg ? "Текущо състояние" : "Current state"}</span>
          <strong className="mt-1 block text-sm">{status}</strong>
        </div>
        <div className="grid gap-2">
          <button type="button" className={`${optionClass} ${role === "guest" ? "bg-[#754724] text-white" : "bg-[#1b100a]"}`} onClick={() => changeVariant("guest")}>{isBg ? "Не съм логнат" : "Logged out"}</button>
          <button type="button" className={`${optionClass} ${role === "user" ? "bg-[#754724] text-white" : "bg-[#1b100a]"}`} onClick={() => changeVariant("user")}>{isBg ? "Логнат потребител" : "Logged-in user"}</button>
          <button type="button" className={`${optionClass} ${role === "admin" ? "bg-[#754724] text-white" : "bg-[#1b100a]"}`} onClick={() => changeVariant("admin")}>{isBg ? "Администратор" : "Administrator"}</button>
        </div>
        <p className="mt-4 font-sans text-[11px] leading-5 text-[#9c8063]">{isBg ? "Профилът на нормален потребител е отделен от администраторския достъп." : "A regular user profile is separate from administrator access."}</p>
      </aside>
      <button type="button" className="grid h-10 w-8 place-items-center border border-[#8a5a2c] bg-[#8e5b32] text-xl text-white shadow-soft" onClick={() => setOpen((value) => !value)} aria-expanded={open} aria-label={open ? (isBg ? "Скрий временното меню" : "Hide temporary menu") : (isBg ? "Покажи временното меню" : "Show temporary menu")}>{open ? "‹" : "›"}</button>
    </div>
  );
}
