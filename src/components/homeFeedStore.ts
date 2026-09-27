import type { EventResponse, FeedItemResponse, FeedType, PostResponse } from "../lib/api";
import { postNumberToType } from "../lib/api";

export type { FeedType };

export type FeedPost = {
  id: string;
  slug: string;
  type: FeedType;
  titleBg: string;
  titleEn: string;
  bodyBg: string;
  bodyEn: string;
  date: string;
  image?: string;
  featured?: boolean;
  endAt?: string | null;
  allDay?: boolean;
  location?: string | null;
  mediaType?: number;
  mediaUrl?: string | null;
  slideshowUrls?: string[];
};

export function getFeedPostPath(post: FeedPost) {
  return post.type === "event"
    ? `/events/${post.slug}/`
    : `/news/${post.slug}/`;
}

export function feedItemToPost(item: FeedItemResponse): FeedPost {
  return {
    id: item.id,
    slug: item.slug,
    type: item.type,
    titleBg: item.titleBg,
    titleEn: item.titleEn,
    bodyBg: item.bodyBg,
    bodyEn: item.bodyEn,
    date: item.date,
    mediaUrl: item.mediaUrl,
    featured: item.featured,
    endAt: item.endAt,
    location: item.location,
  };
}

export function postResponseToFeedPost(post: PostResponse): FeedPost {
  return {
    id: post.id,
    slug: post.slug,
    type: postNumberToType[post.type] ?? "news",
    titleBg: post.titleBg,
    titleEn: post.titleEn,
    bodyBg: post.bodyBg,
    bodyEn: post.bodyEn,
    date: post.publishedAt ?? post.createdOn,
    mediaUrl: post.mediaUrl,
    featured: post.featured,
  };
}

export function eventResponseToFeedPost(event: EventResponse): FeedPost {
  return {
    id: event.id,
    slug: event.slug,
    type: "event",
    titleBg: event.titleBg,
    titleEn: event.titleEn,
    bodyBg: event.descriptionBg,
    bodyEn: event.descriptionEn,
    date: event.startAt,
    featured: event.featured,
    endAt: event.endAt,
    allDay: event.allDay,
    location: event.location,
    mediaType: event.mediaType,
    mediaUrl: event.mediaUrl,
    slideshowUrls: event.slideshowUrls,
  };
}
