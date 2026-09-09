import EventOrdersPage from "@/components/Dashboard/Professional/EventOrders/EventOrdersPage";
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
    (params?.tab as
      | "delivered"
      | "inProgress"
      | "upcoming"
      | "pending"
      | "accepted"
      | "cancelRequest"
      | "cancelled") || "pending";

  const page = Number(params?.page) || 1;

  const eventRes = await fetchWithAuth(
    `/event-order/my-orders?role=professional&tab=${tab}&page=${page}&limit=12`,
    {
      next: {
        tags: [TagTypes.eventOrder],
      },
    }
  );

  const eventData = await eventRes.json();


  const myEventData = eventData?.data?.data || [];
  const totalData = eventData?.data?.meta?.total;

  console.log("Professional Event Orders Data", eventData);

  const serviceChargeRes = await fetchWithAuth(`/commissionSetup`, {
    next: {
      tags: [TagTypes.package],
    },
  });

  const serviceChargeData = await serviceChargeRes.json();
  const serviceCharge: number = serviceChargeData?.data?.photoVideoGrapy;
  const minServiceCharge: number = serviceChargeData?.data?.minimumCharge;

  const stateRes = await fetchWithAuth(`/event-order/professional/stats`, {
    next: {
      tags: [TagTypes.eventOrder],
    },
  });

  const stateData = await stateRes.json();

  const states = stateData?.data;

  return (
    <EventOrdersPage
      states={states}
      activeTab={tab}
      myEventData={myEventData}
      totalData={totalData}
      page={page}
      serviceCharge={serviceCharge}
      minServiceCharge={minServiceCharge}
    />
  );
};

export default page;
