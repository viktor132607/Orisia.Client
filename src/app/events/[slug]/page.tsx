import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FeedDetailClient from "../../../components/FeedDetailClient";
import JsonLd from "../../../components/JsonLd";
import { eventResponseToFeedPost } from "../../../components/homeFeedStore";
import { type EventResponse, safePublicGet } from "../../../lib/api";
import { buildLanguageAlternates } from "../../../lib/i18n";
import { buildSocialMetadata, localSeoKeywords } from "../../../lib/seo";
import { buildEventStructuredData, buildSectionItemBreadcrumbStructuredData, buildWebPageStructuredData } from "../../../lib/structuredData";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export async function generateStaticParams() {
  const events = await safePublicGet<EventResponse[]>("/events", []);
  return events.map((event) => ({ slug: event.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const event = await safePublicGet<EventResponse | null>(`/events/${encodeURIComponent(slug)}`, null);
  if (!event) return {};
  const path = `/events/${slug}/`;
  return {
    title: event.titleBg,
    description: event.descriptionBg,
    keywords: [event.titleBg, "фолклорни събития Русе", ...localSeoKeywords],
    alternates: buildLanguageAlternates(path),
    ...buildSocialMetadata({ path, title: event.titleBg, description: event.descriptionBg }),
  };
}

export default async function EventDetailPage({ params }: Props) {
  const { slug } = await params;
  const event = await safePublicGet<EventResponse | null>(`/events/${encodeURIComponent(slug)}`, null);
  if (!event) notFound();
  const feed = eventResponseToFeedPost(event);
  const path = `/events/${slug}/`;
  return <>
    <JsonLd id={`event-${slug}-webpage-structured-data`} data={buildWebPageStructuredData({ path, name: event.titleBg, description: event.descriptionBg })} />
    <JsonLd id={`event-${slug}-breadcrumb-structured-data`} data={buildSectionItemBreadcrumbStructuredData({ sectionPath: "/events/", sectionName: "Събития", path, name: event.titleBg })} />
    <JsonLd id={`event-${slug}-structured-data`} data={buildEventStructuredData({ path, name: event.titleBg, description: event.descriptionBg, startDate: event.startAt })} />
    <FeedDetailClient post={feed} kind="event" />
  </>;
}
