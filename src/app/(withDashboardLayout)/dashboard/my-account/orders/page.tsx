import UserOrdersPage from "@/components/Dashboard/User/Orders/UserOrdersPage";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import React from "react";

export interface IUserEventOrderStats {
  totalCurrentOrders: number,
  totalToConfirm: number,
  totalDelivered: number,
  totalPendingEvents: number
}

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
  const tab =
    (params?.tab as
      | "currentOrder"
      | "toConfirm"
      | "delivered"
      | "pending"
      | "orderOffer"
      | "accepted"
      | "cancelRequest"
      | "cancelled") || "currentOrder";

  const page = Number(params?.page) || 1;
  const limit = 10;

  const eventRes = await fetchWithAuth(
    `/event-order/my-orders?role=user&tab=${tab}&page=${page}&limit=${limit}&sort=date`,
    {
      next: {
        tags: [TagTypes.eventOrder],
      },
    }
  );

  const eventData = await eventRes.json();

  const myEventData = eventData?.data?.data || [];
  const totalData = eventData?.data?.meta?.total;


  console.log("User Event Orders Data", eventData);

  const stateRes = await fetchWithAuth(`/event-order/user/stats`, {
    next: {
      tags: [TagTypes.eventOrder],
    },
  });

  const stateData = await stateRes.json();

  const states = stateData?.data;

  console.log(states)

  return (
    <UserOrdersPage
      activeTab={tab}
      page={page}
      states={states}
      totalData={totalData}
      limit={limit}
      myEventData={myEventData}
    />
  );
};

export default page;
