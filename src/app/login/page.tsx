"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import useLanguage from "../../components/useLanguage";

export default function Page() {
  const router = useRouter();
  const language = useLanguage();
  const isBg = language === "bg";

  return (
    <main className="page">
      <div className="container auth-wrap">
        <form className="auth-card" onSubmit={(event) => { event.preventDefault(); router.push("/account"); }}>
          <h1>{isBg ? "Вход" : "Login"}</h1>
          <div className="field"><label>{isBg ? "Имейл" : "Email"}</label><input type="email" placeholder="name@example.com" /></div>
          <div className="field"><label>{isBg ? "Парола" : "Password"}</label><input type="password" placeholder={isBg ? "Парола" : "Password"} /></div>
          <button className="primary-btn" type="submit">{isBg ? "Вход" : "Login"}</button>
          <div className="auth-switch">{isBg ? "Нямате профил? " : "No account? "}<Link href="/register">{isBg ? "Регистрация" : "Register"}</Link></div>
        </form>
      </div>
    </main>
  );
}
