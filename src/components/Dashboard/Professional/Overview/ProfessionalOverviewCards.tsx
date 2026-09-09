import { FaStar } from "react-icons/fa6";
import { LuShoppingBag } from "react-icons/lu";
import { RiMoneyEuroCircleFill } from "react-icons/ri";
import { IoCameraSharp } from "react-icons/io5";
import { fetchWithAuth } from "@/lib/fetchWraper";
import TagTypes from "@/helpers/config/TagTypes";

const ProfessionalOverviewCards = async () => {
  const overviewRes = await fetchWithAuth(
    `/users/specific-professional-overview`,
    {
      next: {
        tags: [
          TagTypes.eventOrder,
          TagTypes.gearOrder,
          TagTypes.earning,
          TagTypes.review,
        ],
      },
    }
  );

  const overviewData = await overviewRes.json();


  const overview = overviewData.data;
  const countData = [
    {
      id: 1,
      background: "#ffffff",
      /* name: "Pending Gear Order", */
      name: "Čakajúca objednávka príslušenstva",
      icon: <LuShoppingBag className="size-5 text-secondary-color" />,
      count: overview?.totalPendingGearOrders,
      // message: "2  Due This week",
    },
    {
      id: 2,
      background: "#ffffff",
      /* name: "Upcoming Events", */
      name: "Plánované objednávky",
      icon: <IoCameraSharp className="size-5 text-secondary-color" />,
      count: overview?.totalUpcomingEvents,
    },
    {
      id: 3,
      background: "#ffffff",
      /* name: "Earnings", */
      name: "Zárobky",
      icon: <RiMoneyEuroCircleFill className="size-6 text-secondary-color" />,
      count: `${overview?.totalOverallEarnings?.toFixed(2)}€`,
    },
    {
      id: 4,
      background: "#ffffff",
      /* name: "Reviews Received", */
      name: "Prijaté recenzie",
      icon: <FaStar className="size-6 text-secondary-color" />,
      count: overview?.totalReviewsReceived,
    },
  ];
  return (
    <div>
      <div className="mb-10">
        {/* <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl  font-bold mb-5 ">
          Welcome back, {overview?.user}!
        </h1> */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl  font-bold mb-5 ">
          Vitajte späť, {overview?.user}!
        </h1>
        {/* <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-34xl font-semibold mb-5">
          Here's what's happening with your photography business
          today.
        </h3> */}
        <h3 className="text-lg sm:text-xl lg:text-2xl xl:text-34xl font-semibold mb-5">
          Tu je dnešný prehľad vášho účtu.
        </h3>
      </div>
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalOverviewCards;
