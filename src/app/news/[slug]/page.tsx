import { buildLanguageAlternates } from "../../../lib/i18n";
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
  buildNewsArticleStructuredData,
  buildSectionItemBreadcrumbStructuredData,
  buildWebPageStructuredData,
} from "../../../lib/structuredData";

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return defaultFeedPosts
    .filter((post) => post.type !== "event" && post.slug)
    .map((post) => ({ slug: post.slug as string }));
}

export async function generateMetadata({
  params,
}: NewsDetailPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getDefaultFeedPost(slug);

  if (!post || post.type === "event") {
    return {};
  }

  const path = `/news/${slug}/`;
  const description = post.bodyBg;

  return {
    title: post.titleBg,
    description,
    keywords: [post.titleBg, ...localSeoKeywords],
    alternates: buildLanguageAlternates(path),
    ...buildSocialMetadata({
      path,
      title: post.titleBg,
      description,
      image: post.image,
      type: "article",
      publishedTime: post.date,
    }),
  };
}

export default async function NewsDetailPage({
  params,
}: NewsDetailPageProps) {
  const { slug } = await params;
  const post = getDefaultFeedPost(slug);

  if (!post || post.type === "event") {
    notFound();
  }

  const path = `/news/${slug}/`;

  return (
    <>
      <JsonLd
        id={`news-${slug}-webpage-structured-data`}
        data={buildWebPageStructuredData({
          path,
          name: post.titleBg,
          description: post.bodyBg,
        })}
      />
      <JsonLd
        id={`news-${slug}-breadcrumb-structured-data`}
        data={buildSectionItemBreadcrumbStructuredData({
          sectionPath: "/news/",
          sectionName: "Новини",
          path,
          name: post.titleBg,
        })}
      />
      <JsonLd
        id={`news-${slug}-article-structured-data`}
        data={buildNewsArticleStructuredData({
          path,
          headline: post.titleBg,
          description: post.bodyBg,
          datePublished: post.date,
          image: post.image,
        })}
      />
      <FeedDetailClient post={post} kind="news" />
    </>
  );
}
