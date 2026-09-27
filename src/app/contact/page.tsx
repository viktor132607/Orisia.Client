"use client";

import { FormEvent, useState } from "react";
import { api } from "../../lib/api";
import useLanguage from "../../components/useLanguage";

export default function ContactPage() {
  const isBg = useLanguage() === "bg";
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const input = "min-h-12 w-full rounded-xl border border-orisia-line/60 bg-white px-4 font-sans text-sm text-orisia-ink placeholder:text-[#9a806b] outline-none transition focus:border-orisia-goldDark";

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
    <main className="bg-white font-sans text-orisia-ink">
      <section className="min-h-[68vh] py-[72px] max-[620px]:py-[48px]" aria-labelledby="contact-heading">
        <div className="mx-auto grid w-[min(1460px,calc(100%_-_40px))] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,728px)] max-[620px]:w-[min(100%_-_28px,1460px)]">
          <article className="flex flex-col pt-6 max-[1100px]:pt-0">
            <div className="mb-8 flex items-center gap-5 max-[620px]:items-start">
              <img src="/orisia-logo.jpg" alt="" width={112} height={112} className="h-28 w-28 shrink-0 rounded-full border border-orisia-line bg-white object-cover max-[620px]:h-24 max-[620px]:w-24" />
              <div>
                <span className="mb-2 inline-block text-[11px] font-black uppercase tracking-[.16em] text-orisia-goldDark">{isBg ? "ОРИСИЯ · КОНТАКТИ" : "ORISIA · CONTACT"}</span>
                <h1 id="contact-heading" className="text-[clamp(40px,5vw,68px)] font-black uppercase leading-[.95] tracking-[-.02em]">{isBg ? "Контакти" : "Contacts"}</h1>
              </div>
            </div>

            <dl className="mt-auto divide-y divide-orisia-line/45 border-y border-orisia-line/45">
              <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-2">
                <dt className="font-black uppercase text-orisia-goldDark">{isBg ? "Адрес" : "Address"}</dt>
                <dd className="m-0"><address className="not-italic text-lg leading-[1.65] text-[#5f5146]">{isBg ? "гр. Русе, бул. Родина 80, на гърба на боулинг залата" : "80 Rodina Blvd., behind the bowling hall, Ruse"}</address></dd>
              </div>
              <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-2">
                <dt className="font-black uppercase text-orisia-goldDark">{isBg ? "Връзка" : "Contact"}</dt>
                <dd className="m-0 text-lg leading-[1.65] text-[#5f5146]">{isBg ? "Използвайте формата за запитване или Facebook страницата на ОРИСИЯ." : "Use the inquiry form or the ORISIA Facebook page."}</dd>
              </div>
              <div className="grid grid-cols-[130px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-2">
                <dt className="font-black uppercase text-orisia-goldDark">Facebook</dt>
                <dd className="m-0"><a href="https://www.facebook.com/orisiyaruse" target="_blank" rel="noopener noreferrer" className="font-bold text-orisia-goldDark hover:underline">facebook.com/orisiyaruse</a></dd>
              </div>
            </dl>
          </article>

          <div className="flex min-w-0 flex-col gap-5">
            <div className="overflow-hidden rounded-2xl border border-orisia-line/45 bg-[#f3eee7]">
              <iframe
                className="h-[410px] w-full border-0"
                title="ORISIA map"
                src="https://www.google.com/maps?q=%D0%B3%D1%80.%20%D0%A0%D1%83%D1%81%D0%B5%2C%20%D1%83%D0%BB.%20%D0%A0%D0%BE%D0%B4%D0%B8%D0%BD%D0%B0%2080&output=embed"
                loading="lazy"
              />
            </div>

            <form onSubmit={submit} className="rounded-2xl border border-orisia-line/45 bg-[#faf8f5] p-6 md:p-7">
              <span className="text-[11px] font-black uppercase tracking-[.16em] text-orisia-goldDark">{isBg ? "ПИШЕТЕ НИ" : "MESSAGE US"}</span>
              <h2 className="mt-2 text-2xl font-black uppercase">{isBg ? "Изпрати запитване" : "Send an inquiry"}</h2>
              <div className="mt-5 grid gap-3">
                <div className="grid gap-3 sm:grid-cols-2">
                  <input className={input} name="name" required minLength={2} placeholder={isBg ? "Име" : "Name"} />
                  <input className={input} name="email" type="email" required placeholder="Email" />
                </div>
                <input className={input} name="phone" placeholder={isBg ? "Телефон (по желание)" : "Phone (optional)"} />
                <input className={input} name="subject" required minLength={3} placeholder={isBg ? "Тема" : "Subject"} />
                <textarea className={`${input} min-h-36 py-3`} name="message" required minLength={10} placeholder={isBg ? "Съобщение" : "Message"} />
                <button disabled={status === "sending"} className="rounded-xl bg-orisia-goldDark px-5 py-3 font-bold text-white transition hover:bg-[#754725] disabled:opacity-60">
                  {status === "sending" ? (isBg ? "Изпращане…" : "Sending…") : (isBg ? "Изпрати" : "Send")}
                </button>
                {status === "sent" && <p className="rounded-xl border border-green-700/30 bg-green-50 px-4 py-3 text-sm text-green-800">{isBg ? "Запитването е изпратено." : "Your inquiry has been sent."}</p>}
                {status === "error" && <p className="rounded-xl border border-red-700/30 bg-red-50 px-4 py-3 text-sm text-red-800">{isBg ? "Възникна грешка." : "Something went wrong."}</p>}
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
