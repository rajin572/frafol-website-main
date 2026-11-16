// Public (no login) API reads used by /sitemap.xml and /llms-full.txt. Always live (no-store, no
// data cache). A failing request returns an empty list, so those files never break because of the API.
import { getBaseUrl } from "@/helpers/config/envConfig";

const getJson = async (path: string) => {
  try {
    const res = await fetch(`${getBaseUrl()}${path}`, { cache: "no-store" });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
};

const asList = <T extends { _id?: string }>(json: { data?: unknown } | null): T[] => {
  const data = json?.data as { result?: unknown } | unknown[] | undefined;
  const list = Array.isArray(data) ? data : (data as { result?: unknown })?.result;
  return Array.isArray(list) ? (list as T[]).filter((item) => item?._id) : [];
};

// Walks every page of a paginated list (meta.totalPage), 100 items at a time (max 50 pages).
const getAll = async <T extends { _id?: string }>(path: string, extra = "") => {
  const first = await getJson(`${path}?page=1&limit=100${extra}`);
  const items = asList<T>(first);
  const totalPage = Math.min(Number(first?.data?.meta?.totalPage) || 1, 50);
  for (let page = 2; page <= totalPage; page++) {
    items.push(...asList<T>(await getJson(`${path}?page=${page}&limit=100${extra}`)));
  }
  return items;
};

export const getAllProfessionals = <T extends { _id?: string }>() => getAll<T>("/users/professionals");
export const getAllProducts = <T extends { _id?: string }>() => getAll<T>("/marketPlace", "&status=In%20Stock");
export const getAllForumPosts = <T extends { _id?: string }>() => getAll<T>("/community");
export const getAllWorkshops = <T extends { _id?: string }>() => getAll<T>("/workshop");
export const getCategories = async <T extends { _id?: string }>(type: "photoGraphy" | "videoGraphy") =>
  asList<T>(await getJson(`/category/type/${type}`));
