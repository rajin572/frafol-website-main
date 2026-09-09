import UserGearOrderPage from "@/components/Dashboard/User/GearOrder/UserGearOrderPage";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import React from "react";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const tab =
    (params?.tab as "currentOrder" | "toConfirm" | "delivered" | "cancelled") ||
    "currentOrder";

  const page = Number(params?.page) || 1;
  const limit = 12;

  const gearOrderRes = await fetchWithAuth(
    `/gear-order/my-orders?role=user&tab=${tab}&page=${page}&limit=${limit}`,
    {
      next: {
        tags: [TagTypes.eventOrder],
      },
    }
  );

  const gearOrderData = await gearOrderRes.json();

  const myGearOrderData = gearOrderData?.data?.data || [];

  console.log(myGearOrderData);
  const totalData = gearOrderData?.data?.meta?.total || 0;

  return (
    <UserGearOrderPage
      activeTab={tab}
      page={page}
      totalData={totalData}
      limit={limit}
      myGearOrderData={myGearOrderData}
    />
  );
};

export default page;
