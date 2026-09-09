import { FaHourglassEnd } from "react-icons/fa6";
import { IoCameraSharp, IoCheckmarkDoneCircleOutline } from "react-icons/io5";

const EventOrdersOverview = ({
  states,
}: {
  states: {
    totalCompletedEvents: number;
    totalInProgressEvents: number;
    totalUpcomingEvents: number;
    totalPendingEvents: number;
  };
}) => {
  const countData = [
    {
      id: 1,
      background: "#ffffff",
      /* name: "Events Completed", */
      name: "Dokončené objednávky",
      icon: (
        <IoCheckmarkDoneCircleOutline className="size-5 text-secondary-color" />
      ),
      count: states.totalCompletedEvents,
    },
    {
      id: 2,
      background: "#ffffff",
      /* name: "Events In Progress", */
      name: "Prebiehajúce objednávky",
      icon: <FaHourglassEnd className="size-5 text-secondary-color" />,
      count: states.totalInProgressEvents,
    },
    {
      id: 3,
      background: "#ffffff",
      /* name: "Upcoming Events", */
      name: "Nadchádzajúce objednávky",
      icon: <IoCameraSharp className="size-6 text-secondary-color" />,
      count: `${states.totalUpcomingEvents}`,
    },
    {
      id: 4,
      background: "#ffffff",
      /* name: "Pending Events", */
      name: "Čakajúce objednávky",
      icon: <FaHourglassEnd className="size-6 text-secondary-color" />,
      count: states.totalPendingEvents,
    },
  ];
  return (
    <div className="flex flex-row flex-wrap gap-1 lg:gap-5 mb-5 ">
      {/* Company  */}
      {countData.map((item) => (
        <div
          key={item.id}
          className={`flex rounded-2xl w-full my-2 lg:my-0 flex-1 border border-[#E1E1E1] p-6`}
          style={{
            backgroundColor: item.background,
          }}
        >
          <div className="!w-full">
            <div className="flex items-center justify-between w-full">
              <p className="text-base sm:text-lg lg:text-xl  font-medium mb-1  tracking-tight w-full text-nowrap">
                {item.name}
              </p>
              <p>{item?.icon}</p>
            </div>
            <p className="text-lg sm:text-xl lg:text-2xl  font-bold capitalize tracking-wider">
              {item.count}
            </p>
            {/* <div className="bg-[#FAF4FF] p-3 rounded-full">{item.icon}</div> */}
          </div>
        </div>
      ))}
    </div>
  );
};

export default EventOrdersOverview;
