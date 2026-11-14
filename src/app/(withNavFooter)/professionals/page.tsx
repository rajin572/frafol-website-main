import AllProfessionals from "@/components/Professional/AllProfessionalPage";
import React from "react";
import { getProfessionalsListCopy } from "@/utils/professionalsCopy";

// The tab title follows the ?role= / ?type= filter (all creators, photographers, videographers, Frafol odporúča).
export async function generateMetadata({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return { title: getProfessionalsListCopy(await searchParams).tabTitle };
}

const page = ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  return <AllProfessionals searchParams={searchParams} />;
};

export default page;
