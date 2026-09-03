"use client";

import useLanguage from "./useLanguage";

type Props = { title: string; description: string; titleEn: string; descriptionEn: string };

export default function AdminSectionPlaceholder({ title, description, titleEn, descriptionEn }: Props) {
  const language = useLanguage(); const isBg = language === "bg"; const currentTitle = isBg ? title : titleEn; const currentDescription = isBg ? description : descriptionEn;
  return <main className="min-h-[65vh] bg-orisia-cream py-12 dark:bg-orisia-dark"><div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8"><span className="font-sans text-[10px] font-black uppercase tracking-[.2em] text-orisia-goldDark dark:text-[#c28a48]">{isBg ? "ОРИСИЯ · УПРАВЛЕНИЕ" : "ORISIA · MANAGEMENT"}</span><h1 className="mt-2 text-4xl font-bold sm:text-5xl">{currentTitle}</h1><p className="mt-3 max-w-2xl font-sans text-sm leading-6 text-[#725b47] dark:text-[#a98c69]">{currentDescription}</p><div className="mt-8 border border-dashed border-orisia-line bg-orisia-paper p-10 text-center dark:border-[#604a39] dark:bg-orisia-panel"><strong className="block text-2xl">{currentTitle}</strong><span className="mt-2 block font-sans text-sm text-[#806a55] dark:text-[#a58d71]">{isBg ? "Разделът е подготвен за следващите административни функции." : "This section is prepared for the next administrative features."}</span></div></div></main>;
}
