import type { Metadata } from "next";
import { notFound } from "next/navigation";
import FeedDetailClient from "../../../components/FeedDetailClient";
import JsonLd from "../../../components/JsonLd";
import { postResponseToFeedPost } from "../../../components/homeFeedStore";
import { type PostResponse, safePublicGet } from "../../../lib/api";
import { buildLanguageAlternates } from "../../../lib/i18n";
import { buildSocialMetadata, localSeoKeywords } from "../../../lib/seo";
import { buildNewsArticleStructuredData, buildSectionItemBreadcrumbStructuredData, buildWebPageStructuredData } from "../../../lib/structuredData";

type Props = { params: Promise<{ slug: string }> };
export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await safePublicGet<PostResponse[]>("/posts", []);
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await safePublicGet<PostResponse | null>(`/posts/${encodeURIComponent(slug)}`, null);
  if (!post) return {};
  const path = `/news/${slug}/`;
  const description = post.seoDescriptionBg || post.excerptBg || post.bodyBg;
  return {
    title: post.seoTitleBg || post.titleBg,
    description,
    keywords: [post.titleBg, ...localSeoKeywords],
    alternates: buildLanguageAlternates(path),
    ...buildSocialMetadata({
      path,
      title: post.seoTitleBg || post.titleBg,
      description,
      type: "article",
      publishedTime: post.publishedAt || post.createdOn,
    }),
  };
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await safePublicGet<PostResponse | null>(`/posts/${encodeURIComponent(slug)}`, null);
  if (!post) notFound();
  const feed = postResponseToFeedPost(post);
  const path = `/news/${slug}/`;
  return <>
    <JsonLd id={`news-${slug}-webpage-structured-data`} data={buildWebPageStructuredData({ path, name: post.titleBg, description: post.excerptBg || post.bodyBg })} />
    <JsonLd id={`news-${slug}-breadcrumb-structured-data`} data={buildSectionItemBreadcrumbStructuredData({ sectionPath: "/news/", sectionName: "Новини", path, name: post.titleBg })} />
    <JsonLd id={`news-${slug}-article-structured-data`} data={buildNewsArticleStructuredData({ path, headline: post.titleBg, description: post.excerptBg || post.bodyBg, datePublished: post.publishedAt || post.createdOn })} />
    <FeedDetailClient post={feed} kind="news" />
  </>;
}
