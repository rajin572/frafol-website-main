import { FaHourglassEnd } from "react-icons/fa6";
import { LuShoppingBag } from "react-icons/lu";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { IoCheckmarkDoneCircle } from "react-icons/io5";
import { IDashboardStats } from "./Overview";

const OverviewCard = ({ overview }: { overview: IDashboardStats }) => {
  const countData = [
    {
      id: 1,
      background: "#ffffff",
      /* name: "Active Order", */
      name: "Aktívna objednávka",
      icon: <LuShoppingBag className="size-5 text-secondary-color" />,
      count: overview.totalActiveOrders,
    },
    {
      id: 2,
      background: "#ffffff",
      /* name: "Pending Confirmation", */
      name: "Čaká na potvrdenie",
      icon: <FaHourglassEnd className="size-5 text-secondary-color" />,
      count: overview.totalPendingConfirmation,
    },
    {
      id: 3,
      background: "#ffffff",
      /* name: "Total Spent", */
      name: "Celková minutá suma",
      icon: <RiMoneyEuroCircleFill className="size-6 text-secondary-color" />,
      count: `${overview.totalSpent?.toFixed(2)}€`,
    },
    {
      id: 4,
      background: "#ffffff",
      /* name: "Completed Orders", */
      name: "Dokončené objednávky",
      icon: <IoCheckmarkDoneCircle className="size-6 text-secondary-color" />,
      count: overview.totalCompletedOrders,
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

export default OverviewCard;
