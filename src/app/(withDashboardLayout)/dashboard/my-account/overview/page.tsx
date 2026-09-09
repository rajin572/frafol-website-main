import Overview from "@/components/Dashboard/User/Overview/Overview";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import React from "react";

const page = async () => {
  const overviewRes = await fetchWithAuth(`/users/overview`, {
    next: {
      tags: [
        TagTypes.earning,
        TagTypes.eventOrder,
        TagTypes.workshop,
        TagTypes.package,
        TagTypes.gear,
      ],
    },
  });

  const overviewData = await overviewRes.json();
  console.log(overviewData)
  const overview = overviewData?.data || [];

  return (
    <div>
      <Overview overview={overview} />
    </div>
  );
};

export default page;
