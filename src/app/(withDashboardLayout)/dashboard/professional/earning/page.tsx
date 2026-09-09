import EarningsPage from "@/components/Dashboard/Professional/Earnings/EarningsPage";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import React from "react";

type EarningType = "event" | "gear" | "workshop";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;

  const page = Number(params?.page) || 1;
  const searchText = params?.search || "";
  const type = (params?.type as EarningType) || "event";

  const earningRes = await fetchWithAuth(
    `/users/my-earning?page=${page}&limit=12&searchTerm=${searchText}&type=${type}`,
    {
      next: {
        tags: [TagTypes.earning],
      },
    }
  );

  const earningData = await earningRes.json();
  const result = earningData?.data?.result ?? [];
  const total = earningData?.data?.meta?.total ?? 0;

  console.log("Professional Earnings Data", earningData);

  return (
    <EarningsPage
      data={result}
      totalData={total}
      activeTab={type}
      page={page}
      limit={12}
    />
  );
};

export default page;
