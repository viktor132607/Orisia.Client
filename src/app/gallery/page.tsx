"use client";

import { useEffect, useState } from "react";
import PublicPageHeader from "../../components/PublicPageHeader";
import { absoluteMediaUrl, api, type GalleryAlbumResponse } from "../../lib/api";
import useLanguage from "../../components/useLanguage";

export default function GalleryPage() {
  const language = useLanguage();
  const isBg = language === "bg";
  const [albums, setAlbums] = useState<GalleryAlbumResponse[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    api.gallery.list().then(setAlbums).catch((reason: Error) => setError(reason.message)).finally(() => setLoading(false));
  }, []);

  return (
    <main className="bg-[#faf8f5] font-sans text-orisia-ink">
      <PublicPageHeader
        eyebrow={isBg ? "ОРИСИЯ · СНИМКИ" : "ORISIA · PHOTOS"}
        title={isBg ? "Галерия" : "Gallery"}
        description={isBg ? "Снимки от репетиции, участия и събития на Даскало за фолклор „ОРИСИЯ“." : "Photos from rehearsals, appearances and events by ORISIA Folklore School."}
      />

      <section className="py-12 md:py-18">
        <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1460px)]">
          {loading && <p className="text-[#6b5847]">{isBg ? "Зареждане…" : "Loading…"}</p>}
          {error && <p className="text-red-700">{error}</p>}

          {!loading && !error && (albums.length ? (
            <div className="grid gap-12">
              {albums.map((album) => (
                <section key={album.id} className="overflow-hidden rounded-[24px] border border-orisia-line/45 bg-white shadow-[0_8px_26px_rgba(75,46,27,.04)]">
                  <header className="border-b border-orisia-line/45 p-7 md:p-9">
                    <span className="text-[11px] font-black uppercase tracking-[.16em] text-orisia-goldDark">{isBg ? "АЛБУМ" : "ALBUM"}</span>
                    <h2 className="mt-2 text-[clamp(30px,4vw,48px)] font-black uppercase leading-none">{isBg ? album.titleBg : album.titleEn || album.titleBg}</h2>
                    {(isBg ? album.descriptionBg : album.descriptionEn) && <p className="mt-4 max-w-3xl text-[16px] leading-8 text-[#6b5847]">{isBg ? album.descriptionBg : album.descriptionEn}</p>}
                  </header>

                  <div className="grid gap-4 p-4 sm:grid-cols-2 lg:grid-cols-3 md:p-6">
                    {album.items.length ? album.items.map((item) => (
                      <figure key={item.id} className="group relative m-0 aspect-[5/4] overflow-hidden rounded-2xl bg-[#eee5da]">
                        <img
                          src={absoluteMediaUrl(item.thumbnailUrl || item.url)}
                          alt={(isBg ? item.altBg : item.altEn) || (isBg ? album.titleBg : album.titleEn)}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.025]"
                          loading="lazy"
                        />
                        {(isBg ? item.captionBg : item.captionEn) && <figcaption className="absolute inset-x-0 bottom-0 bg-black/70 p-4 text-sm text-white">{isBg ? item.captionBg : item.captionEn}</figcaption>}
                      </figure>
                    )) : [1,2,3].map((slot) => (
                      <div key={slot} className="flex aspect-[5/4] flex-col items-center justify-center rounded-2xl bg-[radial-gradient(circle_at_72%_24%,#fffaf3,transparent_45%),linear-gradient(145deg,#f2eee8,#e1d8cc)] p-6 text-center">
                        <img src="/orisia-logo.jpg" alt="" className="h-24 w-24 rounded-full border border-orisia-line object-cover opacity-60" />
                        <span className="mt-4 text-xs font-black uppercase tracking-[.18em] text-[#7b6653]">{isBg ? "Снимка предстои" : "Photo coming soon"}</span>
                      </div>
                    ))}
                  </div>
                </section>
              ))}

              <a href="https://www.facebook.com/orisiyaruse/photos" target="_blank" rel="noopener noreferrer" className="w-fit rounded-xl bg-orisia-goldDark px-6 py-3 font-bold text-white transition hover:bg-[#754725]">
                {isBg ? "Вижте още снимки във Facebook" : "See more photos on Facebook"}
              </a>
            </div>
          ) : (
            <p className="py-12 text-[#6b5847]">{isBg ? "Галерията все още е празна." : "The gallery is still empty."}</p>
          ))}
        </div>
      </section>
    </main>
  );
}
