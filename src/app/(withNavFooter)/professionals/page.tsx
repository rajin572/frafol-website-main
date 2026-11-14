import AllProfessionals from "@/components/Professional/AllProfessionalPage";
import React from "react";
import { getProfessionalsListCopy } from "@/utils/professionalsCopy";
import { pageMetadata } from "@/lib/seo/site";

type SearchParams = { [key: string]: string | string[] | undefined };

// ?role= and ?type= are separate lists (photographers, videographers, Frafol odporúča), so they stay
// in the canonical URL. Search, filters and page number do not.
const canonicalPath = (params: SearchParams) => {
  const role = Array.isArray(params?.role) ? params.role[0] : params?.role;
  const type = Array.isArray(params?.type) ? params.type[0] : params?.type;
  if (role === "photographer" || role === "videographer") return `/professionals?role=${role}`;
  if (type) return "/professionals?type=verified";
  return "/professionals";
};

// The tab title follows the ?role= / ?type= filter (all creators, photographers, videographers, Frafol odporúča).
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const copy = getProfessionalsListCopy(params);
  return pageMetadata({ title: copy.tabTitle, description: copy.description, path: canonicalPath(params) });
}

const page = ({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) => {
  return <AllProfessionals searchParams={searchParams} />;
};

export default page;
