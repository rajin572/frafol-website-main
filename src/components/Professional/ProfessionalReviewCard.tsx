"use client";
import { getServerUrl } from "@/helpers/config/envConfig";
import { IReview } from "@/types";
import { formatDateTime } from "@/utils/dateFormet";
import { Rate } from "antd";
import Image from "next/image";
import { useState } from "react";
import { AllImages } from "../../../public/assets/AllImages";

const ReviewCard = ({ review }: { review: IReview }) => {
  const serverUrl = getServerUrl();
  const [expanded, setExpanded] = useState(false);

  const toggleReadMore = () => setExpanded((prev) => !prev);

  const maxChars = 150;
  const isLong = review.message.length > maxChars;
  const displayText = expanded
    ? review.message
    : review.message.slice(0, maxChars) + (isLong ? "..." : "");

  return (
    <div className="p-4 rounded-lg shadow-none hover:shadow-md transition">
      {/* Header */}
      <div className="flex flex-col mb-2">
        <div className="flex items-center gap-2 mb-2">
          <Image
            width={2000}
            height={2000}
            alt="avatar"
            className="rounded-full w-6 sm:w-8 lg:w-10  h-6 sm:h-8 lg:h-10  object-cover"
            src={
              review?.isAnonymous || !review?.userId?.profileImage
                ? AllImages.dummyProfile
                : serverUrl + review?.userId?.profileImage
            }
          />
          <div className="text-sm sm:text-sm lg:text-base xl:text-lg font-semibold">
            {review?.isAnonymous ? "Anonymous" : review?.userId?.name}
          </div>
          <span className="text-sm sm:text-sm lg:text-base font-light">
            · {formatDateTime(review?.createdAt)}
          </span>
        </div>
        <Rate className="" disabled value={review.rating} />
      </div>

      {/* Content */}
      <div className="text-sm sm:text-sm lg:text-base mb-2">
        {displayText}
        {isLong && (
          <button
            onClick={toggleReadMore}
            className="ml-1 text-secondary-color hover:underline text-sm "
          >
            {expanded ? "Read Less" : "Read More"}
          </button>
        )}
      </div>
    </div>
  );
};

export default ReviewCard;
