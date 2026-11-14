// Link to a photography / videography category page. The page reads the category from these query
// params, so every link (cards, sitemap, canonical URL) must build them the same way.
type CategoryLike = { _id?: string; title?: string; image?: string; subTitle?: string };

export const categoryPath = (section: "photography" | "videography", item: CategoryLike) => {
  const role = section === "photography" ? "photographer" : "videographer";
  return `/${section}/${item?._id}?role=${role}&title=${encodeURIComponent(item?.title ?? "")}&src=${encodeURIComponent(item?.image ?? "")}&subTitle=${encodeURIComponent(item?.subTitle ?? "")}`;
};
