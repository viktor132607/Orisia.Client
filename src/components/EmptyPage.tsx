"use client";

import useLanguage from "./useLanguage";

export default function EmptyPage({ title, titleEn }: { title: string; titleEn?: string }) {
  const language = useLanguage(); const isBg = language === "bg";
  return <main className="min-h-[65vh] bg-orisia-cream py-12 dark:bg-orisia-dark"><div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><section className="grid min-h-[320px] place-items-center border border-orisia-line bg-orisia-paper p-8 text-center dark:border-[#604a39] dark:bg-orisia-panel"><div><h1 className="text-4xl font-bold sm:text-5xl">{isBg ? title : (titleEn ?? title)}</h1><p className="mt-3 font-sans text-sm text-[#725b47] dark:text-[#a98c69]">{isBg ? "Съдържанието ще бъде добавено." : "Content will be added."}</p></div></section></div></main>;
}
