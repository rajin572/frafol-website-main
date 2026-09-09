import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import React from "react";
import PendingEventOrdersPage from "./PendingEventOrdersPage";

const PendingEventOrdersOverview = async () => {
  const eventRes = await fetchWithAuth(
    `/event-order/my-orders?role=professional&tab=${"pending"}&page=${1}&limit=12`,
    {
      next: {
        tags: [TagTypes.eventOrder],
      },
    }
  );

  const eventData = await eventRes.json();

  const myEventData = eventData?.data?.data || [];
  const totalData = eventData?.data?.meta?.total;

  const serviceChargeRes = await fetchWithAuth(`/commissionSetup`, {
    next: {
      tags: [TagTypes.package],
    },
  });

  const serviceChargeData = await serviceChargeRes.json();
  const serviceCharge: number = serviceChargeData?.data?.photoVideoGrapy;
  const minServiceCharge: number = serviceChargeData?.data?.minimumCharge;

  return (
    <div>
      <PendingEventOrdersPage
        myEventData={myEventData}
        totalData={totalData}
        serviceCharge={serviceCharge}
        minServiceCharge={minServiceCharge}
      />
    </div>
  );
};

export default PendingEventOrdersOverview;
