import React from "react";

// Same shape as ProductCard: photo, category, name, description, seller + price, button.
const ProductCardSkeleton = () => {
  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-base-color/10 bg-white">
      <div className="h-64 w-full animate-pulse bg-gray-200" />
      <div className="flex flex-1 flex-col p-4">
        <div className="h-3.5 w-20 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 h-5 w-3/4 animate-pulse rounded bg-gray-200" />
        <div className="mt-3 h-3.5 w-full animate-pulse rounded bg-gray-200" />
        <div className="mt-2 h-3.5 w-2/3 animate-pulse rounded bg-gray-200" />
        <div className="mt-5 flex items-center justify-between">
          <div className="h-4 w-24 animate-pulse rounded bg-gray-200" />
          <div className="h-6 w-16 animate-pulse rounded bg-gray-200" />
        </div>
        <div className="mt-4 h-11 w-full animate-pulse rounded-lg bg-gray-200" />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
