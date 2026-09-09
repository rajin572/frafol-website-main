import Image from "next/image";
import { BsEye } from "react-icons/bs";
import { IoCalendarOutline, IoCheckmarkSharp } from "react-icons/io5";
import { AllImages } from "../../../../../public/assets/AllImages";
import { IGearOrder } from "@/types";
import { getServerUrl } from "@/helpers/config/envConfig";
import { formatDate } from "@/utils/dateFormet";
import Link from "next/link";

const UserGearOrderCard = ({
  activeTab,
  data,
  openModal = () => { },
  showAcceptDeliverModal = () => { },
}: {
  activeTab: string;
  data: IGearOrder;
  openModal?: (record: IGearOrder) => void;
  showAcceptDeliverModal?: (record: IGearOrder) => void;
}) => {
  const serverUrl = getServerUrl();
  return (
    <div className="p-4 rounded-md border border-[#E1E1E1] shadow-xs hover:shadow-md transition-all duration-200 flex gap-2 items-center">
      <Image
        src={
          data?.gearMarketplaceId?.gallery?.[0]
            ? serverUrl + data?.gearMarketplaceId?.gallery?.[0]
            : AllImages?.dummyCover?.src
        }
        alt={data?.gearMarketplaceId?.name || "Product Image"}
        width={1000}
        height={1000}
        className="w-28 h-28 object-cover rounded"
      />
      <div className="w-full">
        <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-secondary-color mb-1">
          {data?.gearMarketplaceId?.name || /* "Product Name" */ "Názov produktu"}
        </h3>
        <h4 className="text-sm sm:text-sm lg:text-base xl:text-lg font-bold mb-1">
          {/* Seller: */}Predajca:{" "}
          <Link
            href={`/professionals/${data?.sellerId?._id}`}
            className="text-secondary-color text-sm sm:text-sm lg:text-base font-bold cursor-pointer"
          >
            {data?.sellerId?.name || "Unknown Seller"}
          </Link>
        </h4>
        <p className="text-sm sm:text-sm lg:text-base text-gray-700 capitalize">
          {/* Condition : */}Stav: {data?.gearMarketplaceId?.condition ? data?.gearMarketplaceId?.condition === "new" ? "Nové" : "Použité" : "N/A"}
        </p>
        <div className="text-sm sm:text-sm text-[#5D5D5D] flex items-center gap-1 mt-1">
          <IoCalendarOutline />
          <span>{formatDate(data?.createdAt) || "Unknown Date"}</span>
        </div>
        <div className="flex flex-col lg:flex-row lg:items-center gap-5 justify-between">
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-secondary-color mt-1">
            {(
              Number(data?.gearMarketplaceId?.mainPrice) +
              Number(data?.gearMarketplaceId?.shippingCompany?.price)
            ).toFixed(2)}{" "}
            €
          </p>

          {activeTab === "toConfirm" ? (
            <div className="flex items-center gap-2">
              <button
                onClick={() => showAcceptDeliverModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-[#00C566] text-[#00C566] rounded bg-[#00C56633] text-sm transition cursor-pointer"
              >
                <IoCheckmarkSharp size={16} />
                Accept Delivery
              </button>
              <button
                onClick={() => openModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm transition cursor-pointer"
              >
                <BsEye size={16} />
                {/* View Details */}
                Zobraziť detaily
              </button>
            </div>
          ) : activeTab === "orderOffer" ? (
            <div className="flex flex-wrap items-center gap-2">
              <button
                // onClick={() => openModal()}
                className="flex items-center gap-1 px-3 py-1 border border-[#00C566] text-primary-color rounded bg-[#00C566] text-sm transition cursor-pointer"
              >
                <IoCheckmarkSharp size={16} />
                {/* Accept Order */}
                Prijať objednávku
              </button>
              <button
                onClick={() => openModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm transition cursor-pointer"
              >
                <BsEye size={16} />
                {/* View Details */}
                Zobraziť detaily
              </button>
            </div>
          ) : (
            <div className="flex flex-wrap items-center gap-2">
              <button
                onClick={() => openModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm transition cursor-pointer"
              >
                <BsEye size={16} />
                {/* View Details */}
                Zobraziť detaily
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserGearOrderCard;
