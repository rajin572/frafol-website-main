import ExtensionRequest from "@/components/Dashboard/User/ExtensionRequest/ExtensionRequest";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import React from "react";

const page = async () => {
  const eventRes = await fetchWithAuth(`/event-order/extension-request`, {
    next: {
      tags: [TagTypes.eventOrder],
    },
  });

  const eventData = await eventRes.json();

  const myEventData = eventData?.data?.length > 0 ? eventData?.data : [];

  console.log(myEventData)

  return <ExtensionRequest myEventData={myEventData} />;
};

export default page;
