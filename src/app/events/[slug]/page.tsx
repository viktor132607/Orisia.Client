import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FeedDetailClient from "../../../components/FeedDetailClient";
import JsonLd from "../../../components/JsonLd";
import {
  defaultFeedPosts,
  getDefaultFeedPost,
} from "../../../components/homeFeedStore";
import { buildSocialMetadata, localSeoKeywords } from "../../../lib/seo";
import {
  buildEventStructuredData,
  buildSectionItemBreadcrumbStructuredData,
  buildWebPageStructuredData,
} from "../../../lib/structuredData";

type EventDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return defaultFeedPosts
    .filter((post) => post.type === "event" && post.slug)
    .map((post) => ({ slug: post.slug as string }));
}

export async function generateMetadata({
  params,
}: EventDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getDefaultFeedPost(slug);

  if (!post || post.type !== "event") {
    return {};
  }

  const path = `/events/${slug}/`;
  const description = post.bodyBg;

  return {
    title: post.titleBg,
    description,
    keywords: [post.titleBg, "фолклорни събития Русе", ...localSeoKeywords],
    alternates: {
      canonical: path,
    },
    ...buildSocialMetadata({
      path,
      title: post.titleBg,
      description,
      image: post.image,
    }),
  };
}

export default async function EventDetailPage({
  params,
}: EventDetailPageProps) {
  const { slug } = await params;
  const post = getDefaultFeedPost(slug);

  if (!post || post.type !== "event") {
    notFound();
  }

  const path = `/events/${slug}/`;

  return (
    <>
      <JsonLd
        id={`event-${slug}-webpage-structured-data`}
        data={buildWebPageStructuredData({
          path,
          name: post.titleBg,
          description: post.bodyBg,
        })}
      />
      <JsonLd
        id={`event-${slug}-breadcrumb-structured-data`}
        data={buildSectionItemBreadcrumbStructuredData({
          sectionPath: "/events/",
          sectionName: "Събития",
          path,
          name: post.titleBg,
        })}
      />
      <JsonLd
        id={`event-${slug}-structured-data`}
        data={buildEventStructuredData({
          path,
          name: post.titleBg,
          description: post.bodyBg,
          startDate: post.date,
          image: post.image,
        })}
      />
      <FeedDetailClient post={post} kind="event" />
    </>
  );
}
