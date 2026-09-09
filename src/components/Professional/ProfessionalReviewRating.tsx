import React from "react";
import { Rate, Progress } from "antd";
import { IProfessionalUser } from "@/types";

const ProfessionalReviewRating = ({
  professionalUser,
}: {
  professionalUser: IProfessionalUser;
}) => {
  const ratings = Object.entries(professionalUser?.starCounts)
    .map(([star, count]) => ({
      star: parseInt(star), // Convert string to number
      count: count,
    }))
    .reverse(); // Reverse to have the highest star count first

  const getPercent = (count: number) =>
    professionalUser?.totalReview > 0
      ? (count / professionalUser?.totalReview) * 100
      : 0;

  return (
    <div className="flex flex-col lg:flex-row items-center  gap-8 w-full">
      {/* Left side: Rating breakdown */}
      <div className=" space-y-2">
        <p className="text-base sm:text-lg lg:text-xl xl:text-2xl font-extrabold text-secondary-color">
          {professionalUser?.totalReview} Ratings
        </p>
        {ratings.map(({ star, count }) => (
          <div key={star} className="flex items-center gap-2 w-full">
            <div className="text-sm text-nowrap sm:text-sm lg:text-base xl:text-lg font-semibold">
              {star} Star
            </div>
            <div className="w-full lg:w-[500px]">
              <Progress
                size="default"
                percent={getPercent(count)}
                showInfo={false}
                strokeColor="#FACC15"
              />
            </div>
            <div className="text-sm text-nowrap sm:text-sm lg:text-base xl:text-lg font-semibold">
              ({count})
            </div>
          </div>
        ))}
      </div>

      {/* Right side: Average rating */}
      <div className="flex flex-col items-center justify-center">
        <div className="text-2xl sm:text-4xl lg:text-5xl xl:text-6xl font-semibold">
          {professionalUser?.averageRating?.toFixed(1)}
        </div>
        <Rate
          disabled
          value={professionalUser?.averageRating || 0}
          className="text-[#FACC15]"
        />
      </div>
    </div>
  );
};

export default ProfessionalReviewRating;
