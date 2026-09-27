"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { api, saveSession } from "../../lib/api";
import useLanguage from "../../components/useLanguage";

export default function Page() {
  const router = useRouter();
  const isBg = useLanguage() === "bg";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const input = "min-h-12 w-full rounded-xl border border-orisia-line/55 bg-white px-4 font-sans text-sm text-orisia-ink outline-none transition focus:border-orisia-goldDark";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(event.currentTarget);
    const body = { names: String(data.get("names")), email: String(data.get("email")), phone: String(data.get("phone")), password: String(data.get("password")) };
    try {
      await api.auth.register(body);
      const token = await api.auth.login({ email: body.email, password: body.password });
      saveSession(token);
      router.push("/account/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Registration failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-[70vh] bg-[#faf8f5] px-4 py-14 font-sans text-orisia-ink md:py-20">
      <div className="mx-auto grid max-w-5xl overflow-hidden rounded-[24px] border border-orisia-line/45 bg-white shadow-[0_12px_36px_rgba(75,46,27,.08)] lg:grid-cols-[.9fr_1.1fr]">
        <section className="flex items-center justify-center bg-[radial-gradient(circle_at_70%_25%,#fffaf3,transparent_45%),linear-gradient(145deg,#f2eee8,#e1d8cc)] p-10">
          <div className="text-center">
            <img src="/orisia-logo.jpg" alt="" className="mx-auto h-40 w-40 rounded-full border-4 border-orisia-line bg-white object-cover shadow-[0_16px_40px_rgba(75,46,27,.15)]" />
            <p className="mt-5 text-xs font-black uppercase tracking-[.18em] text-orisia-goldDark">{isBg ? "Даскало за фолклор · Русе" : "Folklore school · Ruse"}</p>
          </div>
        </section>
        <form onSubmit={submit} className="p-7 sm:p-10">
          <span className="text-[11px] font-black uppercase tracking-[.16em] text-orisia-goldDark">ОРИСИЯ</span>
          <h1 className="mt-2 text-4xl font-black uppercase">{isBg ? "Регистрация" : "Register"}</h1>
          <div className="mt-7 grid gap-4">
            <input name="names" required minLength={2} className={input} placeholder={isBg ? "Име" : "Name"} />
            <input name="email" required type="email" className={input} placeholder="Email" />
            <input name="phone" required className={input} placeholder={isBg ? "Телефон" : "Phone"} />
            <input name="password" required minLength={8} type="password" className={input} placeholder={isBg ? "Парола (мин. 8 символа)" : "Password (min. 8 characters)"} />
            {error && <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">{error}</p>}
          </div>
          <button disabled={loading} className="mt-5 w-full rounded-xl bg-orisia-goldDark px-5 py-3 font-bold text-white transition hover:bg-[#754725] disabled:opacity-60">{loading ? (isBg ? "Регистрация…" : "Registering…") : (isBg ? "Регистрация" : "Register")}</button>
          <p className="mt-5 text-center text-sm text-[#6b5847]">{isBg ? "Вече сте регистрирани? " : "Already registered? "}<Link className="font-bold text-orisia-goldDark hover:underline" href="/login/">{isBg ? "Вход" : "Login"}</Link></p>
        </form>
      </div>
    </main>
  );
}
