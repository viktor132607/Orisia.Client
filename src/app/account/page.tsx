"use client";

import { useState } from "react";
import useLanguage from "../../components/useLanguage";

export default function Page() {
  const language = useLanguage(); const isBg = language === "bg"; const tabs = isBg ? ["Профил", "Настройки"] : ["Profile", "Settings"]; const [tabIndex, setTabIndex] = useState(0); const tab = tabs[tabIndex];
  return <main className="min-h-[65vh] bg-orisia-cream py-12 dark:bg-orisia-dark"><div className="mx-auto w-full max-w-5xl px-4 sm:px-6"><div className="mb-5 flex gap-2">{tabs.map((item,index) => <button key={item} className={`border px-4 py-2 font-sans text-xs font-bold uppercase tracking-wide ${tabIndex===index ? "border-orisia-goldDark bg-orisia-gold text-white" : "border-orisia-line bg-orisia-paper dark:border-[#604a39] dark:bg-orisia-panel"}`} onClick={() => setTabIndex(index)}>{item}</button>)}</div><section className="grid min-h-[320px] place-items-center border border-orisia-line bg-orisia-paper p-8 text-center dark:border-[#604a39] dark:bg-orisia-panel"><div><h1 className="text-4xl font-bold">{tab}</h1><p className="mt-3 font-sans text-sm text-[#725b47] dark:text-[#a98c69]">{isBg ? "Съдържанието ще бъде добавено." : "Content will be added."}</p></div></section></div></main>;
}
