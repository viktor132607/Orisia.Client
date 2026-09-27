"use client";

import Link from "next/link";
import useLanguage, { useLocalizedPath } from "../../components/useLanguage";

export default function PrivacyPage() {
  const language = useLanguage();
  const isBg = language === "bg";
  const href = useLocalizedPath();
  const sectionClass = "border-t border-orisia-line/45 pt-8";
  const headingClass = "text-2xl font-black tracking-[-.01em] sm:text-3xl";
  const textClass = "mt-3 text-[16px] leading-8 text-[#6b5847]";

  return (
    <main className="min-h-screen bg-white font-sans text-orisia-ink">
      <header className="border-b border-orisia-line/45 bg-[#f6f3ef] py-16 max-[620px]:py-12">
        <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1460px)]">
          <span className="text-[11px] font-black uppercase tracking-[.16em] text-orisia-goldDark">{isBg ? "ОРИСИЯ · ИНФОРМАЦИЯ" : "ORISIA · INFORMATION"}</span>
          <h1 className="mt-3 text-[clamp(38px,6vw,64px)] font-black uppercase leading-[.95] tracking-[-.02em]">{isBg ? "Политика за поверителност" : "Privacy Policy"}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-[#665c55]">{isBg ? "Тази страница обяснява какви лични данни могат да бъдат обработвани при използване на сайта на ОРИСИЯ и какви права имате." : "This page explains what personal data may be processed when using the ORISIA website and what rights you have."}</p>
        </div>
      </header>

      <div className="py-16 max-[620px]:py-12">
        <div className="mx-auto grid w-[min(1460px,calc(100%_-_40px))] gap-8 max-[620px]:w-[min(100%_-_28px,1460px)]">
          <section>
            <h2 className={headingClass}>{isBg ? "1. Администратор и контакт" : "1. Controller and contact"}</h2>
            <p className={textClass}>{isBg ? "Сайтът представя дейността на ОРИСИЯ в гр. Русе. За въпроси относно личните данни можете да използвате формата за контакт на сайта или да посетите посочения адрес: гр. Русе, ул. Родина 80, 7000." : "The website presents ORISIA's activities in Ruse. For questions concerning personal data, you can use the website contact form or the listed address: 80 Rodina St., Ruse, Bulgaria, 7000."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "2. Какви данни могат да се обработват" : "2. Data that may be processed"}</h2>
            <p className={textClass}>{isBg ? "Когато използвате функционалности за контакт, могат да бъдат обработвани данните, които доброволно предоставите, например име, имейл адрес, телефон и съдържание на съобщението. Сайтът може също да съхранява избрания език и избора относно бисквитките в браузъра." : "When you use contact functionality, data you voluntarily provide may be processed, such as your name, email address, phone number and message content. The website may also store the selected language and cookie choice in your browser."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "3. Цели на обработването" : "3. Purposes of processing"}</h2>
            <p className={textClass}>{isBg ? "Данните могат да бъдат използвани за отговор на запитвания, организация на комуникацията с участници и посетители, поддържане на предпочитанията на сайта и осигуряване на нормалната му работа." : "Data may be used to respond to inquiries, organize communication with participants and visitors, preserve website preferences and ensure normal website operation."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "4. Правно основание" : "4. Legal basis"}</h2>
            <p className={textClass}>{isBg ? "В зависимост от конкретната ситуация обработването може да се основава на предприемане на действия по ваше искане, легитимен интерес за комуникация и поддръжка на сайта, изпълнение на законово задължение или ваше съгласие, когато такова е необходимо." : "Depending on the situation, processing may be based on taking steps at your request, legitimate interests in communication and website maintenance, compliance with a legal obligation, or your consent where required."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "5. Срок за съхранение" : "5. Retention"}</h2>
            <p className={textClass}>{isBg ? "Личните данни следва да се пазят само за периода, необходим за съответната цел, освен ако закон не изисква по-дълъг срок. Техническите предпочитания в браузъра се пазят до изтриването им от потребителя или до промяна на съответната настройка." : "Personal data should be retained only for as long as necessary for the relevant purpose, unless a longer period is required by law. Browser preferences remain stored until deleted by the user or until the corresponding setting is changed."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "6. Получатели и трети страни" : "6. Recipients and third parties"}</h2>
            <p className={textClass}>{isBg ? "Данни могат да бъдат достъпни за доставчици на хостинг или техническа поддръжка само доколкото това е необходимо за работата на сайта. Не се предвижда продажба на лични данни на рекламодатели." : "Data may be accessible to hosting or technical service providers only to the extent necessary for website operation. Personal data is not intended to be sold to advertisers."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "7. Вашите права" : "7. Your rights"}</h2>
            <p className={textClass}>{isBg ? "При приложимост имате право на достъп, коригиране, изтриване, ограничаване на обработването, възражение, преносимост на данните и оттегляне на съгласие. Имате и право да подадете жалба до компетентния надзорен орган за защита на личните данни." : "Where applicable, you have rights of access, rectification, erasure, restriction, objection, data portability and withdrawal of consent. You also have the right to lodge a complaint with the competent data protection supervisory authority."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "8. Бисквитки и локално съхранение" : "8. Cookies and local storage"}</h2>
            <p className={textClass}>{isBg ? "Подробности за използваните технически настройки и съхранение в браузъра са описани в отделната политика за бисквитки." : "Details about technical settings and browser storage are described in the separate Cookie Policy."}</p>
            <Link href={href("/cookies/")} className="mt-4 inline-flex text-sm font-bold text-orisia-goldDark underline-offset-4 hover:underline">{isBg ? "Виж политиката за бисквитки" : "View Cookie Policy"}</Link>
          </section>
        </div>
      </div>
    </main>
  );
}
