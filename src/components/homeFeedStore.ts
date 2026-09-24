export type FeedType = "report" | "news" | "photos" | "blog" | "group" | "schedule" | "event";

export type FeedPost = {
  id: string;
  slug?: string;
  type: FeedType;
  titleBg: string;
  titleEn: string;
  bodyBg: string;
  bodyEn: string;
  date: string;
  image?: string;
  featured?: boolean;
};

export const FEED_KEY = "orisia-home-feed";
export const FEED_EVENT = "orisia-home-feed-change";

export const defaultFeedPosts: FeedPost[] = [
  {
    id: "birthday-2026",
    slug: "3-godini-orisia",
    type: "event",
    titleBg: "3 години ОРИСИЯ",
    titleEn: "3 years of ORISIA",
    bodyBg: "На 18.09.2026 празнуваме три години танц, приятелства и български фолклор.",
    bodyEn: "On 18 September 2026 we celebrate three years of dance, friendship and Bulgarian folklore.",
    date: "2026-09-18",
    featured: true,
  },
  {
    id: "schedule-september",
    slug: "septemvriiski-grafik",
    type: "schedule",
    titleBg: "Септемврийски график",
    titleEn: "September schedule",
    bodyBg: "Следете календара за репетиции, участия и специални събития през септември.",
    bodyEn: "Follow the calendar for rehearsals, performances and special events throughout September.",
    date: "2026-09-02",
    featured: true,
  },
  {
    id: "activity-report",
    slug: "otchet-ot-deynostta",
    type: "report",
    titleBg: "Отчет от дейността",
    titleEn: "Activity report",
    bodyBg: "Тук ще публикуваме кратки отчети, снимки и важни моменти от дейността на ОРИСИЯ.",
    bodyEn: "Here we will publish short activity reports, photos and important moments from ORISIA.",
    date: "2026-09-01",
  },
];

function migratePosts(posts: FeedPost[]) {
  const defaultById = new Map(defaultFeedPosts.map((post) => [post.id, post]));

  return posts.map((post) => {
    const defaults = defaultById.get(post.id);
    return {
      ...post,
      ...(defaults?.slug && !post.slug ? { slug: defaults.slug } : {}),
      ...(post.id === "birthday-2026" ? { type: "event" as FeedType } : {}),
    };
  });
}

export function getDefaultFeedPost(slug: string) {
  return defaultFeedPosts.find((post) => post.slug === slug);
}

export function getFeedPostPath(post: FeedPost) {
  if (!post.slug) return null;
  return post.type === "event"
    ? `/events/${post.slug}/`
    : `/news/${post.slug}/`;
}

export function isDefaultFeedPost(post: FeedPost) {
  return defaultFeedPosts.some((item) => item.id === post.id && item.slug === post.slug);
}

export function readFeedPosts(): FeedPost[] {
  if (typeof window === "undefined") return defaultFeedPosts;
  const stored = window.localStorage.getItem(FEED_KEY);
  if (!stored) return defaultFeedPosts;
  try {
    const parsed = JSON.parse(stored) as FeedPost[];
    if (!Array.isArray(parsed)) return defaultFeedPosts;
    const migrated = migratePosts(parsed);
    if (JSON.stringify(migrated) !== JSON.stringify(parsed)) {
      window.localStorage.setItem(FEED_KEY, JSON.stringify(migrated));
    }
    return migrated;
  } catch {
    return defaultFeedPosts;
  }
}

export function writeFeedPosts(posts: FeedPost[]) {
  window.localStorage.setItem(FEED_KEY, JSON.stringify(posts));
  window.dispatchEvent(new CustomEvent(FEED_EVENT, { detail: { posts } }));
}
