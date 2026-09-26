"use client";

import { FormEvent, useState } from "react";
import { api } from "../../lib/api";
import useLanguage from "../../components/useLanguage";

export default function ContactPage() {
  const isBg = useLanguage() === "bg";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const input = "min-h-12 w-full border border-orisia-line bg-[#fffaf3] px-4 font-sans text-sm text-orisia-brown placeholder:text-[#9a806b] outline-none transition focus:border-orisia-goldDark dark:border-[#604a39] dark:bg-[#130b07] dark:text-orisia-light dark:placeholder:text-[#8f7d6e]";

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    const form = new FormData(event.currentTarget);

    try {
      await api.inquiries.submit({
        name: form.get("name"),
        email: form.get("email"),
        phone: form.get("phone") || null,
        subject: form.get("subject"),
        message: form.get("message"),
      });
      event.currentTarget.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  return (
    <main className="bg-orisia-cream dark:bg-orisia-dark">
      <header className="border-b border-orisia-line bg-[#e8d5bb] py-14 dark:bg-[#1a100a]">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <p className="font-sans text-xs font-black uppercase tracking-[.18em] text-orisia-goldDark">ОРИСИЯ</p>
          <h1 className="mt-2 text-5xl font-bold uppercase sm:text-6xl">{isBg ? "Контакти" : "Contacts"}</h1>
          <p className="mt-3 font-sans text-sm text-[#725b47] dark:text-[#c9b8a8]">{isBg ? "Свържете се с нас" : "Get in touch with us"}</p>
        </div>
      </header>

      <section className="py-12">
        <div className="mx-auto grid max-w-7xl gap-6 px-4 lg:grid-cols-2">
          <section className="border border-orisia-line bg-orisia-paper p-7 dark:border-[#604a39] dark:bg-orisia-panel">
            <span className="font-sans text-[10px] font-black uppercase tracking-[.16em] text-orisia-goldDark">{isBg ? "Адрес" : "Address"}</span>
            <h2 className="mt-2 text-3xl font-bold">{isBg ? "Къде да ни намерите" : "Where to find us"}</h2>
            <address className="mt-4 not-italic font-sans text-sm leading-6 text-[#725b47] dark:text-[#c9b8a8]">
              {isBg ? "гр. Русе, ул. Родина 80, на гърба на боулинг залата, Русе, България, 7000" : "80 Rodina St., behind the bowling hall, Ruse, Bulgaria, 7000"}
            </address>
            <iframe
              className="mt-6 h-[360px] w-full border-0"
              title="ORISIA map"
              src="https://www.google.com/maps?q=%D0%B3%D1%80.%20%D0%A0%D1%83%D1%81%D0%B5%2C%20%D1%83%D0%BB.%20%D0%A0%D0%BE%D0%B4%D0%B8%D0%BD%D0%B0%2080&output=embed"
              loading="lazy"
            />
          </section>

          <form onSubmit={submit} className="border border-orisia-line bg-orisia-paper p-7 dark:border-[#604a39] dark:bg-orisia-panel">
            <span className="font-sans text-[10px] font-black uppercase tracking-[.16em] text-orisia-goldDark">{isBg ? "Пишете ни" : "Message us"}</span>
            <h2 className="mt-2 text-3xl font-bold">{isBg ? "Изпрати запитване" : "Send an inquiry"}</h2>

            <div className="mt-6 grid gap-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={input} name="name" required minLength={2} placeholder={isBg ? "Име" : "Name"} />
                <input className={input} name="email" type="email" required placeholder="Email" />
              </div>
              <input className={input} name="phone" placeholder={isBg ? "Телефон (по желание)" : "Phone (optional)"} />
              <input className={input} name="subject" required minLength={3} placeholder={isBg ? "Тема" : "Subject"} />
              <textarea className={`${input} min-h-44 py-3`} name="message" required minLength={10} placeholder={isBg ? "Съобщение" : "Message"} />
              <button disabled={status === "sending"} className="bg-orisia-gold px-5 py-3 font-sans text-xs font-black uppercase text-white transition hover:bg-orisia-goldDark disabled:opacity-60">
                {status === "sending" ? (isBg ? "Изпращане…" : "Sending…") : (isBg ? "Изпрати" : "Send")}
              </button>
              {status === "sent" && <p className="border border-green-700/30 bg-green-50 px-4 py-3 font-sans text-sm text-green-800 dark:bg-green-950/20 dark:text-green-300">{isBg ? "Запитването е изпратено." : "Your inquiry has been sent."}</p>}
              {status === "error" && <p className="border border-red-700/30 bg-red-50 px-4 py-3 font-sans text-sm text-red-800 dark:bg-red-950/20 dark:text-red-300">{isBg ? "Възникна грешка." : "Something went wrong."}</p>}
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
