import type { MetadataRoute } from "next";
import { getBaseUrl } from "@/helpers/config/envConfig";
import { IS_INDEXABLE, absoluteUrl } from "@/lib/seo/site";
import { categoryPath } from "@/utils/categoryPath";

// /sitemap.xml: the public pages plus every creator profile, bazaar product, forum post and
// photo / video category from the API. Rebuilt at most once an hour. Empty on testing deployments.
export const revalidate = 3600;

type Entry = MetadataRoute.Sitemap[number];
type ApiItem = { _id?: string; updatedAt?: string; createdAt?: string; title?: string; image?: string; subTitle?: string };

const STATIC_PAGES: { path: string; priority: number; changeFrequency: Entry["changeFrequency"] }[] = [
  { path: "/", priority: 1, changeFrequency: "daily" },
  { path: "/professionals", priority: 0.9, changeFrequency: "daily" },
  { path: "/professionals?role=photographer", priority: 0.9, changeFrequency: "daily" },
  { path: "/professionals?role=videographer", priority: 0.9, changeFrequency: "daily" },
  { path: "/professionals?type=verified", priority: 0.7, changeFrequency: "daily" },
  { path: "/photography", priority: 0.9, changeFrequency: "weekly" },
  { path: "/videography", priority: 0.9, changeFrequency: "weekly" },
  { path: "/marketplace", priority: 0.8, changeFrequency: "daily" },
  { path: "/workshops", priority: 0.8, changeFrequency: "daily" },
  { path: "/forums", priority: 0.7, changeFrequency: "daily" },
  { path: "/about-us", priority: 0.6, changeFrequency: "monthly" },
  { path: "/contact-us", priority: 0.5, changeFrequency: "yearly" },
  { path: "/how-it-works", priority: 0.6, changeFrequency: "monthly" },
  { path: "/how-ordering-works", priority: 0.6, changeFrequency: "monthly" },
  { path: "/search-algorithm", priority: 0.4, changeFrequency: "monthly" },
  { path: "/helpful-documents", priority: 0.4, changeFrequency: "monthly" },
  { path: "/terms-of-service", priority: 0.3, changeFrequency: "yearly" },
  { path: "/terms-of-service-marketplace", priority: 0.3, changeFrequency: "yearly" },
  { path: "/data-protection", priority: 0.3, changeFrequency: "yearly" },
  { path: "/website-functionality-compatibility", priority: 0.3, changeFrequency: "yearly" },
];

// Public API, no login: a failing request just leaves those URLs out of the sitemap.
const getJson = async (path: string) => {
  try {
    const res = await fetch(`${getBaseUrl()}${path}`, { next: { revalidate } });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const asList = (json: { data?: unknown } | null): ApiItem[] => {
  const data = json?.data as { result?: unknown } | unknown[] | undefined;
  const list = Array.isArray(data) ? data : (data as { result?: unknown })?.result;
  return Array.isArray(list) ? (list as ApiItem[]).filter((item) => item?._id) : [];
};

// Walks every page of a paginated list (meta.totalPage), 100 items at a time.
const getAll = async (path: string, extra = "") => {
  const first = await getJson(`${path}?page=1&limit=100${extra}`);
  const items = asList(first);
  const totalPage = Math.min(Number(first?.data?.meta?.totalPage) || 1, 50);
  for (let page = 2; page <= totalPage; page++) {
    items.push(...asList(await getJson(`${path}?page=${page}&limit=100${extra}`)));
  }
  return items;
};

const lastModified = (item: ApiItem) => {
  const date = new Date(item?.updatedAt || item?.createdAt || "");
  return Number.isNaN(date.getTime()) ? undefined : date;
};

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!IS_INDEXABLE) return [];

  const now = new Date();
  const entries: MetadataRoute.Sitemap = STATIC_PAGES.map((page) => ({
    url: absoluteUrl(page.path),
    lastModified: now,
    changeFrequency: page.changeFrequency,
    priority: page.priority,
  }));

  const [professionals, products, posts, photoCategories, videoCategories] = await Promise.all([
    getAll("/users/professionals"),
    getAll("/marketPlace", "&status=In%20Stock"),
    getAll("/community"),
    getJson("/category/type/photoGraphy").then(asList),
    getJson("/category/type/videoGraphy").then(asList),
  ]);

  photoCategories.forEach((item) =>
    entries.push({ url: absoluteUrl(categoryPath("photography", item)), lastModified: lastModified(item), changeFrequency: "weekly", priority: 0.8 })
  );
  videoCategories.forEach((item) =>
    entries.push({ url: absoluteUrl(categoryPath("videography", item)), lastModified: lastModified(item), changeFrequency: "weekly", priority: 0.8 })
  );
  professionals.forEach((item) =>
    entries.push({ url: absoluteUrl(`/professionals/${item._id}`), lastModified: lastModified(item), changeFrequency: "weekly", priority: 0.8 })
  );
  products.forEach((item) =>
    entries.push({ url: absoluteUrl(`/marketplace/${item._id}`), lastModified: lastModified(item), changeFrequency: "weekly", priority: 0.6 })
  );
  posts.forEach((item) =>
    entries.push({ url: absoluteUrl(`/forums/${item._id}`), lastModified: lastModified(item), changeFrequency: "weekly", priority: 0.5 })
  );

  // Next.js writes <loc> as is: the "&" between query params (category pages) must be escaped
  // or the XML is invalid.
  return entries.map((entry) => ({ ...entry, url: entry.url.replace(/&(?!amp;)/g, "&amp;") }));
}
