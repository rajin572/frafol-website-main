// Metadata + JSON-LD of the photography / videography category pages (/photography/[id], /videography/[id]).
// The category comes from the URL (?title=&src=&subTitle=), so the canonical URL is rebuilt in the
// one format every link uses (categoryPath), whatever extra filters the visitor added.
import type { Metadata } from "next";
import { categoryPath } from "@/utils/categoryPath";
import { breadcrumbSchema, webPageSchema } from "./schema";
import { pageMetadata } from "./site";

type Section = "photography" | "videography";
type SearchParams = { [key: string]: string | string[] | undefined };

const COPY: Record<Section, { find: string; service: string; list: string }> = {
  photography: { find: "Nájdite fotografa", service: "fotenie", list: "Fotografia" },
  videography: { find: "Nájdite kameramana", service: "natáčanie", list: "Video" },
};

const first = (value: string | string[] | undefined) => (Array.isArray(value) ? value[0] : value) || "";

const categoryOf = (id: string, params: SearchParams) => ({
  _id: id,
  title: first(params?.title),
  image: first(params?.src),
  subTitle: first(params?.subTitle),
});

const descriptionOf = (section: Section, title: string) =>
  section === "photography"
    ? `${title} – nájdite overeného fotografa na Slovensku. Porovnajte portfóliá a ceny a objednajte si fotenie online na Frafol.`
    : `${title} – nájdite overeného kameramana na Slovensku. Porovnajte portfóliá a ceny a objednajte si natáčanie online na Frafol.`;

export const categoryMetadata = (section: Section, id: string, params: SearchParams): Metadata => {
  const category = categoryOf(id, params);
  const { find } = COPY[section];
  if (!category.title) {
    return { title: `${find} | Frafol`, alternates: { canonical: `/${section}` } };
  }
  return pageMetadata({
    title: `${category.title} – ${find} | Frafol`,
    description: descriptionOf(section, category.title),
    path: categoryPath(section, category),
    images: /^https?:\/\//.test(category.image) ? [{ url: category.image, alt: category.title }] : undefined,
  });
};

export const categorySchemas = (section: Section, id: string, params: SearchParams) => {
  const category = categoryOf(id, params);
  if (!category.title) return [];
  const path = categoryPath(section, category);
  return [
    webPageSchema({
      type: "CollectionPage",
      name: `${category.title} – ${COPY[section].find}`,
      description: descriptionOf(section, category.title),
      path,
    }),
    breadcrumbSchema([
      { name: "Domov", path: "/" },
      { name: COPY[section].list, path: `/${section}` },
      { name: category.title, path },
    ]),
  ];
};
