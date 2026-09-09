// components/ui/Skeletons/WorkshopCardSkeleton.js
import React from "react";

const WorkshopCardSkeleton = () => {
  return (
    <div className="p-1.5 rounded-xl border border-gray-300">
      <div className="w-full h-80 sm:h-60 lg:h-72 xl:h-80 bg-gray-300 animate-pulse rounded-lg"></div>
      <div className="px-1">
        <div className="h-6 sm:h-7 lg:h-8 xl:h-10 bg-gray-300 animate-pulse rounded w-3/4 mt-3"></div>
        <div className="flex items-center gap-2 mt-3">
          <div className="w-8 h-8 bg-gray-300 animate-pulse rounded-full"></div>
          <div className="h-4 sm:h-5 lg:h-6 bg-gray-300 animate-pulse rounded w-1/2"></div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="w-5 h-5 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-4 sm:h-5 lg:h-6 bg-gray-300 animate-pulse rounded w-1/3"></div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-5 h-5 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-4 sm:h-5 lg:h-6 bg-gray-300 animate-pulse rounded w-1/3"></div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-5 h-5 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-4 sm:h-5 lg:h-6 bg-gray-300 animate-pulse rounded w-1/3"></div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-5 h-5 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-4 sm:h-5 lg:h-6 bg-gray-300 animate-pulse rounded w-1/3"></div>
        </div>
        <div className="flex items-center gap-2 mt-1">
          <div className="w-5 h-5 bg-gray-300 animate-pulse rounded"></div>
          <div className="h-4 sm:h-5 lg:h-6 bg-gray-300 animate-pulse rounded w-1/3"></div>
        </div>
        <div className="flex items-center gap-2 mt-5 justify-between">
          <div className="h-6 sm:h-8 lg:h-10 bg-gray-300 animate-pulse rounded w-1/4"></div>
          <div className="h-8 bg-gray-300 animate-pulse rounded w-1/3 !px-2 !py-1"></div>
        </div>
      </div>
    </div>
  );
};

export default WorkshopCardSkeleton;
