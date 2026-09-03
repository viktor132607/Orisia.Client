"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useLanguage from "../../components/useLanguage";

export default function Page() {
  const router = useRouter(); const language = useLanguage(); const isBg = language === "bg";
  const inputClass = "min-h-12 w-full border border-orisia-line bg-white px-3 font-sans text-sm text-orisia-brown outline-none focus:border-orisia-goldDark dark:border-[#604a39] dark:bg-[#130b07] dark:text-orisia-light";
  return <main className="grid min-h-[70vh] place-items-center bg-orisia-cream px-4 py-12 dark:bg-orisia-dark"><form className="w-full max-w-md border border-orisia-line bg-orisia-paper p-7 shadow-soft dark:border-[#604a39] dark:bg-orisia-panel" onSubmit={(event)=>{event.preventDefault();router.push("/account");}}><h1 className="text-4xl font-bold">{isBg?"Регистрация":"Register"}</h1><div className="mt-6 grid gap-4"><div className="grid gap-2"><label className="font-sans text-xs font-bold">{isBg?"Име":"Name"}</label><input className={inputClass} placeholder={isBg?"Име":"Name"} /></div><div className="grid gap-2"><label className="font-sans text-xs font-bold">{isBg?"Имейл":"Email"}</label><input className={inputClass} type="email" placeholder="name@example.com" /></div><div className="grid gap-2"><label className="font-sans text-xs font-bold">{isBg?"Парола":"Password"}</label><input className={inputClass} type="password" placeholder={isBg?"Парола":"Password"} /></div></div><button className="mt-5 w-full border border-orisia-goldDark bg-orisia-gold px-5 py-3 font-sans text-xs font-black uppercase tracking-wide text-white hover:bg-orisia-goldDark" type="submit">{isBg?"Регистрация":"Register"}</button><div className="mt-5 text-center font-sans text-xs text-[#725b47] dark:text-[#a98c69]">{isBg?"Вече сте регистрирани? ":"Already registered? "}<Link className="font-bold text-orisia-goldDark hover:underline" href="/login">{isBg?"Вход":"Login"}</Link></div></form></main>;
}
