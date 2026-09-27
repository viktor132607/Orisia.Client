"use client";

import Link from "next/link";
import useLanguage, { useLocalizedPath } from "../../components/useLanguage";

export default function CookiesPage() {
  const language = useLanguage();
  const isBg = language === "bg";
  const href = useLocalizedPath();
  const sectionClass = "border-t border-orisia-line pt-7";
  const headingClass = "text-2xl font-bold sm:text-3xl";
  const textClass = "mt-3 font-sans text-sm leading-7 text-[#725b47]";

  return (
    <main className="min-h-screen bg-orisia-cream text-orisia-brown">
      <header className="border-b border-orisia-line bg-[#f6f0e7] py-14">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <span className="font-sans text-[10px] font-black uppercase tracking-[.22em] text-orisia-goldDark">{isBg ? "ОРИСИЯ · ИНФОРМАЦИЯ" : "ORISIA · INFORMATION"}</span>
          <h1 className="mt-3 text-4xl font-bold sm:text-6xl">{isBg ? "Политика за бисквитки" : "Cookie Policy"}</h1>
          <p className="mt-4 max-w-3xl font-sans text-sm leading-7 text-[#725b47]">{isBg ? "Тук е описано как сайтът използва бисквитки и локално съхранение в браузъра за технически настройки и предпочитания." : "This page explains how the website uses cookies and browser local storage for technical settings and preferences."}</p>
        </div>
      </header>

      <div className="py-14">
        <div className="mx-auto grid w-full max-w-5xl gap-8 px-4 sm:px-6 lg:px-8">
          <section>
            <h2 className={headingClass}>{isBg ? "1. Какво използва сайтът в момента" : "1. What the website currently uses"}</h2>
            <p className={textClass}>{isBg ? "Сайтът използва локално съхранение в браузъра за запазване на избрания език и избора, направен в банера за бисквитки. Това позволява тези настройки да се запазят при следващо посещение." : "The website uses browser local storage to remember the selected language and the choice made in the cookie banner. This allows those settings to persist on future visits."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "2. Необходими технологии" : "2. Necessary technologies"}</h2>
            <p className={textClass}>{isBg ? "Техническото съхранение е необходимо за нормалната работа на определени настройки на сайта. То не се използва само по себе си за рекламно профилиране." : "Technical storage is used for normal operation of certain website settings. By itself, it is not used for advertising profiling."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "3. Аналитични и рекламни бисквитки" : "3. Analytics and advertising cookies"}</h2>
            <p className={textClass}>{isBg ? "В текущата frontend реализация не са предвидени собствени рекламни или аналитични cookies. Ако в бъдеще бъдат добавени външни услуги за статистика, видео, карти, реклама или други интеграции, тази политика следва да бъде актуализирана и при необходимост да бъде поискано съгласие преди активирането им." : "The current frontend implementation does not intentionally set first-party advertising or analytics cookies. If third-party analytics, video, maps, advertising or similar integrations are added later, this policy should be updated and consent requested before activation where required."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "4. Как да изтриете запазените данни" : "4. How to delete stored data"}</h2>
            <p className={textClass}>{isBg ? "Можете да изтриете локално съхранените настройки чрез изчистване на данните за сайта в браузъра си. След изтриване езикът и изборът за бисквитки могат да се върнат към стойностите по подразбиране." : "You can remove locally stored settings by clearing website data in your browser. After deletion, the language and cookie choice may return to their defaults."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "5. Промяна на избора" : "5. Changing your choice"}</h2>
            <p className={textClass}>{isBg ? "Когато сайтът предлага банер за бисквитки, направеният избор се запазва локално. Ако искате да започнете отново с нов избор, можете да изчистите данните на сайта от браузъра и да презаредите страницата." : "When the website presents a cookie banner, your selection is stored locally. If you want to start again with a new choice, clear the website data in your browser and reload the page."}</p>
          </section>

          <section className={sectionClass}>
            <h2 className={headingClass}>{isBg ? "6. Връзка с поверителността" : "6. Relation to privacy"}</h2>
            <p className={textClass}>{isBg ? "За повече информация относно личните данни, целите на обработването и вашите права вижте политиката за поверителност." : "For more information about personal data, processing purposes and your rights, see the Privacy Policy."}</p>
            <Link href={href("/privacy/")} className="mt-4 inline-flex font-sans text-sm font-bold text-orisia-goldDark underline-offset-4 hover:underline">{isBg ? "Политика за поверителност" : "Privacy Policy"}</Link>
          </section>
        </div>
      </div>
    </main>
  );
}
