import React from "react";
import { Rate, Progress } from "antd";
import { IProfessionalUser } from "@/types";

const ProfessionalReviewRating = ({
  professionalUser,
}: {
  professionalUser: IProfessionalUser;
}) => {
  // `starCounts` is missing when the profile did not load or has no reviews yet; that used to crash
  // the whole page ("Ups! Niečo sa pokazilo").
  const ratings = Object.entries(
    professionalUser?.starCounts ?? { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  )
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
    <div className="grid grid-cols-1 gap-6 rounded-2xl border border-base-color/10 bg-white p-6 sm:grid-cols-[190px_1fr] sm:items-center sm:gap-10 sm:p-8">
      {/* Average rating */}
      <div className="flex flex-col items-center text-center sm:border-r sm:border-base-color/10 sm:pr-10">
        <div className="text-5xl font-bold tracking-tight text-base-color">
          {professionalUser?.averageRating?.toFixed(1)}
        </div>
        <Rate
          disabled
          value={professionalUser?.averageRating || 0}
          className="mt-2 !text-base text-[#FACC15]"
        />
        <p className="mt-2 text-sm font-semibold text-base-color/60">
          {professionalUser?.totalReview} hodnotení
        </p>
      </div>

      {/* Rating breakdown */}
      <div className="space-y-2">
        {ratings.map(({ star, count }) => (
          <div key={star} className="flex items-center gap-3 w-full">
            <div className="w-24 shrink-0 text-sm text-nowrap font-medium text-base-color/75">
              {star} {star === 1 ? "hviezdička" : star === 5 ? "hviezdičiek" : "hviezdičky"}
            </div>
            <div className="min-w-0 flex-1">
              <Progress
                size="default"
                percent={getPercent(count)}
                showInfo={false}
                strokeColor="#FACC15"
                trailColor="#efefef"
                className="!m-0"
              />
            </div>
            <div className="min-w-9 text-right text-sm text-nowrap font-semibold text-base-color/60">
              ({count})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProfessionalReviewRating;
