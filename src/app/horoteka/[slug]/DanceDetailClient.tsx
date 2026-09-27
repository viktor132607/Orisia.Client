"use client";

import Link from "next/link";
import useLanguage, { useLocalizedPath } from "../../../components/useLanguage";
import { absoluteMediaUrl, type DanceResponse } from "../../../lib/api";

function videoEmbedUrl(url: string) {
  try {
    const parsed = new URL(url);
    if (parsed.hostname === "youtu.be") return `https://www.youtube-nocookie.com/embed/${parsed.pathname.split("/").filter(Boolean)[0]}`;
    if (parsed.hostname.includes("youtube.com")) {
      const id = parsed.searchParams.get("v") || (parsed.pathname.startsWith("/shorts/") ? parsed.pathname.split("/")[2] : null);
      return id ? `https://www.youtube-nocookie.com/embed/${id}` : url;
    }
    if (parsed.hostname.includes("vimeo.com")) {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      return id ? `https://player.vimeo.com/video/${id}` : url;
    }
  } catch {}
  return url;
}

export default function DanceDetailClient({ dance }: { dance: DanceResponse }) {
  const language = useLanguage();
  const isBg = language === "bg";
  const href = useLocalizedPath();
  const title = isBg ? dance.titleBg : dance.titleEn || dance.titleBg;
  const description = isBg ? dance.descriptionBg : dance.descriptionEn || dance.descriptionBg;

  return (
    <main className="min-h-[70vh] bg-[#faf8f5] font-sans text-orisia-ink">
      <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] py-12 max-[620px]:w-[min(100%_-_28px,1460px)] md:py-20">
        <Link href={href("/horoteka/")} className="inline-block border-b-2 border-orisia-goldDark pb-1 text-sm font-bold text-orisia-goldDark">← {isBg ? "Хоротека" : "Dance library"}</Link>

        <article className="grid items-center gap-8 border-b border-orisia-line/50 py-12 md:gap-12 lg:grid-cols-2">
          <div className="max-w-2xl">
            <span className="text-[11px] font-black uppercase tracking-[.14em] text-orisia-goldDark">{dance.region || (isBg ? "България" : "Bulgaria")} {dance.rhythm ? `· ${dance.rhythm}` : ""}</span>
            <h1 className="mt-4 text-[clamp(34px,5vw,60px)] font-black uppercase leading-[1.03] tracking-[-.025em]">{title}</h1>
            <p className="mt-5 whitespace-pre-line text-[17px] leading-8 text-[#6b5847]">{description}</p>
            <dl className="mt-8 grid gap-4 border-y border-orisia-line/45 py-5 sm:grid-cols-2">
              <div><dt className="text-[10px] font-black uppercase tracking-[.12em] text-orisia-goldDark">{isBg ? "Фолклорна област" : "Region"}</dt><dd className="mt-1 font-bold">{dance.region || "—"}</dd></div>
              <div><dt className="text-[10px] font-black uppercase tracking-[.12em] text-orisia-goldDark">{isBg ? "Ритъм" : "Rhythm"}</dt><dd className="mt-1 font-bold">{dance.rhythm || "—"}</dd></div>
            </dl>
          </div>

          <div className="overflow-hidden rounded-2xl border border-orisia-line/45 bg-[#eee5da] shadow-[0_8px_26px_rgba(75,46,27,.05)]">
            {dance.videoUrl ? (
              <iframe className="aspect-[5/4] w-full border-0" src={videoEmbedUrl(dance.videoUrl)} title={title} allowFullScreen loading="lazy" />
            ) : dance.thumbnailUrl ? (
              <img src={absoluteMediaUrl(dance.thumbnailUrl)} alt={title} className="aspect-[5/4] w-full object-cover" />
            ) : (
              <div className="flex aspect-[5/4] flex-col items-center justify-center gap-4 bg-[radial-gradient(circle_at_72%_24%,#fffaf3,transparent_45%),linear-gradient(145deg,#f2eee8,#e1d8cc)]">
                <img src="/orisia-logo.jpg" alt="" className="h-28 w-28 rounded-full border border-orisia-line object-cover opacity-60" />
                <span className="text-xs font-black uppercase tracking-[.18em] text-[#7b6653]">{isBg ? "Видео предстои" : "Video coming soon"}</span>
              </div>
            )}
          </div>
        </article>
      </div>
    </main>
  );
}
