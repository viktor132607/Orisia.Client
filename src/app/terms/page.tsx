"use client";

import Link from "next/link";
import useLanguage from "../../components/useLanguage";

export default function TermsPage() {
  const language = useLanguage();
  const isBg = language === "bg";
  const sectionClass = "border-t border-orisia-line pt-7 dark:border-[#5a4637]";
  const headingClass = "text-2xl font-bold sm:text-3xl";
  const textClass = "mt-3 font-sans text-sm leading-7 text-[#725b47] dark:text-[#bfa27a]";

  return (
    <main className="min-h-screen bg-orisia-cream text-orisia-brown dark:bg-orisia-dark dark:text-orisia-light">
      <section className="border-b border-orisia-line bg-[#e8d5bb] py-14 dark:border-[#574333] dark:bg-[#1a100a]">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="font-sans text-[10px] font-black uppercase tracking-[.22em] text-orisia-goldDark dark:text-[#c79551]">{isBg ? "ОРИСИЯ · ИНФОРМАЦИЯ" : "ORISIA · INFORMATION"}</span>
          <h1 className="mt-3 text-4xl font-bold sm:text-6xl">{isBg ? "Общи условия" : "Terms and Conditions"}</h1>
          <p className="mt-4 max-w-3xl font-sans text-sm leading-7 text-[#725b47] dark:text-[#c6a77d]">{isBg ? "Тези условия уреждат използването на публичния уебсайт на ОРИСИЯ и съдържанието, публикувано в него." : "These terms govern use of the public ORISIA website and the content published on it."}</p>
        </div>
      </section>

      <section className="py-14">
        <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 sm:px-6 lg:px-8">
          <section>
            <h2 className={headingClass}>{isBg ? "1. Предназначение на сайта" : "1. Purpose of the website"}</h2>
            <p className={textClass}>{isBg ? "Сайтът предоставя информация за ОРИСИЯ, новини, събития, календар, галерия, хоротека и начини за контакт. Освен ако изрично не е посочено друго, публикуваната информация има общ информационен характер." : "The website provides information about ORISIA, news, events, a calendar, gallery, dance library and contact options. Unless expressly stated otherwise, published information is for general informational purposes."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "2. Използване на съдържанието" : "2. Use of content"}</h2>
            <p className={textClass}>{isBg ? "Потребителите могат да разглеждат сайта за лични и информационни цели. Не се допуска злоупотреба с функционалностите на сайта, опити за неоторизиран достъп, нарушаване на нормалната му работа или използване на съдържанието по начин, който нарушава приложимото законодателство или права на трети лица." : "Users may browse the website for personal and informational purposes. Misuse of website functionality, attempts at unauthorized access, interference with normal operation, or use of content in violation of applicable law or third-party rights is not permitted."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "3. Авторски права и материали" : "3. Copyright and materials"}</h2>
            <p className={textClass}>{isBg ? "Текстове, снимки, видео, графични елементи, лого и други материали могат да бъдат защитени от авторско право или други права на интелектуална собственост. Използването им извън обичайното разглеждане на сайта следва да бъде съобразено с правата на съответните автори и носители на права." : "Texts, photos, video, graphic elements, logos and other materials may be protected by copyright or other intellectual property rights. Use beyond normal website viewing must respect the rights of the relevant authors and rights holders."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "4. Събития и информация" : "4. Events and information"}</h2>
            <p className={textClass}>{isBg ? "Дати, часове, места, програми и друга информация за събития могат да бъдат променяни. При важни решения, свързани с участие или посещение, е препоръчително да проверите най-актуалната публикувана информация или да се свържете с ОРИСИЯ." : "Dates, times, venues, schedules and other event information may change. Before making important decisions about attendance or participation, you should check the latest published information or contact ORISIA."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "5. Външни връзки" : "5. External links"}</h2>
            <p className={textClass}>{isBg ? "Сайтът може да съдържа връзки към външни услуги или социални мрежи. ОРИСИЯ не контролира съдържанието, сигурността или политиките на тези външни сайтове и услуги." : "The website may contain links to external services or social networks. ORISIA does not control the content, security or policies of those external websites and services."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "6. Наличност и отговорност" : "6. Availability and liability"}</h2>
            <p className={textClass}>{isBg ? "Полагат се разумни усилия сайтът да бъде достъпен и информацията в него да бъде коректна. Не може да се гарантира непрекъсната работа без технически прекъсвания или абсолютна липса на грешки във всяка публикувана информация." : "Reasonable efforts are made to keep the website available and its information accurate. Continuous operation without technical interruptions or absolute error-free publication cannot be guaranteed."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "7. Поверителност" : "7. Privacy"}</h2>
            <p className={textClass}>{isBg ? "Информация за обработването на лични данни и използваното локално съхранение е достъпна в политиката за поверителност и политиката за бисквитки." : "Information about personal data processing and browser storage is available in the Privacy Policy and Cookie Policy."}</p>
            <div className="mt-4 flex flex-wrap gap-4 font-sans text-sm font-bold">
              <Link href="/privacy" className="text-orisia-goldDark underline-offset-4 hover:underline dark:text-[#d0a15e]">{isBg ? "Политика за поверителност" : "Privacy Policy"}</Link>
              <Link href="/cookies" className="text-orisia-goldDark underline-offset-4 hover:underline dark:text-[#d0a15e]">{isBg ? "Бисквитки" : "Cookies"}</Link>
            </div>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "8. Промени в условията" : "8. Changes to these terms"}</h2>
            <p className={textClass}>{isBg ? "Тези условия могат да бъдат актуализирани при промяна на сайта, функционалностите му или приложимите изисквания. Актуалната версия се публикува на тази страница." : "These terms may be updated when the website, its functionality or applicable requirements change. The current version will be published on this page."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "9. Контакт" : "9. Contact"}</h2>
            <p className={textClass}>{isBg ? "За въпроси относно сайта и тези условия можете да използвате страницата за контакт." : "For questions about the website and these terms, you can use the contact page."}</p>
            <Link href="/contact" className="mt-4 inline-flex font-sans text-sm font-bold text-orisia-goldDark underline-offset-4 hover:underline dark:text-[#d0a15e]">{isBg ? "Контакти" : "Contact"}</Link>
          </section>
        </div>
      </section>
    </main>
  );
}
