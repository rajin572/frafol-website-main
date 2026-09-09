import React from "react";
import ProfessionalOverviewCalender from "./ProfessionalOverviewCalender";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";

const UpcomingEventSection = async () => {
  const res = await fetchWithAuth(`/event-order/upcoming`, {
    next: {
      tags: [TagTypes.eventOrder],
    },
  });

  const upcomingEventData = await res.json();
  const upcomingEvents = upcomingEventData.data;

  return (
    <div>
      {/* <h2 className="text-center text-red-800 font-semibold mb-2 text-base sm:text-lg lg:text-xl xl:text-2xl ">
        Upcoming Events
      </h2> */}
      <h2 className="text-center text-red-800 font-semibold mb-2 text-base sm:text-lg lg:text-xl xl:text-2xl ">
        Plánované objednávky
      </h2>
      <ProfessionalOverviewCalender upcomingEvents={upcomingEvents} />
    </div>
  );
};

export default UpcomingEventSection;
