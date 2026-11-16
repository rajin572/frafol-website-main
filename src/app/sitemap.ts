import type { MetadataRoute } from "next";
import {
  getAllForumPosts,
  getAllProducts,
  getAllProfessionals,
  getCategories,
} from "@/lib/seo/publicData";
import { IS_INDEXABLE, absoluteUrl } from "@/lib/seo/site";
import { categoryPath } from "@/utils/categoryPath";
import { getMediaUrl } from "@/utils/mediaUrl";

// /sitemap.xml: the public pages plus every creator profile, bazaar product, forum post and
// photo / video category from the API. Built on every request (never at build time, never cached),
// so new / removed profiles and products show up at once. Empty on testing deployments.
export const dynamic = "force-dynamic";

type Entry = MetadataRoute.Sitemap[number];
type ApiItem = {
  _id?: string;
  updatedAt?: string;
  createdAt?: string;
  title?: string;
  image?: string;
  subTitle?: string;
  profileImage?: string;
  gallery?: string[];
  images?: string[];
};

// Up to 6 photos per page for Google Images / AI search (absolute URLs, no "&" so no escaping).
const imagesOf = (...lists: (string | string[] | undefined)[]) =>
  lists
    .flat()
    .map((path) => getMediaUrl(path))
    .filter((url) => /^https?:\/\//.test(url) && !url.includes("&"))
    .slice(0, 6);

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
    getAllProfessionals<ApiItem>(),
    getAllProducts<ApiItem>(),
    getAllForumPosts<ApiItem>(),
    getCategories<ApiItem>("photoGraphy"),
    getCategories<ApiItem>("videoGraphy"),
  ]);

  photoCategories.forEach((item) =>
    entries.push({ url: absoluteUrl(categoryPath("photography", item)), lastModified: lastModified(item), images: imagesOf(item.image), changeFrequency: "weekly", priority: 0.8 })
  );
  videoCategories.forEach((item) =>
    entries.push({ url: absoluteUrl(categoryPath("videography", item)), lastModified: lastModified(item), images: imagesOf(item.image), changeFrequency: "weekly", priority: 0.8 })
  );
  professionals.forEach((item) =>
    entries.push({ url: absoluteUrl(`/professionals/${item._id}`), lastModified: lastModified(item), images: imagesOf(item.profileImage, item.gallery), changeFrequency: "weekly", priority: 0.8 })
  );
  products.forEach((item) =>
    entries.push({ url: absoluteUrl(`/marketplace/${item._id}`), lastModified: lastModified(item), images: imagesOf(item.gallery), changeFrequency: "weekly", priority: 0.6 })
  );
  posts.forEach((item) =>
    entries.push({ url: absoluteUrl(`/forums/${item._id}`), lastModified: lastModified(item), images: imagesOf(item.images), changeFrequency: "weekly", priority: 0.5 })
  );

  // Next.js writes <loc> as is: the "&" between query params (category pages) must be escaped
  // or the XML is invalid.
  return entries.map((entry) => ({ ...entry, url: entry.url.replace(/&(?!amp;)/g, "&amp;") }));
}
