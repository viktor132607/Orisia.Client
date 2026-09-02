export type FeedType = "report" | "news" | "photos" | "blog" | "group" | "schedule" | "event";

export type FeedPost = {
  id: string;
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
    type: "report",
    titleBg: "Отчет от дейността",
    titleEn: "Activity report",
    bodyBg: "Тук ще публикуваме кратки отчети, снимки и важни моменти от дейността на ОРИСИЯ.",
    bodyEn: "Here we will publish short activity reports, photos and important moments from ORISIA.",
    date: "2026-09-01",
  },
];

export function readFeedPosts(): FeedPost[] {
  if (typeof window === "undefined") return defaultFeedPosts;
  const stored = window.localStorage.getItem(FEED_KEY);
  if (!stored) return defaultFeedPosts;
  try {
    const parsed = JSON.parse(stored) as FeedPost[];
    return Array.isArray(parsed) ? parsed : defaultFeedPosts;
  } catch {
    return defaultFeedPosts;
  }
}

export function writeFeedPosts(posts: FeedPost[]) {
  window.localStorage.setItem(FEED_KEY, JSON.stringify(posts));
  window.dispatchEvent(new CustomEvent(FEED_EVENT, { detail: { posts } }));
}
