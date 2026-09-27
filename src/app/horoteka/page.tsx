"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import PublicPageHeader from "../../components/PublicPageHeader";
import { absoluteMediaUrl, api, type DanceResponse } from "../../lib/api";
import useLanguage, { useLocalizedPath } from "../../components/useLanguage";

export default function HorotekaPage() {
  const language = useLanguage();
  const isBg = language === "bg";
  const href = useLocalizedPath();
  const [dances, setDances] = useState<DanceResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.dances.list().then(setDances).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-[#faf8f5] font-sans text-orisia-ink">
      <PublicPageHeader
        eyebrow={isBg ? "ОРИСИЯ · БЪЛГАРСКИ ХОРА" : "ORISIA · BULGARIAN DANCES"}
        title={isBg ? "Хоротека" : "Dance Library"}
        description={isBg ? "Подбрани български хора с описание, област, ритъм и видео, когато е налично." : "A collection of Bulgarian folk dances with descriptions, regions, rhythms and video where available."}
      />

      <section className="py-12 md:py-20">
        <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1460px)]">
          {loading && <p className="text-[#6b5847]">{isBg ? "Зареждане…" : "Loading…"}</p>}
          {error && <p className="text-red-700">{error}</p>}
          {!loading && !error && (dances.length ? (
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {dances.map((dance) => (
                <article key={dance.id} className="overflow-hidden rounded-2xl border border-orisia-line/45 bg-white shadow-[0_8px_26px_rgba(75,46,27,.04)]">
                  <div className="relative aspect-[5/4] overflow-hidden bg-[#eee5da]">
                    {dance.thumbnailUrl ? (
                      <img src={absoluteMediaUrl(dance.thumbnailUrl)} alt={isBg ? dance.titleBg : dance.titleEn || dance.titleBg} className="h-full w-full object-cover transition duration-500 hover:scale-[1.025]" />
                    ) : (
                      <div className="flex h-full flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_72%_24%,#fffaf3,transparent_45%),linear-gradient(145deg,#f2eee8,#e1d8cc)]">
                        <img src="/orisia-logo.jpg" alt="" className="h-24 w-24 rounded-full border border-orisia-line object-cover opacity-60" />
                        <span className="text-xs font-black uppercase tracking-[.18em] text-[#7b6653]">{isBg ? "Видео предстои" : "Video coming soon"}</span>
                      </div>
                    )}
                  </div>
                  <div className="border-t-4 border-orisia-gold p-6">
                    <span className="text-[10px] font-black uppercase tracking-[.15em] text-orisia-goldDark">{dance.region || (isBg ? "България" : "Bulgaria")} {dance.rhythm ? `· ${dance.rhythm}` : ""}</span>
                    <h2 className="mt-2 text-[24px] font-black uppercase leading-tight"><Link href={href(`/horoteka/${dance.slug}/`)} className="transition-colors hover:text-orisia-goldDark">{isBg ? dance.titleBg : dance.titleEn || dance.titleBg}</Link></h2>
                    <p className="mt-3 line-clamp-4 text-[15px] leading-7 text-[#6b5847]">{isBg ? dance.descriptionBg : dance.descriptionEn || dance.descriptionBg}</p>
                    <Link href={href(`/horoteka/${dance.slug}/`)} className="mt-5 inline-block border-b-2 border-orisia-goldDark pb-1 text-sm font-bold text-orisia-goldDark">{isBg ? "Отвори" : "Open"} →</Link>
                  </div>
                </article>
              ))}
            </div>
          ) : <p className="py-12 text-[#6b5847]">{isBg ? "Все още няма добавени хора." : "No dances have been added yet."}</p>)}
        </div>
      </section>
    </main>
  );
}
