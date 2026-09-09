import React from "react";

const ProductCardSkeleton = () => {
  return (
    <div className="h-full flex flex-col justify-between">
      <div className="overflow-hidden rounded-tl-lg rounded-tr-lg">
        <div className="w-full h-72 bg-gray-300 animate-pulse rounded-tl-lg rounded-tr-lg"></div>
      </div>
      <div className="mt-4 p-1">
        <div className="h-6 sm:h-7 lg:h-8 bg-gray-300 animate-pulse rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-gray-300 animate-pulse rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-300 animate-pulse rounded w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 animate-pulse rounded w-1/3 mb-2"></div>
        <div className="h-6 sm:h-8 lg:h-10 bg-gray-300 animate-pulse rounded w-1/4 mb-2"></div>
        <div className="h-12 bg-gray-300 animate-pulse rounded w-full mt-4 flex justify-center items-center gap-2"></div>
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
