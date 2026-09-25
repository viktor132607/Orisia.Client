import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import { absoluteMediaUrl, type DanceResponse, safePublicGet } from "../../../lib/api";
import { buildLanguageAlternates } from "../../../lib/i18n";
import { buildSocialMetadata, localSeoKeywords } from "../../../lib/seo";
import { buildHorotekaDanceBreadcrumbStructuredData, buildWebPageStructuredData } from "../../../lib/structuredData";
import DanceDetailClient from "./DanceDetailClient";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export async function generateStaticParams() {
  const dances = await safePublicGet<DanceResponse[]>("/horoteka", []);
  return dances.map((dance) => ({ slug: dance.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const dance = await safePublicGet<DanceResponse | null>(`/horoteka/${encodeURIComponent(slug)}`, null);
  if (!dance) return {};
  const path = `/horoteka/${slug}/`;
  const title = `${dance.titleBg}${dance.rhythm ? ` — ритъм ${dance.rhythm}` : ""}`;
  const description = dance.descriptionBg;
  return {
    title,
    description,
    keywords: [dance.titleBg, `${dance.titleBg} Русе`, ...localSeoKeywords],
    alternates: buildLanguageAlternates(path),
    ...buildSocialMetadata({ path, title, description, image: absoluteMediaUrl(dance.thumbnailUrl) }),
  };
}

export default async function DancePage({ params }: Props) {
  const { slug } = await params;
  const dance = await safePublicGet<DanceResponse | null>(`/horoteka/${encodeURIComponent(slug)}`, null);
  if (!dance) notFound();
  const path = `/horoteka/${slug}/`;
  return <>
    <JsonLd id={`${slug}-webpage-structured-data`} data={buildWebPageStructuredData({ path, name: dance.titleBg, description: dance.descriptionBg })} />
    <JsonLd id={`${slug}-breadcrumb-structured-data`} data={buildHorotekaDanceBreadcrumbStructuredData({ path, name: dance.titleBg })} />
    <DanceDetailClient dance={dance} />
  </>;
}
