"use client";

import useLanguage from "../../components/useLanguage";

const pinIcon = (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M12 21s6-5.1 6-11a6 6 0 1 0-12 0c0 5.9 6 11 6 11Z" fill="currentColor" />
    <circle cx="12" cy="10" r="2.2" fill="#6b3218" />
  </svg>
);

const messageIcon = (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 5h16v14H4z" fill="none" stroke="currentColor" strokeWidth="2" />
    <path d="m5 7 7 6 7-6" fill="none" stroke="currentColor" strokeWidth="2" />
  </svg>
);

const landmarkIcon = (
  <svg className="h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M4 10h16M6 10v8m4-8v8m4-8v8m4-8v8M3 18h18M12 3l9 5H3l9-5Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </svg>
);

export default function ContactPage() {
  const language = useLanguage();
  const isBg = language === "bg";

  return (
    <main className="min-h-screen bg-[#6b3218] font-condensed text-white dark:bg-[#140c08]">
      <section className="px-4 pb-20 pt-24 sm:px-6 lg:px-8 lg:pb-28 lg:pt-28">
        <div className="mx-auto w-full max-w-7xl">
          <div className="text-center">
            <h1 className="text-5xl font-bold uppercase tracking-[.02em] sm:text-6xl lg:text-7xl">
              {isBg ? "Контакти" : "Contacts"}
            </h1>
            <p className="mt-5 text-lg text-white/80 sm:text-xl">
              {isBg ? "Свържете се с нас" : "Get in touch with us"}
            </p>
          </div>

          <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:items-stretch">
            <aside className="rounded-2xl bg-white/[.07] p-7 shadow-soft backdrop-blur-[1px] sm:p-9 lg:p-10">
              <h2 className="text-2xl font-bold text-[#f0a65e] sm:text-3xl">
                {isBg ? "Информация за контакт" : "Contact information"}
              </h2>

              <div className="mt-9 space-y-8">
                <div className="flex items-start gap-5">
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-white/10 text-[#f0a65e]">{pinIcon}</span>
                  <div>
                    <h3 className="text-lg font-bold">{isBg ? "Адрес" : "Address"}</h3>
                    <p className="mt-1 max-w-md text-base leading-7 text-white/80">
                      {isBg
                        ? "гр. Русе, ул. Родина 80, на гърба на боулинг залата, Русе, България, 7000"
                        : "80 Rodina St., behind the bowling hall, Ruse, Bulgaria, 7000"}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-white/10 text-[#f0a65e]">{messageIcon}</span>
                  <div>
                    <h3 className="text-lg font-bold">{isBg ? "Запитвания" : "Inquiries"}</h3>
                    <p className="mt-1 max-w-md text-base leading-7 text-white/80">
                      {isBg
                        ? "За участия, събития, партньорства и общи въпроси можете да се свържете с ОРИСИЯ чрез посочените контакти."
                        : "For performances, events, partnerships and general questions, you can contact ORISIA through the listed contact details."}
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-5">
                  <span className="grid h-12 w-12 flex-none place-items-center rounded-full bg-white/10 text-[#f0a65e]">{landmarkIcon}</span>
                  <div>
                    <h3 className="text-lg font-bold">{isBg ? "Ориентир" : "Landmark"}</h3>
                    <p className="mt-1 text-base leading-7 text-white/80">
                      {isBg ? "На гърба на боулинг залата." : "Behind the bowling hall."}
                    </p>
                  </div>
                </div>
              </div>
            </aside>

            <div className="min-h-[420px] overflow-hidden rounded-2xl border-4 border-white bg-white shadow-soft lg:min-h-full">
              <iframe
                className="h-full min-h-[420px] w-full border-0 lg:min-h-[500px]"
                title={isBg ? "Карта до ОРИСИЯ в Русе" : "Map to ORISIA in Ruse"}
                src="https://www.google.com/maps?q=%D0%B3%D1%80.%20%D0%A0%D1%83%D1%81%D0%B5%2C%20%D1%83%D0%BB.%20%D0%A0%D0%BE%D0%B4%D0%B8%D0%BD%D0%B0%2080%2C%20%D0%A0%D1%83%D1%81%D0%B5%2C%20%D0%91%D1%8A%D0%BB%D0%B3%D0%B0%D1%80%D0%B8%D1%8F%207000&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
