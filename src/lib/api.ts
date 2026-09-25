const API_URL = (process.env.NEXT_PUBLIC_API_URL || "http://localhost:10000/api").replace(/\/$/, "");
const API_ORIGIN = API_URL.replace(/\/api$/, "");

const ACCESS_TOKEN_KEY = "orisia-access-token";
const REFRESH_TOKEN_KEY = "orisia-refresh-token";
const USER_ID_KEY = "orisia-user-id";

export type FeedType = "report" | "news" | "photos" | "blog" | "group" | "schedule" | "event";
export type PublicationStatus = 0 | 1 | 2;
export type ReviewStatus = 0 | 1 | 2;
export type InquiryStatus = 0 | 1 | 2 | 3;

export type TokenResponse = {
  accessToken: string;
  refreshToken: string;
  userId: string;
  email: string;
  names: string;
  phone: string;
  role?: string;
};

export type UserResponse = {
  id: string;
  email: string;
  names: string;
  phone: string;
  role?: string;
  isActive: boolean;
  deactivatedAt?: string | null;
};

export type PostResponse = {
  id: string;
  slug: string;
  type: number;
  status: PublicationStatus;
  titleBg: string;
  titleEn: string;
  bodyBg: string;
  bodyEn: string;
  excerptBg?: string | null;
  excerptEn?: string | null;
  seoTitleBg: string;
  seoTitleEn: string;
  seoDescriptionBg: string;
  seoDescriptionEn: string;
  coverMediaId?: string | null;
  featured: boolean;
  publishedAt?: string | null;
  authorId?: string | null;
  authorName?: string | null;
  createdOn: string;
  modifiedOn: string;
};

export type EventResponse = {
  id: string;
  slug: string;
  titleBg: string;
  titleEn: string;
  descriptionBg: string;
  descriptionEn: string;
  startAt: string;
  endAt?: string | null;
  allDay: boolean;
  eventType: number;
  location?: string | null;
  coverMediaId?: string | null;
  featured: boolean;
  status: PublicationStatus;
  recurrenceRule?: string | null;
  createdOn: string;
  modifiedOn: string;
};

export type FeedItemResponse = {
  id: string;
  source: "post" | "event";
  type: FeedType;
  slug: string;
  titleBg: string;
  titleEn: string;
  bodyBg: string;
  bodyEn: string;
  excerptBg?: string | null;
  excerptEn?: string | null;
  coverMediaId?: string | null;
  featured: boolean;
  date: string;
  endAt?: string | null;
  eventType?: string | null;
  location?: string | null;
  authorId?: string | null;
  authorName?: string | null;
};

export type FeedResponse = { count: number; items: FeedItemResponse[] };

export type CalendarOccurrence = {
  occurrenceId: string;
  eventId: string;
  slug: string;
  titleBg: string;
  titleEn: string;
  descriptionBg: string;
  descriptionEn: string;
  startAt: string;
  endAt?: string | null;
  allDay: boolean;
  eventType: number;
  location?: string | null;
  coverMediaId?: string | null;
  featured: boolean;
  recurring: boolean;
};

export type CalendarResponse = { from: string; to: string; items: CalendarOccurrence[] };

export type GalleryMediaResponse = {
  id: string;
  mediaId: string;
  url: string;
  thumbnailUrl?: string | null;
  altBg?: string | null;
  altEn?: string | null;
  captionBg?: string | null;
  captionEn?: string | null;
  sortOrder: number;
  active: boolean;
};

export type GalleryAlbumResponse = {
  id: string;
  slug: string;
  titleBg: string;
  titleEn: string;
  descriptionBg?: string | null;
  descriptionEn?: string | null;
  coverMediaId?: string | null;
  coverUrl?: string | null;
  coverThumbnailUrl?: string | null;
  active: boolean;
  featured: boolean;
  sortOrder: number;
  items: GalleryMediaResponse[];
  createdOn: string;
  modifiedOn: string;
};

export type DanceResponse = {
  id: string;
  slug: string;
  titleBg: string;
  titleEn: string;
  descriptionBg: string;
  descriptionEn: string;
  region?: string | null;
  rhythm?: string | null;
  videoUrl?: string | null;
  thumbnailMediaId?: string | null;
  thumbnailUrl?: string | null;
  durationSeconds?: number | null;
  sortOrder: number;
  active: boolean;
  createdOn: string;
  modifiedOn: string;
};

