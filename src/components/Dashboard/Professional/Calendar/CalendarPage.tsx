"use client";

import { formatDateByYearMonthDate, formetTime } from "@/utils/dateFormet";
import { Calendar, Badge } from "antd";
import type { Dayjs } from "dayjs";

// Define the event interface
interface Event {
  type: "success" | "warning" | "error" | "processing" | "default";
  content: string;
  time: string;
  more?: string;
}

// Props interface
interface AppCalendarProps {
  calander: {
    date: string;
    events: {
      title?: string;
      eventName: string;
      eventDate: string;
      status: "delivered" | "cancelled" | "pending" | "inProgress";
      serviceType: string;
      eventTime: string;
    }[];
  }[];
}

// Map your status to AntD badge type
const statusMap: Record<string, Event["type"]> = {
  delivered: "success",
  pending: "warning",
  cancelled: "error",
  inProgress: "processing",
};

export default function AppCalendar({ calander }: AppCalendarProps) {

  // Transform API data into a lookup object
  const events: Record<string, Event[]> = {};
  calander?.forEach((day) => {
    events[formatDateByYearMonthDate(day?.events?.[0]?.eventDate)] = day?.events?.map((e) => ({
      type: statusMap[e?.status] || "default",
      content: e?.title || e?.eventName,
      time: formetTime(e?.eventTime),
    }));
  });

  const getListData = (value: Dayjs): Event[] => {
    const dateStr = value.format("YYYY-MM-DD");
    return events[dateStr] || [];
  };

  const dateCellRender = (value: Dayjs) => {
    const listData = getListData(value);
    return (
      <ul className="events">
        {listData?.map((item, index) => (
          <li key={index} className="mb-1 w-full">
            <Badge
              status={item?.type}
              className="!flex !p-1 !bg-neutral-100 !rounded-lg !w-full mx-0.5"
              text={
                <div className=" !text-sm">
                  <p>{item?.content}</p>
                  <p className=" text-gray-400 !text-[11px]">{item?.time}</p>
                </div>
              }
            />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div className="  p-4 min-h-[90vh]">
      {/* <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-10">
        Calendar
      </h1> */}
      <h1 className="text-xl sm:text-2xl lg:text-3xl xl:text-4xl font-bold mb-10">
        Kalendár
      </h1>
      <div className="bg-primary-color rounded-xl p-5">
        <Calendar dateCellRender={dateCellRender} mode="month" />
      </div>{" "}
    </div>
  );
}
