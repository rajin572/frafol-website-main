// components/ui/Skeletons/ProductDetailSkeleton.js
import Container from "@/components/ui/Container";
import React from "react";

const ProductDetailSkeleton = () => {
  return (
    <main className="py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 min-h-[90vh]">
          <div>
            <div className="flex gap-4">
              <div className="flex flex-col gap-2">
                {[...Array(4)].map((_, index) => (
                  <div
                    key={index}
                    className="w-20 h-20 bg-gray-300 animate-pulse rounded-md border-2 border-transparent"
                  ></div>
                ))}
              </div>
              <div className="flex-1">
                <div className="w-[90%] h-96 bg-gray-300 animate-pulse rounded-md"></div>
              </div>
            </div>
          </div>
          <div className="space-y-1 lg:space-y-2">
            <div className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 bg-gray-300 animate-pulse rounded w-3/4"></div>
            <div className="h-8 sm:h-10 md:h-12 lg:h-14 xl:h-16 bg-gray-300 animate-pulse rounded w-1/4"></div>
            <div className="h-4 sm:h-5 md:h-6 lg:h-8 xl:h-10 bg-gray-300 animate-pulse rounded w-full mt-4"></div>
            <div className="h-4 sm:h-5 md:h-6 lg:h-8 xl:h-10 bg-gray-300 animate-pulse rounded w-1/2 mt-4"></div>
            <div className="h-4 sm:h-5 md:h-6 lg:h-8 xl:h-10 bg-gray-300 animate-pulse rounded w-2/3 mt-4"></div>
            <div className="flex flex-col w-full mt-10">
              <div className="h-12 bg-gray-300 animate-pulse rounded w-full !py-5 flex justify-center items-center gap-2"></div>
              <div className="mt-10">
                {[...Array(2)].map((_, index) => (
                  <div key={index} className="mb-4">
                    <div className="h-6 bg-gray-300 animate-pulse rounded w-1/3 mb-2"></div>
                    <div className="h-16 bg-gray-300 animate-pulse rounded w-full"></div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
};

export default ProductDetailSkeleton;
