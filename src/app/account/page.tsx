"use client";

import { useState } from "react";
import useLanguage from "../../components/useLanguage";

export default function Page() {
  const language = useLanguage();
  const isBg = language === "bg";
  const tabs = isBg ? ["Профил", "Настройки"] : ["Profile", "Settings"];
  const [tabIndex, setTabIndex] = useState(0);
  const tab = tabs[tabIndex];

  return (
    <main className="page">
      <div className="container">
        <div className="tabs">
          {tabs.map((item, index) => (
            <button key={item} className={tabIndex === index ? "tab active" : "tab"} onClick={() => setTabIndex(index)}>
              {item}
            </button>
          ))}
        </div>
        <section className="empty-panel">
          <div>
            <h1>{tab}</h1>
            <p>{isBg ? "Съдържанието ще бъде добавено." : "Content will be added."}</p>
          </div>
        </section>
      </div>
    </main>
  );
}
