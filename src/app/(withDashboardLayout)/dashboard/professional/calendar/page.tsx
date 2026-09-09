import AppCalendar from "@/components/Dashboard/Professional/Calendar/CalendarPage";
import TagTypes from "@/helpers/config/TagTypes";
import { fetchWithAuth } from "@/lib/fetchWraper";
import React from "react";

const page = async () => {
  // const params = await searchParams;

  // const year = Number(params?.year) || new Date().getFullYear();

  // // Ensure month is a number between 1-12
  // let monthNum: number;
  // if (Array.isArray(params?.month)) {
  //   monthNum = Number(params?.month[0]) || new Date().getMonth() + 1;
  // } else {
  //   monthNum = Number(params?.month) || new Date().getMonth() + 1;
  // }
  const calendarRes = await fetchWithAuth(
    `/event-order/calendar`,
    {
      next: {
        tags: [
          TagTypes.eventOrder,
          TagTypes.earning,
          TagTypes.workshop,
          TagTypes.package,
          TagTypes.gear,
        ],
      },
    }
  );

  const calanderData = await calendarRes.json();
  const calander = calanderData?.data || [];

  return <AppCalendar calander={calander} />;
};

export default page;