export type ContactInquiryResponse = {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject: string;
  message: string;
  status: InquiryStatus;
  createdOn: string;
  modifiedOn: string;
  readAt?: string | null;
  answerText?: string | null;
  answeredAt?: string | null;
  answeredById?: string | null;
  answeredByName?: string | null;
  archivedAt?: string | null;
};

export type SiteReviewResponse = {
  id: string;
  authorName: string;
  userId?: string | null;
  content: string;
  rating: number;
  status: ReviewStatus;
  featured: boolean;
  createdOn: string;
  modifiedOn: string;
};

export type MediaResponse = {
  id: string;
  originalFileName: string;
  mimeType: string;
  extension: string;
  sizeBytes: number;
  sha256: string;
  width: number;
  height: number;
  altBg?: string | null;
  altEn?: string | null;
  url: string;
  thumbnailUrl?: string | null;
  uploadedById?: string | null;
  uploadedByName?: string | null;
  createdOn: string;
};

export type AdminDashboardResponse = {
  generatedAt: string;
  users: { total: number; active: number; inactive: number; admins: number; editors: number };
  posts: { total: number; published: number; draft: number; archived: number; featured: number };
  events: { total: number; published: number; draft: number; archived: number; upcoming: number; past: number; recurring: number; featured: number };
  gallery: { albums: number; activeAlbums: number; featuredAlbums: number; items: number; activeItems: number };
  reviews: { total: number; pending: number; approved: number; rejected: number; featured: number; averageApprovedRating?: number | null };
  inquiries: { total: number; new: number; read: number; answered: number; archived: number };
  media: { total: number; totalSizeBytes: number };
  dances: { total: number; active: number; inactive: number; regions: number };
  recentPosts: Array<{ id: string; slug: string; titleBg: string; type: number; status: number; updatedAt: string }>;
  upcomingEvents: Array<{ id: string; slug: string; titleBg: string; eventType: number; startAt: string; location?: string | null }>;
  recentInquiries: Array<{ id: string; name: string; subject: string; status: number; createdAt: string }>;
  pendingReviews: Array<{ id: string; authorName: string; rating: number; status: number; createdAt: string }>;
};

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

function readStorage(key: string) {
  return typeof window === "undefined" ? null : window.localStorage.getItem(key);
}

export function saveSession(token: TokenResponse) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token.accessToken);
  window.localStorage.setItem(REFRESH_TOKEN_KEY, token.refreshToken);
  window.localStorage.setItem(USER_ID_KEY, token.userId);
  window.dispatchEvent(new Event("orisia-auth-change"));
}

export function clearSession() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
  window.localStorage.removeItem(USER_ID_KEY);
  window.dispatchEvent(new Event("orisia-auth-change"));
}

export function hasSession() {
  return Boolean(readStorage(ACCESS_TOKEN_KEY));
}

export function absoluteMediaUrl(value?: string | null) {
  if (!value) return undefined;
  if (/^https?:\/\//i.test(value)) return value;
  return `${API_ORIGIN}/${value.replace(/^\//, "")}`;
}

async function errorMessage(response: Response) {
  const text = await response.text();
  if (!text) return `Request failed with status ${response.status}`;
  try {
    const parsed = JSON.parse(text) as { message?: string; title?: string; errors?: Record<string, string[]> };
    if (parsed.message) return parsed.message;
    if (parsed.title) return parsed.title;
    if (parsed.errors) return Object.values(parsed.errors).flat().join(" ");
  } catch {}
  return text;
}

async function refreshSession() {
  const userId = readStorage(USER_ID_KEY);
  const refreshToken = readStorage(REFRESH_TOKEN_KEY);
  if (!userId || !refreshToken) return false;

  const response = await fetch(`${API_URL}/auth/refresh-token`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, refreshToken }),
  });

  if (!response.ok) {
    clearSession();
    return false;
  }

  saveSession(await response.json() as TokenResponse);
  return true;
}

