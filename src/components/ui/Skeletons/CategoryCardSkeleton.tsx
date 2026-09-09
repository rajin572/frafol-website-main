import React from "react";

const CategoryCardSkeleton = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full">
      {[...Array(4)].map((_, index) => (
        <div
          key={index}
          className="bg-gray-200 animate-pulse rounded-lg overflow-hidden relative"
        >
          {/* Image Placeholder */}
          <div className="w-full !h-[360px] bg-gray-200 animate-pulse"></div>
          {/* Text Placeholder */}
          <div className=" absolute inset-0 bg-gradient-to-b from-[#00000022] via-[#00000033] to-[#00000044] flex flex-col justify-end p-3 rounded-lg transition-all duration-300 animate-pulse">
            <div className="h-4 bg-gray-500 animate-pulse rounded mb-2"></div>
            <div className="h-3 bg-gray-500 animate-pulse rounded w-3/4"></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CategoryCardSkeleton;
