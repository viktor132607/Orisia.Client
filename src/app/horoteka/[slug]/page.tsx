import type { Metadata } from "next";
import { notFound } from "next/navigation";
import JsonLd from "../../../components/JsonLd";
import {
  getHorotekaDance,
  horotekaDances,
} from "../../../lib/horoteka";
import { localSeoKeywords } from "../../../lib/seo";
import {
  buildHorotekaDanceBreadcrumbStructuredData,
  buildVideoObjectStructuredData,
  buildWebPageStructuredData,
} from "../../../lib/structuredData";
import DanceDetailClient from "./DanceDetailClient";

type DancePageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return horotekaDances.map((dance) => ({ slug: dance.slug }));
}

export async function generateMetadata({
  params,
}: DancePageProps): Promise<Metadata> {
  const { slug } = await params;
  const dance = getHorotekaDance(slug);

  if (!dance) {
    return {};
  }

  const path = `/horoteka/${dance.slug}/`;
  const description = `${dance.titleBg} — ${dance.regionBg}, ритъм ${dance.rhythm}. Информация за хорото в Хоротеката на ОРИСИЯ в Русе.`;

  return {
    title: `${dance.titleBg} — ритъм ${dance.rhythm} и информация`,
    description,
    keywords: [
      dance.titleBg,
      `${dance.titleBg} Русе`,
      `${dance.titleBg} ритъм`,
      ...localSeoKeywords,
    ],
    alternates: {
      canonical: path,
    },
  };
}

export default async function DancePage({ params }: DancePageProps) {
  const { slug } = await params;
  const dance = getHorotekaDance(slug);

  if (!dance) {
    notFound();
  }

  const path = `/horoteka/${dance.slug}/`;
  const description = `${dance.titleBg} — ${dance.regionBg}, ритъм ${dance.rhythm}. ${dance.descriptionBg}`;
  const videoStructuredData = dance.video
    ? buildVideoObjectStructuredData({
        name: `${dance.titleBg} — ОРИСИЯ`,
        description: dance.descriptionBg,
        ...dance.video,
      })
    : null;

  return (
    <>
      <JsonLd
        id={`${dance.slug}-webpage-structured-data`}
        data={buildWebPageStructuredData({
          path,
          name: dance.titleBg,
          description,
        })}
      />
      <JsonLd
        id={`${dance.slug}-breadcrumb-structured-data`}
        data={buildHorotekaDanceBreadcrumbStructuredData({
          path,
          name: dance.titleBg,
        })}
      />
      {videoStructuredData && (
        <JsonLd
          id={`${dance.slug}-video-structured-data`}
          data={videoStructuredData}
        />
      )}
      <DanceDetailClient dance={dance} />
    </>
  );
}
