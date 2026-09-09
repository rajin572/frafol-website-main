import { IPayment } from "@/types";
import { formatDate } from "@/utils/dateFormet";
import Link from "next/link";
import React from "react";
import { BsEye } from "react-icons/bs";
import { IoCalendarOutline } from "react-icons/io5";

const PaymentsCard = ({
  data,
  openModal,
}: {
  data: IPayment;
  openModal: (data: IPayment) => void;
}) => {
  return (
    <div className="p-4 rounded-md border border-[#E1E1E1] shadow-xs hover:shadow-md transition-all duration-200">
      <div>
        <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-secondary-color mb-1">
          {data?.paymentType === "subscription" ? "Subscription" : data.paymentType === "event"
            ? data.eventOrderId?.title
              ? data.eventOrderId?.title
              : data?.eventOrderId?.packageId?.title || "Podujatie"
            : data.paymentType === "gear"
              ? data?.gearOrderIds?.map((gear) => gear?.gearMarketplaceId?.name)?.join(", ")
              : data.paymentType === "workshop"
                ? data.workshopId?.title || "Kurz"
                : ""}
        </h3>

        {/* User or Seller Info */}
        {data.paymentType === "event" && data.userId && (
          <p className="text-sm sm:text-sm lg:text-base text-gray-700">
            {/* User: */}
            Používateľ: {data.userId.name}
          </p>
        )}

        {data.paymentType === "gear" && data?.gearOrderIds?.length > 0 && (
          <div className="text-sm sm:text-sm lg:text-base text-gray-700">
            {data.gearOrderIds.map((gear) => (
              <div key={gear._id} className="mb-1">
                <p>
                  <span className="font-bold">
                    {gear.gearMarketplaceId.name}
                  </span>{" "}
                </p>
                <p className="text-gray-500 text-sm">
                  {/* Seller: */}
                  Predajca:{" "}
                  <Link
                    href={`/professionals/${gear?.sellerId?._id}`}
                    className="text-secondary-color! text-sm sm:text-sm lg:text-base font-bold cursor-pointer"
                  >
                    {gear?.sellerId?.name}
                  </Link>
                </p>
              </div>
            ))}
          </div>
        )}

        {data.paymentType === "workshop" && data.workshopId && (
          <p className="text-sm sm:text-sm lg:text-base text-gray-700">
            {/* Workshop: */}
            Kurz: {data.workshopId.title}
          </p>
        )}

        <div className="text-sm sm:text-sm text-[#5D5D5D] flex items-center gap-1 mt-1">
          <IoCalendarOutline />
          <span>{formatDate(data?.createdAt)}</span>
        </div>

        <div className="flex items-center justify-between">
          <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-secondary-color mt-1">
            {data.amount?.toFixed(2)}€
          </p>

          <button
            onClick={() => openModal(data)}
            className="flex items-center gap-1 px-3 py-1 border border-gray-300 rounded hover:bg-gray-100 text-sm transition cursor-pointer"
          >
            <BsEye size={16} />
            {/* View Details */}
            Zobraziť detaily
          </button>
        </div>
      </div>
    </div>
  );
};

export default PaymentsCard;
