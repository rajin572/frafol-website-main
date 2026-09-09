import { IPendingReview } from "@/types";
import { formatDate } from "@/utils/dateFormet";
import { Rate } from "antd";
import React from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import { FaClock } from "react-icons/fa6";

const ReviewCard = ({
  activeTab,
  data,
  openModal = () => { },
}: {
  activeTab: string;
  data: IPendingReview;
  openModal?: (data: IPendingReview) => void;
}) => {

  console.log(data)
  return (
    <div className="p-4 rounded-md border border-[#E1E1E1] shadow-xs hover:shadow-md transition-all duration-200">
      <div>
        <div className="flex flex-col md:flex-row items-end justify-between">
          <div>
            {" "}
            <div className="flex items-center gap-2">
              <h3 className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-secondary-color mb-1">
                {data?.eventOrderId?.packageId?.title
                  ? data?.eventOrderId?.packageId?.title
                  : data?.eventOrderId?.title ? data?.eventOrderId?.title : "Custom Order"}{" "}
              </h3>{" "}
              <p className="px-2 py-0.5 rounded-full bg-secondary-color text-primary-color w-fit capitalize text-sm">
                {data?.eventOrderId?.orderType}
              </p>
              {activeTab !== "extension" && (
                <p className="px-2 py-0.5 rounded-full bg-yellow-500 text-primary-color w-fit capitalize text-sm">
                  {/* {data?.status === "accepted" ? "Payment Required" : data?.status === "inProgress" ? "In Progress" : data?.status === "cancelRequest" ? "Cancel Requested" : data?.status} */}
                  {data?.status === "accepted"
                    ? "Vyžaduje sa platba"
                    : data?.status === "inProgress"
                      ? "Prebieha"
                      : data?.status === "cancelRequest"
                        ? "Žiadosť o zrušenie odoslaná"
                        : data?.status}
                </p>
              )}
            </div>
            <p className="text-sm sm:text-sm lg:text-base font-semibold">
              By {data?.serviceProviderId?.name}{" "}
            </p>
            <div className="flex items-center text-nowrap gap-1 my-2">
              <FaClock className="!text-[#5D5D5D]" />
              Event Data: {formatDate(data?.eventOrderId?.date)}
            </div>
            <div className="flex items-center text-nowrap gap-1 my-2">
              <FaClock className="!text-[#5D5D5D]" />
              Completed on:{" "}
              {formatDate(data?.eventOrderId?.statusTimestamps?.deliveredAt)}
            </div>
            <div className="text-sm sm:text-sm text-[#5D5D5D] flex items-start gap-2 my-2">
              <div className="flex items-center text-nowrap  gap-1">
                <FaMapMarkerAlt /> <span>{/* Location : */}Miesto: </span>
              </div>
              {data?.eventOrderId?.location}
            </div>
            <p className="text-sm sm:text-base lg:text-lg xl:text-xl font-bold text-secondary-color mt-1">
              <span>{data?.eventOrderId?.totalPrice?.toFixed(2)}€</span>
            </p>
            {activeTab === "allReviews" && (
              <div>
                <div className="text-sm sm:text-sm text-[#5D5D5D] flex items-center gap-1 mt-2">
                  <Rate disabled value={data?.rating} allowHalf />
                </div>
                <p className="ttext-sm sm:text-sm lg:text-base flex items-center gap-1 mt-2">
                  {data?.message}
                </p>
              </div>
            )}
          </div>
          <div>
            {activeTab === "allReviews" ? (
              <button
                onClick={() => openModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-secondary-color rounded bg-secondary-color text-white text-sm transition cursor-pointer"
              >
                {/* Edit */}
                Upraviť
              </button>
            ) : (
              <button
                onClick={() => openModal(data)}
                className="flex items-center gap-1 px-3 py-1 border border-secondary-color rounded bg-secondary-color text-white text-sm transition cursor-pointer"
              >
                Write Review
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewCard;
