"use client";
import { getMediaUrl } from "@/utils/mediaUrl";
import { IReview } from "@/types";
import { formatDateTime } from "@/utils/dateFormet";
import { Rate } from "antd";
import Image from "next/image";
import { AllImages } from "../../../public/assets/AllImages";
import ExpandableText from "../shared/ExpandableText";

const ReviewCard = ({ review }: { review: IReview }) => {
  // A review can be just stars with no text: `message` is then missing, and reading `.length` on
  // it crashed the whole page (seen when filtering by 1 star). ExpandableText handles a missing text.
  const message = review?.message ?? "";

  return (
    <div className="h-full p-5 rounded-2xl border border-base-color/10 bg-white">
      {/* Header */}
      <div className="flex flex-col mb-2">
        <div className="flex items-center gap-2.5 mb-2">
          <Image
            width={80}
            height={80}
            alt="avatar"
            className="rounded-full size-8 lg:size-10 object-cover"
            src={
              review?.isAnonymous || !review?.userId?.profileImage
                ? AllImages.dummyProfile
                : getMediaUrl(review?.userId?.profileImage)
            }
          />
          <div className="text-sm sm:text-base font-semibold text-base-color">
            {review?.isAnonymous ? "Anonymous" : review?.userId?.name}
          </div>
          <span className="text-sm text-base-color/50">
            · {formatDateTime(review?.createdAt)}
          </span>
        </div>
        <Rate className="!text-base" disabled value={review?.rating} />
      </div>

      {/* Content */}
      {message && (
        <ExpandableText
          text={message}
          maxChars={150}
          className="text-sm sm:text-base leading-relaxed text-base-color/80"
        />
      )}
    </div>
  );
};

export default ReviewCard;
