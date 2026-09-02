"use client";

import useLanguage from "./useLanguage";

type Props = {
  title: string;
  description: string;
  titleEn: string;
  descriptionEn: string;
};

export default function AdminSectionPlaceholder({ title, description, titleEn, descriptionEn }: Props) {
  const language = useLanguage();
  const isBg = language === "bg";
  const currentTitle = isBg ? title : titleEn;
  const currentDescription = isBg ? description : descriptionEn;

  return (
    <main className="admin-section-page">
      <div className="container">
        <span className="admin-section-kicker">{isBg ? "ОРИСИЯ · УПРАВЛЕНИЕ" : "ORISIA · MANAGEMENT"}</span>
        <h1>{currentTitle}</h1>
        <p>{currentDescription}</p>
        <div className="admin-section-placeholder">
          <strong>{currentTitle}</strong>
          <span>{isBg ? "Разделът е подготвен за следващите административни функции." : "This section is prepared for the next administrative features."}</span>
        </div>
      </div>
    </main>
  );
}
