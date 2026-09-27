"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, clearSession, hasSession, saveSession } from "../../lib/api";
import useLanguage from "../../components/useLanguage";

export default function AdminLogin() {
  const router = useRouter();
  const isBg = useLanguage() === "bg";
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hasSession()) return;
    api.auth.me().then((user) => {
      if (user.role === "Admin" || user.role === "Editor") router.replace("/admin/");
      else clearSession();
    }).catch(clearSession);
  }, [router]);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const data = new FormData(event.currentTarget);
    try {
      const token = await api.auth.login({ email: String(data.get("email")), password: String(data.get("password")) });
      saveSession(token);
      const user = await api.auth.me();
      if (user.role !== "Admin" && user.role !== "Editor") {
        clearSession();
        setError(isBg ? "Този профил няма администраторски достъп." : "This account has no admin access.");
        return;
      }
      router.replace("/admin/");
    } catch (e) {
      clearSession();
      setError(e instanceof Error ? e.message : (isBg ? "Неуспешен вход." : "Login failed."));
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="flex min-h-[70vh] items-center justify-center bg-[#faf8f5] px-4 py-16 font-sans text-orisia-ink">
      <form onSubmit={submit} className="w-full max-w-[440px] rounded-2xl border border-orisia-line/55 bg-white p-7 shadow-[0_14px_38px_rgba(75,46,27,.08)] md:p-10">
        <span className="text-xs font-black uppercase tracking-[.16em] text-orisia-goldDark">ОРИСИЯ</span>
        <h1 className="mt-4 text-3xl font-black uppercase">{isBg ? "Админ вход" : "Admin login"}</h1>
        <label className="mt-8 block text-sm font-bold" htmlFor="admin-email">Email</label>
        <input id="admin-email" name="email" type="email" required autoComplete="username" className="mt-2 min-h-12 w-full rounded-xl border border-orisia-line/55 bg-white px-4 outline-none focus:border-orisia-goldDark" />
        <label className="mt-5 block text-sm font-bold" htmlFor="admin-password">{isBg ? "Парола" : "Password"}</label>
        <input id="admin-password" name="password" type="password" required autoComplete="current-password" className="mt-2 min-h-12 w-full rounded-xl border border-orisia-line/55 bg-white px-4 outline-none focus:border-orisia-goldDark" />
        <button disabled={loading} className="mt-6 w-full rounded-xl bg-orisia-goldDark px-6 py-3 font-bold text-white transition hover:bg-[#754725] disabled:opacity-50">{loading ? (isBg ? "Проверка…" : "Checking…") : (isBg ? "Вход" : "Login")}</button>
        {error && <p role="alert" className="mt-5 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      </form>
    </main>
  );
}
