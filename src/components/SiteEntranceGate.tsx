"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import useLanguage from "./useLanguage";

const ENTERED_KEY = "orisia-site-entered";
const OPEN_DELAY = 650;
const ANIMATION_TIME = 1650;

export default function SiteEntranceGate() {
  const language = useLanguage();
  const isBg = language === "bg";
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);
  const openingRef = useRef(false);
  const closingTimer = useRef<number | null>(null);

  const finishEntrance = useCallback(() => {
    document.documentElement.dataset.gates = "open";
    document.body.classList.remove("entrance-locked");
    setVisible(false);
    window.dispatchEvent(new CustomEvent("orisia-gates-change", { detail: { open: true } }));
  }, []);

  const openGates = useCallback(() => {
    if (openingRef.current) return;
    openingRef.current = true;
    setOpen(true);
    window.localStorage.setItem(ENTERED_KEY, "true");
    closingTimer.current = window.setTimeout(finishEntrance, ANIMATION_TIME);
  }, [finishEntrance]);

  useEffect(() => {
    const entered = window.localStorage.getItem(ENTERED_KEY) === "true";
    if (entered) {
      document.documentElement.dataset.gates = "open";
      window.dispatchEvent(new CustomEvent("orisia-gates-change", { detail: { open: true } }));
      return;
    }
    document.documentElement.dataset.gates = "closed";
    document.body.classList.add("entrance-locked");
    setVisible(true);
    const autoOpen = window.setTimeout(openGates, OPEN_DELAY);
    return () => {
      window.clearTimeout(autoOpen);
      if (closingTimer.current) window.clearTimeout(closingTimer.current);
      document.body.classList.remove("entrance-locked");
    };
  }, [openGates]);

  if (!visible) return null;

  return (
    <div className="fixed inset-0 z-[10000] overflow-hidden bg-[#0c0704]" aria-label={isBg ? "Вход към ОРИСИЯ" : "Entrance to ORISIA"}>
      <div className="relative h-full w-full overflow-hidden border-[6px] border-[#6f4929]">
        <div className="pointer-events-none absolute inset-x-[10%] top-0 z-20 h-20 border-x-2 border-b-2 border-[#9b6b38] bg-[#1b100a]" aria-hidden="true" />
        <div className={`absolute inset-y-0 left-0 z-10 w-1/2 origin-left border-r border-[#9b6b38] bg-[#64391e] transition-transform duration-[1650ms] ease-in-out ${open ? "-translate-x-[105%]" : "translate-x-0"}`} aria-hidden="true">
          <span className="absolute left-[8%] right-[2%] top-[27%] h-4 -rotate-6 bg-[#272323] shadow-soft" />
          <span className="absolute bottom-[23%] left-[8%] right-[2%] h-4 rotate-[-8deg] bg-[#272323] shadow-soft" />
          <span className="absolute right-2 top-1/2 h-7 w-2 -translate-y-1/2 rounded-full border border-[#d5a35a]" />
        </div>
        <div className={`absolute inset-y-0 right-0 z-10 w-1/2 origin-right border-l border-[#9b6b38] bg-[#64391e] transition-transform duration-[1650ms] ease-in-out ${open ? "translate-x-[105%]" : "translate-x-0"}`} aria-hidden="true">
          <span className="absolute left-[2%] right-[8%] top-[27%] h-4 rotate-6 bg-[#272323] shadow-soft" />
          <span className="absolute bottom-[23%] left-[2%] right-[8%] h-4 rotate-[8deg] bg-[#272323] shadow-soft" />
          <span className="absolute left-2 top-1/2 h-7 w-2 -translate-y-1/2 rounded-full border border-[#d5a35a]" />
        </div>
        {!open && <button className="absolute left-1/2 top-1/2 z-30 -translate-x-1/2 -translate-y-1/2 border border-[#b77c39] bg-[#8e5b32] px-6 py-3 font-sans text-xs font-black uppercase tracking-wider text-white shadow-soft hover:bg-[#a96b38]" type="button" onClick={openGates}>{isBg ? "Отвори портите" : "Open the gates"}</button>}
      </div>
    </div>
  );
}
