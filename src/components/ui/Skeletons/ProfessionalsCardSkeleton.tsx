import React from "react";

const ProfessionalsCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full mt-5">
      {[...Array(4)].map((_, index) => (
        <div key={index} className="flex flex-col gap-2">
          <div className="w-full h-[350px] sm:h-[400px] lg:h-[450px] bg-gray-300 animate-pulse rounded-tl-lg rounded-tr-lg"></div>
          <div className="p-1">
            <div className="flex justify-between">
              <div className="h-6 bg-gray-300 animate-pulse rounded w-1/2 mb-2"></div>
              <div className="flex items-center gap-1">
                <div className="h-5 w-5 bg-gray-300 animate-pulse rounded-full"></div>
                <div className="h-5 bg-gray-300 animate-pulse rounded w-8"></div>
              </div>
            </div>
            <div className="h-4 bg-gray-300 animate-pulse rounded w-2/3 mt-1"></div>
            <div className="flex items-center gap-1 mt-1">
              <div className="h-4 w-4 bg-gray-300 animate-pulse rounded"></div>
              <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2"></div>
            </div>
            <div className="h-4 bg-gray-300 animate-pulse rounded w-1/4 mt-1"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProfessionalsCardSkeleton;
