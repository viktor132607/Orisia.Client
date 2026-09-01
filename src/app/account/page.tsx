"use client";
import { useState } from "react";

export default function Page() {
  const [tab, setTab] = useState("Профил");
  const tabs = ["Профил", "Настройки"];

  return (
    <main className="page">
      <div className="container">
        <div className="tabs">
          {tabs.map((item) => (
            <button key={item} className={tab === item ? "tab active" : "tab"} onClick={() => setTab(item)}>
              {item}
            </button>
          ))}
        </div>
        <section className="empty-panel">
          <div>
            <h1>{tab}</h1>
            <p>Съдържанието ще бъде добавено.</p>
          </div>
        </section>
      </div>
    </main>
  );
}
