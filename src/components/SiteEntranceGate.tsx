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
  const closingTimer = useRef<number | null>(null);

  const finishEntrance = useCallback(() => {
    document.documentElement.dataset.gates = "open";
    document.body.classList.remove("entrance-locked");
    setVisible(false);
    window.dispatchEvent(new CustomEvent("orisia-gates-change", { detail: { open: true } }));
  }, []);

  const openGates = useCallback(() => {
    if (open) return;
    setOpen(true);
    window.localStorage.setItem(ENTERED_KEY, "true");
    closingTimer.current = window.setTimeout(finishEntrance, ANIMATION_TIME);
  }, [finishEntrance, open]);

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
    <div className={`site-entrance-gate ${open ? "gates-open entrance-open" : ""}`} aria-label={isBg ? "Вход към ОРИСИЯ" : "Entrance to ORISIA"}>
      <div className="entrance-gate-stage">
        <div className="gate-arch" aria-hidden="true" />
        <div className="gate-doors" aria-hidden="true">
          <div className="gate-door gate-door-left">
            <span className="door-brace door-brace-top" />
            <span className="door-brace door-brace-bottom" />
            <span className="door-handle door-handle-left" />
          </div>
          <div className="gate-door gate-door-right">
            <span className="door-brace door-brace-top" />
            <span className="door-brace door-brace-bottom" />
            <span className="door-handle door-handle-right" />
          </div>
        </div>

        {!open && (
          <button className="gate-open-button entrance-open-button" type="button" onClick={openGates}>
            {isBg ? "Отвори портите" : "Open the gates"}
          </button>
        )}
      </div>
    </div>
  );
}
