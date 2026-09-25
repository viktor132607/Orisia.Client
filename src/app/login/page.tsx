"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api, saveSession } from "../../lib/api";
import useLanguage from "../../components/useLanguage";

export default function Page() {
  const router = useRouter(); const isBg = useLanguage() === "bg"; const [error, setError] = useState(""); const [loading, setLoading] = useState(false);
  const input = "min-h-12 w-full border border-orisia-line bg-white px-3 font-sans text-sm outline-none focus:border-orisia-goldDark dark:border-[#604a39] dark:bg-[#130b07]";
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault(); setLoading(true); setError(""); const data = new FormData(event.currentTarget);
    try { const token = await api.auth.login({ email: String(data.get("email")), password: String(data.get("password")) }); saveSession(token); router.push(token.role === "Admin" || token.role === "Editor" ? "/admin/" : "/account/"); } catch (e) { setError(e instanceof Error ? e.message : "Login failed"); } finally { setLoading(false); }
  }
  return <main className="grid min-h-[70vh] place-items-center bg-orisia-cream px-4 py-12 dark:bg-orisia-dark"><form onSubmit={submit} className="w-full max-w-md border border-orisia-line bg-orisia-paper p-7 shadow-soft dark:bg-orisia-panel"><h1 className="text-4xl font-bold">{isBg ? "Вход" : "Login"}</h1><div className="mt-6 grid gap-4"><input name="email" required type="email" className={input} placeholder="name@example.com" /><input name="password" required type="password" className={input} placeholder={isBg ? "Парола" : "Password"} />{error && <p className="font-sans text-sm text-red-700">{error}</p>}</div><button disabled={loading} className="mt-5 w-full bg-orisia-gold px-5 py-3 font-sans text-xs font-black uppercase text-white disabled:opacity-60">{loading ? (isBg ? "Вход…" : "Logging in…") : (isBg ? "Вход" : "Login")}</button><p className="mt-5 text-center font-sans text-xs">{isBg ? "Нямате профил? " : "No account? "}<Link className="font-bold text-orisia-goldDark" href="/register/">{isBg ? "Регистрация" : "Register"}</Link></p></form></main>;
}
