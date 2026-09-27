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
    <main className="admin-login flex items-center justify-center px-4 py-16">
      <form onSubmit={submit} className="admin-login-card w-full max-w-[440px] rounded-xl bg-white p-7 md:p-10">
        <span className="inline-grid h-10 w-10 place-items-center rounded-lg bg-[#153a3a] font-serif text-2xl font-bold text-[#67dcaf]">О</span>
        <span className="ml-3 text-xs font-black uppercase tracking-[.16em] text-[#1b7163]">ОРИСИЯ</span>
        <h1 className="mt-4 text-3xl font-black uppercase">{isBg ? "Админ вход" : "Admin login"}</h1>
        <p className="mt-2 text-sm text-[#697c80]">{isBg ? "Достъп до работното пространство" : "Access the administration workspace"}</p>
        <label className="mt-8 block text-sm font-bold" htmlFor="admin-email">Email</label>
        <input id="admin-email" name="email" type="email" required autoComplete="username" className="mt-2 min-h-12 w-full rounded-md border border-[#cbd8dc] bg-white px-4 outline-none focus:border-[#0a7564]" />
        <label className="mt-5 block text-sm font-bold" htmlFor="admin-password">{isBg ? "Парола" : "Password"}</label>
        <input id="admin-password" name="password" type="password" required autoComplete="current-password" className="mt-2 min-h-12 w-full rounded-md border border-[#cbd8dc] bg-white px-4 outline-none focus:border-[#0a7564]" />
        <button disabled={loading} className="mt-6 w-full rounded-md bg-[#0a7564] px-6 py-3 font-bold text-white transition hover:bg-[#095a4e] disabled:opacity-50">{loading ? (isBg ? "Проверка…" : "Checking…") : (isBg ? "Вход" : "Login")}</button>
        {error && <p role="alert" className="mt-5 rounded-xl border border-red-300 bg-red-50 p-3 text-sm text-red-700">{error}</p>}
      </form>
    </main>
  );
}
