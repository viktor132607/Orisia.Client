"use client";

import { FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api, clearSession, type UserResponse } from "../../lib/api";
import useLanguage from "../../components/useLanguage";
import PublicPageHeader from "../../components/PublicPageHeader";

export default function Page() {
  const router = useRouter();
  const isBg = useLanguage() === "bg";
  const [user, setUser] = useState<UserResponse | null>(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const input = "min-h-11 w-full rounded-xl border border-orisia-line/55 bg-white px-4 font-sans text-sm text-orisia-ink outline-none transition focus:border-orisia-goldDark";

  useEffect(() => {
    api.auth.me().then((current) => {
      if (current.role !== "Admin" && current.role !== "Editor") {
        router.replace("/adminlogin/");
        return;
      }
      setUser(current);
    }).catch(() => { clearSession(); router.replace("/adminlogin/"); });
  }, [router]);

  async function profile(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      const updated = await api.auth.updateMe({
        names: String(data.get("names")),
        email: String(data.get("email")),
        phone: String(data.get("phone")),
      });
      setUser(updated);
      setMessage(isBg ? "Профилът е обновен." : "Profile updated.");
      setError("");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  }

  async function password(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    try {
      await api.auth.changePassword({
        currentPassword: String(data.get("currentPassword")),
        newPassword: String(data.get("newPassword")),
      });
      setMessage(isBg ? "Паролата е сменена. Влезте отново." : "Password changed. Sign in again.");
      clearSession();
      setTimeout(() => router.push("/adminlogin/"), 500);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  }

  async function deactivate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (!confirm(isBg ? "Да деактивирам ли профила?" : "Deactivate account?")) return;

    try {
      await api.auth.deactivate(String(data.get("deactivatePassword")));
      clearSession();
      router.push("/");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Error");
    }
  }

  if (!user) {
    return <main className="grid min-h-[60vh] place-items-center bg-[#faf8f5] font-sans text-orisia-ink"><p>{isBg ? "Зареждане…" : "Loading…"}</p></main>;
  }

  return (
    <main className="min-h-[70vh] bg-[#faf8f5] font-sans text-orisia-ink">
      <PublicPageHeader
        eyebrow="ОРИСИЯ"
        title={isBg ? "Профил" : "Profile"}
        description={isBg ? "Управление на личните данни, паролата и достъпа до профила." : "Manage your personal details, password and account access."}
      />

      <section className="py-12 md:py-20">
        <div className="mx-auto grid w-[min(1180px,calc(100%_-_40px))] gap-6 lg:grid-cols-2 max-[620px]:w-[min(100%_-_28px,1180px)]">
          <section className="rounded-[24px] border border-orisia-line/45 bg-white p-7 shadow-[0_8px_26px_rgba(75,46,27,.04)] md:p-9">
            <span className="text-[11px] font-black uppercase tracking-[.15em] text-orisia-goldDark">{user.role}</span>
            <h2 className="mt-2 text-3xl font-black uppercase">{isBg ? "Лични данни" : "Personal details"}</h2>
            <form onSubmit={profile} className="mt-6 grid gap-3">
              <input name="names" defaultValue={user.names} required className={input} />
              <input name="email" defaultValue={user.email} type="email" required className={input} />
              <input name="phone" defaultValue={user.phone} required className={input} />
              <button className="rounded-xl bg-orisia-goldDark px-4 py-3 font-bold text-white transition hover:bg-[#754725]">{isBg ? "Запази" : "Save"}</button>
            </form>
            <button onClick={() => api.auth.logout().finally(() => router.push("/"))} className="mt-4 rounded-xl border border-orisia-line px-4 py-2 text-sm font-bold transition hover:border-orisia-goldDark hover:text-orisia-goldDark">{isBg ? "Изход" : "Logout"}</button>
          </section>

          <section className="grid gap-6">
            <div className="rounded-[24px] border border-orisia-line/45 bg-white p-7 shadow-[0_8px_26px_rgba(75,46,27,.04)] md:p-9">
              <h2 className="text-2xl font-black uppercase">{isBg ? "Смяна на парола" : "Change password"}</h2>
              <form onSubmit={password} className="mt-5 grid gap-3">
                <input name="currentPassword" type="password" required className={input} placeholder={isBg ? "Текуща парола" : "Current password"} />
                <input name="newPassword" type="password" minLength={8} required className={input} placeholder={isBg ? "Нова парола" : "New password"} />
                <button className="rounded-xl border border-orisia-goldDark px-4 py-3 font-bold text-orisia-goldDark transition hover:bg-[#f7efe6]">{isBg ? "Смени" : "Change"}</button>
              </form>
            </div>

            {user.role !== "Admin" && (
              <div className="rounded-[24px] border border-red-300 bg-red-50 p-7 md:p-9">
                <h2 className="text-2xl font-black uppercase">{isBg ? "Деактивиране" : "Deactivate account"}</h2>
                <form onSubmit={deactivate} className="mt-4 grid gap-3">
                  <input name="deactivatePassword" type="password" required className={input} placeholder={isBg ? "Потвърди с парола" : "Confirm with password"} />
                  <button className="rounded-xl border border-red-600 px-4 py-3 font-bold text-red-700">{isBg ? "Деактивирай" : "Deactivate"}</button>
                </form>
              </div>
            )}
          </section>

          {message && <p className="rounded-xl border border-green-300 bg-green-50 px-4 py-3 text-sm text-green-700 lg:col-span-2">{message}</p>}
          {error && <p className="rounded-xl border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700 lg:col-span-2">{error}</p>}
        </div>
      </section>
    </main>
  );
}