async function request<T>(
  path: string,
  init: RequestInit = {},
  auth = false,
  retry = true,
): Promise<T> {
  const headers = new Headers(init.headers);
  if (!(init.body instanceof FormData) && init.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }
  if (auth) {
    const token = readStorage(ACCESS_TOKEN_KEY);
    if (token) headers.set("Authorization", `Bearer ${token}`);
  }

  const response = await fetch(`${API_URL}${path}`, { ...init, headers });
  if (response.status === 401 && auth && retry && await refreshSession()) {
    return request<T>(path, init, auth, false);
  }
  if (!response.ok) throw new ApiError(response.status, await errorMessage(response));
  if (response.status === 204) return undefined as T;
  return await response.json() as T;
}

export async function safePublicGet<T>(path: string, fallback: T): Promise<T> {
  try {
    return await request<T>(path);
  } catch {
    return fallback;
  }
}

const json = (body: unknown) => JSON.stringify(body);

export const api = {
  feed: {
    get: (query = "") => request<FeedResponse>(`/feed${query ? `?${query}` : ""}`),
    latest: (take = 20) => request<FeedResponse>(`/feed/latest?take=${take}`),
    featured: (take = 8) => request<FeedResponse>(`/feed/featured?take=${take}`),
  },
  posts: {
    list: () => request<PostResponse[]>("/posts"),
    bySlug: (slug: string) => request<PostResponse>(`/posts/${encodeURIComponent(slug)}`),
    adminList: () => request<PostResponse[]>("/posts/admin/all", {}, true),
    create: (body: unknown) => request<PostResponse>("/posts", { method: "POST", body: json(body) }, true),
    update: (id: string, body: unknown) => request<PostResponse>(`/posts/${id}`, { method: "PUT", body: json(body) }, true),
    publish: (id: string) => request<PostResponse>(`/posts/${id}/publish`, { method: "POST" }, true),
    archive: (id: string) => request<PostResponse>(`/posts/${id}/archive`, { method: "POST" }, true),
    feature: (id: string, featured: boolean) => request<PostResponse>(`/posts/${id}/featured`, { method: "PATCH", body: json({ featured }) }, true),
    delete: (id: string) => request<void>(`/posts/${id}`, { method: "DELETE" }, true),
  },
  events: {
    list: () => request<EventResponse[]>("/events"),
    upcoming: (take = 100) => request<EventResponse[]>(`/events/upcoming?take=${take}`),
    past: (take = 100) => request<EventResponse[]>(`/events/past?take=${take}`),
    bySlug: (slug: string) => request<EventResponse>(`/events/${encodeURIComponent(slug)}`),
    adminList: () => request<EventResponse[]>("/events/admin/all", {}, true),
    create: (body: unknown) => request<EventResponse>("/events", { method: "POST", body: json(body) }, true),
    update: (id: string, body: unknown) => request<EventResponse>(`/events/${id}`, { method: "PUT", body: json(body) }, true),
    publish: (id: string) => request<EventResponse>(`/events/${id}/publish`, { method: "POST" }, true),
    unpublish: (id: string) => request<EventResponse>(`/events/${id}/unpublish`, { method: "POST" }, true),
    archive: (id: string) => request<EventResponse>(`/events/${id}/archive`, { method: "POST" }, true),
    delete: (id: string) => request<void>(`/events/${id}`, { method: "DELETE" }, true),
  },
  calendar: {
    month: (year: number, month: number) => request<CalendarResponse>(`/calendar/month?year=${year}&month=${month}`),
    upcoming: (take = 5) => request<CalendarOccurrence[]>(`/calendar/upcoming?take=${take}`),
  },
  gallery: {
    list: () => request<GalleryAlbumResponse[]>("/gallery"),
    adminList: () => request<GalleryAlbumResponse[]>("/gallery/admin/all", {}, true),
    create: (body: unknown) => request<GalleryAlbumResponse>("/gallery", { method: "POST", body: json(body) }, true),
    update: (id: string, body: unknown) => request<GalleryAlbumResponse>(`/gallery/${id}`, { method: "PUT", body: json(body) }, true),
    delete: (id: string) => request<void>(`/gallery/${id}`, { method: "DELETE" }, true),
    addMedia: (albumId: string, body: unknown) => request<GalleryMediaResponse[]>(`/gallery/${albumId}/media`, { method: "POST", body: json(body) }, true),
    deleteMedia: (id: string) => request<void>(`/gallery/media/${id}`, { method: "DELETE" }, true),
  },
  dances: {
    list: () => request<DanceResponse[]>("/horoteka"),
    bySlug: (slug: string) => request<DanceResponse>(`/horoteka/${encodeURIComponent(slug)}`),
    adminList: () => request<DanceResponse[]>("/horoteka/admin/all", {}, true),
    create: (body: unknown) => request<DanceResponse>("/horoteka", { method: "POST", body: json(body) }, true),
    update: (id: string, body: unknown) => request<DanceResponse>(`/horoteka/${id}`, { method: "PUT", body: json(body) }, true),
    delete: (id: string) => request<void>(`/horoteka/${id}`, { method: "DELETE" }, true),
  },
  inquiries: {
    submit: (body: unknown) => request<ContactInquiryResponse>("/inquiries", { method: "POST", body: json(body) }),
    adminList: () => request<ContactInquiryResponse[]>("/inquiries/admin/all", {}, true),
    read: (id: string) => request<ContactInquiryResponse>(`/inquiries/${id}/read`, { method: "POST" }, true),
    answer: (id: string, answer: string) => request<ContactInquiryResponse>(`/inquiries/${id}/answer`, { method: "POST", body: json({ answer }) }, true),
    archive: (id: string) => request<ContactInquiryResponse>(`/inquiries/${id}/archive`, { method: "POST" }, true),
    delete: (id: string) => request<void>(`/inquiries/${id}`, { method: "DELETE" }, true),
  },
  reviews: {
    list: () => request<SiteReviewResponse[]>("/reviews"),
    submit: (body: unknown) => request<SiteReviewResponse>("/reviews", { method: "POST", body: json(body) }),
    adminList: () => request<SiteReviewResponse[]>("/reviews/admin/all", {}, true),
    approve: (id: string) => request<SiteReviewResponse>(`/reviews/${id}/approve`, { method: "POST" }, true),
    reject: (id: string) => request<SiteReviewResponse>(`/reviews/${id}/reject`, { method: "POST" }, true),
    feature: (id: string, featured: boolean) => request<SiteReviewResponse>(`/reviews/${id}/featured`, { method: "PATCH", body: json({ featured }) }, true),
    delete: (id: string) => request<void>(`/reviews/${id}`, { method: "DELETE" }, true),
  },
  media: {
    list: () => request<MediaResponse[]>("/admin/media", {}, true),
    upload: (form: FormData) => request<MediaResponse>("/admin/media", { method: "POST", body: form }, true),
    delete: (id: string) => request<void>(`/admin/media/${id}`, { method: "DELETE" }, true),
  },
  auth: {
    login: (body: { email: string; password: string }) => request<TokenResponse>("/auth/login", { method: "POST", body: json(body) }),
    register: (body: { email: string; password: string; names: string; phone: string }) => request<{ id: string }>("/auth/register", { method: "POST", body: json(body) }),
    me: () => request<UserResponse>("/auth/me", {}, true),
    updateMe: (body: { email: string; names: string; phone: string }) => request<UserResponse>("/auth/me", { method: "PUT", body: json(body) }, true),
    changePassword: (body: { currentPassword: string; newPassword: string }) => request<void>("/auth/change-password", { method: "POST", body: json(body) }, true),
    deactivate: (currentPassword: string) => request<void>("/auth/me/deactivate", { method: "POST", body: json({ currentPassword }) }, true),
    logout: async () => {
      try { await request<void>("/auth/logout", { method: "DELETE" }, true); } finally { clearSession(); }
    },
  },
  users: {
    list: () => request<UserResponse[]>("/users", {}, true),
    role: (id: string, role: string) => request<UserResponse>(`/users/${id}/role`, { method: "PUT", body: json({ userId: id, role }) }, true),
    activate: (id: string) => request<UserResponse>(`/users/${id}/activate`, { method: "POST" }, true),
    deactivate: (id: string) => request<UserResponse>(`/users/${id}/deactivate`, { method: "POST" }, true),
  },
  dashboard: {
    get: () => request<AdminDashboardResponse>("/admin/dashboard", {}, true),
  },
};

export const postTypeNames = ["news", "report", "photos", "blog", "group", "schedule"] as const;
export const postTypeToNumber: Record<(typeof postTypeNames)[number], number> = {
  news: 0, report: 1, photos: 2, blog: 3, group: 4, schedule: 5,
};
export const postNumberToType: FeedType[] = ["news", "report", "photos", "blog", "group", "schedule"];
