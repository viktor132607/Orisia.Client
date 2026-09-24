import type { Metadata } from "next";
import { notFound } from "next/navigation";
import HomeGate from "../../components/HomeGate";
import PublicPageStructuredData from "../../components/PublicPageStructuredData";
import { isLocale, locales } from "../../lib/i18n";
import { buildLocalizedMetadata, getLocalizedSeo } from "../../lib/localizedSeo";

type Props = { params: Promise<{ locale: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  return isLocale(locale) ? buildLocalizedMetadata(locale, "/") : {};
}

export default async function LocalizedHomePage({ params }: Props) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();

  const seo = getLocalizedSeo(locale, "/");
  if (!seo) notFound();

  const path = `/${locale}/`;

  return (
    <div lang={locale}>
      <PublicPageStructuredData
        path={path}
        name={seo.title}
        description={seo.description}
        language={locale}
        homePath={path}
      />
      <HomeGate />
    </div>
  );
}
