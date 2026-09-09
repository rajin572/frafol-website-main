import GearOrderPage from "@/components/Dashboard/Professional/GearOrder/GearOrderPage";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import { IGearOrder } from "@/types";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const page = Number(params?.page) || 1;
  const limit = 12;
  const search = (params?.search as string) || "";

  const gearOrderRes = await fetchWithAuth(
    `/gear-order/my-orders?role=professional&page=${page}&limit=${limit}&searchTerm=${search}`,
    {
      next: {
        tags: [TagTypes.gearOrder],
      },
    }
  );

  const gearOrderData = await gearOrderRes.json();

  const myGearOrderData: IGearOrder[] = gearOrderData?.data?.data || [];
  const totalData = gearOrderData?.data?.meta?.total;

  return (
    <GearOrderPage
      myGearOrderData={myGearOrderData}
      totalData={totalData}
      page={page}
      limit={limit}
    />
  );
};

export default page;
