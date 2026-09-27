"use client";

export default function PublicPageHeader({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description?: string;
  children?: React.ReactNode;
}) {
  return (
    <header className="border-b border-orisia-line/55 bg-orisia-paper py-12 font-sans md:py-16">
      <div className="mx-auto w-[min(1460px,calc(100%_-_40px))] max-[620px]:w-[min(100%_-_28px,1460px)]">
        <span className="text-[11px] font-black uppercase tracking-[.18em] text-orisia-goldDark">{eyebrow}</span>
        <h1 className="mt-3 max-w-5xl text-[clamp(38px,6vw,68px)] font-black uppercase leading-[.95] tracking-[-.025em] text-orisia-ink">{title}</h1>
        {description && <p className="mt-5 max-w-3xl text-[16px] leading-8 text-[#6b5847]">{description}</p>}
        {children && <div className="mt-7">{children}</div>}
      </div>
    </header>
  );
}
