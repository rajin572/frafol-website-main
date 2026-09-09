/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import VideographyCategoryDetails from "@/components/Videographey/VideographyCategoryDetails";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { ITown } from "@/app/(Auth)/sign-up/professional/legal-invoice/page";

const VideographyCategoryDetailsPage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>; // Type params as a Promise
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const { id } = await params; // Await the params to resolve the Promise
  const paramsData = await searchParams;

  const role = (paramsData?.role as string) || "";
  const title = (paramsData?.title as string) || "";
  const src = (paramsData?.src as string) || "";
  const search = (paramsData?.search as string) || "";
  const minPrice = (paramsData?.min as string) || null;
  const maxPrice = (paramsData?.max as string) || null;
  const availity = (paramsData?.availity as string) || null;
  const towns = (paramsData?.towns as string) || null;

  const data: {
    id: string;
    role: string;
    title: string;
    src: string;
  } = {
    id,
    role,
    title,
    src,
  };

  const res = await fetchWithAuth(
    `/users/professionalsByCategory?role=${role}&categoryType=${title}&searchTerm=${search}&minPrice=${minPrice || ""}&maxPrice=${maxPrice || ""}&availableDate=${availity || ""}&travelTowns=${towns || ""}`,
    {
      next: {
        tags: [TagTypes.category],
        revalidate: 0,
      },
    }
  );
  const resdata = await res.json();
  const categories: any[] = resdata?.data?.result;

  const Townres = await fetchWithAuth(
    `/town`,
    {
      next: {
        tags: [TagTypes.town],
      },
    }
  );

  const Tdata = await Townres.json();
  const townData: ITown[] = Tdata?.data || [];
  return (
    <div>
      <VideographyCategoryDetails categories={categories} data={data} townData={townData} />
    </div>
  );
};

export default VideographyCategoryDetailsPage;
