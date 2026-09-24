"use client";

import Link from "next/link";
import useLanguage from "../../components/useLanguage";
import { horotekaDances } from "../../lib/horoteka";

export default function HorotekaPage() {
  const language = useLanguage();
  const isBg = language === "bg";

  return (
    <main className="bg-orisia-cream dark:bg-orisia-dark">
      <section className="border-b border-orisia-line bg-[#e8d5bb] py-14 dark:border-[#574333] dark:bg-[#1a100a]">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="font-sans text-[10px] font-black uppercase tracking-[.2em] text-orisia-goldDark">
            {isBg ? "ОРИСИЯ · ХОРОТЕКА" : "ORISIA · DANCE LIBRARY"}
          </span>
          <h1 className="mt-2 text-5xl font-bold sm:text-7xl">
            {isBg ? "Хоротека" : "Dance Library"}
          </h1>
          <p className="mt-3 max-w-3xl font-sans text-base text-[#725b47] dark:text-[#c6a77d]">
            {isBg
              ? "Информация за български хора, фолклорни области, ритми и отделни страници за всяко хоро."
              : "Information about Bulgarian horo dances, folklore regions, rhythms and dedicated pages for every dance."}
          </p>
        </div>
      </section>

      <section className="py-12" aria-labelledby="horoteka-list-title">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-7 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <span className="font-sans text-[10px] font-black uppercase tracking-[.18em] text-orisia-goldDark">
                {isBg ? "НАУЧИ ХОРОТО" : "LEARN THE DANCE"}
              </span>
              <h2 id="horoteka-list-title" className="mt-2 text-4xl font-bold">
                {isBg ? "Гледай. Разпознай. Запомни." : "Watch. Recognize. Remember."}
              </h2>
            </div>
            <p className="max-w-xl font-sans text-sm leading-6 text-[#725b47] dark:text-[#a98c69]">
              {isBg
                ? "Отвори страницата на конкретното хоро за информация за областта, ритъма и описанието му."
                : "Open a dance page for information about its folklore region, rhythm and description."}
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {horotekaDances.map((dance, index) => {
              const title = isBg ? dance.titleBg : dance.titleEn;
              const region = isBg ? dance.regionBg : dance.regionEn;
              const description = isBg ? dance.descriptionBg : dance.descriptionEn;

              return (
                <article
                  className="overflow-hidden border border-orisia-line bg-orisia-paper dark:border-[#604a39] dark:bg-orisia-panel"
                  key={dance.slug}
                >
                  <div className="grid aspect-video place-items-center bg-[#ead7ba] text-center dark:bg-[#28180f]">
                    <div>
                      <span className="mx-auto grid h-12 w-12 place-items-center rounded-full border border-orisia-goldDark text-xl text-orisia-goldDark">
                        ▶
                      </span>
                      <strong className="mt-3 block text-lg">
                        {isBg ? `Кратък клип ${index + 1}` : `Short clip ${index + 1}`}
                      </strong>
                      <small className="mt-1 block font-sans text-[10px] text-[#806a55] dark:text-[#a58d71]">
                        {isBg
                          ? "видео ще бъде добавено от админ панела"
                          : "video will be added from the admin panel"}
                      </small>
                    </div>
                  </div>
                  <div className="p-6">
                    <span className="font-sans text-[10px] font-black uppercase tracking-wide text-orisia-goldDark">
                      {region} · {dance.rhythm}
                    </span>
                    <h3 className="mt-2 text-2xl font-bold">
                      <Link
                        href={`/horoteka/${dance.slug}/`}
                        className="transition hover:text-orisia-goldDark"
                      >
                        {title}
                      </Link>
                    </h3>
                    <p className="mt-2 font-sans text-sm leading-6 text-[#725b47] dark:text-[#ab906c]">
                      {description}
                    </p>
                    <Link
                      href={`/horoteka/${dance.slug}/`}
                      className="mt-4 inline-block border-b border-orisia-goldDark pb-1 font-sans text-xs font-black uppercase tracking-wide text-orisia-goldDark dark:text-[#d3a969]"
                    >
                      {isBg ? "Виж хорото" : "View dance"}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    </main>
  );
}
