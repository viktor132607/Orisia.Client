"use client";

import useLanguage from "../../components/useLanguage";

const lecturers = [0, 1, 2];

export default function AboutPage() {
  const isBg = useLanguage() === "bg";

  const rows = isBg ? [
    { label: "Какво правим", copy: "Учем и танцуваме български народни хора, поддържаме редовни групи и участваме във фолклорни събития." },
    { label: "Къде сме", copy: "Русе, бул. Родина 80 — на гърба на боулинг залата." },
    { label: "Идеята", copy: "Да пазим фолклора жив, достъпен и споделен между хора от различни възрасти и опит." },
  ] : [
    { label: "What we do", copy: "We learn and dance Bulgarian folk dances, run regular groups and take part in folklore events." },
    { label: "Where", copy: "Ruse, 80 Rodina Blvd. — behind the bowling hall." },
    { label: "The idea", copy: "To keep folklore alive, accessible and shared between people of different ages and experience." },
  ];

  return (
    <main className="bg-white font-sans text-orisia-ink">
      <section className="min-h-[68vh] py-[72px] max-[620px]:py-[48px]" aria-labelledby="about-heading">
        <div className="mx-auto grid w-[min(1460px,calc(100%_-_40px))] gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(420px,728px)] max-[620px]:w-[min(100%_-_28px,1460px)]">
          <article className="flex flex-col pt-6 max-[1100px]:pt-0">
            <div className="mb-8 flex items-center gap-5 max-[620px]:items-start">
              <img src="/orisia-logo.jpg" alt={isBg ? "Лого на ОРИСИЯ" : "ORISIA logo"} width={112} height={112} className="h-28 w-28 shrink-0 rounded-full border border-orisia-line bg-white object-cover max-[620px]:h-24 max-[620px]:w-24" />
              <div>
                <span className="mb-2 inline-block text-[11px] font-black uppercase tracking-[.16em] text-orisia-goldDark">{isBg ? "ОРИСИЯ · ЗА НАС" : "ORISIA · ABOUT US"}</span>
                <h1 id="about-heading" className="text-[clamp(40px,5vw,68px)] font-black uppercase leading-[.95] tracking-[-.02em]">{isBg ? "За ОРИСИЯ" : "About ORISIA"}</h1>
              </div>
            </div>
            <p className="mb-8 max-w-[760px] text-lg leading-[1.65] text-[#5f5146]">
              {isBg ? "Даскало за фолклор „ОРИСИЯ“ е място за народни танци, срещи и общност — за хора, които искат да пазят традицията жива и да я преживяват заедно." : "ORISIA Folklore School is a place for folk dance, community and shared experiences — for people who want to keep tradition alive together."}
            </p>
            <dl className="divide-y divide-orisia-line/45 border-y border-orisia-line/45">
              {rows.map(({ label, copy }) => (
                <div key={label} className="grid grid-cols-[140px_minmax(0,1fr)] gap-5 py-5 max-[620px]:grid-cols-1 max-[620px]:gap-2">
                  <dt className="font-black uppercase text-orisia-goldDark">{label}</dt>
                  <dd className="m-0 leading-[1.65] text-[#5f5146]">{copy}</dd>
                </div>
              ))}
            </dl>
          </article>

          <figure className="m-0 flex min-h-[620px] items-center justify-center overflow-hidden rounded-2xl border border-orisia-line/45 bg-[radial-gradient(circle_at_70%_25%,#fffaf3,transparent_42%),linear-gradient(145deg,#f1e8dd,#d9c5b2)] p-10 max-[1100px]:min-h-[420px]">
            <div className="text-center">
              <img src="/orisia-logo.jpg" alt="" className="mx-auto h-56 w-56 rounded-full border-4 border-orisia-line bg-white object-cover shadow-[0_18px_55px_rgba(75,46,27,.18)] max-[620px]:h-40 max-[620px]:w-40" />
              <p className="mt-7 text-sm font-black uppercase tracking-[.18em] text-orisia-goldDark">{isBg ? "Даскало за фолклор · Русе" : "Folklore school · Ruse"}</p>
            </div>
          </figure>
        </div>
      </section>

      <section className="border-t border-orisia-line/45 bg-[#faf8f5] py-16 md:py-20" aria-labelledby="lecturers-title">
        <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1460px)]">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-5">
            <div>
              <span className="text-[11px] font-black uppercase tracking-[.16em] text-orisia-goldDark">{isBg ? "ЕКИП" : "TEAM"}</span>
              <h2 id="lecturers-title" className="mt-2 text-[clamp(34px,5vw,52px)] font-black uppercase leading-none">{isBg ? "Нашите лектори" : "Our instructors"}</h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-[#6b5847]">{isBg ? "Хората, които водят заниманията и предават характера на българските хора." : "The people who lead the sessions and pass on the character of Bulgarian folk dances."}</p>
          </div>

          <div className="grid gap-5 md:grid-cols-3">
            {lecturers.map((index) => (
              <article key={index} className="overflow-hidden rounded-2xl border border-orisia-line/45 bg-white shadow-[0_8px_26px_rgba(75,46,27,.04)]">
                <div className="flex aspect-[5/4] items-center justify-center bg-[radial-gradient(circle_at_70%_25%,#fffaf3,transparent_45%),linear-gradient(145deg,#f2eee8,#e1d8cc)]">
                  <img src="/orisia-logo.jpg" alt="" className="h-28 w-28 rounded-full border border-orisia-line object-cover opacity-60" />
                </div>
                <div className="border-t-4 border-orisia-gold p-6">
                  <span className="text-[10px] font-black uppercase tracking-[.15em] text-orisia-goldDark">{isBg ? "Лектор" : "Instructor"}</span>
                  <h3 className="mt-2 text-2xl font-black">{isBg ? "Име на лектор" : "Instructor name"}</h3>
                  <p className="mt-3 text-sm leading-7 text-[#6b5847]">{isBg ? "Представяне, опит и фолклорни области ще бъдат добавени при налични данни." : "Bio, experience and folklore regions will be added when the data is available."}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
