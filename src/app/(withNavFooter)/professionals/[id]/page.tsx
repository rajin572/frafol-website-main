import ProfessionalPageDetails from "@/components/Professional/ProfessionalPageDetails";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { IProfessionalUser } from "@/types";
import React from "react";

const page = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params;
  const paramsData = await searchParams;

  const sort = (paramsData?.sort as string) || "newest";
  const rating = (paramsData?.rating as string) || "5";

  // The profile does not depend on the review filter, yet this page re-renders on every sort / star
  // tap (the filter lives in the URL). A short cache keeps those taps from re-fetching the whole
  // profile each time; mutations still invalidate it through the tag.
  const res = await fetchWithAuth(`/users/${id}`, {
    next: {
      tags: [TagTypes.prfessional],
      revalidate: 60,
    },
  });
  const data = await res.json();
  const professionalUser: IProfessionalUser = data?.data;

  return (
    <ProfessionalPageDetails
      professionalUser={professionalUser}
      sort={sort}
      rating={rating}
    />
  );
};

export default page;
