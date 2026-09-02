"use client";

import useLanguage from "./useLanguage";

export default function EmptyPage({ title, titleEn }: { title: string; titleEn?: string }) {
  const language = useLanguage();
  const isBg = language === "bg";
  return <main className="page"><div className="container"><section className="empty-panel"><div><h1>{isBg ? title : (titleEn ?? title)}</h1><p>{isBg ? "Съдържанието ще бъде добавено." : "Content will be added."}</p></div></section></div></main>;
}
