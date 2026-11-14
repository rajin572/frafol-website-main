/* eslint-disable @typescript-eslint/no-explicit-any */
// app/(withNavFooter)/photography/[id]/page.tsx

import React from "react";
import JsonLd from "@/components/seo/JsonLd";
import { categoryMetadata, categorySchemas } from "@/lib/seo/category";
import PhotographyCategoryDetails from "@/components/Photography/PhotographyCategoryDetails";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";
import { ITown } from "@/app/(Auth)/sign-up/professional/legal-invoice/page";

// Title, description, canonical URL and Open Graph of the category (see src/lib/seo/category.ts).
export async function generateMetadata({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) {
  return categoryMetadata("photography", (await params).id, await searchParams);
}

const PhotographyCategoryDetailsPage = async ({
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
  const subTitle = (paramsData?.subTitle as string) || "";
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
    subTitle: string;
  } = {
    id,
    role,
    title,
    src,
    subTitle,
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
  console.log(resdata);


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
      <JsonLd data={categorySchemas("photography", id, paramsData)} />
      <PhotographyCategoryDetails categories={categories} data={data} townData={townData} />
    </div>
  );
};

export default PhotographyCategoryDetailsPage;
