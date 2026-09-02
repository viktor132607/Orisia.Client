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
          <h1>{isBg ? "Регистрация" : "Register"}</h1>
          <div className="field"><label>{isBg ? "Име" : "Name"}</label><input placeholder={isBg ? "Име" : "Name"} /></div>
          <div className="field"><label>{isBg ? "Имейл" : "Email"}</label><input type="email" placeholder="name@example.com" /></div>
          <div className="field"><label>{isBg ? "Парола" : "Password"}</label><input type="password" placeholder={isBg ? "Парола" : "Password"} /></div>
          <button className="primary-btn" type="submit">{isBg ? "Регистрация" : "Register"}</button>
          <div className="auth-switch">{isBg ? "Вече сте регистрирани? " : "Already registered? "}<Link href="/login">{isBg ? "Вход" : "Login"}</Link></div>
        </form>
      </div>
    </main>
  );
}
