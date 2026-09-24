"use client";

import Link from "next/link";
import useLanguage from "../../../components/useLanguage";
import type { HorotekaDance } from "../../../lib/horoteka";

export default function DanceDetailClient({ dance }: { dance: HorotekaDance }) {
  const language = useLanguage();
  const isBg = language === "bg";
  const title = isBg ? dance.titleBg : dance.titleEn;
  const region = isBg ? dance.regionBg : dance.regionEn;
  const description = isBg ? dance.descriptionBg : dance.descriptionEn;

  return (
    <main className="bg-orisia-cream text-orisia-brown dark:bg-orisia-dark dark:text-orisia-light">
      <section className="border-b border-orisia-line bg-[#e8d5bb] py-14 dark:border-[#574333] dark:bg-[#1a100a]">
        <div className="mx-auto w-full max-w-5xl px-4 sm:px-6 lg:px-8">
          <nav
            className="mb-5 font-sans text-xs font-bold text-orisia-goldDark"
            aria-label={isBg ? "Навигация в Хоротеката" : "Dance library navigation"}
          >
            <Link href="/horoteka/" className="hover:underline">
              {isBg ? "Хоротека" : "Dance Library"}
            </Link>
            <span aria-hidden="true"> / </span>
            <span>{title}</span>
          </nav>
          <span className="font-sans text-[10px] font-black uppercase tracking-[.2em] text-orisia-goldDark">
            {region} · {dance.rhythm}
          </span>
          <h1 className="mt-2 text-5xl font-bold sm:text-7xl">{title}</h1>
          <p className="mt-5 max-w-3xl font-sans text-base leading-7 text-[#725b47] dark:text-[#c6a77d]">
            {description}
          </p>
        </div>
      </section>

      <section className="py-12" aria-labelledby="dance-details-title">
        <div className="mx-auto grid w-full max-w-5xl gap-6 px-4 sm:px-6 lg:grid-cols-[minmax(0,1fr)_320px] lg:px-8">
          <article className="border border-orisia-line bg-orisia-paper p-6 dark:border-[#604a39] dark:bg-orisia-panel sm:p-8">
            <span className="font-sans text-[10px] font-black uppercase tracking-[.18em] text-orisia-goldDark">
              {isBg ? "ЗА ХОРОТО" : "ABOUT THE DANCE"}
            </span>
            <h2 id="dance-details-title" className="mt-2 text-3xl font-bold">
              {title}
            </h2>
            <p className="mt-4 font-sans text-sm leading-7 text-[#725b47] dark:text-[#ab906c]">
              {description}
            </p>

            <dl className="mt-8 grid gap-4 border-t border-orisia-line pt-6 font-sans dark:border-[#604a39] sm:grid-cols-2">
              <div>
                <dt className="text-[10px] font-black uppercase tracking-[.14em] text-orisia-goldDark">
                  {isBg ? "Фолклорна област" : "Folklore region"}
                </dt>
                <dd className="mt-1 text-sm">{region}</dd>
              </div>
              <div>
                <dt className="text-[10px] font-black uppercase tracking-[.14em] text-orisia-goldDark">
                  {isBg ? "Ритъм" : "Rhythm"}
                </dt>
                <dd className="mt-1 text-sm">{dance.rhythm}</dd>
              </div>
            </dl>
          </article>

          <aside className="border border-orisia-line bg-[#ead7ba] p-6 dark:border-[#604a39] dark:bg-[#28180f]">
            {dance.video ? (
              <>
                <span className="font-sans text-[10px] font-black uppercase tracking-[.18em] text-orisia-goldDark">
                  {isBg ? "ВИДЕО" : "VIDEO"}
                </span>
                <h2 className="mt-2 text-2xl font-bold">{title}</h2>
                <div className="mt-4 overflow-hidden border border-orisia-line bg-black dark:border-[#604a39]">
                  {dance.video.embedUrl ? (
                    <iframe
                      className="aspect-video w-full border-0"
                      src={dance.video.embedUrl}
                      title={title}
                      loading="lazy"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  ) : dance.video.contentUrl ? (
                    <video
                      className="aspect-video w-full"
                      controls
                      preload="metadata"
                      poster={dance.video.thumbnailUrl}
                    >
                      <source src={dance.video.contentUrl} />
                    </video>
                  ) : (
                    <img
                      src={dance.video.thumbnailUrl}
                      alt={title}
                      className="aspect-video w-full object-cover"
                    />
                  )}
                </div>
              </>
            ) : (
              <>
                <span className="grid h-12 w-12 place-items-center rounded-full border border-orisia-goldDark text-xl text-orisia-goldDark">
                  ▶
                </span>
                <h2 className="mt-4 text-2xl font-bold">
                  {isBg ? "Видео предстои" : "Video coming soon"}
                </h2>
                <p className="mt-3 font-sans text-sm leading-6 text-[#725b47] dark:text-[#ab906c]">
                  {isBg
                    ? "Когато бъде добавено реално видео от админ панела, то ще се показва тук."
                    : "When a real video is added from the admin panel, it will appear here."}
                </p>
              </>
            )}
          </aside>
        </div>
      </section>
    </main>
  );
}
